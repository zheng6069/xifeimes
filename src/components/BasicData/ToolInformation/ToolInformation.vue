<template>
    <div>
        <div class="Tool_head">
            <div class="Tool_head_left">
                <p>名称</p>
                <div>
                    <el-input v-model="QueryName" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>

            <el-button
                @click="nowPages=1;OnQuery()"
                size="medium"
                type="primary"
                class="Tool_head_bnt"
            >查询</el-button>
        </div>

        <div class="Tool_operation">
            <el-button
                size="medium"
                type="primary"
                @click="NewlyAdded"
                class="Tool_operation_bnt"
            >新增</el-button>
            <el-button size="medium" type="primary" @click="OnModify" class="Tool_operation_bnt">修改</el-button>
        </div>

        <div class="Tool_contnet" :style="TableHeight">
            <div class="Tool_contnet_table">
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
                    <el-table-column prop="species" label="种类" width="140"></el-table-column>
                    <el-table-column prop="toolName" label="名称" width="200"></el-table-column>
                    <el-table-column prop="toolProduct" label="图号" width="200"></el-table-column>
                    <el-table-column prop="toolModel" label="型号" width="200"></el-table-column>
                    <el-table-column prop="toolFormat" label="规格" width="200"></el-table-column>
                    <el-table-column prop="price" label="单价" width="60"></el-table-column>
                    <el-table-column prop="toolNum" label="计量编号" width="100"></el-table-column>
                    <el-table-column prop="qty" label="数量" width="60"></el-table-column>
                    <el-table-column prop="shelf" label="货架号" width="120"></el-table-column>
                    <el-table-column prop="layer" label="层号" width="100"></el-table-column>
                    <el-table-column prop="position" label="位置号" width="200"></el-table-column>
                    <el-table-column prop="inspectionDate" label="定检日期" width="200"></el-table-column>
                    <el-table-column prop="inspectionYear" label="定检周期" width="120"></el-table-column>
                    <el-table-column prop="manufacturer" label="生产厂商" width="200"></el-table-column>
                    <el-table-column prop="qualified" label="合格证" width="200"></el-table-column>
                    <el-table-column prop="toolStatus" label="状态" width="150"></el-table-column>
                    <el-table-column label="备注" width="200" :show-overflow-tooltip="true">
                        <template slot-scope="{ row }">
                            <span>{{ row.remarker }}</span>
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

        <!--------- 新增 ------------>
        <el-dialog :visible.sync="ElasticFrame" width="70%">
            <div class="ToolNewlyAdded">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="种类" prop="type" class="ToolNewlyAddedBox">
                        <el-select
                            size="medium"
                            v-model="ruleForm.type"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionOne"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="名称" prop="name" class="ToolNewlyAddedBox">
                        <el-input v-model="ruleForm.name" size="medium" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="图号" prop="DrawingNo" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.DrawingNo"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="型号" prop="model" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.model"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="规格" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.Specifications"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="单价" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.UnitPrice"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="计量编号" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.MeasurementNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="数量" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.number"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="货架号" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.ShelfNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="层号" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.FloorNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="位置号" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.LocationNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="定检日期" class="ToolNewlyAddedBox">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.RegularInspectionDate"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="定检周期" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.PeriodicInspectionPeriod"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="生产厂商" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.Manufacturer"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="合格证" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.certificate"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="状态" class="ToolNewlyAddedBox">
                        <el-select
                            size="medium"
                            v-model="ruleForm.state"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionTwo"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="有效期至" class="ToolNewlyAddedBox">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.expirationDate"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="站位名称" class="ToolNewlyAddedBox">
                        <el-select
                            size="medium"
                            v-model="ruleForm.station"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionThree"
                                :key="item.warehouseId"
                                :label="item.warehouseName"
                                :value="item.warehouseName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="操作人" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.operator"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="备注" class="ToolNewlyAddedBoxTexts">
                        <el-input
                            v-model="ruleForm.remarks"
                            type="textarea"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="ToolNewlyAdded_btn">
                <el-button
                    class="ToolNewlyAdded_Close"
                    @click="OnAddAndSave('ruleForm')"
                    type="primary"
                >确 定</el-button>
                <el-button class="ToolNewlyAdded_Close" @click="Close">取 消</el-button>
            </div>
        </el-dialog>

        <!--------- 修改 ------------>
        <el-dialog :visible.sync="ModifyFrame" width="70%">
            <div class="ToolNewlyAdded">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="种类" prop="type" class="ToolNewlyAddedBox">
                        <el-select
                            size="medium"
                            v-model="ruleForm.type"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionOne"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="名称" prop="name" class="ToolNewlyAddedBox">
                        <el-input v-model="ruleForm.name" size="medium" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="图号" prop="DrawingNo" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.DrawingNo"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="型号" prop="model" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.model"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="规格" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.Specifications"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="单价" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.UnitPrice"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="计量编号" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.MeasurementNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="数量" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.number"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="货架号" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.ShelfNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="层号" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.FloorNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="位置号" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.LocationNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="定检日期" class="ToolNewlyAddedBox">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.RegularInspectionDate"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="定检周期" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.PeriodicInspectionPeriod"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="生产厂商" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.Manufacturer"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="合格证" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.certificate"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="状态" class="ToolNewlyAddedBox">
                        <el-select
                            size="medium"
                            v-model="ruleForm.state"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionTwo"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="有效期至" class="ToolNewlyAddedBox">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.expirationDate"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="站位名称" class="ToolNewlyAddedBox">
                        <el-select
                            size="medium"
                            v-model="ruleForm.station"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionThree"
                                :key="item.warehouseId"
                                :label="item.warehouseName"
                                :value="item.warehouseName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="操作人" class="ToolNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.operator"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="备注" class="ToolNewlyAddedBoxTexts">
                        <el-input
                            v-model="ruleForm.remarks"
                            type="textarea"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="ToolNewlyAdded_btn">
                <el-button
                    class="ToolNewlyAdded_Close"
                    @click="OnModifyAndSave('ruleForm')"
                    type="primary"
                >确 定</el-button>
                <el-button class="ToolNewlyAdded_Close" @click="Close">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { BasicData } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            QueryName: "",
            QueryArr: [],
            ruleForm: {
                type: "", //种类
                name: "", //名称
                DrawingNo: "", //图号
                model: "", //型号
                Specifications: "", //规格
                UnitPrice: "", //单价
                MeasurementNumber: "", //计量编号
                number: "", //数量
                ShelfNumber: "", //货架号
                FloorNumber: "", //层号
                LocationNumber: "", //位置号
                RegularInspectionDate: "", //定检日期
                PeriodicInspectionPeriod: "", //定检周期
                Manufacturer: "", //生产厂商
                certificate: "", //合格证
                state: "", //状态
                station: "", // 站位名
                expirationDate: "", // 有效期至
                operator: "", // 操作人
                remarks: "" //备注
            },
            rules: {
                //验证
                type: [
                    //种类
                    { required: true, message: "请输入种类", trigger: "change" }
                ],
                name: [
                    //名称
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                DrawingNo: [
                    //图号
                    { required: true, message: "请输入图号", trigger: "blur" }
                ],
                model: [
                    //型号
                    { required: true, message: "请输入型号", trigger: "blur" }
                ]
            },
            ElasticFrame: false, //是否隐藏弹框
            TableHeight: {
                height: ""
            },

            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            ModifyArr: [], //勾选储存数据
            ModifyID: "", //查询id
            ModifyFrame: false, //是否隐藏弹框
            optionOne: [], // 工量具种类
            optionTwo: [], // 工量具状态
            optionThree: [] // 工量具站位
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
        // 查询 - 工量具种类
        getOptionOneInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 10
                    }
                })
                .then(res => {
                    that.optionOne = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询 - 工量具状态
        getOptionTwoInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 3
                    }
                })
                .then(res => {
                    that.optionTwo = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询 - 工量具站位
        getOptionThreeInfo() {
            let that = this;
            that.axios
                .post(BasicData.GET_Z_findAllWarehouse)
                .then(res => {
                    let arry = res.data;
                    arry.push({ warehouseName: "公用" });
                    that.optionThree = arry;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查询
        OnQuery() {
            this.axios({
                method: "post",
                url: BasicData.GET_B_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    condetion: this.QueryName //名称
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
        //分页
        OnPaging(val) {
            this.nowPages = val;
            this.OnQuery();
        },
        //切换每页展示多少条数据
        handleSizeChange(val) {
            this.pageSize = val;
            this.OnQuery();
        },
        //新增
        NewlyAdded() {
            this.ElasticFrame = true;
            this.getOptionOneInfo(); // 查询 - 工量具种类
            this.getOptionTwoInfo(); // 查询 - 工量具状态
            this.getOptionThreeInfo(); // 查询 - 工量具站位
            this.ruleForm.type = ""; //种类
            this.ruleForm.name = ""; //名称
            this.ruleForm.DrawingNo = ""; //图号
            this.ruleForm.model = ""; //型号
            this.ruleForm.Specifications = ""; //规格
            this.ruleForm.UnitPrice = ""; //单价
            this.ruleForm.MeasurementNumber = ""; //计量编号
            this.ruleForm.number = ""; //数量
            this.ruleForm.ShelfNumber = ""; //货架号
            this.ruleForm.FloorNumber = ""; //层号
            this.ruleForm.LocationNumber = ""; //位置号
            this.ruleForm.RegularInspectionDate = ""; //定检日期
            this.ruleForm.PeriodicInspectionPeriod = ""; //定检周期
            this.ruleForm.Manufacturer = ""; //生产厂商
            this.ruleForm.certificate = ""; //合格证
            this.ruleForm.state = ""; //状态
            this.ruleForm.remarks = ""; //备注
            this.ModifyID = "";
            this.ruleForm.station = ""; // 站位名
            this.ruleForm.expirationDate = ""; // 有效期至
            this.ruleForm.operator = ""; // 操作人
        },
        //新增保存
        OnAddAndSave(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios({
                        method: "post",
                        url: BasicData.GET_B_AddAndSave,
                        data: {
                            species: this.ruleForm.type, //种类
                            toolName: this.ruleForm.name, //名称
                            toolProduct: this.ruleForm.DrawingNo, //图号
                            toolModel: this.ruleForm.model, //型号
                            toolFormat: this.ruleForm.Specifications, //规格
                            price: this.ruleForm.UnitPrice, //单价
                            toolNum: this.ruleForm.MeasurementNumber, //计量编号
                            qty: this.ruleForm.number, //数量
                            shelf: this.ruleForm.ShelfNumber, //货架号
                            layer: this.ruleForm.FloorNumber, //层号
                            position: this.ruleForm.LocationNumber, //位置号
                            inspectionDate: this.ruleForm.RegularInspectionDate, //定检日期
                            inspectionYear: this.ruleForm
                                .PeriodicInspectionPeriod, //定检周期
                            manufacturer: this.ruleForm.Manufacturer, //生产厂商
                            qualified: this.ruleForm.certificate, //合格证
                            toolStatus: this.ruleForm.state, //状态
                            station: this.ruleForm.station, // 站位名
                            expirationDate: this.ruleForm.expirationDate, // 有效期至
                            operator: this.ruleForm.operator, // 操作人
                            remarker: this.ruleForm.remarks //备注
                        } //种类
                    })
                        .then(res => {
                            if (res.data.success == true) {
                                this.$message({
                                    //成功后的提示
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                this.OnQuery();
                                this.ElasticFrame = false;
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
        //勾选
        Tick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.ModifyArr = row.pop(); //储存新的单选数据
            }
        },
        //修改
        OnModify() {
            if (this.ModifyArr != "" && this.ModifyArr != undefined) {
                this.ModifyFrame = true;
                this.getOptionOneInfo(); // 查询 - 工量具种类
                this.getOptionTwoInfo(); // 查询 - 工量具状态
                this.getOptionThreeInfo(); // 查询 - 工量具站位
                this.ruleForm.type = this.ModifyArr.species; //种类
                this.ruleForm.name = this.ModifyArr.toolName; //名称
                this.ruleForm.DrawingNo = this.ModifyArr.toolProduct; //图号
                this.ruleForm.model = this.ModifyArr.toolModel; //型号
                this.ruleForm.Specifications = this.ModifyArr.toolFormat; //规格
                this.ruleForm.UnitPrice = this.ModifyArr.price; //单价
                this.ruleForm.MeasurementNumber = this.ModifyArr.toolNum; //计量编号
                this.ruleForm.number = this.ModifyArr.qty; //数量
                this.ruleForm.ShelfNumber = this.ModifyArr.shelf; //货架号
                this.ruleForm.FloorNumber = this.ModifyArr.layer; //层号
                this.ruleForm.LocationNumber = this.ModifyArr.position; //位置号
                this.ruleForm.RegularInspectionDate = this.ModifyArr.inspectionDate; //定检日期
                this.ruleForm.PeriodicInspectionPeriod = this.ModifyArr.inspectionYear; //定检周期
                this.ruleForm.Manufacturer = this.ModifyArr.manufacturer; //生产厂商
                this.ruleForm.certificate = this.ModifyArr.qualified; //合格证
                this.ruleForm.state = this.ModifyArr.toolStatus; //状态
                this.ruleForm.remarks = this.ModifyArr.remarker; //备注
                this.ModifyID = this.ModifyArr.toolId;
                this.ruleForm.station = this.ModifyArr.station; // 站位名
                this.ruleForm.expirationDate = this.ModifyArr.expirationDate; // 有效期至
                this.ruleForm.operator = this.ModifyArr.operator; // 操作人
            } else {
                this.$message({
                    //失败后的提示
                    message: "请选择数据",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //修改保存
        OnModifyAndSave(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios({
                        method: "post",
                        url: BasicData.GET_B_Modify,
                        data: {
                            species: this.ruleForm.type, //种类
                            toolName: this.ruleForm.name, //名称
                            toolProduct: this.ruleForm.DrawingNo, //图号
                            toolModel: this.ruleForm.model, //型号
                            toolFormat: this.ruleForm.Specifications, //规格
                            price: this.ruleForm.UnitPrice, //单价
                            toolNum: this.ruleForm.MeasurementNumber, //计量编号
                            qty: this.ruleForm.number, //数量
                            shelf: this.ruleForm.ShelfNumber, //货架号
                            layer: this.ruleForm.FloorNumber, //层号
                            position: this.ruleForm.LocationNumber, //位置号
                            inspectionDate: this.ruleForm.RegularInspectionDate, //定检日期
                            inspectionYear: this.ruleForm
                                .PeriodicInspectionPeriod, //定检周期
                            manufacturer: this.ruleForm.Manufacturer, //生产厂商
                            qualified: this.ruleForm.certificate, //合格证
                            toolStatus: this.ruleForm.state, //状态
                            remarker: this.ruleForm.remarks, //备注
                            station: this.ruleForm.station, // 站位名
                            expirationDate: this.ruleForm.expirationDate, // 有效期至
                            operator: this.ruleForm.operator, // 操作人
                            toolId: this.ModifyID
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
                                this.OnQuery();
                                this.ModifyFrame = false;
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
        Close() {
            this.ElasticFrame = false;
            this.ModifyFrame = false;
        }
    }
};
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
.Tool_head {
    height: 60px;
    overflow: hidden;
}
.Tool_head_left {
    width: 230px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Tool_head_left p {
    width: 60px;
    float: left;
    line-height: 36px;
}
.Tool_head_left div {
    width: 170px;
    float: left;
}
.Tool_head_bnt {
    margin-top: 10px;
    margin-left: 10px;
}

.Tool_operation {
    height: 50px;
}

.Tool_operation_nei {
    width: 100%;
    height: 100%;
}

.Tool_operation_bnt {
    margin-left: 10px;
}

.Tool_contnet {
    width: 100%;
}
.Tool_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.ToolNewlyAdded {
    height: 360px;
}

.ToolNewlyAddedBox {
    width: 290px;
    float: left;
}
.ToolNewlyAddedBox div {
    width: 170px;
}
.ToolNewlyAddedBoxTexts {
    width: 580px;
    float: left;
}
.ToolNewlyAdded_btn {
    height: 40px;
}
.ToolNewlyAdded_Close {
    float: right;
    margin-right: 10px;
}

.DetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
