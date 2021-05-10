<template>
    <div>
        <div class="WorkOrder_head">
            <div class="WorkOrder_head_Status">派工状态（备注：棕色-派工未完，蓝色-派工完成）</div>
            <el-button
                type="primary"
                @click="JumpInterface"
                size="small"
                class="WorkOrder_head_bnt"
            >创建工单</el-button>
        </div>

        <div class="WorkOrder_contnet" :style="TableHeight">
            <div class="WorkOrder_contnet_table">
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
                    :row-class-name="tableRowClassName"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="orderNo" label="订单号" width="180"></el-table-column>
                    <el-table-column prop="product" label="产品图号"></el-table-column>
                    <el-table-column prop="productName" label="产品名称" width="180"></el-table-column>
                    <el-table-column prop="createByName" label="客户名称" width="150"></el-table-column>
                    <el-table-column prop="planQty" label="数量" width="180"></el-table-column>
                    <el-table-column prop="batch" label="批次" width="180"></el-table-column>
                    <el-table-column prop="createTime" label="完成时间" width="180"></el-table-column>
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
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.WorkOrder_head {
    height: 50px;
    overflow: hidden;
}
.WorkOrder_head_Status {
    float: left;
    line-height: 50px;
    margin-left: 10px;
    font-size: 12px;
}
.WorkOrder_head_bnt {
    float: right;
    margin-right: 10px;
    margin-top: 10px;
    color: #fff;
}

.WorkOrder_contnet {
    width: 100%;
}
.WorkOrder_contnet_table {
    padding: 0px 10px;
    height: 100%;
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
import { PlanningProduction } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            AddedDetectionAfXiang: "",
            tableData: [], //检测项table数据

            OrderID: "", //工单id

            TableHeight: {
                height: ""
            },

            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            TickArr: []
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
            this.TableHeight.height = window.innerHeight - 110 + "px";
        },
        //列表展示
        ONlist() {
            this.axios({
                method: "post",
                url: PlanningProduction.GET_A_WorkOrderList,
                data: {
                    pageNum: this.nowPages,
                    pageSize: this.pageSize
                }
            })
                .then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.cellStyle();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.ONlist();
        },
        //分页paging
        PagingList(val) {
            this.nowPages = val;
            this.ONlist();
        },
        //勾选
        //table单选功能
        Tick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.TickArr = row.pop(); //储存新的单选数据
                if (this.TickArr != undefined) {
                    this.OrderID = this.TickArr.mesTaskId;
                }
            }
        },
        tableRowClassName({ row }) {
            if (row.mesTaskStatus === 1) {
                //  已派工
                return "brown-row";
            } else if (row.mesTaskStatus === 2) {
                // 已开工
                return "blue-row";
            }
            return "";
        },
        //跳转界面
        JumpInterface() {
            if (this.TickArr < 1 || this.TickArr == undefined) {
                this.$message({
                    //失败后的提示
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.$router.push({
                    path: "WorkOrderProductionBox",
                    query: {
                        workFlowId: this.OrderID
                    }
                });
            }
        }
    }
};
</script>