import requests
from django.conf import settings


class SMS(object):
    URL = 'http://smsc.ru/sys/send.php'
    LOGIN = settings.SMS_LOGIN
    PASSWORD = settings.SMS_PASSWORD

    def __init__(self):
        pass

    def send(self, msg, phones):
        # phones has string values separated by ';' or ','
        try:
            msg = msg.encode('cp1251')
        except:
            pass
        params = {
            'login': self.LOGIN,
            'psw': self.PASSWORD,
            'sender': settings.SMS_SENDER,
            'phones': phones,
            'mes': msg,
            # 'time': '0803210830' or '08.03.21 08:30'
            # 'tz': '0' or '2'
        }
        resp = requests.post(url=self.URL, params=params)
        return resp
