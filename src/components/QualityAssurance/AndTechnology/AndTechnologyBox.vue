<template>
    <div>
        <div class="Andn_Search">
            <el-form :inline="true" class="demo-form-inline" size="medium">
                <el-form-item label="质量记载单号" class="item">
                    <el-input :disabled="true" v-model="QualityRecordNo"></el-input>
                </el-form-item>
                <el-form-item label="工单号" class="item">
                    <el-input :disabled="true" v-model="WorkOrderNo"></el-input>
                </el-form-item>
                <el-form-item label="指令号" class="item">
                    <el-input :disabled="true" v-model="InstructionNumber"></el-input>
                </el-form-item>
                <el-form-item label="指令名称" class="item">
                    <el-input :disabled="true" v-model="InstructionName"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="Andn_contnet" :style="TableHeight">
            <div class="Andn_contnet_table">
                <el-table
                    border
                    :data="QueryArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="60"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="assemName" label="零部组件名称" width="300"></el-table-column>
                    <el-table-column prop="assemProduct" label="零部组件图号" width="300"></el-table-column>
                    <el-table-column prop="description" label="问题描述"></el-table-column>
                    <el-table-column label="附件" width="105">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="OnSee(scope.$index, scope.row)"
                            >查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!----------- 技术文档弹框 ------------->
        <el-dialog :visible.sync="TechnicalDocumentation" width="70%">
            <div style="height: 300px">
                <el-table
                    ref="multipleTable"
                    border
                    :data="TechnicalOnAddArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column prop="name" label="文档名称"></el-table-column>
                    <el-table-column label="操作" width="175">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="SeeFile(scope.$index, scope.row)"
                            >查看文档</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <div class="Andn_DescriptionProcessing">
            <div class="Andn_FaultDescription">
                <p>检验组长 处理意见</p>
                <div>
                    <el-input
                        :disabled="true"
                        v-model="FaultDescription"
                        style="width: 100%"
                        type="textarea"
                    ></el-input>
                </div>
            </div>
            <div class="Andn_HandlingOpinions">
                <p>技术负责人处理意见</p>
                <div>
                    <el-input
                        :disabled="true"
                        v-model="HandlingOpinions"
                        style="width: 100%"
                        type="textarea"
                    ></el-input>
                </div>
            </div>
        </div>
        <div class="Andn_fooer">
            <div class="Andn_ProcessingResults">
                <p>处理结果</p>
                <div>
                    <el-select
                        size="medium"
                        v-model="ProcessingResults"
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
                </div>
            </div>
        </div>
        <div class="Andn_DescriptionProcessing">
            <div class="Andn_FaultDescription">
                <p>
                    工艺
                    <br />处理意见
                </p>
                <div>
                    <el-input v-model="ReworkInformation" style="width: 100%" type="textarea"></el-input>
                </div>
            </div>
        </div>
        <div class="Andn_btn">
            <el-button @click="OnPreservation" type="primary">保存</el-button>
            <el-button @click="OnSubmit" type="primary">提交</el-button>
            <el-button @click="OnReturn" type="primary">返回</el-button>
        </div>
    </div>
</template>

