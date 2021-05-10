<template>
    <div class="container">
        <div class="OpSearch">
            <el-form :inline="true" :model="OpSearchform" class="demo-form-inline" size="medium">
                <el-form-item label class="item">
                    <el-input v-model="OpSearchform.project" placeholder="名称、编号、类型、型号" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="nowPages=1;OpSearchSubmit()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-button type="primary" @click="OpSearchAdd" size="medium">新增</el-button>
        <div class="Op_contnet" :style="TableHeight">
            <div class="Op_contnet_table">
                <el-table
                    border
                    :data="OpTableData"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                    <el-table-column prop="facilityNum" label="设备编号"></el-table-column>
                    <el-table-column prop="facilityModel" label="设备类型"></el-table-column>
                    <el-table-column prop="facilityType" label="设备型号"></el-table-column>
                    <el-table-column prop="repairYear" label="大修年限"></el-table-column>
                    <el-table-column prop="repairTime" label="初始化时间"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="OpLook(scope.$index, scope.row)"
                            >查看</el-button>
                            <el-button
                                type="primary"
                                size="mini"
                                @click="OpUpdate(scope.$index, scope.row)"
                            >修改</el-button>
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
        <el-dialog :visible.sync="OverhaulPeriodFrame" width="70%">
            <div class="AdvanElasticFrame_top">
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
                    <el-form-item label="设备名称" prop="OpName" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.OpName"
                            size="medium"
                            placeholder="请输入"
                            :disabled="disabled"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="设备编号" prop="OpNumber" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.OpNumber"
                            size="medium"
                            placeholder="请输入"
                            :disabled="disabled"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型" prop="OpType" class="AdvanTesting">
                        <el-select
                            size="medium"
                            v-model="ruleForm.OpType"
                            placeholder="请选择"
                            clearable
                            :disabled="disabled"
                            @change="AddCouponSelected()"
                        >
                            <el-option
                                v-for="item in optionThree"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备型号" prop="OpModel" class="AdvanTesting">
                        <el-select
                            size="medium"
                            v-model="ruleForm.OpModel"
                            placeholder="请选择"
                            clearable
                            :disabled="disabled"
                        >
                            <el-option
                                v-for="item in optionTwo"
                                :key="item.facilityId"
                                :label="item.facilityModel"
                                :value="item.facilityModel"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="大修年限" prop="OpTime" class="AdvanTesting">
                        <el-input
                            v-model.number="ruleForm.OpTime"
                            size="medium"
                            placeholder="请输入"
                            :disabled="disabled"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="初始时间" prop="OpStartTime" class="AdvanTesting">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width: 100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.OpStartTime"
                            :disabled="disabled"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="所属站位" prop="stationName" class="AdvanTesting">
                        <el-select
                            :disabled="disabled"
                            size="medium"
                            v-model="ruleForm.stationName"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionFour"
                                :key="item.warehouseId"
                                :label="item.warehouseName"
                                :value="item.warehouseName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialog_footer" v-show="isShow">
                <el-button class="dialog_Close" @click="closeAdd('ruleForm')">取 消</el-button>
                <el-button
                    class="dialog_Preservation"
                    @click="AddSave('ruleForm')"
                    type="primary"
                >确 定</el-button>
                <el-button
                    class="dialog_Preservation"
                    @click="OnQueryEquipment"
                    style="margin-right: 0px;"
                    type="primary"
                >查询设备</el-button>
            </div>
        </el-dialog>
        <!----------- 设备信息弹框 ------------->
        <el-dialog :visible.sync="TechnicalDocumentation" width="70%">
            <div style="height: 50px">
                <el-input
                    style="width: 220px"
                    v-model="EquipmentQueryName"
                    size="medium"
                    placeholder="请输入"
                    clearable
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
            <div slot="footer" class="dialog-footer">
                <el-button @click="TechnicalDocumentation = false">取 消</el-button>
                <el-button type="primary" @click="OnPreservationEquipment">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog :visible.sync="OverhaulUpdateFrame" width="70%">
            <div class="AdvanElasticFrame_top">
                <el-form :model="updateRuleForm" ref="updateRuleForm" :rules="updateRules">
                    <el-form-item label="设备名称" prop="OpNames" class="AdvanTesting">
                        <el-input
                            v-model="updateRuleForm.OpNames"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="设备编号" prop="OpNumbers" class="AdvanTesting">
                        <el-input
                            v-model="updateRuleForm.OpNumbers"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型" prop="OpTypes" class="AdvanTesting">
                        <el-select
                            size="medium"
                            v-model="updateRuleForm.OpTypes"
                            placeholder="请选择"
                            clearable
                            @change="updateCouponSelected()"
                        >
                            <el-option
                                v-for="item in optionThree"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备型号" prop="OpModels" class="AdvanTesting">
                        <el-select
                            size="medium"
                            v-model="updateRuleForm.OpModels"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionTwo"
                                :key="item.facilityId"
                                :label="item.facilityModel"
                                :value="item.facilityModel"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="大修年限" prop="OpTimes" class="AdvanTesting">
                        <el-input
                            v-model.number="updateRuleForm.OpTimes"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="初始时间" prop="OpStartTimes" class="AdvanTesting">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width: 100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="updateRuleForm.OpStartTimes"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="所属站位" prop="stationNameA" class="AdvanTesting">
                        <el-select
                            size="medium"
                            v-model="updateRuleForm.stationNameA"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionFour"
                                :key="item.warehouseId"
                                :label="item.warehouseName"
                                :value="item.warehouseName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialog_footer">
                <el-button class="dialog_Close" @click="OverhaulUpdateFrame = false">取 消</el-button>
                <el-button
                    class="dialog_Preservation"
                    @click="updateSave('updateRuleForm')"
                    type="primary"
                >确 定</el-button>
                <el-button
                    class="dialog_Preservation"
                    @click="OnQueryEquipment"
                    type="primary"
                    style="margin-right: 0px;"
                >查询设备</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { BasicData } from "../../../common/api";
