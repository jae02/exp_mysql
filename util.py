from datetime import datetime, timedelta
import datetime
import pymysql
import json
import random


def getConn():
    conn = pymysql.connect(host='teambox.kr',port=3306, user='root', password='0720',
                           cursorclass=pymysql.cursors.DictCursor,
                           db='jay', charset='utf8')
    return conn



def objToJson(object) :
    return json.dumps(object , ensure_ascii=False)

def getTodayWithHourMin() :
    today = datetime.datetime.today().strftime("%Y%m%d%H%M")
    return  str(today)

def token() :

    return random.getrandbits(128)