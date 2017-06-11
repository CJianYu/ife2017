<template>
    <div class="container">

       <div class="title">
           <input type="text" placeholder="这里是标题" v-model="title">
       </div>
       <hr>


         <section v-for="question in quesList" class="questionBox">
             <div class="qList_head">
             Question {{question.order}}({{question.qtype | typeFormat}})
               <input type="text" class="exit-input" v-model="question.stem">
               <label >
                   <input type="checkbox" checked="checked" v-model="question.require" >
                   必答题
               </label>
             </div>

             <div class="question_option">
                 <template  v-if="question.qtype!=='text'">
                     <div v-for="option in question.options">
                         <span>{{option.id}}.</span>
                         <input type="text" v-model="option.content">
                         <span class="delChoice" @click="deleteOption(question.order,option.id)">删除选项</span>
                     </div>
                 </template>
             </div>

             <div class="move_btn">
                    <span v-if="question.order>1" @click="moveUp(question.order)">上移</span>
                    <span v-if="question.order<quesList.length" @click="moveDown(question.order)">下移</span>
                    <span @click="copy(question.order)">复用</span>
                    <span @click="deleteQuestion(question.order)">删除</span>
                </div>


         </section>


       <div class="box">
       <div class="btnBox" v-show="toggle">
           <button class="btn " @click="addQuestion('single')"> 单选 </button>
           <button class="btn " @click="addQuestion('multi')"> 多选 </button>
           <button class="btn" @click="addQuestion('text')"> 文本题 </button>
       </div>
       <div class="add" @click="toggle=!toggle">
           <h4>+ 添加问题</h4>
       </div>
       </div>

       <hr>
       <div class="footer">
           <div class="aboutDate">
           <span>问卷截止日期 </span>
           <input type="text" name="date" @click="showDate=!showDate" v-model="deadline">
           <Calendar v-show="showDate" v-on:wannaDate="handleDate"></Calendar>
           </div>

           <button class="btn btn-default" @click="save">保存问卷</button>
           <button class="btn btn-default" @click="release">发布问卷</button>

       </div>

    </div>
</template>

