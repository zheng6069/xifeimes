<template>
    <div>
        <div class="contnet">
            <div class="contnet_table" :style="TableHeight">
                <div class="contnet_table_left">
                    <div class="top_position">
                        <p class="top_position_title">站位AO信息</p>
                        <div class="top_position_table">
                            <el-table
                                :data="positionOAArr"
                                @row-click="positionOAClickToGet"
                                border
                                height="100%"
                                style="width: 100%; height: 100%"
                                :header-row-style="{ height: '38px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '34px' }"
                                :cell-style="{ padding: '0px' }"
                            >
                                <el-table-column prop="aoNo" label="AO编码"></el-table-column>
                                <el-table-column prop="aoName" label="AO名称"></el-table-column>
                                <el-table-column prop="stationName" label="站位名称"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="bottom_instruction">
                        <p class="bottom_instruction_title">指令信息</p>
                        <div class="bottom_instruction_table">
                            <el-table
                                border
                                :data="InstructionInformationARR"
                                @row-click="InstructionDetails"
                                height="100%"
                                style="width: 100%; height: 100%"
                                :header-row-style="{ height: '38px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '34px' }"
                                :cell-style="{ padding: '0px' }"
                            >   
                            
                                <el-table-column prop="instructNum" label="指令号"></el-table-column>
                                <el-table-column prop="instructName" label="指令名称"></el-table-column>
                                <el-table-column prop="riskLevel" label="风险级别"></el-table-column>
                                <el-table-column prop="version" width="50" label="版本"></el-table-column>
                                
                            </el-table>
                        </div>
                    </div>
                </div>
                <div class="detailedInformation_title" v-show="inShow">指令详细信息</div>
                <div class="contnet_table_right" v-show="inShow">
                    <div class="detailedInformation_head">
                        <div class="detailedInformation_head_div">
                            <p>指令名称</p>
                            <div>
                                <el-input v-model="InstructionName" size="medium" placeholder="请输入"></el-input>
                            </div>
                        </div>

                        <div class="detailedInformation_head_div">
                            <p>版本</p>
                            <div>
                                <el-input v-model="zhiledition" size="medium" placeholder="请输入"></el-input>
                            </div>
                        </div>

                        <el-button
                            @click="RouteBnt"
                            size="medium"
                            type="primary"
                            class="detailedInformation_head_bnt"
                        >返回</el-button>
                    </div>
                    <div class="detailedInformation_con">
                        <div class="detailedInformation_content">
                            <div class="InstructionContent">
                                <p class="InstructionContent_p">指令内容</p>
                                <div class="InstructionContent_div">
                                    <textarea
                                        v-model="zhildescription"
                                        class="InstructionContent_input"
                                        cols="30"
                                        rows="4"
                                    >
 
                                        这是个文本域
                                    </textarea>
                                </div>
                            </div>
                            <div class="DeviceInformation">
                                <p class="DeviceInformation_p">设备信息</p>
                                <div class="DeviceInformation_div">
                                    <el-table
                                        border
                                        :data="DeviceInformation"
                                        height="100%"
                                        style="width: 100%; height: 100%"
                                        :header-row-style="{ height: '38px' }"
                                        :header-cell-style="{ padding: '0px' }"
                                        :row-style="{ height: '34px' }"
                                        :cell-style="{ padding: '0px' }"
                                    >
                                        <el-table-column prop="facilityName" label="名称"></el-table-column>
                                        <el-table-column prop="facilityType" label="设备类型"></el-table-column>
                                        <el-table-column prop="facilityCode" label="编码"></el-table-column>
                                        <el-table-column prop="specifications" label="设备规格"></el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <div class="AuxiliaryMaterials">
                                <p class="AuxiliaryMaterials_p">辅材信息</p>
                                <div class="AuxiliaryMaterials_div">
                                    <el-table
                                        border
                                        :data="AuxiliaryMaterialInformation"
                                        height="100%"
                                        style="width: 100%; height: 100%"
                                        :header-row-style="{ height: '38px' }"
                                        :header-cell-style="{ padding: '0px' }"
                                        :row-style="{ height: '34px' }"
                                        :cell-style="{ padding: '0px' }"
                                    >
                                        <el-table-column prop="assemName" label="辅材名称"></el-table-column>
                                        <el-table-column prop="assemProduct" label="辅材图号"></el-table-column>
                                        <el-table-column prop="unit" width="50" label="单位"></el-table-column>
                                        <el-table-column prop="version" width="50" label="版本"></el-table-column>
                                        <el-table-column prop="qty" width="50" label="数量"></el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <div class="Insert">
                                <p class="Insert_p">装入件信息</p>
                                <div class="Insert_div">
                                    <el-table
                                        border
                                        :data="InsertInformation"
                                        height="100%"
                                        style="width: 100%; height: 100%"
                                        :header-row-style="{ height: '38px' }"
                                        :header-cell-style="{ padding: '0px' }"
                                        :row-style="{ height: '34px' }"
                                        :cell-style="{ padding: '0px' }"
                                    >
                                        <el-table-column prop="assemProduct" label="装入件图号"></el-table-column>
                                        <el-table-column prop="assemName" label="装入件名称"></el-table-column>
                                        <el-table-column prop="version" width="50" label="版本"></el-table-column>
                                        <el-table-column prop="qty" width="50" label="数量"></el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <div class="tool">
                                <p class="tool_p">工具信息</p>
                                <div class="tool_div">
                                    <el-table
                                        border
                                        :data="ToolInformation"
                                        height="100%"
                                        style="width: 100%; height: 100%"
                                        :header-row-style="{ height: '38px' }"
                                        :header-cell-style="{ padding: '0px' }"
                                        :row-style="{ height: '34px' }"
                                        :cell-style="{ padding: '0px' }"
                                    >
                                        <el-table-column prop="toolName" label="工具名称"></el-table-column>
                                        <el-table-column prop="toolCode" label="工具编码"></el-table-column>
                                        <el-table-column prop="toolSpec" width="50" label="规格"></el-table-column>
                                        <el-table-column prop="qty" width="50" label="数量"></el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <div class="WorkClothes">
                                <p class="WorkClothes_p">工装信息</p>
                                <div class="WorkClothes_div">
                                    <el-table
                                        border
                                        :data="ToolingInformation"
                                        height="100%"
                                        style="width: 100%; height: 100%"
                                        :header-row-style="{ height: '38px' }"
                                        :header-cell-style="{ padding: '0px' }"
                                        :row-style="{ height: '34px' }"
                                        :cell-style="{ padding: '0px' }"
                                    >
                                        <el-table-column prop="frockName" label="工装名称"></el-table-column>
                                        <el-table-column prop="frockProduct" label="工装图号"></el-table-column>
                                        <el-table-column prop="frockType" width="50" label="属性"></el-table-column>
                                        <el-table-column prop="qty" width="50" label="数量"></el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
