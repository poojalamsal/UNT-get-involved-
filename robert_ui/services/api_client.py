"""
API client = one place where the frontend talks to the backend.

I’m doing it this way so:
- routes don’t get messy with requests.get/post everywhere
- if the backend URL changes, we update it once
- error handling stays consistent
"""

import os
import requests

# NEEDS FROM IFUNAYA:
# confirm where the backend is running (port + base path)
API_BASE = os.getenv("API_BASE", "http://localhost:5000/api")

def _auth_headers():
    """
    OPTIONAL (Aashi):
    If join/search endpoints require login, we’ll attach auth here.
    For now, it returns an empty dict so the calls still work in dev.
    """
    # Example if token-based:
    # token = os.getenv("AUTH_TOKEN", "")
    # return {"Authorization": f"Bearer {token}"} if token else {}
    return {}

def _raise_for_status(resp: requests.Response):
    """
    If the backend returns an error, this tries to show a readable message
    (especially if the backend returns JSON like {"message": "..."}).
    """
    try:
        resp.raise_for_status()
    except requests.HTTPError:
        content_type = resp.headers.get("content-type", "")
        if "application/json" in content_type:
            data = resp.json()
            raise Exception(data.get("message") or str(data))
        raise

def get_clubs(search: str = "", category: str = ""):
    """
    Backend call:
    GET /api/clubs?search=...&category=...
    Returns a list of clubs (JSON).
    """
    resp = requests.get(
        f"{API_BASE}/clubs",
        params={"search": search, "category": category},
        headers=_auth_headers(),
        timeout=10
    )
    _raise_for_status(resp)
    return resp.json()

def get_club_by_id(club_id: int):
    """
    Backend call:
    GET /api/clubs/<id>
    Returns one club object (JSON).
    """
    resp = requests.get(
        f"{API_BASE}/clubs/{club_id}",
        headers=_auth_headers(),
        timeout=10
    )
    _raise_for_status(resp)
    return resp.json()

def create_join_request(club_id: int, message: str = ""):
    """
    Backend call:
    POST /api/clubs/<id>/join-requests

    NEEDS FROM IFUNAYA:
    confirm the exact request body fields (for now: {"message": ...})
    """
    payload = {"message": message}

    resp = requests.post(
        f"{API_BASE}/clubs/{club_id}/join-requests",
        json=payload,
        headers=_auth_headers(),
        timeout=10
    )
    _raise_for_status(resp)
    return resp.json()
