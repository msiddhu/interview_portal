from flask import Response, make_response, jsonify
from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy

FORMAT="%Y-%m-%dT%H:%M"
db = SQLAlchemy()
mail=Mail()


class APIResponse(Response):
    @classmethod
    def respond(cls, data,status_code=200):
        return make_response(jsonify(data=data),status_code)


def send_mail(header,recipients,start,end):
    msg = Message(
        header+' interview',
        sender='malladisiddhu@gmail.com',
        recipients=recipients
    )

    start=start.strftime(FORMAT)
    end=end.strftime(FORMAT)
    recipients_str=' and '.join(recipients)

    msg.body = 'An interview has been scheduled for '+recipients_str+'from'+start+' to '+end
    print(msg)
    mail.send(msg)
    print(mail.state)
    return True