var teambox = "http://teambox.kr:5100";
var names = [];
var names1 = [];
var asd = [];
var cnt = [];
var cnt1 = 0;
var cnt2 = 0;
var seqs = [];
var seqs1 = [];
var seq = [];
var key = "";
var unique = "";
var unique2 = "";
var unique3 = "";
var users = [];

function putQuery(url, key, value) {
    url = url + "&" + key + "=" + value;
    return url;
}
function putQuery2(url, key, value, key1, value1) {
    url = url + "&" + key + "=" + value + "&" + key1 + "=" + value1;
    return url;
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

function getVideoList() {

    $(document).ready(function () {

        $.ajax({

            url: teambox + "/videoList",

            type: "post",

            accept: "application/json",

            contentType: "application/json; charset=utf-8",

            data: null
            ,
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                var dataHolder = data.list;
                var listContainer = document.getElementById("listContainer");
                var listItem = document.getElementsByClassName("listItem")[0];
                for (i = 0; i < data.list.length; i++) {
                    names[i] = dataHolder[i].videoname;
                    var clone = listItem.cloneNode(true);
                    listContainer.appendChild(clone);

                    if (data.list[i]["videoId"] === '0') {
                        img = 'onclick="addbuttonClick(' + i + ')" style="padding:0px; margin:0px; background-color:#ffffff;border:none; float:right; margin:10px;">  <img src="static/image/plus.jpg" width=30px >'
                    } else {
                        img = 'onclick="subbuttonClick(' + i + ')" style="padding:0px; margin:0px; background-color:#ffffff;border:none; float:right; margin:10px;">  <img src="static/image/minus.jpg" width=30px>'
                    }

                    clone.getElementsByClassName("itemName")[0].innerHTML = '<a class="lists" methods="post" onclick="onvideoClick(' + i + ');" style="display:inline;"> ' +
                        "<img src=static/image/" + data.list[i]["thumbimage"] + " width=50px height=50px >" + " 영상제목: " + data.list[i]["videoname"] + " 링크: " + data.list[i]["link"] + " 업로드 날짜: " + data.list[i]["date"]
                        + "</a> " + '<button type="submit" method="post"  href="/addShow" ' + img + '</button>'
                }

                listItem.style.display = "none";

            },

            error: function (jqXHR, textStatus, errorThrown) {

                alert('400');
// fail handle

            }

        });

    });

}

function getkeyList(i) {

    localurl = teambox + "/searchList?";
    localurl = putQuery(localurl, "id", names[i]);
    $(document).ready(function () {
        $.ajax({

            url: localurl,

            type: "post",

            accept: "application/json",

            contentType: "application/json; charset=utf-8",

            data: null
            ,
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                var dataHolder = data.list;


                var tbody = document.getElementById('tbody');
                var tr1 = null;
                var td = null;
                dov = document.getElementById('skey1');
                for (i = 0; i < data.list.length; i++) {
                    names1[cnt2] = dataHolder[i].videoname;
                    seqs1[cnt2] = dataHolder[i].seq;
                    dov.innerHTML = ++cnt1;


                    asd[i] = dataHolder[i].keyword;
                    tr1 = document.createElement('tr');
                    tr1.setAttribute("name", dataHolder[i].videoname);
                    tbody.appendChild(tr1);
                    td = document.createElement('td');
                    td.innerHTML = '<input type="checkbox" style="margin:15px;" name="' + dataHolder[i].videoname + '">';
                    tr1.appendChild(td);

                    td = document.createElement('td');
                    td.innerHTML = dataHolder[i].videoname;
                    tr1.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = dataHolder[i].date;
                    tr1.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = dataHolder[i].videoId;
                    if (dataHolder[i].videoId == 1) {
                        td.innerHTML = '<input type=button onclick="addbuttonClick(' + cnt2 + ')" style=" height:40px;padding:0px; margin:0px; width:50%;background-color:#87CEEB; border:1px solid black;" value="공개">' +
                            '<input type=button onclick="subbuttonClick(' + cnt2 + ')" style=" height:40px;padding:0px; margin:0px; width:50%;background-color:#ffffff;border:1px solid black;" value="비공개">'
                    } else {
                        td.innerHTML = '<input type=button onclick="addbuttonClick(' + cnt2 + ')" style=" height:40px;padding:0px; margin:0px; width:50%;background-color:#ffffff;" value="공개">' +
                            '<input type=button onclick="subbuttonClick(' + cnt2 + ')" style=" height:40px;padding:0px; margin:0px; width:50%;background-color:#87CEEB;" value="비공개">'
                    }
                    tr1.appendChild(td);
                    td = document.createElement('td');
                    //td.innerHTML ='<button method="post" onclick="outkeybuttonClick('+cnt2+')" style=" border:none;font-size:50px;height:40px;padding:0px; margin:0px; background-color:#ffffff;">-</button>';
                    td.innerHTML = '<input type=button onclick="outkeybuttonClick(' + cnt2 + ')" style=" border:none;font-size:50px;height:40px;padding:0px; margin:0px; background-color:#ffffff;" value="-">'
                    tr1.appendChild(td);
                    cnt2++;


                }

            },

            error: function (jqXHR, textStatus, errorThrown) {

                alert('400');
// fail handle

            }

        });

    });

}

