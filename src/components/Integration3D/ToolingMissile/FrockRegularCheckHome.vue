<template>
    <div class="For_Large" :style="TableHeight">
        <div class="For_LargeBox">
            <div class="For_LargeLeft">
                <div class="For_LargeLeftitle"><p>工装信息列表</p></div>
                <div class="For_LargeLeftencer">
                    <router-view @func="ONTestItemQuery"></router-view>
                </div>
            </div>
            <div class="For_LargeRight">
                <div class="For_LargeLeftitle"><p>总装站位概况</p></div>
                <iframe class="For_LargeRight_iframe" ref="iframe" :src="iframeurl.schedulingurl"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
// import { ResourceManagement } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
// import SchedulingHomeNewly from './SchedulingHomeNewly.vue';
export default {
  components: {  },
    data() {
        return {
            Finalassembly: 1,
            TableHeight: {
                height: ""
            },
            iframeurl:{
                schedulingurl: "http://192.168.100.67:8081/ipems-r/#/visual-preview/997ea5ed-55b0-4ca1-aa18-c4ecf8f6b972?token=82931469-0262-46d8-8a8c-2769ef8a69ec"
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        clickParent() {
            this.$refs.mychild.parentHandleclick("嘿嘿嘿");
        },
        ONTestItemQuery(number){
            console.log(number)
            // debugger;
            let data ={
                dataNumber : number
            }
            this.$refs.iframe.contentWindow.postMessage(JSON.stringify({
                methods:'receiveFrocklnformation',
                param: data
            }),"*")
        },
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 0 + "px";
            console.log(this.TableHeight.height)
        },
        getOrderInfo(){
            alert("调用父页面")
        }
    }
};
</script>

<style>
*{
    margin: 0px;
    padding: 0px;
}
.For_Large{
    width: 100%;
    height: 100%;
    background-color: #e9edf6;
}
.For_LargeBox{
    width: calc(100% - 40px);
    height: calc(100% - 20px);
    margin: auto;
}
.For_LargeLeft{
    float: left;
    height: 100%;
    width:  calc(100% - 364px);
    background-color: #fff;
}
.For_LargeLeft .For_LargeLeftencer{
    overflow-y: auto;
}
.For_LargeLeftitle{
    height: 20px;
    text-indent: 15px;
    padding: 10px 0;
    background-color: #e9edf6;
}
.For_LargeLeftitle p{
    border-left: 4px solid #4374d1;
}
.For_LargeLeft_iframe{
    width: 100%;
    height: 100%;
    border: 0px;
    
}
.For_LargeRight{
    width: 350px;
    height: 100%;
    float: right;
    background-color: #fff;
}
.For_LargeRight_iframe{
    width: 100%;
    height: calc(100% - 40px);
    border: 0px;
}
</style>