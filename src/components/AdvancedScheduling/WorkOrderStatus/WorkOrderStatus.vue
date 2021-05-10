<template>
    <div>
        <div class="WorkOder_head">
            <div class="WorkOder_head_left">
                <p>订单号</p>
                <div>
                    <el-input v-model="taskNumber" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="WorkOder_head_left">
                <p>工单号</p>
                <div>
                    <el-input v-model="WorkOrderNo" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="WorkOder_head_left">
                <p>架次号</p>
                <div>
                    <el-input v-model="SortieNumber" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="WorkOder_head_left" style="width: 240px">
                <p style="width: 70px">产品图号</p>
                <div style="width: 170px">
                    <el-input
                        style="width: 170px"
                        v-model="ProductDrawingNo"
                        size="medium"
                        placeholder="请输入"
                        clearable
                    ></el-input>
                </div>
            </div>
            <div class="WorkOder1_head_left">
                <p>状态</p>
                <div>
                    <el-select v-model="state" size="medium" placeholder="请选择" clearable>
                        <el-option label="冻结" value="4"></el-option>
                        <el-option label="正常" value="1"></el-option>
                    </el-select>
                </div>
            </div>

            <el-button
                size="medium"
                type="primary"
                class="WorkOder_head_bnt"
                @click="
          nowPages = 1;
          OnQuery();
        "
            >查询</el-button>
        </div>

        <div class="WorkOder_contnet" :style="TableHeight">
            <div class="WorkOder_contnet_table">
                <el-table
                    @selection-change="Tick"
                    border
                    :data="tableData"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column label="序号" type="index" width="55"></el-table-column>
                    <el-table-column prop="orderNo" label="订单号"></el-table-column>
                    <el-table-column prop="workNo" label="工单号"></el-table-column>
                    <el-table-column prop="product" label="产品图号"></el-table-column>
                    <el-table-column prop="productName" label="产品名称"></el-table-column>
                    <el-table-column prop="sortie" label="架次号"></el-table-column>
                    <el-table-column prop="startDate" label="计划开始时间" width="120"></el-table-column>
                    <el-table-column prop="endDate" label="计划完成时间" width="120"></el-table-column>
                    <el-table-column prop="workStatus" label="状态" width="120"></el-table-column>
                    <el-table-column label="工作内容" width="150">
                        <template slot-scope="scope">
                            <el-button
                                :disabled="FrozenTrue"
                                type="primary"
                                size="mini"
                                @click="OnFrozen(scope.$index, scope.row)"
                            >冻结</el-button>
                            <el-button
                                :disabled="ReleaseTrue"
                                type="primary"
                                size="mini"
                                @click="OnRelease(scope.$index, scope.row)"
                            >释放</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 冻结 -->
        <el-dialog :visible.sync="Frozen" width="850px">
            <div class="WorkOder_ElasticFrame_top">
                <el-form :model="ruleForm" ref="ruleForm" style="height: 100px">
                    <el-form-item label="订单号" class="WorkOder_Testing">
                        <el-input
                            :disabled="true"
                            v-model="ruleForm.TaskNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="工单号" class="WorkOder_Testing">
                        <el-input
                            :disabled="true"
                            v-model="ruleForm.WorkNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="产品图号" class="WorkOder_Testing">
                        <el-input
                            :disabled="true"
                            v-model="ruleForm.Personnel"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称" class="WorkOder_Testing">
                        <el-input
                            :disabled="true"
                            v-model="ruleForm.PersonnelName"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="冻结原因" class="WorkOder_Testing">
                        <el-select
                            v-model="ruleForm.ReasonsForFreezing"
                            size="medium"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in WoptionTwo"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="WorkOder_contnet_topTab">
                    <el-table border :data="FrozenArr" height="100%">
                        <el-table-column label="序号" type="index" width="55"></el-table-column>
                        <el-table-column prop="stationName" label="当前工位" width="180"></el-table-column>
                        <el-table-column prop="instructName" label="当前指令"></el-table-column>
                        <el-table-column prop="workStartTime" label="指令开始时间" width="120"></el-table-column>
                        <el-table-column prop="workEndTime" label="指令完成时间" width="120"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="OnCancel">取 消</el-button>
                <el-button @click="OnFrozenConfirm" type="primary">冻 结</el-button>
            </div>
        </el-dialog>
        <!-- 释放 -->
        <el-dialog :visible.sync="release" width="850px">
            <div class="WorkOder_ElasticFrame_top">
                <el-form :model="ruleForm" ref="ruleForm" style="height: 100px">
                    <el-form-item label="订单号" class="WorkOder_Testing">
                        <el-input
                            :disabled="true"
                            v-model="ruleForm.TaskNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="工单号" class="WorkOder_Testing">
                        <el-input
                            :disabled="true"
                            v-model="ruleForm.WorkNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="产品图号" class="WorkOder_Testing">
                        <el-input
                            :disabled="true"
                            v-model="ruleForm.Personnel"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称" class="WorkOder_Testing">
                        <el-input
                            :disabled="true"
                            v-model="ruleForm.PersonnelName"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="释放原因" class="WorkOder_Testing">
                        <el-select
                            v-model="ruleForm.ReasonsForFreezing"
                            size="medium"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in WoptionThree"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="WorkOder_contnet_topTab">
                    <el-table border :data="ReleaseArr" height="100%">
                        <el-table-column label="序号" type="index" width="55"></el-table-column>
                        <el-table-column prop="stationName" label="当前工位" width="180"></el-table-column>
                        <el-table-column prop="instructName" label="当前指令"></el-table-column>
                        <el-table-column prop="workStartTime" label="指令开始时间" width="120"></el-table-column>
                        <el-table-column prop="workEndTime" label="指令完成时间" width="120"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="OnCancel">取 消</el-button>
                <el-button @click="OnReleaseConfirm" type="primary">释 放</el-button>
            </div>
        </el-dialog>
        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="handleSizeChange"
                :page-size="pageSize"
                :current-page="nowPages"
                @current-change="OnPaging"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import { AutomaticScheduling, BasicData } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            taskNumber: "", //订单号
            WorkOrderNo: "", //工单号
            SortieNumber: "", //架次号
            ProductDrawingNo: "", //产品图号
            state: "", //状态
            tableData: [],
            Frozen: false, //是否隐藏冻结弹框
            release: false, //是否隐藏释放弹框
            QueryArrState: [
                {
                    name: "正常",
                    id: "1"
                },
                {
                    name: "冻结",
                    id: "4"
                }
            ],
            ruleForm: {
                TaskNumber: "", //订单号
                WorkNumber: "", //工单号
                Personnel: "", //产品图号
                PersonnelName: "", //产品名称
                ReasonsForFreezing: "" //冻结原因
            },
            FrozenArr: [], //冻结信息
            ReleaseArr: [], //释放信息
            orderId: "",
            workNo: "",
            FrozenTrue: false,
            ReleaseTrue: false,
            TableHeight: {
                height: ""
            },

            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            WoptionTwo: [], // 冻结原因
            WoptionThree: [] // 释放原因
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
            this.TableHeight.height = window.innerHeight - 115 + "px";
        },
        // 查询冻结原因
        getWOptionOneInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 6
                    }
                })
                .then(res => {
                    that.WoptionTwo = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询释放原因
        getWOptionTwoInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 7
                    }
                })
                .then(res => {
                    that.WoptionThree = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //默认查询生产全部任务
        OnQuery() {
            this.axios({
                method: "post",
                url: AutomaticScheduling.GET_J_Query,
                data: {
                    page: this.nowPages, //当前页
                    limit: this.pageSize, //每页条数
                    orderNo: this.taskNumber, //任务号
                    workNo: this.WorkOrderNo, //工单号
                    sortie: this.SortieNumber, //架次号
                    product: this.ProductDrawingNo, //产品图号
                    workStatus: this.state //状态
                }
            })
                .then(res => {
                    this.tableData = res.data.list;

                    this.total = res.data.total;
                    this.tableData.map(ite => {
                        this.QueryArrState.map(val => {
                            if (ite.workStatus == val.id) {
                                ite.workStatus = val.name;
                            }
                        });
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //分页功能
        OnPaging(val) {
            this.nowPages = val;
            this.OnQuery();
        },
        //选择每页展示多少条
        handleSizeChange(val) {
            this.pageSize = val;
            this.OnQuery();
        },
        //冻结
        OnFrozen(index, row) {
            if (row.workStatus == "冻结") {
                this.$message({
                    message: "请点击释放",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.Frozen = true;
                this.getWOptionOneInfo(); //查询冻结原因
                this.ruleForm.ReasonsForFreezing = "";
                this.ruleForm.TaskNumber = row.orderNo; //订单号
                this.ruleForm.WorkNumber = row.workNo; //工单号
                this.ruleForm.Personnel = row.product; //产品图号
                this.ruleForm.PersonnelName = row.productName; //产品名称
                this.orderId = row.orderId; //id
                this.workNo = row.workNo;

                this.axios
                    .get(AutomaticScheduling.GET_J_QueryFrozen, {
                        params: {
                            workId: row.orderId
                        }
                    })
                    .then(res => {
                        this.FrozenArr = res.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        //冻结确认
        OnFrozenConfirm() {
            if (this.ruleForm.ReasonsForFreezing != "") {
                this.axios({
                    method: "post",
                    url: AutomaticScheduling.GET_J_Frozen,
                    data: {
                        workId: this.orderId, //id
                        workNo: this.workNo, //
                        stopReason: this.ruleForm.ReasonsForFreezing //冻结原因
                    }
                })
                    .then(res => {
                        if (res.data.success != false) {
                            this.$message({
                                //成功后的提示
                                message: "冻结成功",
                                type: "success",
                                duration: 1500
                            });
                            this.OnQuery();
                            this.Frozen = false;
                        } else {
                            this.$message({
                                //失败后的提示
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
                this.$message({
                    message: "请选择释放原因",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //取消
        OnCancel() {
            this.Frozen = false;
            this.release = false;
        },
        //释放
        OnRelease(index, row) {
            if (row.workStatus == "正常") {
                this.$message({
                    //失败后的提示
                    message: "请点击冻结",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.release = true;
                this.getWOptionTwoInfo(); //查询释放原因
                this.ruleForm.ReasonsForFreezing = "";
                this.ruleForm.TaskNumber = row.orderNo; //订单号
                this.ruleForm.WorkNumber = row.workNo; //工单号
                this.ruleForm.Personnel = row.product; //产品图号
                this.ruleForm.PersonnelName = row.productName; //产品名称
                this.orderId = row.orderId; //id
                this.workNo = row.workNo;
                this.axios
                    .get(AutomaticScheduling.GET_J_QueryRelease, {
                        params: {
                            workId: row.orderId
                        }
                    })
                    .then(res => {
                        if (res.data.success == false) {
                            this.$message({
                                //失败后的提示
                                message: res.data.message,
                                type: "error",
                                duration: 1500
                            });
                        } else {
                            this.ReleaseArr = res.data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        //释放确认
        OnReleaseConfirm() {
            if (this.ruleForm.ReasonsForFreezing != "") {
                this.axios({
                    method: "post",
                    url: AutomaticScheduling.GET_J_Release,
                    data: {
                        workId: this.orderId, //id
                        workNo: this.workNo, //
                        stopReason: this.ruleForm.ReasonsForFreezing //冻结原因
                    }
                })
                    .then(res => {
                        if (res.data.success != false) {
                            this.$message({
                                //成功后的提示
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            this.OnQuery();
                            this.release = false;
                        } else {
                            this.$message({
                                //失败后的提示
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
                this.$message({
                    //失败后的提示
                    message: "请选择冻结原因",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //勾选
        Tick(row) {
            this.CheckDataArr = row; //勾选导出数据
            var str = "";
            row.forEach(function(e) {
                str += e.mesTaskId + ",";
            });
            str = str.substring(0, str.length - 1);
            this.DeleteArr = str.split(",");
        }
    }
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.WorkOder_head {
    height: 60px;
    overflow: hidden;
}
.WorkOder_head_left {
    width: 230px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.WorkOder_head_left p {
    width: 60px;
    float: left;
    line-height: 36px;
}
.WorkOder_head_left div {
    width: 170px;
    float: left;
}

.WorkOder1_head_left {
    width: 140px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.WorkOder1_head_left p {
    width: 40px;
    float: left;
    line-height: 36px;
}
.WorkOder1_head_left div {
    width: 100px;
    float: left;
}
.WorkOder_head_bnt {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}

.WorkOder_ElasticFrame_top {
    overflow: hidden;
}
.WorkOder_contnet_topTab {
    height: 300px;
}
.WorkOder_Testing {
    width: 250px;
    height: 40px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}

.WorkOder_Testing div {
    width: 160px;
    float: right;
}
.WorkOder_TaskContent {
    width: 510px;
    height: 80px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}
.WorkOder_TaskContent div {
    width: 420px;
    float: right;
}

/* form表单之间的间距样式 */
.el-form-item {
    margin-bottom: 5px;
}

.WorkOder_footer {
    height: 30px;
    margin-top: 10px;
}
.WorkOder_Preservation {
    float: right;
    margin-right: 10px;
}
.WorkOder_Close {
    float: right;
}

.WorkOder_contnet {
    width: 100%;
}
.WorkOder_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.DetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
