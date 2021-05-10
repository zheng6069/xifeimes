<template>
    <div class="Book_container">
        <div class="Book_Title">盘点信息</div>
        <el-table
            border
            @selection-change="handleSelectionChange"
            ref="multipleTable"
            :data="StandingBookArr"
            height="250"
            style="width: 100%; height: 100%"
            :header-row-style="{ height: '39px' }"
            :header-cell-style="{ padding: '0px' }"
            :row-style="{ height: '39px' }"
            :cell-style="{ padding: '0px' }"
        >
            <el-table-column type="selection" width="60"></el-table-column>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="checkNo" label="盘点单号"></el-table-column>
            <el-table-column prop="checkTime" label="盘点时间"></el-table-column>
            <el-table-column prop="checkUser" label="盘点人"></el-table-column>
            <el-table-column prop="wareHouse" label="仓库"></el-table-column>
        </el-table>
        <el-tabs type="border-card">
            <el-tab-pane label="详细盘点信息">
                <div>
                    <div :style="TableHeight">
                        <el-table
                            border
                            :data="StandingBookArrContent"
                            height="100%"
                            style="width: 100%; height: 100%"
                            :header-row-style="{ height: '39px' }"
                            :header-cell-style="{ padding: '0px' }"
                            :row-style="{ height: '39px' }"
                            :cell-style="{ padding: '0px' }"
                        >
                            <el-table-column type="index" label="序号" width="50"></el-table-column>
                            <el-table-column prop="checkNo" label="盘点单号"></el-table-column>
                            <el-table-column prop="materialNum" label="物料编号"></el-table-column>
                            <el-table-column prop="drawNo" label="物料图号"></el-table-column>
                            <el-table-column prop="materialName" label="物料名称"></el-table-column>
                            <el-table-column prop="wareHouse" label="库房"></el-table-column>
                            <el-table-column prop="locationName" label="库位"></el-table-column>
                            <el-table-column prop="inventoryNum" label="库存数量"></el-table-column>
                            <el-table-column prop="checkNum" label="盘点数量"></el-table-column>
                        </el-table>
                    </div>
                    <div class="And_DescriptionProcessing">
                        <div class="And_FaultDescription">
                            <p>
                                站位长
                                <br />处理意见
                            </p>
                            <div>
                                <el-input
                                    class="And_FaultDescription_textarea"
                                    type="textarea"
                                    v-model="feedback"
                                    disabled
                                ></el-input>
                            </div>
                        </div>
                        <div class="And_FaultDescription">
                            <p>
                                工段长
                                <br />处理意见
                            </p>
                            <div>
                                <el-input
                                    class="And_FaultDescription_textarea"
                                    type="textarea"
                                    v-model="SectionChief"
                                    disabled
                                ></el-input>
                            </div>
                        </div>
                        <div style="clear: both"></div>
                    </div>
                    <div class="And_DescriptionProcessing">
                        <div class="And_FaultDescription">
                            <p>
                                总计划
                                <br />处理意见
                            </p>
                            <div>
                                <el-input
                                    class="And_FaultDescription_textarea"
                                    type="textarea"
                                    v-model="TotalPlanner"
                                ></el-input>
                            </div>
                        </div>
                        <div style="clear: both"></div>
                    </div>
                    <div class="btnC">
                        <el-button type="primary" @click="returnSava('ruleForm')">驳 回</el-button>
                        <el-button type="primary" @click="submitSava('ruleForm')">审 核</el-button>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
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
    /* width: 100%; */
    height: 50px;
    /* padding: 0px 10px; */
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
    /* overflow: hidden; */
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
    /* margin-left: 10px; */
}
.And_FaultDescription_textarea {
    width: 100%;
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
            StandingBookArr: [],
            multipleSelection: [],
            StandingBookArrContent: [],
            feedback: "", // 站位长处理意见
            SectionChief: "", // 工段长处理意见
            TotalPlanner: "" // 总计划处理意见
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
            this.TableHeight.height = window.innerHeight - 540 + "px";
        },
        // 查询
        getSbSearchList() {
            let that = this;
            let url =
                dispatchingManagement.GET_U_getSubmitInventoryMaterialInfo;
            that.axios
                .post(url)
                .then(res => {
                    if (res.data.success == false) {
                        that.$message({
                            message: res.data.message,
                            type: "error"
                        });
                    } else {
                        that.StandingBookArr = res.data.list;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 详细信息
        infoList() {
            let that = this;
            let url = dispatchingManagement.GET_U_getSubmitAllMaterialInfo;
            that.axios
                .post(url, {
                    checkId: that.multipleSelection.checkId,
                    checkNo: that.multipleSelection.checkNo,
                    stationId: that.multipleSelection.stationId
                })
                .then(res => {
                    if (res.data.success == false) {
                        that.$message({
                            message: res.data.message,
                            type: "error"
                        });
                        that.StandingBookArrContent = res.data.list;
                    } else {
                        that.StandingBookArrContent = res.data.list;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 退回
        returnSava() {
            let that = this;
            if (that.TotalPlanner == "") {
                that.$message({
                    message: "驳回时，总计划处理意见为必填项",
                    type: "error"
                });
            } else {
                let url =
                    dispatchingManagement.GET_U_updateMaterialInfoRebutStatus;
                that.axios
                    .post(url, {
                        checkId: that.multipleSelection.checkId,
                        rebutRemark: "", // 站位长
                        workRebutRemark: "", // 工段长
                        planRebutRemark: that.TotalPlanner // 总计划
                    })
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            that.getSbSearchList();
                            that.feedback = "";
                            that.SectionChief = "";
                            that.TotalPlanner = "";
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
        // 提交
        submitSava() {
            let that = this;
            let url = dispatchingManagement.GET_U_updateMaterialInfoStatus;
            that.axios
                .post(url, {
                    checkId: that.multipleSelection.checkId,
                    remark: that.feedback, // 站位长
                    workRemark: that.SectionChief, // 工段长
                    planRemark: that.TotalPlanner // 总计划
                })
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: res.data.message,
                            type: "success"
                        });
                        that.getSbSearchList();
                        that.feedback = "";
                        that.SectionChief = "";
                        that.TotalPlanner = "";
                        that.StandingBookArrContent = [];
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
        },
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            } else {
                this.multipleSelection = val.pop(); //储存新的单选数据
                if (this.multipleSelection != undefined) {
                    this.infoList();
                    this.feedback = this.multipleSelection.remark;
                    this.SectionChief = this.multipleSelection.workRemark;
                }
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
