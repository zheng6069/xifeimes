<template>
    <div>
        <div class="allowpostattach">
            <div class="ExportStyle">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="名称">
                        <el-input v-model="user" placeholder="请输入名称"></el-input>
                    </el-form-item>
                </el-form>
                <input v-model="index_Technical" type="text" class="text" />
                <input type="file" class="file" @change="AddToDocumentFormData" ref="clear" />
                <el-button type="success" size="medium" class="preview">预览</el-button>
                <el-button type="success" size="medium" class="button" @click="OnDocumentAddSave">上传</el-button>
                <div class="title">
                    <span class="title_sapn">*注：</span>
                    文件大小不能超过100M
                </div>
            </div>
            <div style="height:500px;width: 600px;margin:0 auto;">
                <el-table
                    border
                    :data="RecordSixData"
                    height="100%"
                    style="width: 100%;height:100%;"
                >
                    <el-table-column prop="fileName" label="文档名称"></el-table-column>
                    <el-table-column label="操作" width="175">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="SeeFile(scope.row)">查看文档</el-button>
                            <el-button size="mini" @click="delFile(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import { AssemblyPerform } from "../../../common/api";
export default {
    props: ["accessory"],
    data() {
        return {
            sortieNo: "",
            drawNo: "",
            titleName: "",
            index_Technical: "",
            formData_Technical: "",
            RecordSixData: [],
            user: ""
        };
    },
    created() {},
    mounted() {},
    computed: {},
    watch: {
        accessory(newName) {
            let { sortieNo, drawNo } = newName;
            this.sortieNo = sortieNo;
            this.drawNo = drawNo;
        },
        user() {
            this.user = localStorage.getItem("nodeName");
            // console.log(this.user, "kkkkkkkkkkkkkk");
        }
    },
    methods: {
        RecordSixList() {
            let that = this;
            that.axios
                .get(AssemblyPerform.GET_V_findFile, {
                    params: {
                        sortieNo: that.sortieNo,
                        category: "RESUME",
                        nodeName: localStorage.getItem("nodeName")
                    }
                })
                .then(res => {
                    this.RecordSixData = res.data.tInstructFiles;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //技术文档转换FormData AddToFormData  GET_V_findFile
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
            let options = {
                // 设置axios的参数
                url:
                    AssemblyPerform.GET_V_uploadFile +
                    "?sortieNo=" +
                    this.sortieNo +
                    "&drawNo=" +
                    this.drawNo +
                    "&nodeName=" +
                    this.user,
                data: this.formData_Technical,
                method: "post",
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }; //'userfile'是formData这个对象的键名
            if (this.index_Technical != "" || this.user != "") {
                this.axios(options).then(res => {
                    if (res.data.success == true) {
                        this.$message({
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        this.RecordSixList();
                        this.index_Technical = "";
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: "error",
                            duration: 1500
                        });
                    }
                }); // 发送请求
            } else {
                this.$message({
                    //成功后的提示
                    message: "请选择文件及填写名称",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        SeeFile(row) {
            window.open(row.fileUrl);
            console.log(row);
        },
        delFile(row) {
            let that = this;
            that.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    that.axios
                        .get(AssemblyPerform.GET_V_delFile, {
                            params: {
                                instructFileId: row.instructFileId,
                                category: "RESUME"
                            }
                        })
                        .then(res => {
                            console.log(res.data, "dsfsd");
                            if (res.data.success == true) {
                                that.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                that.RecordSixList();
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
        }
    }
};
</script>
<style scoped>
.el-input {
    width: 282px;
}
/* 更改element-UI按钮样式 */
.el-button {
    color: #fff;
    background-color: #009688;
    border-color: #009688;
}
.el-button:hover {
    color: #fff;
    background-color: #0bb3a2;
    border-color: #0bb3a2;
}
.el-button:focus {
    color: #fff;
    background-color: #0bb3a2;
    border-color: #0bb3a2;
}
/* 上传样式 */
.ExportStyle {
    height: 160px;
    width: 600px;
    margin: 0 auto;
}
.text {
    width: 282px;
    height: 36px;
    font-size: 16px;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    color: #606266;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    margin-left: 40px;
    text-indent: 10px;
}
.file {
    width: 70px;
    font-size: 30px;
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
    position: absolute;
    margin-left: 95px;
}
.preview {
    position: absolute;
    margin-left: 10px;
}
.title {
    width: 520px;
    position: absolute;
    margin-left: 100px;
    font-size: 14px;
}
.title_sapn {
    color: red;
}
</style>
