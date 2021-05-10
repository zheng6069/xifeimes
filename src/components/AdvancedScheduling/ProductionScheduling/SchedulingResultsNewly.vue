<template>
    <div>
        <div class="Dispatch_head">
            <div class="Dispatch_head_left">
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
            <div class="Dispatch_head_left">
                <p>架次号</p>
                <el-input v-model="TimesNo" size="medium" clearable placeholder="请输入"></el-input>
            </div>
            <div class="Dispatch_head_left" style="width: 300px">
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
                class="Dispatch_head_bnt"
                @click="nowPages =1;
          ONTestItemQuery();
        "
            >查询</el-button>
        </div>
        <div class="Dispatch_contnet" :style="TableHeight">
            <div class="Dispatch_title">
                <div class="DispatchBox_title">排产信息</div>
                <div class="DispatchBox_info">
                    <el-button size="mini" type="primary" class="operation_bnt" @click="Issues">下发</el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        class="operation_bnt"
                        @click="adjustment"
                    >调整</el-button>
                </div>
            </div>
            <div class="Dispatch_contnet_table">
                <el-table
                    border
                    :data="tableData"
                    @selection-change="handleSelectionChange"
                    ref="multipleTable"
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
        <div class="DetectPaging">
            <el-pagination
                background
                :page-size="pageSize"
                :current-page="nowPages"
                @size-change="sizeChange"
                @current-change="currentChange"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
        <!-- 调整弹框 -->
        <el-dialog title="调整信息" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="reles">
                <el-form-item label="计划开始时间" prop="startTime" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="form.startTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="计划完成时间" prop="endTime" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="form.endTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间"
                    ></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="adjustmentSave('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}

.Dispatch_head {
    height: 60px;
    overflow: hidden;
}

.Dispatch_head_left {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}

.Dispatch_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}

.Dispatch_head_left div {
    width: 170px;
    float: left;
}

.Dispatch_head_bnt {
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
}

.Dispatch_contnet {
    width: 100%;
}

.Dispatch_title {
    height: 30px;
    overflow: hidden;
}

.Dispatch_title .DispatchBox_title {
    float: left;
    text-indent: 10px;
    font-size: 12px;
    line-height: 30px;
}

.Dispatch_title .DispatchBox_info {
    float: right;
    font-size: 12px;
    margin-right: 10px;
}

.Dispatch_contnet_table {
    padding: 0px 10px;
    height: -moz-calc(100% - 30px);
    /* WebKit */
    height: -webkit-calc(100% - 30px);
    /* Opera */
    height: -o-calc(100% - 30px);
    /* Standard */
    height: calc(100% - 30px);
}

.DetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
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
            position: "", // 站位
            TimesNo: "", // 架次号
            times: null, // 时间
            TableHeight: {
                height: ""
            },
            multipleSelection: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            optionOne: [],
            dialogFormVisible: false,
            form: {
                startTime: null,
                endTime: null
            },
            formLabelWidth: "120px",
            reles: {
                startTime: [
                    {
                        required: true,
                        message: "请输入计划开始时间",
                        trigger: "change"
                    }
                ],
                endTime: [
                    {
                        required: true,
                        message: "请输入计划完成时间",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    created() {
        this.ONTestItemQuery();
        this.getOptionOneInfo();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 115 + "px";
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
        //列表展示
        ONTestItemQuery() {
            let that = this;
            let url = AutomaticScheduling.GET_V_findAllTask;
            let data = {
                pageNum: that.nowPages, //当前页
                pageSize: that.pageSize, //第几页
                sortieNo: that.TimesNo,
                stationName: that.position,
                strTime: that.times,
                status: 0
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.tableData = res.data.records;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.nowPages = 1;
            this.ONTestItemQuery();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.ONTestItemQuery();
        },
        // 下发
        Issues() {
            this.$router.push({
                path: "IssueResultsHome"
            });
        },
        // 调整
        adjustment() {
            if (
                this.multipleSelection < 1 ||
                this.multipleSelection == undefined
            ) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning"
                });
            } else {
                this.dialogFormVisible = true;
                this.form.startTime = this.multipleSelection.planStartTime;
                this.form.endTime = this.multipleSelection.planEndTime;
            }
        },
        adjustmentSave(form) {
            let that = this;
            that.$refs[form].validate(valid => {
                if (valid) {
                    that.axios
                        .post(AutomaticScheduling.GET_V_monthReplant, {
                            planInstructId:
                                that.multipleSelection.planInstructId,
                            planStartTime: that.form.startTime,
                            planEndTime: that.form.endTime
                        })
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    showClose: true,
                                    message: res.data.message,
                                    type: "success"
                                });
                                that.ManHourInfoAdd = false;
                                that.$refs[form].resetFields();
                                that.ONTestItemQuery();
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
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd HH:mm")
                : "";
        },
        // 获取点击时的数据
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            } else {
                this.multipleSelection = val.pop(); //储存新的单选数据
            }
        }
    }
};
</script>
