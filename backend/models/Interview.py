from sqlalchemy import Column, String, DateTime
from exts import db


class Interview(db.Model):
    __tablename__ = 'interview'
    interview_id = Column(String, primary_key=True)
    start = Column(DateTime)
    end = Column(DateTime)

    def __repr__(self):
        return f'{self.interview_id}, {self.start} and {self.end} and {self.participants}'

    @classmethod
    def get_all(cls):
        row_list = db.session.query(Interview).all()
        return row_list