<script >
   import Calendar from "./Calendar.vue";
   // import filter from "../filter/filter";

   export default{
        data(){
            let questionnaire=this.fetchQuestionnaire(this.$route.params.qid);
            return{
                toggle:false,
                showDate:false,
                finalDate:"",
                title:questionnaire.title,
                deadline:questionnaire.deadline,
                quesList:questionnaire.questionList,
                qid:parseInt(this.$route.params.qid)
            }
        },
        methods:{
            //找到相应的问卷
            fetchQuestionnaire(id){
                var data=this.$store.state.questionnaireList;
                for(var i=0;i<data.length;i++){
                    if(data[i].id===id){
                        return data[i];
                    }
                }
            },
            handleDate(date){
                // console.log(date);
                this.deadline=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
                this.showDate=false;
            },
            //增加问题
            addQuestion(qtype){
                var newQues={};
                newQues.order=this.quesList.length+1;
                newQues.qtype=qtype;
                newQues.require=true;
                if(qtype==="single"){
                   newQues.stem="单选题";
                   newQues.options=[{id:1,content:"单选题1"},{id:2,content:"单选题2"}];
                }else if(qtype==="multi"){
                    newQues.stem="多选题";
                    newQues.options=[{id:1,content:"多选题1"},{id:2,content:"多选题2"}];
                }else{
                    newQues.stem="文字题";
                    newQues.options=[];
                }
                this.quesList.push(newQues);
            },
            //删除选项
            deleteOption(order,id){
               this.quesList[order-1].options.splice(id-1,1);
               for(var i=id-1;i<this.quesList[order-1].options.length;i++){
                  this.quesList[order-1].options[i].id-=1;
               }
            },
            //上移
            moveUp(order){
                this.swap(order,order-1);
            },
            //下移
            moveDown(order){
                this.swap(order,order+1);
            },
            //交换顺序
            swap(a,b){
                this.quesList[a-1]=this.quesList.splice(b-1,1,this.quesList[a-1])[0];
                this.quesList[a-1].order=a;
                this.quesList[b-1].order=b;
            },
            //复用
            copy(order){
                 var copyOne={};
                 var tempContent;
                 var i;
                 copyOne.order=this.quesList[order-1].order;
                 copyOne.title=this.quesList[order-1].title;
                 copyOne.qtype=this.quesList[order-1].qtype;
                 copyOne.stem=this.quesList[order-1].stem;
                 copyOne.required=true;
                 copyOne.options=[];
                 for( i=0;i<this.quesList[order-1].options.length;i++){
                     tempContent={};
                     tempContent.content=this.quesList[order-1].options[i].content;
                     copyOne.options.push(tempContent);
                 }
                 //将新建的对象放进quesList,改变后面序号
                 this.quesList.splice(order,0,copyOne);
                 for( i=order;i<this.quesList.length;i++){
                    this.quesList[i].order++;
                 }
            },

            //删除
            deleteQuestion(order){
                for(var j=order;j<this.quesList.length;j++){
                    this.quesList[j].order-=1;
                }
                this.quesList.splice(order-1,1);
            },
            //保存问卷
            save(){
                var i,j;
                //检查问题数量是否为0
                if(this.quesList.length===0){
                    alert("please add at least one question");
                    return false;
                }
                //判断各问题题干是否为空，选择题的选择项数量是否大于二
                for(i=0;i<this.quesList.length;i++){
                    if(this.quesList[i].stem.trim()===""){
                        alert("请添加问题题目");
                        return false;
                    }
                    if(this.quesList[i].qtype==="single"||this.quesList[i].qtype==="multi"){
                        if(this.quesList[i].options.length<2){
                            alert("选择题至少要两个选项哦，亲！");
                            return false;
                        }
                    }
                }
                this.$store.commit('saveQuestionnaire',
                    {id:this.qid,
                     title:this.title,
                     deadline:this.deadline,
                     questionList:this.quesList});

            },
            //发布问卷
            release(){
                this.$store.commit('releaseQuestionnaire',this.qid);
                this.$router.push('/');
            }


        },
        components:{
            Calendar:Calendar
        },

   }

</script>

<style scoped>

   .container{
       background-color: white;

       margin: 30px auto;
       width: 80%;
       padding: 30px;
   }
   .title{
     font-size: 30px;
     text-align: center;
   }
   .title:hover{
     background-color: #f8aba6;
   }

   .title input {
      border:0px;
      background-color: transparent;
      outline: medium;
   }
   .title input::-webkit-input-placeholder { text-align: center }
   .box{
     border:1px solid #d3d7d4;
   }

   .btnBox{
     padding: 10px;
     margin:20px;
     text-align: center;
   }

   .add{
       background-color: #d3d7d4;
       height: 100px;
       padding-top: 20px;
       cursor: pointer;
       text-align: center;
   }

   .aboutDate{
       display: inline-block;

   }

   .footer button{
        float: right;
   }

   .qList_head{
      width: 100%;
      text-align: left;
   }

   .qList_head input{
      border:none;
      outline: medium;
      width: auto;
   }

   .qList_head label{
      float: right;
   }

   .question_option{
      width: 100%;
      margin-bottom: 20px;
      margin-left: 10px;
   }

   .question_option input{
     border:none;
     outline: medium;
     margin-left: 10px;
   }

   .delChoice{
     margin-left: 300px;
     cursor: pointer;
   }
    .move_btn {
        margin-bottom: 10px;
        float: right;
    }
   .move_btn span{
    cursor: pointer;
    margin-right: 10px;

   }

   .questionBox{
      padding: 20px;
   }

   .questionBox:hover{
      border:1px solid #f8aba6;
   }

</style>