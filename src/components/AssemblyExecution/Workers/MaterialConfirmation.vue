<template>
    <div>
        <div class="Storage_title">
            <div class="Storage_head">
                <p>
                    <i class="el-icon-full-screen"></i>
                </p>
                <div>
                    <el-input v-model="QRCode" size="medium" placeholder="请扫描" clearable></el-input>
                </div>
            </div>
        </div>
        <div class="AdvanElasticFrame_top">
            <el-form :model="ruleForm" :inline="true" class="demo-form-inline">
                <el-form-item label="物料名称" prop="One">
                    <el-input v-model="ruleForm.One" size="medium" placeholder="请核对扫描信息" disabled></el-input>
                </el-form-item>
                <el-form-item label="物料图号" prop="Two">
                    <el-input v-model="ruleForm.Two" size="medium" placeholder="请核对扫描信息" disabled></el-input>
                </el-form-item>
                <el-form-item label="合格证号" prop="Three">
                    <el-input v-model="ruleForm.Three" size="medium" placeholder="请核对扫描信息" disabled></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="Four">
                    <el-input v-model="ruleForm.Four" size="medium" placeholder="请核对扫描信息" disabled></el-input>
                </el-form-item>
                <el-form-item label="生产厂商" prop="Five">
                    <el-input v-model="ruleForm.Five" size="medium" placeholder="请核对扫描信息" disabled></el-input>
                </el-form-item>
                <el-form-item label="架次号" prop="Six">
                    <el-input v-model="ruleForm.Six" size="medium" placeholder="请核对扫描信息" disabled></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="medium" type="primary" @click="affirm">确认</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="OuteSo_head">
            <div class="OuteSo_head_left">
                <p style="width: 70px">合格证号</p>
                <div>
                    <el-input v-model="CertificateNo" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>

            <el-button @click="OnQuery" size="medium" type="primary" class="OuteSo_head_bnt">查询</el-button>
            <el-button size="medium" type="primary" class="OuteSo_head_Bnt" @click="affirmRe">返回</el-button>
        </div>

        <div class="OuteSo_contnet" :style="TableHeight">
            <div class="OuteSo_contnet_table">
                <el-table
                    ref="multipleTable"
                    @selection-change="Tick"
                    border
                    :data="QueryArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="assemProduct" label="物料图号" width="180"></el-table-column>
                    <el-table-column prop="assemName" label="名称"></el-table-column>
                    <el-table-column prop="version" label="规格" width="150"></el-table-column>
                    <el-table-column prop="amount" label="数量" width="180"></el-table-column>
                    <el-table-column prop="amountUnit" label="单位" width="100"></el-table-column>
                    <el-table-column prop="serialNumber" label="产品序号" width="250"></el-table-column>
                    <el-table-column prop="workNo" label="配套工单" width="180"></el-table-column>
                    <el-table-column prop="sortieNo" label="架次号" width="160"></el-table-column>
                    <el-table-column prop="stationName" label="配套站位" width="160"></el-table-column>
                    <el-table-column prop="manufacturer" label="生产单位" width="160"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { AssemblyPerform } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            instructId: this.$route.query.instructId,
            orderId: this.$route.query.orderId,
            CertificateNo: "", //合格证号
            QueryArr: [], //检测项table数据
            TableHeight: {
                height: ""
            },
            DeleteArr: [],
            outId: "",
            QRCode: "", //二维码
            ruleForm: {
                One: "", // 物料名称
                Two: "", // 物料图号
                Three: "", // 合格证号
                Four: "", // 数量
                Five: "", // 生产厂商
                Six: "" // 架次号
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OnQuery();
        this.QR();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 190 + "px";
        },
        // 解析二维码
        QR() {
            let that = this;
            document.onkeydown = function() {
                let key = window.event.keyCode;
                if (key == 13) {
                    if (that.QRCode == "") {
                        that.$message({
                            message: "请扫描二维码",
                            type: "warning"
                        });
                    } else {
                        that.QRList();
                    }
                }
            };
        },
        QRList() {
            let that = this;
            let url = AssemblyPerform.GET_B_getMaterialCode;
            that.axios
                .get(url, {
                    params: {
                        twoCode: JSON.parse(that.QRCode)
                    }
                })
                .then(res => {
                    that.ruleForm.One = res.data.materialName; // 物料名称
                    that.ruleForm.Two = res.data.drawNo; // 物料图号
                    that.ruleForm.Three = res.data.certificateNo; // 合格证号
                    that.ruleForm.Four = res.data.stockNum; // 数量
                    that.ruleForm.Five = res.data.productUnit; // 生产厂商
                    that.ruleForm.Six = res.data.sortieNo; // 架次号
                    that.QRCode = "";
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查询
        OnQuery() {
            this.axios
                .get(AssemblyPerform.GET_B_Query, {
                    params: {
                        instructId: this.instructId,
                        orderId: this.orderId,
                        condetion: this.CertificateNo
                    }
                })
                .then(res => {
                    this.QueryArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 确认
        affirm() {
            if (this.DeleteArr.length < 1 || this.DeleteArr == undefined) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.axios
                    .get(AssemblyPerform.GET_B_materialConfirm, {
                        params: {
                            completeId: this.DeleteArr.completeId,
                            instructId: this.instructId,
                            drawNo: this.DeleteArr.assemProduct,
                            sortieNo: this.DeleteArr.sortieNo,
                            jsonStr: JSON.parse(this.QRCode)
                        }
                    })
                    .then(res => {
                        if (res.data.success == true) {
                            this.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            this.OnQuery();
                            this.ruleForm.One = ""; // 物料名称
                            this.ruleForm.Two = ""; // 物料图号
                            this.ruleForm.Three = ""; // 合格证号
                            this.ruleForm.Four = ""; // 数量
                            this.ruleForm.Five = ""; // 生产厂商
                            this.ruleForm.Six = ""; // 架次号
                        } else {
                            this.$message({
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
        affirmRe() {
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
.Storage_title {
    height: 50px;
    margin-top: 10px;
    margin-left: 10px;
    box-sizing: border-box;
}

.Storage_head {
    width: 270px;
    float: left;
    margin-right: 10px;
}
.Storage_head p {
    width: 70px;
    float: left;
    line-height: 36px;
    font-size: 36px;
}
.Storage_head div {
    width: 200px;
    float: left;
}
.OuteSo_head {
    margin: 10px 0px;
    height: 40px;
}
.OuteSo_head_left {
    width: 270px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.OuteSo_head_left p {
    width: 60px;
    float: left;
    line-height: 36px;
}
.OuteSo_head_left div {
    width: 200px;
    float: left;
}
.OuteSo_head_bnt {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}
.OuteSo_head_Bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}
.OuteSo_contnet {
    width: 100%;
}
.OuteSo_contnet_table {
    padding: 0px 10px;
    height: 100%;
}
.AdvanElasticFrame_top {
    margin: 0px 10px;
}

.DetectPaging {
    height: 45px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
