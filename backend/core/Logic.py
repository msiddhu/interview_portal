from datetime import datetime

from exts import db
from models import Person

def is_overlapping(start1,end1,start2,end2):
    if( start1<=start2 and end1>=start2 and end1<=end2):return True
    if(start1 >=start2 and start1<=end2 and end1>=end2):return True
    if(start1>=start2 and end1 <=end2):return True
    if(start1<=start2 and end1>=end2):return True
    return False

def person_available(email: str, currstart: datetime, currend: datetime):
    person = db.session.query(Person).filter_by(email=email).all()
    print(person)
    interviews = person[0].interviews

    for interview in interviews:

        if is_overlapping(currstart, currend, interview.start, interview.end):
            return False

    return True


def can_create_interview(emails: [], start: datetime, end: datetime):
    for email in emails:
        if not person_available(email, start, end):
            return False
    print('can create')

    return True
