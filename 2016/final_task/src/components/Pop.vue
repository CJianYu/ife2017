//浮出层页面

<template>
    <div class="shadow" id="shadow">
    <div class="mask" id="mask" @click="disappear"></div>
    <div class="pop" >
        <header class="head_warn">
            <span>提示</span>
        </header>
        <main ><p>{{content}}</p></main>
        <footer>
            <button class="btn comfirmButton" @click="comfirm">确认</button>
            <button class="btn btn-default" @click="disappear">取消</button>
        </footer>
    </div>
    </div>
</template>

<script >
    export default{
        props:["content"],

        methods:{
            disappear:function(){
                //document.getElementById("shadow").style.display="none";
                this.$emit("disappear");
            },
            comfirm:function(){
                this.$emit("comfirm");
            }
        }
    }
</script>

<style scoped>

.mask{
    width:100%;
    height: 100%;
    background-image:linear-gradient(to right,rgba(100,100,100,0.15),rgba(100,80,100,0.1),rgba(100,150,200,0.3)),
        linear-gradient(to right top,rgba(100,100,100,0.1),rgba(100,80,100,0),rgba(100,200,200,0.3));
    position: fixed;
    z-index: 1000;
    top:0;
    left: 0;
}
    .pop{
        position: fixed;
        width: 30%;
        height: 200px;
        margin: 5% 20%;
        z-index: 1200;
        background-color: white;
        border-radius: 10px;
    }

    header{
        background-color: #a1a3a6;
        height: 40px;
        padding: 10px;
    }

    main{
        padding:20px;

    }

    footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        padding-bottom: 5px;
    }

    .comfirmButton{
        background-color: #f47920;
    }
</style>