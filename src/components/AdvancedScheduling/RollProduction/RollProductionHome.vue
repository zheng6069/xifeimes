<template>
    <div>
        <div class="titleBtn">
            <el-row>
                <el-button type="primary">工量具信息</el-button>
                <el-button type="primary">设备信息</el-button>
                <el-button type="primary">工装信息</el-button>
                <el-button type="primary">工艺配置信息</el-button>
                <el-button type="primary">物料库存信息</el-button>
                <el-button type="primary">制造日历</el-button>
            </el-row>
        </div>
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
            <el-button
                size="medium"
                type="primary"
                class="Dispatch_head_bnt"
                @click="
          nowPages = 1;
          ONTestItemQuery();
        "
            >查询</el-button>
        </div>
        <div class="Dispatch_contnet" :style="TableHeight">
            <div class="Dispatch_title">
                <div class="DispatchBox_title">已下发排产结果</div>
                <div class="DispatchBox_info">
                    <el-button
                        size="mini"
                        type="primary"
                        class="operation_bnt"
                        @click="Issues"
                    >排产结果下发</el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        class="operation_bnt"
                        @click="rollMent"
                    >滚动排产</el-button>
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
                    <el-table-column prop="sortieNo" label="任务包"></el-table-column>
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
        <!-- 滚动排产弹框 -->
        <el-dialog title :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="reles">
                <el-form-item label="滚动周期" prop="startTime" :label-width="formLabelWidth">
                    <el-input
                        style="width:150px"
                        v-model="form.startTime"
                        size="medium"
                        clearable
                        placeholder="请输入"
                    ></el-input>
                    <!-- <el-date-picker
                        v-model="form.startTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间"
                    ></el-date-picker>-->
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
.titleBtn {
    margin: 10px 0px 20px 10px;
}
.Dispatch_head {
    height: 60px;
    overflow: hidden;
}

.Dispatch_head_left {
    width: 260px;
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
    width: 190px;
    float: left;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 190px;
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
                startTime: ""
            },
            formLabelWidth: "120px",
            reles: {
                startTime: [
                    {
                        required: true,
                        message: "请输入排产天数",
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
            this.TableHeight.height = window.innerHeight - 190 + "px";
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
                status: 1
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
            this.ONTestItemQuery();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.ONTestItemQuery();
        },
        // 排产结果下发
        Issues() {
            this.$router.push({
                path: "MonthlyOutput"
            });
        },
        // 滚动排产
        rollMent() {
            this.dialogFormVisible = true;
        },
        //滚动排产确认
        adjustmentSave(form) {
            let that = this;
            that.$refs[form].validate(valid => {
                if (valid) {
                    let url = AutomaticScheduling.GET_V_RollingProductionSchedulingConfirmation;
                    that.axios
                        .get(url, {
                            params: {
                                dates: that.form.startTime
                            }
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
