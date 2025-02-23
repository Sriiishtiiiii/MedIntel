from flask import Flask
from app.routes import api_blueprint
from app.models import db

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    db.init_app(app)

    app.register_blueprint(api_blueprint)

    return app
