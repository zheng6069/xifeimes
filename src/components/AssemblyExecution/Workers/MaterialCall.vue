<template>
    <div class="container">
        <div class="MateriakCall_title">
            <div class="MateriakCall_head">
                <p>架次号</p>
                <div>
                    <el-input :disabled="true" v-model="sortieNo" size="medium"></el-input>
                </div>
            </div>
            <el-button
                @click="OnRe"
                size="medium"
                type="primary"
                class="MateriakCall_bnt"
                style="margin-left: 10px;"
            >返回</el-button>
        </div>
        <el-tabs type="border-card" @tab-click="handClick">
            <el-tab-pane label="装配物料">
                <div class="MateriakCall_head" style="margin-right: 10px;">
                    <p>物料名称</p>
                    <div>
                        <el-input v-model="condetion" size="medium"></el-input>
                    </div>
                </div>
                <el-button size="medium" @click="OnQueryMaterialCall" type="primary">搜索</el-button>
                <el-button size="medium" @click="materialCall" type="primary">呼叫</el-button>
                <div :style="TableHeight">
                    <el-table
                        border
                        :data="AssemblyMaterialsArr"
                         @selection-change="handleSelectionChangematerial"
                        height="100%"
                        style="width: 100%; height: 100%"
                        :header-row-style="{ height: '39px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '39px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column type="selection" width="60"></el-table-column>
                        <el-table-column type="index" label="序号" width="60"></el-table-column>
                        <el-table-column prop="assemProduct" label="部组件图号"></el-table-column>
                        <el-table-column prop="assemName" label="部组件名称"></el-table-column>
                        <el-table-column prop="qty" label="数量"></el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="异常物料">
                <el-button @click="AbnormalMaterialCall" size="medium" type="primary">呼叫</el-button>
                <div :style="TableHeight">
                    <el-table
                        border
                        :data="AbnormalMaterial"
                        ref="multipleTable"
                        @selection-change="handleSelectionChange"
                        height="100%"
                        style="width: 100%; height: 100%"
                        :header-row-style="{ height: '39px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '39px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column type="selection" width="60"></el-table-column>
                        <el-table-column type="index" label="序号" width="60"></el-table-column>
                        <el-table-column prop="assemProduct" label="部组件图号"></el-table-column>
                        <el-table-column prop="assemName" label="部组件名称"></el-table-column>
                        <el-table-column prop="serialNumber" label="合格证号"></el-table-column>
                        <el-table-column prop="qty" label="数量"></el-table-column>
                        <el-table-column prop="abnormalNum" label="质量记载单号"></el-table-column>
                        <el-table-column prop="groupResult" label="处理意见"></el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="工艺更改物料">
                <el-button size="medium" @click="craftlCall" type="primary">呼叫</el-button>
                <div :style="TableHeight">
                    <el-table
                        border
                        :data="ProcessChangeMaterial"
                        @selection-change="handleSelectionChangecraft"
                        height="100%"
                        style="width: 100%; height: 100%"
                        :header-row-style="{ height: '39px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '39px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column type="selection" width="50"></el-table-column>
                        <el-table-column type="index" label="序号" width="60"></el-table-column>
                        <el-table-column prop="assemProduct" label="部组件图号"></el-table-column>
                        <el-table-column prop="assemName" label="部组件名称"></el-table-column>
                        <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                        <el-table-column prop="amount" label="原数量" width="70"></el-table-column>
                        <el-table-column prop="changeAmount" width="100" label="更改后数量"></el-table-column>
                        <el-table-column prop="changeType" label="更改类型"></el-table-column>
                        <el-table-column prop="changeReason" label="更改原因"></el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { AssemblyPerform, Integration } from "../../../common/api";
export default {
    data() {
        return {
            sortieNo: "",
            WorkOrderNo: "", //工单号
            InstructionNumber: "", //指令号
            InstructionName: "", //指令名称
            StationName: "", //站位名称
            TableHeight: {
                height: ""
            },
            condetion: "",
            AssemblyMaterialsArr: [],
            AbnormalMaterial: [],
            ProcessChangeMaterial: [],
            AbnormalMaterialArry: [],
            materialist: [],
            craftlist: []
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化

        this.OnQueryMaterialCall();
        // this.OnAbnormalMaterial();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 140 + "px";
        },
        OnQueryMaterialCall() {
            this.axios
                .get(AssemblyPerform.GET_W_findByStation,{
                    params: {
                        condetion: this.condetion
                    }
                })
                .then(res => {
                    this.AssemblyMaterialsArr = res.data.assemList;
                    this.sortieNo = res.data.sortieNo; //架次号
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //异常物料
        OnAbnormalMaterial() {
            this.axios
                .get(AssemblyPerform.GET_A_AbnormalMaterial)
                .then(res => {
                    this.AbnormalMaterial = res.data.abnormalQualityList;
                    this.ProcessChangeMaterial = res.data.materialChangesList;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handClick(tab) {
            console.log(tab.label, "====");
            if (tab.label == "装配物料") {
                this.OnQueryMaterialCall();
            } else if (tab.label == "异常物料") {
                this.OnAbnormalMaterial();
            } else if (tab.label == "工艺更改物料") {
                // this.findAllToolList();
            }
        },
        // 异常物料呼叫
        AbnormalMaterialCall() {
            if (
                this.AbnormalMaterialArry < 1 ||
                this.AbnormalMaterialArry == undefined
            ) {
                this.$message({
                    message: "请选择需要呼叫的数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.axios
                    .post(
                        Integration.GET_B_getScrapWork,
                        this.AbnormalMaterialArry
                    )
                    .then(res => {
                        if (res.data.success == true) {
                            this.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            this.OnAbnormalMaterial();
                            this.AbnormalMaterialArry = []
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
        // 装配物料呼叫
        materialCall() {
            if (
                this.materialist < 1 ||
                this.materialist == undefined
            ) {
                this.$message({
                    message: "请选择需要呼叫的数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.axios
                    .post(
                        Integration.GET_B_getScrapWork,
                        this.materialist
                    )
                    .then(res => {
                        if (res.data.success == true) {
                            this.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            this.OnQueryMaterialCall();
                            this.materialist = []
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
        // 工艺更改物料呼叫
        craftlCall() {
            if (
                this.craftlist < 1 ||
                this.craftlist == undefined
            ) {
                this.$message({
                    message: "请选择需要呼叫的数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.axios
                    .post(
                        Integration.GET_B_getScrapWork,
                        this.craftlist
                    )
                    .then(res => {
                        if (res.data.success == true) {
                            this.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            this.OnAbnormalMaterial();
                            this.craftlist = []
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
        handleSelectionChange(val) {
            this.AbnormalMaterialArry = val;
        },
        // 装配物料
        handleSelectionChangematerial(val) {
            this.materialist = val;
        },
        // 工艺更改物料
        handleSelectionChangecraft(val) {
            this.craftlist = val;
        },
        OnRe() {
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
.container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}

.MateriakCall_title {
    height: 50px;
}

.MateriakCall_head {
    width: 250px;
    margin-left: 10px;
    float: left;
}
.MateriakCall_head p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.MateriakCall_head div {
    width: 180px;
    float: left;
}

.MateriakCall_bnt {
    float: right;
}
</style>
