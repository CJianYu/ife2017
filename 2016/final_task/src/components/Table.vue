<template>
  <div class=" wholeTable">

    <pop v-show="showPop" :content="popContent"
    v-on:disappear="cancleDelete" v-on:comfirm="comfirmDelete"></pop>

    <table class="table table-hover">
      <thead>
        <th width="5%"> </th>
        <th width="25%"> 标题</th>
        <th width="15%"> 时间</th>
        <th width="10%"> 状态</th>
        <th width="40%">操作 <router-link :to="'/addQuest'" class="btn newQuestion">+新建问卷</router-link></th>
      </thead>

      <tbody>
         <tr v-for="quest in questionnaireList">
           <td>
             <input type="checkbox" name="check" :value="quest.id" v-model=
             "checkedItem">
           </td>
           <td>{{quest.title}}</td>
           <td>{{quest.releaseDate}}</td>
           <td>{{quest.state}}</td>
           <td class="buttonBox" v-if="quest.state=='release'">
             <button class="btn btn-default" >编辑</button>
             <button class="btn btn-default">删除</button>
             <a class="btn btn-default" v-link="{name:'viewCharts',params:{qid:quest.id}}">查看数据</a>
           </td>
           <td class="buttonBox" v-else>
              <router-link class="btn btn-default" :to="{name:'editQuest',params:{qid:quest.id}}">编辑</router-link>
             <button class="btn btn-default" @click="deleteThisQuest(quest.id)">删除</button>
             <router-link class="btn btn-default" :to="{name:'viewCharts',params:{qid:quest.id}} ">查看问卷</router-link>
           </td>
         </tr>

         <tr class="lastLine">
            <td colspan="2">
              <input type="checkbox" name="selectAll" v-model="checkedAll" @change="changeAll">
              <span>全选</span>
              <button class="btn btn-default" @click="deleteAll">删除</button>
            </td>
            <td colspan="3">

              </td>
         </tr>

         <router-view></router-view>
      </tbody>
    </table>
  </div>
</template>

<script>
import Pop from "./Pop.vue";

export default {
        data:function(){
          return{
              checkedItem:[],
              questionnaireList:this.$store.state.questionnaireList,
              checkedAll:false,
              showPop:false,
              popContent:"",
              currentId:0

          }
        },
        methods:{
          //全选box被改变时
          changeAll:function(checkedAll){
              //如果勾上了全选
              if(this.checkedAll){
                //先将所有被选中的都去掉
                while(this.checkedItem.pop());
                //然后再将所有列表选中
                for(var i=0;i<this.questionnaireList.length;i++){
                  this.checkedItem.push(this.questionnaireList[i].id);
                }
              }else{
                while(this.checkedItem.pop());
              }
          },
          deleteAll:function(checkedAll){
              if(this.checkedAll){
                 this.showPop=true;
                 this.popContent="你将删除所有的问卷，你确定吗？";
              }else{
                alert("please select the item you wanna delete");
              }
          },
          deleteThisQuest(id){
              this.currentId=id;
              this.showPop=true;
              this.popContent="你将删除出此问卷，你确定吗？";

          },

          cancleDelete:function(){
                 this.showPop=false;
          },
          comfirmDelete:function(){
            if(this.checkedAll){

                  for(var i=0;i<this.checkedItem.length;i++){
                    this.$store.commit('del_question',this.checkedItem[i]);
                  //  console.log("delete success");
                  this.showPop=false;
                  }
                }else{
                  if(this.checkedItem){
                    this.$store.commit('del_question',this.currentId);
                    this.showPop=false;
                  }else{
                    alert("can not find the id");
                  }

            }
          }
        },
        components:{
          pop:Pop
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wholeTable{
        margin: 8%;

    }
    .newQuestion{
        background-color: #f47920;
        margin-left: 50%;
        margin-bottom: 5px;
        color:white;
    }
    th{
      padding-left: 10px;
    }
    tbody{
      background-color: white;

    }

    .buttonBox a{
        margin-left: 40px;

    }

</style>
