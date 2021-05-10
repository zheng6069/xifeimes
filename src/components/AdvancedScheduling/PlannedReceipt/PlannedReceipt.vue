<template>
    <div>
        <div class="Advan_head">
            <div class="Advan_head_left">
                <p>任务号</p>
                <div>
                    <el-input v-model="orderNo" size="medium" placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="Advan_head_left">
                <p>图号</p>
                <div>
                    <el-input v-model="product" size="medium" placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="Advan_head_left">
                <p>产品名称</p>
                <div>
                    <el-input v-model="productName" size="medium" placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="Advan_head_left" style="width: 250px">
                <p style="width: 110px">计划开始时间</p>
                <div style="width: 140px">
                    <el-date-picker
                        size="medium"
                        type="date"
                        style="width: 100%"
                        @change="StartDataFn"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        v-model="startDate"
                    ></el-date-picker>
                </div>
            </div>
            <el-button
                size="medium"
                type="primary"
                class="Advan_head_bnt"
                @click="nowPages=1;QueryFunction()"
            >查询</el-button>
        </div>

        <div class="Advan_operation">
            <div class="Advan_operation_nei">
                <el-button size="medium" type="primary" @click="NewlyAdded" class="operation_bnt">新增</el-button>
                <el-button size="medium" type="primary" @click="Delete" class="operation_bnt">删除</el-button>
                <el-button size="medium" type="primary" @click="copy" class="operation_bnt">复制</el-button>
                <el-button size="medium" type="primary" @click="modify" class="operation_bnt">修改</el-button>

                <el-button
                    size="medium"
                    @click="handleDownload"
                    type="primary"
                    class="operation_bnt"
                >导出</el-button>
                <el-button size="medium" type="primary" @click="Export" class="operation_bnt">导入</el-button>
                <!-- 导入 -->
                <el-dialog :visible.sync="ExportFeame" width="50%">
                    <div class="ExportStyle">
                        <input v-model="index_text" type="text" class="text" />
                        <input type="file" class="file" @change="change" ref="clear" />
                        <button class="preview">预览</button>
                        <button
                            class="button"
                            v-loading.fullscreen.lock="Loading"
                            @click="submit"
                        >上传</button>
                        <div class="title">
                            <span class="title_sapn">*注：</span>
                            文件大小不能超过100M
                        </div>
                    </div>
                    <div class="dialog_footer">
                        <el-button class="dialog_Close" @click="close">取 消</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
        <!-- 新增 -->
        <el-dialog :visible.sync="ElasticFrame" width="70%">
            <div class="AdvanElasticFrame_top">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="任务号" prop="NewTaskNumber" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.NewTaskNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="架次号" prop="NewSortieNol" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.NewSortieNol"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="XBOM号" prop="NewXBOMNumber" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.NewXBOMNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称" prop="NewProductName" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.NewProductName"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="计划数量" prop="NewPlannedQuantity" class="AdvanTesting">
                        <el-input
                            oninput="value=value.replace(/[^\d]/g,'')"
                            v-model="ruleForm.NewPlannedQuantity"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="批次" prop="Newbatch" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.Newbatch"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="计划开始时间" prop="NewScheduledStartTime" class="AdvanTesting">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width: 100%"
                            @change="StartTime"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.NewScheduledStartTime"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item
                        label="计划完成时间"
                        prop="NewPlannedCompletionTime"
                        class="AdvanTesting"
                    >
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width: 100%"
                            @change="CompletionTime"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.NewPlannedCompletionTime"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="产品图号" prop="NewProductDrawingNo" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.NewProductDrawingNo"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="客户名称" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.NewCustomerName"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialog_footer">
                <el-button class="dialog_Close" @click="close">取 消</el-button>
                <el-button
                    class="dialog_Preservation"
                    @click="AddSave('ruleForm')"
                    type="primary"
                >确 定</el-button>
            </div>
        </el-dialog>

        <!-- 修改 -->
        <el-dialog :visible.sync="ModifyFeame" width="70%">
            <div class="AdvanElasticFrame_top" :model="ruleForm">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="任务号" prop="NewTaskNumber" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.NewTaskNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="架次号" prop="NewSortieNol" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.NewSortieNol"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="XBOM号" prop="NewXBOMNumber" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.NewXBOMNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称" prop="NewProductName" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.NewProductName"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="计划数量" prop="NewPlannedQuantity" class="AdvanTesting">
                        <el-input
                            oninput="value=value.replace(/[^\d]/g,'')"
                            v-model="ruleForm.NewPlannedQuantity"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="批次" prop="Newbatch" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.Newbatch"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="计划开始时间" prop="NewScheduledStartTime" class="AdvanTesting">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width: 100%"
                            @change="StartTime"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.NewScheduledStartTime"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item
                        label="计划完成时间"
                        prop="NewPlannedCompletionTime"
                        class="AdvanTesting"
                    >
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width: 100%"
                            @change="CompletionTime"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.NewPlannedCompletionTime"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="产品图号" prop="NewProductDrawingNo" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.NewProductDrawingNo"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="客户名称" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.NewCustomerName"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialog_footer">
                <el-button class="dialog_Close" @click="close">取 消</el-button>
                <el-button
                    class="dialog_Preservation"
                    @click="ModifySave('ruleForm')"
                    type="primary"
                >确 定</el-button>
            </div>
        </el-dialog>
        <div class="Advan_contnet" :style="TableHeight">
            <div class="Advan_contnet_table">
                <el-table
                    @selection-change="Tick"
                    border
                    :data="tableData"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="orderNo" label="任务号" width="180"></el-table-column>
                    <el-table-column prop="sortie" label="架次号"></el-table-column>
                    <el-table-column prop="xbomNumber" label="XBOM号" width="120"></el-table-column>
                    <el-table-column prop="productName" label="产品名称" width="150"></el-table-column>
                    <el-table-column prop="product" label="产品图号" width="180"></el-table-column>
                    <el-table-column prop="planQty" label="计划数量" width="100"></el-table-column>
                    <el-table-column prop="batch" label="批次" width="120"></el-table-column>
                    <el-table-column prop="customer" label="客户名称" width="180"></el-table-column>
                    <el-table-column prop="startDate" label="计划开始时间" width="160"></el-table-column>
                    <el-table-column prop="endDate" label="计划完成时间" width="160"></el-table-column>
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
    </div>
