<template>
    <div class="Dismantling_container">
        <div class="Dismantling_title">
            <div class="Dismantling_head">
                <p>指令名称</p>
                <div>
                    <el-input size="medium" v-model="orderNo" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="Dismantling_head">
                <p>指令号</p>
                <div>
                    <el-input size="medium" v-model="workNo" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <el-button size="medium" type="primary" @click="WorkOrderList">查询</el-button>
        </div>
        <div class="Dismantling_Title">指令信息</div>
        <div>
            <el-table
                border
                :data="WorkOrderArr"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                height="300"
                style="width: 100%;height:100%;"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="orderName" label="工单号"></el-table-column>
                <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                <el-table-column prop="instructName" label="指令名称"></el-table-column>
                <el-table-column prop="instructNum" label="指令号"></el-table-column>
                <el-table-column prop="startTime" label="计划开始时间" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="endTime" label="计划完成时间" :formatter="dateFormat"></el-table-column>
            </el-table>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="sizeChange"
                @current-change="currentChange"
                :page-size="pageSize"
                :current-page="nowPages"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
        <div class="And_FaultDescription">
            <p>备注信息</p>
            <div class="content">
                <el-input class="And_FaultDescription_textarea" type="textarea" v-model="remark"></el-input>
            </div>
            <div style="clear: both"></div>
        </div>
        <div>
            <el-button type="primary" @click="AddSave" style="margin-top: 15px;margin-left:10px">添加</el-button>
        </div>
        <el-divider></el-divider>
        <div class="Dismantling_Title">指令信息</div>
        <div>
            <el-table
                border
                :data="remarkArr"
                height="340"
                style="width: 100%;height:100%;"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                <el-table-column prop="instructName" label="指令名称"></el-table-column>
                <el-table-column prop="instructNum" label="指令号"></el-table-column>
                <el-table-column prop="startTime" label="计划开始时间" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="endTime" label="计划完成时间" :formatter="dateFormat"></el-table-column>
                <el-table-column label="申请人备注" :show-overflow-tooltip="true">
                    <template slot-scope="{ row }">
                        <span>{{ row.remarks }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="站位工程师退回原因" :show-overflow-tooltip="true">
                    <template slot-scope="{ row }">
                        <span>{{ row.engineerRemarks }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button @click="delClick(scope.row)" type="primary" size="small">删除</el-button>
                        <el-button @click="editClick(scope.row)" type="primary" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="Dismantling_bnt">
            <el-button @click="OnDismantling" size="small" type="primary">拆解申请</el-button>
        </div>
        <!--  修改弹框 -->
        <el-dialog title :visible.sync="EditBox" width="40%">
            <div class="AdvanElasticFrame_top">
                <el-form :model="EditBoxContent" ref="EditBoxContent" size="medium">
                    <el-form-item label="备注" prop="editRemark">
                        <el-input
                            type="textarea"
                            v-model="EditBoxContent.editRemark"
                            clearable
                            placeholder="请输入"
                            :rows="5"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="EditBox = false">取 消</el-button>
                <el-button type="primary" @click="EditBoxFeameAddSave('EditBoxContent')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
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
    height: 30px;
    margin-top: 10px;
}
.Dismantling_Title {
    height: 30px;
    font-size: 14px;
}
.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
.And_FaultDescription {
    width: 50%;
    height: 100%;
    float: left;
    overflow: hidden;
}
.And_FaultDescription p {
    width: 80px;
    height: 100%;
    float: left;
    box-sizing: border-box;
}
.And_FaultDescription .content {
    width: calc(100% - 80px);
    width: -moz-calc(100% - 80px);
    width: -webkit-calc(100% - 80px);
    width: -o-calc(100% - 80px);

    height: 100%;
    float: left;
}
.And_FaultDescription_textarea {
    width: 100%;
}
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
</style>
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
            remarkArr: [],
            workNo: "", // 指令号
            orderNo: "", // 指令名称
            remark: "", // 备注信息
            multipleSelection: [],
            remarkSelection: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            EditBox: false, // 修改弹框
            EditBoxContent: {
                editRemark: "" // 备注
            },
            DisassemblyId: ""
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.WorkOrderList();
        this.remarkList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 550 + "px";
        },
        // 查询
        WorkOrderList() {
            let that = this;
            let url = dispatchingManagement.GET_X_findAllQuery;
            let data = {
                limit: that.pageSize,
                page: that.nowPages,
                instructName: that.orderNo,
                instructNum: that.workNo
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.WorkOrderArr = res.data.list;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.WorkOrderList();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.WorkOrderList();
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
        // 添加
        AddSave() {
            if (this.multipleSelection < 1) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning"
                });
            } else {
                let that = this;
                let url = dispatchingManagement.GET_X_addRemarks;
                let data = that.multipleSelection;
                data.remarks = that.remark;
                that.axios
                    .post(url, data)
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            this.remarkList();
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
            }
        },
        // 查询备注信息
        remarkList() {
            let that = this;
            let url = dispatchingManagement.GET_X_findAllRemarks;
            that.axios
                .post(url)
                .then(res => {
                    that.remarkArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 拆解申请
        OnDismantling() {
            let that = this;
            let url = dispatchingManagement.GET_X_disassemblyApply;
            that.axios
                .post(url, that.remarkArr)
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            type: "success",
                            message: res.data.message
                        });
                        this.remarkList();
                    } else {
                        that.$message({
                            type: "error",
                            message: res.data.message
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 删除
        delClick(rows) {
            let that = this;
            let url =
                dispatchingManagement.GET_X_delete +
                "?DisassemblyId=" +
                rows.disassemblyId;
            that.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    that.axios
                        .get(url)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    type: "success",
                                    message: res.data.message
                                });
                                this.remarkList();
                            } else {
                                that.$message({
                                    type: "error",
                                    message: res.data.message
                                });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(() => {
                    that.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 修改
        editClick(row) {
            this.DisassemblyId = row.disassemblyId;
            this.EditBoxContent.editRemark = row.remarks;
            this.EditBox = true;
        },
        // 修改 -确定
        EditBoxFeameAddSave() {
            let that = this;
            let url = dispatchingManagement.GET_X_updateRemarks;
            that.axios
                .get(url, {
                    params: {
                        remarks: that.EditBoxContent.editRemark,
                        DisassemblyId: that.DisassemblyId
                    }
                })
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: res.data.message,
                            type: "success"
                        });
                        this.remarkList();
                        this.EditBox = false;
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
        }
    }
};
</script>
