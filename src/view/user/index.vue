<template>
    <div id="main">
        <div class="header">
            <p>人员</p>
            <breadCrumb></breadCrumb>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>

    import breadCrumb from "@/components/breadCrumb";

    export default{
        name:"userIndex",
        data(){
            return {

            }
        },
        components:{
            breadCrumb
        }
    }
</script>

<style scoped>
    #main{
        padding: 0 20px;
        height: 100%;
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
</style>

 
