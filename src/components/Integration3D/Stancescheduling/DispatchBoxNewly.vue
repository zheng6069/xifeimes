<template>
    <div>
        <div class="DispatchBox_head">
            <div class="DispatchBox_head_left">
                <p>工单号</p>
                <el-input
                    v-model="instructWorkNo"
                    size="medium"
                    placeholder="请输入"
                    style="width: 150px"
                    disabled
                ></el-input>
            </div>
            <div class="DispatchBox_head_left">
                <p>产品图号</p>
                <el-input
                    v-model="instructDrawing"
                    size="medium"
                    placeholder="请输入"
                    style="width: 150px"
                    disabled
                ></el-input>
            </div>
            <div class="DispatchBox_head_left">
                <p>产品名称</p>
                <el-input
                    v-model="instructName"
                    size="medium"
                    placeholder="请输入"
                    style="width: 150px"
                    disabled
                ></el-input>
            </div>
        </div>
        <div class="DispatchBox_operation">
            <div class="DispatchBox_operation_nei">
                <div class="DispatchBoxOperationNei">
                    <p>工位</p>
                    <el-input
                        v-model="instructStationName"
                        size="medium"
                        placeholder="请输入"
                        style="width: 150px"
                        disabled
                    ></el-input>
                </div>
                <div class="DispatchBoxOperationNei">
                    <p>数量</p>
                    <el-input
                        v-model="instructNumber"
                        size="medium"
                        placeholder="请输入"
                        style="width: 150px"
                        disabled
                    ></el-input>
                </div>
                <div class="DispatchBoxOperationNei">
                    <p>开始时间</p>
                    <el-input
                        v-model="instructStartDate"
                        :formatter="dateFormat"
                        size="medium"
                        placeholder="请输入"
                        style="width: 150px"
                        disabled
                    ></el-input>
                </div>
                <div class="DispatchBoxOperationNei">
                    <p>结束时间</p>
                    <el-input
                        v-model="instructEndDate"
                        :formatter="dateFormat"
                        size="medium"
                        placeholder="请输入"
                        style="width: 150px"
                        disabled
                    ></el-input>
                </div>
                <el-button
                    size="medium"
                    type="primary"
                    class="DispatchBoxOperation_bnt"
                    @click="workOrder"
                >派工</el-button>
            </div>
        </div>
        <div class="DispatchBox_contnet" :style="TableHeight">
            <div class="DispatchBoxContent_title">
                <div class="DispatchBox_title">备注：棕色-已派工，蓝色-已开工，紫色-已拆解，黄色-已暂停，绿色-已完工</div>
                <div class="DispatchBox_info">
                    <el-button type="primary" size="mini" @click="returnDispatchBox">返回</el-button>
                </div>
            </div>
            <div class="DispatchBox_contnet_table">
                <el-table
                    border
                    :data="instructTableData"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                    :row-class-name="tableRowClassName"
                    @selection-change="instructSelectionChange"
                >
                    <el-table-column :selectable="checkboxT" type="selection" width="40"></el-table-column>
                    <el-table-column prop="instructNum" label="指令号"></el-table-column>
                    <el-table-column prop="instructName" label="指令名称"></el-table-column>
                    <el-table-column prop="persons" label="人员"></el-table-column>
                    <el-table-column
                        prop="startTime"
                        :formatter="dateFormat"
                        label="计划开始时间"
                        width="180"
                    ></el-table-column>
                    <el-table-column
                        prop="endTime"
                        :formatter="dateFormat"
                        label="计划完成时间"
                        width="180"
                    ></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="boxSizeChange"
                :page-size="pageSize"
                @current-change="boxCurrentChange"
                :current-page="nowPages"
                :page-sizes="[10, 50, 100, 200]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
        <!-- 人员弹出框 -->
        <div class="black" v-show="personnelDialogVisible"></div>
        <div v-show="personnelDialogVisible" class="renyuan">
            <div>
                <h5>人员信息<i class="el-icon-close" @click="iconclose()"></i></h5></h5>
                <div>
                    <el-table
                        border
                        height="345"
                        :data="personnelData"
                        ref="multipleTable"
                        :header-row-style="{ height: '38px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '34px' }"
                        :cell-style="{ padding: '0px' }"
                        @selection-change="personnelSelectionChange"
                    >
                        <el-table-column type="selection" width="40"></el-table-column>
                        <el-table-column type="index" label="序号" width="60"></el-table-column>
                        <el-table-column prop="personName" label="人员姓名"></el-table-column>
                        <el-table-column prop="userName" label="用户名称"></el-table-column>
                    </el-table>
                    <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                        <el-form-item label="计划开始时间" prop="value1" style="margin-top: 20px">
                            <el-date-picker
                                v-model="form.value1"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                format="yyyy-MM-dd HH:mm:ss"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="计划结束时间" prop="value2">
                            <el-date-picker
                                v-model="form.value2"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                format="yyyy-MM-dd HH:mm:ss"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="personnelDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="personnelSubmit('form')">保存</el-button>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="人员信息"
            :visible.sync="personnelDialogVisible333"
            :style="detailedInformationHeight"
        >
        </el-dialog>
    </div>