export default {
    data() {
        return {
            OpSearchform: {
                project: "" // 查询
            },
            TableHeight: {
                height: ""
            },
            OpTableData: [],
            OverhaulPeriodFrame: false, // 新增弹框
            OverhaulUpdateFrame: false, // 修改弹框
            ruleForm: {
                OpNumber: "", // 设备编号
                OpName: "", // 设备名称
                OpType: "", // 设备类型
                OpModel: "", // 设备型号
                OpTime: "", // 大修年限
                OpStartTime: "", // 初始时间
                stationName: "" //所属站位
            },
            updateRuleForm: {
                OpNumbers: "", // 设备编号
                OpNames: "", // 设备名称
                OpTypes: "", // 设备类型
                OpModels: "", // 设备型号
                OpTimes: "", // 大修年限
                OpStartTimes: "", // 初始时间
                stationNameA: "" //所属站位
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            rules: {
                //验证
                OpTime: [
                    // 大修年限
                    {
                        required: true,
                        message: "大修年限必须为数字",
                        trigger: "blur",
                        type: "number"
                    }
                ],
                OpStartTime: [
                    // 初始时间
                    {
                        required: true,
                        message: "请输入初始时间",
                        trigger: "blur"
                    }
                ],
                OpType: [
                    //设备类型
                    {
                        required: true,
                        message: "请输入设备类型",
                        trigger: "change"
                    }
                ],
                OpNumber: [
                    //设备编号
                    {
                        required: true,
                        message: "请输入设备编号",
                        trigger: "blur"
                    }
                ],
                OpName: [
                    //设备名称
                    {
                        required: true,
                        message: "请输入设备名称",
                        trigger: "blur"
                    }
                ],
                OpModel: [
                    //设备型号
                    {
                        required: true,
                        message: "请输入设备型号",
                        trigger: "change"
                    }
                ],
                stationName: [
                    //所属站位
                    {
                        required: true,
                        message: "请输入所属站位",
                        trigger: "change"
                    }
                ]
            },
            updateRules: {
                //验证
                OpTimes: [
                    // 大修年限
                    {
                        required: true,
                        message: "大修年限必须为数字",
                        trigger: "blur",
                        type: "number"
                    }
                ],
                OpStartTimes: [
                    // 初始时间
                    {
                        required: true,
                        message: "请输入初始时间",
                        trigger: "blur"
                    }
                ],
                OpTypes: [
                    //设备类型
                    {
                        required: true,
                        message: "请输入设备类型",
                        trigger: "blur"
                    }
                ],
                OpNumbers: [
                    //设备编号
                    {
                        required: true,
                        message: "请输入设备编号",
                        trigger: "blur"
                    }
                ],
                OpNames: [
                    //设备名称
                    {
                        required: true,
                        message: "请输入设备名称",
                        trigger: "blur"
                    }
                ],
                OpModels: [
                    //设备型号
                    {
                        required: true,
                        message: "请输入设备型号",
                        trigger: "blur"
                    }
                ],
                stationNameA: [
                    //所属站位
                    {
                        required: true,
                        message: "请输入所属站位",
                        trigger: "blur"
                    }
                ]
            },
            TechnicalDocumentation: false, // 查询设备弹框
            EquipmentQueryName: "", //查询设备信息
            QueryArr: [], //检测项table数据
            EquipmentArr: [], //储存设备信息
            DeleteArr: [], //储存勾选到的新的数组
            updateRow: [], // 修改存储的数组
            isShow: true, // 控制按钮的显示隐藏
            disabled: false, // 控制文本的禁用
            title: "",
            optionFour: "", // 查询站位
            optionThree: "", // 查询设备类型
            optionTwo: "", // 查询设备型号
            warehouseIdAdd: ""
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OpSearchSubmit();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 160 + "px";
        },
        // 查询站位名称
        getOptionFourInfo() {
            let that = this;
            that.axios
                .post(BasicData.GET_Z_findAllWarehouse)
                .then(res => {
                    that.optionFour = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询设备类型
        getOptionThreeInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 13
                    }
                })
                .then(res => {
                    that.optionThree = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        AddCouponSelected() {
            this.ruleForm.OpModel = "";
            this.axios
                .get(BasicData.GET_Y_findByEquType, {
                    params: {
                        facilityType: this.ruleForm.OpType
                    }
                })
                .then(res => {
                    this.optionTwo = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        updateCouponSelected() {
            this.updateRuleForm.OpModels = "";
            this.axios
                .get(BasicData.GET_Y_findByEquType, {
                    params: {
                        facilityType: this.updateRuleForm.OpTypes
                    }
                })
                .then(res => {
                    this.optionTwo = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询
        OpSearchSubmit() {
            let that = this;
            let queryData = {
                pageNum: that.nowPages,
                pageSize: that.pageSize,
                condetion: that.OpSearchform.project
            };
            that.axios
                .post(BasicData.GET_Y_Query, queryData)
                .then(res => {
                    that.OpTableData = res.data.records;
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
            this.OpSearchSubmit();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.OpSearchSubmit();
        },
        // 查看
        OpLook(index, row) {
            this.OverhaulPeriodFrame = true;
            this.getOptionFourInfo(); // 查询站位名称
            this.getOptionThreeInfo(); // 查询设备类型
            this.ruleForm.OpModel = row.facilityModel;
            this.ruleForm.OpName = row.facilityName;
            this.ruleForm.OpNumber = row.facilityNum;
            this.ruleForm.OpType = row.facilityType;
            this.ruleForm.OpStartTime = row.repairTime;
            this.ruleForm.OpTime = row.repairYear;
            this.ruleForm.stationName = row.stationName;
            this.isShow = false;
            this.disabled = true;
        },
        // 新增
        OpSearchAdd() {
            this.OverhaulPeriodFrame = true;
            this.getOptionFourInfo(); // 查询站位名称
            this.getOptionThreeInfo(); // 查询设备类型
            this.ruleForm.OpModel = "";
            this.ruleForm.OpName = "";
            this.ruleForm.OpNumber = "";
            this.ruleForm.OpType = "";
            this.ruleForm.OpStartTime = "";
            this.ruleForm.OpTime = "";
            this.ruleForm.stationName = "";
            this.isShow = true;
            this.disabled = false;
        },
        // 新增弹框-保存
        AddSave(ruleForm) {
            let that = this;
            that.$refs[ruleForm].validate(valid => {
                if (valid) {
                    let addData = {
                        facilityModel: that.ruleForm.OpModel,
                        facilityName: that.ruleForm.OpName,
                        facilityNum: that.ruleForm.OpNumber,
                        facilityType: that.ruleForm.OpType,
                        repairTime: that.ruleForm.OpStartTime,
                        repairYear: that.ruleForm.OpTime,
                        stationName: that.ruleForm.stationName
                    };
                    that.axios
                        .post(BasicData.GET_Y_AddAndSave, addData)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    showClose: true,
                                    message: res.data.message,
                                    type: "success"
                                });
                                that.OverhaulPeriodFrame = false;
                                that.OpSearchSubmit();
                            } else {
                                that.$message({
                                    showClose: true,
                                    message: res.data.message,
                                    type: "error"
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
        // 取消
        closeAdd(ruleForm) {
            this.$refs[ruleForm].resetFields();
            this.OverhaulPeriodFrame = false;
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
        //勾选
        Tick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.DeleteArr = row.pop(); //储存新的单选数据
            }
        },
        //保存设备信息
        OnPreservationEquipment() {
            if (this.DeleteArr != "" && this.DeleteArr != undefined) {
                this.ruleForm.OpNumber = this.DeleteArr.facilityNum; //设备编号
                this.ruleForm.OpName = this.DeleteArr.facilityName; //设备名称
                this.ruleForm.OpModel = this.DeleteArr.facilityModel; //设备型号
                this.ruleForm.stationName = this.DeleteArr.facilityType; //所属站位

                this.updateRuleForm.OpNumbers = this.DeleteArr.facilityNum; //设备编号
                this.updateRuleForm.OpNames = this.DeleteArr.facilityName; //设备名称
                this.updateRuleForm.OpModels = this.DeleteArr.facilityModel; //设备型号
                this.updateRuleForm.stationNameA = this.DeleteArr.facilityType; //所属站位
                this.TechnicalDocumentation = false; //关闭弹框
            } else {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        // 修改
        OpUpdate(index, row) {
            let that = this;
            that.OverhaulUpdateFrame = true;
            this.getOptionFourInfo(); // 查询站位名称
            this.getOptionThreeInfo(); // 查询设备类型
            that.updateRow = row;
            that.updateRuleForm.OpModels = that.updateRow.facilityModel;
            that.updateRuleForm.OpNames = that.updateRow.facilityName;
            that.updateRuleForm.OpNumbers = that.updateRow.facilityNum;
            that.updateRuleForm.OpTypes = that.updateRow.facilityType;
            that.updateRuleForm.OpStartTimes = that.updateRow.repairTime;
            that.updateRuleForm.OpTimes = that.updateRow.repairYear;
            that.updateRuleForm.stationNameA = that.updateRow.stationName;
        },
        updateSave(updateRuleForm) {
            let that = this;
            that.$refs[updateRuleForm].validate(valid => {
                if (valid) {
                    let updateData = {
                        equipmentId: that.updateRow.equipmentId,
                        facilityModel: that.updateRuleForm.OpModels,
                        facilityName: that.updateRuleForm.OpNames,
                        facilityNum: that.updateRuleForm.OpNumbers,
                        facilityType: that.updateRuleForm.OpTypes,
                        repairTime: that.updateRuleForm.OpStartTimes,
                        repairYear: that.updateRuleForm.OpTimes,
                        stationName: that.updateRuleForm.stationNameA
                    };
                    that.axios
                        .post(BasicData.GET_Y_UpdateAndSave, updateData)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    showClose: true,
                                    message: res.data.message,
                                    type: "success"
                                });
                                that.OverhaulUpdateFrame = false;
                                that.OpSearchSubmit();
                            } else {
                                that.$message({
                                    showClose: true,
                                    message: res.data.message,
                                    type: "error"
                                });
                            }
                            that.$refs[updateRuleForm].resetFields();
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
.OpSearch .item .el-form-item__label {
    font-size: 16px;
    color: #000000;
}
.Op_contnet {
    width: 100%;
}
.OpSearch {
    height: 50px;
}

.Op_contnet_table {
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
    margin-top: 5px;
}

.ExportStyle {
    height: 160px;
}
</style>
