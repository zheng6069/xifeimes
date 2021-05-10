<template>
    <div>
        <div class="WorkOrderBox_head">
            <div class="WorkOrderBox_head_left">
                <p>任务号</p>
                <div>
                    <el-input :disabled="true" v-model="ReadonlyTaskNumber" size="medium"></el-input>
                </div>
            </div>
            <div class="WorkOrderBox_head_left">
                <p>产品名称</p>
                <div>
                    <el-input :disabled="true" v-model="ReadonlyName" size="medium"></el-input>
                </div>
            </div>
            <div class="WorkOrderBox_head_left" style="width:170px;">
                <p>产品图号</p>
                <div style="width:100px;">
                    <el-input
                        :disabled="true"
                        style="width:100px;"
                        v-model="ReadonlyDrawingNo"
                        size="medium"
                    ></el-input>
                </div>
            </div>
            <div class="WorkOrderBox_head_left">
                <p>客户</p>
                <div>
                    <el-input :disabled="true" v-model="ReadonlyCustomer" size="medium"></el-input>
                </div>
            </div>
            <div class="WorkOrderBox_head_left">
                <p>架次号</p>
                <div>
                    <el-input :disabled="true" v-model="ReadonlySortieNo" size="medium"></el-input>
                </div>
            </div>

            <div class="WorkOrderBox_head_left" style="width:260px;">
                <p style="width:110px;">工艺指令集</p>
                <div>
                    <el-input :disabled="true" v-model="ProcessInstruction" size="medium"></el-input>
                </div>
            </div>

            <div class="WorkOrderBox_head_left" style="width:260px;">
                <p style="width:110px;">计划开始时间</p>
                <div>
                    <el-date-picker
                        :disabled="true"
                        size="medium"
                        type="date"
                        style="width:100%"
                        placeholder="选择日期"
                        v-model="OperationStartTime"
                    ></el-date-picker>
                </div>
            </div>
            <div class="WorkOrderBox_head_left" style="width:260px;">
                <p style="width:110px;">计划完成时间</p>
                <div>
                    <el-date-picker
                        :disabled="true"
                        size="medium"
                        type="date"
                        style="width:100%"
                        placeholder="选择日期"
                        v-model="OperationCompletionTime"
                    ></el-date-picker>
                </div>
            </div>
        </div>

        <div class="WorkOrderBox_operation">
            <div class="WorkOrderBox_operation_nei">
                <el-button @click="Establish" size="medium" type="primary" class="operation_bnt">创建</el-button>
                <el-button @click="BntReturn" size="medium" type="primary" class="operation_bnt">返回</el-button>
            </div>
        </div>
        <div class="WorkOrderBox_contnet" :style="TableHeight">
            <div class="WorkOrderBox_contnet_table">
                <el-table
                    ref="multipleTable"
                    @selection-change="Tick"
                    border
                    :data="tableData"
                    height="100%"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="drawing" label="产品图号" width="180"></el-table-column>
                    <el-table-column prop="name" label="产品名称"></el-table-column>
                    <el-table-column prop="regulation" label="工艺规程" width="180"></el-table-column>
                    <el-table-column prop="version" label="版本" width="80"></el-table-column>
                    <el-table-column prop="scope" label="使用范围" width="180"></el-table-column>
                    <el-table-column prop="description" label="备注"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="handleSizeChange"
                :page-size="pageSize"
                :current-page="nowPages"
                @current-change="PagingList"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
        <!-- 站位 -->
        <el-dialog :visible.sync="StationFeame" width="70%">
            <div class="AdvanElasticFrame_top">
                <el-table
                    @selection-change="StationTick"
                    border
                    :data="StatioArr"
                    height="300"
                    style="width:100%;height:100%;"
                    :cell-style="cellStyle"
                    fit
                    highlight-current-row
                >
                    <el-table-column :selectable="checkboxT" type="selection" width="40"></el-table-column>
                    <el-table-column prop="aoName" label="AO名称" width="180"></el-table-column>
                    <el-table-column prop="aoNo" label="AO编号"></el-table-column>
                    <el-table-column prop="stationName" label="站位名称"></el-table-column>
                    <el-table-column prop="version" label="版本"></el-table-column>
                    <el-table-column prop="startDate" width="160" label="开始时间">
                        <template slot-scope="scope">
                            <p v-if="!scope.row.isChange" v-text="scope.row.startDate"></p>
                            <el-date-picker
                                size="medium"
                                type="date"
                                style="width:100%"
                                @change="StartTime"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                v-model="scope.row.startDate"
                                v-if="scope.row.isChange"
                            ></el-date-picker>
                        </template>
                    </el-table-column>
                    <el-table-column prop="endDate" width="160" label="完成时间">
                        <template slot-scope="scope">
                            <p v-if="!scope.row.isChange" v-text="scope.row.endDate"></p>
                            <el-date-picker
                                size="medium"
                                type="date"
                                style="width:100%"
                                @change="CompletionTime"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                v-model="scope.row.endDate"
                                v-if="scope.row.isChange"
                            ></el-date-picker>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="EstablishSaveStation">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.WorkOrderBox_head {
    height: 100px;
    overflow: hidden;
}
.WorkOrderBox_head_left {
    width: 220px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.WorkOrderBox_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.WorkOrderBox_head_left div {
    width: 150px;
    float: left;
}
.WorkOrderBox_head_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}

.WorkOrderBox_operation {
    height: 50px;
    padding: 0px 10px;
}

.WorkOrderBox_operation_nei {
    width: 100%;
    height: 100%;
    /* background: #ccc; */
}

