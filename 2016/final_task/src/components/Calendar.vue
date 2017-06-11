<template>
<div class="calendar">
    <div class="calendar-selection">
        <span class="last_month" @click="last"><i> < </i> </span>
        <select v-model="currentYear">
            <option v-for="year in yearList">{{year}}</option>
        </select>
        <select v-model="currentMonth">
            <option v-for="month in monthList">{{month}}</option>
        </select>
        <span class="next_month" @click="next"><i> > </i></span>
    </div>
    <table class="table" @click.stop="handleClick($event)">
        <thead>
            <tr>
            <th v-for="week in weekList">{{week}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in tableData">
                <td v-for="date in row"
                    :class="{'not-this-month':date.getMonth()!==currentMonth-1}" class="chooseDate"
                    :data-date="date.getTime()">
                    {{date.getDate()}}
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script >
    var date=new Date();
    export default{
        //props:['toggle'],
        data(){
            return{
                weekList:["日","一","二","三","四","五","六"],
                currentYear:date.getFullYear(),
                currentMonth:date.getMonth()+1
            }
        },
        computed:{
            yearList(){
                let yearList=[];
                for(var i=1990;i<2050;i++){
                    yearList.push(i);
                }
                return yearList;
            },
            monthList(){
                let monthList=[];
                for(var j=1;j<13;j++){
                    monthList.push(j);
                }
                return monthList;
            },
            tableData(){
                let currentDateList=[];//当前表中所有日期数据，存储格式为毫秒
                let date=new Date(this.currentYear,this.currentMonth-1,1);//表示当前年月第一天的日期对象
                let dateWeek=date.getDay();//表示当前年月第一天是星期几
                let oneDaySeconds=24*60*60*1000;//一天有多少毫秒
                let firstDate=date.getTime()-oneDaySeconds*dateWeek;//当前表格第一个格子表示的毫秒数
                for(var i=0;i<6;i++){
                    //用六行七列表示日历
                    currentDateList[i]=[];
                    for(var j=0;j<7;j++){
                        currentDateList[i].push(new Date(firstDate));
                        firstDate+=oneDaySeconds;
                    }
                }

                return currentDateList;
            }
        },
        methods:{

            last(){
                if(this.currentMonth==1){
                    this.currentYear--;
                    this.currentMonth=12;
                }else{
                    this.currentMonth--;
                }

            },
            next(){
                if(this.currentMonth===12){
                    this.currentYear++;
                    this.currentMonth=1;
                }else{
                    this.currentMonth++;
                }

            },
             //点击事件，当日期被点击时，选择目标
            handleClick(event){
                if(event.target.dataset.date){
                    let date = new Date(parseInt(event.target.dataset.date));
                    this.currentYear=date.getFullYear();
                    this.currentMonth=date.getMonth()+1;
                    this.$emit("wannaDate",date);

                }
            },
        }
    }


</script>

<style scoped>
       .calendar{
         width: 300px;
         height: auto;
         padding: 10px;
         border:1px solid #ccc;
         position: absolute;
         background-color: white;

       }
       .calendar-selection{
         display: flex;
         justify-content: space-around;
         margin-bottom: 10px;
       }
       .calendar-selection span{
         display: inline-block;
         cursor: pointer;
       }
       .calendar-selection select{
         width:100px;
       }

       .not-this-month{
          color:grey;
          pointer-events: none;
       }

       .chooseDate:hover{
          cursor: pointer;
          background-color:#afb4db;
       }

</style>