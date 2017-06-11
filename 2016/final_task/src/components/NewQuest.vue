<template>
    <div class="box">
        <button class="btn btn-lg newBtn" @click="createQuest">+ 新建问卷</button>
    </div>
</template>

<script >
  export default{
      methods:{
        createQuest(){
           this.$store.commit('add_question');

            var newQuest=this.$store.state.localId;
            //alert(newQuest);
      this.$router.push({name:"editQuest",params:{qid:newQuest}});
        }
      }

  }

</script>

<style scoped>
    .box{
        background-color: white;
        text-align: center;
        margin:30px auto;
        width: 80%;
        height: 300px;
    }
    .newBtn{
        background-color: #f47920;
        color:white;
        margin-top: 10%;
    }
</style>