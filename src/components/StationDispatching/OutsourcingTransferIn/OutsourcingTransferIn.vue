<template>
    <div>
        <div class="OuteIn_head">
            <div class="OuteIn_head_left" style="width: 250px">
                <p style="width: 90px">协作指令号</p>
                <div style="width: 160px">
                    <el-input
                        style="width: 160px"
                        v-model="InstructionNumber"
                        size="medium"
                        placeholder="请输入"
                        clearable
                    ></el-input>
                </div>
            </div>
            <div class="OuteIn_head_left" style="width: 260px">
                <p style="width: 100px">协作指令名称</p>
                <div style="width: 160px">
                    <el-input
                        style="width: 160px"
                        v-model="InstructionName"
                        size="medium"
                        placeholder="请输入"
                        clearable
                    ></el-input>
                </div>
            </div>
            <div class="OuteIn_head_left">
                <p>架次号</p>
                <div>
                    <el-input v-model="SortieNumber" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="OuteIn_head_left" style="width: 240px">
                <p style="width: 70px">协作单位</p>
                <div>
                    <el-input v-model="CooperationUnit" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>

            <el-button
                @click="
          nowPages = 1;
          OnQuery();
        "
                size="medium"
                type="primary"
                class="OuteIn_head_bnt"
            >查询</el-button>
        </div>
        <div class="OuteIn_contnet" :style="TableHeight">
            <div class="OuteIn_contnet_table">
                <el-table
                    ref="multipleTable"
                    border
                    :data="QueryArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="workNo" label="工单号" width="180"></el-table-column>
                    <el-table-column prop="product" label="产品图号"></el-table-column>
                    <el-table-column prop="sortieNo" label="架次号" width="150"></el-table-column>
                    <el-table-column prop="aoNo" label="AO编号" width="180"></el-table-column>
                    <el-table-column prop="stationName" label="站位号" width="100"></el-table-column>
                    <el-table-column prop="instructNum" label="协作指令号" width="250"></el-table-column>
                    <el-table-column prop="instructName" label="协作指令名称" width="180"></el-table-column>
                    <el-table-column prop="outUnit" label="协作单位" width="160"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="OnToChangeInto(scope.row)"
                            >转入</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="handleSizeChange"
                :page-size="pageSize"
                @current-change="OnPaging"
                :current-page="nowPages"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>

        <!----------- 转入弹框 ------------->
        <el-dialog :visible.sync="TechnicalDocumentation" width="70%">
            <div style="height: 50px">
                <el-button class="OuteIn_PopUpBtn" @click="AddToDocument" type="primary">新增</el-button>
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
                                @click="OnDeleteFile(scope.$index, scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="height: 55px; margin-top: 10px">
                <div class="OuteIn_PopUpInp">
                    <p>操作人</p>
                    <div>
                        <el-input
                            v-model="personnel"
                            style="width: 100%"
                            clearable
                            placeholder="请输入"
                        ></el-input>
                    </div>
                </div>
                <div class="OuteIn_PopUpDes">
                    <p>备注</p>
                    <div>
                        <el-input
                            v-model="remarks"
                            style="width: 100%"
                            type="textarea"
                            placeholder="请输入"
                        ></el-input>
                    </div>
                </div>
            </div>
            <div style="height: 40px; margin-top: 10px">
                <el-button
                    type="primary"
                    @click="OnPreservation"
                    class="OuteIn_PopUpBtn"
                    v-loading.fullscreen.lock="Loading"
                >保 存</el-button>
            </div>
        </el-dialog>
        <!---------- 技术文档预览弹框 ---------->
        <el-dialog :visible.sync="TechnicaltFeame" width="50%">
            <div class="ExportStyle">
                <input v-model="index_Technical" type="text" class="text" />
                <input ref="aaa" type="file" class="file" @change="AddToDocumentFormData" />
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
                    element-loading-text="上传中请稍后"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    @click="OnDocumentAddSave"
                >保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { dispatchingManagement, BasicData } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            InstructionNumber: "", //协作指令号
            InstructionName: "", //协作指令名称
            SortieNumber: "", //架次号
            CooperationUnit: "", //协作单位
            QueryArr: [], //检测项table数据

            TableHeight: {
                height: ""
            },
            DeleteArr: [],
            outId: "",
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数

            TechnicalDocumentation: false, //转入弹框
            TechnicaltFeame: false, //技术文档

            Loading: false,

            formData_Technical: "", // 导入技术文档
            index_Technical: "",
            TechnicalOnAddArr: [],
            personnel: "", //操作人
            remarks: "" //备注
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OnQuery();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 120 + "px";
        },
        //查询
        OnQuery() {
            this.axios({
                method: "post",
                url: dispatchingManagement.GET_L_Queryt,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    instructNum: this.InstructionNumber, //协作指令号
                    instructName: this.InstructionName, //协作指令名称
                    sortieNo: this.SortieNumber, //架次号
                    outUnit: this.CooperationUnit, //协作单位
                    outStatus: 2 //转入
                }
            })
                .then(res => {
                    this.QueryArr = res.data.records;
                    this.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //切换每页展示多少条数据
        handleSizeChange(val) {
            this.pageSize = val;
            this.OnQuery();
        },
        //分页
        OnPaging(val) {
            this.nowPages = val;
            this.OnQuery();
        },
        //转入
        OnToChangeInto(row) {
            this.outId = row.outId;
            this.TechnicalDocumentation = true;
            this.OnAddArr();
        },
        //技术文档
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
            this.$refs.aaa.value = "";
        },
        //获取全部文件
        OnAddArr() {
            this.axios
                .get(
                    BasicData.GET_D_QueryFile +
                        "?dataId=" +
                        this.outId +
                        "&category=OUTSOURCING"
                )
                .then(res => {
                    this.TechnicalOnAddArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //添加保存OnAddSave
        OnDocumentAddSave() {
            var options = {
                // 设置axios的参数
                url:
                    BasicData.GET_D_DocumentAddSave +
                    "?dataId=" +
                    this.outId +
                    "&category=OUTSOURCING",
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
                        this.index_Technical = "";
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
                                row.dataId +
                                "&category=OUTSOURCING"
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
        //转入保存
        OnPreservation() {
            if (this.personnel != "") {
                this.axios({
                    method: "post",
                    url: dispatchingManagement.GET_L_ToChangeInto,
                    data: {
                        unitPerson: this.personnel, //操作人
                        remarks: this.remarks, //备注
                        outId: this.outId //id
                    }
                })
                    .then(res => {
                        if (res.data.success === true) {
                            this.$message({
                                //成功后的提示
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });

                            this.TechnicalDocumentation = false;
                            (this.personnel = ""), //操作人
                                (this.remarks = ""), //备注
                                this.OnQuery();
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
            } else {
                this.$message({
                    message: "请添加操作人",
                    type: "warning",
                    duration: 1500
                });
            }
        }
    }
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.OuteIn_head {
    height: 60px;
    overflow: hidden;
}
.OuteIn_head_left {
    width: 230px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.OuteIn_head_left p {
    width: 60px;
    float: left;
    line-height: 36px;
}
.OuteIn_head_left div {
    width: 170px;
    float: left;
}
.OuteIn_head_bnt {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}
.shiftBtn {
    margin-left: 10px;
}
.OuteIn_contnet {
    width: 100%;
}
.OuteIn_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.DetectPaging {
    height: 45px;
    padding: 0px 10px;
    margin-top: 5px;
}

.OuteIn_PopUpBtn {
    float: right;
}
.OuteIn_PopUpInp {
    width: 37%;
    float: left;
    overflow: hidden;
}
.OuteIn_PopUpInp p {
    width: 60px;
    float: left;
    line-height: 40px;
}
.OuteIn_PopUpInp div {
    float: left;
    width: -webkit-calc(100% - 60px);
    width: -moz-calc(100% - 60px);
    width: calc(100% - 60px);
}
.OuteIn_PopUpDes {
    width: 61%;
    float: right;
}
.OuteIn_PopUpDes p {
    width: 40px;
    float: left;
    line-height: 40px;
}
.OuteIn_PopUpDes div {
    float: left;
    width: -webkit-calc(100% - 40px);
    width: -moz-calc(100% - 40px);
    width: calc(100% - 40px);
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
    top: 60px;
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
