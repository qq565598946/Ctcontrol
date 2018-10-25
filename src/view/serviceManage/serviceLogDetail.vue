<template>
    <div class="log-detail">
      <!-- 头部面包屑 -->
      <div class="header">
        <p><span class="line"></span>日志详情</p>
        <Breadcrumb separator=">" class="title-color">
          <BreadcrumbItem to="#">服务</BreadcrumbItem>
          <BreadcrumbItem to="#">服务详情</BreadcrumbItem>
          <BreadcrumbItem to="#">服务日志展示</BreadcrumbItem>
          <BreadcrumbItem>日志详情</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div class="main-container">
         <!-- 基本信息 -->
         <div class="basic-info">
          <div class="title">
            基本信息
          </div>
          <div class="basic-content">
            <div class="content-item">

              <div class="desc-item">
                <label>操作类型：</label>
                <div>{{ basicInfo.optType }}</div>
              </div>

              <div class="desc-item">
                <label>功能模块：</label>
                <div>{{ basicInfo.modular }}</div>
              </div>

              <div class="desc-item">
                <label>发送时间：</label>
                <div>{{ basicInfo.sendTime }}</div>
              </div>

              <div class="desc-item">
                <label>访问内容：</label>
                <div>{{ basicInfo.content }}</div>
              </div>

            </div>
            <div class="content-item">

              <div class="desc-item">
                <label>终端IP：</label>
                <div>{{ basicInfo.terminal }}</div>
              </div>

              <div class="desc-item">
                <label>协 议：</label>
                <div>{{ basicInfo.protocol }}</div>
              </div>

              <div class="desc-item">
                <label>处理时间：</label>
                <div>{{ basicInfo.delTime }}</div>
              </div>

            </div>
          </div>

        </div>

        <!-- 请求参数 -->
          <div class="request-container">
            <div class="title">
                请求参数
            </div>

            <div class="table">
              <div class="line-item">
                <div class="item-title">用户</div>
                <div class="content">{{ request.user }}</div>
              </div>
              <div class="line-item">
                <div class="item-title">操作描述</div>
                <div class="content">{{ request.optdesc }}</div>
              </div>
            </div>

          </div>

        <!-- 请求结果 -->
        <!-- 请求参数 -->
        <div class="request-container">
          <div class="title">
            请求结果
          </div>

          <div class="table">
              <div class="line-item">
                  <div class="item-title">响应编码</div>
                  <div class="content">{{ response.code }}</div>
              </div>
              <div class="line-item">
                <div class="item-title">响应描述</div>
                <div class="content">{{response.desc }}</div>
              </div>
          </div>

        </div>

      </div>

    </div>
</template>

<script>
    import breadCrumb from "@/components/breadCrumb.vue"
    export default {
        name: "serveice-log-detail",
        comments: {
          breadCrumb:breadCrumb
        },
        data() {
            return {
                userId:"",
                basicInfo:{
                  optType:"",
                  modular:"",
                  sendTime:"",
                  content:"",
                  terminal:"",
                  protocol:"",
                  delTime:"",
                },
                request:{
                  user: "",
                  optdesc: "",
                },
               response: {
                  code: "",
                 desc:""
               }

            }
        },
        watch:{
          '$route'(to,from){
            //更新数据
            this.userId=this.$route.params.userId;

          }
        },
        methods: {},
        created() {

        },
        mounted() {

        }

    }
</script>

<style scoped lang="less">

  .title-color {
    span{
      a{
        color: #00C5E2!important;
      }
    }

  }

  .log-detail{
    padding: 30px;
    font-size: 14px;
    .header{
      display: flex;
      padding: 10px 10px 10px 0;
      text-align: left;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
      justify-content: space-between;
       .line {
          content: "";
          width: 3px;
          height: 18px;
          background: #00C5E2;
          display: inline-block;
          vertical-align: middle;
          margin-right: 8px;
        }
      }
    .main-container{
      width: 800px;

      .basic-info {
        padding: 20px 0;
        font-size: 14px;
        }

        .basic-content{
          padding: 15px 0;
          display: flex;
          .content-item{
            width: 400px;

            .desc-item{
              display: flex;
              padding: 6px 0;
              label{
                width: 80px;
                text-align: right;
                color: #999;
              }
              >div{
                color: #333
              }
            }
          }

        }
      }

      .request-container{
        padding-bottom: 20px;

        .table{
            border-top: 1px solid #ddd;
            border-left: 1px solid #ddd;
            .line-item{
              display: flex;
              >div{
                height: 30px;
                line-height: 30px;
                border-right: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
              }
              .item-title{
                background: #f2f4fb;
                width: 200px;
                text-align: center;
              }

              .content{
                width: 600px;
                padding-left: 40px;
                text-align: left;
              }

            }
        }

      }

    }

  .title{
    display: flex;
    font-size: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }

  .title-color a:hover{
    color: #57a3f3;
  }

</style>
