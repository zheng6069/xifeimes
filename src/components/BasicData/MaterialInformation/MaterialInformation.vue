<template>
    <div>
        <div class="Material_head">
            <div class="Material_head_left">
                <p>名称</p>
                <div>
                    <el-input v-model="QueryName" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <el-button
                @click="
          nowPages = 1;
          OnQuery();
        "
                size="medium"
                type="primary"
                class="Material_head_bnt"
            >查询</el-button>
        </div>

        <div class="Material_operation">
            <el-button
                size="medium"
                type="primary"
                @click="NewlyAdded"
                class="Material_operation_bnt"
            >新增</el-button>
            <el-button
                @click="Import"
                size="medium"
                type="primary"
                class="Material_operation_bnt"
            >导入</el-button>
            <el-button
                @click="Export"
                size="medium"
                type="primary"
                class="Material_operation_bnt"
            >导出模板</el-button>
        </div>

        <div class="Material_contnet" :style="TableHeight">
            <div class="Material_contnet_table">
                <el-table
                    border
                    :data="QueryArr"
                    height="100%"
                    style="width: 100%;height:100%; "
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column prop="materialsName" label="物料名称"></el-table-column>
                    <el-table-column prop="product" label="图号"></el-table-column>
                    <el-table-column prop="certificateNo" label="合格证号"></el-table-column>
                    <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                    <el-table-column prop="warehouse" label="库房"></el-table-column>
                    <el-table-column prop="position" label="库位"></el-table-column>
                    <el-table-column prop="format" label="规格"></el-table-column>
                    <el-table-column prop="manufacturer" label="供应商"></el-table-column>
                    <el-table-column prop="qty" label="数量" width="70"></el-table-column>
                    <el-table-column prop="qtyUnit" label="单位"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="OnPaging"
                :current-page="nowPages"
                :page-size="pageSize"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
        <!----------- 导入 ------------->
        <el-dialog :visible.sync="ExportFeame" width="50%">
            <div class="ExportStyle">
                <input v-model="index_text" type="text" class="text" />
                <input type="file" class="file" @change="change" ref="clear" />
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
                    @click="OnImportSave"
                >保 存</el-button>
            </div>
        </el-dialog>

        <!-- 新增 -->
        <el-dialog :visible.sync="ElasticFrame" width="70%">
            <div class="MaterialNewlyAdded">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    size="medium"
                    label-width="120px"
                >
                    <el-form-item label="物料名称" prop="MaterialName" class="MaterialNewlyAddedBox">
                        <el-input v-model="ruleForm.MaterialName" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="供应商" prop="supplier" class="MaterialNewlyAddedBox">
                        <el-input v-model="ruleForm.supplier" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="图号" prop="DrawingNo" class="MaterialNewlyAddedBox">
                        <el-input v-model="ruleForm.DrawingNo" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="架次号" prop="SortieNos" class="MaterialNewlyAddedBox">
                        <el-input v-model="ruleForm.SortieNos" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="合格证号" prop="certificateNos" class="MaterialNewlyAddedBox">
                        <el-input v-model="ruleForm.certificateNos" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="库房" prop="StorageRoom" class="MaterialNewlyAddedBox">
                        <el-input v-model="ruleForm.StorageRoom" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="库位" prop="Location" class="MaterialNewlyAddedBox">
                        <el-input v-model="ruleForm.Location" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="规格" prop="Specifications" class="MaterialNewlyAddedBox">
                        <el-input v-model="ruleForm.Specifications" placeholder="请输入" clearable></el-input>
                    </el-form-item>

                    <el-form-item label="数量" prop="number" class="MaterialNewlyAddedBox">
                        <el-input v-model.number="ruleForm.number" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="Company" class="MaterialNewlyAddedBox">
                        <el-input v-model="ruleForm.Company" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="MaterialNewlyAdded_btn">
                <el-button
                    class="MaterialNewlyAdded_Close"
                    @click="AddAndSave('ruleForm')"
                    type="primary"
                >确 定</el-button>
                <el-button class="MaterialNewlyAdded_Close" @click="Close">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Material_head {
    height: 60px;
    overflow: hidden;
}
.Material_head_left {
    width: 230px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Material_head_left p {
    width: 60px;
    float: left;
    line-height: 36px;
}
.Material_head_left div {
    width: 170px;
    float: left;
}
.Material_head_bnt {
    margin-top: 10px;
    margin-left: 10px;
}

.Material_operation {
    height: 50px;
}

.Material_operation_nei {
    width: 100%;
    height: 100%;
}

.Material_operation_bnt {
    margin-left: 10px;
}

.Material_contnet {
    width: 100%;
}
.Material_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.MaterialNewlyAdded {
    height: 220px;
}

.MaterialNewlyAddedBox {
    width: 300px;
    float: left;
}

.MaterialNewlyAddedBox div {
    width: 170px;
}

.MaterialNewlyAdded_btn {
    height: 40px;
}
.MaterialNewlyAdded_Close {
    float: right;
    margin-right: 10px;
}

.DetectPaging {
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
            ruleForm: {
                MaterialName: "", //物料名称
                supplier: "", //供应商
                DrawingNo: "", //图号
                StorageRoom: "", //库房
                Location: "", //库位
                Specifications: "", //规格
                number: "", //数量、
                Company: "", //单位
                SortieNos: "", //单位
                certificateNos: ""
            },
            rules: {
                //验证
                MaterialName: [
                    //物料名称
                    {
                        required: true,
                        message: "请输入物料名称",
                        trigger: "blur"
                    }
                ],
                supplier: [
                    //供应商
                    { required: true, message: "请输入供应商", trigger: "blur" }
                ],
                DrawingNo: [
                    //图号
                    { required: true, message: "请输入图号", trigger: "blur" }
                ],
                StorageRoom: [
                    //库房
                    { required: true, message: "请输入库房", trigger: "change" }
                ],
                Location: [
                    //库位
                    { required: true, message: "请输入库位", trigger: "change" }
                ],
                number: [
                    //数量
                    { required: true, message: "请输入数量" },
                    { type: "number", message: "数量为正整数" }
                ],
                Specifications: [
                    //规格
                    { required: true, message: "请输入规格", trigger: "blur" }
                ],
                Company: [
                    //单位
                    { required: true, message: "请输入单位", trigger: "blur" }
                ],
                SortieNos: [
                    //架次
                    { required: true, message: "请输入架次号", trigger: "blur" }
                ],
                certificateNos: [
                    //合格证号
                    {
                        required: true,
                        message: "请输入合格证号",
                        trigger: "blur"
                    }
                ]
            },
            add: [],

            ElasticFrame: false, //是否隐藏弹框
            ExportFeame: false, //导入弹框
            TableHeight: {
                height: ""
            },

            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数

            Loading: false,
            formData: "", // 导入文件
            index_text: "",
            filename: "物料信息导出模板", //导出文件名称
            warehouseIdAdd: "",
            optionsFour: [], // 库房
            optionsFive: [] // 库位
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
        //查询
        OnQuery() {
            this.axios({
                method: "post",
                url: BasicData.GET_C_Query,
                data: {
                    pageNum: this.nowPages, //当前页
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
            this.nowPages = nowPages;
            this.OnQuery();
        },
        //新增
        NewlyAdded() {
            this.ElasticFrame = true;
            this.ruleForm.MaterialName = ""; //物料名称
            this.ruleForm.supplier = ""; //供应商
            this.ruleForm.DrawingNo = ""; //图号
            this.ruleForm.StorageRoom = ""; //库房
            this.ruleForm.Location = ""; //库位
            this.ruleForm.Specifications = ""; //规格
            this.ruleForm.number = ""; //数量、
            this.ruleForm.Company = ""; //单位
            this.ruleForm.SortieNos = ""; //架次
            this.ruleForm.certificateNos = ""; //合格证号
        },
        //新增保存
        AddAndSave(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios({
                        method: "post",
                        url: BasicData.GET_C_AddAndSave,
                        data: {
                            materialsName: this.ruleForm.MaterialName, //物料名称
                            manufacturer: this.ruleForm.supplier, //供应商
                            product: this.ruleForm.DrawingNo, //图号
                            warehouse: this.ruleForm.StorageRoom, //库房
                            position: this.ruleForm.Location, //库位
                            format: this.ruleForm.Specifications, //规格
                            qty: this.ruleForm.number, //数量、
                            qtyUnit: this.ruleForm.Company, //单位
                            certificateNo: this.ruleForm.certificateNos, //合格证号
                            sortieNo: this.ruleForm.SortieNos //架次
                        }
                    })
                        .then(res => {
                            if (res.data.success == true) {
                                this.$message({
                                    //成功后的提示
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                this.ElasticFrame = false;
                                this.OnQuery();
                                this.$refs[formName].resetFields();
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
                    console.log("error submit!!");
                    return false;
                }
            });
        },

        //关闭
        Close() {
            this.ElasticFrame = false;
        },
        //导出
        Export() {
            this.$confirm("确认导出模板？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    import("../../../../src/common/js/Export2Excel").then(
                        excel => {
                            const tHeader = [
                                "名称",
                                "图号",
                                "库房",
                                "库位",
                                "规格",
                                "供应商",
                                "数量",
                                "单位",
                                "架次号",
                                "合格证号"
                            ];
                            const filterVal = [];
                            this.listLoading = true;

                            const list = this.add;
                            const data = this.formatJson(filterVal, list);
                            var date = new Date();
                            var seperator1 = "-";
                            var year = date.getFullYear();
                            var month = date.getMonth() + 1;
                            var strDate = date.getDate();
                            if (month >= 1 && month <= 9) {
                                month = "0" + month;
                            }
                            if (strDate >= 0 && strDate <= 9) {
                                strDate = "0" + strDate;
                            }
                            var currentdate =
                                year +
                                seperator1 +
                                month +
                                seperator1 +
                                strDate;
                            console.log(currentdate);
                            excel.export_json_to_excel({
                                header: tHeader,
                                data,
                                filename: this.filename,
                                autoWidth: this.autoWidth,
                                bookType: this.bookType
                            });

                            setTimeout(() => {
                                this.listLoading = false;
                            }, 1.5 * 1000);
                        }
                    );
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 用户数据转成Json格式
        formatJson(filterVal, jsonData) {
            console.info(jsonData);
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === "timestamp") {
                        // console.log('1')
                        // return parseTime(v[j]);
                    } else {
                        return v[j];
                    }
                })
            );
        },

        //导入
        Import() {
            this.ExportFeame = true;
            this.index_text = "";
        },
        //转换FormData
        change() {
            this.formData = new window.FormData(); // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
            this.formData.append(
                "filename",
                document.querySelector("input[type=file]").files[0]
            );
            this.index_text = document.querySelector(
                "input[type=file]"
            ).files[0].name;
            this.$refs.clear.value = "";
        },
        //导入保存ExportSave
        OnImportSave() {
            var options = {
                // 设置axios的参数
                url: BasicData.GET_C_Import,
                data: this.formData,
                method: "post",
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }; //'userfile'是formData这个对象的键名
            if (this.index_text != "") {
                this.axios(options).then(res => {
                    if (res.data.success === true) {
                        this.$message({
                            //成功后的提示
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        this.ExportFeame = false;
                        this.OnQuery();
                    } else if (res.data.success === false) {
                        this.$message({
                            //失败后的提示
                            message: res.data.message,
                            type: "error",
                            duration: 1500
                        });
                        this.ExportFeame = false;
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
        }
    }
};
</script>
