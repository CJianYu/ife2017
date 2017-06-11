<template>
    <div>
        <header>
      <h2><router-link :to="'/'">问卷管理</router-link></h2>
      <h3>我的问卷</h3>
    </header>
    </div>
</template>

<style scoped>
    header{
  width: 100%;
  height: 50px;
  background-color: #f47920;
  display: inline-block;
  vertical-align: center;
}

header>h2{
  margin-left: 100px;
  line-height: 0.5;
  display: inline-block;
}

header h3{
  display: inline-block;
  margin-left: 30px;
  color: white;
}
header a{
  text-decoration: none;
  color: white;
}
</style>