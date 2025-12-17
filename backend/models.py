from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class Node(BaseModel):
    """Pipeline node model"""
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]
    
    class Config:
        extra = "allow"  # Allow extra fields from React Flow
        json_schema_extra = {
            "example": {
                "id": "node-1",
                "type": "text",
                "position": {"x": 0, "y": 0},
                "data": {"label": "Node Label"}
            }
        }

class Edge(BaseModel):
    """Pipeline edge model"""
    id: str
    source: str
    target: str
    
    class Config:
        extra = "allow"  # Allow extra fields from React Flow
        json_schema_extra = {
            "example": {
                "id": "edge-1",
                "source": "node-1",
                "target": "node-2"
            }
        }

class PipelineRequest(BaseModel):
    """Request model for pipeline parsing"""
    nodes: List[Node] = Field(..., min_items=0)
    edges: List[Edge] = Field(..., min_items=0)
    
    class Config:
        json_schema_extra = {
            "example": {
                "nodes": [
                    {
                        "id": "node-1",
                        "type": "input",
                        "position": {"x": 0, "y": 0},
                        "data": {"label": "Input"}
                    }
                ],
                "edges": []
            }
        }

class PipelineAnalysis(BaseModel):
    """Pipeline analysis result"""
    num_nodes: int
    num_edges: int
    is_dag: bool
    node_types: Dict[str, int]
    
    class Config:
        json_schema_extra = {
            "example": {
                "num_nodes": 3,
                "num_edges": 2,
                "is_dag": True,
                "node_types": {"input": 1, "text": 1, "output": 1}
            }
        }

class ErrorResponse(BaseModel):
    """Error response model"""
    detail: str
    status_code: int
    
    class Config:
        json_schema_extra = {
            "example": {
                "detail": "Invalid pipeline structure",
                "status_code": 400
            }
        }
