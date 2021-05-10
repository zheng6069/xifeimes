<template>
    <div class="For_Large" :style="TableHeight">
        <div class="For_Large3D">
            <iframe class="For_Large3Diframe" ref="iframe" id="test1" :src="iframeurl.homeurl"></iframe>
        </div>
        <el-dialog
            :visible.sync="centerDialogVisible"
            width="100%"
            center
            class="Fordialog">
            <div class="For_LargeBox">
                <div class="For_LargeLeft">
                    <div class="For_LargeLeftitle">
                        <p v-if="Finalassembly == 1">指令调整列表</p>
                        <p v-else-if="Finalassembly == 2">物料信息</p>
                        <p v-else-if="Finalassembly == 3">设备情况</p>
                        <p v-else-if="Finalassembly == 4">工装情况</p>
                        <p v-else-if="Finalassembly == 5">工量具情况</p>
                        <p v-else-if="Finalassembly == 6">人员信息</p>
                    </div>
                    <div class="For_LargeLefCenter">
                        <!-- 默认工单信息 -->
                        <DispatchAdjustmentNewly @func="getMsgFormSon" @funct="getdata" v-if="Finalassembly == 1"></DispatchAdjustmentNewly>
                        <!-- 调整 -->
                        <ReassignmentBoxNewly @func="getFinalassembly" v-bind:boxlist="boxlist" v-if="Finalassembly == 12"></ReassignmentBoxNewly>
                        <!-- 派工 -->
                        <DispatchBoxNewly @func="getFinalassembly" v-bind:datalist="datalist" v-if="Finalassembly == 13"></DispatchBoxNewly>
                        <!-- 物料信息 -->
                        <ShortItemNewly v-if="Finalassembly == 2"></ShortItemNewly>
                        <!-- 设备情况 -->
                        <IssueNewly @func="ONTestItemQuery" v-if="Finalassembly == 3"></IssueNewly>
                        <!-- 工装情况 -->
                        <FrockRegularCheckNewly @func="ONTestItemQuery" v-if="Finalassembly == 4"></FrockRegularCheckNewly>
                        <!-- 工量具信息 -->
                        <SchedulingMeasuringToolsNewly v-if="Finalassembly == 5"></SchedulingMeasuringToolsNewly>
                        <!-- 人员信息 -->
                        <div class="qualityinformation" v-if="Finalassembly == 6">
                            <el-table
                                :data="personnelist"
                                border
                                :style="TableHeight2"
                                style="width: 100%;">
                                <el-table-column
                                prop="userName"
                                label="人员名称">
                                </el-table-column>
                                <el-table-column
                                prop="userRole"
                                label="角色">
                                </el-table-column>
                                <el-table-column
                                prop="postName"
                                label="职位">
                                </el-table-column>
                                <el-table-column
                                prop="callPhone"
                                label="联系电话">
                                </el-table-column>
                                <el-table-column
                                prop="stationName"
                                label="站位">
                                </el-table-column>
                            </el-table>
                            <div class="DetectPaging">
                                <el-pagination
                                    background
                                    @size-change="personnelhandleSizeChange"
                                    @current-change="personnelOnPaging"
                                    :page-size="personnelpageSize"
                                    :current-page="personnelnowPages"
                                    :page-sizes="[1,10, 50, 100, 200]"
                                    layout="total,sizes, prev, pager, next, jumper"
                                    :total="personneltotal"
                                ></el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="For_LargeRight">
                    <div class="For_LargeRightitle"><p>总装站位概况</p></div>
                    <div class="For_LargeRightCenter">
                        <iframe name="myiframe" ref="myiframe" :style="IframeHeight" class="For_LargeRight_iframe" :src="iframeurl.adjusturl"></iframe>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            :visible.sync="centerDialogVisible2"
            width="98%"
            center
            class="Fordialog">
            <div class="For_LargeBox">
                <div class="For_LargeLeft">
                    <div class="For_LargeLeftitle"><p>生产准备反馈信息</p></div>
                    <div class="For_LargeLefCenter">
                        <!-- 反馈信息默认组件 -->
                        <AddSeeNewly @func="getAddSee" v-if="feedbackinformation == 1" ref="feedbackchild"></AddSeeNewly>
                        <!-- 物料查看 -->
                        <AddSeeOneNewly @func="back" v-if="feedbackinformation == 2"></AddSeeOneNewly>
                        <!-- 设备查看 -->
                        <AddSeeTwoNewly @func="back" v-if="feedbackinformation == 3"></AddSeeTwoNewly>
                        <!-- 工装查看 -->
                        <AddSeeThreeNewly @func="back" v-if="feedbackinformation == 4"></AddSeeThreeNewly>
                        <!-- 工量具查看 -->
                        <AddSeeFourNewly @func="back" v-if="feedbackinformation == 5"></AddSeeFourNewly>
                    </div>
                </div>
                <div class="For_LargeRight">
                    <div class="For_LargeRightitle"><p>总装站位概况</p></div>
                    <div class="For_LargeRightCenter">
                        <iframe name="myiframe" ref="myiframe" :style="IframeHeight" class="For_LargeRight_iframe" :src="iframeurl.productionurl"></iframe>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            :visible.sync="centerDialogVisible3"
            width="98%"
            center
            class="Fordialog">
            <div class="For_LargeBox">
                <div class="For_LargeLeft">
                    <div class="For_LargeLeftitle"><p>异常信息列表</p></div>
                    <div class="For_LargeLefCenter">
                        <!-- 异常信息列表子组件 -->
                        <OnsiteProbleNewly v-if="abnormalinformation == 1" ref="abnormal"></OnsiteProbleNewly>
                    </div>
                </div>
                <div class="For_LargeRight">
                    <div class="For_LargeRightitle"><p>总装站位概况</p></div>
                    <div class="For_LargeRightCenter">
                        <iframe name="myiframe" ref="myiframe" :style="IframeHeight" class="For_LargeRight_iframe" :src="iframeurl.connecturl"></iframe>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            :visible.sync="centerDialogVisible4"
            width="98%"
            center
            class="Fordialog">
            <div class="For_LargeBox">
                <div class="For_LargeLeft">
                    <div class="For_LargeLeftitle"><p>站位交接列表</p></div>
                    <div class="For_LargeLefCenter For_LargeLefCenter2" :style="TableHeight3">
                        <!-- 站位交接默认子组件 -->
                        <StationHandoverNewly @fnuc="getturnover" v-if="Positionhandover == 1" ref="mychild"></StationHandoverNewly>
                        <!-- 质量信息详情 -->
                        <PositionInstructSeeNewly v-if="Positionhandover == 2" ref="mychild"></PositionInstructSeeNewly>
                        <!-- 质量信息列表 -->
                        <div class="qualityinformation" v-if="Positionhandover == 3">
                           <el-table
                                :data="qualitylist"
                                border
                                size="small"
                                :style="TableHeight2"
                                style="width: 100%;">
                                <el-table-column
                                prop="problemType"
                                label="异常类型"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="soritesNo"
                                label="架次号"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="stationName"
                                label="站位号">
                                </el-table-column>
                                <el-table-column
                                prop="proposedUser"
                                label="提出人">
                                </el-table-column>
                                <el-table-column
                                prop="proposedTime"
                                label="提交时间">
                                </el-table-column>
                                <el-table-column
                                prop="productStatus"
                                label="状态">
                                </el-table-column>
                                <el-table-column
                                prop="problemDesc"
                                label="问题描述">
                                </el-table-column>
                                <el-table-column
                                prop="demandTime"
                                label="关闭时间">
                                </el-table-column>
                                <!-- <el-table-column
                                prop="address"
                                label="详细信息">
                                </el-table-column> -->
                            </el-table>
                            <div class="DetectPaging">
                                <el-pagination
                                    background
                                    @size-change="handleSizeChange"
                                    @current-change="OnPaging"
                                    :page-size="pageSize"
                                    :current-page="nowPages"
                                    :page-sizes="[10, 50, 100, 200]"
                                    layout="total,sizes, prev, pager, next, jumper"
                                    :total="total"
                                ></el-pagination>
                            </div>
                        </div>
                        <!-- 指令完成信息 -->
                        <div class="qualityinformation"  v-if="Positionhandover == 4"> 
                            <el-table
                                :data="accomplishlist"
                                border
                                size="small"
                                :style="TableHeight2"
                                style="width: 100%;">
                                <el-table-column
                                prop="instructId"
                                label="指令号"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="instructName"
                                label="指令名称">
                                </el-table-column>
                                <el-table-column
                                prop="createTime"
                                label="开始时间">
                                </el-table-column>
                                <el-table-column
                                prop="createByName"
                                label="负责人"
                                width="150">
                                </el-table-column>
                                <el-table-column
                                prop="status"
                                label="指令状态"
                                width="150">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.status == 0">未派工</span>
                                    <span v-else-if="scope.row.status == 1">已派工</span>
                                    <span v-else-if="scope.row.status == 2">已开工</span>
                                    <span v-else-if="scope.row.status == 3">已完工</span>
                                    <span v-else-if="scope.row.status == 4">指令保留</span>
                                </template>
                                </el-table-column>
                            </el-table>
                            <div class="DetectPaging">
                                <el-pagination
                                    background
                                    @size-change="WhandleSizeChange"
                                    @current-change="WOnPaging"
                                    :page-size="WpageSize"
                                    :current-page="WnowPages"
                                    :page-sizes="[10, 50, 100, 200]"
                                    layout="total,sizes, prev, pager, next, jumper"
                                    :total="Wtotal"
                                ></el-pagination>
                            </div>
                        </div>
                        <!-- 指令保留信息 -->
                        <div class="qualityinformation"  v-if="Positionhandover == 5"> 
                            <el-table
                                :data="retainlist"
                                border
                                size="small"
                                :style="TableHeight2"
                                style="width: 100%;">
                                <el-table-column
                                prop="instructId"
                                label="指令号"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="instructName"
                                label="指令名称">
                                </el-table-column>
                                <el-table-column
                                prop="createTime"
                                label="开始时间">
                                </el-table-column>
                                <el-table-column
                                prop="createByName"
                                label="负责人"
                                width="150">
                                </el-table-column>
                                <el-table-column
                                prop="status"
                                label="指令状态"
                                width="150">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.status == 0">未派工</span>
                                    <span v-else-if="scope.row.status == 1">已派工</span>
                                    <span v-else-if="scope.row.status == 2">已开工</span>
                                    <span v-else-if="scope.row.status == 3">已完工</span>
                                    <span v-else-if="scope.row.status == 4">指令保留</span>
                                </template>
                                </el-table-column>
                            </el-table>
                            <div class="DetectPaging">
                                <el-pagination
                                    background
                                    @size-change="BhandleSizeChange"
                                    @current-change="BOnPaging"
                                    :page-size="BpageSize"
                                    :current-page="BnowPages"
                                    :page-sizes="[10, 50, 100, 200]"
                                    layout="total,sizes, prev, pager, next, jumper"
                                    :total="Btotal"
                                ></el-pagination>
                            </div>
                        </div>
                        <!-- 移交站位 -->
                        <TransferStationNewly @func="back2" v-if="Positionhandover == 6"></TransferStationNewly>
                        <!-- 站位交接查询 -->
                        <ReceivingStationNewly @func="back2" v-if="Positionhandover == 7" ref="receiving"></ReceivingStationNewly>
                    </div>
                </div>
                <div class="For_LargeRight">
                    <div class="For_LargeRightitle"><p>总装站位概况</p></div>
                    <div class="For_LargeRightCenter">
                        <iframe name="myiframe" ref="myiframe" :style="IframeHeight" class="For_LargeRight_iframe" :src="iframeurl.Exceptionurl"></iframe>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { StationDispatching } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
