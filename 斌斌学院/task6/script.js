function addHandle(element,type,handle){
        if(element.addEventListener){
            element.addEventListener(type,handle,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handle);
        }else{
            element["on"+type]=handle;
        }
}

//将数组每一项传给函数执行一遍
function each(arr,fn){
    for(var cur=0;cur<arr.length;cur++){
        fn(arr[cur],cur);
    }
}

//将字符串分组
function spilitString(str){
     var content=[];
     content=str.split(/[,，\r;；、\s\n]+/);
     return content;
}

//将textarea中前后空格去掉
function exceptSpace(str){
     var reg1=/^\s*/;
     var reg2=/\s*$/;
     return str.replace(reg1,"").replace(reg2,"");
}

window.onload=function(){
    var container=document.getElementById("container");
    var buttonList=document.getElementsByTagName("input");

    var queue={
        str:[],

        leftPush: function(num){
          for(var a in num){
            this.str.unshift(num[a]);
          }
          this.paint();
        },

        rightPush: function(num){
            for(var a in num){
                this.str.push(num[a]);
            }

            this.paint();
        },

        leftPop: function(num){
            if(this.isEmpty()){
                alert("There is nothing to pop");
            }else{
                this.str.shift();
                this.paint();
            }

        },

        isEmpty: function(){
            return (this.str.length==0);
        },

        rightPop: function(num){
            if(this.isEmpty()){
                alert("There is nothing to pop");
            }else{
                this.str.pop();
                this.paint();
            }
        },

        deleteId: function(id){
            this.str.splice(id,1);
            this.paint();
        },


        paint: function(){
            var str="";
            each(this.str,function(item){
                str+=("<div>"+item+"</div>")
            });
            container.innerHTML=str;
            addDeleteEvent();
        },

        query:function(input){
        //var container=document.getElementById("container");
        for(var i=0;i<container.childNodes.length;i++){
            if(container.childNodes[i].innerHTML.indexOf(input)!=-1){
                container.childNodes[i].style.background="blue";
            }
        }
    }
    }

    function addDeleteEvent(){
        for(var i=0;i<container.childNodes.length;i++){
            addHandle(container.childNodes[i],"click",function(i){
               return function(){queue.deleteId(i);};
            }(i));
        }
    }



    addHandle(buttonList[0],"click",function(){
        var input=spilitString(exceptSpace(document.getElementById("number").value)) ;
        if(input){
            queue.leftPush(input);
        }else{
            alert("please input something");
        }
    });

    addHandle(buttonList[1],"click",function(){
        var input=spilitString(exceptSpace(document.getElementById("number").value)) ;
        if(input){
            queue.rightPush(input);
        }else{
            alert("please input something");
        }
    });

    addHandle(buttonList[2],"click",function(){
        queue.leftPop();
    });

    addHandle(buttonList[3],"click",function(){
        queue.rightPop();
    });

    addHandle(buttonList[5],"click",function(){
         var input=buttonList[4].value;
         queue.query(input);
    });
}