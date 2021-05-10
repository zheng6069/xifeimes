<template>
    <div class="BomMaximum">
        <!-- <el-backtop target=".BomMaximum">
      <i class="el-icon-caret-top"></i>
        </el-backtop>-->
        <div class="ProductDrawingNo" :style="TableHeight">
            <p class="ProductDrawingNo_p">产品图号</p>
            <div class="ProductDrawingNo_tree">
                <el-tree
                    style="height:100%;"
                    :data="treeData"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    :default-expand-all="true"
                ></el-tree>
            </div>
        </div>
        <div class="MaterialInformation">
            <p class="MaterialInformation_p">
                {{ titleName }}
                <el-button @click="OnReturn" size="mini" type="primary" style="float: right;">返回</el-button>
            </p>
            <div class="MaterialInformation_table">
                <!-- 内容 -->
                <!-- 报工记录 -->
                <my-recordone v-bind:sortieNo="sortieNo" v-show="oneShow" ref="childOne"></my-recordone>
                <!-- 质量记录表 -->
                <my-recordtwo
                    v-bind:parameter="{
            sortieNo: sortieNo,
            workFlowId: workFlowId,
            workId: workId,
            workNo: workNo,
          }"
                    v-show="twoShow"
                    ref="childTwo"
                ></my-recordtwo>
                <!-- 质量异常记录表 -->
                <my-recordthree
                    v-bind:abnormal="{
            sortieNo: sortieNo,
            drawNo: drawing,
          }"
                    v-show="threeShow"
                    ref="childThree"
                ></my-recordthree>
                <!-- 配套表 -->
                <my-recordfour
                    v-bind:mating="{
            sortieNo: sortieNo,
            workId: workId,
          }"
                    v-show="fourShow"
                    ref="childFour"
                ></my-recordfour>
                <!-- 工艺更改单 -->
                <my-recordfive
                    v-bind:changeOrder="{
            sortieNo: sortieNo,
          }"
                    v-show="fiveShow"
                    ref="childFive"
                ></my-recordfive>
                <!-- 上传附件 -->
                <div class="allowpostattach" v-show="sixShow">
                    <div class="ExportStyle">
                        <el-form :inline="true" class="demo-form-inline">
                            <el-form-item label="名称">
                                <el-input style="width:282px" v-model="user" placeholder="请输入名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type="primary"
                                    size="medium"
                                    v-show="isShow"
                                    @click="nameSave"
                                >保存</el-button>
                            </el-form-item>
                        </el-form>
                        <input v-model="index_Technical" type="text" class="text" disabled />
                        <input type="file" class="file" @change="AddToDocumentFormData" ref="clear" />
                        <el-button type="success" size="medium" class="preview">预览</el-button>
                        <el-button
                            type="primary"
                            size="medium"
                            class="fileBtn"
                            @click="OnDocumentAddSave"
                        >上传</el-button>
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
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="SeeFile(scope.row)"
                                    >查看文档</el-button>
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="delFile(scope.row)"
                                    >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { AssemblyPerform } from "../../../common/api";
