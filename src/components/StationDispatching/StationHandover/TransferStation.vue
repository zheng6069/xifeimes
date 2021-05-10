<template>
    <div class="TranFe_maximum">
        <div class="TranFe_Haed">
            <el-form :inline="true" size="medium" class="demo-form-inline">
                <el-form-item label="架次号" class="item">
                    <el-input :disabled="true" v-model="SortieNumber"></el-input>
                </el-form-item>
                <el-form-item label="部件" class="item">
                    <el-input v-model="parts"></el-input>
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
                <div class="TranFe_contnet_table_title">实物状态确认表</div>
                <div class="TranFe_contnet_table_Con">
                    <el-table
                        :data="PhysicalState"
                        ref="multipleTable"
                        @selection-change="Tick"
                        :header-row-style="{ height: '38px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '34px' }"
                        :cell-style="{ padding: '0px' }"
                        border
                        height="100%"
                        style="width: 100%;height:100%;"
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
                                    style="width:100%"
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
                <div class="TranFe_contnet_table_title">技术状态确认表</div>
                <div class="TranFe_contnet_table_Con">
                    <el-table
                        :data="TechnicalConditions"
                        ref="multipleTable"
                        @selection-change="Tick"
                        :header-row-style="{ height: '38px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '34px' }"
                        :cell-style="{ padding: '0px' }"
                        border
                        height="100%"
                        style="width: 100%;height:100%;"
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
                        >
                            <template slot-scope="scope">
                                <p v-if="!scope.row.isChange" v-text="scope.row.facilityName"></p>
                                <el-input
                                    size="mini"
                                    style="width:100%"
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
                <p>备注信息</p>
                <div class="content">
                    <el-input
                        class="And_FaultDescription_textarea"
                        type="textarea"
                        v-model="TransferStationRemark"
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
            >保存</el-button>
            <el-button @click="OnSubmit" class="StaHan_Haed_Btn" size="medium" type="primary">提交</el-button>
            <el-button @click="OnReturn" class="StaHan_Haed_Btn" size="medium" type="primary">返回</el-button>
        </div>
    </div>
</template>

<script>
import { dispatchingManagement } from "../../../common/api";
export default {
    data() {
        return {
            handoverId: this.$route.query.handoverId, //接收参数
            SortieNumber: "", //架次号
            parts: "", //部件
            TransferStation: "", //移交站位
            ReceivingStation: "", //接收站位
            moveStatus: "", //状态
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
            DeleteArr: [],
            MergeArr: [],
            TransferStationRemark: "" // 移交备注
        };
    },
    created() {
        this.PhysicalState.map(val => {
            //循环让table 可以修改数量
            val.isChange = true;
        });
        this.TechnicalConditions.map(val => {
            //循环让table 可以修改数量
            val.isChange = true;
        });
        this.OnQuery();
    },
    methods: {
        //查询移交确认信息
        OnQuery() {
            this.axios
                .get(dispatchingManagement.GET_K_Transfer, {
                    params: {
                        handoverId: this.handoverId
                    }
                })
                .then(res => {
                    // this.QueryArr = res.data
                    this.TransferStationRemark = res.data.handoverRemarks; // 移交备注信息
                    this.SortieNumber = res.data.sortieNo; //架次号
                    this.parts = res.data.movePart; //部件
                    this.TransferStation = res.data.stationName; //移交站位
                    this.ReceivingStation = res.data.receiveStation; //接收站位
                    this.moveStatus = res.data.moveStatus; //状态
                    if (res.data.moveObjects != undefined) {
                        this.PhysicalState = res.data.moveObjects; //实物状态确认表
                        this.TechnicalConditions = res.data.moveSkills; //技术状态确认表
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //移交保存
        ONTransferAndPreservation() {
            this.axios({
                method: "post",
                url: dispatchingManagement.GET_K_TransferAndPreservation,
                data: {
                    moveObjects: this.PhysicalState, //实物状态确认表
                    moveSkills: this.TechnicalConditions, //技术状态确认表
                    movePart: this.parts, //部位
                    moveStatus: 0, //状态
                    handoverRemarks: this.TransferStationRemark, // 移交备注
                    handoverId: this.handoverId //ID
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
        //提交
        OnSubmit() {
            let num = 0; //在点击的时候先声明一个数字 为0
            this.MergeArr = this.PhysicalState.concat(this.TechnicalConditions);
            for (var i = 0; i < this.MergeArr.length; i++) {
                if (this.MergeArr[i].facilityName == "") {
                    this.$message({
                        //失败后的提示
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
                                moveStatus: 1, //状态
                                handoverRemarks: this.TransferStationRemark, // 移交备注
                                handoverId: this.handoverId //ID
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
        //勾选
        Tick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.DeleteArr = row.pop(); //储存新的单选数据
            }
        },
        //返回
        OnReturn() {
            this.$router.push({
                path: "StationHandover"
            });
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
    /* overflow: hidden; */
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
    margin-top: 17px;
    box-sizing: border-box;
    /* margin-left: 20px; */
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
