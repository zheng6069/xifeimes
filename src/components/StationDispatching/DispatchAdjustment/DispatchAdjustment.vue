<template>
    <div>
        <div class="Dispatch_head">
            <div class="Dispatch_head_left">
                <p>任务号</p>
                <el-input v-model="daTaskNumber" size="medium" clearable placeholder="请输入"></el-input>
            </div>
            <div class="Dispatch_head_left">
                <p>工单号</p>
                <el-input v-model="daJobNumber" size="medium" clearable placeholder="请输入"></el-input>
            </div>
            <div class="Dispatch_head_left">
                <p>架次号</p>
                <el-input v-model="daProductName" size="medium" clearable placeholder="请输入"></el-input>
            </div>
            <div class="Dispatch_head_left">
                <p>产品图号</p>
                <el-input v-model="daProductDrawing" size="medium" clearable placeholder="请输入"></el-input>
            </div>
            <el-button
                size="medium"
                type="primary"
                class="Dispatch_head_bnt"
                @click="nowPages=1;ONTestItemQuery()"
            >查询</el-button>
        </div>
        <div class="Dispatch_contnet" :style="TableHeight">
            <div class="Dispatch_title">
                <div class="DispatchBox_title">工单信息（备注：棕色-已派工，蓝色-已开工）</div>
                <div class="DispatchBox_info">
                    <el-button
                        size="mini"
                        type="primary"
                        class="operation_bnt"
                        @click="dispatchList"
                    >派工</el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        class="operation_bnt"
                        @click="reassignment"
                    >改派</el-button>
                </div>
            </div>
            <div class="Dispatch_contnet_table">
                <el-table
                    border
                    :data="tableData"
                    :row-class-name="ClassName"
                    @selection-change="handleSelectionChange"
                    ref="multipleTable"
                    height="100%"
                    style="width: 100%;height:100%; "
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="orderNo" label="订单号"></el-table-column>
                    <el-table-column prop="workNo" label="工单号"></el-table-column>
                    <el-table-column prop="drawing" label="产品图号"></el-table-column>
                    <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                    <el-table-column prop="qty" label="数量" width="80"></el-table-column>
                    <el-table-column prop="stationName" label="工位" width="200"></el-table-column>
                    <el-table-column
                        prop="startDate"
                        :formatter="dateFormat"
                        label="计划开始时间"
                        width="150"
                    ></el-table-column>
                    <el-table-column
                        prop="endDate"
                        :formatter="dateFormat"
                        label="计划完成时间"
                        width="150"
                    ></el-table-column>
                </el-table>
            </div>
        </div>

        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="sizeChange"
                @current-change="currentChange"
                :page-size="pageSize"
                :page-sizes="[10, 50, 100, 200]"
                :current-page="nowPages"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Dispatch_head {
    height: 60px;
    overflow: hidden;
}
.Dispatch_head_left {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Dispatch_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.Dispatch_head_left div {
    width: 170px;
    float: left;
}
.Dispatch_head_bnt {
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
}
.Dispatch_contnet {
    width: 100%;
}
.Dispatch_title {
    height: 30px;
    overflow: hidden;
}
.Dispatch_title .DispatchBox_title {
    float: left;
    text-indent: 10px;
    font-size: 12px;
    line-height: 30px;
}
.Dispatch_title .DispatchBox_info {
    float: right;
    font-size: 12px;
    margin-right: 10px;
}
.Dispatch_contnet_table {
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
import { dispatchingManagement } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    name: "Start",
    data() {
        return {
            tableData: [], //检测项table数据
            daTaskNumber: "", //任务号查询
            daJobNumber: "", // 工单号查询
            daProductDrawing: "", // 产品图号查询
            daProductName: "", // 架次号查询

            TableHeight: {
                height: ""
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            multipleSelection: []
        };
    },
    created() {
        this.ONlist();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 115 + "px";
        },
        //列表展示
        ONlist() {
            let that = this;
            let url = dispatchingManagement.GET_A_findWorkList;
            let data = {
                page: that.nowPages,
                limit: that.pageSize,
                orderNo: that.daTaskNumber,
                workNo: that.daJobNumber,
                drawing: that.daProductDrawing,
                sortieNo: that.daProductName
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.tableData = res.data.list;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.ONlist();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.ONlist();
        },
        // 状态区分
        ClassName({ row }) {
            if (row.stationStatus === 2) {
                // 已派工
                return "brown-row";
            } else if (row.stationStatus === 4) {
                // 已开工
                return "blue-row";
            }
            return "";
        },
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd")
                : "";
        },
        //检查项查询
        ONTestItemQuery() {
            let that = this;
            that.nowPages = 1;
            that.ONlist();
        },
        // 获取点击时的数据
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            } else {
                this.multipleSelection = val.pop(); //储存新的单选数据
            }
        },
        // 派工/改派
        dispatchList() {
            if (
                this.multipleSelection < 1 ||
                this.multipleSelection == undefined
            ) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning"
                });
            } else {
                this.$router.push({
                    path: "DispatchBox",
                    query: {
                        orderId: JSON.stringify(this.multipleSelection.orderId),
                        stationId: JSON.stringify(
                            this.multipleSelection.stationId
                        ),
                        workFlowId: JSON.stringify(
                            this.multipleSelection.workFlowId
                        )
                    }
                });
            }
        },
        reassignment() {
            if (
                this.multipleSelection < 1 ||
                this.multipleSelection == undefined
            ) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning"
                });
            } else {
                this.$router.push({
                    path: "ReassignmentBox",
                    query: {
                        orderId: JSON.stringify(this.multipleSelection.orderId),
                        stationId: JSON.stringify(
                            this.multipleSelection.stationId
                        ),
                        workFlowId: JSON.stringify(
                            this.multipleSelection.workFlowId
                        )
                    }
                });
            }
        }
    }
};
</script>
