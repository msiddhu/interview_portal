import datetime

from flask import Blueprint
from core import Utils
from exts import db, APIResponse
from models import Interview, Person

listing_resources = Blueprint('listing_resources', __name__)

@listing_resources.route('/interview/<interview_id>', methods=['GET'])
def get_interview(interview_id):
    interview = db.session.query(Interview).filter_by(interview_id=interview_id).one()
    return APIResponse.respond(Utils.extract_details(interview))


@listing_resources.route('/interviews', methods=['GET'])
def list_interviews():
    now = datetime.datetime.now()
    interviews = db.session.query(Interview).filter(Interview.start >= now).order_by(Interview.start).all()
    interview_list = []
    for interview in interviews:
        print(interview.get_all())
        interview_list.append(Utils.extract_details(interview))
    return APIResponse.respond(interview_list)


@listing_resources.route('/persons', methods=['GET'])
def list_person():
    persons = db.session.query(Person).all()
    persons_list = []
    for person in persons:
        persons_list.append({'email': person.email, 'name': person.name})
    return APIResponse.respond(persons_list)
