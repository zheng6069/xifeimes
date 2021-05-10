<template>
    <div class="Dismantling_container" id="Dismantling_container">
        <div class="Dismantling_Title">
            指令信息
            <el-button
                @click="sendBack"
                size="small"
                type="primary"
                class="Dismantling_bnt"
                style="margin-left:10px"
            >退回</el-button>
            <el-button @click="OnDismantling" size="small" type="primary" class="Dismantling_bnt">拆解</el-button>
        </div>
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
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                <el-table-column prop="instructName" label="指令名称"></el-table-column>
                <el-table-column prop="instructNum" label="指令号"></el-table-column>
                <el-table-column prop="startTime" label="计划开始时间" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="endTime" label="计划完成时间" :formatter="dateFormat"></el-table-column>
                <el-table-column label="备注" :show-overflow-tooltip="true">
                    <template slot-scope="{ row }">
                        <span>{{ row.remarks }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="站位工程师退回原因" :show-overflow-tooltip="true">
                    <template slot-scope="{ row }">
                        <span>{{ row.plannerRemarks }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 拆解弹框 -->
        <el-dialog title :visible.sync="ManHourInfoEdit" width="50%">
            <div class="AdvanElasticFrame_top">
                <el-form :model="ruleFormEdit" :rules="rules" ref="ruleFormEdit" size="medium">
                    <el-form-item label="架次号" prop="one" class="AdvanTesting">
                        <el-input v-model="ruleFormEdit.one" clearable placeholder="请输入" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="指令号" prop="two" class="AdvanTesting">
                        <el-input v-model="ruleFormEdit.two" clearable placeholder="请输入" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="指令名称" prop="three" class="AdvanTesting">
                        <el-input v-model="ruleFormEdit.three" clearable placeholder="请输入" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="拆解到站位" prop="four" class="AdvanTesting">
                        <el-select
                            v-model="ruleFormEdit.four"
                            clearable
                            placeholder="请选择"
                            @change="selectInstruction"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.stationId"
                                :label="item.stationName"
                                :value="item.stationId"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指令位置" prop="five" class="AdvanTesting">
                        <el-input v-model="ruleFormEdit.five" clearable placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息" prop="six" class="Advan">
                        <el-input
                            type="textarea"
                            v-model="ruleFormEdit.six"
                            clearable
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ManHourInfoEdit = false">取 消</el-button>
                <el-button @click="ManHourEditSave('ruleFormEdit')" type="primary">拆 解</el-button>
            </div>
        </el-dialog>
        <!-- 指令选择详细界面 -->
        <el-dialog title :visible.sync="InstructionSelection" width="70%">
            <my-instructionselection v-bind:datamsg="stationId" @fatherMethod="fatherMethod"></my-instructionselection>
        </el-dialog>
        <!--  退回弹框 -->
        <el-dialog title :visible.sync="retrueBox" width="40%">
            <div class="AdvanElasticFrame_top">
                <el-form
                    :model="retrueBoxContent"
                    :rules="rule"
                    ref="retrueBoxContent"
                    size="medium"
                >
                    <el-form-item label="备注" prop="retrueRemark">
                        <el-input
                            type="textarea"
                            v-model="retrueBoxContent.retrueRemark"
                            clearable
                            placeholder="请输入"
                            :rows="5"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="retrueBox = false">取 消</el-button>
                <el-button type="primary" @click="retrueBoxFeameAddSave('retrueBoxContent')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
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
.Advan {
    width: 570px;
    float: left;
    margin-left: 10px;
}
.Advan div {
    width: 480px;
    float: right;
}
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/

.AdvanElasticFrame_top {
    overflow: hidden;
}

.AdvanTesting {
    width: 280px;
    height: 40px;
    float: left;
    margin-left: 10px;
}
.AdvanTesting div {
    width: 180px;
    float: right;
}
</style>
<script>
import { dispatchingManagement } from "../../../common/api";
import InstructionSelection from "./InstructionSelection";
import * as fecha from "element-ui/lib/utils/date";
export default {
    name: "Dismantling_container",
    data() {
        return {
            TableHeight: {
                height: ""
            },
            WorkOrderArr: [],
            workNo: "", // 工单号
            drawing: "", // 图号
            sortieNo: "", // 架次号
            orderNo: "", // 订单号
            multipleSelection: [],
            updataId: "",
            ManHourInfoEdit: false, // 修改弹框
            ruleFormEdit: {
                one: "", // 架次号
                two: "", // 指令号
                three: "", // 指令名称
                four: "", // 拆解到站位
                five: "", // 指令位置
                six: "" // 备注信息
            },
            InstructionSelection: false, // 指令选择弹框
            options: [],
            stationId: "",
            instructId: "",
            instructPositionNum: "",
            rules: {
                four: [
                    { required: true, message: "拆解到站位", trigger: "blur" }
                ],
                five: [
                    {
                        required: true,
                        message: "指令位置不能为空",
                        trigger: "blur"
                    }
                ]
            },
            retrueBox: false, // 退回弹框
            retrueBoxContent: {
                retrueRemark: "" // 退回备注
            },
            rule: {
                retrueRemark: [
                    { required: true, message: "备注不能为空", trigger: "blur" }
                ]
            }
        };
    },
    components: {
        "my-instructionselection": InstructionSelection
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.WorkOrderList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 60 + "px";
        },
        fatherMethod(data) {
            this.InstructionSelection = false;
            this.ruleFormEdit.five = data.instructName;
            this.instructId = data.instructId;
            this.instructPositionNum = data.instructNum;
        },
        // 查询
        WorkOrderList() {
            let that = this;
            that.axios
                .post(dispatchingManagement.GET_W_findAllQuery)
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
        // 拆解
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
                this.optionList();
                this.ruleFormEdit.one = this.multipleSelection.sortieNo;
                this.ruleFormEdit.two = this.multipleSelection.instructNum;
                this.ruleFormEdit.three = this.multipleSelection.instructName;
                this.ruleFormEdit.four = "";
                this.ruleFormEdit.five = "";
                this.ruleFormEdit.six = "";
            }
        },
        // 退回
        sendBack() {
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
                this.retrueBox = true;
                this.retrueBoxContent.retrueRemark = "";
            }
        },
        // 退回 - 确定
        retrueBoxFeameAddSave(retrueBoxContent) {
            let that = this;
            let url = dispatchingManagement.GET_W_backInstruct;
            this.$refs[retrueBoxContent].validate(valid => {
                if (valid) {
                    that.axios
                        .post(url, {
                            engineerRemarks: that.retrueBoxContent.retrueRemark,
                            disassemblyId: that.multipleSelection.disassemblyId,
                            disassemblyCount:
                                that.multipleSelection.disassemblyCount
                        })
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success"
                                });
                                this.WorkOrderList();
                                this.retrueBox = false;
                                this.$refs[retrueBoxContent].resetFields();
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
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 弹框 - 拆解
        ManHourEditSave(ruleFormEdit) {
            let that = this;
            let url = dispatchingManagement.GET_W_updateInstruct;
            let savaData = {
                instructId: that.instructId,
                disassemblyId: that.multipleSelection.disassemblyId,
                engineerRemarks: that.ruleFormEdit.six,
                instructPosition: that.ruleFormEdit.five,
                instructName: that.ruleFormEdit.three,
                stationId: that.ruleFormEdit.four,
                disassemblyCount: that.multipleSelection.disassemblyCount,
                instructPositionNum: that.instructPositionNum
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
                                this.$refs[ruleFormEdit].resetFields();
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
        selectInstruction(val) {
            this.stationId = val;
            this.InstructionSelection = true;
        },
        // 拆解到站位
        optionList() {
            let that = this;
            let url =
                dispatchingManagement.GET_W_findAllStation +
                "?beforeStationId=" +
                this.multipleSelection.beforeStationId;
            that.axios
                .get(url)
                .then(res => {
                    that.options = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>
