<template>
    <div class="For_Large" :style="TableHeight">
        <iframe class="For_Large3Diframe" :style="TableHeight" ref="iframe" id="test1" :src="iframeurl.homeurl"></iframe>
    </div>
</template>

<script>
// import { ResourceManagement } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    data() {
        return {
            iframeurl:{
                homeurl:"http://192.168.100.67:8090/ipems-r/#/visual-preview/4ad213f9-9ad4-42c5-a82a-1125ece1a85e?token=82931469-0262-46d8-8a8c-2769ef8a69ec"
            },
             TableHeight: {
                height: "",
                width:""
            },
            windowidth: ""
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    watch: {
        windowidth(val, oldval) {
            if(oldval !=""){
                this.reloadiframe()
            }
        }
    },
    mounted() {
        window.addEventListener('message', this.showDetails);
        var _this = this
        const iframe = this.$refs.iframe
        // 判断iframe是否加载
        if (iframe.attachEvent) {
            iframe.attachEvent('onload', function () {
                console.log('iframe已加载完毕')
            })
        } else {
            iframe.onload = function () {
                console.log('iframe已加载完毕')
            }
        }
        
    },
    methods: {
        reloadiframe(){
            this.$router.go(0)
        },
        // 获取iframe传参
        showDetails(event){
        },
        // 给内嵌iframe传值
        ONTestItemQuery(){
            alert("点击myiframe")
            debugger;
            let data ={
                modelName : "ceju4"
            }
            document.getElementById("test1").contentWindow.postMessage(JSON.stringify({
                methods:'showColor',
                param:data
            }),"*")
            
        },
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 0 + "px";
            this.TableHeight.width = window.innerWidth - 0 + "px";
            this.windowidth = window.innerWidth
        },
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
    background-color: #000;
    float: left;
}
.For_Large3Diframe{
    margin-left: -2px;
}
</style>