<template>
    <div class="container">
        <!-- 查询 -->
        <el-form :inline="true" size="medium" class="demo-form-inline">
            <el-form-item label>
                <el-input v-model="queryInfo" placeholder="提出人、架次号、类型" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="nowPages=1;siSearch()">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 按钮 -->
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" size="medium" @click="rejectFeameOpen">驳回</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="primary" size="medium" @click="sealingOpen">封闭</el-button>
            </el-col>
        </el-row>
        <!-- 列表 -->
        <div class="Tooling_contnet" :style="TableHeight">
            <div class="Tooling_contnet_table">
                <el-table
                    ref="multipleTable"
                    border
                    :data="SiData"
                    @selection-change="handleSelectionChange"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="problemType" label="问题类型"></el-table-column>
                    <el-table-column prop="proposedUser" label="提出人"></el-table-column>
                    <el-table-column prop="soritesNo" label="架次号"></el-table-column>
                    <el-table-column prop="problemDesc" label="问题描述"></el-table-column>
                    <el-table-column prop="demandTime" label="需求时间"></el-table-column>
                    <el-table-column prop="facilityModel" label="设备型号"></el-table-column>
                    <el-table-column prop="facilityType" label="设备类型"></el-table-column>
                    <el-table-column prop="facilityCode" label="设备编号"></el-table-column>
                    <el-table-column prop="closedTime" label="封闭日期"></el-table-column>
                    <el-table-column prop="remarks" label="备注" :show-overflow-tooltip="true">
                        <template slot-scope="{ row }">
                            <span>{{ row.remarks }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 分页 -->
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
        <!-- 驳回弹框 -->
        <el-dialog title="驳回信息" :visible.sync="rejectFeame" width="50%">
            <div class="AdvanElasticFrame_top">
                <el-form
                    :model="rejectFeameContent"
                    ref="rejectFeameContent"
                    :rules="rules"
                    size="medium"
                >
                    <el-form-item label="备注" prop="remark">
                        <el-input
                            type="textarea"
                            v-model="rejectFeameContent.remark"
                            clearable
                            placeholder="请输入驳回问题描述"
                            :rows="5"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="rejectFeame = false">取 消</el-button>
                <el-button type="primary" @click="rejectFeameAddSave('rejectFeameContent')">确 定</el-button>
            </div>
        </el-dialog>
        <!--  封闭弹框 -->
        <el-dialog title="封闭信息" :visible.sync="sealing" width="50%">
            <div class="AdvanElasticFrame_top">
                <el-form :model="sealingContent" ref="sealingContent" size="medium">
                    <el-form-item label="备注" prop="close">
                        <el-input
                            type="textarea"
                            v-model="sealingContent.close"
                            clearable
                            placeholder="请输入"
                            :rows="5"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="sealing = false">取 消</el-button>
                <el-button type="primary" @click="sealingFeameAddSave('sealingContent')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { AssemblyPerform } from "../../../common/api";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            queryInfo: "",
            SiData: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            multipleSelection: [],
            rejectFeame: false, // 驳回弹框
            rejectFeameContent: {
                remark: ""
            },
            sealing: false, // 封闭
            sealingContent: {
                close: ""
            },
            rules: {
                remark: [
                    {
                        required: true,
                        message: "请输入驳回问题描述",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.gaodu(); // 在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); // 在生命周期里面监听浏览器变化
        this.siSearch();
    },
    methods: {
        gaodu() {
            // 获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 160 + "px";
        },
        // 查询
        siSearch() {
            let that = this;
            let url = AssemblyPerform.GET_Z_selectProductInfoByAcceptUser;
            that.axios
                .post(url, {
                    pageNum: that.nowPages,
                    pageSize: that.pageSize,
                    searchName: that.queryInfo
                })
                .then(res => {
                    that.SiData = res.data.records;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.siSearch();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.siSearch();
        },
        // 获取点击时的数据
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            } else {
                this.multipleSelection = val.pop(); // 储存新的单选数据
            }
        },
        // 驳回
        rejectFeameOpen() {
            if (
                this.multipleSelection < 1 ||
                this.multipleSelection == undefined
            ) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.rejectFeameContent.remark = "";
                this.rejectFeame = true;
            }
        },
        rejectFeameAddSave(rejectFeameContent) {
            let that = this;
            let url = AssemblyPerform.GET_Z_updateBackProductInfo;
            that.$refs[rejectFeameContent].validate(valid => {
                if (valid) {
                    that.axios
                        .post(url, {
                            remarks: that.rejectFeameContent.remark,
                            productProblemId:
                                that.multipleSelection.productProblemId,
                            appointAcceptUser:
                                that.multipleSelection.appointAcceptUser
                        })
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                that.rejectFeame = false;
                                that.siSearch();
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
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 封闭
        sealingOpen() {
            if (
                this.multipleSelection < 1 ||
                this.multipleSelection == undefined
            ) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.sealingContent.close = "";
                this.sealing = true;
            }
        },
        sealingFeameAddSave() {
            let that = this;
            let url = AssemblyPerform.GET_Z_updateCloseProductInfo;
            that.axios
                .post(url, {
                    remarks: that.sealingContent.close,
                    productProblemId: that.multipleSelection.productProblemId
                })
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        that.sealing = false;
                        that.siSearch();
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
    }
};
</script>

<style scoped>
.Tooling_contnet {
    width: 100%;
}
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
.Tooling_contnet_table {
    height: 100%;
}
.demo-form-inline {
    height: 50px;
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
