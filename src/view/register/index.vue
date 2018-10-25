<template>
    <div id="main">
        <div class="header">
            <p>平台开发商列表</p>
            <Button :size="buttonSize" icon="md-add" type="primary" @click="addDeveloper()">添加开发商</Button>
        </div>
        <div class="tableCon">
            <Table stripe :columns="title" :data="tableData"></Table>
        </div>
        <div class="pageInit">
            <Page :total="100" />
        </div>
        <addDeveloper ref="addDeveloper"></addDeveloper>
    </div>
</template>
<script>

import addDeveloper from "@/view/register/addDeveloper"

export default {
    name:"register",
    data(){
        return{
            buttonSize: 'default',
            title: [
                {
                    title: '地市',
                    key: 'prefectureLevel',
                    align:"center"
                },
                {
                    title: '平台开发商',
                    key: 'platformDevelopers',
                    align:"center",
                    ellipsis:"true",
                    tooltip:"true"
                },
                {
                    title: '应用ID前缀',
                    key: 'appidprev',
                    align:"center",
                    ellipsis:"true",
                    tooltip:"true"
                },
                {
                    title: '地区平台开发商ID',
                    key: 'regiondeveloperid',
                    align:"center",
                    ellipsis:"true",
                    tooltip:"true"
                },
                {
                    title: '密钥',
                    key: 'secretkey',
                    align:"center",
                    ellipsis:"true",
                    tooltip:"true"
                },
                {
                    title: '变更',
                    key: 'operation',
                    align:"center",
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type:"ios-create-outline"
                                },
                                style: {
                                    marginRight: '8px',
                                    fontSize:"22px",
                                    cursor:"pointer",
                                    color:"#636363"
                                },
                                on: {
                                    click:()=>{
                                        alert("编辑")
                                    }
                                }
                            }),
                            h('Icon', {
                                props: {
                                    type:"ios-trash-outline"
                                },
                                style:{
                                    fontSize:"22px",
                                    cursor:"pointer",
                                    color:"#D64F4F"
                                },
                                on: {
                                    click:()=>{
                                        alert("删除")
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            tableData: [
                {
                    prefectureLevel: '深圳',
                    platformDevelopers: "深圳市星火电子工程公司",
                    appidprev: '4403',
                    regiondeveloperid: 'sd123fd13d34ds1',
                    secretkey:"x334v23fdg342gret3",
                    operation:"变更"
                }
            ]
        }
    },
    components:{
        addDeveloper
    },
    methods:{
        addDeveloper(){
            this.$refs.addDeveloper.showModal();
        }
    },
    mounted(){
        
    }
}
</script>
<style scoped>
    #main{
        padding: 0 20px;
    }
    #main .header{
        width:100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 0.5px solid #979797;
    }
    #main .header p{
        font-size:16px;
        color: #0D0D23;
    }
    #main .header p::before{
        content:"";
        width:3px;
        height: 18px;
        background: #00C5E2;
        display: inline-block;
        vertical-align: middle;
        margin-right:8px;
    }
    #main .tableCon{
        padding-top: 20px;
    }

    #main .pageInit{
        width: 100%;
        margin-top: 20px;
        text-align: right;
    }
</style>