function subkeyList(i) {
    var element = document.getElementsByName(names[i]);
    dov = document.getElementById('skey1');
    cnt1 = cnt1 - element.length / 2;
    for (var k = element.length - 1; k >= 0; k--)
        if (element[k] && element[k].parentElement)
            element[k].parentElement.removeChild(element[k]);

    dov.innerHTML = cnt1;


}

function getkeywordList() {

    $(document).ready(function () {

        $.ajax({

            url: teambox + "/keywordList",

            type: "post",

            accept: "application/json",

            contentType: "application/json; charset=utf-8",

            data: null
            ,
            dataType: "JSON",
            crossDomain: true,
            success: function (data) {
                var dataHolder = data.list;
                var dataHolder1 = data.list1;
                var listContainer = document.getElementById("keynav");
                var listItem = document.getElementsByClassName("key")[0];

                var clone = listItem.cloneNode(true);
                listContainer.appendChild(clone);
                clone.innerHTML = "전체 게시물" + "   " + data.list.length;
                m = data.list.length;
                keycount = keycount(dataHolder, m);
                count = JSON.stringify(keycount);

                for (i = 0; i < keycount.length; i++) {
                    names[i] = keycount[i]["key"];
                    cnt[i] = keycount[i]["val"];
                    var clone = listItem.cloneNode(true);
                    listContainer.appendChild(clone);
                    text = '<input type="checkbox" id="' + names[i] + '"   style="margin:15px;" onclick="change1(this,' + i + ')">' + names[i] + " " + cnt[i];
                    clone.innerHTML = text;
                }
                var clone = listItem.cloneNode(true);
                listContainer.appendChild(clone);
                clone.innerHTML = '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>';
                listItem.style.display = "none";
            },

            error: function (jqXHR, textStatus, errorThrown) {

                alert('400');
// fail handle

            }

        });

    });

}

function keycount(dataHolder, m) {
    var inputArr = [];
    for (i = 0; i < m; i++) {
        inputArr[i] = dataHolder[i].videoname;
    }
    var outputArr = [];
    var compVal = 0;
    var cnt = 0;
    var overlap = {};
    var overlapArr = [];
    var isBreak = false;

    for (var i = 0; i < inputArr.length; i++) {
        for (var j = i; j < inputArr.length; j++) {

            compVal = inputArr[i];
            for (var k = 0; k < overlapArr.length; k++) {

                if (overlapArr[k].key == compVal) {
                    isBreak = true;
                    break;
                }

            }

            if (isBreak) {
                isBreak = false;
                break;
            }

            if (compVal == inputArr[j]) {
                overlap.key = compVal;
                overlap.val = ++cnt;
            }
        }

        if (Object.keys(overlap).length > 0) {
            overlapArr.push(overlap);
        }


        overlap = {};
        cnt = 0;
    }

    return (overlapArr);
}


function change1(cb, i) {
    if (cb.checked) {
        getkeyList(i)
    } else {
        subkeyList(i)
    }

}


