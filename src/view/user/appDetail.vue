<script>
export default {
    name:"appDetail",
    data(){
        return{
            columns1: [
                {
                    title: '操作时间',
                    key: 'oprateTime'
                },
                {
                    title: '操作类型',
                    key: 'oprateType'
                },
                {
                    title: '响应类型',
                    key: 'resType',
                    filters:[{
                        label:"html",
                        value:"html"
                    },{
                        label:"json",
                        value:"json"
                    }],
                    filterMethod(value,row){
                        if(value === "html"){

                            return row.resType === "html";

                        }else if(value === "json"){

                            return row.resType === "json";
                            
                        }
                    }
                },
                {
                    title: '访问状态',
                    key: 'visiteState'
                },
                {
                    title: '响应内容',
                    key: 'resContent'
                }
            ],
            data1: [
                {
                    oprateTime: '2018-08-21',
                    oprateType: "登录",
                    resType: 'html',
                    visiteState: '成功',
                    resContent:"登录成功"
                },{
                    oprateTime: '2018-08-21',
                    oprateType: "登录",
                    resType: 'json',
                    visiteState: '成功',
                    resContent:"登录成功"
                }
            ]
        }
    }
}
</script>

<template>
    <div class="appDetail">     
        <div class="mainCon">
            <div class="titleBox">
                <span class="appTitle">
                    掌上执法应用日志详情
                </span>
                <div class="searchTime">
                    时间：<DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择时间段" style="width: 300px"></DatePicker>
                </div>
            </div>

            <div class="logDetail">
                <Table :columns="columns1" :data="data1"></Table>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .breadNav{
        width: 100%;
        text-align: right;
        line-height: 40px;
    }
    .mainCon .titleBox{
        width: 100%;
        text-align: left;
    }
    .mainCon .appTitle{
        display: inline-block;
        line-height: 30px;
        margin-bottom:15px;
        text-align: left;
        border-bottom: 0.5px solid #00C5E2;
        font-size: 14px;
    }
    .mainCon .searchTime{
        margin-bottom:15px;
    }
</style>

