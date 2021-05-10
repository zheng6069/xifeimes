<template>
    <div class="container">
        <div class="MdSearch">
            <el-form :inline="true" :model="MdSearchform" class="demo-form-inline" size="medium">
                <el-form-item label class="item">
                    <el-input v-model="MdSearchform.project" placeholder="名称、图号/牌号" clearable></el-input>
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
                    <el-table-column prop="stuffName" label="物料名称"></el-table-column>
                    <el-table-column prop="product" label="图号/牌号"></el-table-column>
                    <el-table-column prop="format" label="规格"></el-table-column>
                    <el-table-column prop="madeBy" label="材料"></el-table-column>
                    <el-table-column prop="assemType" label="属性">
                        <template slot-scope="scope">
                            <span v-if="scope.row.assemType == 0">标准件</span>
                            <span v-else-if="scope.row.assemType == 1">结构件</span>
                            <span v-else-if="scope.row.assemType == 2">成品</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" :show-overflow-tooltip="true">
                        <template slot-scope="{ row }">
                            <span>{{ row.remarks }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="MdUpdate(scope.row)">修改</el-button>
                            <el-button type="primary" size="mini" @click="MdDel(scope.row)">删除</el-button>
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
                    <el-form-item label="物料名称" prop="one" class="AdvanTesting">
                        <el-input v-model="ruleForm.one" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="图号/牌号" prop="two" class="AdvanTesting">
                        <el-input v-model="ruleForm.two" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="规格" prop="three" class="AdvanTesting">
                        <el-input v-model="ruleForm.three" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="材料" prop="four" class="AdvanTesting">
                        <el-input v-model="ruleForm.four" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="属性" prop="five" class="AdvanTesting">
                        <el-select v-model="ruleForm.five" placeholder="活动区域">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" prop="six" class="Advan">
                        <el-input
                            type="textarea"
                            v-model="ruleForm.six"
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
                    <el-form-item label="物料名称" prop="one" class="AdvanTesting">
                        <el-input v-model="UpdateForm.one" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="图号/牌号" prop="two" class="AdvanTesting">
                        <el-input v-model="UpdateForm.two" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="规格" prop="three" class="AdvanTesting">
                        <el-input v-model="UpdateForm.three" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="材料" prop="four" class="AdvanTesting">
                        <el-input v-model="UpdateForm.four" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="属性" prop="five" class="AdvanTesting">
                        <el-select v-model="UpdateForm.five" placeholder="活动区域">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" prop="six" class="Advan">
                        <el-input
                            type="textarea"
                            v-model="UpdateForm.six"
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
                one: "", //名称
                two: "", // 图号/牌号
                three: "", // 规格
                four: "", // 材料
                five: "", // 属性
                six: "" // 备注
            },
            UpdateForm: {
                one: "", //名称
                two: "", // 图号/牌号
                three: "", // 规格
                four: "", // 材料
                five: "", // 属性
                six: "" // 备注
            },
            TechnicalOnAddArr: [],
            multipleTable: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            UpdateArr: [],
            ViewID: "",
            rules: {
                //验证
                one: [
                    // 物料名称
                    {
                        required: true,
                        message: "请输入物料名称",
                        trigger: "blur"
                    }
                ],
                two: [
                    // 图号/牌号
                    {
                        required: true,
                        message: "请输入图号/牌号",
                        trigger: "blur"
                    }
                ],
                three: [
                    // 规格
                    { required: true, message: "请输入规格", trigger: "blur" }
                ],
                five: [
                    // 属性
                    { required: true, message: "请输入属性", trigger: "change" }
                ]
            },
            UpdateRules: {
                //验证
                one: [
                    // 物料名称
                    {
                        required: true,
                        message: "请输入物料名称",
                        trigger: "blur"
                    }
                ],
                two: [
                    // 图号/牌号
                    {
                        required: true,
                        message: "请输入图号/牌号",
                        trigger: "blur"
                    }
                ],
                three: [
                    // 规格
                    { required: true, message: "请输入规格", trigger: "blur" }
                ],
                five: [
                    // 属性
                    { required: true, message: "请输入属性", trigger: "change" }
                ]
            },
            options: [
                {
                    value: 0,
                    label: "标准件"
                },
                {
                    value: 1,
                    label: "结构件"
                },
                {
                    value: 2,
                    label: "成品"
                }
            ]
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
                .post(BasicData.GET_Y_findAllStuff, queryData)
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
        // 新增
        MdSearchAdd() {
            this.ruleForm.one = "";
            this.ruleForm.two = "";
            this.ruleForm.three = "";
            this.ruleForm.four = "";
            this.ruleForm.five = "";
            this.ruleForm.six = "";
            this.MaintenanceDocumentFrame = true;
        },
        // 新增弹框-保存
        AddSave(ruleForm) {
            let that = this;
            that.$refs[ruleForm].validate(valid => {
                if (valid) {
                    that.axios
                        .post(BasicData.GET_Y_addStuff, {
                            stuffName: this.ruleForm.one,
                            product: this.ruleForm.two,
                            format: this.ruleForm.three,
                            madeBy: this.ruleForm.four,
                            assemType: this.ruleForm.five,
                            remarks: this.ruleForm.six
                        })
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                that.MaintenanceDocumentFrame = false;
                                that.$refs[ruleForm].resetFields();
                                that.MdSearchSubmit();
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
        // 删除
        MdDel(row) {
            let that = this;
            let url = BasicData.GET_Y_deleteStuff + "?stuffId=" + row.stuffId;
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
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                that.MdSearchSubmit();
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
            this.UpdateArr = row;
            this.UpdateForm.one = row.stuffName;
            this.UpdateForm.two = row.product;
            this.UpdateForm.three = row.format;
            this.UpdateForm.four = row.madeBy;
            this.UpdateForm.five = row.assemType;
            this.UpdateForm.six = row.remarks;
        },
        // 修改弹框 - 保存
        updateSave(UpdateForm) {
            let that = this;
            that.$refs[UpdateForm].validate(valid => {
                if (valid) {
                    that.axios
                        .post(BasicData.GET_Y_updateStuff, {
                            stuffId: this.UpdateArr.stuffId,
                            stuffName: this.UpdateForm.one,
                            product: this.UpdateForm.two,
                            format: this.UpdateForm.three,
                            madeBy: this.UpdateForm.four,
                            assemType: this.UpdateForm.five,
                            remarks: this.UpdateForm.six
                        })
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                that.MaintenanceUpdateFrame = false;
                                that.$refs[UpdateForm].resetFields();
                                that.MdSearchSubmit();
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
        }
    }
};
</script>

<style>
.MdSearch .item .el-form-item__label {
    font-size: 16px;
    color: #000000;
}
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
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