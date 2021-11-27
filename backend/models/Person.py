from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from exts import db
from models.association import schedules


class Person(db.Model):
    __tablename__='person'
    email = Column(String, primary_key=True)
    name = Column(String)
    interviews = relationship('Interview', secondary=schedules,
                              backref= db.backref('participants',lazy='dynamic'))

    @classmethod
    def get_all(cls):
        tmp=db.session.query(Person).all().to_dict()
        return tmp