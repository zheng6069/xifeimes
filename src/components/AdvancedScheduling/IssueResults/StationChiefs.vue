<template>
    <div class="Book_container">
        <div :style="TableHeight">
            <el-button size="medium" type="primary" @click="accept">接收</el-button>
            <el-table
                border
                :data="tableData"
                ref="multipleTable"
                height="100%"
                style="width: 100%;height:100%; "
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="index" label="序号" width="60"></el-table-column>
                <el-table-column prop="taskSource" label="任务来源" width="200"></el-table-column>
                <el-table-column prop="workContent" label="工作任务"></el-table-column>
                <el-table-column prop="instructSum" label="对应AO数量" width="120"></el-table-column>
                <el-table-column prop="finishFlag" label="完成标志"></el-table-column>
                <el-table-column prop="principal" label="负责人" width="120"></el-table-column>
                <el-table-column
                    prop="planFinishTime"
                    :formatter="dateFormat"
                    width="120"
                    label="计划完成时间"
                ></el-table-column>
                <el-table-column prop="monthStatus" label="状态" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.monthStatus == 3">未接收</span>
                        <span v-else-if="scope.row.monthStatus == 4">已接收</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="See(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 150px;
}
.Book_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Book_title {
    height: 50px;
}

.Book_head {
    width: 220px;
    float: left;
    margin-right: 10px;
}
.Book_head p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.Book_head div {
    width: 150px;
    float: left;
}
.Book_Title {
    height: 25px;
    font-size: 14px;
}
.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
.Out_bnt {
    float: right;
    margin-left: 10px;
}
.btnC {
    margin-top: 10px;
}
.And_DescriptionProcessing {
    height: 55px;
    margin-top: 10px;
}
.And_FaultDescription {
    width: 50%;
    height: 100%;
    float: left;
    overflow: hidden;
}
.And_FaultDescription p {
    width: 80px;
    height: 100%;
    float: left;
    margin-top: 0px;
    margin-bottom: 0px;
}
.And_FaultDescription div {
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
</style>
<script>
import { AutomaticScheduling } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";

export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            multipleSelection: [],
            tableData: []
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.getSbSearchList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 60 + "px";
        },
        // 查询
        getSbSearchList() {
            let that = this;
            let url = AutomaticScheduling.GET_Q_findByLogUser;
            that.axios
                .get(url)
                .then(res => {
                    that.tableData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 接收
        accept() {
            let that = this;
            if (that.tableData.length == 0) {
                that.$message({
                    message: "暂无数据，不能接收",
                    type: "warning"
                });
                return false;
            } else {
                that.axios
                    .post(
                        AutomaticScheduling.GET_Q_StationReceiving,
                        that.tableData
                    )
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            that.getSbSearchList();
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
        },
        // 查看
        See(row) {
            this.$router.push({
                path: "IssueResultsOneInfo",
                query: {
                    monthPlanId: row.monthPlanId,
                    monthPlanName: "查看"
                }
            });
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
