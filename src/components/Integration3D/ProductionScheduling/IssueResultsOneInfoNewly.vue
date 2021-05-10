<template>
    <div class="IROView">
        <div class="IROSearch">
            <el-button
                size="medium"
                type="primary"
                class="operation_bnt"
                @click="Del"
                v-show="seeShow"
            >删除</el-button>
            <el-button
                size="medium"
                type="primary"
                class="operation_bnt"
                @click="Add"
                v-show="seeShow"
            >选择指令</el-button>
        </div>
        <div class="IROcontnet" :style="TableHeight">
            <div class="IROcontnet_table">
                <el-table
                    border
                    :data="QueryArr"
                    @selection-change="ChangeArr"
                    ref="multipleArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                    <el-table-column prop="product" label="产品图号"></el-table-column>
                    <el-table-column prop="productName" label="产品名称"></el-table-column>
                    <el-table-column prop="stationName" label="站位名称"></el-table-column>
                    <el-table-column prop="instructNum" label="指令号"></el-table-column>
                    <el-table-column prop="instructName" label="指令名称"></el-table-column>
                    <el-table-column prop="planStartTime" :formatter="dateFormat" label="计划开始时间"></el-table-column>
                    <el-table-column prop="planEndTime" :formatter="dateFormat" label="计划完成时间"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="fromConet">
            <el-form
                :inline="true"
                :model="formInline"
                ref="formInline"
                class="demo-form-inline"
                label-width="120px"
            >
                <el-form-item
                    label="任务来源"
                    prop="one"
                    :rules="[{ required: true, message: '请输入任务来源' }]"
                >
                    <el-input v-model="formInline.one" :disabled="seeDisabled" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="完成标志">
                    <el-input v-model="formInline.two" disabled placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item
                    label="负责人"
                    prop="three"
                    :rules="[
            { required: true, message: '请输入负责人', trigger: 'change' },
          ]"
                >
                    <el-select v-model="formInline.three" :disabled="seeDisabled" placeholder="请选择">
                        <el-option
                            v-for="item in optionTwo"
                            :key="item.id"
                            :label="item.nickname"
                            :value="item.nickname"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="工作任务"
                    prop="four"
                    :rules="[{ required: true, message: '请输入工作任务' }]"
                >
                    <el-input
                        type="textarea"
                        v-model="formInline.four"
                        :disabled="seeDisabled"
                        style="width:400px"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <el-form-item label="计划完成时间">
                    <el-date-picker
                        v-model="formInline.five"
                        disabled
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-button type="primary" @click="AndWorkerBoxSave('formInline')" v-show="seeShow">确定</el-button>
            <el-button type="primary" @click="rutren">返回</el-button>
        </div>
        <!-- 弹框 -->
        <el-dialog title :visible.sync="dialogFormVisible" width="80%">
            <div class="contentVisible">
                <div class="IRT_head">
                    <div class="IRT_head_left">
                        <p>站位</p>
                        <el-select size="medium" v-model="position" placeholder="请选择" clearable>
                            <el-option
                                v-for="item in optionOne"
                                :key="item.warehouseId"
                                :label="item.warehouseName"
                                :value="item.warehouseName"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="IRT_head_left">
                        <p>架次号</p>
                        <el-input v-model="TimesNo" size="medium" clearable placeholder="请输入"></el-input>
                    </div>
                    <div class="IRT_head_left" style="width: 300px">
                        <p style="width: 40px">时间</p>
                        <div style="width: 260px">
                            <el-date-picker
                                style="width: 260px"
                                v-model="times"
                                size="medium"
                                type="daterange"
                                value-format="yyyy-MM-dd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            ></el-date-picker>
                        </div>
                    </div>
                    <el-button
                        size="medium"
                        type="primary"
                        class="IRT_head_bnt"
                        @click="IRTItemQuery"
                    >查询</el-button>
                </div>
                <div class="IRT_contnet">
                    <div class="IRT_title">
                        <div class="IRTBox_title">排产结果</div>
                    </div>
                    <div class="IRT_contnet_table">
                        <el-table
                            border
                            :data="tableData"
                            @selection-change="handleSelectionChange"
                            ref="multipleTable"
                            height="400px"
                            style="width: 100%;height:100%;"
                            :header-row-style="{ height: '39px' }"
                            :header-cell-style="{ padding: '0px' }"
                            :row-style="{ height: '39px' }"
                            :cell-style="{ padding: '0px' }"
                        >
                            <el-table-column type="selection" width="40"></el-table-column>
                            <el-table-column type="index" label="序号" width="60"></el-table-column>
                            <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                            <el-table-column prop="product" label="产品图号"></el-table-column>
                            <el-table-column prop="productName" label="产品名称"></el-table-column>
                            <el-table-column prop="stationName" label="站位名称"></el-table-column>
                            <el-table-column prop="instructNum" label="指令号"></el-table-column>
                            <el-table-column prop="instructName" label="指令名称"></el-table-column>
                            <el-table-column
                                prop="planStartTime"
                                :formatter="dateFormat"
                                label="计划开始时间"
                                width="110px"
                            ></el-table-column>
                            <el-table-column
                                prop="planEndTime"
                                :formatter="dateFormat"
                                label="计划完成时间"
                                width="110px"
                            ></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogSave">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { BasicData, AutomaticScheduling } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            monthPlanId: this.$route.query.monthPlanId,
            monthPlanName: this.$route.query.monthPlanName,
            formInline: {
                one: "", // 任务来源
                two: "", // 完成标志
                three: "", // 负责人
                four: "", // 工作任务
                five: "" // 计划完成时间
            },
            QueryArr: [],
            dialogFormVisible: false,
            position: "", // 站位
            TimesNo: "", // 架次号
            times: null, // 时间
            optionOne: [], // 站位
            optionTwo: [], // 负责人
            tableData: [],
            multipleSelection: [],
            qPush: [],
            multipleArr: [],
            seeDisabled: false,
            seeShow: true
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.getOptionTwoInfo();
        this.seeList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 340 + "px";
        },
        // 查询站位名称
        getOptionOneInfo() {
            let that = this;
            that.axios
                .post(BasicData.GET_Z_findAllWarehouse)
                .then(res => {
                    that.optionOne = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询负责人
        getOptionTwoInfo() {
            let that = this;
            that.axios
                .get(AutomaticScheduling.GET_Q_findUser, {
                    params: {
                        roleName: "站位长"
                    }
                })
                .then(res => {
                    that.optionTwo = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查看/修改 - 渲染
        seeList() {
            let _self = this;
            if (_self.monthPlanName == "查看") {
                _self.axios
                    .get(AutomaticScheduling.GET_Q_findByMonthPlanId, {
                        params: {
                            monthPlanId: _self.monthPlanId
                        }
                    })
                    .then(res => {
                        _self.QueryArr = res.data.planInstructs;
                        _self.formInline.one = res.data.taskSource;
                        _self.formInline.two = res.data.finishFlag;
                        _self.formInline.three = res.data.principal;
                        _self.formInline.four = res.data.workContent;
                        _self.formInline.five = res.data.planFinishTime;
                        _self.seeDisabled = true;
                        _self.seeShow = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else if (_self.monthPlanName == "修改") {
                _self.axios
                    .get(AutomaticScheduling.GET_Q_findByMonthPlanId, {
                        params: {
                            monthPlanId: _self.monthPlanId
                        }
                    })
                    .then(res => {
                        _self.QueryArr = res.data.planInstructs;
                        _self.qPush = res.data.planInstructs;
                        _self.formInline.one = res.data.taskSource;
                        _self.formInline.two = res.data.finishFlag;
                        _self.formInline.three = res.data.principal;
                        _self.formInline.four = res.data.workContent;
                        _self.formInline.five = res.data.planFinishTime;
                        _self.seeDisabled = false;
                        _self.seeShow = true;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        // 删除
        Del() {
            if (this.multipleArr.length == 0)
                this.$message.warning("请先至少选择一项");
            this.multipleArr.forEach(element => {
                this.QueryArr.forEach((e, i) => {
                    if (element.planInstructId == e.planInstructId) {
                        this.QueryArr.splice(i, 1);
                        this.qPush = this.QueryArr;
                    }
                });
            });
        },
        // 增加
        Add() {
            this.dialogFormVisible = true;
            this.getOptionOneInfo();
            this.IRTItemQuery();
        },
        // 弹框 - 查询
        IRTItemQuery() {
            let that = this;
            that.axios
                .post(AutomaticScheduling.GET_Q_findAllPlan, {
                    sortieNo: that.TimesNo,
                    strTime: that.times,
                    stationName: that.position
                })
                .then(res => {
                    that.tableData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        dialogSave() {
            this.multipleSelection.map(item => {
                // 新数组
                this.qPush.push(item);
                // 去重
                let obj = {};
                let peon = this.qPush.reduce((cur, next) => {
                    obj[next.planInstructId]
                        ? ""
                        : (obj[next.planInstructId] = true && cur.push(next));
                    return cur;
                }, []); //设置cur默认类型为数组，并且初始值为空的数组
                // 赋值
                this.QueryArr = peon;
            });
            // 赋值
            this.dialogFormVisible = false;
        },
        // 确定
        AndWorkerBoxSave(formInline) {
            let that = this;
            this.$refs[formInline].validate(valid => {
                if (valid) {
                    if (that.QueryArr.length != 0) {
                        if (that.monthPlanName == "增加") {
                            // 新增
                            that.axios
                                .post(AutomaticScheduling.GET_Q_addMonthPlan, {
                                    planInstructs: that.QueryArr,
                                    taskSource: that.formInline.one,
                                    workContent: that.formInline.four,
                                    principal: that.formInline.three
                                })
                                .then(res => {
                                    if (res.data.success == true) {
                                        that.$message({
                                            showClose: true,
                                            message: res.data.message,
                                            type: "success"
                                        });
                                        this.$refs[formInline].resetFields();
                                        this.$router.go(-1);
                                    } else {
                                        that.$message({
                                            showClose: true,
                                            message: res.data.message,
                                            type: "error"
                                        });
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                        } else if (that.monthPlanName == "修改") {
                            // 修改
                            that.axios
                                .post(
                                    AutomaticScheduling.GET_Q_updateMonthPlan,
                                    {
                                        monthPlanId: that.monthPlanId,
                                        planInstructs: that.QueryArr,
                                        taskSource: that.formInline.one,
                                        workContent: that.formInline.four,
                                        principal: that.formInline.three
                                    }
                                )
                                .then(res => {
                                    if (res.data.success == true) {
                                        that.$message({
                                            showClose: true,
                                            message: res.data.message,
                                            type: "success"
                                        });
                                        this.$refs[formInline].resetFields();
                                        this.$router.go(-1);
                                    } else {
                                        that.$message({
                                            showClose: true,
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
                        this.$message.warning("请先增加数据");
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 返回
        rutren() {
            this.$router.go(-1);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        ChangeArr(val) {
            this.multipleArr = val;
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

<style>
* {
    margin: 0px;
    padding: 0px;
}
.IROView {
    margin: 10px;
}
.IROcontnet {
    width: 100%;
}

.IROcontnet_table {
    height: 100%;
}
.fromConet {
    margin: 20px 0px;
}
.IRT_head {
    height: 60px;
    overflow: hidden;
}
.IRT_head_left {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.IRT_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.IRT_head_left div {
    width: 170px;
    float: left;
}
.IRT_head_bnt {
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
}
.IRT_contnet {
    width: 100%;
}
.IRT_title {
    height: 30px;
    overflow: hidden;
}
.IRT_title .IRTBox_title {
    float: left;
    text-indent: 10px;
    font-size: 12px;
    line-height: 30px;
}
.IRT_title .IRTBox_info {
    float: right;
    font-size: 12px;
    margin-right: 10px;
}
.IRT_contnet_table {
    padding: 0px 10px;
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
</style>
