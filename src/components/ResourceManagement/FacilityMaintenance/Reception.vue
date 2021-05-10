<template>
    <div class="container">
        <div class="ReSearch">
            <el-form :inline="true" :model="ReSearchform" class="demo-form-inline" size="medium">
                <el-form-item label="设备名称" class="item">
                    <el-input v-model="ReSearchform.name" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="设备编号" class="item">
                    <el-input v-model="ReSearchform.serialNumber" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="故障类型" class="item">
                    <el-input v-model="ReSearchform.type" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="上报时间" class="item">
                    <el-date-picker
                        v-model="ReSearchform.time"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="维修状态" class="item">
                    <el-select v-model="ReSearchform.status" placeholder="请选择" clearable>
                        <el-option label="已接收" value="6"></el-option>
                        <el-option label="未接收" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="OnQuery">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="Re_contnet" :style="TableHeight">
            <div class="ReContent_title">
                <!-- <div class="Re_title">工单列表</div> -->
                <div class="Re_info">
                    <el-button
                        size="medium"
                        @click="OnReceive"
                        type="primary"
                        class="operation_bnt"
                    >接收</el-button>
                    <el-button
                        size="medium"
                        @click="OnRepair"
                        type="primary"
                        class="operation_bnt"
                    >维修</el-button>
                </div>
            </div>
            <div class="Re_contnet_table">
                <el-table
                    border
                    :data="QueryArr"
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
                    <el-table-column prop="facilityMainId" label="设备维修单号" width="180"></el-table-column>
                    <el-table-column prop="facilityNum" label="设备编号"></el-table-column>
                    <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                    <el-table-column prop="station" label="设备位置"></el-table-column>
                    <el-table-column prop="mainType" label="故障类型" width="80"></el-table-column>
                    <el-table-column prop="mainTime" label="上报时间"></el-table-column>
                    <el-table-column prop="person" label="提交人员"></el-table-column>
                    <el-table-column prop="receiver" label="维修人员"></el-table-column>
                    <el-table-column prop="mainStatus" label="状态"></el-table-column>
                    <el-table-column label="操作" width="240">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="ReLookExplain(scope.row)"
                            >查看维修文档</el-button>
                            <el-button
                                type="primary"
                                size="mini"
                                @click="ReLookFacility(scope.row)"
                            >查看设备文档</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="Redescribe_title">
                <div class="Re_describetitle">工人问题描述</div>
                <div class>
                    <el-input :disabled="true" type="textarea" v-model="describe"></el-input>
                </div>
            </div>
        </div>
        <!----------- 查看说明文档 ------------->
        <el-dialog :visible.sync="LookExplainument" width="70%">
            <div style="height: 300px">
                <el-table
                    border
                    :data="LookExplainumentArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column prop="fileName" label="文档名称"></el-table-column>
                    <el-table-column prop="url" label="路径"></el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="LookExplainSeeFile(scope.row)"
                            >查看文档</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!----------- 查看设备文档 ------------->
        <el-dialog :visible.sync="LookFacilityument" width="70%">
            <div style="height: 300px">
                <el-table
                    border
                    :data="LookFacilityumentArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column prop="name" label="文档名称"></el-table-column>
                    <el-table-column prop="url" label="路径"></el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="LookFacilitySeeFile(scope.row)"
                            >查看文档</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { ResourceManagement } from "../../../common/api";
