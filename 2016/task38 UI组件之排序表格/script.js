Vue.component('grid',{
    template:"#grid-tamplate",
    props:{
        data:Array,
        columns:Array
    },
    data:function(){
        var sortOrders={}
        this.columns.forEach(function(key){
            sortOrders[key]=1
        })
        return {
            sortKey:"",
            sortOrders:sortOrders
        }
    },
    computed:{
        filteredData:function(){
            var sortKey=this.sortKey
            var order=this.sortOrders[sortKey]||1
            var data=this.data
            if(sortKey){
                data=data.slice().sort(function(a,b){
                    a=a[sortKey]
                    b=b[sortKey]
                    return (a===b?0:a>b?1:-1)*order
                })
            }
            return data
        }
    },

    methods:{
        sortBy:function(key){
            this.sortKey=key
            this.sortOrders[key]=this.sortOrders[key]*-1
        }
    }

})

var demo=new Vue({
    el:"#resultForm",
    data:{
        gridColumns:['姓名','语文','数学','英语','总分'],
        gridData:[
           {姓名:'小明',语文:66,数学:98,英语:78,总分:242},
           {姓名:'张胖',语文:55,数学:99,英语:88,总分:243},
           {姓名:'小红',语文:70,数学:90,英语:80,总分:240},
           {姓名:'二娃',语文:80,数学:80,英语:100,总分:260}
        ]
    }
})