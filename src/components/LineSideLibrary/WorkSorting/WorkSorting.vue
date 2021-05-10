<template>
    <div class="Storage_container">
        <div class="Storage_Title">
            工单信息
            <el-button @click="Storage" size="small" type="primary" class="Out_bnt">分拣</el-button>
        </div>
        <div :style="TableHeight">
            <el-table
                border
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                :data="StandingStorageArr"
                height="100%"
                style="width: 100%; height: 100%"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="orderNo" label="订单号"></el-table-column>
                <el-table-column prop="workNo" label="工单号"></el-table-column>
                <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                <el-table-column prop="stationName" label="站位名称"></el-table-column>
                <el-table-column prop="startDate" label="计划开始时间" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="endDate" label="计划结束时间" :formatter="dateFormat"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.el-form-item__label {
    width: 120px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 150px;
}
.Storage_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Storage_title {
    height: 50px;
}

.Storage_head {
    width: 220px;
    float: left;
    margin-right: 10px;
}
.Storage_head div {
    width: 220px;
    float: left;
}
.Storage_Title {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
}
.Out_bnt {
    float: right;
}
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
            StandingStorageArr: [],
            multipleSelection: [],
            searchInfo: "" // 查询
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.storageSearchList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 55 + "px";
        },
        // 查询
        storageSearchList() {
            let that = this;
            let url = dispatchingManagement.GET_Y_showWorkOderList;
            that.axios
                .post(url)
                .then(res => {
                    that.StandingStorageArr = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 分拣
        Storage() {
            let that = this;
            if (
                that.multipleSelection < 1 ||
                that.multipleSelection == undefined
            ) {
                that.$message({
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.$router.push({
                    path: "WorkSortInfo",
                    query: {
                        workFlowId: this.multipleSelection.workFlowId,
                        workId: this.multipleSelection.workId,
                        workNo: this.multipleSelection.workNo,
                        sortieNo: this.multipleSelection.sortieNo,
                        stationId: this.multipleSelection.stationId
                    }
                });
            }
        },
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            } else {
                this.multipleSelection = val.pop(); //储存新的单选数据
            }
        },
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd")
                : "";
        }
    }
};
</script>


