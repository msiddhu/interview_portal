
from flask_cors import CORS
from controllers import interview_resources,listing_resources
from exts import db
from libs import get_utc_now
from flask import jsonify,Flask
from models import init_all


def register_extensions(app):
    db.init_app(app)
    app.register_blueprint(interview_resources, url_prefix='/interview')
    app.register_blueprint(listing_resources, url_prefix='/list')


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./store.sqlite3'
    app.config['SQLALCHEMY_ECHO'] = False
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    register_extensions(app)
    return app


app = create_app()


@app.before_first_request
@app.route('/')
def ready():
    init_all()
    response = jsonify({
        'status': 'ready',
        'time': get_utc_now()
    })
    return response


# @app.errorhandler(Exception)
# def handle_error(err):
#     if isinstance(err, ScheduleError) or isinstance(err, ParticipantsError):
#         return APIResponse.respond({"message": err.message}, err.status_code)
#
#     else:
#         return APIResponse.respond({"message": "Internal server error"}, 503)
