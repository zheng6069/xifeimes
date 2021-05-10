<template>
    <div class="container">
        <div class="Receive_head">
            <div class="Receive_head_left">
                <p>工单号</p>
                <el-input v-model="aoH" clearable size="medium" placeholder="请输入"></el-input>
            </div>
            <div class="Receive_head_left">
                <p>指令编号</p>
                <el-input v-model="aircraftType" clearable size="medium" placeholder="请输入"></el-input>
            </div>
            <div class="Receive_head_left">
                <p>架次号</p>
                <el-input v-model="position" clearable size="medium" placeholder="请输入"></el-input>
            </div>
            <div class="Receive_head_left">
                <p>指令名称</p>
                <el-input v-model="times" clearable size="medium" placeholder="请输入"></el-input>
            </div>
            <el-button
                size="medium"
                type="primary"
                class="ReceiveOperation_bnt"
                @click="workersReceiveSearch"
            >查询</el-button>
        </div>

        <div class="Receive_contnet" :style="TableHeight">
            <div class="ReceiveContent_title">
                <div class="Receive_title">任务信息（备注：棕色-已派工，蓝色-已开工，紫色-已保留，黄色-已暂停，红色：已超过计划时间）</div>
                <div class="Receive_info">
                    <el-button type="primary" size="mini" @click="receiveWorkers">报工</el-button>
                </div>
            </div>
            <div class="Receive_contnet_table">
                <el-table
                    border
                    ref="multipleTable"
                    :data="receiveTableData"
                    :row-class-name="receiveClassName"
                    height="100%"
                    style="width: 100%; height: 100%"
                    @selection-change="receiveSelectionChange"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="orderName" label="工单号"></el-table-column>
                    <el-table-column prop="instructNum" label="指令编号"></el-table-column>
                    <el-table-column prop="instructName" label="指令名称"></el-table-column>
                    <el-table-column prop="airType" label="机型"></el-table-column>
                    <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                    <el-table-column prop="drawing" label="产品图号"></el-table-column>
                    <el-table-column
                        prop="startTime"
                        :formatter="dateFormat"
                        label="计划开始"
                        width="180"
                    ></el-table-column>
                    <el-table-column
                        prop="endTime"
                        :formatter="dateFormat"
                        label="计划结束"
                        width="180"
                    ></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.container {
    width: 100%;
    height: 100%;
}
.Receive_head {
    height: 60px;
    overflow: hidden;
}
.Receive_head_left {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Receive_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.Receive_head_left div {
    width: 170px;
    float: left;
}
.Receive_head_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}

.Receive_operation {
    height: 50px;
    /* padding: 0px 10px;  */
}

.Receive_operation_nei {
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* background: #ccc; */
}

.ReceiveOperation_bnt {
    margin-top: 10px;
    margin-left: 10px;
}
.Receive_contnet {
    width: 100%;
}
.ReceiveContent_title {
    height: 30px;
    overflow: hidden;
}
.ReceiveContent_title .Receive_title {
    float: left;
    text-indent: 10px;
    font-size: 12px;
    line-height: 30px;
}
.ReceiveContent_title .Receive_info {
    float: right;
    font-size: 12px;
    /* line-height: 30px; */
    margin-right: 10px;
}
.Receive_contnet_table {
    padding: 0px 10px;
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
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
import { AssemblyPerform } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            detailedInformationHeight: {
                height: ""
            },
            aoH: "",
            aircraftType: "",
            position: "",
            times: "",
            receiveTableData: [],
            receiveSelection: []
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.workersReceiveList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 75 + "px";
        },
        detailedInformation() {
            this.detailedInformationHeight.height =
                window.innerHeight - 150 + "px";
        },
        // 列表渲染
        workersReceiveList() {
            let that = this;
            let url = AssemblyPerform.GET_A_findWorkLists;
            let receiveDataList = {
                orderName: "",
                instructNum: "",
                instructName: "",
                sortieNo: ""
            };
            that.axios
                .post(url, receiveDataList)
                .then(res => {
                    that.receiveTableData = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 状态区分
        receiveClassName({ row }) {
            if (row.isLate == 1) {
                // 超过计划时间
                return "red-row";
            } else {
                if (row.status === 1) {
                    //  已派工
                    return "brown-row";
                } else if (row.status === 2) {
                    // 已开工
                    return "blue-row";
                } else if (row.status === 4) {
                    // 已拆解
                    return "purple-row";
                    // 工单 指令 暂停
                } else if (row.status === 5 || row.status === 6) {
                    return "yellow-row";
                }
            }
            return "";
        },
        //   查询
        workersReceiveSearch() {
            let that = this;
            let url = AssemblyPerform.GET_A_findWorkLists;
            let receiveDataSearch = {
                orderName: that.aoH,
                sortieNo: that.position,
                instructNum: that.aircraftType,
                instructName: that.times
            };
            that.axios
                .post(url, receiveDataSearch)
                .then(res => {
                    that.receiveTableData = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd")
                : "";
        },
        // 指令选择
        receiveSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            } else {
                this.receiveSelection = val.pop(); //储存新的单选数据
            }
        },
        // 跳转报工
        receiveWorkers() {
            if (
                this.receiveSelection < 1 ||
                this.receiveSelection == undefined
            ) {
                this.$message({
                    //警示
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.$router.push({
                    path: "Workers",
                    query: {
                        instructId: JSON.stringify(
                            this.receiveSelection.instructId
                        ),
                        instructionId: JSON.stringify(
                            this.receiveSelection.instructionId
                        ),
                        orderId: JSON.stringify(this.receiveSelection.orderId)
                    }
                });
            }
        }
    }
};
</script>
