<template>
    <div class="Book_container">
        <div class="IRH_head">
            <div class="IRH_head_left">
                <p>站位</p>
                <el-select
                    size="medium"
                    v-model="position"
                    placeholder="请选择"
                    @change="AddCouponSelected()"
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
        <div>
            <div :style="TableHeight">
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
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="And_DescriptionProcessing">
                <div class="And_FaultDescription">
                    <p>主任计划师备注</p>
                    <div>
                        <el-input
                            class="And_FaultDescription_textarea"
                            type="textarea"
                            v-model="feedback"
                        ></el-input>
                    </div>
                </div>
                <!-- <div class="And_FaultDescription">
              <p>生产室<br/>驳回备注</p>
              <div>
                <el-input
                  class="And_FaultDescription_textarea"
                  type="textarea"
                  v-model="workRebutRemark"
                  disabled
                ></el-input>
              </div>
                </div>-->
                <div style="clear: both"></div>
            </div>
            <div class="btnC">
                <el-button type="primary" @click="returnSava('ruleForm')">驳 回</el-button>
                <el-button type="primary" @click="submitSava('ruleForm')">批 准</el-button>
            </div>
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
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
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
import { BasicData, AutomaticScheduling } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";

export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            multipleSelection: [],
            tableData: [],
            position: "",
            optionOne: [],
            feedback: "", // 备注
            workRebutRemark: "" // 工段长驳回意见
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.getOptionOneInfo();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 190 + "px";
        },
        // 查询站位名称
        getOptionOneInfo() {
            let that = this;
            that.axios
                .post(BasicData.GET_Z_findAllWarehouse)
                .then(res => {
                    that.optionOne = res.data;
                    that.position = that.optionOne[0].warehouseName;
                    this.rhList();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        AddCouponSelected() {
            let that = this;
            that.axios
                .get(AutomaticScheduling.GET_O_weekFind, {
                    params: {
                        stationName: that.position,
                        weekStatus: 1
                    }
                })
                .then(res => {
                    that.tableData = res.data;
                    that.feedback = res.data[0].modelDirectorRemarks;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        rhList() {
            let that = this;
            that.axios
                .get(AutomaticScheduling.GET_O_weekFind, {
                    params: {
                        stationName: that.position,
                        weekStatus: 1
                    }
                })
                .then(res => {
                    that.tableData = res.data;
                    that.feedback = res.data[0].modelDirectorRemarks;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 驳回
        returnSava() {
            let that = this;
            if (that.tableData.length != 0) {
                if (that.feedback == "" || that.feedback == undefined) {
                    that.$message({
                        message: "型号室备注为必填项",
                        type: "error"
                    });
                } else {
                    let url =
                        AutomaticScheduling.GET_O_weekDisagree
                    that.axios
                        .post(url, 
                        {
                            tdWeekPlans: that.tableData,
                            weekStatus: 0,
                        })
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success"
                                });
                                that.getOptionOneInfo();
                                that.feedback = "";
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
            } else {
                that.$message({
                    message: "无数据，不能驳回",
                    type: "warning"
                });
            }
        },
        // 批准
        submitSava() {
            let that = this;
            if (that.tableData.length != 0) {
                let url =
                    AutomaticScheduling.GET_O_weekAgree
                that.axios
                    .post(url, 
                    {
                       message: that.feedback,
                       weekStatus: 2,
                       tdWeekPlans: that.tableData
                    })
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            that.getOptionOneInfo();
                            that.feedback = "";
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
            } else {
                that.$message({
                    message: "无数据，不能批准",
                    type: "warning"
                });
            }
        },
        // 查看
        See(row) {
            this.$router.push({
                path: "MonthlyOutputDetail",
                query: {
                    weekPlanId: row.weekPlanId,
                    weekPlanName: "查看"
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
