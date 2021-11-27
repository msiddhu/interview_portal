from datetime import datetime
from exts import db
from libs import ScheduleError, ParticipantsError
from libs.Helpers import is_missing
from models import Person


def is_overlapping(start1, end1, start2, end2):
    if (start1 <= start2 and end1 >= start2 and end1 <= end2): return True
    if (start1 >= start2 and start1 <= end2 and end1 >= end2): return True
    if (start1 >= start2 and end1 <= end2): return True
    if (start1 <= start2 and end1 >= end2): return True
    return False


def person_available(email: str, currstart: datetime, currend: datetime):
    person = db.session.query(Person).filter_by(email=email).one()
    interviews = person.interviews
    for interview in interviews:
        if is_overlapping(currstart, currend, interview.start, interview.end):
            print('hello',person.name)
            error_message=person.name+" has an another interview scheduled"
            print(error_message)
            raise ScheduleError(400,error_message)
    return True


def can_create_interview(emails: [], start: datetime, end: datetime):
    for email in emails:
        person_available(email, start, end)
    return True


def check_data(start, end, participants_email):
    lis=is_missing(start, end, participants_email[0], participants_email[1])
    if len(lis)!=0:
        missing='and'.join(lis)
        raise ParticipantsError(400,"These are missing "+missing)

    if participants_email[0] == participants_email[1]:
        raise ParticipantsError(400,"Same Persons")

    if start >= end:
        raise ScheduleError(400,"Problem with start time and end time")

    if start < datetime.now():
        raise ScheduleError(400, "Start is in the past. please change it to future")
