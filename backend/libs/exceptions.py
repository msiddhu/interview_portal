


class ScheduleError(Exception):
    status_code = 400

    def __init__(self, status_code=400, message="Interview exits for the participants"):
        Exception.__init__(self)
        self.message = message
        self.status_code = status_code

    def to_dict(self):
        res = dict()
        res['message'] = self.message
        return res


class ParticipantsError(Exception):
    status_code = 400

    def __init__(self, status_code, message="Please check the participants and timings"):
        Exception.__init__(self)
        self.message = message
        self.status_code = status_code

    def to_dict(self):
        res = dict()
        res['message'] = self.message
        return res