function onkeywordClick(i) {
    localurl = teambox + "/searchkey?";
    localurl = putQuery(localurl, "id", names[i]);
    window.location.href = localurl;
};

function onvideoClick(i) {
    localurl = teambox + "/search1?";
    localurl = putQuery(localurl, "id", names[i]);
    window.location.href = localurl;
};

function addbuttonClick(i) {
    localurl = teambox + "/addShow?";
    alert(seqs1[i]);
    localurl = putQuery(localurl, "id", seqs1[i]);
    window.location.href = localurl;
};

function subbuttonClick(i) {
    localurl = teambox + "/subShow?";
    alert(seqs1[i]);
    localurl = putQuery(localurl, "id", seqs1[i]);
    window.location.href = localurl;
};

function putkeybuttonClick(i) {
    localurl = teambox + "/putkey?";
    localurl = putQuery2(localurl, "id", names[i], "seq", seqs1[i]);
    window.location.href = localurl;
};

function outkeybuttonClick(cnt2) {
    localurl = teambox + "/outkey?";
    localurl = putQuery2(localurl, "id", names1[cnt2], "seq", seqs1[cnt2]);
    window.location.href = localurl;
};


function makeList(list, keywordList) {
    var listContainer1 = document.getElementById("listContainer1");
    var listItem1 = document.getElementsByClassName("listItem1")[0];
    for (i = 0; i < list.length; i++) {
        names[i] = keywordList[i];
        seq[i] = list[i].seq;
        img = 'onclick="outkeybuttonClick(' + i + ')" style="padding:0px; margin:0px; background-color:#ffffff;border:none; float:right; margin:10px;">  <img src="static/image/minus.jpg" width=15px>'
        var clone = listItem1.cloneNode(true);
        listContainer1.appendChild(clone);
        clone.getElementsByClassName("itemName1")[0].innerHTML = '<a class="lists" methods="post" onclick="onvideoClick(' + i + ');" style="display:inline;"> ' +
            list[i]['videoname'] + "</a> " + '<button type="submit" method="post"  href="/addShow" ' + img + '</button>'
    }
    listItem1.style.display = "none";
}

function makeList1(list, keywordList) {
    var listContainer = document.getElementById("listContainer");
    var listItem = document.getElementsByClassName("listItem")[0];
    for (i = 0; i < list.length; i++) {
        names[i] = keywordList[i];
        seqs[i] = list[i].seq;
        img = 'onclick="putkeybuttonClick(' + i + ')" style="padding:0px; margin:0px; background-color:#ffffff;border:none; float:right; margin:10px;">  <img src="static/image/plus.jpg" width=15px>'
        var clone = listItem.cloneNode(true);
        listContainer.appendChild(clone);
        clone.getElementsByClassName("itemName")[0].innerHTML = '<a class="lists" methods="post" onclick="onvideoClick(' + i + ');" style="display:inline;"> ' +
            list[i]['videoname'] + "</a> " + '<button type="submit" method="post"  href="/addShow" ' + img + '</button>'
    }
    listItem.style.display = "none";
}

function comboList(keywordList) {
    var listContainer = document.getElementById("combo1");
    var listItem = document.getElementsByClassName("combo2")[0];
    for (i = 0; i < keywordList.length; i++) {
        names[i] = keywordList[i];
        var clone = listItem.cloneNode(true);
        listContainer.appendChild(clone);
        names[i] = names[i].substring(13, names[i].length - 2);
        clone.innerHTML = names[i];
    }
}

