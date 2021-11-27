import uuid

from exts import db, APIResponse
from libs.Helpers import sentence, date_to_str
from models import Interview, Person


class Utils:
    @classmethod
    def delete_interview(cls,interview_id):
        try:
            interview = db.session.query(Interview).filter_by(interview_id=interview_id).all()[0]
            interview.participants=[]
            db.session.query(Interview).filter_by(interview_id=interview_id).delete()

        except:
            return

    @classmethod
    def create_interview(cls,start,end,participants_email,function):
        db.session.commit()
        interview_id =str(uuid.uuid1())[:5]
        print(interview_id)
        new_interview = Interview(interview_id=interview_id, start=start, end=end)

        for email in participants_email:
            p = db.session.query(Person).filter_by(email=email).all()[0]
            new_interview.participants.append(p)

        db.session.add(new_interview)
        db.session.commit()
        #send_mail(sentence[function],participants_email,start,end)
        return APIResponse.respond(data={"message":sentence[function]})

    @classmethod
    def extract_details(cls,interview):
        interview_dict = {'start': date_to_str(interview.start),
                          'end': date_to_str(interview.end),
                          'interview_id': interview.interview_id}
        participants = []
        for p in interview.participants:
            participants.append({'email': p.email, 'name': p.name})

        interview_dict['participants'] = participants
        return interview_dict


