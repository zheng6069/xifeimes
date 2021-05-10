<template>
    <div>
        <div class="Assembly_head">
            <div class="Assembly_head_left">
                <p>工单号</p>
                <div>
                    <el-input
                        v-model="WorkOrderNo"
                        size="medium"
                        placeholder="请输入"
                        clearable
                    ></el-input>
                </div>
            </div>
            <div class="Assembly_head_left">
                <p>订单号</p>
                <div>
                    <el-input
                        v-model="WrderNumber"
                        size="medium"
                        placeholder="请输入"
                        clearable
                    ></el-input>
                </div>
            </div>
            <div class="Assembly_head_left">
                <p>架次号</p>
                <div>
                    <el-input
                        v-model="SortieNumber"
                        size="medium"
                        placeholder="请输入"
                        clearable
                    ></el-input>
                </div>
            </div>
            <el-button
                @click="nowPages=1;OnQuery()"
                size="medium"
                type="primary"
                class="Assembly_head_bnt"
                >查询</el-button
            >
        </div>
        <div class="AssemblyState">
            <div class="AssemblyState_right">
                派工状态（备注：绿色-已完工，蓝色-已开工，棕色-未开工）
            </div>
        </div>
        <div class="Assembly_contnet" :style="TableHeight">
            <ul
                class="Assembly_contnet_ul"
                v-for="(site, index) in QueryArr"
                :key="index"
            >
                <li class="background">
                    <p
                        @click="OnSeeAssemblyInformation(site)"
                        class="Assembly_contnet_ul_li_p"
                    >
                        {{ site.workNo }}
                    </p>
                </li>
                <li v-for="(siteList, index) in site.stations" :key="index" class="stance">
                    <p
                        @click="OnSeeStation(siteList)"
                        :class="[
                            siteList.stationStatus == 1
                                ? 'NotStarted'
                                : siteList.stationStatus == 2
                                ? 'NotStarted'
                                : siteList.stationStatus == 88
                                ? 'NotStarted'
                                : siteList.stationStatus == 3
                                ? 'Completed'
                                : siteList.stationStatus == 4
                                ? 'ConstructionStarted'
                                : '',
                        ]"
                        class="Assembly_contnet_ul_li_p"
                    >
                    <img src="../../../assets/aircraft.png" alt="">
                        {{ siteList.stationName }}
                    </p>
                </li>
            </ul>
        </div>
        <!-- 新增 -->
        <el-dialog :visible.sync="ElasticFrame" width="700px">
            <div class="AdvanElasticFrame_top">
                <el-form :model="ruleForm">
                    <el-form-item label="工单号" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.WorkNo"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="任务号" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.taskNumber"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="名称" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.name"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="图号" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.DrawingNo"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="架次" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.SortieNo"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="客户" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.customer"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="工艺指令集" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.ProcessInstructionSet"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="指令集版本" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.InstructionSetVersion"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="计划开始时间" class="AdvanTesting">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width: 100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.startTime"
                        ></el-date-picker>
                    </el-form-item>

                    <el-form-item label="计划完成时间" class="AdvanTesting">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width: 100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.EndTime"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="机型" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.model"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialog_footer">
                <el-button class="dialog_Close" @click="close">取 消</el-button>
                <el-button
                    class="dialog_Preservation"
                    @click="AddSave('ruleForm')"
                    type="primary"
                    >保 存</el-button
                >
            </div>
        </el-dialog>
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
</template>

