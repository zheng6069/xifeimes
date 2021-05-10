<template>
    <div class="For_Large" :style="TableHeight">
        <div class="For_LargeBox">
            <div class="For_LargeLeft">
                <div class="For_LargeLeftitle"><p>异常信息列表</p></div>
                <OnsiteProblemNewly></OnsiteProblemNewly>
            </div>
            <div class="For_LargeRight">
                <div class="For_LargeLeftitle"><p>总装3站位概况</p></div>
                <iframe class="For_LargeRight_iframe" src="https://www.baidu.com"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
// import { ResourceManagement } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
import OnsiteProblemNewly from '../../Integration3D/Stancescheduling/OnsiteProbleNewly';
export default {
  components: { OnsiteProblemNewly },
    data() {
        return {
            Finalassembly: 1,
            TableHeight: {
                height: ""
            },
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
.For_LargeLeftitle{
    height: 20px;
    text-indent: 15px;
    margin: 0 0 20px 0;
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
    height: calc(100% - 45px);
    border: 0px;
}
</style>