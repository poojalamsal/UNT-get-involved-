from flask import Flask
from ui_routes import ui
import os

def create_app():
    """
    Main Flask app setup for my part of the project:
    connecting the frontend pages to the backend endpoints.

    I’m keeping this as an app factory function so it’s clean and easy to extend later.
    """
    app = Flask(__name__)

    # Flash messages (like "Join request sent!") need a secret key.
    # For class/dev, "dev" is fine. If we deploy, we can set SECRET_KEY in env vars.
    app.secret_key = os.getenv("SECRET_KEY", "dev")

    # All the actual page routes live in ui_routes.py
    app.register_blueprint(ui)

    return app

if __name__ == "__main__":
    # Run the UI server locally
    create_app().run(debug=True)
