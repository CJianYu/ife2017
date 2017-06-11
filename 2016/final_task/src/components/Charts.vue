<template>
    <div class="chartContener " >
        <header class="title">{{title}}</header>
        <section v-for="qlist in questionList">
            <div class="chart" :id="qlist.order"></div>
        </section>
        <footer>
            <router-link class="btn btn-default" :to="'/'">返回列表</router-link>
        </footer>
    </div>

</template>

<script >
    var echarts = require('echarts');

    export default{
        data(){

            var questionnaire= this.fetchQuestionnaire(this.$route.params.qid),
             questionList=questionnaire.questionList,
             res=questionnaire.respondents;
         return {
                questionList:questionList,
                respondents:res,
                title:questionnaire.title,
                myCharts:[],
                //qlistLength:questionList.length
             }
        },
        methods:{
            //获取指定的问卷
            fetchQuestionnaire:function(id){
                var data=this.$store.state.questionnaireList;
                for(var i=0;i<data.length;i++){
                    if(data[i].id===id){
                        return data[i];
                  }
               }
            }
        },
        mounted:function(){
            this.$nextTick(function () {
            //绘制图表，统计问题回答情况，并根据echarts格式存放
            var chartsOptions=[],chartsData=[],
            option,optionCount,
            i,j,k;
            for(i=0;i<this.questionList.length;i++){

                option={};
                //题号与题干
                option.title={text:this.questionList[i].order+"."+this.questionList[i].stem};
                option.tootip={};

                //如果是单选题
                if(this.questionList[i].qtype==="single"){
                    optionCount=[];
                    for(j=0;j<this.questionList[i].options.length;j++){
                        //获取每个选项的内容

                        optionCount.push({value:0,name:this.questionList[i].options[j].content})
                    }
                    chartsData.push(optionCount);
                    option.series=[{name:"人数",type:"pie",data:null,barMaxWidth:50}];
                }
                //如果是多选题
                else if(this.questionList[i].qtype==="multi"){
                    //统计每个选项的人数
                    optionCount=[];
                    //获取每个选项的名字
                    option.xAxis={data:[]};
                    // for(j=0;j<this.questionList.options.length;j++){
                    //     option.xAxis.data.push(this.questionList[i].options[j].content);

                    //     alert(this.questionList.options);
                    //     optionCount.push(0);
                    // }
                    chartsData.push(optionCount);
                    option.yAxis={};
                    option.series=[
                       {
                        name:"人数",
                        type:"bar",
                        data:null,
                        barMaxWidth:50
                       }
                    ];

                }

                //如果是文本题，用条形展现有效回答人数
                else{
                    chartsData.push([0,this.respondents.length]);
                    option.xAxis={data:["有效的回答","无效回答或没有回答"]};
                    option.yAxis={};
                    option.series=[
                      {
                        name:"人数",
                        type:"bar",
                        data:null,
                        barMaxWidth:50
                      }
                    ];
                }
                  //添加此题
                chartsOptions.push(option);
            }

            //遍历所有回答，统计各个问题回答状况
            for(i=0;i<this.respondents.length;i++){
                for(j=0;j<this.respondents[i];j++){
                    //单选
                if(this.questionList[j].qtype==="single"){
                   if(isNaN(this.respondents[i][j])){
                      console.log("数据格式错误");
                   }else{
                     chartsData[j][this.respondents[i][j]-1].value++;
                   }
                }

                //多选
                else if(this.questionList[j].qtype==="multi"){
                    if(!(this.respondents[i][j] instanceof Array)){
                        console.log("数据格式错误");
                    }else{
                        for(k=0;k<this.respondents[i][j].length;k++){
                            chartsData[j][this.respondents[i][j][k]-1]++;
                        }
                    }
                }
                else{
                    if(this.respondents[i][j].length>0){
                        chartsData[j][0]++;
                        chartsData[j][1]--;
                    }
                }
            }
         }
         //初始化图表
         var chart;
         for(i=0;i<chartsOptions.length;i++){
            chartsOptions[i].series[0].data=chartsData[i];
            chart=echarts.init(document.getElementById(i+1));
            chart.setOption(chartsOptions[i]);
            this.myCharts.push(chart);

         }
         })
        }

    }

</script>

<style scoped>
    .chartContener{
        background-color: white;
        margin:40px;
        padding: 10px;
        width: 100%;
        height: auto;
    }

    header{
        font-size: 30px;
        text-align: center;
    }

</style>