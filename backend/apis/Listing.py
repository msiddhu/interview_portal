from flask import Blueprint
import json
from exts import db
from libs.helpers import to_date, to_json, APIResponse
from models import Interview, Person

listing_resources = Blueprint('listing_resources', __name__)

@listing_resources.route('/interviews',methods=['GET'])
def list_interviews():
    interviews=db.session.query(Interview).all()
    interview_list=[]
    for interview in interviews:
        interview_dict={'start':to_date(interview.start),
                        'end':to_date(interview.end),
                        'interview_id':interview.interview_id,
                        }
        participants=[]
        for p in interview.participants:
            participants.append({'email': p.email, 'name': p.name})
        interview_dict['participants']=participants
        interview_list.append(interview_dict)
    return APIResponse.respond(interview_list)




@listing_resources.route('/persons',methods=['GET'])
def list_person():
    persons=db.session.query(Person).all()
    persons_list=[]
    for person in persons:
        persons_list.append({'email':person.email,'name':person.name})
    print(persons_list)
    return APIResponse.respond(persons_list)


