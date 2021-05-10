<template>
    <div class="Dismantling_container">
        <div class="Dismantling_Title">指令信息</div>
        <div :style="TableHeight">
            <el-table
                border
                :data="WorkOrderArr"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                height="100%"
                style="width: 100%;height:100%;"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                <el-table-column prop="instructName" label="指令名称"></el-table-column>
                <el-table-column prop="instructNum" label="指令号"></el-table-column>
                <el-table-column prop="beforeStationName" label="所属站位"></el-table-column>
                <el-table-column prop="stationName" label="拆解到站位名"></el-table-column>
                <el-table-column prop="instructPosition" label="拆解到指令名"></el-table-column>
                <el-table-column prop="applyTime" label="拆解申请时间" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="approvalTime" label="拆解完成时间" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 0">未申请</span>
                        <span v-else-if="scope.row.status == 1">已申请</span>
                        <span v-else-if="scope.row.status == 2">已拆解</span>
                        <span v-else-if="scope.row.status == 3">已审批</span>
                        <span v-else-if="scope.row.status == 4">被退回</span>
                    </template>
                </el-table-column>
                <el-table-column label="总计划员退回原因" :show-overflow-tooltip="true">
                    <template slot-scope="{ row }">
                        <span>{{ row.backRemarks }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="And_FaultDescription">
            <p>
                申请人
                <br />备注信息
            </p>
            <div class="content">
                <el-input class="And_FaultDescription_textarea" type="textarea" v-model="remark"></el-input>
            </div>
            <div style="clear: both"></div>
        </div>
        <div>
            <el-button
                type="primary"
                @click="AddSave"
                style="margin-top: 34px;margin-left:10px"
            >拆解申请</el-button>
        </div>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Dismantling_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Dismantling_title {
    height: 50px;
}

.Dismantling_head {
    width: 220px;
    float: left;
    margin-right: 10px;
}
.Dismantling_head p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.Dismantling_head div {
    width: 150px;
    float: left;
}
.Dismantling_bnt {
    height: 30px;
    margin-top: 10px;
}
.Dismantling_Title {
    height: 30px;
    font-size: 14px;
}
.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
.And_FaultDescription {
    width: 50%;
    height: 100%;
    float: left;
    overflow: hidden;
    margin-top: 20px;
}
.And_FaultDescription p {
    width: 80px;
    height: 100%;
    float: left;
    box-sizing: border-box;
}
.And_FaultDescription .content {
    width: calc(100% - 80px);
    width: -moz-calc(100% - 80px);
    width: -webkit-calc(100% - 80px);
    width: -o-calc(100% - 80px);

    height: 100%;
    float: left;
}
.And_FaultDescription_textarea {
    width: 100%;
}
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
</style>
<script>
import { dispatchingManagement } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            WorkOrderArr: [],
            remarkArr: [],
            remark: "", // 备注信息
            multipleSelection: [],
            remarkSelection: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            DisassemblyId: ""
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.WorkOrderList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 130 + "px";
        },
        // 查询
        WorkOrderList() {
            let that = this;
            that.axios
                .post(dispatchingManagement.GET_T_multipleDisassembly)
                .then(res => {
                    that.WorkOrderArr = res.data;
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
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            } else {
                this.multipleSelection = val.pop(); //储存新的单选数据
            }
        },
        // 添加
        AddSave() {
            if (
                this.multipleSelection < 1 ||
                this.multipleSelection == undefined
            ) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning"
                });
            } else {
                let that = this;
                let url =
                    dispatchingManagement.GET_T_multipleDisassemblyConfirm;
                let data = that.multipleSelection;
                data.remarks = that.remark;
                that.axios
                    .post(url, data)
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            that.WorkOrderList();
                            that.remark = "";
                        } else {
                            that.$message({
                                message: res.data.message,
                                type: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
};
</script>
