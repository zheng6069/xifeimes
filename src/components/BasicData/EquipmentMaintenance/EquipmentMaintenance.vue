<template>
    <div>
        <div class="EquipmentMAA_head">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="基准编号" prop="BenchmarkNumber" class="EquipmentMAA_head_left">
                    <el-input
                        :disabled="Disabledfalse"
                        v-model="ruleForm.BenchmarkNumber"
                        size="medium"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <el-form-item label="基准名称" prop="BenchmarkName" class="EquipmentMAA_head_left">
                    <el-input
                        :disabled="Disabledfalse"
                        v-model="ruleForm.BenchmarkName"
                        size="medium"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <el-form-item label="维保类型" prop="MaintenanceType" class="EquipmentMAA_head_left">
                    <el-select
                        :disabled="Disabledfalse"
                        size="medium"
                        v-model="ruleForm.MaintenanceType"
                        placeholder="请选择"
                    >
                        <el-option label="日保" value="日保"></el-option>
                        <el-option label="周保" value="周保"></el-option>
                        <el-option label="月保" value="月保"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备编号" prop="EquipmentNumber" class="EquipmentMAA_head_left">
                    <el-input
                        v-model="ruleForm.EquipmentNumber"
                        :disabled="true"
                        size="medium"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <el-form-item label="设备名称" prop="EquipmentName" class="EquipmentMAA_head_left">
                    <el-input
                        v-model="ruleForm.EquipmentName"
                        :disabled="true"
                        size="medium"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <el-form-item label="设备型号" prop="EquipmentModel" class="EquipmentMAA_head_left">
                    <el-input
                        v-model="ruleForm.EquipmentModel"
                        :disabled="true"
                        size="medium"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <el-form-item label="所属站位" prop="Station" class="EquipmentMAA_head_left">
                    <el-input
                        v-model="ruleForm.Station"
                        :disabled="true"
                        size="medium"
                        placeholder="请输入"
                    ></el-input>
                </el-form-item>
                <el-form-item label class="EquipmentMAA_head_left_button">
                    <el-button
                        v-show="Isno"
                        @click="OnQueryEquipment"
                        size="medium"
                        type="primary"
                    >查询设备</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="EquipmentMAA_operation">
            <el-button
                @click="OnAddNew"
                v-show="Isno"
                size="medium"
                type="primary"
                class="EquipmentMAA_operation_bnt"
            >添加</el-button>

            <el-button
                @click="OnConfirmPreservation('ruleForm')"
                v-show="Isno"
                size="medium"
                type="primary"
                class="EquipmentMAA_operation_bnt"
            >确认</el-button>
            <!-- <el-button
                @click="OnModify"
                v-show="Isno"
                size="medium"
                type="primary"
                class="EquipmentMAA_operation_bnt"
            >修改</el-button> -->

            <el-button
                @click="OnReturn"
                size="medium"
                type="primary"
                class="EquipmentMAA_operation_bnt"
            >返回</el-button>
        </div>

        <div class="EquipmentMAA_contnet" :style="TableHeight">
            <div class="EquipmentMAA_contnet_table">
                <el-table
                    ref="multipleTable"
                    @selection-change="Tick"
                    border
                    :data="QueryArr"
                    height="100%"
                    style="width: 100%;height:100%; "
                >
                    <el-table-column label="序号" type="index" width="50"></el-table-column>
                    <el-table-column prop="checkParts" label="检查部位" width="150">
                        <template slot-scope="scope">
                            <p v-if="!scope.row.isChange" v-text="scope.row.checkParts"></p>
                            <el-input
                                type="textarea"
                                :rows="2"
                                style="width:100%"
                                v-if="scope.row.isChange"
                                v-model="scope.row.checkParts"
                                placeholder="请输入内容"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="checkContent" label="检查内容" width="150">
                        <template slot-scope="scope">
                            <p v-if="!scope.row.isChange" v-text="scope.row.checkContent"></p>
                            <el-input
                                type="textarea"
                                :rows="2"
                                style="width:100%"
                                v-if="scope.row.isChange"
                                v-model="scope.row.checkContent"
                                placeholder="请输入内容"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="checkMethod" label="检查方法" width="150">
                        <template slot-scope="scope">
                            <p v-if="!scope.row.isChange" v-text="scope.row.checkMethod"></p>
                            <el-input
                                type="textarea"
                                :rows="2"
                                style="width:100%"
                                v-if="scope.row.isChange"
                                v-model="scope.row.checkMethod"
                                placeholder="请输入内容"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="checkNormal" label="检查标准" width="150">
                        <template slot-scope="scope">
                            <p v-if="!scope.row.isChange" v-text="scope.row.checkNormal"></p>
                            <el-input
                                type="textarea"
                                :rows="2"
                                style="width:100%"
                                v-if="scope.row.isChange"
                                v-model="scope.row.checkNormal"
                                placeholder="请输入内容"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="checkResult" label="检查结果" width="150">
                        <template slot-scope="scope">
                            <p v-if="!scope.row.isChange" v-text="scope.row.checkResult"></p>

                            <el-select
                                v-if="scope.row.isChange"
                                v-model="scope.row.checkResult"
                                size="medium"
                                style="width:100%"
                                placeholder="请选择"
                                disabled
                            >
                                <el-option label="正常" value="正常"></el-option>
                                <el-option label="异常" value="异常"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remarks" label="备注信息">
                        <template slot-scope="scope">
                            <p v-if="!scope.row.isChange" v-text="scope.row.remarks"></p>
                            <el-input
                                type="textarea"
                                :rows="2"
                                style="width:100%"
                                v-if="scope.row.isChange"
                                v-model="scope.row.remarks"
                                placeholder="请输入内容"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                v-show="Isno"
                                type="primary"
                                @click="OnAddDelete(scope.$index, scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!----------- 设备信息弹框 ------------->
        <el-dialog :visible.sync="TechnicalDocumentation" width="70%">
            <div style="height:50px;">
                <el-input
                    style="width: 220px;"
                    v-model="EquipmentQueryName"
                    size="medium"
                    placeholder="请输入"
                ></el-input>
                <el-button
                    style="margin-left:10px"
                    type="primary"
                    size="medium"
                    @click="OnQueryEquipment"
                >查 询</el-button>
            </div>
            <div style="height:260px;">
                <el-table
                    ref="multipleTable"
                    @selection-change="Tick"
                    border
                    :data="EquipmentArr"
                    height="100%"
                    style="width: 100%;height:100%;"
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
                <el-button @click="OnClose">取 消</el-button>
                <el-button type="primary" @click="OnPreservationEquipment">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.EquipmentMAA_head {
    height: 100px;
    overflow: hidden;
}
.EquipmentMAA_head_left {
    width: 250px;
    margin-left: 10px;
    margin-top: 5px;
    float: left;
}
.EquipmentMAA_head_left p {
    width: 90px;
    float: left;
    line-height: 36px;
}
.EquipmentMAA_head_left div {
    width: 170px;
    float: left;
}
.EquipmentMAA_head_left_button {
    width: 100px;
    margin-top: 5px;
    margin-left: 10px;
    float: left;
}
.EquipmentMAA_head_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}

