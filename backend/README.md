# Backend

FastAPI-based pipeline analysis service.

## Setup

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
Runs on `http://localhost:8000`

## Project Structure

```
├── main.py          # FastAPI app & endpoints
├── config.py        # Configuration management
├── models.py        # Pydantic data models
├── utils.py         # Utility functions (DAG detection, validation)
├── requirements.txt # Python dependencies
├── .env.example     # Environment template
└── .gitignore
```

## Technology Stack

- **FastAPI 0.104.1** - Modern web framework with automatic OpenAPI docs
- **Uvicorn 0.24.0** - ASGI server for production-ready performance
- **Pydantic 2.12.5** - Data validation and serialization
- **Python 3.8+** - Runtime environment
- **python-dotenv** - Environment variable management

## API Endpoints

### Health Check
```
GET /
```
Returns: `{"status": "ok", "message": "Pipeline API is running"}`

### Parse Pipeline
```
POST /pipelines/parse
```

**Request:**
```json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "input",
      "position": {"x": 0, "y": 0},
      "data": {"label": "Input"}
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2"
    }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 1,
  "num_edges": 0,
  "is_dag": true,
  "node_types": {"input": 1}
}
```

## Data Models

### Node
```python
class Node(BaseModel):
    id: str                      # Unique identifier
    type: str                    # Node type
    position: Dict[str, float]   # Position {x, y}
    data: Dict[str, Any]         # Node data
```

### Edge
```python
class Edge(BaseModel):
    id: str          # Unique identifier
    source: str      # Source node ID
    target: str      # Target node ID
```

### PipelineRequest
```python
class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]
```

### PipelineAnalysis
```python
class PipelineAnalysis(BaseModel):
    num_nodes: int                # Total nodes
    num_edges: int                # Total edges
    is_dag: bool                  # Is Directed Acyclic Graph
    node_types: Dict[str, int]    # Count by type
```

## Algorithms

### DAG Detection (Kahn's Algorithm)
Detects if pipeline contains cycles using topological sort.

**Time Complexity:** O(V + E)  
**Space Complexity:** O(V + E)

**Code:** `utils.py` lines 6-41

**How it works:**
1. Build adjacency list from edges
2. Calculate in-degree for each node
3. Add nodes with in-degree 0 to queue
4. Process queue, decrement neighbors' in-degree
5. If all nodes processed, it's a DAG

### Pipeline Validation
Validates pipeline structure before analysis.

**Checks:**
1. At least one node exists
2. All edges reference existing nodes
3. No self-loops (node connecting to itself)

**Code:** `utils.py` lines 49-73

## Configuration

### Environment Variables (`.env`)
```
HOST=0.0.0.0
PORT=8000
FRONTEND_URL=http://localhost:3000
ENV=development
```

**Code:** `config.py`

### CORS Configuration
The backend is configured to accept requests from the frontend:
```python
CORS_ORIGINS = [FRONTEND_URL]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = ["*"]
CORS_ALLOW_HEADERS = ["*"]
```

This allows the frontend running on `http://localhost:3000` to make API calls to the backend.

## Error Handling

**Status Codes:**
- `200` - Success
- `400` - Validation error (bad request)
- `500` - Server error

**Error Response:**
```json
{
  "detail": "Error message",
  "status_code": 400
}
```

**Common Errors:**
- "Pipeline must have at least one node"
- "Edge references non-existent source node: {id}"
- "Self-loop detected on node: {id}"

## Testing

### With cURL

**Health check:**
```bash
curl http://localhost:8000/
```

**Valid pipeline:**
```bash
curl -X POST "http://localhost:8000/pipelines/parse" \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [{"id": "1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}}],
    "edges": []
  }'
```

**Invalid pipeline (missing node):**
```bash
curl -X POST "http://localhost:8000/pipelines/parse" \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [{"id": "1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}}],
    "edges": [{"id": "e1", "source": "1", "target": "invalid"}]
  }'
```

**Cycle detection:**
```bash
curl -X POST "http://localhost:8000/pipelines/parse" \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [
      {"id": "1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}},
      {"id": "2", "type": "text", "position": {"x": 200, "y": 0}, "data": {}}
    ],
    "edges": [
      {"id": "e1", "source": "1", "target": "2"},
      {"id": "e2", "source": "2", "target": "1"}
    ]
  }'
```

### With Python
```python
import requests

BASE_URL = "http://localhost:8000"

# Health check
response = requests.get(f"{BASE_URL}/")
print(response.json())

# Parse pipeline
payload = {
    "nodes": [{"id": "1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}}],
    "edges": []
}
response = requests.post(f"{BASE_URL}/pipelines/parse", json=payload)
print(response.json())
```

### With Swagger UI
1. Open `http://localhost:8000/docs`
2. Click on endpoint
3. Click "Try it out"
4. Enter request body
5. Click "Execute"

## API Documentation

Auto-generated documentation:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`
- **OpenAPI JSON:** `http://localhost:8000/openapi.json`

## Troubleshooting

**Port already in use:**
```bash
lsof -i :8000
kill -9 <PID>
```

**Module not found:**
```bash
source venv/bin/activate  # Activate virtual environment
pip install -r requirements.txt
```

**CORS errors:**
Check `config.py` - ensure frontend URL is in `CORS_ORIGINS`

**Validation errors:**
Check request format matches Pydantic models:
- All required fields present
- Correct data types
- Valid JSON format

**Connection refused:**
Ensure backend is running:
```bash
python main.py
# or
uvicorn main:app --reload
```

---

## Recent Improvements

### Model Configuration
- Added `extra = "allow"` to Node and Edge models to accept additional fields from React Flow
- This prevents validation errors when the frontend sends properties not explicitly defined in the Pydantic models

### API Response Handling
- Fixed pipeline parsing to convert Pydantic models to dictionaries before passing to utility functions
- Utility functions expect dict-like access, so models are converted using `.model_dump()`

**Example:**
```python
nodes_dict = [node.model_dump() for node in pipeline.nodes]
edges_dict = [edge.model_dump() for edge in pipeline.edges]
```

### Error Handling
- Comprehensive error messages for validation failures
- Proper HTTP status codes for different error types
- Clear feedback to frontend for debugging

### Frontend Integration
- CORS properly configured for frontend communication
- Automatic documentation via Swagger UI and ReDoc
- Clean API contracts with Pydantic models
