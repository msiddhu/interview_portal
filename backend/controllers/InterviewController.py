import json
from flask import Blueprint,request
from core import Utils
from core.Logic import can_create_interview, check_data
from exts import db, APIResponse
from libs import ScheduleError
from libs.Helpers import get_message, str_to_date

interview_resources = Blueprint('interview_resources', __name__)

'''
Payload:
{
start:str
end:str
participants:[]
}
'''
@interview_resources.route('/create', methods=['POST'])
def create(function='create'):
    data = json.loads(request.data)
    participants_email = [data['person1'], data['person2']]
    start = str_to_date(data['start'])
    end = str_to_date(data['end'])
    check_data(start, end, participants_email)
    if can_create_interview(participants_email, start, end):
        return Utils.create_interview(start,end,participants_email,function)
    else:
        raise ScheduleError(400, "Interview already exists participants")



'''
{
    interview_id:bigInteger
    start:str
    end:str
    participants_emails:[]
}
'''
@interview_resources.route('/edit', methods=['POST'])
def edit():
    data = json.loads(request.data)
    interview_id = data['interview_id']
    Utils.delete_interview(interview_id)
    try:
        response=create("edit")
        return response
    except Exception as exception:
        print(exception)
        db.session.rollback()
        raise exception




@interview_resources.route('/delete/<interview_id>', methods=['POST'])
def delete(interview_id):
    try:
        Utils.delete_interview(interview_id)
        db.session.commit()
        APIResponse.respond(get_message("Interview deleted sucussfully"))
    except:
        raise Exception("There is not interview present")



