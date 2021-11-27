import datetime

from exts import db
from models.Interview import Interview
from models.Person import Person


def init_all():
    db.create_all()
    try:
        person1 = Person(email='msiddhu45@gmail.com', name='siddhu')
        person2 = Person(email='mchetan@gmail.com', name='chetan')
        person3 = Person(email='latha@gmail.com', name='latha')
        db.session.add(person1)
        db.session.add(person2)
        db.session.add(person3)

        db.session.commit()
    except:
        db.session.rollback()
        print("exception")

    print("Initialized the db")


def get_users():
    return Person.get_all()


def get_interviews():
    return Interview.get_all()