function testajax1() {
     LoadingWithMask();
    var searchE1 = document.getElementById('text').value;
    var searchE2 = document.getElementById('imform').value;
    var searchE3 = document.getElementById('thumbname').value.substring(12);
    var searchE4 = document.getElementById('thumbtext').value;
    var searchE5 = document.getElementById('link').value.substring(12).split('.');
    var searchE6 = document.getElementById('combo1').value;
    var searchE7 = "1";
    var searchE8 = "1";
    var searchE77 = document.getElementsByName('ID');
    var searchE88 = document.getElementsByName('vrId');
    var searchE9 = document.getElementsByName('poster');
    if (searchE77[1].checked) {
        searchE7 = "0";
    }
    if (searchE88[1].checked) {
        searchE8 = "0";
    }

    $(document).ready(function () {

        $.ajax({

            url: teambox + "/newVideo",

            type: "post",

            accept: "application/json",

            contentType: "application/json; charset=utf-8",

            data: JSON.stringify({
                "text": searchE1,
                "imform": searchE2,
                "thumbname": unique2,
                "thumbtext": searchE4,
                "link": unique,
                "combo1": searchE6,
                "ID": searchE7,
                "vrId": searchE8,
                "poster": unique3
            }),

            dataType: "JSON",
            crossDomain: true,
            success: function (data1) {
                closeLoadingWithMask();
                alert("업로드 성공!");
                window.location.reload();
            },
            error: function (request, status, error) {
                closeLoadingWithMask();
                alert("업로드 성공!");
// fail handle

            }


        });


    });
}

function testajax2() {
    LoadingWithMask();
    var form = $('#fileUploadForm')[0];
    var formData = new FormData(form);
    aa = $("#link")[0].files[0].name.split('.');
    unique = uuidv4() + "." + aa[1];
    for (var i = 0; i < $("#link")[0].files.length; i++) {
        formData.append("link" + i, $("#link")[0].files[i], unique);
    }

    $(document).ready(function () {

        $.ajax({

            url: teambox + "/fileUpload",

            type: "post",

            contentType: false,
            processData: false,
            data: formData,

            crossDomain: true,
            success: function (data) {
                closeLoadingWithMask();
                alert("업로드 성공!");
            },
            error: function (request, status, error) {
 closeLoadingWithMask();
                alert("업로드 실패!");
// fail handle

            }


        });


    });
}


function testajax3() {
    LoadingWithMask();
    var form = $('#fileUploadForm1')[0];
    var formData = new FormData(form);
    aa = $("#thumbname")[0].files[0].name.split('.');
    unique2 = uuidv4() + "." + aa[1];

    for (var i = 0; i < $("#thumbname")[0].files.length; i++) {
        formData.append("thumbname" + i, $("#thumbname")[0].files[i], unique2);
    }
    $(document).ready(function () {

        $.ajax({

            url: teambox + "/fileUpload1",

            type: "post",

            contentType: false,
            processData: false,
            data: formData,

            crossDomain: true,
            success: function (data) {
            closeLoadingWithMask();
                alert("업로드 성공!");
            },
            error: function (request, status, error) {
 closeLoadingWithMask();
                alert("업로드 실패!");
// fail handle

            }


        });


    });
}

function testajax4() {
 LoadingWithMask();
    var form = $('#postupload')[0];
    var formData = new FormData(form);
    aa = $("#poster")[0].files[0].name.split('.');
    unique3 = uuidv4() + "." + aa[1];

    for (var i = 0; i < $("#poster")[0].files.length; i++) {
        formData.append("poster" + i, $("#poster")[0].files[i], unique3);
    }
    $(document).ready(function () {

        $.ajax({

            url: teambox + "/postUpload",

            type: "post",

            contentType: false,
            processData: false,
            data: formData,

            crossDomain: true,
            success: function (data) {
                closeLoadingWithMask();
                alert("업로드 성공!");
            },
            error: function (request, status, error) {
 closeLoadingWithMask();
                alert("업로드 실패!");
// fail handle

            }


        });


    });
}

function getUsers() {

    $(document).ready(function () {

        $.ajax({

            url: teambox + "/getAllUser",

            type: "post",

            accept: "application/json",

            contentType: "application/json; charset=utf-8",

            data: null,
            dataType: "JSON",
            crossDomain: true,

            success: function (data) {
                users = data.users;
                setUserData();
            },
            error: function (request, status, error) {

// fail handle

            }


        });


    });
}