<script>
import { AssemblyPerform, BasicData } from "../../../common/api";
export default {
    data() {
        return {
            abnormalId: this.$route.query.abnormalId, //接收参数
            QualityRecordNo: "", //质量记载单号
            WorkOrderNo: "", //工单号
            InstructionNumber: "", //指令号
            InstructionName: "", //指令名称
            FaultDescription: "", //故障描述
            HandlingOpinions: "", //技术负责人处理意见
            ProcessingResults: "", //处理结果
            Technologist: "", //指定返工处理人
            ReworkInformation: "", //返工信息
            ReworkStation: "", //返工站位
            TechnicalDocumentation: false, //技术文档弹框
            TechnicalOnAddArr: [],
            TableHeight: {
                height: ""
            },
            QueryArr: [],
            optionOne: [], // 处理结果
            optionTwo: [], // 返回站位
            optionThree: [] // 处理人
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OnQuery();
        this.getOptionOneInfo();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 300 + "px";
        },
        // 查询处理结果
        getOptionOneInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 14
                    }
                })
                .then(res => {
                    that.optionOne = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //默认查询生产全部任务
        OnQuery() {
            this.axios
                .get(AssemblyPerform.GET_C_DetailedQuery, {
                    params: {
                        abnormalId: this.abnormalId
                    }
                })
                .then(res => {
                    this.QualityRecordNo = res.data.abnormalNum; //质量记载单号
                    this.WorkOrderNo = res.data.workNo; //工单号
                    this.InstructionNumber = res.data.instructNum; //指令号
                    this.InstructionName = res.data.instructName; //指令名称

                    this.FaultDescription = res.data.groupAdvice; //检验组长处理意见
                    this.HandlingOpinions = res.data.technicalAdvice; //技术负责人处理意见

                    this.ProcessingResults = res.data.groupResult; //处理结果
                    this.ReworkStation = res.data.reworkStationName; //返工站位
                    this.Technologist = res.data.reworkPerson; //指定返工处理人
                    this.ReworkInformation = res.data.reworkInformation; //返工信息
                    if (res.data.success === false) {
                        return false;
                    } else {
                        this.QueryArr.push(res.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查看附件
        OnSee(index, row) {
            console.log(index, row);
            this.TechnicalDocumentation = true;
            this.OnAddArr();
        },
        //获取全部文件
        OnAddArr() {
            this.axios
                .get(
                    BasicData.GET_D_QueryFile +
                        "?dataId=" +
                        this.abnormalId +
                        "&category=ABNORMAL"
                )
                .then(res => {
                    this.TechnicalOnAddArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查看文件
        SeeFile(index, row) {
            window.open(row.url);
        },
        // 提交
        OnSubmit() {
            if (this.HandlingOpinions != "") {
                this.axios({
                    method: "post",
                    url: AssemblyPerform.GET_C_Submit,
                    data: {
                        abStatus: 5, //状态
                        abnormalId: this.abnormalId, //id
                        groupResult: this.ProcessingResults, //处理结果
                        reworkStationName: this.ReworkStation, //返工站位
                        reworkPerson: this.Technologist, //指定返工处理人
                        reworkInformation: this.ReworkInformation //返工信息
                    }
                })
                    .then(res => {
                        if (res.data.success === true) {
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
                    //失败后的提示
                    message: "请填写处理意见",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //保存
        OnPreservation() {
            this.axios({
                method: "post",
                url: AssemblyPerform.GET_C_Submit,
                data: {
                    abnormalId: this.abnormalId, //id
                    groupResult: this.ProcessingResults, //处理结果
                    reworkStationName: this.ReworkStation, //返工站位
                    reworkPerson: this.Technologist, //指定返工处理人
                    reworkInformation: this.ReworkInformation //返工信息
                }
            })
                .then(res => {
                    if (res.data.success === true) {
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
        },
        //返回
        OnReturn() {
            this.$router.push({
                path: "AndTechnology"
            });
        }
    }
};
</script>

<style>
.Andn_Search .el-input {
    width: 200px;
}
.Andn_Search .item .el-form-item__label {
    font-size: 16px;
    color: #000000;
}
.Andn_contnet {
    width: 100%;
    height: 50px;
}
.demo-form-inline {
    width: 100%;
    height: 50px;
}
.Andn_contnet_table {
    height: 100%;
}
.Andn_DetectPaging {
    height: 35px;
    margin-top: 5px;
}
.Andn_DescriptionProcessing {
    height: 55px;
    overflow: hidden;
    margin-top: 10px;
}
.Andn_FaultDescription {
    width: 49.5%;
    height: 100%;
    float: left;
    overflow: hidden;
}
.Andn_FaultDescription p {
    width: 80px;
    height: 100%;
    float: left;
    margin: 0px;
    word-wrap: break-word;
    word-break: normal;
}
.Andn_FaultDescription div {
    width: calc(100% - 80px);
    width: -moz-calc(100% - 80px);
    width: -webkit-calc(100% - 80px);
    width: -o-calc(100% - 80px);
    height: 100%;
    float: left;
}
.Andn_HandlingOpinions {
    width: 49.5%;
    height: 100%;
    float: right;
    overflow: hidden;
}
.Andn_HandlingOpinions p {
    width: 80px;
    height: 100%;
    float: left;
    margin: 0px;
    word-wrap: break-word;
    word-break: normal;
}
.Andn_HandlingOpinions div {
    width: calc(100% - 80px);
    width: -moz-calc(100% - 80px);
    width: -webkit-calc(100% - 80px);
    width: -o-calc(100% - 80px);
    height: 100%;
    float: left;
}
.Andn_fooer {
    height: 40px;
    margin-top: 10px;
    overflow: hidden;
}
.Andn_ProcessingResults {
    width: 280px;
    overflow: hidden;
    float: left;
    margin-right: 10px;
}
.Andn_ProcessingResults p {
    width: 80px;
    float: left;
    margin: 0px;
    line-height: 40px;
}
.Andn_ProcessingResults div {
    width: 200px;
    float: left;
}
.Andn_btn {
    height: 40px;
    margin-top: 10px;
}
</style>
