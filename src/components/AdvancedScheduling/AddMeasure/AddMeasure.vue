<template>
    <div>
        <div class="Temp_head">
            <div class="Temp_head_left">
                <p>名称</p>
                <div>
                    <el-input v-model="measureName" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="Temp_head_left">
                <p>规格</p>
                <div>
                    <el-input v-model="measureSize" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="Temp_head_left">
                <p>架次号</p>
                <div>
                    <el-input v-model="measureVehicles" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="Temp_head_left">
                <p>站位名称</p>
                <div>
                    <el-input v-model="measurePosition" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="Temp_head_left">
                <p>类型</p>
                <el-select v-model="measureType" placeholder="请选择类型" size="medium">
                    <el-option label="工具" value="工具"></el-option>
                    <el-option label="量具" value="量具"></el-option>
                </el-select>
            </div>
            <el-button
                size="medium"
                type="primary"
                class="Temp_head_bnt"
                @click="AddMaterialList"
            >查询</el-button>
        </div>
        <div class="Temp_contnet">
            <div class="Temp_contnet_table">
                <el-table
                    :data="tableData"
                    :row-key="getRowKeys"
                    :expand-row-keys="expands"
                    @expand-change="expandSelect"
                    style="width: 100%"
                    height="100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                    border
                    ref="multipletableData"
                >
                    <el-table-column type="expand" prop="backTools">
                        <template slot-scope="scope">
                            <el-table
                                :data="scope.row.backTools"
                                style="width: 100%"
                                height="100%"
                                :header-row-style="{ height: '39px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '39px' }"
                                :cell-style="{ padding: '0px' }"
                                border
                                ref="backTools"
                                @selection-change="handleSelectionChange"
                            >
                                <el-table-column type="selection" width="60"></el-table-column>
                                <el-table-column label="序号" type="index" width="60"></el-table-column>
                                <el-table-column label="架次号" prop="sortieNo"></el-table-column>
                                <el-table-column label="站位名称" prop="stationName"></el-table-column>
                                <el-table-column label="指令号" prop="instructNum"></el-table-column>
                                <el-table-column label="指令名称" prop="instructName"></el-table-column>
                                <el-table-column
                                    label="开始时间"
                                    prop="startTime"
                                    :formatter="dateFormat"
                                ></el-table-column>
                                <el-table-column
                                    label="结束时间"
                                    prop="endTime"
                                    :formatter="dateFormat"
                                ></el-table-column>
                                <el-table-column label="备注" prop="remarks"></el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column label="名称" prop="materialName"></el-table-column>
                    <el-table-column label="规格" prop="specs"></el-table-column>
                    <el-table-column label="备注" prop="remarks"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="sizeChange"
                @current-change="currentChange"
                :page-size="pageSize"
                :page-sizes="[10, 50, 100, 200]"
                :current-page="nowPages"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
        <div class="And_DescriptionProcessing">
            <div class="And_FaultDescription" style="margin-left: 10px">
                <p>备注</p>
                <div class="content">
                    <el-input
                        class="And_FaultDescription_textarea"
                        type="textarea"
                        v-model="remark"
                    ></el-input>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
        <div style="margin-top: 20px; margin-left: 10px">
            <el-button type="primary" @click="measureBoxSave">工量具信息</el-button>
            <el-button type="primary" @click="AndWorkerBoxSave">添 加</el-button>
        </div>
        <el-divider></el-divider>
        <div class="Temp_contnet">
            <div class="Temp_contnet_table">
                <el-table
                    :data="tableDataInfo"
                    :row-key="RowKey"
                    :expand-row-keys="expandKey"
                    @expand-change="expandSelectKey"
                    style="width: 100%"
                    height="100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                    border
                >
                    <el-table-column type="expand" prop="backTools">
                        <template slot-scope="scope">
                            <el-table
                                :data="scope.row.backTools"
                                style="width: 100%"
                                height="100%"
                                :header-row-style="{ height: '39px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '39px' }"
                                :cell-style="{ padding: '0px' }"
                                border
                                ref="backTools"
                                @selection-change="SelectionChange"
                            >
                                <el-table-column type="selection" width="60"></el-table-column>
                                <el-table-column label="序号" type="index" width="60"></el-table-column>
                                <el-table-column label="架次号" prop="sortieNo"></el-table-column>
                                <el-table-column label="站位名称" prop="stationName"></el-table-column>
                                <el-table-column label="指令号" prop="instructNum"></el-table-column>
                                <el-table-column label="指令名称" prop="instructName"></el-table-column>
                                <el-table-column
                                    label="开始时间"
                                    prop="startTime"
                                    :formatter="dateFormat"
                                ></el-table-column>
                                <el-table-column
                                    label="结束时间"
                                    prop="endTime"
                                    :formatter="dateFormat"
                                ></el-table-column>
                                <el-table-column
                                    label="备注"
                                    prop="remarks"
                                    :show-overflow-tooltip="true"
                                >
                                    <template slot-scope="{ row }">
                                        <span>{{ row.remarks }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="150">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            type="primary"
                                            @click="Delete(scope.row)"
                                        >删除</el-button>
                                        <el-button
                                            size="mini"
                                            type="primary"
                                            @click="Edit(scope.row)"
                                        >修改</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column label="名称" prop="materialName"></el-table-column>
                    <el-table-column label="规格" prop="specs"></el-table-column>
                    <el-table-column label="备注" prop="remarks" :show-overflow-tooltip="true">
                        <template slot-scope="{ row }">
                            <span>{{ row.remarks }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="And_DescriptionProcessing">
            <div class="Temp_head_left">
                <p>结果反馈</p>
                <div>
                    <el-select v-model="result" placeholder="请选择结果反馈" clearable size="medium">
                        <el-option label="准备就绪" value="准备就绪"></el-option>
                        <el-option label="其它" value="其它"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="Temp_head_left" style="margin-left: 20px">
                <p>时间</p>
                <div>
                    <el-date-picker
                        v-model="listTime"
                        size="medium"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    ></el-date-picker>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
        <div style="margin: 10px">
            <el-button type="primary" @click="AndSaveComfrim">确定</el-button>
        </div>
        <!-- 工量具信息-弹框 -->
        <el-dialog title :visible.sync="PositionCommandVisible" width="70%">
            <div class="Temp_head">
                <div class="Temp_head_left">
                    <p>名称</p>
                    <div>
                        <el-input v-model="one" size="medium" placeholder="请输入" clearable></el-input>
                    </div>
                </div>
                <div class="Temp_head_left">
                    <p>图号</p>
                    <div>
                        <el-input v-model="two" size="medium" placeholder="请输入" clearable></el-input>
                    </div>
                </div>
                <div class="Temp_head_left">
                    <p>类型</p>
                    <div>
                        <el-select v-model="three" placeholder="请选择类型" clearable size="medium">
                            <el-option label="工具" value="工具"></el-option>
                            <el-option label="量具" value="量具"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="Temp_head_left" style="width: 150px">
                    <p style="width: 120px">需要定检工量具</p>
                    <div style="width: 10px; margin-top: 5px">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </div>
                </div>

                <el-button
                    size="medium"
                    type="primary"
                    class="Temp_head_bnt"
                    @click="measureBoxSave"
                >查询</el-button>
            </div>
            <el-table
                border
                :data="PositionCommandData"
                height="300"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column property="species" label="类型"></el-table-column>
                <el-table-column property="toolName" label="名称"></el-table-column>
                <el-table-column property="toolProduct" label="图号"></el-table-column>
                <el-table-column property="qualified" label="合格证号"></el-table-column>
                <el-table-column property="positions" label="位置"></el-table-column>
                <el-table-column property="expirationDate" label="有效期至" :formatter="dateFormat"></el-table-column>
                <el-table-column property="operator" label="负责人/借用人"></el-table-column>
                <el-table-column property="qty" label="在库数量" :formatter="dateFormat"></el-table-column>
                <el-table-column label="备注" prop="remarker" :show-overflow-tooltip="true">
                    <template slot-scope="{ row }">
                        <span>{{ row.remarker }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog :visible.sync="AddMeasureRemark" width="400">
            <div class="AddnElasticFrame_top">
                <p>备注</p>
                <div class="AddnElasticFrame_top_textarea">
                    <el-input style="width: 100%" rows="5" type="textarea" v-model="MeasureRemark"></el-input>
                </div>
            </div>
            <div class="dialog_footer">
                <el-button class="dialog_Close" @click="AddMeasureRemark = false">取 消</el-button>
                <el-button class="dialog_Preservation" @click="OnRemarkConfirm" type="primary">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { AutomaticScheduling } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    name: "Start",
    data() {
        return {
            measureName: "", // 名称
            measureSize: "", // 规格
            measureVehicles: "", // 架次号
            measurePosition: "", // 站位名称
            measureType: "工具", // 类型
            TableHeight: {
                height: ""
            },
            tableData: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            remark: "", //备注
            tableDataInfo: [],
            result: "", //结果反馈
            listTime: "", //时间
            PositionCommandVisible: false, // 工量具弹框
            PositionCommandData: [],
            one: "", // 工量具弹框 - 名称
            two: "", // 工量具弹框 - 图号
            three: "", // 工量具弹框 - 类型
            checked: false, // 需要定检工量具 toolId
            expands: [],
            getRowKeys(row) {
                return row.toolId;
            },
            expandKey: [],
            RowKey(row) {
                return row.orderId;
            },
            backToolData: [],
            backToolDataSlect: [],
            AddMeasureRemark: false,
            MeasureRemark: "",
            toolsFeedbackId: ""
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.AddMaterialList();
        this.getDataList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 260 + "px";
        },
        // 折叠面板每次只能展开一行
        expandSelect(row, expandedRows) {
            console.log(row,'row')
            var that = this;
            if (expandedRows.length) {
                that.expands = [];
                if (row) {
                    that.expands.push(row.toolId); // 每次push进去的是每行的ID
                }
            } else {
                that.expands = []; // 默认不展开
            }
        },
        // 折叠面板每次只能展开一行
        expandSelectKey(row, expandedRows) {
            var that = this;
            if (expandedRows.length) {
                that.expandKey = [];
                if (row) {
                    that.expandKey.push(row.orderId); // 每次push进去的是每行的ID
                }
            } else {
                that.expandKey = []; // 默认不展开
            }
        },
        // 工量具使用信息
        measureBoxSave() {
            let that = this;
            that.PositionCommandVisible = true;
            let url = AutomaticScheduling.GET_V_findToolsInfo;
            let data = {
                drawNo: that.two,
                materialName: that.one,
                toolsType: that.three,
                flag: that.checked == true ? 1 : 0
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.PositionCommandData = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询
        AddMaterialList() {
            let that = this;
            let url = AutomaticScheduling.GET_V_findToolsAll;
            let data = {
                page: that.nowPages,
                limit: that.pageSize,
                sortieNo: that.measureVehicles,
                materialName: that.measureName,
                specs: that.measureSize,
                toolsType: that.measureType,
                stationName: that.measurePosition
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.tableData = res.data.list;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.AddMaterialList();
        },
        // 当前页GET_X_insertFeedBack
        currentChange(val) {
            this.nowPages = val;
            this.AddMaterialList();
        },
        handleSelectionChange(val) {
            this.backToolData = val;
        },
        SelectionChange(val) {
            this.backToolDataSlect = val;
        },
        // 添加
        AndWorkerBoxSave() {
            let that = this;
            if (that.backToolData < 1) {
                that.$message({
                    message: "请勾选需要添加的指令",
                    type: "warning",
                    duration: 1500
                });
            } else if (that.remark == "") {
                that.$message({
                    message: "请添加备注",
                    type: "warning",
                    duration: 1500
                });
            } else {
                let arr = that.backToolData;
                arr.forEach(item => {
                    item.remarks = that.remark;
                });
                that.axios
                    .post(AutomaticScheduling.GET_V_updateRemarks, arr)
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            that.remark = "";
                            that.getDataList();
                            that.AddMaterialList();
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
        },
        // 查询
        getDataList() {
            let that = this;
            let url = AutomaticScheduling.GET_V_findResultBackToolsInfo;
            that.axios
                .post(url, {
                    page: that.nowPages,
                    limit: that.pageSize
                })
                .then(res => {
                    that.tableDataInfo = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 确定
        AndSaveComfrim() {
            let that = this;
            if (that.backToolDataSlect < 1) {
                that.$message({
                    message: "请勾选需要保存的指令",
                    type: "warning",
                    duration: 1500
                });
            } else if (that.result == "" || that.listTime == "") {
                that.$message({
                    message: "结果反馈和时间为必填项",
                    type: "warning",
                    duration: 1500
                });
            } else {
                that.axios
                    .post(AutomaticScheduling.GET_V_updateResultsFeedback, {
                        timeList: that.listTime, //时间
                        resultsFeedback: that.result, //结果反馈
                        backTools: that.backToolDataSlect //勾选数据
                    })
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            that.result = "";
                            that.listTime = "";
                            // that.AddMaterialList();
                            that.getDataList();
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
        },
        // 删除
        Delete(row) {
            let that = this;
            let url = AutomaticScheduling.GET_V_deleteInfo;
            that.axios
                .get(url, {
                    params: {
                        toolId: row.toolsFeedbackId
                    }
                })
                .then(res => {
                    if (res.data.success === true) {
                        that.$message({
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        that.getDataList();
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
        },
        // 修改
        Edit(low) {
            this.AddMeasureRemark = true;
            this.MeasureRemark = low.remarks;
            this.toolsFeedbackId = low.toolsFeedbackId;
        },
        OnRemarkConfirm() {
            let that = this;
            let url = AutomaticScheduling.GET_V_updateRemakrs;
            if (that.MeasureRemark == "") {
                that.$message({
                    message: "请添加备注",
                    type: "warning",
                    duration: 1500
                });
            } else {
                that.axios
                    .get(url, {
                        params: {
                            toolId: that.toolsFeedbackId,
                            remarks: that.MeasureRemark
                        }
                    })
                    .then(res => {
                        if (res.data.success === true) {
                            that.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            that.ModifyRemark = "";
                            that.AddMeasureRemark = false;
                            that.getDataList();
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
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: calc(100% - 20px);
    margin: 24px 10px;
}
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
.Temp_head {
    height: 60px;
    overflow: hidden;
}
.Temp_head_left {
    width: 250px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Temp_head_left p {
    width: 80px;
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
    overflow: hidden;
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
    overflow: hidden;
    float: left;
    margin-left: 10px;
}
.Temp_TaskContent div {
    width: 420px;
    float: right;
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
    width: 60px;
    height: 100%;
    float: left;
    box-sizing: border-box;
}
.And_FaultDescription .content {
    width: calc(100% - 60px);
    width: -moz-calc(100% - 60px);
    width: -webkit-calc(100% - 60px);
    width: -o-calc(100% - 60px);

    height: 100%;
    float: left;
}
.And_FaultDescription_textarea {
    width: 100%;
}

.Temp_contnet {
    width: 100%;
    height: 400px;
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
.AddnElasticFrame_top {
    height: 150px;
}
.AddnElasticFrame_top p {
    width: 60px;
    float: left;
}
.AddnElasticFrame_top_textarea {
    width: calc(100% - 60px);
    width: -moz-calc(100% - 60px);
    width: -webkit-calc(100% - 60px);
    width: -o-calc(100% - 60px);
    float: left;
}
.dialog_footer {
    height: 30px;
    margin-top: 10px;
}
.dialog_Preservation {
    float: right;
    margin-right: 10px;
}
.dialog_Close {
    float: right;
}
</style>
