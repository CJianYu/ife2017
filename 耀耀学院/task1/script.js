var input=document.getElementById("content");
var btn=document.getElementById("btn");
var warning=document.getElementById("warning");

btn.onclick=function (event){
    var value=input.value;
    if(getLength(value)==0){
        warning.innerHTML="姓名不能为空";
        input.style.borderColor="red";
    }
    if(getLength(value)>4&&getLength(value)<16){
        warning.innerHTML="名称格式正确";
        input.style.borderColor="green";
        warning.style.color="green";
    }else{
         warning.innerHTML="请输入长度为4~16的字符";
        input.style.borderColor="red";
        warning.style.color="red";
    }
    //event.preventDefault();
}

function getLength(str){
    var length=0;
    for(var i=0;i<str.length;i++){
        code=str.charCodeAt(i);
        if(code>=0&&code<=128){
            length+=1;
        }else{
            length+=2;
        }
    }
    return length;
}


//btn.addEventListener("click",checkCount(),false);