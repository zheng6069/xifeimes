<template>
    <div class="For_Large" :style="TableHeight">
        <div class="For_LargeBox">
            <div class="For_LargeLeft">
                <div class="For_LargeLeftitle"><p>排产信息列表</p></div>
                <div class="For_LargeLeftencer">
                    <router-view @func="ONTestItemQuery" v-if="Finalassembly == 1"></router-view>
                    <!-- 设备问题列表 -->
                    <div class="qualityinformation" v-if="Finalassembly == 3">
                        <el-table
                            :data="facilitylist"
                            border
                            :style="TableHeight2"
                            style="width: 100%;">
                            <el-table-column
                            prop="mainNum"
                            label="基准编号">
                            </el-table-column>
                            <el-table-column
                            prop="mainName"
                            label="基准名称">
                            </el-table-column>
                            <el-table-column
                            prop="facilityNum"
                            label="设备编号">
                            </el-table-column>
                            <el-table-column
                            prop="facilityName"
                            label="设备名称">
                            </el-table-column>
                            <el-table-column
                            prop="facilityModel"
                            label="设备型号">
                            </el-table-column>
                            <el-table-column
                            prop="mainType"
                            label="维保类型">
                            </el-table-column>
                            <el-table-column
                            prop="person"
                            label="提交人员">
                            </el-table-column>
                            <el-table-column
                            prop="mainTime"
                            label="生成时间">
                            </el-table-column>
                            <el-table-column
                            prop="mainId"
                            label="基础数据">
                            </el-table-column>
                            <el-table-column
                            prop="station"
                            label="所属站位">
                            </el-table-column>
                        </el-table>
                        <div class="DetectPaging">
                            <el-pagination
                                background
                                @size-change="SSizeChange"
                                @current-change="SOnPaging"
                                :page-size="SpageSize"
                                :current-page="SnowPages"
                                :page-sizes="[10, 50, 100, 200]"
                                layout="total,sizes, prev, pager, next, jumper"
                                :total="Stotal"
                            ></el-pagination>
                        </div>
                    </div>
                    <!-- 工装问题列表 -->
                    <div class="qualityinformation" v-if="Finalassembly == 4">
                        <el-table
                            :data="frocklist"
                            border
                            :style="TableHeight2"
                            style="width: 100%;">
                            <el-table-column
                            prop="species"
                            label="种类">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="名称">
                            </el-table-column>
                            <el-table-column
                            prop="product"
                            label="图号">
                            </el-table-column>
                             <el-table-column
                            prop="project"
                            label="项目">
                            </el-table-column>
                             <el-table-column
                            prop="status"
                            label="状态">
                            </el-table-column>
                             <el-table-column
                            prop="dataNumber"
                            label="编号">
                            </el-table-column>
                             <el-table-column
                            prop="expirationDate"
                            label="有效期">
                            </el-table-column>
                             <el-table-column
                            prop="warehouse"
                            label="仓库">
                            </el-table-column>
                            <el-table-column
                            prop="position"
                            label="库位">
                            </el-table-column>
                            <el-table-column
                            prop="useCount"
                            label="使用次数">
                            </el-table-column>
                            <el-table-column
                            prop="checkTime"
                            label="定检时间">
                            </el-table-column>
                            <el-table-column
                            prop="checkStatus"
                            label="定检状态">
                            </el-table-column>
                            <el-table-column
                            prop="qty"
                            label="数量">
                            </el-table-column>
                        </el-table>
                        <div class="DetectPaging">
                            <el-pagination
                                background
                                @size-change="GZSizeChange"
                                @current-change="GZOnPaging"
                                :page-size="GZpageSize"
                                :current-page="GZnowPages"
                                :page-sizes="[10, 50, 100, 200]"
                                layout="total,sizes, prev, pager, next, jumper"
                                :total="GZtotal"
                            ></el-pagination>
                        </div>
                    </div>
                    <!-- 工量具问题列表 -->
                    <div class="qualityinformation" v-if="Finalassembly == 5">
                        <el-table
                            :data="measurelist"
                            border
                            :style="TableHeight2"
                            style="width: 100%;">
                            <el-table-column
                            prop="toolName"
                            label="工量具名称">
                            </el-table-column>
                            <el-table-column
                            prop="toolModel"
                            label="型号">
                            </el-table-column>
                            <el-table-column
                            prop="toolProduct"
                            label="图号">
                            </el-table-column>
                            <el-table-column
                            prop="toolFormat"
                            label="规格">
                            </el-table-column>
                            <el-table-column
                            prop="expirationDate"
                            label="有效期">
                            </el-table-column>
                            <el-table-column
                            prop="station"
                            label="所属站位">
                            </el-table-column>
                            <el-table-column
                            prop="checkTime"
                            label="定检日期">
                            </el-table-column>
                            <el-table-column
                            prop="checkStatus"
                            label="定检状态">
                            </el-table-column>
                            <el-table-column
                            prop="operator"
                            label="所属任务">
                            </el-table-column>
                        </el-table>
                        <div class="DetectPaging">
                            <el-pagination
                                background
                                @size-change="GLSizeChange"
                                @current-change="GLOnPaging"
                                :page-size="GLpageSize"
                                :current-page="GLnowPages"
                                :page-sizes="[10, 50, 100, 200]"
                                layout="total,sizes, prev, pager, next, jumper"
                                :total="GLtotal"
                            ></el-pagination>
                        </div>
                    </div>
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
import { ResourceManagement } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
import SchedulingHomeNewly from './SchedulingHomeNewly.vue';
export default {
  components: { SchedulingHomeNewly },
    data() {
        return {
            Finalassembly: 1,
            TableHeight: {
                height: ""
            },
            TableHeight2: {
                height: ""
            },
            iframeurl:{
                schedulingurl: "http://192.168.100.67:8081/ipems-r/#/visual-preview/54ebf13e-859d-4666-9fb4-65cd78826dc0?token=82931469-0262-46d8-8a8c-2769ef8a69ec"
            },
            facilitylist:[],//设备列表数据
            SpageSize: 10, //每页多少条 设备
            SnowPages: 1, //当前页 设备
            Stotal: 0 ,//总数 设备
            frocklist: [],//工装列表数据
            GZpageSize: 10, //每页多少条 工装
            GZnowPages: 1, //当前页 工装
            GZtotal: 0 ,//总数 工装
            measurelist: [],//工量具列表数据
            GLpageSize: 10, //每页多少条 工量具
            GLnowPages: 1, //当前页 工量具
            GLtotal: 0 ,//总数 工量具
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
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
        // 获取iframe传参
        showDetails(event){
            console.log(event)
            if(event.data.type =="FROM_NTKO_MANIFEST" || event.data.type =="webpackOk") return false;
            // debugger;
            let Emessage = JSON.parse(event.data)
            let formdata = Emessage.param
            console.log(formdata.type)
            if(formdata.type == "pcxxlb01"){
                this.Finalassembly = 1
                this.$router.push({path: "MaterialInspectionNewly"});
            }else if(formdata.type == "pcxxlb02"){
                this.Finalassembly = 3
                this.getequipment()
            }else if(formdata.type == "pcxxlb03"){
                this.Finalassembly = 4
                this.getfrock()
            }else if(formdata.type == "pcxxlb04"){
                this.Finalassembly = 5
                this.getWorkersgauge()
            }
        },
        // 给iframe传参
        ONTestItemQuery(number){
            console.log(number)
            // debugger;
            let data ={
                sortieNum : number
            }
            this.$refs.iframe.contentWindow.postMessage(JSON.stringify({
                methods:'receiveSchedulinglnfo',
                param: data
            }),"*")
        },
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 0 + "px";
            this.TableHeight2.height = window.innerHeight - 125 + "px";
            console.log(this.TableHeight.height)
        },
        getOrderInfo(){
            alert("调用父页面")
        },
        // 获取设备问题数量
        getequipment(){
            let that = this;
            let url = ResourceManagement.GET_N_findRepairFacility;
            let data = {
                pageNum: this.SnowPages,
                pageSize: this.SpageSize
            }
            that.axios
                .post(url, data)
                .then(res => {
                    this.facilitylist = res.data.records
                    this.Stotal = res.data.total
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //获取工装问题数
        getfrock(){
            let that = this;
            let url = ResourceManagement.GET_N_findAllFrock;
            let data = {
                pageNum: this.GZnowPages,
                pageSize: this.GZpageSize
            }
            that.axios
                .post(url, data)
                .then(res => {
                    this.frocklist = res.data.records
                    this.GZtotal = res.data.total
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //获取工量具问题数
        getWorkersgauge(){
            let that = this;
            let url = ResourceManagement.GET_N_findAllTool;
            let data = {
                pageNum: this.GLnowPages,
                pageSize: this.GLpageSize
            }
            that.axios
                .post(url, data)
                .then(res => {
                    this.measurelist = res.data.records
                    this.GLtotal = res.data.total
                })
                .catch(error => {
                    console.log(error);
                });

        },
        // 每页多上条 设备
        SSizeChange(val){
            this.SpageSize = val
            this.getequipment()
        },
        // 当前第几页 设备
        SOnPaging(val){
            this.SnowPages = val
            this.getequipment()
        },
        // 每页多上条 工装
        GZSizeChange(val){
            this.GZpageSize = val
            this.getfrock()
        }, 
        // 当前第几页 工装
        GZOnPaging(val){
            this.GZnowPages = val
            this.getfrock()
        },
        // 每页多上条 工量具
        GLSizeChange(val){
            this.GLpageSize = val
            this.getWorkersgauge()
        }, 
        // 当前第几页 工量具
        GLOnPaging(val){
            this.GLnowPages = val
            this.getWorkersgauge()
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
.qualityinformation{
    padding: 10px;
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