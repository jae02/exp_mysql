#-*- coding: utf-8 -*-
from flask import Flask , render_template , request
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import json
import os
import util
import ast



app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@cross_origin()

@app.route('/search' , methods=['GET', 'POST'])
def search():
    return render_template("index.html")

@app.route('/fileUpload' , methods=['GET', 'POST'])
def fileUpload():
    for i in range((len(request.files)-1)):
        f = request.files["link"+str(i)]
        s= f.filename
        f.save('./static/video/' + s)

    keywordlist = []
    conn = util.getConn()
    cursor = conn.cursor()
    select = "select keyname from keyword"
    cursor.execute(select)
    valaue = cursor.fetchall()
    conn.commit()
    for i in range(len(valaue)):
        keywordlist.append(str(valaue[i]))

    return render_template("videoPage.html", key_word=keywordlist)

@app.route('/fileUpload1' , methods=['GET', 'POST'])
def search7():
    for i in range((len(request.files)-1)):
        f = request.files["thumbname"+str(i)]
        s= f.filename
        f.save('./static/image/' + s)
    keywordlist = []
    conn = util.getConn()
    cursor = conn.cursor()
    select = "select keyname from keyword"
    cursor.execute(select)
    valaue = cursor.fetchall()
    conn.commit()
    for i in range(len(valaue)):
        keywordlist.append(str(valaue[i]))

    return render_template("videoPage.html", key_word=keywordlist)

@app.route('/postUpload' , methods=['GET', 'POST'])
def postUpload():
    for i in range((len(request.files)-1)):
        f = request.files["poster"+str(i)]
        s= f.filename
        f.save('./static/image/' + s)
    keywordlist = []
    conn = util.getConn()
    cursor = conn.cursor()
    select = "select keyname from keyword"
    cursor.execute(select)
    valaue = cursor.fetchall()
    conn.commit()
    for i in range(len(valaue)):
        keywordlist.append(str(valaue[i]))

    return render_template("videoPage.html", key_word=keywordlist)
@app.route('/search3' , methods=['GET', 'POST'])
def search3():
    conn=util.getConn()
    cursor = conn.cursor()
    select = "select keyname from keyword"
    cursor.execute(select)
    valaue = cursor.fetchall()[0]
    conn.commit()
    conn.close()

    list=[]

    return render_template("keyword.html", videoList=list)


@app.route('/videoList' , methods=['GET', 'POST'])
@cross_origin()
def videoList():

    conn=util.getConn()
    cursor = conn.cursor()
    select = "select * from new_table"
    cursor.execute(select)
    conn.commit()
    valaue = {}
    valaue['list'] = cursor.fetchall()
    conn.close()
    return util.objToJson(valaue)


@app.route('/keywordList' , methods=['GET', 'POST'])
@cross_origin()
def keywordList():
    conn=util.getConn()
    cursor = conn.cursor()
    select = "select videoname from new_table"
    cursor.execute(select)
    conn.commit()
    valaue = {}
    valaue['list'] = cursor.fetchall()

    select1 = "select * from new_table"
    cursor.execute(select1)
    conn.commit()
    valaue['list1'] = cursor.fetchall()

    conn.close()
    return util.objToJson(valaue)


@app.route('/search1' , methods=['GET', 'POST'])
def search1():
    videoId = request.args.get('id')
    conn=util.getConn()
    cursor = conn.cursor()
    select = "select link from new_table where videoname = %s"
    cursor.execute(select,videoId)
    conn.commit()
    valaue = cursor.fetchall()[0]
    video_file = valaue['link']
    conn.close()
    return render_template("video.html", video_file="video/"+str(video_file))


@app.route('/searchkey' , methods=['GET', 'POST'])
def searchkey():
    keywordId = request.args.get('id')
    conn=util.getConn()
    cursor = conn.cursor()
    select = "select seq from key1 where keyword = %s"
    cursor.execute(select,keywordId) #키워드에 해당하는 seq
    conn.commit()
    valaue = cursor.fetchall()
    videoList = []  # 키워드에 해당하는 리스트의 정보
    videoList1= []  # 키워드에 아직 안들어간 리스트의 정보
    keywordlist= []
    sql = "select * from new_table where seq = %s"  # 선택한다 모든정보를 뉴테이블에 있는 seq가 키워드에 해당하는
    sql1= "select * from jay.new_table where seq NOT IN(select seq from jay.key1 where keyword = %s)"
    cursor.execute(sql1, keywordId)
    conn.commit()
    result = cursor.fetchall()

    for i in range(len(result)) :
        videoList1.append(result[i])
        keywordlist.append(str(keywordId))
    for i in range(len(valaue)) :
        keywordlist.append(str(keywordId))
        print(valaue[i]['seq'])
        cursor = conn.cursor()
        cursor.execute(sql, valaue[i]['seq'])
        conn.commit()
        videoList.append(cursor.fetchall()[0])
    conn.close()

    return render_template("keywordPage.html", keywordlist=keywordlist , videoList = videoList,videoList1 = videoList1)

@app.route('/searchList' , methods=['GET', 'POST'])
def searchList():
    keywordId = request.args.get('id')
    conn=util.getConn()
    cursor = conn.cursor()
    select = "select * from jay.new_table where videoname = %s"
    cursor.execute(select,keywordId)
    conn.commit()
    valaue = {}
    valaue['list'] = cursor.fetchall()
    conn.close()
    return util.objToJson(valaue)

