<template>
    <div class="container">
        <div class="Classes_contnet" :style="TableHeight">
            <div class="Classes_title">
                <div class="ClassesBox_info">
                    <el-button
                        size="medium"
                        type="primary"
                        class="operation_bnt"
                        @click="OnNewlyAdded"
                    >新增</el-button>
                    <el-button
                        size="medium"
                        type="primary"
                        class="operation_bnt"
                        @click="OnDelete"
                    >删除</el-button>
                    <el-button
                        size="medium"
                        type="primary"
                        class="operation_bnt"
                        @click="employClass"
                    >使用当前班次</el-button>
                </div>
            </div>
            <div class="Classes_contnet_table">
                <el-table
                    ref="multipleTable"
                    @selection-change="Tick"
                    border
                    :data="QueryArr"
                    :row-class-name="ClassName"
                    height="100%"
                    style="width: 100%;height:100%; "
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="rosterNum" label="班次号"></el-table-column>
                    <el-table-column prop="startTime" label="上午开始时间"></el-table-column>
                    <el-table-column prop="endTime" label="上午结束时间"></el-table-column>
                    <el-table-column prop="startDate" label="下午开始时间"></el-table-column>
                    <el-table-column prop="endDate" label="下午结束时间"></el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog :visible.sync="FormVisibleAdd" width="64%" height="60%">
            <div class="ClassesicFrame_top">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label="班次号" prop="one" class="Classesing">
                        <el-input v-model="ruleForm.one" size="medium" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="上午开始时间" prop="two" class="Classesing">
                        <el-time-select
                            v-model="ruleForm.two"
                            style="width:100%"
                            size="medium"
                            :picker-options="{
                start: '08:00',
                step: '00:30',
                end: '21:30',
              }"
                            placeholder="选择时间"
                        ></el-time-select>
                    </el-form-item>
                    <el-form-item label="上午结束时间" prop="three" class="Classesing">
                        <el-time-select
                            v-model="ruleForm.three"
                            style="width:100%"
                            size="medium"
                            :picker-options="{
                start: '08:00',
                step: '00:30',
                end: '21:30',
              }"
                            placeholder="选择时间"
                        ></el-time-select>
                    </el-form-item>

                    <el-form-item label="下午开始时间" prop="four" class="Classesing">
                        <el-time-select
                            v-model="ruleForm.four"
                            style="width:100%"
                            size="medium"
                            :picker-options="{
                start: '08:00',
                step: '00:30',
                end: '21:30',
              }"
                            placeholder="选择时间"
                        ></el-time-select>
                    </el-form-item>

                    <el-form-item label="下午结束时间" prop="five" class="Classesing">
                        <el-time-select
                            v-model="ruleForm.five"
                            style="width:100%"
                            size="medium"
                            :picker-options="{
                start: '08:00',
                step: '00:30',
                end: '21:30',
              }"
                            placeholder="选择时间"
                        ></el-time-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="FormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="OnAddAndSave('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style>
* {
    margin: 0px;
    padding: 0px;
}
.Classes_contnet {
    margin-top: 10px;
    width: 100%;
}
.Classes_title {
    height: 50px;
    overflow: hidden;
}

.ClassesBox_info {
    float: left;
    font-size: 12px;
    margin-left: 10px;
}
.Classes_contnet_table {
    padding: 0px 10px;
    height: 100%;
}
.ClassesicFrame_top {
    overflow: hidden;
}
.Classesing {
    width: 290px;
    height: 40px;
    float: left;
    margin-left: 10px;
}

.Classesing div {
    width: 180px;
    float: right;
}
.el-table .green-row {
    background: rgba(50, 248, 0, 0.2);
}
</style>

<script>
import { BasicData } from "../../../common/api";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            ruleForm: {
                one: "", //班次
                two: "", //上午开始时间
                three: "", //上午结束时间
                four: "", //下午开始时间
                five: "" //下午结束时间
            },
            rules: {
                //验证
                one: [
                    //班次
                    { required: true, message: "请输入班次", trigger: "blur" }
                ],
                two: [
                    //上午开始时间
                    {
                        required: true,
                        message: "请输入上午开始时间",
                        trigger: "blur"
                    }
                ],
                three: [
                    //上午结束时间
                    {
                        required: true,
                        message: "请输入上午结束时间",
                        trigger: "blur"
                    }
                ],
                four: [
                    //下午开始时间
                    {
                        required: true,
                        message: "请输入下午开始时间",
                        trigger: "blur"
                    }
                ],
                five: [
                    //下午结束时间
                    {
                        required: true,
                        message: "请输入下午结束时间",
                        trigger: "blur"
                    }
                ]
            },
            QueryArr: [],
            multipleSelection: [],
            FormVisibleAdd: false,
            TickArr: [],
            TickID: ""
        };
    },
    created() {
        this.OnQuery();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 70 + "px";
        },

        // 列表展示
        OnQuery() {
            this.axios
                .get(BasicData.GET_H_Query)
                .then(res => {
                    this.QueryArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 状态区分
        ClassName({ row }) {
            if (row.rosterStatus === 1) {
                return "green-row"; // 正在 使用当前班次
            }
            return "";
        },
        // 新增
        OnNewlyAdded() {
            this.FormVisibleAdd = true;
            this.ruleForm.one = "";
            this.ruleForm.two = "";
            this.ruleForm.three = "";
            this.ruleForm.four = "";
            this.ruleForm.five = "";
        },
        //新增保存
        OnAddAndSave(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios({
                        method: "post",
                        url: BasicData.GET_H_AddAndSave,
                        data: {
                            rosterNum: this.ruleForm.one, //班次
                            startTime: this.ruleForm.two, //上午开始时间
                            endTime: this.ruleForm.three, //上午结束时间
                            startDate: this.ruleForm.four, //下午开始时间
                            endDate: this.ruleForm.five //下午结束时间
                        }
                    })
                        .then(res => {
                            if (res.data.success === true) {
                                this.$message({
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                this.OnQuery();
                                this.FormVisibleAdd = false;
                            } else {
                                this.$message({
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
                    return false;
                }
            });
        },
        //table单选功能
        Tick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.TickArr = row.pop(); //储存新的单选数据
                if (this.TickArr != undefined) {
                    this.TickID = this.TickArr.rosterId;
                }
            }
        },

        // 删除
        OnDelete() {
            if (this.TickID != "") {
                this.axios
                    .get(BasicData.GET_H_Delete, {
                        params: {
                            rosterId: this.TickID
                        }
                    })
                    .then(res => {
                        if (res.data.success === true) {
                            this.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            this.OnQuery();
                        } else {
                            this.$message({
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
                this.$message({
                    //失败后的提示
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        // 使用当前班次
        employClass() {
            if (this.TickArr.length < 1) {
                this.$message({
                    //失败后的提示
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.axios
                    .get(BasicData.GET_H_updateRosterWork, {
                        params: {
                            rosterId: this.TickArr.rosterId
                        }
                    })
                    .then(res => {
                        if (res.data.success === true) {
                            this.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            this.OnQuery();
                        } else {
                            this.$message({
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
    }
};
</script>
