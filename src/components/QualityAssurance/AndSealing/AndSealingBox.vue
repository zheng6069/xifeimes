<template>
    <div>
        <div class="And_Search">
            <el-form :inline="true" class="demo-form-inline" size="medium">
                <el-form-item label="质量记载单号" class="item">
                    <el-input placeholder v-model="one" disabled></el-input>
                </el-form-item>
                <el-form-item label="工单号" class="item">
                    <el-input placeholder v-model="two" disabled></el-input>
                </el-form-item>
                <el-form-item label="指令号" class="item">
                    <el-input placeholder v-model="three" disabled></el-input>
                </el-form-item>
                <el-form-item label="指令名称" class="item">
                    <el-input placeholder v-model="four" disabled></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="And_contnet" :style="TableHeight">
            <div class="And_contnet_table">
                <el-table
                    border
                    :data="QueryArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="60"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="assemName" label="零部组件名称"></el-table-column>
                    <el-table-column prop="assemProduct" label="零部组件图号"></el-table-column>
                    <el-table-column prop="responsibleUnit" label="责任单位"></el-table-column>
                    <el-table-column prop="errorCode" label="故障代码"></el-table-column>
                    <el-table-column label="附件" width="105">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="MvLook(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="And_DescriptionProcessing">
            <div class="And_FaultDescription">
                <p>
                    检验组长
                    <br />处理意见
                </p>
                <div>
                    <el-input
                        class="And_FaultDescription_textarea"
                        type="textarea"
                        v-model="five"
                        disabled
                    ></el-input>
                </div>
            </div>
            <div class="And_FaultDescription">
                <p>
                    技术负责人
                    <br />处理意见
                </p>
                <div>
                    <el-input
                        class="And_FaultDescription_textarea"
                        type="textarea"
                        v-model="six"
                        disabled
                    ></el-input>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
        <div class="And_DescriptionProcessing">
            <div class="And_FaultDescription">
                <p>
                    工艺
                    <br />处理意见
                </p>
                <div>
                    <el-input
                        class="And_FaultDescription_textarea"
                        v-model="serve"
                        type="textarea"
                        disabled
                    ></el-input>
                </div>
            </div>
            <div class="And_FaultDescription">
                <p>备注</p>
                <div>
                    <el-input class="And_FaultDescription_textarea" v-model="eight" type="textarea"></el-input>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
        <div class="And_DescriptionProcessing">
            <div class="And_FaultDescription">
                <p>
                    返工/返修
                    <br />处理人
                </p>
                <div>
                    <el-input class="And_FaultDescription_textarea" v-model="nice"></el-input>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
        <div style="margin-top: 30px">
            <span>不合格品审理单信息</span>
            <el-table
                border
                class="tb-edit"
                :data="disqualificationArr"
                height="120px"
                style="width: 1000px"
                highlight-current-row
                @row-click="handleCurrentChange"
            >
                <el-table-column type="selection" width="60"></el-table-column>
                <el-table-column prop="dispositionNum" label="不合格品单号">
                    <template slot-scope="scope">
                        <el-input
                            size="small"
                            v-model="scope.row.dispositionNum"
                            placeholder="请输入内容"
                            @change="handleEdit(scope.$index, scope.row)"
                        ></el-input>
                        <span>{{ scope.row.dispositionNum }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="处理意见">
                    <template slot-scope="scope">
                        <el-select
                            size="mini"
                            @change="handleEdit(scope.$index, scope.row)"
                            v-model="scope.row.dispositionAdvice"
                        >
                            <el-option
                                v-for="item in displayOptions"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                        <span>{{ scope.row.dispositionAdvice }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="dispositionRemark" label="备注">
                    <template slot-scope="scope">
                        <el-input
                            size="small"
                            v-model="scope.row.dispositionRemark"
                            placeholder="请输入内容"
                            @change="handleEdit(scope.$index, scope.row)"
                        ></el-input>
                        <span>{{ scope.row.dispositionRemark }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="附件" width="105">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            @click="MvLookRow(scope.row)"
                            v-show="isShow"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin-top: 20px">
            <el-button type="primary" @click="AndWorkerBoxSave">保存</el-button>
            <el-button type="primary" @click="AndWorkerBoxCompletion">封闭</el-button>
            <el-button type="primary" @click="rutren">返回</el-button>
        </div>

        <el-dialog :visible.sync="TechnicalDocumentation" width="70%">
            <div style="height: 300px">
                <el-table
                    ref="multipleTable"
                    border
                    :data="TechnicalOnAddArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column prop="name" label="文档名称"></el-table-column>
                    <el-table-column label="操作" width="175">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="SeeFile(scope.row)">查看文档</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="TechnicalDocumentationRow" width="70%">
            <div style="height: 50px">
                <el-button class="dialog_Close" type="primary" @click="TechnicaltFeame = true">上传文档</el-button>
            </div>
            <div style="height: 300px">
                <el-table
                    ref="multipleTable"
                    border
                    :data="TechnicalOnAddArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column prop="name" label="文档名称"></el-table-column>
                    <el-table-column label="操作" width="175">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="SeeFileRow(scope.row)"
                            >查看文档</el-button>
                            <el-button
                                type="primary"
                                size="mini"
                                @click="OnDeleteFile(scope.row)"
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

<script>
import { AssemblyPerform, BasicData } from "../../../common/api";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            abnormalId: this.$route.query.abnormalId,
            one: "", // 质量记载单号
            two: "", // 工单号
            three: "", // 指令号
            four: "", // 指令名称
            five: "", // 检验组长处理意见
            six: "", // 技术负责人处理意见
            serve: "", // 返工信息
            eight: "", // 备注
            nice: "", // 返工/返修处理人
            QueryArr: [],
            TechnicalDocumentation: false, //技术文档弹框
            TechnicalDocumentationRow: false,
            TechnicalOnAddArr: [],
            disqualificationArr: [],
            handleEditArr: {},
            TechnicaltFeame: false,
            ViewID: "", //技术文档id
            formData_Technical: "", // 导入技术文档
            index_Technical: "",
            Loading: false,
            isShow: false,
            floorRange: [], //是否显示
            //是否显示(可以由后台返回)
            displayOptions: [],
            optionShow: false
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.AndWorkerBoxList();
        this.getOptionOneInfo();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 450 + "px";
        },
        // 查询处理结果
        getOptionOneInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 14
                    }
                })
                .then(res => {
                    that.displayOptions = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        AndWorkerBoxList() {
            this.axios({
                method: "get",
                url:
                    AssemblyPerform.GET_C_DetailedQuery +
                    "?abnormalId=" +
                    this.abnormalId
            })
                .then(res => {
                    if (res.data.dispositionlist.length == 0) {
                        this.disqualificationArr = [
                            {
                                dispositionNum: "",
                                dispositionAdvice: "",
                                dispositionRemark: ""
                            }
                        ];
                    } else {
                        this.disqualificationArr = res.data.dispositionlist;
                        this.isShow = true;
                    }
                    const resArray = [];
                    resArray.push(res.data);
                    this.QueryArr = resArray;
                    this.one = resArray[0].abnormalNum;
                    this.two = resArray[0].workNo;
                    this.three = resArray[0].instructNum;
                    this.four = resArray[0].instructName;
                    this.five = resArray[0].groupAdvice;
                    this.six = resArray[0].technicalAdvice;
                    this.serve = resArray[0].reworkInformation;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //是否显示选中的值
        display(value) {
            console.log(value);
        },
        // 查看
        MvLook(row) {
            console.log(row);
            this.TechnicalDocumentation = true;
            this.OnAddArr();
        },
        //获取全部文件
        OnAddArr() {
            this.axios
                .get(
                    BasicData.GET_D_QueryFile +
                        "?dataId=" +
                        this.abnormalId +
                        "&category=ABNORMAL"
                )
                .then(res => {
                    this.TechnicalOnAddArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查看文件
        SeeFile(row) {
            window.open(row.url);
        },
        // 查看
        MvLookRow(row) {
            console.log(row);
            this.TechnicalDocumentationRow = true;
            this.OnAddArrRow();
        },
        //获取全部文件
        OnAddArrRow() {
            this.axios
                .get(
                    BasicData.GET_D_QueryFile +
                        "?dataId=" +
                        this.abnormalId +
                        "&category=DISPOSITION"
                )
                .then(res => {
                    this.TechnicalOnAddArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查看文件
        SeeFileRow(row) {
            window.open(row.url);
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
                    this.abnormalId +
                    "&category=DISPOSITION",
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
                        this.OnAddArrRow();
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
        OnDeleteFile(row) {
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
                                this.abnormalId +
                                "&category=DISPOSITION"
                        )
                        .then(res => {
                            if (res.data.success === true) {
                                this.$message({
                                    //成功后的提示
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });

                                this.OnAddArrRow();
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
        handleCurrentChange(row, event, column) {
            console.log(row, event, column);
        },
        handleEdit(index, row) {
            this.handleEditArr = row;
            this.handleEditArr.abnormalId = this.abnormalId;
            this.handleEditArr.abnormalNum = this.one;
            this.handleEditArr.remarks = this.eight;
            if (
                this.handleEditArr.dispositionAdvice != "" ||
                this.handleEditArr.dispositionNum != "" ||
                this.handleEditArr.dispositionRemark != ""
            ) {
                this.isShow = true;
            }
        },
        // 保存
        AndWorkerBoxSave() {
            if (this.handleEditArr.abnormalId == undefined) {
                this.handleEditArr.abnormalId = this.abnormalId;
                this.handleEditArr.abnormalNum = this.one;
                this.handleEditArr.remarks = this.eight;
                this.handleEditArr.reworkPerson = this.nice;
                this.handleEditArr.dispositionAdvice = "";
                this.handleEditArr.dispositionNum = "";
                this.handleEditArr.dispositionRemark = "";
            } else {
                this.handleEditArr;
            }
            this.axios({
                method: "post",
                url: AssemblyPerform.GET_C_shutDownAbnormal,
                data: this.handleEditArr
            })
                .then(res => {
                    if (res.data.success == true) {
                        this.$message({
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        this.AndWorkerBoxList();
                    } else {
                        this.$message({
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
        // 封闭
        AndWorkerBoxCompletion() {
            if (this.handleEditArr.abnormalId == undefined) {
                this.handleEditArr.abnormalId = this.abnormalId;
                this.handleEditArr.abnormalNum = this.one;
                this.handleEditArr.remarks = this.eight;
                this.handleEditArr.reworkPerson = this.nice;
                this.handleEditArr.dispositionAdvice = "";
                this.handleEditArr.dispositionNum = "";
                this.handleEditArr.dispositionRemark = "";
                this.handleEditArr.abStatus = 6;
            } else {
                this.handleEditArr;
                this.handleEditArr.abStatus = 6;
            }
            this.axios({
                method: "post",
                url: AssemblyPerform.GET_C_shutDownAbnormal,
                data: this.handleEditArr
            })
                .then(res => {
                    if (res.data.success == true) {
                        this.$message({
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                    } else {
                        this.$message({
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
        // 返回
        rutren() {
            this.$router.push({
                path: "AndSealing"
            });
        }
    }
};
</script>

<style>
.tb-edit .el-input {
    display: none;
}

.tb-edit .el-select {
    display: none;
}

.tb-edit .current-row .el-select {
    display: block;
}

.tb-edit .current-row .el-select + span {
    display: none;
}

.tb-edit .current-row .el-input {
    display: block;
}

.tb-edit .current-row .el-input + span {
    display: none;
}
.And_Search .item .el-form-item__label {
    font-size: 16px;
    color: #000000;
}
.And_contnet {
    width: 100%;
    height: 50px;
}
.demo-form-inline {
    width: 100%;
    height: 50px;
}
.And_contnet_table {
    height: 100%;
}
.And_DetectPaging {
    height: 35px;
    margin-top: 5px;
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
    width: 80px;
    height: 100%;
    float: left;
    margin-top: 0px;
    margin-bottom: 0px;
}
.And_FaultDescription div {
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