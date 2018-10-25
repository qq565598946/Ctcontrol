<template>
    <Modal v-model="addDeveloper" width="50%" :mask-closable="false" :footerHide="true" :closable="false">
        <div class="header">
            <p>添加开发商</p>
        </div>
        <div class="formBody">
            <Form :model="addInfo" label-position="right" :label-width="80" >
                <FormItem label="地市" class="labelStyle">
                    <Input v-model="addInfo.DS" clearable></Input>
                </FormItem>
                <FormItem label="平台开发商" class="labelStyle">
                    <Input v-model="addInfo.PTdeveloper" clearable></Input>
                </FormItem>
                <FormItem label="应用ID前缀" class="labelStyle">
                    <Input v-model="addInfo.AppPrev" clearable></Input>
                </FormItem>
            </Form>            
        </div>
        <div class="btnGroup">
            <Button type="error" class="cancel" @click="cancel()">取消</Button>
            <Button type="success" class="submitInfo">提交</Button>
        </div>
    </Modal>    
</template>
<script>
export default {
    data(){
        return{
            addDeveloper:false,
            addInfo: {
                DS: '',
                PTdeveloper: '',
                AppPrev: ''
            },
            inputSize:""
        }
    },
    methods:{
        showModal(){
            this.addDeveloper = true;
        },
        cancel(){
            this.addDeveloper = false;
        }
    }
}
</script>
<style scoped>

    .header p{
        font-size: 16px;
        margin-bottom:30px;
    }
    .header p::before{
        content:"";
        width:3px;
        height: 20px;
        background: #00C5E2;
        display: inline-block;
        vertical-align: -4px;
        margin-right:8px;        
    }
    .formBody{
        width: 450px;
        margin: 0 auto;
    }
    .btnGroup{
        width: 450px;
        margin: 0 auto;
        text-align: right;
    }
    .submitInfo{
        margin-left:8px;
    }

</style>
