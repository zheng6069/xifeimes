<template>
    <div class="TranFe_maximum">
        <div class="TranFe_Haed">
            <el-form :inline="true" size="medium" class="demo-form-inline">
                <el-form-item label="架次号" class="item">
                    <el-input :disabled="true" v-model="SortieNumber"></el-input>
                </el-form-item>
                <el-form-item label="部件" class="item">
                    <el-input :disabled="true" v-model="parts"></el-input>
                </el-form-item>
                <el-form-item label="移交站位" class="item">
                    <el-input :disabled="true" v-model="TransferStation"></el-input>
                </el-form-item>
                <el-form-item label="接收站位" class="item">
                    <el-input :disabled="true" v-model="ReceivingStation"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="TranFe_contnet">
            <div class="TranFe_contnet_table">
                <div class="TranFe_contnet_table_title">移交实物状态确认表</div>
                <div class="TranFe_contnet_table_Con">
                    <el-table
                        :data="PhysicalState"
                        :header-row-style="{ height: '38px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '34px' }"
                        :cell-style="{ padding: '0px' }"
                        border
                        height="100%"
                        style="width: 100%; height: 100%"
                    >
                        <el-table-column
                            align="center"
                            header-align="center"
                            type="index"
                            label="序号"
                            width="60"
                        ></el-table-column>
                        <el-table-column
                            align="left"
                            header-align="center"
                            prop="facilityNum"
                            label="注意事项"
                        ></el-table-column>
                        <el-table-column
                            align="left"
                            header-align="center"
                            prop="facilityName"
                            label="站位长"
                            width="120"
                        ></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="TranFe_contnet_table">
                <div class="TranFe_contnet_table_title">移交技术状态确认表</div>
                <div class="TranFe_contnet_table_Con">
                    <el-table
                        :data="TechnicalConditions"
                        :header-row-style="{ height: '38px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '34px' }"
                        :cell-style="{ padding: '0px' }"
                        border
                        height="100%"
                        style="width: 100%; height: 100%"
                    >
                        <el-table-column
                            align="center"
                            header-align="center"
                            type="index"
                            label="序号"
                            width="60"
                        ></el-table-column>
                        <el-table-column
                            align="left"
                            header-align="center"
                            prop="facilityNum"
                            label="注意事项"
                        ></el-table-column>
                        <el-table-column
                            align="left"
                            header-align="center"
                            prop="facilityName"
                            label="站位工程师"
                            width="120"
                        ></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="And_DescriptionProcessing">
                <div class="And_FaultDescription">
                    <p>移交站位 备注信息</p>
                    <div class="content">
                        <el-input
                            class="And_FaultDescription_textarea"
                            type="textarea"
                            v-model="handOverRemark"
                            disabled
                        ></el-input>
                    </div>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="TranFe_feer" style="margin-bottom: 20px">
                <el-button
                    @click="PositionCommand"
                    class="StaHan_Haed_Btn"
                    size="medium"
                    type="primary"
                >站位质量信息</el-button>
                <el-button
                    @click="DismantlingInstructions"
                    class="StaHan_Haed_Btn"
                    size="medium"
                    type="primary"
                >拆解指令信息</el-button>
            </div>
            <div class="TranFe_contnet_table">
                <div class="TranFe_contnet_table_title">接收实物状态确认表</div>
                <div class="TranFe_contnet_table_Con">
                    <el-table
                        :data="ReceivingPhysicalObjects"
                        :header-row-style="{ height: '38px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '34px' }"
                        :cell-style="{ padding: '0px' }"
                        border
                        height="100%"
                        style="width: 100%; height: 100%"
                    >
                        <el-table-column
                            align="center"
                            header-align="center"
                            type="index"
                            label="序号"
                            width="60"
                        ></el-table-column>
                        <el-table-column
                            align="left"
                            header-align="center"
                            prop="facilityNum"
                            label="注意事项"
                        ></el-table-column>
                        <el-table-column
                            align="left"
                            header-align="center"
                            prop="facilityName"
                            label="站位长"
                            width="120"
                        >
                            <template slot-scope="scope">
                                <p v-if="!scope.row.isChange" v-text="scope.row.facilityName"></p>
                                <el-input
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="请输入内容"
                                    v-if="scope.row.isChange"
                                    v-model="scope.row.facilityName"
                                ></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="TranFe_contnet_table">
                <div class="TranFe_contnet_table_title">接收技术状态确认表</div>
                <div class="TranFe_contnet_table_Con">
                    <el-table
                        :data="ReceivingTechnology"
                        :header-row-style="{ height: '38px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '34px' }"
                        :cell-style="{ padding: '0px' }"
                        border
                        height="100%"
                        style="width: 100%; height: 100%"
                    >
                        <el-table-column
                            align="center"
                            header-align="center"
                            type="index"
                            label="序号"
                            width="60"
                        ></el-table-column>
                        <el-table-column
                            align="left"
                            header-align="center"
                            prop="facilityNum"
                            label="注意事项"
                        ></el-table-column>
                        <el-table-column
                            align="left"
                            header-align="center"
                            prop="facilityName"
                            label="站位长"
                            width="120"
                        >
                            <template slot-scope="scope">
                                <p v-if="!scope.row.isChange" v-text="scope.row.facilityName"></p>
                                <el-input
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="请输入内容"
                                    v-if="scope.row.isChange"
                                    v-model="scope.row.facilityName"
                                ></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="And_DescriptionProcessing">
            <div class="And_FaultDescription">
                <p>接收站位 备注信息</p>
                <div class="content">
                    <el-input
                        class="And_FaultDescription_textarea"
                        type="textarea"
                        v-model="receptionRemark"
                    ></el-input>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
        <div class="TranFe_feer">
            <el-button
                @click="ONTransferAndPreservation"
                class="StaHan_Haed_Btn"
                size="medium"
                type="primary"
                v-show="Disable"
            >保存</el-button>
            <el-button
                @click="OnSubmit"
                v-show="Disable"
                class="StaHan_Haed_Btn"
                size="medium"
                type="primary"
            >确认</el-button>
            <el-button @click="OnReturn" class="StaHan_Haed_Btn" size="medium" type="primary">返回</el-button>
        </div>
        <!-- 站位质量信息-弹框 -->
        <el-dialog title :visible.sync="PositionCommandVisible" width="70%">
            <el-table border :data="PositionCommandData">
                <el-table-column property="abnormalId" label="质量记载单"></el-table-column>
                <el-table-column property="sortieNo" label="架次号"></el-table-column>
                <el-table-column property="workNo" label="工单号"></el-table-column>
                <el-table-column property="stationName" label="站位号"></el-table-column>
                <el-table-column property="instructNum" label="指令号"></el-table-column>
                <el-table-column property="instructName" label="指令名称"></el-table-column>
                <el-table-column property="person" label="提交人"></el-table-column>
                <el-table-column property="abTime" label="提交时间" :formatter="dateFormat"></el-table-column>
                <el-table-column property="abStatus" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.abStatus == '1'">已提交</span>
                        <span v-else-if="scope.row.abStatus == '2'">检验组长审批完</span>
                        <span v-else-if="scope.row.abStatus == '3'">技术负责人审批完</span>
                        <span v-else-if="scope.row.abStatus == '4'">工艺人员审批完</span>
                        <span v-else-if="scope.row.abStatus == '5'">待封闭</span>
                        <span v-else-if="scope.row.abStatus == '6'">封闭</span>
                    </template>
                </el-table-column>
                <el-table-column property="groupResult" label="处理结果"></el-table-column>
                <el-table-column property="address" label="详细信息">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 拆解指令信息-弹框 -->
        <el-dialog title :visible.sync="DismantlingInstructionsVisible" width="70%">
            <el-table
                border
                :data="DismantlingInstructionsData"
                height="300"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column property="sortieNo" label="架次号"></el-table-column>
                <el-table-column property="beforeStationName" label="站位名称"></el-table-column>
                <el-table-column property="instructNum" label="指令号"></el-table-column>
                <el-table-column property="instructName" label="指令名称"></el-table-column>
                <el-table-column property="stationName" label="拆解至站位名称"></el-table-column>
                <el-table-column property="instructPosition" label="拆解至指令名称"></el-table-column>
                <el-table-column property="status" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == '0'">未申请</span>
                        <span v-else-if="scope.row.status == '1'">已申请</span>
                        <span v-else-if="scope.row.status == '2'">已拆解</span>
                        <span v-else-if="scope.row.status == '3'">已审批</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import { dispatchingManagement } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    data() {
        return {
            handoverId: this.$route.query.handoverId, //接收参数
            HanPage: this.$route.query.HanPage, //接收判断是那个界面过来的
            SortieNumber: "", //架次号
            parts: "", //部件
            TransferStation: "", //移交站位
            ReceivingStation: "", //接收站位
            moveStatus: "", //状态
            TableHeight: {
                height: ""
            },
            PhysicalState: [
                {
                    facilityNum:
                        "吊具、配重块等下架所需工装状态完好，满足要求。",
                    facilityName: ""
                },
                {
                    facilityNum: "运输设备完好，满足要求。",
                    facilityName: ""
                },
                {
                    facilityNum: "吊装转运团队人员已明确分工及责任。",
                    facilityName: ""
                },
                { facilityNum: "运输通道清理完毕。", facilityName: "" },
                { facilityNum: "散件移交实物已确认。", facilityName: "" },
                {
                    facilityNum: "工艺指令已按保留单要求完成封闭。",
                    facilityName: ""
                }
            ],
            TechnicalConditions: [
                {
                    facilityNum: "产品吊装配重方案已确认。",
                    facilityName: ""
                },
                {
                    facilityNum: "吊具重心调整方案已确认。",
                    facilityName: ""
                },
                {
                    facilityNum: "产品下架状态已确认，满足要求。",
                    facilityName: ""
                },
                {
                    facilityNum:
                        "产品保留清晰，并将EO、故障单、拒收单信息纳入保留单管控。",
                    facilityName: ""
                },
                { facilityNum: "散件移交实物已确认。", facilityName: "" }
            ],
            ReceivingPhysicalObjects: [
                {
                    facilityNum:
                        "吊具、配重块等下架所需工装状态完好，满足要求。",
                    facilityName: ""
                },
                {
                    facilityNum: "运输设备完好，满足要求。",
                    facilityName: ""
                },
                {
                    facilityNum: "吊装转运团队人员已明确分工及责任。",
                    facilityName: ""
                },
                {
                    facilityNum: "运输通道清理完毕。",
                    facilityName: ""
                },
                { facilityNum: "散件移交实物已确认。", facilityName: "" },
                {
                    facilityNum: "工艺指令已按保留单要求完成封闭。",
                    facilityName: ""
                }
            ],
            ReceivingTechnology: [
                {
                    facilityNum: "产品吊装配重方案已确认。",
                    facilityName: ""
                },
                {
                    facilityNum: "吊具重心调整方案已确认。",
                    facilityName: ""
                },
                {
                    facilityNum: "产品下架状态已确认，满足要求。",
                    facilityName: ""
                },
                {
                    facilityNum:
                        "产品保留清晰，并将EO、故障单、拒收单信息纳入保留单管控。",
                    facilityName: ""
                },
                { facilityNum: "散件移交实物已确认。", facilityName: "" }
            ],
            DeleteArr: [],
            MergeArr: [],
            Disable: false,
            handOverRemark: "", // 移交站位备注信息
            receptionRemark: "", // 接收站位备注信息
            PositionCommandVisible: false, // 站位质量信息弹框
            PositionCommandData: [],
            DismantlingInstructionsVisible: false, // 拆解指令信息弹框
            DismantlingInstructionsData: []
        };
    },
    created() {
        this.ReceivingPhysicalObjects.map(val => {
            //循环让table 可以修改数量
            val.isChange = false;
        });
        this.ReceivingTechnology.map(val => {
            //循环让table 可以修改数量
            val.isChange = false;
        });
        this.OnQuery();
    },
    methods: {
        //查询接收信息确认信息
        OnQuery() {
            this.axios
                .get(dispatchingManagement.GET_K_Transfer, {
                    params: {
                        handoverId: this.handoverId
                    }
                })
                .then(res => {
                    // this.QueryArr = res.data
                    this.receptionRemark = res.data.receiveRemarks; // 接收备注信息
                    this.handOverRemark = res.data.handoverRemarks; // 移交备注信息
                    this.SortieNumber = res.data.sortieNo; //架次号
                    this.parts = res.data.movePart; //部件
                    this.TransferStation = res.data.stationName; //移交站位
                    this.ReceivingStation = res.data.receiveStation; //接收站位
                    this.moveStatus = res.data.moveStatus; //状态
                    if (res.data.moveObjects != undefined) {
                        this.PhysicalState = res.data.moveObjects; //移交实物状态确认表
                        this.TechnicalConditions = res.data.moveSkills; //移交技术状态确认表
                    }
                    if (res.data.receiveObjects != undefined) {
                        this.ReceivingPhysicalObjects = res.data.receiveObjects; //接收实物状态确认表
                        this.ReceivingTechnology = res.data.receiveSkills; //接收技术状态确认表
                    }
                    if (this.HanPage == 2) {
                        this.ReceivingPhysicalObjects.map(val => {
                            //循环让table 可以修改数量
                            val.isChange = false;
                        });
                        this.ReceivingTechnology.map(val => {
                            //循环让table 可以修改数量
                            val.isChange = false;
                        });
                        this.Disable = false;
                    } else if (this.HanPage == 1) {
                        this.ReceivingPhysicalObjects.map(val => {
                            //循环让table 可以修改数量
                            val.isChange = true;
                        });
                        this.ReceivingTechnology.map(val => {
                            //循环让table 可以修改数量
                            val.isChange = true;
                        });
                        this.Disable = true;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 站位质量信息
        PositionCommand() {
            this.PositionCommandVisible = true;
            let that = this;
            that.axios
                .post(dispatchingManagement.GET_K_selectQualityInfo)
                .then(res => {
                    that.PositionCommandData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 站位质量信息 - 查看详细信息
        handleClick(row) {
            this.$router.push({
                path: "PositionInstructSee",
                query: {
                    abnormalId: row.abnormalId
                }
            });
        },
        // 拆解指令信息
        DismantlingInstructions() {
            this.DismantlingInstructionsVisible = true;
            let that = this;
            that.axios
                .post(dispatchingManagement.GET_K_selectInstructInfo)
                .then(res => {
                    that.DismantlingInstructionsData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //接收保存
        ONTransferAndPreservation() {
            this.axios({
                method: "post",
                url: dispatchingManagement.GET_K_TransferAndPreservation,
                data: {
                    receiveObjects: this.ReceivingPhysicalObjects, //实物状态确认表
                    receiveSkills: this.ReceivingTechnology, //技术状态确认表
                    movePart: this.parts, //部位
                    moveStatus: 2, //状态
                    handoverId: this.handoverId, //ID
                    receiveRemarks: this.receptionRemark // 接收备注
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
        //确认
        OnSubmit() {
            let num = 0; //在点击的时候先声明一个数字 为0
            this.MergeArr = this.ReceivingPhysicalObjects.concat(
                this.ReceivingTechnology
            );
            for (var i = 0; i < this.MergeArr.length; i++) {
                if (this.MergeArr[i].facilityName == "") {
                    this.$message({
                        message: "请确认所有注意事项",
                        type: "warning",
                        duration: 1500
                    });
                    break;
                } else {
                    num += 1; //循环的时候在遇到name不为空的时候给他加1
                    if (num == this.MergeArr.length) {
                        this.axios({
                            method: "post",
                            url:
                                dispatchingManagement.GET_K_TransferAndPreservation,
                            data: {
                                moveObjects: this.PhysicalState, //实物状态确认表
                                moveSkills: this.TechnicalConditions, //技术状态确认表
                                movePart: this.parts, //部位
                                moveStatus: 3, //状态
                                handoverId: this.handoverId, //ID
                                receiveRemarks: this.receptionRemark // 接收备注
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
                    }
                }
            }
        },
        //返回
        OnReturn() {
            if (this.HanPage == 2) {
                this.$router.push({
                    path: "StationHandoverRecord"
                });
            } else if (this.HanPage == 1) {
                this.$router.push({
                    path: "StationHandover"
                });
            }
        },
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd")
                : "";
        }
    }
};
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}
.TranFe_maximum {
    padding: 10px;
}
.TranFe_Haed {
    height: 45px;
    overflow: hidden;
}
.TranFe_Haed_Inp {
    width: 200px;
    float: left;
    margin-right: 10px;
}
.TranFe_contnet {
    width: 100%;
}
.TranFe_contnet_table {
    width: 100%;
    margin-bottom: 10px;
}
.TranFe_contnet_table_title {
    height: 30px;
    font-size: 14px;
    line-height: 30px;
}
.TranFe_feer {
    height: 30px;
}
.And_DescriptionProcessing {
    height: 55px;
    margin: 20px 0px;
}
.And_FaultDescription {
    width: 50%;
    height: 100%;
    float: left;
    overflow: hidden;
}
.And_FaultDescription p {
    width: 80px;
    height: 100%;
    float: left;
    box-sizing: border-box;
}
.And_FaultDescription .content {
    width: calc(100% - 80px);
    width: -moz-calc(100% - 80px);
    width: -webkit-calc(100% - 80px);
    width: -o-calc(100% - 80px);

    height: 100%;
    float: left;
}
.And_FaultDescription_textarea {
    width: 100%;
}
</style>