export default {
    data() {
        return {
            ReSearchform: {
                status: "", //维修状态
                name: "", //设备名称
                serialNumber: "", //设备编号
                type: "", //故障类型
                time: "" //上报时间
            },
            pageSize: 10000000, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            QueryArr: [],
            QueryArrState: [
                {
                    name: "未下发",
                    id: "4"
                },
                {
                    name: "已下发",
                    id: "5"
                },
                {
                    name: "已接收",
                    id: "6"
                }
            ],
            describe: "", // 工人问题描述
            TableHeight: {
                height: ""
            },
            ReTableData: [],
            multipleSelection: [],
            WorkClothesID: "",
            mainStatus: "",
            LookExplainument: false, // 查看说明文档
            LookExplainumentArr: [],
            LookFacilityument: false, // 查看设备文档
            LookFacilityumentArr: []
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OnQuery();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 180 + "px";
        },
        // 查询
        OnQuery() {
            this.axios({
                method: "post",
                url: ResourceManagement.GET_C_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    facilityName: this.ReSearchform.name, //设备名称
                    facilityNum: this.ReSearchform.serialNumber, //设备编码
                    mainTime: this.ReSearchform.time, //上报时间
                    mainStatus: this.ReSearchform.status, //状态
                    mainType: this.ReSearchform.type //type
                }
            })
                .then(res => {
                    this.QueryArr = res.data.records;
                    this.QueryArr.map(ite => {
                        this.QueryArrState.map(val => {
                            if (ite.mainStatus == val.id) {
                                ite.mainStatus = val.name;
                            }
                        });
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 接收
        OnReceive() {
            if (this.WorkClothesID != "" && this.WorkClothesID != undefined) {
                if (this.mainStatus != "已接收") {
                    this.axios
                        .get(ResourceManagement.GET_C_Receive, {
                            params: {
                                resourcesId: this.WorkClothesID
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
                                this.personnelPopUp = false;
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
                } else {
                    this.$message({
                        //失败后的提示
                        message: "请选择未接收任务",
                        type: "warning",
                        duration: 1500
                    });
                }
            } else {
                this.$message({
                    //失败后的提示
                    message: "请选择接收任务",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        // 维修
        OnRepair() {
            if (this.WorkClothesID != "" && this.WorkClothesID != undefined) {
                if (this.mainStatus == "已接收") {
                    this.$router.push({
                        path: "MaintenanceRecord",
                        query: {
                            WorkClothesID: this.WorkClothesID
                        }
                    });
                } else {
                    this.$message({
                        //失败后的提示
                        message: "请选择已接收任务",
                        type: "warning",
                        duration: 1500
                    });
                }
            } else {
                this.$message({
                    //失败后的提示
                    message: "请选择维修任务",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //勾选接收任务
        handleSelectionChange(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.multipleSelection = row.pop(); //储存新的单选数据
                if (this.multipleSelection != undefined) {
                    this.WorkClothesID = this.multipleSelection.resourcesId;
                    this.describe = this.multipleSelection.workRemarks;
                    this.mainStatus = this.multipleSelection.mainStatus;
                } else {
                    this.WorkClothesID = "";
                    this.describe = "";
                    this.mainStatus = "";
                }
            }
        },
        // 查看说明文档
        ReLookExplain(row) {
            this.LookExplainument = true;
            this.axios
                .get(
                    ResourceManagement.GET_C_ReLookExplain +
                        "?resourcesId=" +
                        row.resourcesId
                )
                .then(res => {
                    this.LookExplainumentArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        LookExplainSeeFile(row) {
            window.open(row.url);
        },
        // 查看设备文档
        ReLookFacility(row) {
            this.LookFacilityument = true;
            this.axios
                .get(
                    ResourceManagement.GET_C_ReLookFacility +
                        "?resourcesId=" +
                        row.resourcesId
                )
                .then(res => {
                    this.LookFacilityumentArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        LookFacilitySeeFile(row) {
            window.open(row.url);
        }
    }
};
</script>

<style>
.ReSearch .el-input {
    width: 150px;
}
.ReSearch .item .el-form-item__label {
    font-size: 16px;
    color: #000000;
}
.Re_contnet {
    width: 100%;
}

.ReContent_title {
    height: 40px;
    overflow: hidden;
}
.ReContent_title .Re_title {
    float: left;
    font-size: 12px;
    line-height: 40px;
}
.ReContent_title .Re_info {
    font-size: 12px;
    line-height: 40px;
}
.Re_contnet_table {
    height: -moz-calc(100% - 40px); /* WebKit */
    height: -webkit-calc(100% - 40px); /* Opera */
    height: -o-calc(100% - 40px); /* Standard */
    height: calc(100% - 40px);
}
.Redescribe_title {
    height: 30px;
    margin-top: 10px;
}
.Redescribe_title .Re_describetitle {
    font-size: 12px;
    line-height: 30px;
}
</style>