<template>
    <div class="container">
        <div class="MakeCalendar_contnet" :style="TableHeight">
            <div class="MakeCalendar_title">
                <div class="MakeCalendarBox_info">
                    <el-button
                        size="medium"
                        type="primary"
                        class="operation_bnt"
                        @click="OnNewlyAdded"
                    >新增</el-button>
                    <!-- <el-button
            size="medium"
            type="primary"
            class="operation_bnt"
            @click="OnModify"
            >修改</el-button
          >
          <el-button
            size="medium"
            type="primary"
            class="operation_bnt"
            @click="OnDelete"
            >删除</el-button
                    >-->
                    <el-button
                        size="medium"
                        type="primary"
                        class="operation_bnt"
                        @click="OnRouter"
                        v-show="isShow"
                    >返回</el-button>
                </div>

                <div class="MakeCalendar_rest">
                    <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item style="margin-bottom: 0px">
                            <el-radio-group v-model="resource" @change="OnWorkOvertime">
                                <el-radio :label="1">周六休息</el-radio>
                                <el-radio :label="2">周天休息</el-radio>
                                <el-radio :label="3">双休</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="MakeCalendar_contnet_table">
                <el-table
                    ref="multipleTable"
                    @selection-change="Tick"
                    border
                    :data="QueryArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="holidayName" label="假期名称"></el-table-column>
                    <el-table-column prop="startTime" label="开始时间"></el-table-column>
                    <el-table-column prop="endTime" label="结束时间"></el-table-column>
                    <el-table-column prop="days" label="假期天数"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click.native="OnModify(scope.row)"
                            >修改</el-button>
                            <el-button
                                type="primary"
                                size="mini"
                                @click.native="OnDelete(scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 新增弹框 -->
        <el-dialog title :visible.sync="FormVisibleAdd" width="50%" height="60%">
            <div class="MakeCalendaricFrame_top">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label="假期名称" prop="one" class="MakeCalendaring">
                        <el-input v-model="ruleForm.one" size="medium" placeholder="请输入" clearable></el-input>
                    </el-form-item>

                    <el-form-item label="开始时间" prop="two" class="MakeCalendaring">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width: 100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.two"
                        ></el-date-picker>
                    </el-form-item>

                    <el-form-item label="结束时间" prop="three" class="MakeCalendaring">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width: 100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.three"
                        ></el-date-picker>
                    </el-form-item>

                    <el-form-item label="假期天数" prop="four" class="MakeCalendaring">
                        <el-input
                            v-model.number="ruleForm.four"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="FormVisibleAdd = false">取 消</el-button>
                <el-button @click="OnAddAndSave('ruleForm')" type="primary">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改弹框 -->
        <el-dialog title :visible.sync="FormVisibleUpdata" width="50%" height="60%">
            <div class="MakeCalendaricFrame_top">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label="假期名称" prop="one" class="MakeCalendaring">
                        <el-input v-model="ruleForm.one" size="medium" placeholder="请输入" clearable></el-input>
                    </el-form-item>

                    <el-form-item label="开始时间" prop="two" class="MakeCalendaring">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width: 100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.two"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间" prop="three" class="MakeCalendaring">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width: 100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.three"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="假期天数" prop="four" class="MakeCalendaring">
                        <el-input
                            v-model.number="ruleForm.four"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="FormVisibleUpdata = false">取 消</el-button>
                <el-button @click="OnModifyAndSave('ruleForm')" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { BasicData } from "../../../common/api";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            QueryArr: [],
            multipleSelection: [],
            ruleForm: {
                //新增
                one: "", //假日名称
                two: "", //开始时间
                three: "", //结束时间
                four: "" //假期天数
            },
            rules: {
                //验证
                one: [
                    //假期名称
                    {
                        required: true,
                        message: "请输入假期名称",
                        trigger: "blur"
                    }
                ],
                two: [
                    //开始时间
                    {
                        required: true,
                        message: "请输入开始时间",
                        trigger: "blur"
                    }
                ],
                three: [
                    //结束时间
                    {
                        required: true,
                        message: "请输入结束时间",
                        trigger: "blur"
                    }
                ],
                four: [
                    { required: true, message: "请输入假期天数" },
                    { type: "number", message: "假期天数为数字" }
                ]
            },
            resource: 1, // 周末加班方式

            FormVisibleAdd: false, // 新增弹框
            FormVisibleUpdata: false, // 修改弹框

            TickArr: [],
            TickID: "",
            isShow: this.$route.query.isShow
        };
    },
    created() {
        this.OnQuery();
        this.OnRosterWork();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 80 + "px";
        },

        // 列表展示
        OnQuery() {
            this.axios
                .get(BasicData.GET_J_Query, {
                    params: {}
                })
                .then(res => {
                    this.QueryArr = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 新增newly added
        OnNewlyAdded() {
            this.FormVisibleAdd = true;
            this.ruleForm.one = "";
            this.ruleForm.two = "";
            this.ruleForm.three = "";
            this.ruleForm.four = "";
        },
        //新增保存
        OnAddAndSave(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios({
                        method: "post",
                        url: BasicData.GET_J_AddAndSave,
                        data: {
                            holidayName: this.ruleForm.one, //假日名称
                            startTime: this.ruleForm.two, //开始时间
                            endTime: this.ruleForm.three, //结束时间
                            days: this.ruleForm.four //假期天数
                        }
                    })
                        .then(res => {
                            if (res.data.success === true) {
                                this.$message({
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                this.FormVisibleAdd = false;
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
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        //加班方式
        OnWorkOvertime(row) {
            this.axios({
                method: "post",
                url: BasicData.GET_J_WorkOvertime,
                data: {
                    workMode: row
                }
            })
                .then(res => {
                    console.log(res);
                    this.OnRosterWork();
                })
                .catch(error => {
                    console.log(error);
                });
        },

        // 加班回显
        OnRosterWork() {
            this.axios
                .get(BasicData.GET_J_RosterWork, {})
                .then(res => {
                    this.resource = res.data.workMode;
                })
                .catch(error => {
                    console.log(error);
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
                    this.TickID = this.TickArr.holidayId;
                }
            }
        },
        // 修改
        OnModify(row) {
            this.FormVisibleUpdata = true;
            this.ruleForm.one = row.holidayName;
            this.ruleForm.two = row.startTime;
            this.ruleForm.three = row.endTime;
            this.ruleForm.four = row.days;
            this.TickID = row.holidayId;
        },
        //修改保存
        OnModifyAndSave(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios({
                        method: "post",
                        url: BasicData.GET_J_Modify,
                        data: {
                            holidayName: this.ruleForm.one, //假日名称
                            startTime: this.ruleForm.two, //开始时间
                            endTime: this.ruleForm.three, //结束时间
                            days: this.ruleForm.four, //假期天数
                            holidayId: this.TickID
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
                                this.FormVisibleUpdata = false;
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
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 删除
        OnDelete() {
            this.axios
                .get(BasicData.GET_J_Delete, {
                    params: {
                        holidayId: this.TickID
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
        },
        //返回
        OnRouter() {
            this.$router.go(-1);
        }
    }
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.MakeCalendar_rest {
    margin-right: 10px;
    float: right;
    margin-top: 10px;
}
.MakeCalendar_contnet {
    width: 100%;
}
.MakeCalendar_title {
    height: 55px;
    overflow: hidden;
}
.MakeCalendarBox_info {
    float: left;
    font-size: 12px;
    margin-right: 10px;
    height: 55px;
    margin-top: 10px;
}
.operation_bnt {
    margin-left: 10px;
}
.MakeCalendar_contnet_table {
    padding: 0px 10px;
    height: 100%;
}
.MakeCalendaricFrame_top {
    overflow: hidden;
}
.MakeCalendaring {
    width: 290px;
    height: 40px;
    float: left;
    margin-left: 10px;
}
.MakeCalendaring div {
    width: 180px;
    float: left;
}
</style>