import DispatchAdjustmentNewly from './DispatchAdjustmentNewly';
import ShortItemNewly from './ShortItemNewly';
import SchedulingWorkClothesNewly from './SchedulingWorkClothesNewly';
import SchedulingMeasuringToolsNewly from './SchedulingMeasuringToolsNewly';
import AddSeeNewly from './AddSeeNewly';
import AddSeeOneNewly from './AddSeeOneNewly';
import AddSeeTwoNewly from './AddSeeTwoNewly';
import AddSeeThreeNewly from './AddSeeThreeNewly';
import AddSeeFourNewly from './AddSeeFourNewly';
import OnsiteProbleNewly from './OnsiteProbleNewly';
import StationHandoverNewly from './StationHandoverNewly';
import PositionInstructSeeNewly from './PositionInstructSeeNewly';
import IssueNewly from './IssueNewly';
import FrockRegularCheckNewly from './FrockRegularCheckNewly';
import ReassignmentBoxNewly from './ReassignmentBoxNewly';
import DispatchBoxNewly from './DispatchBoxNewly';
import TransferStationNewly from './TransferStationNewly';
import ReceivingStationNewly from './ReceivingStationNewly';
export default {
    components: { 
        DispatchAdjustmentNewly,
        ShortItemNewly,
        SchedulingWorkClothesNewly,
        SchedulingMeasuringToolsNewly,
        AddSeeNewly,
        OnsiteProbleNewly,
        StationHandoverNewly,
        PositionInstructSeeNewly,
        IssueNewly,
        FrockRegularCheckNewly,
        ReassignmentBoxNewly,
        DispatchBoxNewly,
        AddSeeOneNewly,
        AddSeeTwoNewly,
        AddSeeThreeNewly,
        AddSeeFourNewly,
        ReceivingStationNewly,
        TransferStationNewly
    },
    data() {
        return {
            Finalassembly: 1, //指令调整中组件切换控制
            feedbackinformation: 1, //生产准备反馈信息中组件切换控制
            abnormalinformation:1, //异常信息组件切换控制
            Positionhandover:1, //站位交接组件切换控制
            centerDialogVisible:false, //指令调整弹窗控制
            centerDialogVisible2:false,//生产反馈弹窗控制
            centerDialogVisible3:false,//站位交接弹窗控制
            centerDialogVisible4:false,//异常信息弹窗控制
            qualitylist:[],//质量信息列表数据
            personnelist: [], //人员信息列表数据
            personnelpageSize: 1, //人员信息列表每页多少条
            personnelnowPages: 1, //人员信息列表当前页
            personneltotal: 0, //人员信息列表总数
            listname: "指令调整列表",
            boxlist:{}, //派工子组件传递数据
            datalist:{},//调整子组件传递数据
            TableHeight: { //页面高度
                height: "" 
            },
            TableHeight2: { //表格高度
                height: ""
            },
            IframeHeight: { //Iframe 高度
                height: ""
            },
            TableHeight3:{
                height: ""
            },
            iframeurl:{ // iframe 地址
                homeurl:"http://192.168.100.67:8081/ipems-r/#/visual-preview/007c4057-b375-4175-9383-0af826f144dd?token=82931469-0262-46d8-8a8c-2769ef8a69ec", //全屏iframe
                adjusturl:"http://192.168.100.67:8081/ipems-r/#/visual-preview/1c9dd9ae-5efa-494a-acfd-46df5f7b42a4?token=82931469-0262-46d8-8a8c-2769ef8a69ec", //指令调整iframe
                productionurl:"http://192.168.100.67:8081/ipems-r/#/visual-preview/632f7346-f5a8-437d-8d27-f400a1da0ea0?token=82931469-0262-46d8-8a8c-2769ef8a69ec", //生产反馈iframe
                connecturl:"http://192.168.100.67:8081/ipems-r/#/visual-preview/09bd72e3-527b-4ae4-8f63-0e4ae9ba9aca?token=82931469-0262-46d8-8a8c-2769ef8a69ec", //站位交接iframe
                Exceptionurl:"http://192.168.100.67:8081/ipems-r/#/visual-preview/345b0939-e79e-4df5-99dd-7a524163143c?token=82931469-0262-46d8-8a8c-2769ef8a69ec" //异常信息iframe
            },
            pageSize: 10, //每页多少条质量信息列表
            nowPages: 1, //当前页质量信息列表
            total: 0 ,//总数质量信息列表
            accomplishlist: [], //指令完成信息数据
            WpageSize: 10, //每页多少条指令完成信息
            WnowPages: 1, //当前页指令完成信息
            Wtotal: 0 ,//总数指令完成信息
            retainlist: [],//指令保留信息数据
            BpageSize: 10, //每页多少条指令保留信息
            BnowPages: 1, //当前页指令保留信息
            Btotal: 0 ,//总数指令保留信息
            windowidth: ""
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    watch: {
        // 监听屏幕变化
        windowidth(val, oldval) {
            console.log(val,oldval)
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
        // 当屏幕宽度变化是重新加载页面
        reloadiframe(){
            // this.$refs.iframe.contentWindow.location.reload(true)
            this.$router.go(0)
        },
        // 获取iframe传参
        showDetails(event){
            console.log(event)
            if(event.data.type =="FROM_NTKO_MANIFEST" || event.data.type =="webpackOk") return false;
            // debugger;
            let Emessage = JSON.parse(event.data)
            let formdata = Emessage.param
            console.log(formdata.type)
            if(formdata.type == "zltz"){
                // 3D主界面点击指令调整
                this.centerDialogVisible = true
                this.centerDialogVisible2 = false
                this.centerDialogVisible3 = false
                this.centerDialogVisible4 = false
                this.Finalassembly = 1
            }else if(formdata.type == "scfk"){
                // 3D主界面点击生产反馈
                this.centerDialogVisible = false
                this.centerDialogVisible2 = true
                this.centerDialogVisible3 = false
                this.centerDialogVisible4 = false
                this.feedbackinformation = 1
                this.$refs.feedbackchild.callactiveName("first") //物料信息
            }else if(formdata.type == "zwjj"){
                // 3D主界面点击站位交接
                this.Positionhandover = 1
                this.centerDialogVisible = false
                this.centerDialogVisible2 = false
                this.centerDialogVisible3 = false
                this.centerDialogVisible4 = true
            }else if(formdata.type == "ycxx"){
                // 3D主界面点击异常信息
                this.centerDialogVisible = false
                this.centerDialogVisible2 = false
                this.centerDialogVisible3 = true
                this.centerDialogVisible4 = false
                this.abnormalinformation = 1
                this.$refs.abnormal.fusiSearch("");
            }else if(formdata.type == "wlqk"){
                this.Finalassembly = 2 //指令调整点击物料情况
            }else if(formdata.type == "sbqk"){
                this.Finalassembly = 3 //指令调整点击人员情况
            }else if(formdata.type == "gzqk"){
                this.Finalassembly = 4 //指令调整点击设备情况
            }else if(formdata.type == "gjlxx"){
                this.Finalassembly = 5 //指令调整点击工装情况
            }else if(formdata.type == "ryqk"){
                this.getpersonnel()
                // console.log("111")
                this.Finalassembly = 6 //指令调整点击工量具信息
            }else if(formdata.type == "aq"){
                this.$refs.abnormal.fusiSearch("安全");//异常信息点击安全
            }else if(formdata.type == "zl"){
                this.$refs.abnormal.fusiSearch("质量");//异常信息点击质量
            }else if(formdata.type == "cb"){
                this.$refs.abnormal.fusiSearch("成本");//异常信息点击成本
            }else if(formdata.type == "jf"){
                this.$refs.abnormal.fusiSearch("交付");//异常信息点击交付
            }else if(formdata.type == "ry"){
                this.$refs.abnormal.fusiSearch("人员");//异常信息点击人员
            }else if(formdata.type == "wlfkxx"){
                this.$refs.feedbackchild.callactiveName("first") //生产反馈点击物料信息
            }else if(formdata.type == "sbfkxx"){
                this.$refs.feedbackchild.callactiveName("second")//生产反馈点击设备信息
            }else if(formdata.type == "gzfkxx"){
                this.$refs.feedbackchild.callactiveName("third")//生产反馈点击工装信息
            }else if(formdata.type == "gljfkxx"){
                this.$refs.feedbackchild.callactiveName("fourth")//生产反馈点击工（量）具信息
            }else if(formdata.type == "zlwt"){
                this.Positionhandover = 3 //站位交接点击质量问题
                this.getstationIssue()
            }else if(formdata.type == "zlwcxx"){
                this.Positionhandover = 4 //站位交接点击指令完成信息
                let data = {
                    pageSize: this.WpageSize,
                    pageNum: this.WnowPages,
                    status: 3
                };
                this.getstationInstruct(data)
            }else if(formdata.type == "zlblxx"){
                this.Positionhandover = 5 //站位交接点击指令保留信息
                let data = {
                    pageSize: this.BpageSize,
                    pageNum: this.BnowPages,
                    status: 4
                };
                this.getstationInstruct(data)
            } 
        },
        // 获取getAddSee信息
        getAddSee(data){
            localStorage.setItem('AddSeeList', JSON.stringify(data));
            if(data.id == 2){
                this.feedbackinformation = 2
            }else if(data.id == 3){
                this.feedbackinformation = 3
            }else if(data.id == 4){
                this.feedbackinformation = 4
            }else if(data.id == 5){
                this.feedbackinformation = 5
            }
        },
        // 获取站位交接组件传递数据
        getturnover(data){
            console.log(data)
            localStorage.setItem('turnoverlist', JSON.stringify(data));
            if(data.start == "接收"){
                this.Positionhandover = 7
            }else{
                this.Positionhandover = 6
            }
        },
        // 子组件点击返回 切换回默认组件
        back(){
            this.feedbackinformation = 1
        },
        back2(){
            this.Positionhandover = 1
        },
        // 请求人员信息接口
        getpersonnel(){
            let that = this;
            let url = StationDispatching.GET_A_getUserInfo;
            let data = {
                    pageSize: this.personnelpageSize,
                    pageNum: this.personnelnowPages
                };
            that.axios
                .post(url, data)
                .then(res => {
                    this.personnelist = res.data.records
                    this.personneltotal = res.data.total
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 质量问题查询接口
        getstationIssue(){
            let that = this;
            let url = StationDispatching.GET_A_stationIssue;
            let data = {
                    pageSize: this.pageSize,
                    pageNum: this.nowPages
                };
            that.axios
                .post(url, data)
                .then(res => {
                    this.qualitylist = res.data.records
                    this.total = res.data.total
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 获取指令列表数据
        getstationInstruct(data){
            let that = this;
            let url = StationDispatching.GET_A_stationInstruct;
            that.axios
                .post(url, data)
                .then(res => {
                    if(data.status == 3){
                        this.accomplishlist = res.data.records
                        this.Wtotal = res.data.total
                    }else if(data.status == 4){
                        this.retainlist = res.data.records
                        this.Btotal = res.data.total
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 给内嵌iframe传值
        ONTestItemQuery(Name){
            debugger;
            let data ={
                modelName : Name
            }
            document.getElementById("test1").contentWindow.postMessage(JSON.stringify({
                methods:'showColor',
                param:data
            }),"*")
            
        },
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 0 + "px";
            this.TableHeight2.height = window.innerHeight - 195 + "px";
            this.TableHeight3.height = window.innerHeight - 100 + "px";
            this.IframeHeight.height = window.innerHeight - 100 + "px";
            this.windowidth = window.innerWidth
        },
        // 子组件点击调整
        getMsgFormSon(data){
            console.log(data)
            this.Finalassembly = 12
            this.boxlist = data
        },
        // 子组件点击派工
        getdata(data){
            console.log(data)
            this.Finalassembly = 13
            this.datalist = data
        },
        // 子组件返回
        getFinalassembly(){
           this.Finalassembly = 1
        },
        //指令保留每页展示多少条数据
        BhandleSizeChange(val) {
            this.BpageSize = val;
            this.BnowPages = 1;
            let data = {
                pageSize: this.BpageSize,
                pageNum: this.BnowPages,
                status: 4
            };
            this.getstationInstruct(data)
        },
        //指令保留分页
        BOnPaging(val) {
            this.BnowPages = val;
            let data = {
                pageSize: this.BpageSize,
                pageNum: this.BnowPages,
                status: 4
            };
            this.getstationInstruct(data)
        },
        //人员列表切换每页展示多少条数据
        personnelhandleSizeChange(val) {
            this.personnelnowPages = 1;
            this.personnelpageSize = val;
            this.getpersonnel()
        },
        //人员列表分页
        personnelOnPaging(val) {
            this.personnelnowPages = val;
            this.getpersonnel()
        },
        //质量信息列表切换每页展示多少条数据
        handleSizeChange(val) {
            this.pageSize = val;
            this.nowPages = 1;
            this.getstationIssue()
        },
        //质量信息列表分页
        OnPaging(val) {
            this.nowPages = val;
            this.getstationIssue()
        },
        //指令完成列表切换每页展示多少条数据
        WhandleSizeChange(val) {
            this.WpageSize = val;
            this.WnowPages = 1;
            let data = {
                pageSize: this.WpageSize,
                pageNum: this.WnowPages,
                status: 3
            };
            this.getstationInstruct(data)
        },
        //指令完成列表分页
        WOnPaging(val) {
            this.WnowPages = val;
            let data = {
                pageSize: this.WpageSize,
                pageNum: this.WnowPages,
                status: 3
            };
            this.getstationInstruct(data)
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
.For_Large3D{
    width: 100%;
    height: 100%;
}
.For_Large3D .For_Large3Diframe{
    width: 99%;
    height: 99%;
}
.Fordialog .el-dialog{
    height: calc(100% - 20px);
    margin: 10px auto !important;
    border-radius: 10px;
    background-color: #e9edf6;
}
.Fordialog .el-dialog__header{
    height: 10px!important;
    padding: 10px!important;
    background-color: #fff;
    border-radius: 10px;
}
.Fordialog .el-dialog__headerbtn{
    top: 8px!important;
}
.Fordialog .el-icon-close:before {
    content: "\e6db";
    font-size: 20px;
}
.Fordialog .el-dialog--center .el-dialog__body{
    background-color: #e9edf6;
    padding: 10px !important;
    border-radius: 10px;
}
.For_LargeBox{
    height: 100%;
    display: flex;
    justify-content: space-between;
}
.For_LargeLeft{
    float: left;
    height: 100%;
    width:  calc(100% - 364px);
}
.For_LargeLeftitle{
    height: 15px;
    text-indent: 15px;
    margin-bottom: 10px;
    background-color: #e9edf6;
}
.For_LargeLeftitle p{
    border-left: 4px solid #4374d1;
}
.For_LargeLefCenter{
    height: 100%;
    background-color: #fff;
}
.For_LargeLefCenter2{
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    background-color: #fff;
}
.qualityinformation{
    padding: 10px;
}
.For_LargeRight{
    width: 350px;
    height: 100%;
    float: right;
}
.For_LargeRightitle{
    height: 15px;
    text-indent: 15px;
    margin-bottom: 10px;
    background-color: #e9edf6;
}
.For_LargeRightitle p{
    border-left: 4px solid #4374d1;
}
.For_LargeRightCenter{
    height: 100%;
    width: 100%;
}
.For_LargeRight_iframe{
    width: 100%;
    height: 100%;
    border: 0px;
}
</style>