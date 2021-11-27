import json
from datetime import datetime

from flask import Blueprint

from core.Logic import can_create_interview
from exts import db

from flask import request,make_response
from libs import ParticipantsError,ScheduleError
from libs.helpers import get_uid, APIResponse
from models import Interview, Person
from models.association import schedules

interview_resources = Blueprint('interview_resources', __name__)

'''
Payload:

{
start:str
end:str
participants:[]
}
'''

#should convert to python date and time
@interview_resources.route('/create',methods=['POST'])
def create_interview(payload=None,uid=None):
    data=json.loads(request.data)
   # print(data)
    participants_email=[data['person1'],data['person2']]
    format="%Y-%m-%dT%H:%M"
    start=datetime.strptime(data['start'],format)
    end=datetime.strptime(data['end'],format)
    print(type(start),type(end),participants_email)
    if(len(participants_email)<2):
        raise ParticipantsError(400,"The participants are only "+str(len(participants_email))+'please select more')

    elif(can_create_interview(participants_email,start,end)):
        interview_id=uid if uid is not None else get_uid()
        print(interview_id)
        new_interview=Interview(interview_id=interview_id,start=start,end=end)
        for email in participants_email:
            p=db.session.query(Person).filter_by(email=email).all()[0]
            new_interview.participants.append(p)

        db.session.add(new_interview)
        db.session.commit()

        return APIResponse.respond("Interview Created")


    else:
        raise ScheduleError





'''
{
    interview_id:bigInteger
    start:str
    end:str
    participants_emails:[]
}
'''

'''
first delete the existing interview 
then create a new interview. 
if creating new interview with same UID is not possible then "roll back" and raise the error.
'''
@interview_resources.route('/edit',methods=['POST'])
def edit_interview(request):
    interview_id=request['interview_id']
    db.session.query(Interview).filter_by(interview_id=interview_id).delete()
    try:
        response=create_interview(request,interview_id)
        return response
    except Exception as exception:
        db.session.rollback()
        raise exception