import RecordOne from "./RecordOne";
import RecordTwo from "./RecordTwo";
import RecordThree from "./RecordThree";
import RecordFour from "./RecordFour";
import RecordFive from "./RecordFive";
// import RecordSix from "./RecordSix";
export default {
    data() {
        return {
            drawing: this.$route.query.drawing,
            sortieNo: this.$route.query.sortieNo,
            workFlowId: this.$route.query.workFlowId,
            workId: this.$route.query.workId,
            workNo: this.$route.query.workNo,
            TableHeight: {
                height: ""
            },
            treeData: [],
            defaultProps: {
                children: "children",
                label: "nodeName"
            },
            ClickArr: [],
            oneShow: false, // 报工记录
            twoShow: false, // 质量记录表
            threeShow: false, // 质量异常记录表
            fourShow: false, // 配套表
            fiveShow: false, // 工艺更改单
            sixShow: false, // 上传附件 2不展示 1展示
            titleName: "",
            index_Technical: "",
            formData_Technical: "",
            RecordSixData: [],
            user: "",
            isShow: false,
            pid: "",
            treeNames: "",
            headName: ""
        };
    },
    created() {
        this.OnQuery();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    components: {
        "my-recordone": RecordOne,
        "my-recordtwo": RecordTwo,
        "my-recordthree": RecordThree,
        "my-recordfour": RecordFour,
        "my-recordfive": RecordFive
        // "my-recordsix":RecordSix
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 20 + "px";
        },
        //查询
        OnQuery() {
            this.axios
                .get(AssemblyPerform.GET_V_findAllTreeList, {
                    params: {
                        drawNo: this.drawing,
                        sortieNo: this.sortieNo
                    }
                })
                .then(res => {
                    if (res.data.success == false) {
                        this.$message({
                            message: res.data.message,
                            type: "error",
                            duration: 1500
                        });
                    } else {
                        let treeNode = [];
                        let parentNode = res.data[0].head;
                        let children = res.data[0].body;
                        treeNode.push(parentNode);
                        this.$set(treeNode[0], "children", children);
                        this.treeData = treeNode;
                        this.headName = res.data[0].head.nodeName;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //点击节点控制页面
        handleNodeClick(data) {
            if (data.nodeName == "报工记录") {
                this.titleName = data.nodeName;
                this.oneShow = true; // 报工记录
                this.twoShow = false; // 质量记录表
                this.threeShow = false; // 质量异常记录表
                this.fourShow = false; // 配套表
                this.fiveShow = false; // 工艺更改单
                this.sixShow = false; // 上传附件
                this.$refs.childOne.RecordOneList();
            } else if (data.nodeName == "质量记录表") {
                this.titleName = data.nodeName;
                this.oneShow = false; // 报工记录
                this.twoShow = true; // 质量记录表
                this.threeShow = false; // 质量异常记录表
                this.fourShow = false; // 配套表
                this.fiveShow = false; // 工艺更改单
                this.sixShow = false; // 上传附件
                this.$refs.childTwo.RecordTwoList();
            } else if (data.nodeName == "质量异常记录") {
                this.titleName = data.nodeName;
                this.oneShow = false; // 报工记录
                this.twoShow = false; // 质量记录表
                this.threeShow = true; // 质量异常记录表
                this.fourShow = false; // 配套表
                this.fiveShow = false; // 工艺更改单
                this.sixShow = false; // 上传附件
                this.$refs.childThree.RecordThreeList();
            } else if (data.nodeName == "配套表") {
                this.titleName = data.nodeName;
                this.oneShow = false; // 报工记录
                this.twoShow = false; // 质量记录表
                this.threeShow = false; // 质量异常记录表
                this.fourShow = true; // 配套表
                this.fiveShow = false; // 工艺更改单
                this.sixShow = false; // 上传附件
                this.$refs.childFour.RecordFourList();
            } else if (data.nodeName == "工艺更改单") {
                this.titleName = data.nodeName;
                this.oneShow = false; // 报工记录
                this.twoShow = false; // 质量记录表
                this.threeShow = false; // 质量异常记录表
                this.fourShow = false; // 配套表
                this.fiveShow = true; // 工艺更改单
                this.sixShow = false; // 上传附件
                this.$refs.childFive.RecordFiveeList();
            } else if (data.showFlag == 1) {
                this.titleName = data.nodeName;
                this.pid = data.pid;
                this.oneShow = false; // 报工记录
                this.twoShow = false; // 质量记录表
                this.threeShow = false; // 质量异常记录表
                this.fourShow = false; // 配套表
                this.fiveShow = false; // 工艺更改单
                this.sixShow = true; // 上传附件
                if (data.pid != 0) {
                    this.user = data.nodeName;
                    this.index_Technical = "";
                    this.isShow = true;
                } else {
                    this.user = "";
                    this.isShow = false;
                    this.index_Technical = "";
                }
                this.RecordSixList();
            }
        },
        RecordSixList() {
            let that = this;
            that.axios
                .get(AssemblyPerform.GET_V_findFile, {
                    params: {
                        sortieNo: that.sortieNo,
                        category: "RESUME",
                        nodeName: that.titleName
                    }
                })
                .then(res => {
                    if (res.data.tInstructFiles.length == 0) {
                        if (this.pid == 1) {
                            this.OnQuery();
                            this.titleName = this.headName;
                            this.user = "";
                        }
                        this.RecordSixData = res.data.tInstructFiles;
                    } else {
                        this.RecordSixData = res.data.tInstructFiles;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 名称 修改
        nameSave() {
            let that = this;
            if (that.user != "") {
                that.axios
                    .get(AssemblyPerform.GET_V_updateNodeName, {
                        params: {
                            newNodeName: that.user,
                            nodeName: that.titleName
                        }
                    })
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            that.titleName = this.user;
                            that.OnQuery();
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
                that.$message({
                    message: "名称不能为空",
                    type: "warning",
                    duration: 1500
                });
            }
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
            if (this.pid == 1) {
                if (this.titleName == this.headName) {
                    this.treeNames = this.user;
                } else {
                    this.treeNames = this.titleName;
                }
            } else {
                this.treeNames = this.user;
            }
            let options = {
                // 设置axios的参数
                url:
                    AssemblyPerform.GET_V_uploadFile +
                    "?sortieNo=" +
                    this.sortieNo +
                    "&drawNo=" +
                    this.drawing +
                    "&nodeName=" +
                    this.treeNames +
                    "&pid=" +
                    this.pid,
                data: this.formData_Technical,
                method: "post",
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }; //'userfile'是formData这个对象的键名
            if (this.index_Technical != "" && this.user != "") {
                this.axios(options).then(res => {
                    if (res.data.success == true) {
                        this.$message({
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        if (this.pid == 0) {
                            this.OnQuery();
                            this.index_Technical = "";
                            this.user = "";
                        } else {
                            this.RecordSixList();
                            this.index_Technical = "";
                        }
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
                            if (res.data.success == true) {
                                that.$message({
                                    type: "success",
                                    message: res.data.message
                                });
                                that.RecordSixList();
                            } else {
                                that.$message({
                                    type: "error",
                                    message: res.data.message
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
        //返回
        OnReturn() {
            this.$router.push({
                path: "ReferenceSamplesHome"
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
.field {
    display: flex;
    height: 40px;
    border: 1px solid #ebeef5;
}
.fieldName {
    flex: 2;
    line-height: 40px;
    text-align: center;
    border-right: 1px solid #ebeef5;
}
.fieldContent {
    flex: 3;
    line-height: 40px;
    text-align: center;
}
.BomMaximum {
    padding: 10px;
}
.ProductDrawingNo {
    width: 20%;
    height: 100%;
    float: left;
}
.ProductDrawingNo_p {
    height: 30px;
    width: 100%;
}
.ProductDrawingNo_tree {
    width: 100%;
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
    border: 1.5px solid #f1f1f1;
    box-sizing: border-box;
}
.MaterialInformation {
    width: -moz-calc(80% - 10px); /* WebKit */
    width: -webkit-calc(80% - 10px); /* Opera */
    width: -o-calc(80% - 10px); /* Standard */
    width: calc(80% - 10px);
    float: right;
    height: 100%;
}
.MaterialInformation_p {
    width: 100%;
    height: 30px;
    line-height: 30px;
}
.MaterialInformation_table {
    width: 100%;
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
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
.fileBtn {
    position: absolute;
    margin-left: 95px;
}
.preview {
    /* position: absolute; */
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
