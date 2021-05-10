<template>
    <div>
        <div class="EquipmentMA_head">
            <div class="EquipmentMA_head_left">
                <p>名称</p>
                <div>
                    <el-input v-model="QueryName" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <el-button @click="OnQuery" size="medium" type="primary" class="EquipmentMA_head_bnt">查询</el-button>
        </div>

        <div class="EquipmentMA_operation">
            <el-button
                @click="OnNewlyAdded"
                size="medium"
                type="primary"
                class="EquipmentMA_operation_bnt"
            >新增</el-button>
            <el-button
                @click="OnSee"
                size="medium"
                type="primary"
                class="EquipmentMA_operation_bnt"
            >查看</el-button>
            <el-button
                @click="OnModify"
                size="medium"
                type="primary"
                class="EquipmentMA_operation_bnt"
            >修改</el-button>
        </div>
        <!----------- 技术文档弹框 ------------->
        <el-dialog :visible.sync="TechnicalDocumentation" width="70%">
            <div style="height:50px;">
                <el-button class="dialog_Close" type="primary" @click="AddToDocument">新增</el-button>
            </div>
            <div style="height:300px;">
                <el-table
                    ref="multipleTable"
                    border
                    :data="TechnicalOnAddArr"
                    height="100%"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column prop="name" label="文档名称"></el-table-column>
                    <el-table-column prop="url" label="路径"></el-table-column>
                    <el-table-column label="操作" width="175">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="SeeFile(scope.$index, scope.row)"
                            >查看文档</el-button>
                            <el-button
                                size="mini"
                                type="primary"
                                @click="OnDeleteFile(scope.$index, scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!---------- 技术文档预览弹框 ---------->
        <el-dialog :visible.sync="ExportFeame" width="50%">
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
                <el-button class="dialog_Close" type="primary" @click="OnDocumentAddSave">保 存</el-button>
            </div>
        </el-dialog>
        <div class="EquipmentMA_contnet" :style="TableHeight">
            <div class="EquipmentMA_contnet_table">
                <el-table
                    ref="multipleTable"
                    @selection-change="Tick"
                    border
                    :data="QueryArr"
                    height="100%"
                    style="width: 100%;height:100%; "
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                    <el-table-column prop="facilityNum" label="设备编码"></el-table-column>
                    <el-table-column prop="facilityModel" label="设备型号"></el-table-column>
                    <el-table-column prop="mainType" label="维保类型"></el-table-column>
                    <el-table-column prop="mainNum" label="维保基准编号"></el-table-column>
                    <el-table-column prop="mainName" label="维保基准名称"></el-table-column>
                    <el-table-column label="操作" width="105">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="ViewDocument(scope.$index, scope.row)"
                            >查看文档</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="OnPaging"
                :page-size="pageSize"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.EquipmentMA_head {
    height: 60px;
    overflow: hidden;
}
.EquipmentMA_head_left {
    width: 230px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.EquipmentMA_head_left p {
    width: 60px;
    float: left;
    line-height: 36px;
}
.EquipmentMA_head_left div {
    width: 170px;
    float: left;
}
.EquipmentMA_head_bnt {
    /* float: right; */
    margin-top: 10px;
    margin-left: 10px;
}

.EquipmentMA_operation {
    height: 50px;
    /* padding: 0px 10px;  */
}

.EquipmentMA_operation_nei {
    width: 100%;
    height: 100%;
    /* background: #ccc; */
}

.EquipmentMA_operation_bnt {
    margin-left: 10px;
}

.EquipmentMA_contnet {
    width: 100%;
}
.EquipmentMA_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.EquipmentNewlyAdded {
    height: 300px;
}

/* form表单之间的间距样式 */
.el-form-item {
    margin-bottom: 5px;
}
.EquipmentNewlyAdded_btn {
    height: 40px;
}
.EquipmentNewlyAdded_Close {
    float: right;
    margin-right: 10px;
}

.DetectPaging {
    /* width: 100%; */
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
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
<script>
import { BasicData } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            QueryArr: [], //检测项table数据
            QueryName: "",

            TableHeight: {
                height: ""
            },
            ExportFeame: false,
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数

            DeleteArr: [], //储存勾选到的新的数组
            WorkClothesID: "", //储存勾选到的id
            TechnicalDocumentation: false,
            formData_Technical: "", // 导入技术文档
            index_Technical: "",
            ViewID: "",
            TechnicalOnAddArr: []
        };
    },
    created() {
        this.OnQuery();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 175 + "px";
        },
        //新增
        OnNewlyAdded() {
            this.$router.push({
                path: "EquipmentMaintenance"
            });
        },
        //查询全部维保信息
        OnQuery() {
            this.axios({
                method: "post",
                url: BasicData.GET_F_QueryMaintenance,
                data: {
                    pageNum: 1, //当前页
                    pageSize: this.pageSize, //第几页
                    condetion: this.QueryName //名称
                }
            })
                .then(res => {
                    this.QueryArr = res.data.list;
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
        OnPaging(nowPages) {
            this.axios({
                method: "post",
                url: BasicData.GET_F_QueryMaintenance,
                data: {
                    pageNum: nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    condetion: this.QueryName //名称
                }
            })
                .then(res => {
                    this.QueryArr = res.data.list;
                    this.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //勾选
        Tick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.DeleteArr = row.pop(); //储存新的单选数据
                if (this.DeleteArr != undefined) {
                    this.WorkClothesID = this.DeleteArr.mainId;
                }
            }
        },
        //查看
        OnSee() {
            if (this.WorkClothesID != "") {
                this.$router.push({
                    path: "EquipmentMaintenance",
                    query: {
                        EquipmentID: this.WorkClothesID,
                        EquipmentTrue: 1
                    }
                });
            } else {
                this.$message({
                    message: "请选择一条数据查看",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //修改
        OnModify() {
            if (this.WorkClothesID != "") {
                this.$router.push({
                    path: "EquipmentMaintenance",
                    query: {
                        EquipmentID: this.WorkClothesID,
                        EquipmentTrue: 0
                    }
                });
            } else {
                this.$message({
                    message: "请选择一条数据查看",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //查看技术文档
        ViewDocument(index, row) {
            this.TechnicalDocumentation = true;
            this.ViewID = row.mainId;
            this.OnAddArr();
        },
        //获取全部文件
        OnAddArr() {
            this.axios
                .get(
                    BasicData.GET_D_QueryFile +
                        "?dataId=" +
                        this.ViewID +
                        "&category=MAINTAIN"
                )
                .then(res => {
                    this.TechnicalOnAddArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //技术文档
        AddToDocument() {
            this.ExportFeame = true;
            this.index_Technical = "";
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
        //添加保存OnAddSave
        OnDocumentAddSave() {
            var options = {
                // 设置axios的参数
                url:
                    BasicData.GET_D_DocumentAddSave +
                    "?dataId=" +
                    this.ViewID +
                    "&category=MAINTAIN",
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
                        this.ExportFeame = false;
                        this.OnAddArr();
                    } else {
                        this.$message({
                            //失败后的提示
                            message: res.data.message,
                            type: "error",
                            duration: 1500
                        });
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

        //查看文件
        SeeFile(index, row) {
            window.open(row.url);
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
                                "&category=MAINTAIN"
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
        }
    }
};
</script>
