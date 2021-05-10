<template>
    <div class="Dismantling_container">
        <div class="Dismantling_title">
            <div class="Dismantling_head">
                <p>架次号</p>
                <div>
                    <el-input size="medium" v-model="sortieNo" placeholder="请输入" clearable></el-input>
                </div>
            </div>

            <div class="Dismantling_head">
                <p>站位名称</p>
                <div>
                    <el-input size="medium" v-model="positionName" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <el-button size="medium" type="primary" @click="WorkOrderList">查询</el-button>
        </div>
        <div class="Dismantling_Title">
            指令信息
            <el-button @click="OnDismantling" size="small" type="primary" class="Dismantling_bnt">审批</el-button>
        </div>
        <div :style="TableHeight">
            <el-table
                border
                :data="WorkOrderArr"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                height="100%"
                style="width: 100%;height:100%;"
            >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                <el-table-column prop="stationName" label="站位名称"></el-table-column>
                <el-table-column prop="instructPositionNum" label="指令号"></el-table-column>
                <el-table-column prop="instructPosition" label="指令名称"></el-table-column>
                <el-table-column prop="startTime" label="计划开始时间" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="endTime" label="计划完成时间" :formatter="dateFormat"></el-table-column>
            </el-table>
        </div>
        <!-- 修改弹框 -->
        <el-dialog title :visible.sync="ManHourInfoEdit" width="40%">
            <div class="AdvanElasticFrame_top">
                <el-form :model="ruleFormEdit" :rules="rules" ref="ruleFormEdit" size="medium">
                    <el-form-item label="指令号" prop="two" class="AdvanTesting">
                        <el-input v-model="ruleFormEdit.two" clearable placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="指令名称" prop="three" class="AdvanTesting">
                        <el-input v-model="ruleFormEdit.three" clearable placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="计划开始时间" prop="one" class="AdvanTesting">
                        <el-date-picker
                            style="width:160px"
                            v-model="ruleFormEdit.one"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="计划结束时间" prop="nice" class="AdvanTesting">
                        <el-date-picker
                            style="width:160px"
                            v-model="ruleFormEdit.nice"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="申请人信息" prop="six" class="Advan">
                        <el-input
                            type="textarea"
                            v-model="ruleFormEdit.six"
                            clearable
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="拆解到站位" prop="four" class="AdvanTesting">
                        <el-input
                            type="textarea"
                            v-model="ruleFormEdit.four"
                            clearable
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="指令位置" prop="five" class="AdvanTesting">
                        <el-input v-model="ruleFormEdit.five" clearable placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="站位工程师信息" prop="serve" class="Advan">
                        <el-input
                            type="textarea"
                            v-model="ruleFormEdit.serve"
                            clearable
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="总计划员备注信息" prop="eight" class="Advan">
                        <el-input
                            type="textarea"
                            v-model="ruleFormEdit.eight"
                            clearable
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ManHourEditSave('ruleFormEdit')" type="primary">同 意</el-button>
                <el-button @click="sendBack('ruleFormEdit')">退 回</el-button>
            </div>
        </el-dialog>
    </div>
</template>

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
            sortieNo: "", // 架次号
            positionName: "", // 站位名称
            multipleSelection: [],
            updataId: "",
            ManHourInfoEdit: false, // 修改弹框
            ruleFormEdit: {
                one: "", // 计划开始时间
                two: "", // 指令号
                three: "", // 指令名称
                four: "", // 拆解到站位
                five: "", // 指令位置
                six: "", // 申请人信息
                serve: "", // 站位工程师信息
                eight: "", // 总计划员信息
                nice: "" // 计划结束时间
            },
            rules: {
                eight: [
                    {
                        required: true,
                        message: "请输入总计划员信息",
                        trigger: "blur"
                    }
                ]
            }
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
            this.TableHeight.height = window.innerHeight - 110 + "px";
        },
        // 查询
        WorkOrderList() {
            let that = this;
            let url = dispatchingManagement.GET_V_findAllQuery;
            let data = {
                sortieNo: that.sortieNo,
                instructName: that.positionName
            };
            that.axios
                .post(url, data)
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
        // 审批
        OnDismantling() {
            if (
                this.multipleSelection < 1 ||
                this.multipleSelection == undefined
            ) {
                this.$message({
                    //警示
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.ManHourInfoEdit = true;
                this.ruleFormEdit.one = this.multipleSelection.startTime; // 计划开始时间
                this.ruleFormEdit.two = this.multipleSelection.instructNum; // 指令号
                this.ruleFormEdit.three = this.multipleSelection.instructName; // 指令名称
                this.ruleFormEdit.four = this.multipleSelection.stationName; // 拆解到站位
                this.ruleFormEdit.five = this.multipleSelection.instructPosition; // 指令位置
                this.ruleFormEdit.six = this.multipleSelection.remarks; // 申请人信息
                this.ruleFormEdit.serve = this.multipleSelection.engineerRemarks; // 站位工程师信息
                this.ruleFormEdit.nice = this.multipleSelection.endTime; // 计划结束时间
            }
        },
        // 弹框 - 退回
        sendBack(ruleFormEdit) {
            let that = this;
            let url = dispatchingManagement.GET_V_backApproval;
            let savaData = {
                disassemblyId: that.multipleSelection.disassemblyId,
                plannerRemarks: that.ruleFormEdit.eight,
                stationId: that.multipleSelection.stationId,
                instructName: that.multipleSelection.instructName,
                remarks: that.multipleSelection.remarks,
                instructId: that.multipleSelection.instructId,
                instructionId: that.multipleSelection.instructionId,
                disassemblyCount: that.multipleSelection.disassemblyCount
            };
            this.$refs[ruleFormEdit].validate(valid => {
                if (valid) {
                    that.axios
                        .post(url, savaData)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                that.WorkOrderList();
                                that.ManHourInfoEdit = false;
                            } else {
                                that.$message({
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
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 弹框 - 同意
        ManHourEditSave() {
            let that = this;
            let url = dispatchingManagement.GET_V_agreeApproval;
            let savaData = {
                disassemblyId: that.multipleSelection.disassemblyId,
                plannerRemarks: that.ruleFormEdit.eight,
                stationId: that.multipleSelection.stationId,
                instructName: that.multipleSelection.instructName,
                remarks: that.multipleSelection.remarks,
                instructId: that.multipleSelection.instructId,
                instructionId: that.multipleSelection.instructionId,
                disassemblyCount: that.multipleSelection.disassemblyCount
            };
            that.axios
                .post(url, savaData)
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        that.WorkOrderList();
                        that.ManHourInfoEdit = false;
                    } else {
                        that.$message({
                            message: res.data.message,
                            type: "error",
                            duration: 1500
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>

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
    float: right;
}
.Dismantling_Title {
    height: 30px;
    font-size: 14px;
}
.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
.AdvanTesting {
    width: 280px;
    height: 40px;
    float: left;
    margin-left: 10px;
}
.AdvanTesting div {
    width: 160px;
    float: right;
}
.Advan {
    width: 570px;
    float: left;
    margin-left: 10px;
}
.Advan div {
    width: 450px;
    float: right;
}
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/

.AdvanElasticFrame_top {
    overflow: hidden;
}
</style>
