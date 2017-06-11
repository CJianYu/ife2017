import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const KEY='test';
let newId=3;
        // 问卷列表
let data=[
            {
                // 全局唯一id
                id:1,
                // 拥有者id
                owner:1,
                // 问卷标题
                title:"大学生依恋类型与择偶偏好调查",
                // 问卷状态:有"draft","released","closed"三种
                state:"已发布",
                // 发布日期
                releaseDate: "5/12/2017",
                // 截止日期
                deadline: "5/31/2017",
                // 问题列表
                questionList:[
                    {
                        order:1,
                        stem:"您的性别",
                        qtype:"single",
                        required:true,
                        options:[
                            {id:1,content:"男"},
                            {id:2,content:"女"}
                        ]
                    },
                    {
                        order:2,
                        stem:"您的情感状况",
                        qtype:"single",
                        required:true,
                        options:[
                            {id:1,content:"已婚"},
                            {id:2,content:"未婚,有交往对象"},
                            {id:3,content:"未婚,无交往对象"}
                        ]
                    },
                    {
                        order:3,
                        stem:"您在择偶时会看重下面哪些条件？",
                        qtype:"multi",
                        required:true,
                        options:[
                            {id:1,content:"外貌"},
                            {id:2,content:"身高"},
                            {id:3,content:"性格"},
                            {id:4,content:"收入"},
                            {id:5,content:"才华能力"},
                            {id:6,content:"家庭背景"}
                        ]
                    },
                    {
                        order:4,
                        stem:"您希望的约会方式有",
                        qtype:"multi",
                        required:true,
                        options:[
                            {id:1,content:"吃饭"},
                            {id:2,content:"旅游"},
                            {id:3,content:"看电影"},
                            {id:4,content:"逛街"},
                            {id:5,content:"一起学习"},
                            {id:6,content:"看艺术展演"}
                        ]
                    },
                    {
                        order:5,
                        stem:"您对本问卷有什么评价和建议？",
                        required:false,
                        qtype:"text",
                        options:[]
                    }
                ],
                // 作答者
                respondents:[
                    [1,2,[1,3,5],[1,2,3],"你们搞的这个问卷啊，超级棒哦!"],
                    [1,3,[2,3,4,6],[1,5,6],"无可奉告"],
                    [2,3,[2,4,5],[2,4,5,6],""],
                    [2,1,[1,3,6],[1,2,3,5,6],""],
                    [2,2,[1,2,4,5],[2,3,4],""],
                    [2,3,[2,3,4],[2,4],""],
                    [2,2,[2,3,4],[1,4,6],""],
                    [1,1,[1,3,5],[1,2,3],""],
                    [1,2,[1,3,5],[1,2,3],""],
                    [1,3,[1,3,5],[1,2,3],""],
                    [2,2,[2,3,5],[2,3,4,5,6],""],
                    [2,2,[2,3,5],[2,3,4,5,6],""],
                    [2,3,[2,3,5],[4,5,6],""],
                    [2,3,[2,3,5],[2,3,6],""],
                    [2,2,[2,3,5],[2,3,4,5,6],""],
                ]
            },
            {
                id:2,
                owner:1,
                title:"研究生创新创业现状调查",
                state:"未发布",
                releaseDate:null,
                deadline:null,
                questionList:[
                    {
                        order:1,
                        stem:"您的学科是",
                        qtype:"single",
                        required:true,
                        options:[
                            {id:1,content:"理科"},
                            {id:2,content:"工科"},
                            {id:3,content:"文科"},
                            {id:4,content:"社科"},
                            {id:5,content:"医科"}
                        ]
                    },
                    {
                        order:2,
                        stem:"您在研究生阶段参与过哪些学校活动",
                        qtype:"multi",
                        required:true,
                        options:[
                            {id:1,content:"社会实践及公益类"},
                            {id:2,content:"学术科技类"},
                            {id:3,content:"社交联谊类"},
                            {id:4,content:"文化艺术类"}
                        ]
                    },
                    {
                        order:3,
                        stem:"您选择创业的主要原因是",
                        qtype:"single",
                        required:true,
                        options:[
                            {id:1,content:"获取财富"},
                            {id:2,content:"实现自我价值"},
                            {id:3,content:"实践领导才能"},
                            {id:4,content:"获得权力、地位"},
                            {id:5,content:"贡献社会"},
                            {id:6,content:"其他"}
                        ]
                    },
                    {
                        order:4,
                        stem:"你对学校提供的创新创业支持有何意见或建议？",
                        required:false,
                        qtype:"text",
                        options:[]
                    }
                ],
                respondents:[]
            }
        ];

localStorage.setItem(KEY,JSON.stringify(data));


function updateStorge(state){
       localStorage.setItem(KEY,JSON.stringify(data));
       state.questionnaireList=JSON.parse(localStorage.getItem(KEY));
       //console.log(state);
}



export const store=new Vuex.Store({
    state:{
        questionnaireList:JSON.parse(localStorage.getItem(KEY)),
        localId:newId
    },
    mutations:{
    add_question(state){
        var q = {id:newId++,owner:1,title:"我的问卷",state:"draft",releaseDate:null,deadline:null,questionList:[],respondents:[]}
        data.push(q);
        updateStorge(state);
        return q.id;
    },
    //删除问卷
    del_question(state,id){

        for(var i=0;i<state.questionnaireList.length;i++){
            if(state.questionnaireList[i].id===id){
                //console.log("this also success");
                state.questionnaireList.splice(i,1);
                updateStorge(state);

            }else{
                console.log("fail");
            }
        }
    },
    //保存问卷
    saveQuestionnaire(state,payload){
         for(var i=0;i<state.questionnaireList.length;i++){
            if(state.questionnaireList[i].id===payload.id){
                state.questionnaireList[i].title=payload.title;
                state.questionnaireList[i].deadline=payload.deadline;
                state.questionnaireList[i].questionList=payload.questionList;
                localStorage.setItem(KEY,JSON.stringify(state.questionnaireList));
                alert("保存成功");
                return true;
            }
         }
         return false;
    },
    //发布问卷
    releaseQuestionnaire(state,id){
         for(var i=0;i<state.questionnaireList.length;i++){
            if(state.questionnaireList[i].id===id){
                state.questionnaireList[i].state="已发布";
                alert("发布成功");
            }
         }
    },
    catchData(){
        return localStorage.getItem(KEY,JSON.stringify([data]));
    }


    }
})