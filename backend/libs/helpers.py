import random
import string
from datetime import datetime
import json
import uuid


from flask import Response, make_response, jsonify

from models import Person


def get_utc_now():
    return datetime.utcnow()


def to_json(dictionary):
    return json.dumps(dictionary, indent = 4)

def to_date(date):
    return date.strftime("%m/%d/%Y, %H:%M:%S")

def get_uid():
    return str(uuid.uuid1())[:5]

class APIResponse(Response):
    @classmethod
    def respond(cls, data):
        return make_response(jsonify(data=data))