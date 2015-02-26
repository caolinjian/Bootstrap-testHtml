var storage = window.localStorage;
if(storage.getItem("scrollTop") == null){
  storage.setItem("scrollTop","0");
}

if(storage.getItem("size") == null){
  storage.setItem("size","16px");
}
if(storage.getItem("color") == null){
  storage.setItem("color","#333");
}
if(storage.getItem("backgroundColor") == null){
  storage.setItem("backgroundColor","#fff");
}
var prev = 0;
var next = 0;
function load(page,flag){
  if(flag){
    storage.setItem("scrollTop",0);
  }
  storage.setItem("m",page);
  var scriptBlock=document.createElement("script");
  scriptBlock.src="http://urltodata.sinaapp.com/get.php?url=http://www.ailing.cc/bookreader/"+page;
  scriptBlock.type = "text/javascript";scriptBlock.language = "javascript";scriptBlock.charset="GB2312";
  document.getElementsByTagName("head")[0].appendChild(scriptBlock);
  scriptBlock.onreadystatechange = scriptBlock.onload = function(){
    var text = GP.data.value;
    var title = text.substring(text.indexOf("【】")+2,text.indexOf("_爱玲书院"));
    var s = text.substring(text.indexOf("id= content"));
    var index = s.match(/32642-(\d+)\.html/g);
    prev =  index[0];
    next = index[1];
    if(s.indexOf("class= divimage") > 0){
      s = s.substr(11,s.indexOf("class= divimage")-15);
    }else{
      s = s.substr(11,s.indexOf("id= footlink")-22);
    }
    s = s.replace(/br/g,"<br>");
    if(s.length < 10){
      s = "<div class=\"alert alert-danger\" role=\"alert\">该页无文字内容</div>"+
          "<div class=\"spinner1\">"+
          "<div class=\"cube\"></div>"+
          "<div class=\"cube\"></div>"+
          "<div class=\"cube\"></div>"+
          "<div class=\"cube\"></div>"+
          "<div class=\"cube\"></div>"+
          "<div class=\"cube\"></div>"+
          "<div class=\"cube\"></div>"+
          "<div class=\"cube\"></div>"+
          "<div class=\"cube\"></div></div>";
    }
    s = "<h2>"+title+"</h2><p>"+s+"</p>";
    document.getElementById('content').style.fontSize = storage.getItem("size");
    document.getElementById('content').style.color = storage.getItem("color");
    document.getElementById('content').style.backgroundColor = storage.getItem("backgroundColor");
    document.getElementById('content').innerHTML=s;
    $('body,html').animate({scrollTop:storage.getItem("scrollTop")},1000);
  }
}
function portal(){
  var scriptBlock=document.createElement("script");
  scriptBlock.src="http://urltodata.sinaapp.com/get.php?url=http://www.ailing.cc/list/32642.html";
  scriptBlock.type = "text/javascript";scriptBlock.language = "javascript";scriptBlock.charset="GB2312";
  document.getElementsByTagName("head")[0].appendChild(scriptBlock);
  scriptBlock.onreadystatechange = scriptBlock.onload = function(){
    var text = GP.data.value;
    var s = text.match(/24px(\s+)(\W+)\s+h1/g);
    var s2 = text.match(/info(.+)div/g);
    var book = s[0].substring(5,s[0].indexOf("h1"));
    var author = s2[0].substring(5,s2[0].indexOf("div"));
    var mainArea = "<h2>"+book+"</h2><h3>"+author+"</h3>";
    mainArea += "<div class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">";
    var mainIndex = text.match(/【】(\s+)((\S+)|(\S+\s+\S+))(\s+)td/g);
    var mainHref = text.split("【】");
    for(var i=0;i<mainIndex.length;i++){
      var flag = "false";
      var flag2 = "collapse"
      if(i==0){
        flag = "true";
        flag2 = "collapse in"
      }
      mainArea += "<div class=\"panel panel-default\">"+
                  "<div class=\"panel-heading\">"+
                  "<h4 class=\"panel-title\">"+
                  "<center data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse"+i+"\" aria-expanded=\""+flag+"\" aria-controls=\"collapse"+i+"\">"+
                  mainIndex[i].substring(0,mainIndex[i].indexOf("td"))+
                  "</center></h4></div>"+
                  "<div id=\"collapse"+i+"\" class=\"panel-collapse "+flag2+"\" role=\"tabpanel\">"+
                  "<div class=\"panel-body\">";
      var hrefIndex = mainHref[i+1].match(/(\d+)-(\d+)\.html/g);
      for(var j=0;j<hrefIndex.length;j++){
        mainArea += "<div   onclick=\"javascript:load(\'"+hrefIndex[j]+"\',true);return false;\">"+j+"</div>";
        
      }
      mainArea +="</div></div></div>";
                  
    }
    mainArea += "</div>"
    document.getElementById('content').style.fontSize = storage.getItem("size");
    document.getElementById('content').style.color = storage.getItem("color");
    document.getElementById('content').style.backgroundColor = storage.getItem("backgroundColor");
    document.getElementById('content').innerHTML=mainArea;
    $('body,html').animate({scrollTop:0},1000);
  }
}
function change_font(a){
  var value = a.style.fontFamily ;
  document.getElementById('content').style.fontFamily = value;
  $('#font_style').modal('hide');
}
function change_font_size(a){
  var value = a.style.fontSize ;
  document.getElementById('content').style.fontSize = value;
  storage.setItem("size",value);
  $('#font_size').modal('hide');
}
function change_font_color(){
  var value = document.getElementById('favcolor').value ;
  document.getElementById('content').style.color = value;
  storage.setItem("color",value);
}
function change_font_color1(a){
  var value = a.style.background ;
  document.getElementById('content').style.color = value;
  storage.setItem("color",value);
}
function change_background_color(){
  var value = document.getElementById('favbackground').value ;
  document.getElementById('content').style.backgroundColor = value;
  storage.setItem("backgroundColor",value);
}
function change_background_color1(a){
  var value = a.style.background ;
  document.getElementById('content').style.backgroundColor = value;
  storage.setItem("backgroundColor",value);
}
$(function() {
  $("#more").popover();
})
$(document).ready(function(){
  $(window).scroll(function(){
    if ($(window).scrollTop()>100){
      storage.setItem("scrollTop",$(window).scrollTop());
    }else{
      storage.setItem("scrollTop",0);
    }
  });
});
var mark = '32642-2169026.html'
if(storage.getItem("m") == null){
  portal();
}else{
  mark = storage.getItem("m");
}
$(function() {
    $("#more").popover();
})
load(mark,false);
      