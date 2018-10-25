<template>
    <Layout>
        <Header>
            <Menu mode="horizontal" theme="dark" active-name="1" style="height:50px;">
                <div class="layout-logo">
                    集中管控
                </div>
                <div class="layout-nav">
                    <MenuItem name="1">
                        管理员平台
                    </MenuItem>
                </div>
            </Menu>
        </Header>
    </Layout>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="" scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 50px;
        line-height: 50px;
        color: #fff;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 0;
        left: 20px;
    }
    .layout-nav{
        height: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 16px;

    }    
</style>