<template>
    <div class="Book_container">
        <div class="Book_Title">盘点信息</div>
        <el-table
            border
            @selection-change="handleSelectionChange"
            ref="multipleTable"
            :data="StandingBookArr"
            height="150"
            style="width: 100%; height: 100%"
            :header-row-style="{ height: '39px' }"
            :header-cell-style="{ padding: '0px' }"
            :row-style="{ height: '39px' }"
            :cell-style="{ padding: '0px' }"
        >
            <el-table-column type="selection" width="60"></el-table-column>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="checkNo" label="盘点单号"></el-table-column>
            <el-table-column prop="checkTime" label="盘点时间"></el-table-column>
            <el-table-column prop="checkUser" label="盘点人"></el-table-column>
            <el-table-column prop="wareHouse" label="仓库"></el-table-column>
            <el-table-column prop="locationName" label="库位"></el-table-column>
            <el-table-column prop="checkStatus" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.checkStatus == 1">新建</span>
                    <span v-else-if="scope.row.checkStatus == 2">保存</span>
                    <span v-else-if="scope.row.checkStatus == 3">已提交</span>
                    <span v-else-if="scope.row.checkStatus == 4">站位长已审核</span>
                    <span v-else-if="scope.row.checkStatus == 5">工段长已审核</span>
                    <span v-else-if="scope.row.checkStatus == 6">总计划已审核</span>
                    <span v-else-if="scope.row.checkStatus == 7">站位长驳回待提交</span>
                    <span v-else-if="scope.row.checkStatus == 8">工段长驳回待提交</span>
                    <span v-else-if="scope.row.checkStatus == 9">总计划驳回待提交</span>
                </template>
            </el-table-column>
            <el-table-column prop="finishTime" label="完成时间"></el-table-column>
        </el-table>

        <el-tabs type="border-card">
            <el-tab-pane label="库存调整">
                <div>
                    <div class="Book_title">
                        <div class="Book_head">
                            <p>物料图号</p>
                            <div>
                                <el-input
                                    v-model="materialDrawingNum"
                                    size="medium"
                                    placeholder="请输入"
                                    clearable
                                ></el-input>
                            </div>
                        </div>
                        <div class="Book_head">
                            <p>合格证号</p>
                            <div>
                                <el-input
                                    v-model="materialName"
                                    size="medium"
                                    placeholder="请输入"
                                    clearable
                                ></el-input>
                            </div>
                        </div>
                        <el-button size="medium" type="primary" @click="getSbSearchListInfo">查询</el-button>
                    </div>
                    <div :style="TableHeight">
                        <el-table
                            border
                            :data="StandingBookArrContent"
                            @selection-change="SelectionChangeContent"
                            ref="multipleTableContent"
                            height="100%"
                            style="width: 100%; height: 100%"
                            :header-row-style="{ height: '39px' }"
                            :header-cell-style="{ padding: '0px' }"
                            :row-style="{ height: '39px' }"
                            :cell-style="{ padding: '0px' }"
                        >
                            <el-table-column type="selection" width="60"></el-table-column>
                            <el-table-column type="index" label="序号" width="50"></el-table-column>
                            <el-table-column prop="drawNo" label="图号"></el-table-column>
                            <el-table-column prop="materialName" label="名称"></el-table-column>
                            <el-table-column prop="specificationModel" label="规格"></el-table-column>
                            <el-table-column prop="stockNum" label="库存数量">
                                <template slot-scope="scope">
                                    <el-input
                                        oninput="value=value.replace(/\D/g,'')"
                                        v-model="scope.row.stockNum"
                                        size="medium"
                                        placeholder="请输入数字"
                                    ></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="checkNum" label="盘点数量"></el-table-column>
                            <el-table-column prop="locationName" label="库位"></el-table-column>
                            <el-table-column prop="certificateNo" label="合格证号"></el-table-column>
                            <el-table-column prop="productUnit" label="供应商"></el-table-column>
                        </el-table>
                    </div>
                    <div class="btnC">
                        <el-button type="primary" @click="storageSava">入 库</el-button>
                        <el-button type="primary" @click="confirmSava">确 定</el-button>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 150px;
}
.Book_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Book_title {
    height: 50px;
}

.Book_head {
    width: 220px;
    float: left;
    margin-right: 10px;
}
.Book_head p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.Book_head div {
    width: 150px;
    float: left;
}
.Book_Title {
    height: 25px;
    font-size: 14px;
}
.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
.Out_bnt {
    float: right;
    margin-left: 10px;
}
.btnC {
    margin-top: 10px;
}
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
            StandingBookArr: [],
            multipleSelection: [],
            delDate: [],
            dialogFormVisible: false,
            materialName: "", // 合格证号
            materialDrawingNum: "", // 物料图号
            StandingBookArrContent: [],
            multipleSelectionContent: [],
            yesCheckId: ""
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.getSbSearchList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 370 + "px";
        },
        // 查询
        getSbSearchList() {
            let that = this;
            that.axios
                .post(dispatchingManagement.GET_Z_getCheckMaterial)
                .then(res => {
                    that.StandingBookArr = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 库存调整详情页面查询
        getSbSearchListInfo() {
            let that = this;
            that.axios
                .post(dispatchingManagement.GET_Z_getCheckMaterialDetail, {
                    checkId: that.yesCheckId,
                    drawNo: that.materialDrawingNum, // 物料图号
                    certificateNo: that.materialName // 合格证号
                })
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            showClose: true,
                            message: res.data.message,
                            type: "success"
                        });
                        that.StandingBookArrContent = res.data.list;
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
        },
        // 入库
        storageSava() {
            this.$router.push({
                path: "Storage",
                query: {
                    isShow: true
                }
            });
        },
        // 确定
        confirmSava() {
            if (this.multipleSelectionContent.length == 0) {
                this.$message({
                    showClose: true,
                    message: "请选择数据",
                    type: "warning"
                });
            } else {
                let that = this;
                that.axios
                    .post(
                        dispatchingManagement.GET_Z_updateSureMaterialInfo,
                        that.multipleSelectionContent
                    )
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                showClose: true,
                                message: res.data.message,
                                type: "success"
                            });
                            this.getSbSearchListInfo();
                            this.$refs.multipleTable.clearSelection();
                        } else {
                            that.$message({
                                showClose: true,
                                message: res.data.message,
                                type: "error"
                            });
                            this.getSbSearchListInfo();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            } else {
                this.multipleSelection = val.pop(); //储存新的单选数据
                if (this.multipleSelection != undefined) {
                    this.yesCheckId = this.multipleSelection.checkId;
                    this.getSbSearchListInfo();
                }
            }
        },
        SelectionChangeContent(val) {
            this.multipleSelectionContent = val;
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