.EquipmentMAA_operation {
    height: 50px;
    /* padding: 0px 10px;  */
}

.EquipmentMAA_operation_nei {
    width: 100%;
    height: 100%;
    /* background: #ccc; */
}

.EquipmentMAA_operation_bnt {
    margin-left: 10px;
}

.EquipmentMA_contnet {
    width: 100%;
}
.EquipmentMAA_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.EquipmentNewlyAdded {
    height: 300px;
}

/* form表单之间的间距样式 */
.el-form-item {
    margin-bottom: 0px;
}
.EquipmentNewlyAdded_btn {
    height: 40px;
}
.EquipmentNewlyAdded_Close {
    float: right;
    margin-right: 10px;
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
            EquipmentID: this.$route.query, //接收参数
            ruleForm: {
                BenchmarkNumber: "", //基准编号
                BenchmarkName: "", //基准名称
                MaintenanceType: "", //维保类型
                EquipmentNumber: "", //设备编号
                EquipmentName: "", //设备名称
                EquipmentModel: "", //设备型号
                Station: "" //所属站位
            },
            EquipmentArr: [], //储存设备信息
            rules: {
                //验证
                BenchmarkNumber: [
                    //基准编号
                    { required: true, message: " ", trigger: "blur" }
                ],
                BenchmarkName: [
                    //基准名称
                    { required: true, message: " ", trigger: "blur" }
                ],
                MaintenanceType: [
                    //维保类型
                    { required: true, message: " ", trigger: "blur" }
                ],
                EquipmentNumber: [
                    //设备编号
                    { required: true, message: " ", trigger: "blur" }
                ],
                EquipmentName: [
                    //设备名称
                    { required: true, message: " ", trigger: "blur" }
                ],
                EquipmentModel: [
                    //设备型号
                    { required: true, message: " ", trigger: "blur" }
                ],
                Station: [
                    //所属站位
                    { required: true, message: " ", trigger: "blur" }
                ]
            },

            QueryArr: [], //检测项table数据
            EquipmentQueryName: "", //查询设备信息

            TableHeight: {
                height: ""
            },
            TechnicalDocumentation: false, //技术文档查看弹框,
            Isno: true,
            Disabledfalse: false,
            DeleteArr: [], //储存勾选到的新的数组
            WorkClothesID: "" //储存勾选到的id
        };
    },
    created() {
        this.OnSee();
        this.OnModify();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 165 + "px";
        },
        //新增添加
        OnAddNew() {
            this.QueryArr.push({
                checkParts: "",
                checkContent: "",
                checkMethod: "",
                checkNormal: "",
                checkResult: "",
                remarks: ""
            });
            this.QueryArr.map(val => {
                //循环让table 可以修改数量
                val.isChange = true;
            });
        },
        //新增删除
        OnAddDelete(index) {
            this.QueryArr.splice(index, 1);
        },
        //返回
        OnReturn() {
            this.$router.push({
                path: "EquipmentMaintenanceHmoe"
            });
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
            if (this.DeleteArr != "") {
                this.ruleForm.EquipmentNumber = this.DeleteArr.facilityNum; //设备编号
                this.ruleForm.EquipmentName = this.DeleteArr.facilityName; //设备名称
                this.ruleForm.EquipmentModel = this.DeleteArr.facilityModel; //设备型号
                this.ruleForm.Station = this.DeleteArr.station; //所属站位
                this.TechnicalDocumentation = false; //关闭弹框
            } else {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            }
        },

        //关闭
        OnClose() {
            this.TechnicalDocumentation = false;
        },
        //确认
        OnConfirmPreservation(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.QueryArr.length != 0) {
                        this.axios({
                            method: "post",
                            url: BasicData.GET_F_AddAndSave,
                            data: {
                                mainNum: this.ruleForm.BenchmarkNumber, //基准编号
                                mainName: this.ruleForm.BenchmarkName, //基准名称
                                mainType: this.ruleForm.MaintenanceType, //维保类型
                                facilityNum: this.ruleForm.EquipmentNumber, //设备编号
                                facilityName: this.ruleForm.EquipmentName, //设备名称
                                facilityModel: this.ruleForm.EquipmentModel, //设备型号
                                station: this.ruleForm.Station, //所属站位
                                mainTables: this.QueryArr,
                                mainId: this.$route.query.EquipmentID //修改id
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
                                    this.OnReturn();
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
                        this.$message({
                            message: "请添加检查信息",
                            type: "warning",
                            duration: 1500
                        });
                    }
                } else {
                    this.$message({
                        message: "信息不完整，请填写完整",
                        type: "warning",
                        duration: 1500
                    });
                    return false;
                }
            });
        },
        //获取查看数据
        OnSee() {
            if (this.$route.query.EquipmentTrue == "1") {
                this.axios
                    .get(BasicData.GET_F_See, {
                        params: {
                            mainId: this.$route.query.EquipmentID
                        }
                    })
                    .then(res => {
                        //接收到参数为1就禁用 所有按钮  使用true 或false 会报错
                        if (this.$route.query.EquipmentTrue == "1") {
                            this.Isno = false;
                            this.Disabledfalse = true;
                        }
                        this.ruleForm.BenchmarkNumber = res.data.mainNum; //基准编号
                        this.ruleForm.BenchmarkName = res.data.mainName; //基准名称
                        this.ruleForm.MaintenanceType = res.data.mainType; //维保类型
                        this.ruleForm.EquipmentNumber = res.data.facilityNum; //设备编号
                        this.ruleForm.EquipmentName = res.data.facilityName; //设备名称
                        this.ruleForm.EquipmentModel = res.data.facilityModel; //设备型号
                        this.ruleForm.Station = res.data.station; // 所属站位
                        this.QueryArr = res.data.mainTables;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },

        //修改
        OnModify() {
            if (this.$route.query.EquipmentTrue == "0") {
                this.axios
                    .get(BasicData.GET_F_See, {
                        params: {
                            mainId: this.$route.query.EquipmentID
                        }
                    })
                    .then(res => {
                        //接收到参数为1就禁用 所有按钮  使用true 或false 会报错
                        if (this.$route.query.EquipmentTrue == "0") {
                            this.Isno = true;
                            this.Disabledfalse = true;
                        }
                        this.ruleForm.BenchmarkNumber = res.data.mainNum; //基准编号
                        this.ruleForm.BenchmarkName = res.data.mainName; //基准名称
                        this.ruleForm.MaintenanceType = res.data.mainType; //维保类型
                        this.ruleForm.EquipmentNumber = res.data.facilityNum; //设备编号
                        this.ruleForm.EquipmentName = res.data.facilityName; //设备名称
                        this.ruleForm.EquipmentModel = res.data.facilityModel; //设备型号
                        this.ruleForm.Station = res.data.station; // 所属站位
                        this.QueryArr = res.data.mainTables;
                        this.QueryArr.map(val => {
                            //循环让table 可以修改数量
                            val.isChange = true;
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
};
</script>
