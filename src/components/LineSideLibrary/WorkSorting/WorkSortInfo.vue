<template>
    <div class="WorkSortInfo_container">
        <div class="WorkSortInfo_title">
            <div class="WorkSortInfo_head">
                <p>
                    <i class="el-icon-full-screen"></i>
                </p>
                <div>
                    <el-input v-model="searchInfo" size="medium" placeholder="请扫描" clearable></el-input>
                </div>
            </div>
        </div>
        <div class="WorkSortInfo_Title">
            <el-button @click="WorkSortRe" size="small" type="primary">返回</el-button>
        </div>
        <div :style="TableHeight">
            <el-table
                border
                :data="StandingWorkSortInfoArr"
                :row-key="getRowKeys"
                :expand-row-keys="expands"
                @expand-change="expandSelect"
                @selection-change="handleSelectionChange"
                ref="multipleTable"
                height="100%"
                style="width: 100%; height: 100%"
            >
                <el-table-column type="expand" prop="materialInfos">
                    <template #default="scope">
                        <el-table
                            class="table_key"
                            :data="scope.row.materialInfos"
                            style="width: 100%"
                            height="200"
                            border
                            ref="materialInfos"
                            stripe
                            @selection-change="SelectionChange"
                        >
                            <el-table-column type="selection" width="60"></el-table-column>
                            <el-table-column label="序号" type="index" width="60"></el-table-column>
                            <el-table-column label="产品图号" prop="drawNo"></el-table-column>
                            <el-table-column label="产品名称" prop="materialName"></el-table-column>
                            <el-table-column label="需求数量" prop="stockNum"></el-table-column>
                            <el-table-column label="合格证号" prop="certificateNo"></el-table-column>
                            <el-table-column label="生产厂商" prop="productUnit"></el-table-column>
                            <el-table-column label="配套数量" prop="matchNum" width="120">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.matchNum >= 1 || scope.row.matchNum == 0">
                                        <el-input
                                            oninput="value=value.replace(/\D/g,'')"
                                            size="mini"
                                            placeholder="请输入正整数"
                                            v-model="scope.row.matchNum"
                                        ></el-input>
                                    </span>
                                    <span v-else>
                                        {{
                                        scope.row.matchNum
                                        }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template #default="{row}">
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click.native="addMent(row)"
                                    >复制</el-button>
                                    <el-button
                                        v-if="row.needNum == 1 ? true : false"
                                        type="primary"
                                        size="mini"
                                        @click.native="del(row)"
                                    >删除</el-button>
                                    <el-button
                                        v-show="row.matchNum >= 1"
                                        type="primary"
                                        size="mini"
                                        @click.native="affirm(row)"
                                    >确认</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column label="序号" type="index" width="60"></el-table-column>
                <el-table-column label="架次号" prop="sortieNo"></el-table-column>
                <el-table-column label="指令号" prop="instructNum"></el-table-column>
                <el-table-column label="指令名称" prop="instructName"></el-table-column>
            </el-table>
        </div>
        <el-dialog title :visible.sync="dialogTableVisible">
            <el-form :model="form">
                <el-form-item label="配套数量" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { dispatchingManagement } from "../../../common/api";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            workFlowId: this.$route.query.workFlowId,
            stationId: this.$route.query.stationId,
            workNo: this.$route.query.workNo,
            workId: this.$route.query.workId,
            sortieNo: this.$route.query.sortieNo,
            StandingWorkSortInfoArr: [],
            multipleSelection: [],
            multipleSelectionChange: [],
            dialogTableVisible: false,
            searchInfo: "", // 二维码
            expands: [],
            getRowKeys(row) {
                return row.instructId;
            },
            form: {
                name: ""
            },
            array: {}
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.WorkSortInfoSearchList();
        this.getMaterialInfo();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 105 + "px";
        },
        // 查询
        WorkSortInfoSearchList() {
            let that = this;
            let url = dispatchingManagement.GET_Y_showWorkOderSorting;
            let data = {
                workFlowId: that.workFlowId,
                stationId: that.stationId,
                workId: that.workId,
                workNo: that.workNo,
                sortieNo: that.sortieNo
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.StandingWorkSortInfoArr = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 删除
        del(val) {
            let that = this;
            that.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    that.axios
                        .get(dispatchingManagement.GET_Y_deleteStock, {
                            params: {
                                stockId: val.stockId
                            }
                        })
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success"
                                });
                                that.WorkSortInfoSearchList();
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
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 复制
        addMent(val) {
            let that = this;
            that.$set(val, "sortieNo", this.sortieNo);
            let url = dispatchingManagement.GET_Y_showWorkOderSortingCopy;
            that.axios
                .post(url, val)
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: res.data.message,
                            type: "success"
                        });
                        that.WorkSortInfoSearchList();
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
        },
        // 折叠面板每次只能展开一行
        expandSelect(row, expandedRows) {
            var that = this;
            that.array = row;
            if (expandedRows.length) {
                that.expands = [];
                if (row) {
                    that.expands.push(row.instructId); // 每次push进去的是每行的ID
                }
            } else {
                that.expands = []; // 默认不展开
            }
        },
        // 刷卡
        getMaterialInfo() {
            var lett = this;
            document.onkeydown = function() {
                var key = window.event.keyCode;
                if (key == 13) {
                    if (lett.searchInfo == "") {
                        lett.$message({
                            type: "warning",
                            message: "请问扫描二维码"
                        });
                    } else {
                        if (
                            lett.multipleSelectionChange < 1 ||
                            lett.multipleSelectionChange == undefined
                        ) {
                            lett.$message({
                                type: "warning",
                                message: "请选择指令号下的一条产品图号数据"
                            });
                        } else {
                            lett.OnQuery();
                        }
                    }
                }
            };
        },
        OnQuery() {
            let that = this;
            let url = dispatchingManagement.GET_Y_updateSubtractStock;
            that.axios
                .post(url, {
                    jsonStr: that.searchInfo,
                    workFlowId: parseInt(that.workFlowId),
                    stockNum: that.multipleSelectionChange.stockNum,
                    drawNo: that.multipleSelectionChange.drawNo,
                    materialName: that.multipleSelectionChange.materialName,
                    instructId: that.multipleSelectionChange.instructId,
                    instructName: that.multipleSelectionChange.instructName,
                    instructNum: that.multipleSelectionChange.instructNum,
                    stockId:
                        that.multipleSelectionChange.stockId == undefined
                            ? ""
                            : that.multipleSelectionChange.stockId,
                    workNo: that.workNo,
                    sortieNo: that.sortieNo,
                    surplusNum:
                        that.multipleSelectionChange.surplusNum == undefined
                            ? ""
                            : that.multipleSelectionChange.surplusNum
                })
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: res.data.message,
                            type: "success"
                        });
                        that.WorkSortInfoSearchList();
                        that.searchInfo = "";
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
        },
        affirm(value) {
            let that = this;
            if (value.matchNum > 0) {
                let url = dispatchingManagement.GET_Y_updateSureMaterialInfo;
                let data = {
                    drawNo: value.drawNo,
                    certificateNo: value.certificateNo,
                    matchNum: parseInt(value.matchNum),
                    stockNum: value.stockNum,
                    materialName: value.materialName,
                    instructNum: value.instructNum,
                    stockId: value.stockId,
                    surplusNum: value.surplusNum,
                    sortieNo: value.sortieNo
                };
                that.axios
                    .post(url, data)
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success"
                            });
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
                that.$message({
                    message: "配套数量不能为负数",
                    type: "error"
                });
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        SelectionChange(val) {
            if (val.length > 1) {
                this.$refs.materialInfos.clearSelection();
                this.$refs.materialInfos.toggleRowSelection(val.pop());
            } else {
                this.multipleSelectionChange = val.pop(); //储存新的单选数据
            }
        },
        // 返回
        WorkSortRe() {
            this.$router.push({
                path: "WorkSorting"
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

.el-form-item__label {
    width: 120px;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 150px;
}

.WorkSortInfo_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}

.WorkSortInfo_title {
    float: left;
    height: 50px;
}

.WorkSortInfo_head {
    width: 220px;
    float: left;
    margin-right: 10px;
}

.WorkSortInfo_head p {
    width: 40px;
    float: left;
    line-height: 36px;
    font-size: 36px;
}

.WorkSortInfo_head div {
    width: 180px;
    float: left;
}

.WorkSortInfo_Title {
    float: right;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
}

.Out_bnt {
    float: right;
}

.Out_bnt:last-child {
    margin-right: 10px;
}

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
    width: 160px;
    float: right;
}

.Advan {
    width: 570px;
    float: left;
    margin-left: 10px;
}

.Advan div {
    width: 450px;
    float: right;
}

.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
</style>
