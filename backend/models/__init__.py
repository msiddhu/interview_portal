from exts import db
from models.Interview import Interview
from models.Person import Person


def init_all():
    db.create_all()
    try:
        person1 = Person(email='msiddhu45@gmail.com', name='Siddhartha Malladi')
        person2 = Person(email='malladichethan@gmail.com', name='Chetan Verma')
        person3 = Person(email='latha@gmail.com', name='Madhav Reddy')
        person4 = Person(email='tarakesh.polakolu@gmail.com', name='Tarakesh Polakolu')
        person5 = Person(email='santhosh.chakka@gmail.com', name='Santosh Chakka')
        db.session.add_all([person1,person2,person3,person4,person5])
        db.session.commit()

    except Exception as e:
        db.session.rollback()
        print("exception",e)

    print("Initialized the db")


