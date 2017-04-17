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
                str+=("<div>"+"</div>")
            });
            container.innerHTML=str;
            for(var i=0;i<container.childNodes.length;i++){
                container.childNodes[i].style.height=this.str[i]*2+"px";
            }
            addDeleteEvent();
        },

     }

    function addDeleteEvent(){
        for(var i=0;i<container.childNodes.length;i++){
            addHandle(container.childNodes[i],"click",function(i){
               return function(){queue.deleteId(i);};
            }(i));
        }
    }


    // function BubbleSort(){
    //     var i,j,stop;
    //     var logs=[];
    //     var arr=queue.str;
    //     var count=0;
    //     var timer=setInterval(function(){
    //     for(i=0;i<arr.length;i++){
    //         for(j=0,stop=arr.length-1-i;j<stop;j++){
    //                     if(arr[j]>arr[j+1]){
    //                   var temp=arr[j];
    //                 arr[j]=arr[j+1];
    //                 arr[j+1]=temp;
    //                   queue.paint();
    //                   count++;
    //                   if(count>arr.length){
    //                     clearInterval(timer);
    //                   }
    //               }
    //                 }
    //             }
    //     },1000);

    // }

    function BubbleSort() {
        var Clock;
        var count = 0, i = 0;
        //console.log(queue.str.length)
        Clock = setInterval(function() {
            if (count >= queue.str.length) {
                clearInterval(Clock);
            }
            if (i == queue.str.length - 1 - count) {
                i = 0;
                count++;
            }
            if (queue.str[i] > queue.str[i + 1]) {
                var temp = queue.str[i];
                queue.str[i] = queue.str[i + 1];
                queue.str[i + 1] = temp;
                queue.paint();
            }
            i++;
        }, 1000);
    }

    addHandle(buttonList[1],"click",function(){
        var input=buttonList[0].value;
        if(/^[0-9]+$/.test(input) && input>10&&input<100){
            if(container.childNodes.length<=60){
                queue.leftPush(input);
            }else{
                alert("The number can't be more than 60");
            }

        }else{
            alert("please input number between 10 to 100");
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


    addHandle(buttonList[5],"click",function(){
        BubbleSort();
    });
}