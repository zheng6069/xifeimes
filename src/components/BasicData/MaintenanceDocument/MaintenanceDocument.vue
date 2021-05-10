<template>
    <div class="container">
        <div class="MdSearch">
            <el-form :inline="true" :model="MdSearchform" class="demo-form-inline" size="medium">
                <el-form-item label class="item">
                    <el-input v-model="MdSearchform.project" placeholder="名称、类型" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="
              nowPages = 1;
              MdSearchSubmit();
            "
                    >查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-button type="primary" @click="MdSearchAdd" size="medium">新增</el-button>
        <div class="Md_contnet" :style="TableHeight">
            <div class="Md_contnet_table">
                <el-table
                    border
                    :data="MdTableData"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="fileName" label="文档名称"></el-table-column>
                    <el-table-column prop="device" label="适用设备"></el-table-column>
                    <el-table-column prop="equipmentType" label="适用设备类型"></el-table-column>
                    <el-table-column prop="description" label="文档描述"></el-table-column>
                    <el-table-column label="操作" width="240">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="MdUpdate(scope.row)">修改</el-button>
                            <el-button type="primary" size="mini" @click="MdDel(scope.row)">删除</el-button>
                            <el-button type="primary" size="mini" @click="MdLook(scope.row)">查看文档</el-button>
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
        <!-- 新增 -->
        <el-dialog title :visible.sync="MaintenanceDocumentFrame" width="60%">
            <div class="AdvanElasticFrame_top">
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="120px">
                    <el-form-item label="文档名称" prop="MdName" class="AdvanTesting">
                        <el-input v-model="ruleForm.MdName" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="适用设备类型" prop="MdType" class="AdvanTesting">
                        <el-select
                            v-model="ruleForm.MdType"
                            @change="FacilityName"
                            size="medium"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in OptionType"
                                :key="item.facilityType"
                                :label="item.facilityType"
                                :value="item.facilityType"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="适用设备" prop="MdFacility" class="AdvanTesting">
                        <el-select v-model="ruleForm.MdFacility" size="medium" placeholder="请选择">
                            <el-option
                                v-for="item in OptionName"
                                :key="item.facilityName"
                                :label="item.facilityName"
                                :value="item.facilityName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文档描述" prop="MdDescribe" class="Advan">
                        <el-input
                            type="textarea"
                            v-model="ruleForm.MdDescribe"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="MaintenanceDocumentFrame = false">取 消</el-button>
                <el-button @click="AddSave('ruleForm')" type="primary">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog title :visible.sync="MaintenanceUpdateFrame" width="60%">
            <div class="AdvanElasticFrame_top">
                <el-form
                    :model="UpdateForm"
                    ref="UpdateForm"
                    :rules="UpdateRules"
                    label-width="120px"
                >
                    <el-form-item label="文档名称" prop="MdNames" class="AdvanTesting">
                        <el-input v-model="UpdateForm.MdNames" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="适用设备类型" prop="MdTypes" class="AdvanTesting">
                        <el-select
                            v-model="UpdateForm.MdTypes"
                            @change="facilityUpdateName"
                            size="medium"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in OptionType"
                                :key="item.facilityType"
                                :label="item.facilityType"
                                :value="item.facilityType"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="适用设备" prop="MdFacilitys" class="AdvanTesting">
                        <el-select v-model="UpdateForm.MdFacilitys" size="medium" placeholder="请选择">
                            <el-option
                                v-for="item in OptionName"
                                :key="item.facilityName"
                                :label="item.facilityName"
                                :value="item.facilityName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文档描述" prop="MdDescribes" class="Advan">
                        <el-input
                            type="textarea"
                            v-model="UpdateForm.MdDescribes"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="MaintenanceUpdateFrame = false">取 消</el-button>
                <el-button @click="updateSave('UpdateForm')" type="primary">确 定</el-button>
            </div>
        </el-dialog>
        <!----------- 技术文档弹框 ------------->
        <el-dialog title :visible.sync="TechnicalDocument" width="60%">
            <div style="height: 50px">
                <el-button class="dialog_Close" type="primary" @click="fileAddTrue">新增</el-button>
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
                    <el-table-column prop="url" label="路径"></el-table-column>
                    <el-table-column label="操作" width="175">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="SeeFile(scope.row)">查看文档</el-button>
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
        <!---------- 技术文档预览弹框 ---------->
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
import { BasicData } from "../../../common/api";
export default {
    data() {
        return {
            MdSearchform: {
                project: "" // 查询
            },
            TableHeight: {
                height: ""
            },
            MdTableData: [],
            MaintenanceDocumentFrame: false, // 新增弹框
            MaintenanceUpdateFrame: false, // 修改弹框
            ruleForm: {
                MdName: "", // 文档名称
                MdFacility: "", // 适用设备
                MdType: "", // 适用设备类型
                MdDescribe: "" // 文档描述
            },
            UpdateForm: {
                MdNames: "", // 文档名称
                MdFacilitys: "", // 适用设备
                MdTypes: "", // 适用设备类型
                MdDescribes: "" // 文档描述
            },
            TechnicalDocument: false, // 技术文档弹框
            TechnicalOnAddArr: [],
            multipleTable: [],
            TechnicaltFeame: false, // 技术文档预览框
            index_Technical: "",
            Loading: false,
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            UpdateArr: [],
            ViewID: "",
            OptionType: [], // 适用设备类型
            OptionName: [], // 适用设备
            rules: {
                //验证
                MdName: [
                    // 文档名称
                    {
                        required: true,
                        message: "请输入文档名称",
                        trigger: "blur"
                    }
                ]
            },
            UpdateRules: {
                //验证
                MdNames: [
                    // 文档名称
                    {
                        required: true,
                        message: "请输入文档名称",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.MdSearchSubmit();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 160 + "px";
        },
        // 查询
        MdSearchSubmit() {
            let that = this;
            let queryData = {
                pageNum: that.nowPages,
                pageSize: that.pageSize,
                condetion: that.MdSearchform.project
            };
            that.axios
                .post(BasicData.GET_K_Query, queryData)
                .then(res => {
                    that.MdTableData = res.data.records;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.MdSearchSubmit();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.MdSearchSubmit();
        },
        // 查看文档
        MdLook(row) {
            this.ViewID = row.fileId;
            this.TechnicalDocument = true;
            this.OnAddArr();
        },
        // 新增
        MdSearchAdd() {
            this.ruleForm.MdName = "";
            this.ruleForm.MdFacility = "";
            this.ruleForm.MdType = "";
            this.ruleForm.MdDescribe = "";
            this.FacilityType();
            this.MaintenanceDocumentFrame = true;
        },
        // 适用设备类型
        FacilityType() {
            let that = this;
            that.axios
                .get(BasicData.GET_K_findFacilityType)
                .then(res => {
                    that.OptionType = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 适用设备
        FacilityName() {
            let that = this;
            that.axios
                .get(
                    BasicData.GET_K_findFacilityName +
                        "?FacilityType=" +
                        that.ruleForm.MdType
                )
                .then(res => {
                    that.OptionName = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        facilityUpdateName() {
            let that = this;
            that.axios
                .get(
                    BasicData.GET_K_findFacilityName +
                        "?FacilityType=" +
                        that.UpdateForm.MdTypes
                )
                .then(res => {
                    that.OptionName = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 新增弹框-保存
        AddSave(ruleForm) {
            let that = this;
            that.$refs[ruleForm].validate(valid => {
                if (valid) {
                    let addData = {
                        fileName: that.ruleForm.MdName,
                        device: that.ruleForm.MdFacility,
                        equipmentType: that.ruleForm.MdType,
                        description: that.ruleForm.MdDescribe
                    };
                    that.axios
                        .post(BasicData.GET_K_AddAndSave, addData)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    showClose: true,
                                    message: "新增成功",
                                    type: "success"
                                });
                                that.MaintenanceDocumentFrame = false;
                                that.MdSearchSubmit();
                            } else {
                                that.$message({
                                    showClose: true,
                                    message: "新增失败",
                                    type: "success"
                                });
                            }
                            that.$refs[ruleForm].resetFields();
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
        // 删除
        MdDel(row) {
            let that = this;
            let url = BasicData.GET_K_Del + "?fileId=" + row.fileId;
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
                                    message: "删除成功!"
                                });
                                that.MdSearchSubmit();
                            } else {
                                that.$message({
                                    type: "error",
                                    message: "删除失败!"
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
        // 修改弹框
        MdUpdate(row) {
            this.MaintenanceUpdateFrame = true;
            this.FacilityType();
            this.UpdateArr = row;
            this.UpdateForm.MdNames = this.UpdateArr.fileName;
            this.UpdateForm.MdFacilitys = this.UpdateArr.device;
            this.UpdateForm.MdTypes = this.UpdateArr.equipmentType;
            this.UpdateForm.MdDescribes = this.UpdateArr.description;
        },
        // 修改弹框 - 保存
        updateSave(UpdateForm) {
            let that = this;
            that.$refs[UpdateForm].validate(valid => {
                if (valid) {
                    let UpdateData = {
                        fileId: that.UpdateArr.fileId,
                        fileName: that.UpdateForm.MdNames,
                        device: that.UpdateForm.MdFacilitys,
                        equipmentType: that.UpdateForm.MdTypes,
                        description: that.UpdateForm.MdDescribes
                    };
                    that.axios
                        .post(BasicData.GET_K_UpdateAndSave, UpdateData)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    showClose: true,
                                    message: "修改成功",
                                    type: "success"
                                });
                                that.MaintenanceUpdateFrame = false;
                                that.MdSearchSubmit();
                            } else {
                                that.$message({
                                    showClose: true,
                                    message: "修改失败",
                                    type: "error"
                                });
                            }
                            that.$refs[UpdateForm].resetFields();
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
        fileAddTrue() {
            this.index_Technical = "";
            this.TechnicaltFeame = true;
        },
        //获取全部文件
        OnAddArr() {
            this.axios
                .get(
                    BasicData.GET_D_QueryFile +
                        "?dataId=" +
                        this.ViewID +
                        "&category=REPAIR"
                )
                .then(res => {
                    this.TechnicalOnAddArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查看文档
        SeeFile(row) {
            window.open(row.url);
        },
        // 删除文档
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
                                this.ViewID +
                                "&category=REPAIR"
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
                    "&category=REPAIR",
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
                    }
                }); // 发送请求
            } else {
                this.$message({
                    message: "请选择文件",
                    type: "warning",
                    duration: 1500
                });
            }
        }
    }
};
</script>

<style>
.MdSearch .item .el-form-item__label {
    font-size: 16px;
    color: #000000;
}
.Md_contnet {
    width: 100%;
}
.MdSearch {
    height: 50px;
}
.Md_contnet_table {
    height: 100%;
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
.Advan {
    width: 570px;
    float: left;
    margin-left: 10px;
}
.Advan div {
    width: 450px;
}
.AdvanTesting div {
    width: 160px;
}
/* form表单之间的间距样式 */
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

.Advan_Mderation_bnt {
    margin-right: 10px;
}

.Advan_contnet {
    width: 100%;
}
.Advan_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.DetectPaging {
    height: 50px;
    margin-top: 5px;
}

.ExportStyle {
    height: 160px;
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