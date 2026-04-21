import os
import requests

# Node backend
API_BASE = os.getenv("API_BASE", "http://localhost:3000")

def _auth_headers():
    # Optional (Aashi): add auth later if needed
    return {}

def _raise_for_status(resp: requests.Response):
    try:
        resp.raise_for_status()
    except requests.HTTPError:
        if "application/json" in (resp.headers.get("content-type") or ""):
            data = resp.json()
            raise Exception(data.get("message") or str(data))
        raise

def get_all_clubs():
    """GET /clubs -> list all clubs"""
    resp = requests.get(
        f"{API_BASE}/clubs",
        headers=_auth_headers(),
        timeout=10
    )
    _raise_for_status(resp)
    return resp.json()

def get_clubs(category: str = ""):
    """
    If category is provided:
      GET /clubs/search?category=...
    else:
      GET /clubs (all clubs)
    """
    if category.strip():
        resp = requests.get(
            f"{API_BASE}/clubs/search",
            params={"category": category},
            headers=_auth_headers(),
            timeout=10
        )
    else:
        resp = requests.get(
            f"{API_BASE}/clubs",
            headers=_auth_headers(),
            timeout=10
        )

    _raise_for_status(resp)
    return resp.json()

def get_club_by_id(club_id: int):
    """GET /clubs/:id -> club details"""
    resp = requests.get(
        f"{API_BASE}/clubs/{club_id}",
        headers=_auth_headers(),
        timeout=10
    )
    _raise_for_status(resp)
    return resp.json()

def create_join_request(club_id: int, message: str = ""):
    """POST /clubs/:id/join-requests -> create join request"""
    payload = {"message": message}
    resp = requests.post(
        f"{API_BASE}/clubs/{club_id}/join-requests",
        json=payload,
        headers=_auth_headers(),
        timeout=10
    )
    _raise_for_status(resp)
    return resp.json()
