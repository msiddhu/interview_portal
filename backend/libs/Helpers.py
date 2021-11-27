
from datetime import datetime
import json
import uuid



format="%Y-%m-%dT%H:%M"

def get_utc_now():
    return datetime.utcnow()


def to_json(dictionary):
    return json.dumps(dictionary, indent = 4)

def date_to_str(date):
    return date.strftime(format)

def str_to_date(date):
    try:
        date=datetime.strptime(date,format)
        return date
    except:
        return None


def is_missing(*list):
    missing=[]
    for i in range(len(list)):
        if list[i]==None or list[i]=="":
            missing.append(missing_properties[i])
    return missing


def get_uid():
    return str(uuid.uuid1())[:5]


def get_message(message):
    return {"message":message}

missing_properties={
    0:"Start",
    1:"End",
    2:"Person 1",
    3:"Person 2"
}

sentence={
    "edit":"Rescheduled interview",
    "create":"Scheduled interview"
}