<script>
import { dispatchingManagement } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            QueryArr: [], //检测项table数据
            WorkOrderNo: "", //工单号
            WrderNumber: "", //订单号
            SortieNumber: "", //架次号
            add: [],
            ElasticFrame: false, //是否隐藏弹框
            ruleForm: {
                WorkNo: "", //工单号
                taskNumber: "", //任务号
                name: "", //名称
                DrawingNo: "", //图号
                SortieNo: "", //架次号
                customer: "", //客户
                ProcessInstructionSet: "", //工艺指令集
                InstructionSetVersion: "", //指令集版本
                startTime: "", //开始时间
                EndTime: "", //结束时间
                model: "", //机型
            },
            TableHeight: {
                height: "",
            },

            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
        };
    },
    created() {
        this.OnQuery();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 145 + "px";
        },
        //查询
        OnQuery() {
            this.axios({
                method: "post",
                url: dispatchingManagement.GET_J_Queryt,
                data: {
                    page: this.nowPages, //当前页
                    limit: this.pageSize, //每页多少条
                    workNo: this.WorkOrderNo, //工单号
                    orderNo: this.WrderNumber, //订单号
                    sortieNo: this.SortieNumber, //架次号
                },
            })
                .then((res) => {
                    this.QueryArr = res.data.records;
                    this.total = res.data.total;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        //切换每页展示多少条数据
        handleSizeChange(val) {
            this.pageSize = val;
            this.OnQuery();
        },
        //分页
        OnPaging(val) {
             this.nowPages = val;
            this.OnQuery();
        },
        //查看站位
        OnSeeStation(siteList) {
            this.$router.push({
                path: "DetailedAssemblyInformation",
                query: {
                    wsid: siteList.wsid,
                },
            });
        },
        //关闭
        close() {
            this.ElasticFrame = false;
        },
        OnSeeAssemblyInformation(site) {
            console.log(site, "site");
            this.axios
                .get(dispatchingManagement.GET_J_QueryAssemblyInformatio, {
                    params: {
                        orderId: site.orderId,
                    },
                })
                .then((res) => {
                    this.ruleForm.WorkNo = res.data.workNo; //工单号
                    this.ruleForm.taskNumber = res.data.orderNo; //任务号
                    this.ruleForm.name = res.data.productName; //名称
                    this.ruleForm.DrawingNo = res.data.product; //图号
                    this.ruleForm.SortieNo = res.data.sortie; //架次号
                    this.ruleForm.customer = res.data.customer; //客户
                    this.ruleForm.ProcessInstructionSet = res.data.regulation; //工艺指令集
                    this.ruleForm.InstructionSetVersion = res.data.version; //指令集版本
                    this.ruleForm.startTime = res.data.startDate; //开始时间
                    this.ruleForm.EndTime = res.data.endDate; //结束时间
                    this.ruleForm.model = res.data.airType; //机型
                    this.ElasticFrame = true;
                })
                .catch((error) => {
                    console.log(error);
                });
            this.ElasticFrame = true;
        },
        //查看
        OnSee(index, row) {
            this.$router.push({
                path: "PracticeBom",
                query: {
                    sortie: row.sortie,
                },
            });
        },
    },
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}
li {
    list-style: none;
}

.Assembly_head {
    height: 60px;
    overflow: hidden;
}
.Assembly_head_left {
    width: 230px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Assembly_head_left p {
    width: 60px;
    float: left;
    line-height: 36px;
}
.Assembly_head_left div {
    width: 170px;
    float: left;
}
.Assembly_head_bnt {
    margin-top: 10px;
    margin-left: 10px;
}
.AssemblyState {
    width: 100%;
    height: 30px;
}
.AssemblyHeader {
    padding: 0px 10px;
    overflow: auto;
    height: 50px;
}
.AssemblyHeader_ul {
    width: 100%;
    height: 50px;
    overflow: hidden;
}
.AssemblyHeader_ul li {
    width: 6.25%;
    height: 50px;
    font-size: 12px;
    text-align: center;
    float: left;
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    word-wrap: break-word;
    word-break: normal;
}
.AssemblyHeader_ul li:nth-child(1) {
    border-left: 1px solid #ccc;
}
.AssemblyHeader_ul_li_p {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: left;
    justify-content: space-around;
    flex-direction: column;
}
.AssemblyState_left {
    float: left;
    font-size: 14px;
    margin-left: 10px;
}
.AssemblyState_right {
    font-size: 14px;
    margin-left: 10px;
}
.Assembly_contnet {
    padding: 0px 10px;
    overflow: auto;
}
.Assembly_contnet_ul {
    width: 100%;
    height: 50px;
    overflow: hidden;
    margin-bottom: 5px;
}
.Assembly_contnet_ul li {
    width: 100px;
    height: 35px;
    font-size: 12px;
    margin-right: 10px;
    text-align: center;
    float: left;
    box-sizing: border-box;
    word-wrap: break-word;
    word-break: normal;
    cursor: pointer;
}
.Assembly_contnet_ul_li_p {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: left;
    justify-content: space-around;
    flex-direction: column;
    color: #000;
    position: relative;
}
.Assembly_contnet_ul_li_p img{
    width: 20px;
    position: absolute;
    top: 50%;
    left: 2px;
    transform: translate(0, -50%);
}
.stance{
    width: 8% !important;
   
}
.stance p{
    border: 1px dashed #ccc;
    border-radius: 5px;
}
.background{
    width: 260px !important;
    height: 35px !important;
    background: url("../../../assets/background.png") no-repeat !important;
    background-size: 100%;
}
.background p{
    width: 100%;
    height: 32px;
}
.Completed {
    /* 已完工 */
    background: rgba(50, 248, 0);
    border: 1px dashed rgba(50, 248, 0);
    color: #fff;
    /* opacity:0.5 */
}
.NotStarted {
    /* 未开工 */
     background: rgb(201, 176, 96);
     border: 1px dashed rgb(201, 176, 96);
     color: #fff;
    /* opacity:0.5 */
}
.ConstructionStarted {
    /* 已开工 */
    background: rgba(0, 204, 255);
    border: 1px dashed #29abe2;
    color: #fff;
	 -webkit-animation: twinkling 2s infinite ease-in-out;
    /* opacity:0.5 */
}
@-webkit-keyframes twinkling{	/*透明度由0到1*/
	0% {
        opacity:0.2;
        filter:alpha(opacity=10);
        -webkit-transform:scale(1);
    }
    50% {
        opacity:0.6;
        filter:alpha(opacity=20);
        -webkit-transform:scale(1.02);
    }
    100% {
        opacity:0.2;
        filter:alpha(opacity=10);
        -webkit-transform:scale(1);
    }
}
.DetectPaging {
    /* width: 100%; */
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
.AdvanElasticFrame_top {
    overflow: hidden;
}
.AdvanTesting {
    width: 280px;
    height: 40px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}

.AdvanTesting div {
    width: 160px;
    float: right;
}

/* form表单之间的间距样式 */
.el-form-item {
    margin-bottom: 5px;
}

.dialog_footer {
    height: 30px;
    margin-top: 10px;
}
.dialog_Preservation {
    float: right;
    margin-right: 10px;
}
.dialog_Close {
    float: right;
}
</style>