.WorkOrderBox_operation_bnt {
    margin-right: 10px;
}

.WorkOrderBox_contnet {
    width: 100%;
}
.WorkOrderBox_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.DetectPaging {
    /* width: 100%; */
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
.dialog_footer {
    height: 30px;
    margin-top: 10px;
}
</style>
<script>
import { PlanningProduction } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    name: "Start",
    data() {
        return {
            workFlowId: this.$route.query.workFlowId, //接收参数
            ReadonlyTaskNumber: "", //任务号
            ReadonlyName: "", //名称
            ReadonlyDrawingNo: "", //图号
            ReadonlyCustomer: "", //客户
            ReadonlySortieNo: "", //架次号
            ProcessInstruction: "", //工艺指令
            OperationStartTime: "", //开始时间
            OperationCompletionTime: "", //完成时间
            ReadonplanQty: "", //数量
            AddedDetectionAfXiang: "",
            tableData: [], //检测项table数据
            TestItemQuery: "", //检测项查询
            StationFeame: false, //是否隐藏站位弹框
            TableHeight: {
                height: ""
            },

            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数

            StatioArr: [], //站位数据
            CheckTheStationArr: []
        };
    },
    created() {
        this.TaskInformation();
        this.ONlist();

        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 210 + "px";
        },

        //查询任务信息
        TaskInformation() {
            this.axios
                .get(
                    PlanningProduction.GET_A_TaskInformation +
                        "?mesTaskId=" +
                        this.$route.query.workFlowId
                )
                .then(res => {
                    this.ReadonlyTaskNumber = res.data.orderNo; //任务号
                    this.ReadonlyName = res.data.productName; //产品名称
                    this.ReadonlyDrawingNo = res.data.product; //产品图号
                    this.ReadonlyCustomer = res.data.createByName; //客户
                    this.ReadonlySortieNo = res.data.sortie; //架次号
                    this.ReadonplanQty = res.data.planQty; //数量
                    this.OperationStartTime = res.data.startDate; //开始时间
                    this.OperationCompletionTime = res.data.endDate; //完成时间
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //列表工艺规格查询
        ONlist() {
            this.axios
                .get(
                    PlanningProduction.GET_A_ProcessSpecificationList +
                        "?pageNum=" +
                        1 +
                        "&pageSize=" +
                        this.pageSize +
                        "&mesTaskId=" +
                        this.$route.query.workFlowId
                )
                .then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //每页展示多少条
        handleSizeChange(val) {
            this.pageSize = val;
            this.ONlist();
        },
        //分页
        PagingList(nowPages) {
            this.axios
                .get(
                    "/check/getAllCheck?pageNum=" +
                        nowPages +
                        "&pageSize=" +
                        this.pageSize
                )
                .then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //计划开始时间
        StartTime(Date) {
            this.OperationStartTime = Date;
        },
        //计划完成时间
        CompletionTime(Date) {
            this.OperationCompletionTime = Date;
        },
        //时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd")
                : "";
        },
        //table单选功能
        Tick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.TickArr = row.pop(); //储存新的单选数据
                if (this.TickArr != undefined) {
                    this.ProcessInstruction = this.TickArr.regulation;
                }
            }
        },
        //创建
        Establish() {
            if (this.TickArr < 1 || this.TickArr == undefined) {
                this.$message({
                    message: "请选择数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.StationFeame = true;
                let url = PlanningProduction.GET_A_CreateAPopUp;
                this.axios
                    .get(url, {
                        params: {
                            workFlowId: this.TickArr.workFlowId,
                            mesTaskId: this.$route.query.workFlowId
                        }
                    })
                    .then(res => {
                        this.StatioArr = res.data;
                        this.checkboxT();
                    });
                this.cellStyle();
            }
        },
        //更改背景table背景颜色
        cellStyle(row) {
            if (row != undefined) {
                if (row.row.stationStatus != 0) {
                    return "background: rgba(124,243,94,0.5) !important";
                } else {
                    return "background:#fff";
                }
            }
        },
        //勾选站位
        StationTick(row) {
            this.StatioArr.map(val => {
                //循环让table 可以修改数量
                val.isChange = true;
            });
            this.CheckTheStationArr = row;
        },
        // 勾选禁用
        checkboxT(row, rowIndex) {
            if (rowIndex != undefined) {
                if (row.stationStatus != 0) {
                    return false; //禁用
                } else {
                    return true; //不禁用
                }
            }
        },
        //创建保存站位
        EstablishSaveStation() {
            this.axios({
                method: "post",
                url: PlanningProduction.GET_A_SaveStation,
                data: {
                    mesTaskId: this.$route.query.workFlowId, //工艺指令
                    workFlowId: this.TickArr.workFlowId,
                    qty: this.ReadonplanQty, //数量
                    orderNo: this.ReadonlyTaskNumber, //任务号
                    workFlowStatioinList: this.CheckTheStationArr //完成时间
                }
            }).then(res => {
                if (res.data.status === 1) {
                    this.$message({
                        //成功后的提示
                        message: res.data.errorMsg,
                        type: "success",
                        duration: 1500
                    });
                    this.StationFeame = false; //是否隐藏弹框
                    this.BntReturn();
                } else if (res.data.status === 0) {
                    this.$message({
                        //失败后的提示
                        message: res.data.errorMsg,
                        type: "error",
                        duration: 1500
                    });
                }
            });
        },

        //弹框取消摁钮
        cancel() {
            this.StationFeame = false;
        },

        BntReturn() {
            this.$router.push({
                path: "WorkOrderProduction"
            });
        }
    }
};
</script>
