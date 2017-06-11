import Charts from "../components/Charts.vue"
import Home from "../components/Table.vue"
import NewQuest from "../components/NewQuest.vue"
import Edit from "../components/Edit.vue"


export  const routes=[
    {
        path:"/",
        name:"Home",
        component: Home
    },
    {
      path: '/charts',
      name: 'viewCharts',
      component: Charts
    },
    {
        path:'/addQuest',
        name:'newQuest',
        component: NewQuest
    },
    {
        path:'/edit',
        name:'editQuest',
        component: Edit
    }

  ]

