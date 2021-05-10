<template>
    <div>
        <div class="IRH_head">
            <div class="IRH_head_left">
                <p>站位</p>
                <el-select
                    size="medium"
                    v-model="Stations"
                    @change="AddCouponSelected"
                    placeholder="请选择"
                    clearable
                >
                    <el-option
                        v-for="item in optionOne"
                        :key="item.warehouseId"
                        :label="item.warehouseName"
                        :value="item.warehouseName"
                    ></el-option>
                </el-select>
            </div>
        </div>
        <div class="IRH_contnet" :style="TableHeight">
            <div class="IRH_title">
                <div class="IRHBox_info">
                    <el-button size="medium" type="primary" @click="IssueResultsHomeAdd">添加任务包</el-button>
                    <el-button size="medium" type="primary" @click="IssueResultsHomeNext">下发</el-button>
                    <el-button size="medium" type="primary" @click="IsRHomeRe">返回</el-button>
                </div>
            </div>
            <div class="IRH_contnet_table">
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
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="See(scope.row)">查看</el-button>
                            <el-button type="primary" size="mini" @click="Edit(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
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
.IRH_head {
    height: 60px;
    overflow: hidden;
}
.IRH_head_left {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.IRH_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.IRH_head_left div {
    width: 170px;
    float: left;
}
.IRH_head_bnt {
    /* float: right; */
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
}
.IRH_contnet {
    width: 100%;
}
.IRH_title {
    height: 40px;
    overflow: hidden;
}
.IRH_title .IRHBox_title {
    float: left;
    text-indent: 10px;
    font-size: 12px;
    line-height: 40px;
}
.IRH_title .IRHBox_info {
    font-size: 12px;
    line-height: 40px;
    margin-left: 10px;
}
.IRH_contnet_table {
    padding: 0px 10px;
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
.IRHPaging {
    height: 40px;
    padding: 0px 10px;
    margin-top: 20px;
}
</style>
<script>
import { BasicData, AutomaticScheduling } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    name: "Start",
    data() {
        return {
            tableData: [], //检测项table数据
            Stations: "", // 站位
            TableHeight: {
                height: ""
            },
            multipleSelection: [],
            optionOne: []
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.getOptionOneInfo();
    },
    mounted() {},
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 85 + "px";
        },
        // 查询站位名称
        getOptionOneInfo() {
            let that = this;
            that.axios
                .post(BasicData.GET_Z_findAllWarehouse)
                .then(res => {
                    that.optionOne = res.data;
                    that.Stations = that.optionOne[0].warehouseName;
                    this.rhList();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        AddCouponSelected() {
            let that = this;
            that.axios
                .get(AutomaticScheduling.GET_Q_find, {
                    params: {
                        stationName: that.Stations,
                        monthStatus: 0
                    }
                })
                .then(res => {
                    that.tableData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        rhList() {
            let that = this;
            that.axios
                .get(AutomaticScheduling.GET_Q_find, {
                    params: {
                        stationName: that.Stations,
                        monthStatus: 0
                    }
                })
                .then(res => {
                    that.tableData = res.data;
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
        // 增加
        IssueResultsHomeAdd() {
            this.$router.push({
                path: "IssueResultsOneInfo",
                query: {
                    monthPlanName: "增加"
                }
            });
        },
        // 下发
        IssueResultsHomeNext() {
            let that = this;
            if (that.tableData.length == 0) {
                that.$message({
                    message: "暂无数据，请选择有数据的站位下发",
                    type: "warning"
                });
                return false;
            } else {
                that.axios
                    .post(AutomaticScheduling.GET_Q_issued, that.tableData)
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            that.getOptionOneInfo();
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
        // 返回
        IsRHomeRe() {
            this.$router.go(-1);
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
        // 修改
        Edit(row) {
            this.$router.push({
                path: "IssueResultsOneInfo",
                query: {
                    monthPlanId: row.monthPlanId,
                    monthPlanName: "修改"
                }
            });
        }
    }
};
</script>
