<template>
    <div class="Storage_container">
        <div class="Storage_title">
            <div class="Storage_head">
                <div>
                    <el-input
                        v-model="materialDrawingNum"
                        size="medium"
                        placeholder="提交人、工单号"
                        clearable
                    ></el-input>
                </div>
            </div>
            <el-button
                size="medium"
                type="primary"
                @click="
          nowPages = 1;
          storageSearchList();
        "
            >查询</el-button>
        </div>
        <div :style="TableHeight">
            <el-table
                border
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                :data="StandingStorageArr"
                height="100%"
                style="width: 100%; height: 100%"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="abnormalNum" label="质量记载单"></el-table-column>
                <el-table-column prop="workNo" label="工单号"></el-table-column>
                <el-table-column prop="instructNum" label="指令号"></el-table-column>
                <el-table-column prop="instructName" label="指令名称"></el-table-column>
                <el-table-column prop="person" label="提交人"></el-table-column>
                <el-table-column prop="abTime" label="提交时间"></el-table-column>
                <el-table-column prop="assemName" label="零部组件名称"></el-table-column>
                <el-table-column prop="qty" label="数量"></el-table-column>
                <el-table-column prop="groupResult" label="处理意见"></el-table-column>
                <el-table-column prop="isgenerate" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.isgenerate == 0">未生成</span>
                        <span v-else-if="scope.row.isgenerate == 1">生成</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="Storage(scope.row)">开报废单</el-button>
                    </template>
                </el-table-column>
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
        <!-- 开报废单 -->
        <el-dialog :visible.sync="OverhaulPeriodFrame" width="70%">
            <div class="AdvanElasticFrame_top">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" inline-message>
                    <el-form-item label="报废单编号" prop="One" class="AdvanTesting">
                        <el-input v-model="ruleForm.One" size="medium" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="原始记录编号" prop="Two" class="AdvanTesting">
                        <el-input v-model="ruleForm.Two" size="medium" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="机型" prop="Three" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.Three"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="架次号" prop="Four" class="AdvanTesting">
                        <el-input v-model="ruleForm.Four" size="medium" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="责任单位" prop="Five" class="AdvanTesting">
                        <el-input v-model="ruleForm.Five" size="medium" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="零组件名称" prop="Six" class="AdvanTesting">
                        <el-input v-model="ruleForm.Six" size="medium" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="零组件图号" prop="seven" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.seven"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="产品序号" prop="sixteen" class="AdvanTesting">
                        <el-input v-model.number="ruleForm.sixteen" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="指令号" prop="eight" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.eight"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="指令名称" prop="nine" class="AdvanTesting">
                        <el-input v-model="ruleForm.nine" size="medium" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="所属站位" prop="Ten" class="AdvanTesting">
                        <el-input v-model="ruleForm.Ten" size="medium" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="工单号" prop="eleven" class="AdvanTesting">
                        <el-input
                            size="medium"
                            placeholder="请输入"
                            v-model="ruleForm.eleven"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="报废数量" prop="twelve" class="AdvanTesting">
                        <el-input
                            v-model.number="ruleForm.twelve"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="检验员" prop="thirteen" class="AdvanTesting">
                        <el-input
                            v-model.number="ruleForm.thirteen"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="日期" prop="fourteen" class="AdvanTesting">
                        <el-date-picker v-model="ruleForm.fourteen" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="报废依据" prop="fiveteen" class="Advan">
                        <el-input
                            type="textarea"
                            v-model.number="ruleForm.fiveteen"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="storageSava('ruleForm')">保 存</el-button>
                <el-button type="primary" @click="storageCommit('ruleForm')">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
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
.Storage_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Storage_title {
    height: 50px;
}

.Storage_head {
    width: 200px;
    float: left;
    margin-right: 10px;
}
.Storage_head div {
    width: 200px;
    float: left;
}
.Storage_Title {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
}
.Out_bnt {
    float: right;
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
<script>
import { AssemblyPerform } from "../../../common/api";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            StandingStorageArr: [],
            multipleSelection: [],
            materialDrawingNum: "", // 查询
            OverhaulPeriodFrame: false, // 开报废单弹框
            ruleForm: {
                One: "", // 报废单编号
                Two: "", // 原始记录编号
                Three: "", // 机型
                Four: "", // 架次
                Five: "", // 责任单位
                Six: "", // 零组件名称
                seven: "", // 零组件号
                eight: "", // 指令号
                nine: "", // 指令名称
                Ten: "", // 所属站位
                eleven: "", // 工单号
                twelve: "", // 报废数量
                thirteen: "", // 检验员
                fourteen: "", // 日期
                fiveteen: "", // 报废依据
                sixteen: "" // 产品序号
            },
            rules: {
                fiveteen: [
                    {
                        required: true,
                        message: "请输入报废依据",
                        trigger: "blur"
                    }
                ]
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            rowData: {}
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.storageSearchList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 115 + "px";
        },
        // 查询
        storageSearchList() {
            let that = this;
            let url = AssemblyPerform.GET_D_findGenerateQuery;
            let data = {
                pageNum: that.nowPages,
                pageSize: that.pageSize,
                condetion: that.materialDrawingNum
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.StandingStorageArr = res.data.records;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.storageSearchList();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.storageSearchList();
        },
        // 开报废单
        Storage(row) {
            let that = this;
            that.rowData = row;
            that.OverhaulPeriodFrame = true;
            that.ruleForm.One = row.scrapNum;
            that.ruleForm.Two = row.abnormalNum;
            that.ruleForm.Three = row.airType;
            that.ruleForm.Four = row.sortieNo;
            that.ruleForm.Five = row.responsibleUnit; // 单位
            that.ruleForm.Six = row.assemName;
            that.ruleForm.seven = row.assemProduct;
            that.ruleForm.eight = row.instructNum;
            that.ruleForm.nine = row.instructName;
            that.ruleForm.Ten = row.stationName;
            that.ruleForm.eleven = row.workNo;
            that.ruleForm.twelve = row.qty;
            that.ruleForm.thirteen = row.person;
            that.ruleForm.fourteen = row.generateTime;
            that.ruleForm.sixteen = row.serialNumber;
        },
        // 开报废单保存
        storageSava(ruleForm) {
            let that = this;
            let url = AssemblyPerform.GET_D_addOrCommitGenerate;
            let savaData = {
                abnormalId: that.rowData.abnormalId,
                scrapBasis: that.rowData.fiveteen
            };
            this.$refs[ruleForm].validate(valid => {
                if (valid) {
                    that.axios
                        .post(url, savaData)
                        .then(res => {
                            console.log(res, "ppppp");
                            if (res.data.success == true) {
                                that.$message({
                                    message: "保存成功",
                                    type: "success",
                                    duration: 1500
                                });
                                that.storageSearchList();
                                that.OverhaulPeriodFrame = false;
                            } else {
                                that.$message({
                                    message: "保存失败",
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
        // 提交
        storageCommit(ruleForm) {
            let that = this;
            let url = AssemblyPerform.GET_D_addOrCommitGenerate;
            let savaData = {
                abnormalId: that.rowData.abnormalId,
                isgenerate: that.rowData.isgenerate,
                scrapBasis: that.rowData.fiveteen
            };
            this.$refs[ruleForm].validate(valid => {
                if (valid) {
                    that.axios
                        .post(url, savaData)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: "提交成功",
                                    type: "success",
                                    duration: 1500
                                });
                                that.storageSearchList();
                                that.OverhaulPeriodFrame = false;
                            } else {
                                that.$message({
                                    message: "提交失败",
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


