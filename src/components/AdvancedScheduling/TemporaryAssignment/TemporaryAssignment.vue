<template>
    <div>
        <div class="Temp_head">
            <div class="Temp_head_left">
                <p>派工人</p>
                <div>
                    <el-input v-model="SendWorkers" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="Temp_head_left" style="width: 300px">
                <p style="width: 40px">时间</p>
                <div style="width: 260px">
                    <el-date-picker
                        style="width: 260px"
                        v-model="time"
                        size="medium"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </div>
            </div>
            <div class="Temp_head_left" style="width: 210px">
                <p style="width: 40px">状态</p>
                <div>
                    <el-select v-model="state" size="medium" placeholder="请选择" clearable>
                        <el-option label="进行中" value="0"></el-option>
                        <el-option label="已完成" value="1"></el-option>
                    </el-select>
                </div>
            </div>

            <el-button
                size="medium"
                type="primary"
                class="Temp_head_bnt"
                @click="nowPages = 1;OnQuery()"
            >查询</el-button>
        </div>
        <el-button size="medium" type="primary" @click="OnNewlyAdded" style="margin-left:10px">新增</el-button>
        <div class="Temp_contnet" :style="TableHeight">
            <div class="Temp_contnet_table">
                <el-table
                    @selection-change="Tick"
                    border
                    :data="tableData"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column label="序号" type="index" width="55"></el-table-column>
                    <el-table-column prop="temporaryName" label="任务名称" width="180"></el-table-column>
                    <el-table-column prop="hours" label="工时" width="80"></el-table-column>
                    <el-table-column prop="sendworker" label="派工人" width="120"></el-table-column>
                    <el-table-column prop="sendtime" label="派工时间" width="150"></el-table-column>
                    <el-table-column prop="reportworker" label="报工人" width="180"></el-table-column>
                    <el-table-column prop="sendtime" label="报工时间" width="100"></el-table-column>
                    <el-table-column prop="taskcontent" label="备注"></el-table-column>
                    <el-table-column label="工作内容" width="100">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="OnSee(scope.$index, scope.row)"
                            >查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="handleSizeChange"
                :page-size="pageSize"
                :current-page="nowPages"
                @current-change="OnPaging"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
        <!-- 新增 -->
        <el-dialog :visible.sync="ElasticFrame" width="600px">
            <div class="Temp_ElasticFrame_top">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label="任务名称" prop="TaskName" class="Temp_Testing">
                        <el-input
                            v-model="ruleForm.TaskName"
                            :disabled="disstrue"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="工时" prop="WorkingHours" class="Temp_Testing">
                        <el-input
                            v-model="ruleForm.WorkingHours"
                            :disabled="disstrue"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="站位/科室" prop="StationDepartment" class="Temp_Testing">
                        <el-select
                            :disabled="disstrue"
                            size="medium"
                            v-model="ruleForm.StationDepartment"
                            placeholder="请选择"
                            @change="AddCouponSelected"
                            clearable
                        >
                            <el-option
                                v-for="item in optionsFour"
                                :key="item.warehouseId"
                                :label="item.warehouseName"
                                :value="item.warehouseName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="人员" prop="Personnel" class="Temp_Testing">
                        <el-select
                            :disabled="disstrue"
                            size="medium"
                            v-model="ruleForm.Personnel"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionsFive"
                                :key="item.id"
                                :label="item.nickname"
                                :value="item.nickname"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="任务内容" prop="TaskContent" class="Temp_TaskContent">
                        <el-input
                            :disabled="disstrue"
                            :rows="3"
                            style="width: 100%"
                            size="medium"
                            type="textarea"
                            v-model="ruleForm.TaskContent"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="Temp_footer">
                <el-button class="Temp_Close" @click="OnCancel">取 消</el-button>
                <el-button
                    v-show="isShow"
                    class="Temp_Preservation"
                    @click="OnAddAndSave('ruleForm')"
                    type="primary"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { AutomaticScheduling, BasicData } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            SendWorkers: "", //派工人
            time: null, //时间
            state: "0", //状态
            tableData: [], //检测项table数据
            ElasticFrame: false, //是否隐藏新增弹框
            ruleForm: {
                TaskName: "", //任务名称
                WorkingHours: "", //工时
                StationDepartment: "", //站位/科室
                Personnel: "", //人员
                TaskContent: "" //任务内容
            },
            rules: {
                //验证
                TaskName: [
                    //任务名称
                    {
                        required: true,
                        message: "请输入任务名称",
                        trigger: "blur"
                    }
                ],
                WorkingHours: [
                    //工时
                    { required: true, message: "请输入工时", trigger: "blur" },
                    {
                        pattern: /^\d+$|^\d+[.]?\d+$/,
                        message: "只允许输入数字",
                        trigger: "blur"
                    }
                ],
                StationDepartment: [
                    //站位/科室
                    {
                        required: true,
                        message: "请输选站位/科室",
                        trigger: "change"
                    }
                ],
                Personnel: [
                    //人员
                    { required: true, message: "请输入人员", trigger: "change" }
                ],
                TaskContent: [
                    //任务内容
                    {
                        required: true,
                        message: "请输入任务内容",
                        trigger: "blur"
                    }
                ]
            },

            TableHeight: {
                height: ""
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            disstrue: false,
            isShow: true,
            optionsFour: [],
            optionsFive: []
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
            this.TableHeight.height = window.innerHeight - 160 + "px";
        },
        // 查询站位名称
        getoptionsFourInfo() {
            let that = this;
            that.axios
                .post(BasicData.GET_Z_findAllWarehouse)
                .then(res => {
                    that.optionsFour = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询站位下的人员
        AddCouponSelected() {
            let that = this;
            that.axios
                .get(BasicData.GET_W_findByStationAndRole, {
                    params: {
                        stationName: this.ruleForm.StationDepartment,
                        roleName: "工人"
                    }
                })
                .then(res => {
                    console.log(res, "sdfsdfsdfsd");
                    that.optionsFive = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //默认查询生产全部任务
        OnQuery() {
            this.axios({
                method: "post",
                url: AutomaticScheduling.GET_E_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //每页条数
                    list: this.time, //时间
                    state: this.state, //状态
                    sendworker: this.SendWorkers //派工人
                }
            })
                .then(res => {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //分页功能
        OnPaging(val) {
            this.nowPages = val;
            this.OnPaging();
        },
        //选择每页展示多少条
        handleSizeChange(val) {
            this.pageSize = val;
            this.OnPaging();
        },

        //新增
        OnNewlyAdded() {
            this.ElasticFrame = true;
            this.getoptionsFourInfo();
            this.disstrue = false;
            this.isShow = true;
            this.ruleForm.TaskName = ""; //任务名称
            this.ruleForm.WorkingHours = ""; //工时
            this.ruleForm.StationDepartment = ""; //站位/科室
            this.ruleForm.Personnel = ""; //人员
            this.ruleForm.TaskContent = ""; //任务内容
        },
        //取消
        OnCancel() {
            this.ElasticFrame = false;
        },
        //新增保存
        OnAddAndSave(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios({
                        method: "post",
                        url: AutomaticScheduling.GET_E_AddAndSav,
                        data: {
                            temporaryName: this.ruleForm.TaskName, //任务名称
                            hours: this.ruleForm.WorkingHours, //工时
                            station: this.ruleForm.StationDepartment, //站位/科室
                            reportworker: this.ruleForm.Personnel, //人员
                            taskcontent: this.ruleForm.TaskContent //任务内容
                        }
                    })
                        .then(res => {
                            if (res.data.success == true) {
                                this.$message({
                                    //成功后的提示
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                this.ElasticFrame = false; //是否隐藏弹框
                                this.$refs[formName].resetFields();
                                this.OnQuery();
                            } else {
                                this.$message({
                                    //失败后的提示
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
                        message: "请完善信息",
                        type: "warning",
                        duration: 1500
                    });
                    return false;
                }
            });
        },
        //勾选
        Tick(row) {
            this.CheckDataArr = row; //勾选导出数据
            var str = "";
            row.forEach(function(e) {
                str += e.mesTaskId + ",";
            });
            str = str.substring(0, str.length - 1);
            this.DeleteArr = str.split(",");
        },
        OnSee(idnex, row) {
            this.ElasticFrame = true;
            this.disstrue = true;
            this.isShow = false;
            this.ruleForm.TaskName = row.temporaryName; //任务名称
            this.ruleForm.WorkingHours = row.hours; //工时
            this.ruleForm.StationDepartment = row.station; //站位/科室
            this.ruleForm.Personnel = row.reportworker; //人员
            this.ruleForm.TaskContent = row.taskcontent; //任务内容
        }
    }
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Temp_head {
    height: 60px;
    overflow: hidden;
}
.Temp_head_left {
    width: 230px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Temp_head_left p {
    width: 60px;
    float: left;
    line-height: 36px;
}
.Temp_head_left div {
    width: 170px;
    float: left;
}
.Temp_head_bnt {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}

.Temp_ElasticFrame_top {
    overflow: hidden;
}

.Temp_Testing {
    width: 250px;
    height: 40px;
    /* overflow: hidden; */
    float: left;
    margin-left: 10px;
}

.Temp_Testing div {
    width: 160px;
    float: right;
}
.Temp_TaskContent {
    width: 510px;
    height: 80px;
    float: left;
    margin-left: 10px;
}
.Temp_TaskContent div {
    width: 420px;
    float: right;
}

.Temp_footer {
    height: 30px;
    margin-top: 10px;
}
.Temp_Preservation {
    float: right;
    margin-right: 10px;
}
.Temp_Close {
    float: right;
}

.Temp_contnet {
    width: 100%;
}
.Temp_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.DetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