function  setUserData(){
    whole =  users.length;

    classes = [];
    classes[0] = 0;
    classes[1] =  0;
    classes[2] =  0;
    classes[3] = 0;
    texts = [];
    texts[0]="normal";
    texts[1]="kakao";
    texts[2]="naver";
    texts[3]="google";
    for(let i = 0 ; i<users.length ; i++){

        for(let j = 0 ; j< texts.length ;j++){
            if(users[i]["class"] === texts[j]){
                classes[j] = classes[j]+1;

            }

        }

    }
    document.getElementById("skey1").innerText = whole;



    wholeLabel = document.getElementById("wholeLabel");



    normal = document.getElementById("normalLabel");
    kakao = document.getElementById("kakaoLabel");
    naver = document.getElementById("naverLabel");
    google = document.getElementById("googleLabel");




    wholeLabel.innerText = "전체 " + whole;

    

    normal.innerText = "일반 " + classes[0];
    kakao.innerText = "카카오 " + classes[1];
    naver.innerText = "네이버 " + classes[2];
    google.innerText = "구글 " + classes[3];



}
function listenUser() {
    parent = document.getElementById("users");
    tempList = [];
    parent.innerText = "";
    whole = document.getElementById("whole").checked;
    normal = document.getElementById("normal").checked;
    kakao = document.getElementById("kakao").checked;
    naver = document.getElementById("naver").checked;
    google = document.getElementById("google").checked;
    if (whole) {
        for (let i = 0; i < users.length; i++) {
            let item = document.createElement("div");
            item.innerHTML = "로그인 종류: " + users[i]["class"] +"<br>" + "이메일: " + users[i]["email"]+"<br>";
            item.style.fontSize = "13px";
            item.style.padding = "0px 0px 0px 0px";
            parent.appendChild(item);
        }

        return;
    }

    if (normal) {
        for (let i = 0; i < users.length; i++) {
            if (users[i]["class"] == "normal") {

                let item = document.createElement("div");
                item.innerHTML = "로그인 종류: " + users[i]["class"] + "<br>" + "이메일: " + users[i]["email"]+"<br>";
                item.style.fontSize = "13px";
                item.style.padding = "0px 0px 0px 0px";
                parent.appendChild(item);
            }

        }

    }
    if (kakao) {
        for (let i = 0; i < users.length; i++) {
            if (users[i]["class"] == "kakao") {

                let item = document.createElement("div");
                item.innerHTML = "로그인 종류: " + users[i]["class"] +"<br>"+ "이메일: " + users[i]["email"] +"<br>";
                item.style.fontSize = "13px";
                item.style.padding = "0px 0px 0px 0px";
                parent.appendChild(item);
            }

        }

    }
    if (naver) {
        for (let i = 0; i < users.length; i++) {
            if (users[i]["class"] == "naver") {

                let item = document.createElement("div");
                item.innerHTML = "로그인 종류: " + users[i]["class"] + "<br>" + "이메일: " + users[i]["email"]+"<br>";
                item.style.fontSize = "13px";
                item.style.padding = "0px 0px 0px 0px";
                parent.appendChild(item);
            }

        }

    }
    if (google) {
        for (let i = 0; i < users.length; i++) {
            if (users[i]["class"] == "google") {

                let item = document.createElement("div");
                item.innerHTML = "로그인 종류: " + users[i]["class"] + "<br>" + "이메일: " + users[i]["email"]+"<br>";
                item.style.fontSize = "13px";
                item.style.padding = "0px 0px 0px 0px";
                parent.appendChild(item);
            }

        }

    }




}

function LoadingWithMask() {
    //화면의 높이와 너비를 구합니다.
    var maskHeight = $(document).height();
    var maskWidth  = window.document.body.clientWidth;

    //화면에 출력할 마스크를 설정해줍니다.
    var mask       ="<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
    var loadingImg ='';

    loadingImg +="<div id='loadingImg'>";
    loadingImg +=" <img src='../static/image/LoadingImg.gif' style='position: fixed; z-index:10000;display: block; margin: auto; left: 0; right:0;bottom: 0;top: 0;'/>";
    loadingImg +="</div>";

    //화면에 레이어 추가
    $('body')
        .append(mask)
        .append(loadingImg)

    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채웁니다.
    $('#mask').css({
            'width' : maskWidth
            ,'height': maskHeight
            ,'opacity' :'0.3'
    });

    //마스크 표시
    $('#mask').show();

    //로딩중 이미지 표시
    $('#loadingImg').show();
}


function closeLoadingWithMask() {
    $('#mask, #loadingImg').hide();
    $('#mask, #loadingImg').remove();
}





