</template>
<style>
.renyuan{
    width: 60%;
    height: 80%;
    background:#fff;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 15px;
    border-radius: 5px;
    z-index: 10;
}
.renyuan h5{
    height: 40px;
    display: flex;
    justify-content: space-between;
}
.renyuan h5 i{
    cursor: pointer;
}
.renyuan .dialog-footer{
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 10px;
}
.black{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(0,0,0,0.5);
    top:0;
    left:0;
}
* {
    margin: 0px;
    padding: 0px;
}
.DispatchBox_head {
    height: 60px;
    overflow: hidden;
}
.DispatchBox_head_left {
    /* width: 240px; */
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.DispatchBox_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.DispatchBox_head_left div {
    width: 170px;
    float: left;
}
.DispatchBox_head_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}

.DispatchBox_operation {
    height: 50px;
}

.DispatchBox_operation_nei {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.DispatchBoxOperationNei {
    margin-left: 10px;
    float: left;
}
.DispatchBoxOperationNei p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.DispatchBoxOperationNei div {
    width: 170px;
    float: left;
}
.DispatchBoxOperation_bnt {
    margin-left: 10px;
}

.DispatchBox_contnet {
    width: 100%;
}

.DispatchBoxContent_title {
    height: 30px;
    overflow: hidden;
}
.DispatchBoxContent_title .DispatchBox_title {
    float: left;
    text-indent: 10px;
    font-size: 12px;
    line-height: 30px;
}
.DispatchBoxContent_title .DispatchBox_info {
    float: right;
    font-size: 12px;
    margin-right: 10px;
}
.DispatchBox_contnet_table {
    padding: 0px 10px;
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}

.DetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
    overflow: hidden;
}
.personnelBlock {
    margin-top: 10px;
}
.demonstration {
    margin-right: 10px;
}
.el-table .blue-row {
    background: rgba(0, 204, 255, 0.2);
}
.el-table .red-row {
    background: rgba(255, 0, 0, 0.2);
}
.el-table .brown-row {
    background: rgba(163, 129, 19, 0.2);
}
.el-table .green-row {
    background: rgba(50, 248, 0, 0.2);
}
.el-table .yellow-row {
    background: rgba(230, 247, 2, 0.2);
}
.el-table .purple-row {
    background: rgba(247, 2, 214, 0.2);
}
</style>
<script>
import { BasicData, dispatchingManagement } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    name: "Start",
    props: ['datalist'],
    data() {
        return {
            orderId: this.$route.query.orderId,
            stationId: this.$route.query.stationId,
            workFlowId: this.$route.query.workFlowId,
            instructTableData: [], //指令table数据
            personnelData: [], // 人员table数据
            instructWorkNo: "", //表单数据
            instructDrawing: "",
            instructName: "",
            instructStationName: "",
            instructNumber: "",
            instructStartDate: "",
            instructEndDate: "",
            TableHeight: {
                height: ""
            },
            detailedInformationHeight: {
                height: ""
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数

            personnelDialogVisible: false,
            personnelDialogVisible333: false,
            instructSelection: [], // 指令
            personnelSelection: [], //人员
            form: {
                value1: "", // 计划开始时间
                value2: "" // 计划结束时间
            },
            rules: {
                //验证
                value1: [
                    //计划开始时间
                    {
                        type: "string",
                        required: true,
                        message: "请选择日期",
                        trigger: "change"
                    }
                ],
                value2: [
                    //计划结束时间
                    {
                        type: "string",
                        required: true,
                        message: "请选择日期",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    created() {
        // 获取参数
        console.log(this.datalist)
        this.orderId = this.datalist.orderId
        this.stationId = this.datalist.stationId
        this.workFlowId = this.datalist.workFlowId
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.instructList();
        this.instructField();
    },
    methods: {
        // 关闭弹窗
        iconclose(){
            this.personnelDialogVisible = false
        },
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 285 + "px";
        },
        detailedInformation() {
            this.detailedInformationHeight.height =
                window.innerHeight - 150 + "px";
        },
        //列表展示
        instructList() {
            let that = this;
            let url = dispatchingManagement.GET_A_findInstructList;
            that.axios
                .get(url, {
                    params: {
                        page: that.nowPages,
                        limit: that.pageSize,
                        orderId: that.orderId,
                        stationId: that.stationId
                    }
                })
                .then(res => {
                    that.instructTableData = res.data.list;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 字段渲染
        instructField() {
            let that = this;
            let url = dispatchingManagement.GET_A_findDispatchSearch;
            that.axios
                .get(url, {
                    params: {
                        orderId: that.orderId,
                        stationId: that.stationId
                    }
                })
                .then(res => {
                    that.instructWorkNo = res.data.workNo;
                    that.instructDrawing = res.data.drawing;
                    that.instructName = res.data.name;
                    that.instructStationName = res.data.stationName;
                    that.instructNumber = res.data.qty;
                    that.instructStartDate = res.data.startDate;
                    that.instructEndDate = res.data.endDate;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        boxSizeChange(val) {
            this.pageSize = val;
            this.nowPages = 1;
            this.instructList();
        },
        // 当前页
        boxCurrentChange(val) {
            this.nowPages = val;
            this.instructList();
        },
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd")
                : "";
        },
        // 显示是否派工
        tableRowClassName({ row }) {
            if (row.status === 1) {
                //  已派工
                return "brown-row";
            } else if (row.status === 2) {
                // 已开工
                return "blue-row";
            } else if (row.status === 3) {
                // 已完工
                return "green-row";
            } else if (row.status === 4) {
                // 已拆解
                return "purple-row";
                // 工单 指令 暂停
            } else if (row.status === 5 || row.status === 6) {
                return "yellow-row";
            }
            return "";
        },
        checkboxT(row, rowIndex) {
            if (rowIndex != undefined) {
                if (row.status != 0) {
                    return false; //禁用
                } else {
                    return true; //不禁用
                }
            }
        },
        // 指令选择
        instructSelectionChange(val) {
            this.instructSelection = val;
        },
        // 人员保存
        personnelSubmit(form) {
            if (this.personnelSelection < 1) {
                this.$message({
                    message: "请选择人员",
                    type: "warning",
                    duration: 1500
                });
            } else {
                let url =
                    dispatchingManagement.GET_A_addDispatchInfo +
                    "?workId=" +
                    this.orderId +
                    "&workNo=" +
                    this.instructWorkNo +
                    "&workFlowId=" +
                    this.workFlowId;
                this.$refs[form].validate(valid => {
                    if (valid) {
                        this.axios
                            .post(url, {
                                orderId: this.orderId,
                                startTime:
                                    this.form.value1 != ""
                                        ? this.form.value1
                                        : null, //计划开始时间
                                endTime:
                                    this.form.value2 != ""
                                        ? this.form.value2
                                        : null, //计划结束时间
                                instructId: this.instructSelection[0]
                                    .instructId,
                                tdDInstructionList: this.instructSelection, //指令信息
                                personList: this.personnelSelection //人员
                            })
                            .then(res => {
                                if (res.data.success == true) {
                                    this.$message({
                                        message: res.data.message,
                                        type: "success",
                                        duration: 1500
                                    });
                                    this.instructList();
                                    this.personnelDialogVisible = false;
                                    this.$refs.multipleTable.clearSelection();
                                    this.$refs[form].resetFields();
                                    this.form.value1 = "";
                                    this.form.value2 = "";
                                } else {
                                    this.$message({
                                        message: res.data.message,
                                        type: "error",
                                        duration: 1500
                                    });
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        },
        // 人员选择
        personnelSelectionChange(val) {
            this.personnelSelection = val;
        },
        // 派工
        workOrder() {
            if (
                this.instructSelection < 1 ||
                this.instructSelection == undefined
            ) {
                this.$message({
                    message: "请选择要派工的指令",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.personnelDialogVisible = true;
                this.form.value1 = "";
                this.form.value2 = "";
                this.axios
                    .get(BasicData.GET_W_selectUserByStationAndRole, {
                        params: {
                            stationName: this.instructStationName,
                            roleName: "工人"
                        }
                    })
                    .then(res => {
                        this.personnelData = res.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        // 返回
        returnDispatchBox() {
            this.$emit('func',1)
        }
    }
};
</script>
