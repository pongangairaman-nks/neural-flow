from typing import List, Dict, Any, Set
from collections import defaultdict, deque

def is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """
    Check if the pipeline forms a Directed Acyclic Graph (DAG).
    Uses topological sort to detect cycles.
    """
    if not nodes or not edges:
        return True
    
    # Build adjacency list
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    node_ids = {node["id"] for node in nodes}
    
    # Initialize in-degree for all nodes
    for node_id in node_ids:
        in_degree[node_id] = 0
    
    # Build graph
    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        
        if source in node_ids and target in node_ids:
            graph[source].append(target)
            in_degree[target] += 1
    
    # Kahn's algorithm for topological sort
    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    sorted_count = 0
    
    while queue:
        node = queue.popleft()
        sorted_count += 1
        
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If all nodes are sorted, it's a DAG
    return sorted_count == len(node_ids)

def get_node_types(nodes: List[Dict[str, Any]]) -> Dict[str, int]:
    """Count nodes by type"""
    type_count = defaultdict(int)
    for node in nodes:
        node_type = node.get("type", "unknown")
        type_count[node_type] += 1
    return dict(type_count)

def validate_pipeline(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> tuple[bool, str]:
    """
    Validate pipeline structure.
    Returns (is_valid, error_message)
    """
    if not nodes:
        return False, "Pipeline must have at least one node"
    
    node_ids = {node.get("id") for node in nodes}
    
    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        
        if source not in node_ids:
            return False, f"Edge references non-existent source node: {source}"
        
        if target not in node_ids:
            return False, f"Edge references non-existent target node: {target}"
        
        if source == target:
            return False, f"Self-loop detected on node: {source}"
    
    return True, ""