* {
    margin: 0px;
    padding: 0px;
}

.detailedInformation_title {
    width: 79%;
    float: right;
    text-indent: 10px;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
}

.contnet {
    width: 100%;
}
.contnet_table {
    padding: 0px 10px;
    height: 100%;
}
.contnet_table_left {
    width: 20%;
    height: 100%;
    float: left;
}

.top_position {
    width: 100%;
    height: 50%;
}
.top_position_title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
}
.top_position_table {
    width: 100%;
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
.bottom_instruction {
    width: 100%;
    height: 50%;
}
.bottom_instruction_title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
}
.bottom_instruction_table {
    width: 100%;
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
.contnet_table_right {
    width: 79%;
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
    float: right;
    border: 1px solid #f1f1f1;
    box-sizing: border-box;
}
.detailedInformation_head {
    width: 100%;
    height: 50px;
    overflow: hidden;
}
.detailedInformation_head_div {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.detailedInformation_head_div p {
    width: 60px;
    float: left;
    line-height: 36px;
    font-size: 14px;
}
.detailedInformation_head_div div {
    width: 180px;
    float: left;
}
.detailedInformation_head_bnt {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}
.detailedInformation_con {
    width: 100%;
    height: -moz-calc(100% - 60px); /* WebKit */
    height: -webkit-calc(100% - 60px); /* Opera */
    height: -o-calc(100% - 60px); /* Standard */
    height: calc(100% - 60px);
}
.detailedInformation_content {
    width: calc(100% - 20px);
    height: 100%;
    margin-left: 10px;
}
.InstructionContent {
    width: 33%;
    height: 49.5%;
    float: left;
}
.InstructionContent_p {
    width: 100%;
    height: 20px;
    font-size: 12px;
}
.InstructionContent_div {
    width: 100%;
    height: -moz-calc(100% - 20px); /* WebKit */
    height: -webkit-calc(100% - 20px); /* Opera */
    height: -o-calc(100% - 20px); /* Standard */
    height: calc(100% - 20px);
}
.InstructionContent_input {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
.DeviceInformation {
    width: 33%;
    height: 49.5%;
    float: left;
    margin-left: 1%;
}
.DeviceInformation_p {
    width: 100%;
    height: 20px;
    font-size: 12px;
}
.DeviceInformation_div {
    width: 100%;
    height: -moz-calc(100% - 20px); /* WebKit */
    height: -webkit-calc(100% - 20px); /* Opera */
    height: -o-calc(100% - 20px); /* Standard */
    height: calc(100% - 20px);
}
.AuxiliaryMaterials {
    width: 32%;
    height: 49.5%;
    float: left;
    margin-left: 1%;
}
.AuxiliaryMaterials_p {
    width: 100%;
    height: 20px;
    font-size: 12px;
}
.AuxiliaryMaterials_div {
    width: 100%;
    height: -moz-calc(100% - 20px); /* WebKit */
    height: -webkit-calc(100% - 20px); /* Opera */
    height: -o-calc(100% - 20px); /* Standard */
    height: calc(100% - 20px);
}
.Insert {
    width: 33%;
    height: 49.5%;
    float: left;
    margin-top: 1%;
}
.Insert_p {
    width: 100%;
    height: 20px;
    font-size: 12px;
}
.Insert_div {
    width: 100%;
    height: -moz-calc(100% - 20px); /* WebKit */
    height: -webkit-calc(100% - 20px); /* Opera */
    height: -o-calc(100% - 20px); /* Standard */
    height: calc(100% - 20px);
}
.tool {
    width: 33%;
    height: 49.5%;
    float: left;
    margin-left: 1%;
    margin-top: 1%;
}
.tool_p {
    width: 100%;
    height: 20px;
    font-size: 12px;
}
.tool_div {
    width: 100%;
    height: -moz-calc(100% - 20px); /* WebKit */
    height: -webkit-calc(100% - 20px); /* Opera */
    height: -o-calc(100% - 20px); /* Standard */
    height: calc(100% - 20px);
}
.WorkClothes {
    width: 32%;
    height: 49.5%;
    float: left;
    margin-left: 1%;
    margin-top: 1%;
}
.WorkClothes_p {
    width: 100%;
    height: 20px;
    font-size: 12px;
}
.WorkClothes_div {
    width: 100%;
    height: -moz-calc(100% - 20px); /* WebKit */
    height: -webkit-calc(100% - 20px); /* Opera */
    height: -o-calc(100% - 20px); /* Standard */
    height: calc(100% - 20px);
}
</style>
<script>
import { ProcessSpecification } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            workFlowId: this.$route.query.workFlowId,
            DrawingNo: "", //图号
            edition: "", //版本
            ProcessSpecificationId: "", //工艺规程id
            InstructionInformationARR: [], //指令信息
            DeviceInformation: [], //设备信息
            AuxiliaryMaterialInformation: [], //辅材信息
            InsertInformation: [], //装入件信息
            ToolInformation: [], //工具信息
            ToolingInformation: [], //工装信息
            InstructionName: "", //指令名称
            zhiledition: "", //版本
            zhildescription: "", //指令描述
            TestItemQuery: "",
            tableData: [],
            TableHeight: {
                height: ""
            },
            positionOAArr: [],
            inShow: false
        };
    },
    created() {
        this.positionListOA();
        // this.InstructionInformation();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 10 + "px";
        },
        // 查询 站位
        positionListOA() {
            this.axios
                .get(ProcessSpecification.GET_A_findStation, {
                    params: {
                        workFlowId: this.workFlowId
                    }
                })
                .then(res => {
                    this.positionOAArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 站位查指令
        positionOAClickToGet(row) {
            this.inShow = false;
            this.axios
                .get(ProcessSpecification.GET_A_findInstructByStation, {
                    params: {
                        stationId: row.stationId
                    }
                })
                .then(res => {
                    this.InstructionInformationARR = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //指令详细信息
        InstructionDetails(row) {
            if (row.instructId != "") {
                this.axios
                    .get(ProcessSpecification.DetailedInformation, {
                        params: {
                            instructId: row.instructId
                        }
                    })
                    .then(res => {
                        this.inShow = true;
                        this.DeviceInformation = res.data.facilityEntityList;
                        this.AuxiliaryMaterialInformation =
                            res.data.assistEntityList;
                        this.InsertInformation =
                            res.data.assemProductEntityList;
                        this.ToolInformation = res.data.toolEntityList;
                        this.ToolingInformation = res.data.frockEntityList;
                        this.InstructionName = res.data.instructName; //指令名称
                        this.zhiledition = res.data.version; //版本
                        this.zhildescription = res.data.description; //描述
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        RouteBnt() {
            this.$router.push({
                path: "ProcessSpecificationHmoe"
            });
        }
    }
};
</script>