@app.route('/searchkey1' , methods=['GET', 'POST'])
def searchkey1():
    keywordId = request.args.get('id')
    conn=util.getConn()
    cursor = conn.cursor()
    select = "select seq from key1"
    cursor.execute(select)
    conn.commit()
    valaue = {}
    valaue['list'] = cursor.fetchall()

    conn.close()
    return util.objToJson(valaue, key_word=keywordId)




@app.route('/addShow' , methods=['GET', 'POST'])
@cross_origin()
def addShow():
    videoId = request.args.get('id')
    conn=util.getConn()
    cursor = conn.cursor()
    update = "UPDATE jay.new_table SET videoId = 1 WHERE seq = %s"
    cursor.execute(update, videoId)
    conn.commit()
    conn.close()
    return render_template("keyword.html")

@app.route('/subShow' , methods=['GET', 'POST'])
@cross_origin()
def subShow():
    videoId = request.args.get('id')
    conn=util.getConn()
    cursor = conn.cursor()
    update = "UPDATE jay.new_table SET videoId = 0 WHERE seq = %s"
    cursor.execute(update, videoId)
    conn.commit()
    conn.close()
    return render_template("keyword.html")

@app.route('/putkey' , methods=['GET', 'POST'])
@cross_origin()
def putkey():
    videoId = request.args.get('id')
    seqId = request.args.get('seq')
    print(videoId)
    print(seqId)
    conn=util.getConn()
    cursor = conn.cursor()
    update = 'insert into jay.key1(keyword,seq) values(%s, %s)'
    par=(videoId,seqId)
    cursor.execute(update, par)
    conn.commit()
    conn.close()
    return render_template("keyword.html")

@app.route('/outkey' , methods=['GET', 'POST'])
@cross_origin()
def outkey():
    videoId = request.args.get('id')
    seqId = request.args.get('seq')
    conn = util.getConn()
    cursor = conn.cursor()
    sql = 'DELETE FROM jay.new_table WHERE videoname=%s and seq=%s;'
    par =(videoId,seqId)
    cursor.execute(sql,par)
    conn.commit()
    conn.close()
    result = {}
    result["status"] = 200

    return render_template("keyword.html")

@app.route('/search2' , methods=['GET', 'POST'])
def search2():
    keywordlist= []
    conn=util.getConn()
    cursor = conn.cursor()
    select = "SELECT keyname FROM jay.keyword"
    cursor.execute(select)
    valaue = cursor.fetchall()
    conn.commit()
    conn.close()
    for i in range(len(valaue)):
        keywordlist.append(str(valaue[i]))
    return render_template("videoPage.html", keywordlist=keywordlist , v = util.token())



@app.route('/search4' , methods=['GET', 'POST'])
def search4():
    return render_template("user.html" , v= util.token())


@app.route('/newVideo' , methods=['GET', 'POST'])
def newVideo():
    data = request.get_json()
    thumbimage = data['thumbname']
    thumbtext = data['thumbtext']
    link = data['link']
    text = data['text']
    textarea = data['imform']
    keyword = data['combo1']
    videoId = data['ID']
    vrId = data['vrId']
    poster = data['poster']
    date1=util.getTodayWithHourMin()
    conn = util.getConn()
    cursor = conn.cursor()
    sql = 'insert into jay.new_table(thumbimage,date,link,videoname,videoId,category,description,thumbtext,vrId,poster) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
    par = (thumbimage,date1,link,text,videoId,keyword,textarea,thumbtext,vrId,poster)
    cursor.execute(sql,par)
    conn.commit()
    conn.close()
    if videoId== "1" :
        conn = util.getConn()
        cursor = conn.cursor()
        select = 'SELECT seq FROM jay.new_table where link = %s'
        cursor.execute(select,link)
        seqId = cursor.fetchall()
        conn.commit()
        conn.close()
        seqId = seqId[len(seqId)-1]['seq']
        conn = util.getConn()
        cursor = conn.cursor()
        update = 'insert into jay.key1(keyword,seq) values(%s, %s)'
        par = (keyword, seqId)
        cursor.execute(update, par)
        conn.commit()
        conn.close()

    keywordlist= []
    conn=util.getConn()
    cursor = conn.cursor()
    select = "SELECT keyname FROM jay.keyword"
    cursor.execute(select)
    valaue = cursor.fetchall()
    conn.commit()
    conn.close()
    for i in range(len(valaue)):
        keywordlist.append(str(valaue[i]))

    return render_template("videoPage.html", keywordlist=keywordlist , v = util.token())

@app.route('/newkeyword' , methods=['GET', 'POST'])
def newkeyword():
    text = request.form['text']
    conn = util.getConn()
    cursor = conn.cursor()
    sql = 'insert into keyword(keyname) values(%s)'
    cursor.execute(sql,text)
    conn.commit()
    conn.close()
    return render_template("keyword.html")

@app.route('/delkeyword' , methods=['GET', 'POST'])
def delkeyword():
    text = request.form['text']
    conn = util.getConn()
    cursor = conn.cursor()
    sql = 'DELETE FROM keyword WHERE keyname=%s'
    cursor.execute(sql,text)
    conn.commit()
    conn.close()
    return render_template("keyword.html")

@app.route('/getAllUser' , methods=['GET', 'POST'])
def getAllUser():
    conn = util.getConn()
    cursor = conn.cursor()
    sql = 'SELECT * FROM untactcustomer'
    cursor.execute(sql)
    result = {}
    result['status'] = 200
    result['users'] = cursor.fetchall()
    return util.objToJson(result)


app.run(host='0.0.0.0' , port = 5100 , debug=True)
