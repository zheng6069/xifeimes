<template>
    <div class="container">
        <!-- 查询 -->
        <el-form :inline="true" size="medium" class="demo-form-inline">
            <el-form-item label>
                <el-input v-model="queryInfo" placeholder="提出人、架次号、类型" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="
            nowPages = 1;
            siSearch();
          "
                >查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 按钮 -->
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" size="medium" @click="handleAdd">新增</el-button>
            </el-col>
        </el-row>
        <!-- 列表 -->
        <div class="Tooling_contnet" :style="TableHeight">
            <div class="Tooling_contnet_table">
                <el-table
                    ref="multipleTable"
                    border
                    :data="SiData"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="problemType" label="异常类型"></el-table-column>
                    <el-table-column prop="proposedUser" label="提出人"></el-table-column>
                    <el-table-column prop="soritesNo" label="架次"></el-table-column>
                    <el-table-column prop="problemsLevel" label="级别"></el-table-column>
                    <el-table-column prop="problemDesc" label="问题描述"></el-table-column>
                    <el-table-column prop="demandTime" label="需求时间"></el-table-column>
                    <el-table-column prop="acceptUser" label="处理人"></el-table-column>
                    <el-table-column prop="facilityModel" label="设备型号"></el-table-column>
                    <el-table-column prop="facilityType" label="设备类型"></el-table-column>
                    <el-table-column prop="facilityCode" label="设备编号"></el-table-column>
                    <el-table-column prop="productStatus" label="流程状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.productStatus == 0">未开始</span>
                            <span v-if="scope.row.productStatus == 1">进行中</span>
                            <span v-if="scope.row.productStatus == 2">已提交</span>
                            <span v-if="scope.row.productStatus == 3">已驳回</span>
                            <span v-if="scope.row.productStatus == 4">已完成</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="closedTime" label="封闭日期" :formatter="dateFormat"></el-table-column>
                    <el-table-column prop="remarks" label="备注" :show-overflow-tooltip="true">
                        <template slot-scope="{ row }">
                            <span>{{ row.remarks }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click.native="ManHourUpdata(scope.row)"
                            >修改</el-button>
                            <el-button
                                size="mini"
                                @click="ManHourAddSubmit(scope.row)"
                                type="primary"
                            >提交</el-button>
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
        <!-- 新增弹框 -->
        <div class="black" v-show="ManHourInfoAdd"></div>
        <div v-show="ManHourInfoAdd" class="renyuan">
            <div>
                <h5>新增信息<i class="el-icon-close" @click="iconclose()"></i></h5></h5>
                <div class="AdvanElasticFrame_top">
                <el-form
                    :model="ruleFormAdd"
                    ref="ruleFormAdd"
                    :rules="rules"
                    size="medium"
                    label-width="120px"
                >
                    <el-form-item label="问题类型" prop="one" class="AdvanTesting">
                        <el-select
                            v-model="ruleFormAdd.one"
                            clearable
                            placeholder="请选择"
                        >
                            <el-option label="安全" value="安全"></el-option>
                            <el-option label="质量" value="质量"></el-option>
                            <el-option label="成本" value="成本"></el-option>
                            <el-option label="设备" value="设备"></el-option>
                            <el-option label="交付" value="交付"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="处理人" prop="two" class="AdvanTesting">
                        <el-select
                            v-model="ruleFormAdd.two"
                            placeholder="请选择处理人"
                            @change="AddCouponSelected($event)"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.nickname"
                                :value="item.nickname"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备编号" prop="egiht" class="AdvanTesting" v-show="isShow">
                        <el-input
                            v-model="ruleFormAdd.egiht"
                            clearable
                            placeholder="请点击查询设备"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型" prop="serve" class="AdvanTesting" v-show="isShow">
                        <el-input
                            v-model="ruleFormAdd.serve"
                            clearable
                            placeholder="请点击查询设备"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="设备型号" prop="six" class="AdvanTesting" v-show="isShow">
                        <el-input
                            v-model="ruleFormAdd.six"
                            clearable
                            placeholder="请点击查询设备"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="架次号" prop="three" class="AdvanTesting">
                        <el-input v-model="ruleFormAdd.three" clearable placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="需求完成时间" prop="five" class="AdvanTesting">
                        <el-date-picker
                            v-model="ruleFormAdd.five"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="级别" prop="level" class="AdvanTesting">
                        <el-select
                            v-model="ruleFormAdd.level"
                            clearable
                            placeholder="请选择"
                        >
                            <el-option label="一级" value="一级"></el-option>
                            <el-option label="二级" value="二级"></el-option>
                            <el-option label="三级" value="三级"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="问题描述" prop="four" class="Advan">
                        <el-input
                            type="textarea"
                            v-model="ruleFormAdd.four"
                            clearable
                            placeholder="请输入"
                            :rows="5"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialog_footer">
                <el-button class="dialog_Close" @click="ManHourCloseAdd('ruleFormAdd')">取 消</el-button>
                <el-button
                    class="dialog_Preservation"
                    @click="ManHourAddSave('ruleFormAdd')"
                    type="primary"
                >保 存</el-button>
                <el-button
                    class="dialog_Preservation"
                    @click="OnQueryEquipment"
                    type="primary"
                    v-show="isShow"
                >查询设备</el-button>
            </div>
            </div>
        </div>
        <!-- 修改弹框 -->
        <div class="black" v-show="ManHourInfoEdit"></div>
        <div v-show="ManHourInfoEdit" class="renyuan">
            <div>
                <h5>修改信息<i class="el-icon-close" @click="iconclose()"></i></h5></h5>
                <div class="AdvanElasticFrame_top">
                    <el-form :model="ruleFormEdit" ref="ruleFormEdit" :rules="rules" size="medium">
                        <el-form-item label="问题类型" prop="one" class="AdvanTesting">
                            <el-select
                                v-model="ruleFormEdit.one"
                                clearable
                                placeholder="请选择"
                                @change="isChange"
                            >
                                <el-option label="安全" value="安全"></el-option>
                                <el-option label="质量" value="质量"></el-option>
                                <el-option label="成本" value="成本"></el-option>
                                <el-option label="设备" value="设备"></el-option>
                                <el-option label="交付" value="交付"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="处理人" prop="two" class="AdvanTesting">
                            <el-select
                                v-model="ruleFormEdit.two"
                                placeholder="请选择处理人"
                                @change="EditCouponSelected($event)"
                            >
                                <el-option
                                    v-for="item in option"
                                    :key="item.id"
                                    :label="item.nickname"
                                    :value="item.nickname"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="设备编号" prop="egiht" class="AdvanTesting" v-show="isShow">
                            <el-input
                                v-model="ruleFormEdit.egiht"
                                clearable
                                placeholder="请点击查询设备"
                                disabled
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="设备类型" prop="serve" class="AdvanTesting" v-show="isShow">
                            <el-input
                                v-model="ruleFormEdit.serve"
                                clearable
                                placeholder="请点击查询设备"
                                disabled
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="设备型号" prop="six" class="AdvanTesting" v-show="isShow">
                            <el-input
                                v-model="ruleFormEdit.six"
                                clearable
                                placeholder="请点击查询设备"
                                disabled
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="架次" prop="three" class="AdvanTesting">
                            <el-input v-model="ruleFormEdit.three" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="需求完成时间" prop="five" class="AdvanTesting">
                            <el-date-picker
                                v-model="ruleFormEdit.five"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="级别" prop="level" class="AdvanTesting">
                            <el-select
                                v-model="ruleFormEdit.level"
                                clearable
                                placeholder="请选择"
                            >
                                <el-option label="一级" value="一级"></el-option>
                                <el-option label="二级" value="二级"></el-option>
                                <el-option label="三级" value="三级"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="问题描述" prop="four" class="Advan">
                            <el-input
                                type="textarea"
                                v-model="ruleFormEdit.four"
                                clearable
                                placeholder="请输入"
                                :rows="5"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog_footer">
                    <el-button class="dialog_Close" @click="ManHourCloseEdit('ruleFormEdit')">取 消</el-button>
                    <el-button
                        class="dialog_Preservation"
                        @click="ManHourEditSave('ruleFormEdit')"
                        type="primary"
                    >提 交</el-button>
                    <el-button
                        class="dialog_Preservation"
                        @click="OnQueryEquipment"
                        type="primary"
                        v-show="isShow"
                    >查询设备</el-button>
                </div>
            </div>
        </div>
        <!----------- 设备信息弹框 ------------->
        <div class="black" v-show="TechnicalDocumentation"></div>
        <div v-show="TechnicalDocumentation" class="renyuan">
            <div>
                <h5>查看设备信息<i class="el-icon-close" @click="iconclose()"></i></h5></h5>
                    <div style="height: 50px">
                    <el-input
                        style="width: 220px"
                        v-model="EquipmentQueryName"
                        size="medium"
                        placeholder="请输入"
                    ></el-input>
                    <el-button
                        size="medium"
                        type="primary"
                        style="margin-left:10px"
                        @click="OnQueryEquipment"
                    >查 询</el-button>
                </div>
                <div style="height: 260px">
                    <el-table
                        ref="multipleTable"
                        @selection-change="Tick"
                        border
                        :data="EquipmentArr"
                        height="100%"
                        style="width: 100%; height: 100%"
                        :header-row-style="{ height: '39px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '39px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column type="selection" width="40"></el-table-column>
                        <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                        <el-table-column prop="facilityNum" label="设备编号"></el-table-column>
                        <el-table-column prop="facilityModel" label="设备型号"></el-table-column>
                        <el-table-column prop="station" label="所属站位"></el-table-column>
                    </el-table>
                </div>
                <div class="dialog_footer">
                    <el-button class="dialog_Close" @click="TechnicalDocumentation = false">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="OnPreservationEquipment"
                        class="dialog_Preservation"
                    >保 存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { AssemblyPerform, BasicData } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            queryInfo: "",
            SiData: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            ManHourInfoAdd: false, // 新增弹框
            ruleFormAdd: {
                one: "", // 问题类型
                two: "", // 处理人
                three: "", // 架次
                four: "", // 问题描述
                five: "", // 需求时间
                six: "", // 设备型号
                serve: "", // 设备类型
                egiht: "", // 设备编号
                level:"",//级别
            },
            ManHourInfoEdit: false, // 修改弹框
            ruleFormEdit: {
                one: "", // 问题类型
                two: "", // 处理人
                three: "", // 架次
                four: "", // 问题描述
                five: "", // 需求时间
                six: "", // 设备型号
                serve: "", // 设备类型
                egiht: "", // 设备编号
                level:"",//级别
            },
            rules: {
                one: [
                    {
                        required: true,
                        message: "请选择问题类型",
                        trigger: "blur"
                    }
                ],
                two: [
                    { required: true, message: "请输入处理人", trigger: "blur" }
                ],
                three: [
                    { required: true, message: "请输入架次", trigger: "blur" }
                ],
                four: [
                    {
                        required: true,
                        message: "请输入问题描述",
                        trigger: "blur"
                    }
                ],
                five: [
                    {
                        required: true,
                        message: "请选择需求时间",
                        trigger: "blur"
                    }
                ],
                level: [
                    {
                        required: true,
                        message: "请选择级别",
                        trigger: "blur"
                    }
                ]
            },
            ExportFeame: false, // 导入弹框
            Updatarow: [], // 承接修改row
            productId: "",
            options: [],
            option: [],
            show: true,
            isShow: false,
            userName: "",
            userNameEdit: "",
            TechnicalDocumentation: false, // 查询设备弹框
            EquipmentQueryName: "", //查询设备信息
            QueryArr: [], //检测项table数据
            EquipmentArr: [], //储存设备信息
            facilityName: ""
        };
    },
    created() {
        this.gaodu(); // 在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); // 在生命周期里面监听浏览器变化
        this.siSearch();
    },
    methods: {
        // 关闭弹窗
        iconclose(){
            this.ManHourInfoAdd = false //新增弹窗关闭
            this.ManHourInfoEdit = false //修改弹窗关闭
            this.TechnicalDocumentation = false //设备信息弹窗关闭
        },
        gaodu() {
            // 获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 282 + "px";
        },
        // 查询
        siSearch() {
            let that = this;
            let url = AssemblyPerform.GET_Z_selectProductInfoByProposeUser;
            that.axios
                .post(url, {
                    pageNum: that.nowPages,
                    pageSize: that.pageSize,
                    searchName: that.queryInfo
                })
                .then(res => {
                    that.SiData = res.data.records;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 父组件查询
        fusiSearch(data) {
            let that = this;
            let url = AssemblyPerform.GET_Z_selectProductInfoByProposeUser;
            that.axios
                .post(url, {
                    pageNum: that.nowPages,
                    pageSize: that.pageSize,
                    searchName: data
                })
                .then(res => {
                    that.SiData = res.data.records;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.nowPages = 1;
            this.siSearch();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.siSearch();
        },
        AddCouponSelected(id) {
            // 获取name
            let obj = {};
            obj = this.options.find(item => {
                return item.nickname === id; //筛选出匹配数据
            });
            this.userName = obj.username;
        },
        //勾选
        Tick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.DeleteArr = row.pop(); //储存新的单选数据
            }
        },
        //查询设备信息
        OnQueryEquipment() {
            this.TechnicalDocumentation = true;
            this.axios({
                method: "post",
                url: BasicData.GET_F_QueryBasicData,
                data: {
                    pageNum: 1, //当前页
                    pageSize: 1000000, //每页多少条
                    condetion: this.EquipmentQueryName //名称
                }
            })
                .then(res => {
                    this.EquipmentArr = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //保存设备信息
        OnPreservationEquipment() {
            if (this.DeleteArr < 1 || this.DeleteArr == undefined) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.ruleFormAdd.egiht = this.DeleteArr.facilityNum; //设备编号
                this.ruleFormAdd.serve = this.DeleteArr.facilityType; //设备类型
                this.ruleFormAdd.six = this.DeleteArr.facilityModel; //设备型号

                this.facilityName = this.DeleteArr.facilityName; //设备名称

                this.ruleFormEdit.OpNumbers = this.DeleteArr.facilityNum; //设备编号
                this.ruleFormEdit.six = this.DeleteArr.facilityType; //设备类型
                this.ruleFormEdit.egiht = this.DeleteArr.facilityModel; //设备型号
                this.TechnicalDocumentation = false; //关闭弹框
            }
        },
        // 新增 - 弹框
        handleAdd() {
            this.ruleFormAdd.one = "";
            this.ruleFormAdd.two = "";
            this.ruleFormAdd.three = "";
            this.ruleFormAdd.four = "";
            this.ruleFormAdd.five = "";
            this.ruleFormAdd.six = "";
            this.ruleFormAdd.serve = "";
            this.ruleFormAdd.egiht = "";
            this.facilityName = "";
            this.ruleFormAdd.level = "";
            this.ManHourInfoAdd = true;
            this.isShow = false;
            this.show = true;
            this.axios
                .post(AssemblyPerform.GET_Z_getUserByRole)
                .then(res => {
                    this.options = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 取消 - 新增弹框
        ManHourCloseAdd() {
            this.ManHourInfoAdd = false;
        },
        // 保存 - 新增弹框
        ManHourAddSave(ruleFormAdd) {
            let that = this;
            let addData = {
                problemType: that.ruleFormAdd.one,
                acceptUser: that.ruleFormAdd.two,
                acceptUserName: that.userName,
                soritesNo: that.ruleFormAdd.three,
                problemDesc: that.ruleFormAdd.four,
                demandTime: that.ruleFormAdd.five,
                facilityModel: that.ruleFormAdd.six,
                facilityType: that.ruleFormAdd.serve,
                facilityCode: that.ruleFormAdd.egiht,
                facilityName: that.facilityName,
                problemsLevel:that.ruleFormAdd.level
            };
            that.$refs[ruleFormAdd].validate(valid => {
                if (valid) {
                    that.axios
                        .post(AssemblyPerform.GET_Z_insertProductInfo, addData)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                that.ManHourInfoAdd = false;
                                that.$refs[ruleFormAdd].resetFields();
                                that.siSearch();
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
        // 提交 - 新增弹框
        ManHourAddSubmit(row) {
            let that = this;
            if (row.acceptUser == undefined || row.acceptUser == "") {
                that.$message({
                    message: "当前数据没有接收人，请点击修改按钮",
                    type: "warning"
                });
            } else {
                that.axios
                    .post(AssemblyPerform.GET_Z_updateProductInfo, row)
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                showClose: true,
                                message: res.data.message,
                                type: "success"
                            });
                            that.siSearch();
                        } else {
                            that.$message({
                                showClose: true,
                                message: res.data.message,
                                type: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        handleChange(value) {
            console.log(value);
        },
        EditCouponSelected(id) {
            // 获取name
            let objEdit = {};
            objEdit = this.option.find(item => {
                return item.nickname === id; //筛选出匹配数据
            });
            this.userNameEdit = objEdit.username;
        },
        // 修改
        ManHourUpdata(row) {
            console.log(row,'row')
            this.Updatarow = row;
            if (row.productStatus === 2 || row.productStatus === 4) {
                this.$message({
                    message: "流程状态为已提交和已完成：不能修改",
                    type: "warning"
                });
            } else {
                if (row.problemType == "设备") {
                    console.log(row,'row')
                    this.show = false;
                    this.isShow = true;
                    this.ruleFormEdit.one = row.problemType;
                    this.ruleFormEdit.two = row.acceptUser;
                    this.ruleFormEdit.three = row.soritesNo;
                    this.ruleFormEdit.four = row.problemDesc;
                    this.ruleFormEdit.five = row.demandTime;
                    this.ruleFormEdit.level = row.problemsLevel;

                    this.ruleFormEdit.six = row.facilityModel;
                    this.ruleFormEdit.serve = row.facilityType;
                    this.ruleFormEdit.egiht = row.facilityCode;
                } else {
                     console.log(row,'row')
                    this.ruleFormEdit.one = row.problemType;
                    this.ruleFormEdit.two = row.acceptUser;
                    this.ruleFormEdit.three = row.soritesNo;
                    this.ruleFormEdit.four = row.problemDesc;
                    this.ruleFormEdit.five = row.demandTime;
                    this.ruleFormEdit.level = row.problemsLevel;

                    this.ruleFormEdit.six = "";
                    this.ruleFormEdit.serve = "";
                    this.ruleFormEdit.egiht = "";
                }

                this.ManHourInfoEdit = true;

                this.axios
                    .post(AssemblyPerform.GET_Z_getUserByRole)
                    .then(res => {
                        this.option = res.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        // 取消 - 修改弹框
        ManHourCloseEdit() {
            this.ManHourInfoEdit = false;
        },
        // 保存 - 修改弹框
        ManHourEditSave(ruleFormEdit) {
            let that = this;
            let editData = {
                problemType: that.ruleFormEdit.one,
                acceptUser: that.ruleFormEdit.two,
                acceptUserName: that.userNameEdit,
                soritesNo: that.ruleFormEdit.three,
                problemDesc: that.ruleFormEdit.four,
                demandTime: that.ruleFormEdit.five,
                facilityModel: that.ruleFormEdit.six,
                facilityType: that.ruleFormEdit.serve,
                facilityCode: that.ruleFormEdit.egiht,
                problemsLevel:that.ruleFormEdit.level,
                productProblemId: that.Updatarow.productProblemId
            };
            that.$refs[ruleFormEdit].validate(valid => {
                if (valid) {
                    that.axios
                        .post(AssemblyPerform.GET_Z_updateProductInfo, editData)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                that.ManHourInfoEdit = false;
                                that.$refs[ruleFormEdit].resetFields();
                                that.siSearch();
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
        ManHourDel(row) {
            console.log(row);
        },
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd")
                : "";
        },
        isChange(val) {
            if (
                val == "安全" ||
                val == "交付" ||
                val == "质量" ||
                val == "成本"
            ) {
                this.isShow = false;
                this.show = true;
                this.ruleFormEdit.six = "";
                this.ruleFormEdit.serve = "";
                this.ruleFormEdit.egiht = "";
                this.ruleFormAdd.six = "";
                this.ruleFormAdd.serve = "";
                this.ruleFormAdd.egiht = "";
            } else {
                this.show = false;
                this.isShow = true;
            }
        }
    }
};
</script>

<style scoped>
.renyuan{
    width: 60%;
    height: 80%;
    background:#fff;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 15px;
    border-radius: 5px;
    z-index: 10;
}
.renyuan h5{
    height: 40px;
    display: flex;
    justify-content: space-between;
}
.renyuan h5 i{
    cursor: pointer;
}
.renyuan .dialog_footer{
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translate(-50%,0);
    margin-top: 0 !important;
}
.black{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(0,0,0,0.5);
    top:0;
    left:0;
}
.container{
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px 10px;
}
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
.demo-form-inline {
    height: 50px;
}
.Tooling_contnet {
    width: 100%;
}
.Tooling_contnet_table {
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
.AdvanTesting div {
    width: 160px;
    float: right;
}
.Advan {
    width: 570px;
    float: left;
    margin-left: 10px;
}
.Advan div {
    width: 450px;
    float: right;
}
.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
/* form表单之间的间距样式 */
.dialog_footer {
    height: 30px;
    margin-top: 10px;
}
.dialog_Preservation {
    float: right;
    margin-right: 10px;
    margin-left: 0px;
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
</style>
