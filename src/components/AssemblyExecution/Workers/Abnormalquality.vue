<template>
    <div class="container">
        <div class="abnormalQuality" :style="TableHeight">
            <div class="abnormalQuality_list">
                <div class="abnormalQuality_table">
                    <el-table
                        border
                        :data="tableDataOne"
                        height="100%"
                        style="width: 100%; height: 100%"
                        :header-row-style="{ height: '38px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '34px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column prop="ABNORMAL_NUM" label="质量记载单号"></el-table-column>
                        <el-table-column prop="RESPONSIBLE_UNIT" label="责任单位"></el-table-column>
                        <el-table-column prop="ERROR_CODE" label="故障代码"></el-table-column>
                        <el-table-column prop="ORDER_NAME" label="工单号"></el-table-column>
                        <el-table-column prop="PERSON" label="人员" width="100"></el-table-column>
                        <el-table-column prop="AB_STATUS" label="状态" width="100"></el-table-column>

                        <el-table-column label="操作" width="300">
                            <template slot-scope="scope">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click="OnviewQualityRecordShee(scope.$index, scope.row)"
                                >查看</el-button>
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click="OnSubmit(scope.$index, scope.row)"
                                >提交</el-button>
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click="OnDeleteQualityRecordShee(scope.$index, scope.row)"
                                >删除</el-button>
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click="ViewDocument(scope.$index, scope.row)"
                                >上传文件</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="detailedinfo">
                <el-tabs v-model="activeName" type="border-card" style="height: 100%">
                    <el-tab-pane label="质量异常详细信息" name="first">
                        <div class="abnormalQualityInformation">
                            <el-form :inline="true" :model="qualityForm" class="demo-form-inline">
                                <el-form-item label="质量记载单号">
                                    <el-input
                                        v-model="qualityForm.number"
                                        size="small"
                                        disabled
                                        placeholder
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="架次号">
                                    <el-input
                                        v-model="qualityForm.workNum"
                                        size="small"
                                        disabled
                                        placeholder
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="指令名称" style="width: 220px">
                                    <el-input
                                        style="width: 150px"
                                        v-model="qualityForm.name"
                                        size="small"
                                        disabled
                                        placeholder
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="责任单位" style="width: 220px">
                                    <el-select
                                        style="width: 150px"
                                        v-model="qualityForm.accountabilityUnit"
                                        placeholder="请选择责任单位"
                                        size="small"
                                    >
                                        <el-option
                                            v-for="item in AoptionTwo"
                                            :key="item.maintainId"
                                            :label="item.maintainStatus"
                                            :value="item.maintainStatus"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="故障代码" style="width: 220px">
                                    <el-select
                                        style="width: 150px"
                                        v-model="qualityForm.faultCode"
                                        placeholder="请选择故障代码"
                                        size="small"
                                    >
                                        <el-option
                                            v-for="item in AoptionThree"
                                            :key="item.maintainId"
                                            :label="item.maintainStatus"
                                            :value="item.maintainStatus"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" size="small" @click="OnTheWhole">整机异常</el-button>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" size="small" @click="returnWork">返回</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <el-divider></el-divider>
                        <div class="abnormalQualityTitle">
                            <div class="process">
                                <div class="process_head">
                                    <div class="process_title">本工序装入件信息</div>
                                    <div class="process_search">
                                        <el-form
                                            :inline="true"
                                            :model="processForm"
                                            ref="processForm"
                                            class="demo-form-inline"
                                        >
                                            <el-form-item prop="search">
                                                <el-input
                                                    v-model="processForm.search"
                                                    size="mini"
                                                    placeholder="搜索关键字"
                                                ></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button
                                                    type="primary"
                                                    size="mini"
                                                    @click="submitSearch"
                                                >搜索</el-button>
                                                <el-button
                                                    type="primary"
                                                    size="mini"
                                                    @click="resetForm('processForm')"
                                                >重置</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                                <div class="process_table" :style="detailedInformationHeight">
                                    <div class="processTableContents">
                                        <el-table
                                            border
                                            :data="tableDataTwo"
                                            height="100%"
                                            @row-click="processClick"
                                            highlight-current-row
                                            style="width: 100%; height: 100%"
                                            :header-row-style="{
                        height: '25px',
                      }"
                                            :header-cell-style="{
                        padding: '0px',
                      }"
                                            :row-style="{ height: '25px' }"
                                            :cell-style="{ padding: '0px' }"
                                        >
                                            <el-table-column prop="assemProduct" label="装入件图号"></el-table-column>
                                            <el-table-column prop="assemName" label="名称"></el-table-column>
                                            <el-table-column prop="version" label="规格" width="150"></el-table-column>
                                            <el-table-column prop="qty" label="数量" width="60"></el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                            <div class="serialNumber">
                                <div class="serialNumber_head">
                                    <div class="serialNumber_title">合格证号</div>
                                    <div class="serialNumber_button">
                                        <el-form
                                            :inline="true"
                                            :model="productNum"
                                            class="demo-form-inline"
                                        >
                                            <el-form-item label="数量">
                                                <el-input
                                                    v-model="productNum.amount"
                                                    size="mini"
                                                    style="width: 80px"
                                                    :disabled="disabled"
                                                    placeholder="请输入"
                                                ></el-input>
                                            </el-form-item>
                                            <el-button
                                                type="primary"
                                                size="mini"
                                                @click="productNumAdd"
                                            >添加</el-button>
                                        </el-form>
                                    </div>
                                </div>
                                <div class="serialNumber_table" :style="detailedInformationHeight">
                                    <div class="serialNumberTableContents">
                                        <el-table
                                            border
                                            :data="tableDataThree"
                                            @selection-change="serialNumberChange"
                                            height="100%"
                                            style="width: 100%; height: 100%"
                                            :header-row-style="{
                        height: '38px',
                      }"
                                            :header-cell-style="{
                        padding: '0px',
                      }"
                                            :row-style="{ height: '34px' }"
                                            :cell-style="{ padding: '0px' }"
                                        >
                                            <el-table-column type="selection" width="55"></el-table-column>
                                            <el-table-column prop="serialNumber" label="产品序号"></el-table-column>
                                            <el-table-column prop="amount" label="数量"></el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                            <div class="problemParts">
                                <div class="problemParts_head">
                                    <div class="problemParts_title">已选择的问题零件信息</div>
                                    <div class="problemParts_button">
                                        <el-button type="primary" size="mini" @click="partDel">删除</el-button>
                                    </div>
                                </div>
                                <div class="problemParts_table" :style="detailedInformationHeight">
                                    <div class="problemPartsTableContents">
                                        <el-table
                                            border
                                            :data="tableDataFour"
                                            ref="multipleTable"
                                            @selection-change="problemPartsChange"
                                            height="100%"
                                            style="width: 100%; height: 100%"
                                            :header-row-style="{
                        height: '38px',
                      }"
                                            :header-cell-style="{
                        padding: '0px',
                      }"
                                            :row-style="{ height: '34px' }"
                                            :cell-style="{ padding: '0px' }"
                                        >
                                            <el-table-column type="selection" width="55"></el-table-column>
                                            <el-table-column
                                                prop="assemProduct"
                                                label="装入件图号/产品图号"
                                                width="170"
                                            ></el-table-column>
                                            <el-table-column prop="qty" label="数量" width="80"></el-table-column>
                                            <el-table-column
                                                prop="serialNumber"
                                                label="合格证号"
                                                width="170"
                                            ></el-table-column>
                                            <el-table-column label="质量问题描述">
                                                <template slot-scope="scope">
                                                    <p
                                                        v-if="!scope.row.isChange"
                                                        v-text="scope.row.description"
                                                    ></p>
                                                    <el-input
                                                        size="mini"
                                                        style="width: 100%"
                                                        placeholder="请输入内容"
                                                        v-if="scope.row.isChange"
                                                        v-model="scope.row.description"
                                                    ></el-input>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="abnormalQuality_btn">
                            <el-button size="small" @click="OnPreservation" type="primary">保存</el-button>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <!----------- 技术文档弹框 ------------->
        <el-dialog :visible.sync="TechnicalDocumentation" width="70%">
            <div style="height: 50px">
                <el-button
                    type="primary"
                    class="dialog_Close"
                    @click="AddToDocument"
                    :disabled="statusA === '已提交'"
                >上传文档</el-button>
            </div>
            <div style="height: 300px">
                <el-table
                    ref="multipleTable"
                    border
                    :data="TechnicalOnAddArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                >
                    <el-table-column prop="name" label="文档名称"></el-table-column>
                    <!-- <el-table-column prop="url" label="路径"></el-table-column> -->
                    <el-table-column label="操作" width="175">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="SeeFile(scope.$index, scope.row)"
                            >查看文档</el-button>
                            <el-button
                                type="primary"
                                size="mini"
                                @click="OnDeleteFile(scope.$index, scope.row)"
                                :disabled="statusA === '已提交'"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!---------- 上传文档预览弹框 ---------->
        <el-dialog :visible.sync="TechnicaltFeame" width="50%">
            <div class="ExportStyle">
                <input v-model="index_Technical" type="text" class="text" />
                <input type="file" class="file" @change="AddToDocumentFormData" ref="clear" />
                <button class="preview">预览</button>
                <div class="title">
                    <span class="title_sapn">*注：</span>
                    文件大小不能超过100M
                </div>
            </div>
            <div class="dialog_footer">
                <el-button
                    class="dialog_Close"
                    type="primary"
                    v-loading.fullscreen.lock="Loading"
                    @click="OnDocumentAddSave"
                >保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.abnormalQuality {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.abnormalQuality .abnormalQuality_list {
    height: 200px;
    margin-bottom: 10px;
}
.abnormalQuality .abnormalQuality_table {
    height: 100%;
}

.detailedinfo {
    /* height: 850px; */
    margin-bottom: 15px;
}

.abnormalQualityInformation {
    height: 45px;
}
.abnormalQualityTitle {
    height: 40%;
}
.process {
    width: 58%;
    float: left;
    /* text-indent: 10px; */
    /* font-size: 12px; */
    line-height: 40px;
    height: 100%;
}
.process_head {
    height: 40px;
    overflow: hidden;
}
.process_head .process_title {
    float: left;
    /* text-indent: 10px; */
    font-size: 14px;
    line-height: 40px;
    color: #606266;
}
.process_head .process_search {
    float: right;
}
.process_table {
    height: -moz-calc(100% - 40px); /* WebKit */
    height: -webkit-calc(100% - 40px); /* Opera */
    height: -o-calc(100% - 40px); /* Standard */
    height: calc(100% - 40px);
}
.processTableContents {
    height: 100%;
}
.serialNumber {
    width: 28%;
    height: 100%;
    float: left;
    /* font-size: 14px; */
    line-height: 40px;
    margin: 0 1%;
}
.serialNumber_head {
    height: 40px;
    overflow: hidden;
}
.serialNumber_head .serialNumber_title {
    float: left;
    /* text-indent: 10px; */
    font-size: 14px;
    line-height: 40px;
    color: #606266;
}
.serialNumber_head .serialNumber_button {
    float: right;
}
.serialNumber_table {
    height: -moz-calc(100% - 40px); /* WebKit */
    height: -webkit-calc(100% - 40px); /* Opera */
    height: -o-calc(100% - 40px); /* Standard */
    height: calc(100% - 40px);
}
.serialNumberTableContents {
    height: 100%;
}
.problemParts {
    width: 87%;
    /* font-size: 12px; */
    line-height: 40px;
    height: 100%;
    overflow: hidden;
}
.problemParts_head {
    height: 40px;
    overflow: hidden;
}
.problemParts_head .problemParts_title {
    float: left;
    /* text-indent: 10px; */
    font-size: 14px;
    line-height: 40px;
    color: #606266;
}
.problemParts_head .problemParts_button {
    float: right;
}
.problemParts_table {
    height: -moz-calc(100% - 40px); /* WebKit */
    height: -webkit-calc(100% - 40px); /* Opera */
    height: -o-calc(100% - 40px); /* Standard */
    height: calc(100% - 40px);
}
.problemPartsTableContents {
    height: 100%;
}

.abnormalQuality_btn {
    padding-top: 10px;
    box-sizing: border-box;
}
/* 上传样式 */
.ExportStyle {
    height: 160px;
}
.text {
    width: 300px;
    height: 42px;
    float: left;
    font-size: 16px;
}
.file {
    width: 100px;
    font-size: 30px;
    float: left;
    margin-left: 10px;
    opacity: 0;
    z-index: 9999999;
    position: absolute;
    /* top: 60px; */
    /* right: 110px; */
}
.file_1 {
    width: 100px;
    font-size: 30px;
    background: red;
    float: left;
    margin-left: 5px;
}
.button {
    width: 100px;
    height: 46px;
    position: absolute;
    top: 60px;
    margin-left: 120px;
}
.preview {
    width: 100px;
    height: 46px;
    position: absolute;
    top: 60px;
    margin-left: 10px;
    /* right: 110px; */
}
.title {
    width: 520px;
    position: absolute;
    margin-left: -250px;
    margin-top: -23px;
    left: 50%;
    top: 150px;
    font-size: 14px;
}
.title_sapn {
    color: red;
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
<script>
import { AssemblyPerform, BasicData } from "../../../common/api";
export default {
    data() {
        return {
            instructId: this.$route.query.instructId,
            instructionId: this.$route.query.instructionId,
            orderId: this.$route.query.orderId,
            TableHeight: {
                height: ""
            },
            detailedInformationHeight: {
                height: ""
            },
            tableDataOne: [],
            tableDataOneState: [
                {
                    name: "未提交",
                    id: "0"
                },
                {
                    name: "已提交",
                    id: "1"
                }
            ],
            tableDataTwo: [],
            tableDataThree: [],
            tableDataFour: [],
            disabled: false,
            serialNumberSelection: [],
            problemPartsSelection: [],
            problemPartsSelectionArray: [],
            qualityForm: {
                number: "",
                workNum: "",
                name: "",
                staff: "", // 工艺人员
                accountabilityUnit: "", //责任单位
                faultCode: "" // 故障代码
            },
            qualityFormArr: [], //
            processForm: {
                search: ""
            },
            productNum: {
                amount: ""
            },
            description: "",
            activeName: "first",
            TheWhole: {},
            TheWholearr: [],
            TechnicalDocumentation: false, //技术文档弹框
            TechnicaltFeame: false,
            ViewID: "", //技术文档id
            formData_Technical: "", // 导入技术文档
            index_Technical: "",
            Loading: false,
            TechnicalOnAddArr: [],
            statusA: "",
            AoptionTwo: [], // 责任单位
            AoptionThree: [] // 整机异常
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.detailedInformation(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.detailedInformation); //在生命周期里面监听浏览器变化
        this.processList();
        this.getAOptionOneInfo(); // 责任单位
        this.getAOptionTwoInfo(); // 整机异常
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 10 + "px";
        },
        detailedInformation() {
            this.detailedInformationHeight.height =
                window.innerHeight - 600 + "px";
        },
        // 责任单位
        getAOptionOneInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 11
                    }
                })
                .then(res => {
                    that.AoptionTwo = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 整机异常
        getAOptionTwoInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 8
                    }
                })
                .then(res => {
                    that.AoptionThree = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 渲染列表
        processList() {
            let that = this;
            let url = AssemblyPerform.GET_A_findBy;
            that.axios
                .get(url, {
                    params: {
                        instructId: that.instructId,
                        instructionId: that.instructionId,
                        orderId: that.orderId,
                        condetion: that.processForm.search
                    }
                })
                .then(res => {
                    that.tableDataTwo = res.data.assemList;
                    that.qualityForm.workNum = res.data.sortieNo;
                    that.qualityForm.name =
                        res.data.instructionList[0].instructName;

                    that.qualityFormArr = res.data.instructionList;

                    this.OnQueryQualityRecordSheet();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查询质量记载单
        OnQueryQualityRecordSheet() {
            this.axios
                .get(AssemblyPerform.GET_A_QueryQualityRecordSheet, {
                    params: {
                        instructionId: this.qualityFormArr[0].instructionId
                    }
                })
                .then(res => {
                    this.tableDataOne = res.data;
                    this.tableDataOne.map(ite => {
                        this.tableDataOneState.map(val => {
                            if (ite.AB_STATUS == val.id) {
                                ite.AB_STATUS = val.name;
                            }
                        });
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //删除质量记载单
        OnDeleteQualityRecordShee(index, row) {
            this.$confirm("确认删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.axios
                        .get(AssemblyPerform.GET_A_DeleteQualityRecordSheet, {
                            params: {
                                abnormalNum: row.ABNORMAL_NUM
                            }
                        })
                        .then(res => {
                            console.log(res.data);
                            if (res.data.success === true) {
                                this.$message({
                                    //成功后的提示
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });

                                this.OnQueryQualityRecordSheet();
                            } else if (res.data.success === false) {
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
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 查看
        OnviewQualityRecordShee(index, row) {
            console.log(index, row);
            this.axios
                .get(AssemblyPerform.GET_A_viewQualityRecordShee, {
                    params: {
                        abnormalNum: row.ABNORMAL_NUM
                    }
                })
                .then(res => {
                    this.tableDataFour = res.data;
                    this.qualityForm.number = res.data[0].abnormalNum;
                    this.qualityForm.staff = res.data[0].person;
                    if (res.data[0].abStatus != 1) {
                        this.tableDataFour.map(val => {
                            //循环让table 可以修改数量
                            val.isChange = true;
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //提交
        OnSubmit(index, row) {
            this.$confirm("确认提交？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.axios
                        .get(AssemblyPerform.GET_A_Submit, {
                            params: {
                                abnormalNum: row.ABNORMAL_NUM
                            }
                        })
                        .then(res => {
                            console.log(res.data);
                            if (res.data.success === true) {
                                this.$message({
                                    //成功后的提示
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });

                                this.OnQueryQualityRecordSheet();
                            } else if (res.data.success === false) {
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
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //整机异常
        OnTheWhole() {
            this.axios
                .get(AssemblyPerform.GET_A_TheWhole, {
                    params: {
                        instructionId: this.qualityFormArr[0].instructionId
                    }
                })
                .then(res => {
                    res.data.map(dnf => {
                        this.tableDataFour.push(dnf);
                    });
                    this.tableDataFour.map(val => {
                        //循环让table 可以修改数量
                        val.isChange = true;
                    });
                    let obj = {};
                    let Arry = [];
                    Arry = this.tableDataFour.reduce((item, next) => {
                        obj[next.serialNumber || next.assemProduct]
                            ? " "
                            : (obj[next.serialNumber || next.assemProduct] =
                                  true && item.push(next));
                        return item;
                    }, []);
                    this.tableDataFour = Arry;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 工序装入件 - 查询
        submitSearch() {
            let that = this;
            that.processList();
        },
        // 工序装入件 - 重置
        resetForm(formName) {
            let that = this;
            that.$refs[formName].resetFields();
            that.processList();
        },
        // 产品序号 - 渲染
        processClick(row) {
            let that = this;
            let url = AssemblyPerform.GET_A_findNumber;
            let data = {
                instructId: that.instructId,
                orderId: that.orderId,
                assemProduct: row.assemProduct,
                assemName: row.assemName,
                version: row.version
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.tableDataThree = res.data;
                    // that.tableDataThree.map((item) => {
                    //   if (item.serialNumber != undefined) {
                    //     return (that.disabled = true);
                    //   } else {
                    //     return (that.disabled = false);
                    //   }
                    // });
                    that.productNum.amount = "1";
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 产品序号 - 添加
        productNumAdd() {
            let that = this;
            if (this.serialNumberSelection.length == 0) {
                that.$message.error("请先至少选择一项");
            } else {
                that.tableDataThree.map(item => {
                    if (item.serialNumber != undefined) {
                        if (item.amount < that.productNum.amount) {
                            that.$message.error("数量不能超过" + item.amount);
                        } else {
                            item.qty = that.productNum.amount;
                            that.serialNumberSelection.map(i => {
                                that.tableDataFour.push(i);
                            });
                        }
                    } else {
                        if (that.productNum.amount == "") {
                            that.$message.error("数量不能为空");
                        } else {
                            if (item.amount < that.productNum.amount) {
                                that.$message.error(
                                    "数量不能超过" + item.amount
                                );
                            } else {
                                item.qty = that.productNum.amount;
                                that.serialNumberSelection.map(j => {
                                    that.tableDataFour.push(j);
                                });
                            }
                        }
                    }
                });
            }
            let obj = {};
            let Arry = [];
            Arry = that.tableDataFour.reduce((item, next) => {
                obj[next.serialNumber || next.assemProduct]
                    ? " "
                    : (obj[next.serialNumber || next.assemProduct] =
                          true && item.push(next));
                return item;
            }, []);
            that.tableDataFour = Arry;
        },
        // 问题零件信息 - 删除
        partDel() {
            for (let i = 0; i < this.tableDataFour.length; i++) {
                const element = this.tableDataFour[i];
                element.completeId = i;
            }
            if (this.problemPartsSelection.length == 0)
                this.$message.error("请先至少选择一项");
            this.problemPartsSelection.forEach(element => {
                this.tableDataFour.forEach((e, i) => {
                    if (element.completeId == e.completeId) {
                        this.tableDataFour.splice(i, 1);
                    }
                });
            });
        },
        serialNumberChange(val) {
            this.serialNumberSelection = val;
            this.serialNumberSelection.map(val => {
                //循环让table 可以修改数量
                val.isChange = true;
            });
        },
        problemPartsChange(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            } else {
                this.problemPartsSelection = val.pop(); //储存新的单选数据
                if (this.problemPartsSelection != undefined) {
                    this.problemPartsSelectionArray = [];
                    this.problemPartsSelectionArray.push(
                        this.problemPartsSelection
                    );
                }
            }
        },

        //保存
        OnPreservation() {
            if (
                this.qualityForm.accountabilityUnit === "" ||
                this.qualityForm.faultCode === ""
            ) {
                this.$message({
                    message: "责任单位和故障代码不能为空",
                    type: "warning",
                    duration: 1500
                });
            } else if (this.problemPartsSelectionArray.length < 1) {
                this.$message({
                    message: "请选择问题零件信息",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.axios({
                    method: "post",
                    url:
                        AssemblyPerform.GET_A_preservation +
                        "?instructionId=" +
                        this.qualityFormArr[0].instructionId +
                        "&responsibleUnit=" +
                        this.qualityForm.accountabilityUnit +
                        "&errorCode=" +
                        this.qualityForm.faultCode +
                        "&abnormalNum=" +
                        this.qualityForm.number,
                    data: this.problemPartsSelectionArray
                })
                    .then(res => {
                        if (res.data.success === true) {
                            this.$message({
                                //成功后的提示
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });

                            this.OnQueryQualityRecordSheet();
                            this.tableDataFour = [];
                        } else if (res.data.success === false) {
                            this.$message({
                                //失败后的提示
                                message: res.data.message,
                                type: "error",
                                duration: 1500
                            });
                        }
                        this.EquipmentArr = res.data.list;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        //上传
        ViewDocument(index, row) {
            this.ViewID = row.ABNORMAL_ID;
            this.statusA = row.AB_STATUS;
            this.TechnicalDocumentation = true;
            this.OnAddArr();
        },
        //获取全部文件
        OnAddArr() {
            this.axios
                .get(
                    BasicData.GET_D_QueryFile +
                        "?dataId=" +
                        this.ViewID +
                        "&category=ABNORMAL"
                )
                .then(res => {
                    this.TechnicalOnAddArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //上传文档
        AddToDocument() {
            this.TechnicaltFeame = true;
        },
        //技术文档转换FormData AddToFormData
        AddToDocumentFormData() {
            this.formData_Technical = new window.FormData(); // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
            this.formData_Technical.append(
                "filename",
                document.querySelector("input[type=file]").files[0]
            );
            this.index_Technical = document.querySelector(
                "input[type=file]"
            ).files[0].name;
            this.$refs.clear.value = "";
        },
        OnDocumentAddSave() {
            var options = {
                // 设置axios的参数
                url:
                    BasicData.GET_D_DocumentAddSave +
                    "?dataId=" +
                    this.ViewID +
                    "&category=ABNORMAL",
                data: this.formData_Technical,
                method: "post",
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }; //'userfile'是formData这个对象的键名
            if (this.index_Technical != "") {
                this.axios(options).then(res => {
                    if (res.data.success === true) {
                        this.$message({
                            //成功后的提示
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        this.TechnicaltFeame = false;
                        this.OnAddArr();
                    } else {
                        this.$message({
                            //失败后的提示
                            message: res.data.message,
                            type: "error",
                            duration: 1500
                        });
                        this.TechnicaltFeame = false;
                    }
                }); // 发送请求
            } else {
                this.$message({
                    //成功后的提示
                    message: "请选择文件",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //删除文件
        OnDeleteFile(index, row) {
            this.$confirm("确认删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.axios
                        .get(
                            BasicData.GET_D_DeleteFile +
                                "?id=" +
                                row.id +
                                "&dataId=" +
                                this.ViewID +
                                "&category=ABNORMAL"
                        )
                        .then(res => {
                            if (res.data.success === true) {
                                this.$message({
                                    //成功后的提示
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });

                                this.OnAddArr();
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
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //查看文件
        SeeFile(index, row) {
            window.open(row.url);
        },
        // 物料呼叫
        MaterialCall() {
            this.$router.push({
                path: "/MaterialCall"
            });
        },
        // 返回
        returnWork() {
            this.$router.push({
                name: "Workers",
                query: {
                    instructId: this.instructId,
                    instructionId: this.instructionId,
                    orderId: this.orderId
                }
            });
        }
    }
};
</script>
