<template>
    <div>
        <div class="AddEQ_head">
            <div class="AddEQ_head_left">
                <p>设备名称</p>
                <div>
                    <el-input v-model="EquipmentName" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="AddEQ_head_left">
                <p>设备型号</p>
                <div>
                    <el-input v-model="EquipmentModel" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="AddEQ_head_left">
                <p>站位名称</p>
                <div>
                    <el-input v-model="StationName" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="AddEQ_head_left" style="width: 300px">
                <p style="width: 40px">时间</p>
                <div style="width: 260px">
                    <el-date-picker
                        style="width: 260px"
                        v-model="EquipmentTime"
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
                class="AddEQ_head_bnt"
                @click="
          nowPages = 1;
          OnQuery();
        "
            >查询</el-button>
        </div>
        <div class="AddEQ_contnet">
            <div class="AddEQ_contnet_table">
                <el-table
                    :data="QueryArr"
                    :row-key="getRowKeys"
                    :expand-row-keys="expands"
                    @expand-change="expandSelect"
                    style="width: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                    height="100%"
                    border
                    ref="multipletableData"
                >
                    <el-table-column type="expand" prop="list">
                        <template slot-scope="scope">
                            <el-table
                                :data="scope.row.list"
                                style="width: 100%"
                                height="100%"
                                :header-row-style="{ height: '39px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '39px' }"
                                :cell-style="{ padding: '0px' }"
                                border
                                ref="list"
                                @selection-change="eeeChange"
                            >
                                <el-table-column type="selection" width="50"></el-table-column>
                                <el-table-column label="序号" type="index" width="60"></el-table-column>
                                <el-table-column label="架次号" prop="sortieNo"></el-table-column>
                                <el-table-column label="站位名称" prop="stationName"></el-table-column>
                                <el-table-column label="指令号" prop="instructionNo"></el-table-column>
                                <el-table-column label="指令名称" prop="instructionName"></el-table-column>
                                <el-table-column label="开始时间" prop="startTime"></el-table-column>
                                <el-table-column label="结束时间" prop="endTime"></el-table-column>
                                <el-table-column
                                    label="备注"
                                    prop="instructionRemarks"
                                    :show-overflow-tooltip="true"
                                >
                                    <template slot-scope="{ row }">
                                        <span>{{ row.instructionRemarks }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column label="设备名称" prop="equipmentName"></el-table-column>
                    <el-table-column label="设备型号" prop="equipmentModel"></el-table-column>
                    <el-table-column label="设备类型" prop="equipmentType"></el-table-column>
                    <el-table-column label="设备编号" prop="equipmentNo"></el-table-column>
                    <el-table-column label="设备大修时间" prop="repairDay"></el-table-column>
                    <el-table-column label="设备位置" prop="equipmentLocation"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="sizeChange"
                @current-change="currentChange"
                :page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]"
                :current-page="nowPages"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
        <div class="AddEQ_remarks">
            <p>备注</p>
            <div class="AddEQ_remarks_textarea">
                <el-input style="width: 50%" type="textarea" v-model="remark"></el-input>
            </div>
        </div>
        <el-button style="margin: 20px 0px 0px 10px" @click="OnAddTo" type="primary">添加</el-button>
        <el-divider></el-divider>
        <div class="AddEQ_contnet">
            <div class="AddEQ_contnet_table">
                <el-table
                    :data="RemarksArr"
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
                    ref="multipletableData"
                >
                    <el-table-column type="expand" prop="list">
                        <template slot-scope="scope">
                            <el-table
                                :data="scope.row.list"
                                style="width: 100%"
                                height="100%"
                                :header-row-style="{ height: '39px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '39px' }"
                                :cell-style="{ padding: '0px' }"
                                border
                                ref="list"
                                @selection-change="OnRemarkChange"
                            >
                                <el-table-column type="selection" width="50"></el-table-column>
                                <el-table-column label="序号" type="index" width="60"></el-table-column>
                                <el-table-column label="架次号" prop="sortieNo"></el-table-column>
                                <el-table-column label="站位名称" prop="stationName"></el-table-column>
                                <el-table-column label="指令号" prop="instructionNo"></el-table-column>
                                <el-table-column label="指令名称" prop="instructionName"></el-table-column>
                                <el-table-column label="开始时间" prop="startTime"></el-table-column>
                                <el-table-column label="结束时间" prop="endTime"></el-table-column>
                                <el-table-column
                                    label="备注"
                                    prop="instructionRemarks"
                                    :show-overflow-tooltip="true"
                                >
                                    <template slot-scope="{ row }">
                                        <span>{{ row.instructionRemarks }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="150">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            type="primary"
                                            @click="OnRemarkDelete(scope.$index, scope.row)"
                                        >删除</el-button>
                                        <el-button
                                            size="mini"
                                            type="primary"
                                            @click="OnRemarkModify(scope.$index, scope.row)"
                                        >修改</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column label="设备名称" prop="equipmentName"></el-table-column>
                    <el-table-column label="设备型号" prop="equipmentModel"></el-table-column>
                    <el-table-column label="设备类型" prop="equipmentType"></el-table-column>
                    <el-table-column label="设备编号" prop="equipmentNo"></el-table-column>
                    <el-table-column label="设备大修时间" prop="repairDay"></el-table-column>
                    <el-table-column label="设备位置" prop="equipmentLocation"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="RemarkssizeChange"
                @current-change="RemarkscurrentChange"
                :page-size="limit"
                :page-sizes="[10, 20, 30, 40]"
                :current-page="page"
                layout="total,sizes, prev, pager, next, jumper"
                :total="RemarksLimit"
            ></el-pagination>
        </div>
        <div class="AddEQ_DescriptionProcessing">
            <div class="AddEQ_DescriptionProcessing_left">
                <div class="AddEQ_DescriptionProcessing_left_result">
                    <p>结果反馈</p>
                    <div>
                        <el-select size="medium" v-model="result" placeholder="请选择" clearable>
                            <el-option label="准备就绪" value="0"></el-option>
                            <el-option label="其它" value="1"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="AddEQ_DescriptionProcessing_left_result" style="margin-left: 20px">
                    <p>时间</p>
                    <div>
                        <el-date-picker
                            size="medium"
                            v-model="time"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        ></el-date-picker>
                    </div>
                </div>
            </div>
        </div>
        <div class="AddEQ_btn">
            <el-button class="AddEQ_btn_BN" @click="OnConfirm" type="primary">确定</el-button>
        </div>
        <!-- 修改 -->
        <el-dialog :visible.sync="ElasticFrame" width="400">
            <div class="AddnElasticFrame_top">
                <p>备注</p>
                <div class="AddnElasticFrame_top_textarea">
                    <el-input style="width: 100%" rows="5" type="textarea" v-model="ModifyRemark"></el-input>
                </div>
            </div>
            <div class="dialog_footer">
                <el-button class="dialog_Close" @click="OnClose">取 消</el-button>
                <el-button class="dialog_Preservation" @click="OnRemarkConfirm" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { AutomaticScheduling } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            EquipmentName: "", //设备名称
            EquipmentModel: "", //设备型号
            StationName: "", //站位名称
            EquipmentTime: null, //时间
            QueryArr: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            multipleSelection: [],
            multipleSelectionEee: [],
            result: "", //结果反馈
            remark: "", //备注
            time: null, //时间
            page: 1, //查询备注信息当前页
            limit: 10, //查询备注信息每页多少条
            RemarksLimit: 0, //总数
            RemarksArr: [],
            RemarkChange: [], //勾选确认
            ElasticFrame: false, //是否隐藏修改弹框
            ModifyRemark: "", //修改
            ModifyRemarkArr: [], //储存修改确认
            expands: [],
            getRowKeys(row) {
                return row.equipmentId;
            },
            expandKey: [],
            RowKey(row) {
                return row.equipmentId;
            }
        };
    },
    created() {
        this.OnQuery();
        this.OnQueryRemarks();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 260 + "px";
        },
        // 折叠面板每次只能展开一行
        expandSelect(row, expandedRows) {
            var that = this;
            if (expandedRows.length) {
                that.expands = [];
                if (row) {
                    that.expands.push(row.equipmentId); // 每次push进去的是每行的ID
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
                    that.expandKey.push(row.equipmentId); // 每次push进去的是每行的ID
                }
            } else {
                that.expandKey = []; // 默认不展开
            }
        },
        // 查询
        OnQuery() {
            let that = this;
            let url = AutomaticScheduling.GET_K_Query;
            let data = {
                page: that.nowPages,
                limit: that.pageSize,
                equipmentName: that.EquipmentName, //设备名称
                equipmentModel: that.EquipmentModel, //设备型号
                stationName: that.StationName, //站位名称
                time: that.EquipmentTime //时间
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.QueryArr = res.data.list;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.OnQuery();
        },
        // 分页
        currentChange(val) {
            this.nowPages = val;
            this.OnQuery();
        },
        //添加
        OnAddTo() {
            let that = this;
            let url = AutomaticScheduling.GET_K_AddTo;
            let data = {
                instructionRemarks: that.remark,
                list: that.multipleSelectionEee
            };
            if (that.remark == "") {
                that.$message({
                    message: "请添加备注",
                    type: "warning",
                    duration: 1500
                });
            } else if (that.multipleSelectionEee.length == 0) {
                that.$message({
                    message: "请勾选需要添加的指令",
                    type: "warning",
                    duration: 1500
                });
            } else {
                that.axios
                    .post(url, data)
                    .then(res => {
                        if (res.data.success === true) {
                            that.$message({
                                //成功后的提示
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            that.remark = "";
                            that.OnQuery();
                            that.OnQueryRemarks();
                        } else {
                            that.$message({
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
            }
        },
        tableDataChange(val) {
            this.multipleSelection = val;
        },
        eeeChange(val) {
            this.multipleSelectionEee = val;
        },
        //查看备注信息
        OnQueryRemarks() {
            let that = this;
            let url = AutomaticScheduling.GET_K_QueryRemarks;
            let data = {
                page: that.page,
                limit: that.limit
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.RemarksArr = res.data.list;
                    that.RemarksLimit = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        RemarkssizeChange(val) {
            this.page = val;
            this.OnQueryRemarks();
        },
        // 分页
        RemarkscurrentChange(val) {
            this.limit = val;
            this.OnQueryRemarks();
        },
        //勾选确认
        OnRemarkChange(val) {
            this.RemarkChange = val;
        },
        // 确定
        OnConfirm() {
            let that = this;
            let url = AutomaticScheduling.GET_K_Confirm;
            let data = {
                confirmTime: that.time, //时间
                feedbackResults: that.result, //结果反馈
                list: that.RemarkChange //勾选数据
            };
            if (that.time == null && that.result == "") {
                that.$message({
                    //失败后的提示
                    message: "请填写结果反馈和时间",
                    type: "warning",
                    duration: 1500
                });
            } else if (that.RemarkChange.length == 0) {
                that.$message({
                    //失败后的提示
                    message: "请勾选需要保存的指令",
                    type: "warning",
                    duration: 1500
                });
            } else {
                that.axios
                    .post(url, data)
                    .then(res => {
                        if (res.data.success === true) {
                            that.$message({
                                //成功后的提示
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            that.time = null;
                            that.result = "";
                            that.OnQuery();
                            that.OnQueryRemarks();
                        } else {
                            that.$message({
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
            }
        },
        //修改
        OnRemarkModify(index, row) {
            this.ElasticFrame = true;
            this.ModifyRemarkArr = row;
            this.ModifyRemark = row.instructionRemarks;
        },
        //修改确认
        OnRemarkConfirm() {
            let that = this;
            let url = AutomaticScheduling.GET_K_modifyRemarks;
            if (that.ModifyRemark == "") {
                that.$message({
                    message: "请添加备注",
                    type: "warning",
                    duration: 1500
                });
            } else {
                that.axios
                    .get(url, {
                        params: {
                            instructionRemarks: that.ModifyRemark,
                            equipmentId: that.ModifyRemarkArr.equipmentId
                        }
                    })
                    .then(res => {
                        if (res.data.success === true) {
                            that.$message({
                                //成功后的提示
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            that.ModifyRemark = "";
                            this.ElasticFrame = false;
                            that.OnQuery();
                            that.OnQueryRemarks();
                        } else {
                            that.$message({
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
            }
        },
        //取消弹框
        OnClose() {
            this.ElasticFrame = false;
        },
        //删除
        OnRemarkDelete(index, row) {
            let that = this;
            let url = AutomaticScheduling.GET_K_DeleteRemarks;
            that.axios
                .get(url, {
                    params: {
                        equipmentId: row.equipmentId
                    }
                })
                .then(res => {
                    if (res.data.success === true) {
                        that.$message({
                            //成功后的提示
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        that.OnQuery();
                        that.OnQueryRemarks();
                    } else {
                        that.$message({
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
.AddEQ_head {
    height: 60px;
    overflow: hidden;
}
.AddEQ_head_left {
    width: 250px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.AddEQ_head_left p {
    width: 80px;
    float: left;
    line-height: 36px;
}
.AddEQ_head_left div {
    width: 170px;
    float: left;
}
.AddEQ_head_bnt {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}

.AddEQ_ElasticFrame_top {
    overflow: hidden;
}

.AddEQ_Testing {
    width: 250px;
    height: 40px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}

.AddEQ_Testing div {
    width: 160px;
    float: right;
}
.AddEQ_TaskContent {
    width: 510px;
    height: 80px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}
.AddEQ_TaskContent div {
    width: 420px;
    float: right;
}
.AddEQ_remarks {
    padding: 0px 10px;
    height: 50px;
    margin-top: 30px;
}
.AddEQ_remarks p {
    width: 60px;
    float: left;
}
.AddEQ_remarks_textarea {
    width: calc(100% - 60px);
    width: -moz-calc(100% - 60px);
    width: -webkit-calc(100% - 60px);
    width: -o-calc(100% - 60px);
    float: left;
}
.AddEQ_DescriptionProcessing {
    height: 55px;
    margin-top: 20px;
    padding: 0px 10px;
}
.AddEQ_DescriptionProcessing_left_result {
    height: 36px;
    margin-bottom: 10px;
    float: left;
}
.AddEQ_DescriptionProcessing_left_result p {
    width: 80px;
    float: left;
    line-height: 36px;
}
.AddEQ_DescriptionProcessing_left_result div {
    width: 170px;
    float: left;
}
.AddEQ_DescriptionProcessing_right {
    float: left;
    height: 100px;
    width: calc(100% - 350px);
    width: -moz-calc(100% - 350px);
    width: -webkit-calc(100% - 350px);
    width: -o-calc(100% - 350px);
}

.AddEQ_FaultDescription {
    width: 50%;
    height: 100%;
    float: left;
    overflow: hidden;
}
.AddEQ_FaultDescription p {
    width: 80px;
    height: 100%;
    float: left;
    margin-top: 17px;
    box-sizing: border-box;
}
.AddEQ_FaultDescription .content {
    width: calc(100% - 80px);
    width: -moz-calc(100% - 80px);
    width: -webkit-calc(100% - 80px);
    width: -o-calc(100% - 80px);

    height: 100%;
    float: left;
}
.AddEQ_FaultDescription_textarea {
    width: 100%;
}
.AddEQ_btn {
    height: 40px;
    margin-bottom: 10px;
    margin-left: 10px;
}
.AddEQ_btn_BN {
    float: left;
}

.AddEQ_footer {
    height: 30px;
    margin-top: 10px;
}
.AddEQ_Preservation {
    float: right;
    margin-right: 10px;
}
.AddEQ_Close {
    float: right;
}

.AddEQ_contnet {
    width: 100%;
    height: 400px;
}
.AddEQ_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.DetectPaging {
    height: 30px;
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
