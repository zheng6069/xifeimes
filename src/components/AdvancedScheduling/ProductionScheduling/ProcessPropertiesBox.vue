<template>
    <div class="PropertiesBox_con" :style="TableHeight">
        <div class="PropertiesBox_left">
            <div class="PropertiesBox_OAinformation">
                <p class="PropertiesBox_OAinformation_p">站位AO信息</p>
                <div class="PropertiesBox_OAinformation_div">
                    <el-table
                        :data="StationOAArr"
                        @row-click="OAClickToGet"
                        border
                        height="100%"
                        style="width: 100%;height:100%;"
                        :header-row-style="{ height: '39px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '39px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column prop="aoNo" label="AO编码"></el-table-column>
                        <el-table-column prop="aoName" label="AO名称"></el-table-column>
                        <el-table-column prop="version" label="版本"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="PropertiesBox_Instruction">
                <p class="PropertiesBox_Instruction_p">指令信息</p>
                <div class="PropertiesBox_Instruction_div">
                    <el-table
                        :data="InstructionInformationArr"
                        @row-click="OnInstructionInformation"
                        border
                        height="100%"
                        style="width: 100%;height:100%;"
                        :header-row-style="{ height: '39px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '39px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column prop="instructNum" label="指令号"></el-table-column>
                        <el-table-column prop="instructName" label="指令名称"></el-table-column>
                        <el-table-column prop="riskLevel" width="80" label="风险级别"></el-table-column>
                        <el-table-column prop="version" width="50" label="版本"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="PropertiesBox_right">
            <div class="PropertiesBox_right_OA" v-if="showPrise">
                <p class="PropertiesBox_right_p">站位AO</p>
                <div class="PropertiesBox_right_div">
                    <div class="PropertiesBox_ipt">
                        <p class="PropertiesBox_ipt_p">AO编号</p>
                        <div class="PropertiesBox_ipt_div">
                            <el-input
                                :disabled="true"
                                v-model="OAInstructionNumber"
                                size="medium"
                                placeholder="请输入"
                            ></el-input>
                        </div>
                    </div>
                    <div class="PropertiesBox_ipt">
                        <p class="PropertiesBox_ipt_p">AO名称</p>
                        <div class="PropertiesBox_ipt_div">
                            <el-input
                                :disabled="true"
                                v-model="OAInstructionName"
                                size="medium"
                                placeholder="请输入"
                            ></el-input>
                        </div>
                    </div>
                    <div class="PropertiesBox_ipt">
                        <p class="PropertiesBox_ipt_p">转移工时(小时)</p>
                        <div class="PropertiesBox_ipt_div">
                            <el-input
                                v-model="OATransferHours"
                                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
                                size="medium"
                                placeholder="请输入"
                            ></el-input>
                        </div>
                    </div>
                </div>
                <div class="PropertiesBox_preservation">
                    <el-button
                        @click="OnTransferHours"
                        size="medium"
                        type="success"
                        class="PropertiesBox_preservation_btn"
                    >保存</el-button>
                    <el-button
                        @click="OnRouter"
                        size="medium"
                        type="success"
                        class="PropertiesBox_preservation_btn"
                    >返回</el-button>
                </div>
            </div>
            <div class="PropertiesBox_right_instructions" v-show="showRentPrise">
                <p class="PropertiesBox_right_p">指令属性</p>
                <div class="PropertiesBox_right_div">
                    <div class="PropertiesBox_ipt">
                        <p class="PropertiesBox_ipt_p">指令号</p>
                        <div class="PropertiesBox_ipt_div">
                            <el-input
                                :disabled="true"
                                v-model="InstructionNumber"
                                size="medium"
                                placeholder="请输入"
                            ></el-input>
                        </div>
                    </div>
                    <div class="PropertiesBox_ipt">
                        <p class="PropertiesBox_ipt_p">指令名称</p>
                        <div class="PropertiesBox_ipt_div">
                            <el-input
                                :disabled="true"
                                v-model="InstructionName"
                                size="medium"
                                placeholder="请输入"
                            ></el-input>
                        </div>
                    </div>
                    <div class="PropertiesBox_ipt">
                        <p class="PropertiesBox_ipt_p">缓冲工时</p>
                        <div class="PropertiesBox_ipt_div">
                            <el-input
                                :disabled="true"
                                v-model="PreparationTime"
                                size="medium"
                                placeholder="请输入"
                            ></el-input>
                        </div>
                    </div>
                    <div class="PropertiesBox_ipt">
                        <p class="PropertiesBox_ipt_p">装配工时</p>
                        <div class="PropertiesBox_ipt_div">
                            <el-input
                                :disabled="true"
                                v-model="AssemblyHours"
                                size="medium"
                                placeholder="请输入"
                            ></el-input>
                        </div>
                    </div>
                    <div class="PropertiesBox_ipt">
                        <p class="PropertiesBox_ipt_p">工作区域</p>
                        <div class="PropertiesBox_ipt_div">
                            <el-input
                                :disabled="true"
                                v-model="WorkArea"
                                size="medium"
                                placeholder="请输入"
                            ></el-input>
                        </div>
                    </div>
                    <div class="PropertiesBox_ipt"></div>
                    <div class="PropertiesBox_ipt" style="width:220px;height:30px;">
                        <div
                            class="PropertiesBox_ipt_div"
                            style="float: left;width:220px;margin-top:5px;"
                        >
                            <el-checkbox :disabled="true" v-model="checkedOne">是否允许与其他区域内工序并行</el-checkbox>
                        </div>
                    </div>
                    <div class="PropertiesBox_ipt" style="width:220px;height:30px;">
                        <div
                            class="PropertiesBox_ipt_div"
                            style="float: left;width:220px;margin-top:5px;"
                        >
                            <el-checkbox v-model="checkedTwo">是否外协工序</el-checkbox>
                        </div>
                    </div>

                    <div class="QualificationsData">
                        <el-table
                            :data="QualificationsArr"
                            border
                            height="300px"
                            style="width: 100%;height:100%;"
                            :header-row-style="{ height: '39px' }"
                            :header-cell-style="{ padding: '0px' }"
                            :row-style="{ height: '39px' }"
                            :cell-style="{ padding: '0px' }"
                        >
                            <el-table-column prop="needQualifications" label="需求资质类型"></el-table-column>
                            <el-table-column prop="needPersons" label="需求人员数"></el-table-column>
                            <el-table-column prop="importantQua" label="是否重要资质">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.importantQua == 0">普通资质</span>
                                    <span v-else-if="scope.row.importantQua == 1">重要资质</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <div class="PropertiesBox_right_footer">
                        <el-button
                            @click="OnEquipment"
                            size="medium"
                            type="success"
                            class="PropertiesBox_right_footerBtn"
                        >设备信息</el-button>
                        <el-button
                            @click="OnToolingInformation"
                            size="medium"
                            type="success"
                            class="PropertiesBox_right_footerBtn"
                        >工装信息</el-button>
                        <el-button
                            @click="OnInsertInformation"
                            size="medium"
                            type="success"
                            class="PropertiesBox_right_footerBtn"
                        >装入件信息</el-button>
                        <el-button
                            @click="OnToolInformation"
                            size="medium"
                            type="success"
                            class="PropertiesBox_right_footerBtn"
                        >工具信息</el-button>
                        <el-button
                            @click="OnGaugeInformation"
                            size="medium"
                            type="success"
                            class="PropertiesBox_right_footerBtn"
                        >量具信息</el-button>
                        <el-button
                            @click="OnAuxiliaryMaterialInformation"
                            size="medium"
                            type="success"
                            class="PropertiesBox_right_footerBtn"
                        >辅材信息</el-button>
                    </div>
                </div>

                <div class="PropertiesBox_preservation">
                    <el-button
                        @click="OnRouter"
                        size="medium"
                        type="success"
                        class="PropertiesBox_preservation_btn"
                    >返回</el-button>
                </div>
            </div>
        </div>

        <!-- 设备信息-弹出框 -->
        <el-dialog title="设备信息" :visible.sync="DeviceInformation" width="65%">
            <div>
                <el-table
                    border
                    :data="EquipmenArr"
                    height="300"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                    <el-table-column prop="facilityType" label="设备类型" width="175"></el-table-column>
                    <el-table-column prop="facilityCode" label="设备编号" width="100"></el-table-column>
                    <el-table-column prop="needQty" label="需求数量" width="90"></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="OnSeeEquipment(scope.$index, scope.row)"
                            >查看设备</el-button>
                            <el-button
                                size="mini"
                                @click="OnQueryEquipment(scope.$index, scope.row)"
                            >选择设备</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!-- 替换设备信息-弹出框 -->
        <el-dialog title="选择替换设备信息" :visible.sync="ReplacementEquipment" width="60%">
            <div>
                <el-table
                    @selection-change="OnTick"
                    border
                    :data="ReplacementEquipmentArr"
                    height="300"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                    <el-table-column prop="facilityType" label="设备类型" width="175"></el-table-column>
                    <el-table-column prop="facilityNum" label="设备编号" width="120"></el-table-column>
                    <el-table-column prop="facilityModel" label="设备型号" width="120"></el-table-column>
                </el-table>
            </div>
            <div class="dialog_footer">
                <el-button @click="OnPreservationEquipment" class="dialog_Close">保 存</el-button>
            </div>
        </el-dialog>
        <!-- 查看替换设备信息-弹出框 -->
        <el-dialog title="查看替换设备信息" :visible.sync="SeeEquipment" width="60%">
            <div>
                <el-table
                    border
                    :data="SeeEquipmentArr"
                    height="300"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                    <el-table-column prop="facilityType" label="设备类型" width="175"></el-table-column>
                    <el-table-column prop="facilityNum" label="设备编号" width="120"></el-table-column>
                    <el-table-column prop="facilityModel" label="设备型号" width="120"></el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="OnDeleteEquipment(scope.$index, scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!-- 工装信息-弹出框 -->
        <el-dialog title="工装信息" :visible.sync="ToolingInformation" width="60%">
            <div>
                <el-table
                    border
                    :data="ToolingInformationArr"
                    height="300"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column prop="frockName" label="工装名称"></el-table-column>
                    <el-table-column prop="frockProduct" label="工装图号" width="150"></el-table-column>
                    <el-table-column prop="frockCode" label="工装编号" width="150"></el-table-column>
                    <el-table-column prop="qty" label="数量" width="80"></el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!-- 装入件信息-弹出框 -->
        <el-dialog title="装入件信息" :visible.sync="InsertInformation" width="60%">
            <div>
                <el-table
                    border
                    :data="InsertInformationArr"
                    height="300"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column prop="assemName" label="装入件名称"></el-table-column>
                    <el-table-column prop="assemProduct" label="装入件图号" width="150"></el-table-column>
                    <el-table-column prop="version" label="版本" width="150"></el-table-column>
                    <el-table-column prop="qty" label="数量" width="80"></el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!-- 工具信息-弹出框 -->
        <el-dialog title="工具信息" :visible.sync="ToolInformation" width="60%">
            <div>
                <el-table
                    border
                    :data="ToolInformationArr"
                    height="300"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column prop="toolName" label="工具名称"></el-table-column>
                    <el-table-column prop="toolCode" label="工具编码" width="150"></el-table-column>
                    <el-table-column prop="toolSpec" label="规格" width="150"></el-table-column>
                    <el-table-column prop="qty" label="数量" width="80"></el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!-- 量具信息-弹出框 -->
        <el-dialog title="量具信息" :visible.sync="GaugeInformation" width="60%">
            <div>
                <el-table
                    border
                    :data="GaugeInformationArr"
                    height="300"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column prop="toolName" label="量具名称"></el-table-column>
                    <el-table-column prop="toolNum" label="量具编号" width="150"></el-table-column>
                    <el-table-column prop="precision" label="精度" width="150"></el-table-column>
                    <el-table-column prop="toolFormat" label="规格" width="80"></el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!-- 辅材信息-弹出框 -->
        <el-dialog title="辅材信息" :visible.sync="AuxiliaryMaterialInformation" width="60%">
            <div>
                <el-table
                    border
                    :data="AuxiliaryMaterialInformationArr"
                    height="300"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column prop="assemName" label="辅材名称"></el-table-column>
                    <el-table-column prop="assemProduct" label="辅材图号" width="150"></el-table-column>
                    <el-table-column prop="version" label="版本" width="80"></el-table-column>
                    <el-table-column prop="qty" label="数量" width="80"></el-table-column>
                    <el-table-column prop="unit" label="单位" width="80"></el-table-column>
                </el-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { AutomaticScheduling } from "../../../common/api";