</template>

<script>
import { PlanningProduction } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            AddedDetectionAfXiang: "",
            orderNo: "",
            startDate: "",
            productName: "",
            product: "",
            tableData: [], //检测项table数据
            ElasticFrame: false, //是否隐藏新增弹框
            ModifyFeame: false, //是否隐藏修改弹框
            ExportFeame: false, //导出弹框
            ModifyId: "", //修改id
            ruleForm: {
                NewTaskNumber: "", //任务号
                NewSortieNol: "", //架次号
                NewXBOMNumber: "", //xbom号
                NewProductName: "", //产品名称
                NewProductDrawingNo: "", //产品图号
                NewPlannedQuantity: "", //计划数量
                Newbatch: "", //批次
                NewCustomerName: "", //客户名称
                NewScheduledStartTime: "", //计划开始时间
                NewPlannedCompletionTime: "" //计划完成时间
            },
            rules: {
                //验证
                NewTaskNumber: [
                    //任务号
                    { required: true, message: "请输入任务号", trigger: "blur" }
                ],
                NewSortieNol: [
                    //架次号
                    { required: true, message: "请输入架次号", trigger: "blur" }
                ],
                NewXBOMNumber: [
                    //xbom号
                    { required: true, message: "请输入XBom号", trigger: "blur" }
                ],
                NewProductName: [
                    //产品名称
                    {
                        required: true,
                        message: "请输入产品名称",
                        trigger: "blur"
                    }
                ],
                NewProductDrawingNo: [
                    //产品图号
                    {
                        required: true,
                        message: "请输入产品图号",
                        trigger: "blur"
                    }
                ],
                NewPlannedQuantity: [
                    //计划数量
                    {
                        required: true,
                        message: "请输入计划数量",
                        trigger: "blur"
                    }
                ],
                Newbatch: [
                    //批次
                    { required: true, message: "请输入批次", trigger: "blur" }
                ],
                NewScheduledStartTime: [
                    //计划开始时间
                    {
                        required: true,
                        message: "请输入计划开始时间",
                        trigger: "blur"
                    }
                ],
                NewPlannedCompletionTime: [
                    //计划完成时间
                    {
                        required: true,
                        message: "请输入计划完成时间",
                        trigger: "blur"
                    }
                ]
            },
            DeleteArr: [], //删除数组

            CheckDataArr: [],

            TableHeight: {
                height: ""
            },

            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数

            filename: "任务名称", //导出文件名称
            ChecklistStorehouseARR: [],
            formData: "",
            index_text: "",
            Loading: false
        };
    },
    created() {
        this.QueryTask();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 165 + "px";
        },
        //默认查询生产全部任务
        QueryTask() {
            this.axios({
                method: "post",
                url: PlanningProduction.GET_B_TaskList,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //每页条数
                    product: this.product, //xbom号
                    orderNo: this.orderNo, //产品名称
                    productName: this.productName, //产品图号
                    startDate: this.startDate
                }
            })
                .then(res => {
                    this.tableData = res.data.list;
                    console.log(this.tableData,'this.tableData')
                    this.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查询功能
        QueryFunction() {
            this.axios({
                method: "post",
                url: PlanningProduction.GET_B_TaskList,
                data: {
                    pageNum: this.nowPages,
                    pageSize: this.pageSize,
                    product: this.product, //xbom号
                    orderNo: this.orderNo, //产品名称
                    productName: this.productName, //产品图号
                    startDate: this.startDate
                }
            })
                .then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //分页功能
        OnPaging(val) {
            this.nowPages = val;
            this.QueryTask();
        },
        //选择每页展示多少条
        handleSizeChange(val) {
            this.pageSize = val;
            this.QueryTask();
        },

        //新增
        NewlyAdded() {
            this.ElasticFrame = true;
            this.ruleForm.NewTaskNumber = ""; //任务号
            this.ruleForm.NewSortieNol = ""; //架次号
            this.ruleForm.NewXBOMNumber = ""; //xbom号
            this.ruleForm.NewProductName = ""; //产品名称
            this.ruleForm.NewProductDrawingNo = ""; //产品图号
            this.ruleForm.NewPlannedQuantity = ""; //计划数量
            this.ruleForm.Newbatch = ""; //批次
            this.ruleForm.NewCustomerName = ""; //客户名称
            this.ruleForm.NewScheduledStartTime = ""; //计划开始时间
            this.ruleForm.NewPlannedCompletionTime = ""; //计划完成时间
        },
        //关闭弹框
        close() {
            this.ElasticFrame = false;
            this.ModifyFeame = false;
            this.ExportFeame = false;
        },
        //处理开始时间数据
        StartDataFn(Date) {
            // debugger
            this.StarthDataScope = Date;
        },
        //计划开始时间
        StartTime(Date) {
            this.ruleForm.NewScheduledStartTime = Date;
        },
        //计划完成时间
        CompletionTime(Date) {
            this.ruleForm.NewPlannedCompletionTime = Date;
        },

        //新增保存按钮
        AddSave(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios({
                        method: "post",
                        url: PlanningProduction.GET_B_Add,
                        data: {
                            orderNo: this.ruleForm.NewTaskNumber, //任务号
                            sortie: this.ruleForm.NewSortieNol, //架次号
                            xbomNumber: this.ruleForm.NewXBOMNumber, //xbom号
                            productName: this.ruleForm.NewProductName, //产品名称
                            product: this.ruleForm.NewProductDrawingNo, //产品图号
                            planQty: this.ruleForm.NewPlannedQuantity, //计划数量
                            batch: this.ruleForm.Newbatch, //批次
                            customer: this.ruleForm.NewCustomerName, //客户名称
                            startDate: this.ruleForm.NewScheduledStartTime, //计划开始时间
                            endDate: this.ruleForm.NewPlannedCompletionTime //计划完成时间
                        }
                    }).then(res => {
                        if (res.data.status === 1) {
                            this.$message({
                                //成功后的提示
                                message: res.data.errorMsg,
                                type: "success",
                                duration: 1500
                            });
                            this.ElasticFrame = false; //是否隐藏弹框
                            this.QueryTask();
                        } else if (res.data.status === 0) {
                            this.$message({
                                //失败后的提示
                                message: res.data.errorMsg,
                                type: "error",
                                duration: 1500
                            });
                        }
                    });
                } else {
                    this.$message({
                        //失败后的提示
                        message: "请完善信息",
                        type: "warning",
                        duration: 1500
                    });
                    return false;
                }
            });
        },
        //复制
        copy() {
            if (this.CheckDataArr < 1 || this.CheckDataArr == undefined) {
                this.$message({
                    //成功后的提示
                    message: "请选择一条数据复制",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.ElasticFrame = true;
                this.ruleForm.NewTaskNumber = this.CheckDataArr[0].orderNo; //任务号
                this.ruleForm.NewSortieNol = this.CheckDataArr[0].sortie; //架次号
                this.ruleForm.NewXBOMNumber = this.CheckDataArr[0].xbomNumber; //xbom号
                this.ruleForm.NewProductName = this.CheckDataArr[0].productName; //产品名称
                this.ruleForm.NewProductDrawingNo = this.CheckDataArr[0].product; //产品图号
                this.ruleForm.NewPlannedQuantity = this.CheckDataArr[0].planQty; //计划数量
                this.ruleForm.Newbatch = this.CheckDataArr[0].batch; //批次
                this.ruleForm.NewCustomerName = this.CheckDataArr[0].customer; //客户名称
                this.ruleForm.NewScheduledStartTime = this.CheckDataArr[0].startDate; //计划开始时间
                this.ruleForm.NewPlannedCompletionTime = this.CheckDataArr[0].endDate; //计划完成时间
            }
        },
        //勾选
        Tick(row) {
            this.CheckDataArr = row; //勾选导出数据
            var str = "";
            row.forEach(function(e) {
                str += e.mesTaskId + ",";
            });
            str = str.substring(0, str.length - 1);
            this.DeleteArr = str.split(",");
        },
        //删除
        Delete() {
            if (this.DeleteArr > 1 && this.DeleteArr != undefined) {
                this.$confirm("确认删除？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        console.log(this.DeleteArr);

                        this.axios({
                            method: "post",
                            url: PlanningProduction.GET_B_Delete,
                            data: this.DeleteArr
                        }).then(res => {
                            if (res.data.status === 1) {
                                this.$message({
                                    //成功后的提示
                                    message: res.data.errorMsg,
                                    type: "success",
                                    duration: 1500
                                });

                                this.QueryTask();
                            } else if (res.data.status === 0) {
                                this.$message({
                                    //失败后的提示
                                    message: res.data.errorMsg,
                                    type: "error",
                                    duration: 1500
                                });
                            }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            } else {
                this.$message({
                    //失败后的提示
                    message: "请选择一条数据删除",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //修改
        modify() {
            if (this.CheckDataArr < 1 || this.CheckDataArr == undefined) {
                this.$message({
                    //成功后的提示
                    message: "请选择一条数据进行修改",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.ModifyFeame = true;
                this.ModifyId = this.CheckDataArr[0].mesTaskId; //获取修改id
                this.ruleForm.NewTaskNumber = this.CheckDataArr[0].orderNo; //任务号
                this.ruleForm.NewSortieNol = this.CheckDataArr[0].sortie; //架次号
                this.ruleForm.NewXBOMNumber = this.CheckDataArr[0].xbomNumber; //xbom号
                this.ruleForm.NewProductName = this.CheckDataArr[0].productName; //产品名称
                this.ruleForm.NewProductDrawingNo = this.CheckDataArr[0].product; //产品图号
                this.ruleForm.NewPlannedQuantity = this.CheckDataArr[0].planQty; //计划数量
                this.ruleForm.Newbatch = this.CheckDataArr[0].batch; //批次
                this.ruleForm.NewCustomerName = this.CheckDataArr[0].customer; //客户名称
                this.ruleForm.NewScheduledStartTime = this.CheckDataArr[0].startDate; //计划开始时间
                this.ruleForm.NewPlannedCompletionTime = this.CheckDataArr[0].endDate; //计划完成时间
            }
        },
        //修改保存
        ModifySave(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$confirm("确认修改？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                        .then(() => {
                            this.axios({
                                method: "post",
                                url: PlanningProduction.GET_B_Modify,
                                data: {
                                    mesTaskId: this.ModifyId,
                                    orderNo: this.ruleForm.NewTaskNumber, ////任务号
                                    sortie: this.ruleForm.NewSortieNol, //架次号
                                    xbomNumber: this.ruleForm.NewXBOMNumber, //xbom号
                                    productName: this.ruleForm.NewProductName, //产品名称
                                    product: this.ruleForm.NewProductDrawingNo, //产品图号
                                    planQty: this.ruleForm.NewPlannedQuantity, //计划数量
                                    batch: this.ruleForm.Newbatch, //批次
                                    customer: this.ruleForm.NewCustomerName, //客户名称
                                    startDate: this.ruleForm
                                        .NewScheduledStartTime, //计划开始时间
                                    endDate: this.ruleForm
                                        .NewPlannedCompletionTime //计划完成时间
                                }
                            }).then(res => {
                                if (res.data.status === 1) {
                                    this.$message({
                                        //成功后的提示
                                        message: res.data.errorMsg,
                                        type: "success",
                                        duration: 1500
                                    });
                                    this.ModifyFeame = false; //是否隐藏弹框
                                    this.QueryTask();
                                } else if (res.data.status === 0) {
                                    this.$message({
                                        //失败后的提示
                                        message: res.data.errorMsg,
                                        type: "error",
                                        duration: 1500
                                    });
                                }
                            });
                        })
                        .catch(() => {
                            this.$message({
                                type: "info",
                                message: "已取消修改"
                            });
                        });
                } else {
                    this.$message({
                        //失败后的提示
                        message: "请完善信息",
                        type: "warning",
                        duration: 1500
                    });
                    return false;
                }
            });
        },

        //导出
        handleDownload() {
            if (this.CheckDataArr.length != 0) {
                this.downloadLoading = true;
                import("../../../../src/common/js/Export2Excel").then(excel => {
                    const tHeader = [
                        "任务号",
                        "架次号",
                        "XBOM号",
                        "产品名称",
                        "计划数量",
                        "批次",
                        "计划开始时间",
                        "计划结束时间",
                        "产品图号",
                        "客户名称"
                    ];
                    const filterVal = [
                        "orderNo",
                        "sortie",
                        "xbomNumber",
                        "productName",
                        "planQty",
                        "batch",
                        "startDate",
                        "endDate",
                        "product",
                        "customer"
                    ];
                    this.listLoading = true;

                    const list = this.CheckDataArr;
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
                        year + seperator1 + month + seperator1 + strDate;
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename + currentdate,
                        autoWidth: this.autoWidth,
                        bookType: this.bookType
                    });

                    setTimeout(() => {
                        this.listLoading = false;
                    }, 1.5 * 1000);
                });
            } else {
                this.$message({
                    //失败后的提示
                    message: "请选择数据进行导出",
                    type: "warning",
                    duration: 1500
                });
            }
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

        //导入弹出框
        Export() {
            this.ExportFeame = true;
            this.index_text = "";
        },
        //
        change() {
            this.formData = new window.FormData(); // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'  clear
            this.formData.append(
                "filename",
                document.querySelector("input[type=file]").files[0]
            );
            this.index_text = document.querySelector(
                "input[type=file]"
            ).files[0].name;
            this.$refs.clear.value = "";
        },
        submit() {
            var options = {
                // 设置axios的参数
                url: PlanningProduction.GET_B_Submit,
                data: this.formData,
                method: "post",
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }; //'userfile'是formData这个对象的键名
            if (this.index_text != "") {
                this.axios(options).then(res => {
                    if (res.data.status === 1) {
                        this.$message({
                            //成功后的提示
                            message: res.data.errorMsg,
                            type: "success",
                            duration: 1500
                        });
                        this.ExportFeame = false;
                        this.QueryTask();
                    } else if (res.data.status === 0) {
                        this.$message({
                            //失败后的提示
                            message: res.data.errorMsg,
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
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Advan_head {
    height: 60px;
    overflow: hidden;
}
.Advan_head_left {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Advan_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.Advan_head_left div {
    width: 170px;
    float: left;
}
.Advan_head_bnt {
    margin-top: 10px;
    margin-left: 10px;
}

.Advan_operation {
    height: 50px;
    padding: 0px 10px;
}

.Advan_operation_nei {
    width: 100%;
    height: 100%;
}

.AdvanElasticFrame_top {
    overflow: hidden;
}

.AdvanTesting {
    height: 40px;
    float: left;
    margin-left: 10px;
}

.AdvanTesting div {
    width: 160px;
}

/* form表单之间的间距样式 */
/* .el-form-item {
    margin-bottom: 5px;
} */

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

.Advan_operation_bnt {
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
    padding: 0px 10px;
    margin-top: 5px;
}

.ExportStyle {
    height: 160px;
}

/* 上传样式 */
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
</style>