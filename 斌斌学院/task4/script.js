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

window.onload=function(){
    var container=document.getElementById("container");
    var buttonList=document.getElementsByTagName("input");

    var queue={
        str:[],

        leftPush: function(num){
           this.str.unshift(num);
           this.paint();
        },

        rightPush: function(num){
            this.str.push(num);
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
                str+=("<div>"+parseInt(item)+"</div>")
            });
            container.innerHTML=str;
            addDeleteEvent();
        }
    }

    function addDeleteEvent(){
        for(var i=0;i<container.childNodes.length;i++){
            addHandle(container.childNodes[i],"click",function(i){
               return function(){queue.deleteId(i);};
            }(i));
        }
    }

    addHandle(buttonList[1],"click",function(){
        var input=buttonList[0].value;
        if(/^[0-9]+$/.test(input)){
            queue.leftPush(input);
        }else{
            alert("please input number");
        }
    });

    addHandle(buttonList[2],"click",function(){
        var input=buttonList[0].value;
        if(/^[0-9]+$/.test(input)){
            queue.rightPush(input);
        }else{
            alert("please input number");
        }
    });

    addHandle(buttonList[3],"click",function(){
        queue.leftPop();
    });

    addHandle(buttonList[4],"click",function(){
        queue.rightPop();
    });
}