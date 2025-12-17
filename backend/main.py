from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

from config import config
from models import PipelineRequest, PipelineAnalysis, ErrorResponse
from utils import is_dag, get_node_types, validate_pipeline

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Pipeline API",
    description="API for analyzing and processing pipelines",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=config.CORS_ALLOW_CREDENTIALS,
    allow_methods=config.CORS_ALLOW_METHODS,
    allow_headers=config.CORS_ALLOW_HEADERS,
)

@app.get('/', tags=["Health"])
def read_root():
    """Health check endpoint"""
    return {'status': 'ok', 'message': 'Pipeline API is running'}

@app.post('/pipelines/parse', response_model=PipelineAnalysis, tags=["Pipelines"])
def parse_pipeline(pipeline: PipelineRequest):
    """
    Analyze and validate pipeline structure.
    
    Returns:
    - num_nodes: Total number of nodes
    - num_edges: Total number of edges
    - is_dag: Whether the pipeline forms a Directed Acyclic Graph
    - node_types: Count of nodes by type
    """
    try:
        # Convert Pydantic models to dictionaries
        nodes_dict = [node.model_dump() for node in pipeline.nodes]
        edges_dict = [edge.model_dump() for edge in pipeline.edges]
        
        # Validate pipeline
        is_valid, error_msg = validate_pipeline(nodes_dict, edges_dict)
        if not is_valid:
            logger.warning(f"Invalid pipeline: {error_msg}")
            raise HTTPException(status_code=400, detail=error_msg)
        
        # Analyze pipeline
        num_nodes = len(nodes_dict)
        num_edges = len(edges_dict)
        dag_status = is_dag(nodes_dict, edges_dict)
        node_types = get_node_types(nodes_dict)
        
        logger.info(f"Pipeline analyzed: {num_nodes} nodes, {num_edges} edges, DAG: {dag_status}")
        
        return PipelineAnalysis(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=dag_status,
            node_types=node_types
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error parsing pipeline: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler"""
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "status_code": exc.status_code}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=config.HOST,
        port=config.PORT,
        reload=config.ENV == "development"
    )