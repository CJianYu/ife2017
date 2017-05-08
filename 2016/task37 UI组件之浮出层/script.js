//点击灰色部分、确认取消按钮隐藏
function hide(){
    var comfirm=document.getElementById("confirm");
    var quit=document.getElementById("quit");
    var mask=document.getElementById("mask");
    var login=document.getElementById("login");
    comfirm.addEventListener("click",function(){
        mask.style.display="none";
        login.style.display="none";
    },false);
    quit.addEventListener("click",function(){
        mask.style.display="none";
        login.style.display="none";
    },false);

    mask.addEventListener("click",function(){
        mask.style.display="none";
        login.style.display="none";
    },false);

}

//点击登陆按钮，出现登陆框跟灰色遮罩
function show(){
    var header=document.getElementById("login_link");
    var login=document.getElementById("login");
    var mask=document.getElementById("mask");
    header.addEventListener("click",function(){
        login.style.display="block";
        mask.style.display="block";
    },false);
}

window.onload=function(){
    hide();
    show();
}