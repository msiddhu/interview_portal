import datetime
from flask_cors import CORS
from flask import Flask
from apis import interview_resources
from apis import listing_resources
from exts import db
from libs import ScheduleError, ParticipantsError,get_utc_now
from flask import Response, jsonify, make_response
from sqlalchemy.ext.declarative import declarative_base
from models import init_all, get_users, get_interviews

Base = declarative_base()




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

@app.route('/')
def ready():
    response = jsonify({
        'status': 'ready',
        'time': get_utc_now()
    })
    return response


@app.before_first_request
def init_db():
    init_all()



# @app.route('/list', methods=['GET'])
# def get_all():
#     tmp=get_users()
#     print(tmp)
#     response = jsonify({
#         'status': 'every thing good',
#         'time': get_utc_now()
#     })
#     return response
#
# @app.route('/inter', methods=['GET'])
# def get_all2():
#     tmp=get_interviews()
#     print(tmp)
#     response = jsonify({
#         'status': 'every thing good',
#         'time':get_utc_now()
#     })
#     return response


# @app.errorhandler(Exception)
# def handle_error(err):
#     if isinstance(err, ScheduleError):
#         return jsonify(
#             error='',
#             message='',
#         ), err.status_code
#
#     elif isinstance(err, ParticipantsError):
#         return jsonify(
#             error='',
#             message='',
#         ), err.status_code
#
#     raise err
