from sqlalchemy import Column, Integer, ForeignKey, String

from exts import db
from models.Interview import Interview

schedules=db.Table(
    'schedules',
    Column('interview_id',String,ForeignKey(Interview.interview_id)),
    Column('email',String,ForeignKey('person.email'))
)