export default {
    data() {
        return {
            ReceiveQuery: this.$route.query,
            TableHeight: {
                height: ""
            },
            OAInstructionNumber: "", //OA指令号
            OAInstructionName: "", //OA指令名称
            OATransferHours: "", //OA转移工时
            stationId: "", //OA主键
            StationOAArr: [],

            InstructionInformationArr: [], //指令信息

            InstructionNumber: "", //指令号
            InstructionName: "", //指令名称
            PreparationTime: "", //准备工时
            AssemblyHours: "", //装配工时
            WorkArea: "", //工作区域
            DisassembleToStation: "", //拆解到站位
            CommandPosition: "", //指令位置
            checkedOne: false, //是否允许与其他区域工序并行
            checkedTwo: false, //是否外协工序
            instructId: "", //
            showPrise: false, //站位信息显示
            showRentPrise: false, //指令信息显示
            DeviceInformation: false, //是否显示设备信息
            EquipmenArr: [], //设备信息
            ReplacementEquipment: false, //是否显示替换设备信息
            ReplacementEquipmentArr: [], //替换设备信息
            facilityId: "", //替换设备信息id
            TickArr: [], //替换设备勾选信息
            SeeEquipment: false, //查看替换设备信息是否隐藏
            SeeEquipmentArr: [], //查看替换设备信息
            ToolingInformation: false, //是否显示工装信息
            ToolingInformationArr: [], //工装信息
            InsertInformation: false, //是否显示装入件信息
            InsertInformationArr: [], //装入件信息
            ToolInformation: false, //是否显示工具信息
            ToolInformationArr: [], //工具信息
            GaugeInformation: false, //是否显示量具信息
            GaugeInformationArr: [], //量具信息
            AuxiliaryMaterialInformation: false, //是否显示辅材信息
            AuxiliaryMaterialInformationArr: [], //辅材信息
            QualificationsArr: [] //人员滋滋
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OnAttributeAdjustment();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 20 + "px";
        },
        //获取OA信息
        OnAttributeAdjustment() {
            this.axios
                .get(AutomaticScheduling.GET_D_AttributeAdjustment, {
                    params: {
                        mesTaskId: this.ReceiveQuery.mesTaskId,
                        workFlowId: this.ReceiveQuery.workFlowId
                    }
                })
                .then(res => {
                    this.StationOAArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 点击获取OA信息和指令信息
        OAClickToGet(row, column) {
            console.log(column);
            this.axios
                .get(AutomaticScheduling.GET_D_OAQuery, {
                    params: {
                        mesTaskId: this.ReceiveQuery.mesTaskId,
                        stationId: row.stationId
                    }
                })
                .then(res => {
                    this.OAInstructionNumber = row.aoNo;
                    this.OAInstructionName = row.aoName;
                    this.OATransferHours = row.moveHours;
                    this.stationId = row.stationId;
                    this.showPrise = true;
                    this.showRentPrise = false;
                    this.InstructionInformationArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //点击查询指令信息
        OnInstructionInformation(row, column) {
            console.log(column);
            this.DisassembleToStation = "";
            this.CommandPosition = "";
            this.axios
                .get(AutomaticScheduling.GET_D_InstructionInformation, {
                    params: {
                        mesTaskId: this.ReceiveQuery.mesTaskId,
                        instructId: row.instructId
                    }
                })
                .then(res => {
                    this.instructId = res.data.instructId;
                    this.showPrise = false;
                    this.showRentPrise = true;
                    this.QualificationsArr = res.data.list;
                    this.InstructionNumber = res.data.instructNum; //指令号
                    this.InstructionName = res.data.instructName; //指令名称
                    this.PreparationTime = res.data.readyHours; //准备工时
                    this.AssemblyHours = res.data.repairHours; //装配工时
                    this.WorkArea = res.data.workingArea; //工作区域
                    if (res.data.parallel == 0) {
                        //是否允许与其他区域工序并行
                        this.checkedOne = false;
                    } else {
                        this.checkedOne = true;
                    }
                    if (res.data.outreach == 0) {
                        //是否外协工序
                        this.checkedTwo = false;
                    } else {
                        this.checkedTwo = true;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //指令保存
        OnInstructionSaving() {
            this.axios({
                method: "post",
                url: AutomaticScheduling.GET_D_InstructionSaving,
                data: {
                    mesTaskId: this.ReceiveQuery.mesTaskId,
                    instructId: this.instructId,
                    targetStationId: this.DisassembleToStation,
                    targetInstructId: this.CommandPosition
                }
            })
                .then(res => {
                    this.SchedulingArr = res.data;
                    if (res.data.success != false) {
                        this.$message({
                            //成功后的提示
                            message: "拆解成功",
                            type: "success",
                            duration: 1500
                        });
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
        },
        //转移工时
        OnTransferHours() {
            this.axios({
                method: "post",
                url: AutomaticScheduling.GET_D_TransferHours,
                data: {
                    stationId: this.stationId,
                    moveHours: this.OATransferHours
                }
            })
                .then(res => {
                    if (res.data.success != false) {
                        this.$message({
                            //成功后的提示
                            message: "转移成功",
                            type: "success",
                            duration: 1500
                        });
                    } else {
                        this.$message({
                            //失败后的提示
                            message: "转移失败",
                            type: "error",
                            duration: 1500
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //设备信息
        OnEquipment() {
            this.axios
                .get(AutomaticScheduling.GET_D_Equipment, {
                    params: {
                        instructId: this.instructId
                    }
                })
                .then(res => {
                    this.DeviceInformation = true;
                    this.EquipmenArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查询替换设备信息
        OnQueryEquipment(row, index) {
            this.facilityId = index.facilityId;
            this.axios
                .get(AutomaticScheduling.GET_D_QueryEquipment, {
                    params: {}
                })
                .then(res => {
                    this.ReplacementEquipment = true;
                    this.ReplacementEquipmentArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //勾选储存设备
        OnTick(row) {
            this.TickArr = row;
        },
        //替换设备保存
        OnPreservationEquipment() {
            if (this.TickArr != "") {
                this.axios({
                    method: "post",
                    url:
                        AutomaticScheduling.GET_D_PreservationEquipment +
                        "?instructId=" +
                        this.instructId +
                        "&fid=" +
                        this.facilityId,
                    data: this.TickArr
                })
                    .then(res => {
                        if (res.data.success != false) {
                            this.$message({
                                //成功后的提示
                                message: "保存成功",
                                type: "success",
                                duration: 1500
                            });
                            this.ReplacementEquipment = false;
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
                    //失败后的提示
                    message: "请选择替换设备",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //查看替换设备信息
        OnSeeEquipment(row, index) {
            this.axios
                .get(AutomaticScheduling.GET_D_SeeEquipmen, {
                    params: {
                        instructId: this.instructId,
                        fid: index.facilityId
                    }
                })
                .then(res => {
                    this.SeeEquipment = true;
                    this.SeeEquipmentArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //删除替换设备信息
        OnDeleteEquipment(row, index) {
            console.log(row, index);
            this.axios
                .get(AutomaticScheduling.GET_D_DeleteEquipment, {
                    params: {
                        replaceId: index.replaceId
                    }
                })
                .then(res => {
                    if (res.data.success != false) {
                        this.$message({
                            //成功后的提示
                            message: "删除成功",
                            type: "success",
                            duration: 1500
                        });
                        this.SeeEquipmentArr.splice(row, 1);
                    } else {
                        this.$message({
                            //失败后的提示
                            message: "删除失败",
                            type: "error",
                            duration: 1500
                        });
                    }
                    console.log(res.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //工装信息
        OnToolingInformation() {
            this.axios
                .get(AutomaticScheduling.GET_D_ToolingInformation, {
                    params: {
                        instructId: this.instructId
                    }
                })
                .then(res => {
                    this.ToolingInformation = true;
                    this.ToolingInformationArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //装入件信息
        OnInsertInformation() {
            this.axios
                .get(AutomaticScheduling.GET_D_InsertInformation, {
                    params: {
                        instructId: this.instructId
                    }
                })
                .then(res => {
                    this.InsertInformation = true;
                    this.InsertInformationArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //工具信息
        OnToolInformation() {
            this.axios
                .get(AutomaticScheduling.GET_D_ToolInformation, {
                    params: {
                        instructId: this.instructId
                    }
                })
                .then(res => {
                    this.ToolInformation = true;
                    this.ToolInformationArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //量具信息
        OnGaugeInformation() {
            this.axios
                .get(AutomaticScheduling.GET_D_GaugeInformation, {
                    params: {
                        instructId: this.instructId
                    }
                })
                .then(res => {
                    this.GaugeInformation = true;
                    this.GaugeInformationArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //辅材信息
        OnAuxiliaryMaterialInformation() {
            this.axios
                .get(AutomaticScheduling.GET_D_AuxiliaryMaterialInformation, {
                    params: {
                        instructId: this.instructId
                    }
                })
                .then(res => {
                    this.AuxiliaryMaterialInformation = true;
                    this.AuxiliaryMaterialInformationArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //返回
        OnRouter() {
            this.$router.go(-1);
        }
    }
};
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}
.QualificationsData {
    margin-bottom: 20px;
}
.PropertiesBox_con {
    padding: 10px;
    overflow: hidden;
}
.PropertiesBox_left {
    height: 100%;
    width: 500px;
    float: left;
}
.PropertiesBox_OAinformation {
    width: 100%;
    height: 50%;
}
.PropertiesBox_OAinformation_p {
    width: 100%;
    height: 25px;
    font-size: 12px;
}
.PropertiesBox_OAinformation_div {
    width: 100%;
    height: -moz-calc(100% - 25px); /* WebKit */
    height: -webkit-calc(100% - 25px); /* Opera */
    height: -o-calc(100% - 25px); /* Standard */
    height: calc(100% - 25px);
}
.PropertiesBox_Instruction {
    width: 100%;
    height: 50%;
}
.PropertiesBox_Instruction_p {
    width: 100%;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
}
.PropertiesBox_Instruction_div {
    width: 100%;
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
.PropertiesBox_right {
    height: 100%;
    float: right;
    width: -moz-calc(100% - 510px); /* WebKit */
    width: -webkit-calc(100% - 510px); /* Opera */
    width: -o-calc(100% - 510px); /* Standard */
    width: calc(100% - 510px);
}
.PropertiesBox_right_instructions {
    width: 100%;
    height: 100%;
}
.PropertiesBox_right_OA {
    width: 100%;
    height: 100%;
}
.PropertiesBox_right_p {
    height: 25px;
    width: 100%;
    font-size: 12px;
    line-height: 25px;
}
.PropertiesBox_right_div {
    width: 100%;
    height: -moz-calc(100% - 60x); /* WebKit */
    height: -webkit-calc(100% - 60px); /* Opera */
    height: -o-calc(100% - 60px); /* Standard */
    height: calc(100% - 60px);
}
.PropertiesBox_ipt {
    width: 200px;
    float: left;
    height: 66px;
    margin-right: 10px;
    margin-bottom: 10px;
}
.PropertiesBox_ipt_p {
    width: 200px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
}
.PropertiesBox_ipt_div {
    width: 200px;
}
.PropertiesBox_right_footer {
    width: 100%;
    height: 50px;
    overflow: hidden;
}
.PropertiesBox_right_footerBtn {
    float: left;
}

.PropertiesBox_preservation {
    height: 36px;
    overflow: hidden;
    width: 100%;
}
.PropertiesBox_preservation_btn {
    float: right;
    margin-left: 10px;
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
