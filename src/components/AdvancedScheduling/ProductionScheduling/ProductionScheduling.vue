<template>
    <div>
        <div class="Sched_head">
            <div class="Sched_head_a">
                <div class="Sched_head_left">
                    <p>排产选择时间</p>
                    <div>
                        <el-date-picker
                            v-model="valueTime"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间"
                        ></el-date-picker>
                    </div>
                </div>
                <el-button
                    @click="OnProcessConfiguration"
                    size="medium"
                    type="primary"
                    class="Sched_bnt"
                >工艺配置</el-button>
                <el-button
                    @click="OnDeviceInformation"
                    size="medium"
                    type="primary"
                    class="Sched_bnt"
                >设备信息</el-button>
                <el-button
                    @click="OnToolingConfiguration"
                    size="medium"
                    type="primary"
                    class="Sched_bnt"
                >工装配置</el-button>
                <el-button
                    @click="OnMeasuringTools"
                    size="medium"
                    type="primary"
                    class="Sched_bnt"
                >工(量)具信息</el-button>
                <el-button
                    @click="OnManufacturingCalendar"
                    size="medium"
                    type="primary"
                    class="Sched_bnt"
                >制造日历</el-button>
                <el-button
                    @click="OnMaterialInventory"
                    size="medium"
                    type="primary"
                    class="Sched_bnt"
                >物料库存信息</el-button>
                <el-button
                    @click="OnRegularInspection0fTooling"
                    size="medium"
                    type="primary"
                    class="Sched_bnt"
                >工装定检信息</el-button>
                <el-button
                    @click="OnMeasuringTools0fTooling"
                    size="medium"
                    type="primary"
                    class="Sched_bnt"
                >工(量)具定检信息</el-button>
                <el-button
                    @click="OnEquipment0fTooling"
                    size="medium"
                    type="primary"
                    class="Sched_bnt"
                >设备定检信息</el-button>
            </div>
            <!-- <div class="Sched_head_B">
                
            </div> -->
        </div>

        <div class="Sched_contnet" :style="TableHeight">
            <div class="Sched_contnet_table">
                <el-table
                    :data="SchedulingArr"
                    border
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                    ref="multipleTable"
                    @selection-change="Tick"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="orderNo" label="订单号"></el-table-column>
                    <el-table-column prop="sortie" label="架次号"></el-table-column>
                    <el-table-column prop="product" label="产品图号"></el-table-column>
                    <el-table-column prop="productName" label="产品名称"></el-table-column>
                    <el-table-column prop="orderNo" label="订单号"></el-table-column>
                    <el-table-column prop="planQty" label="数量" width="60"></el-table-column>
                    <el-table-column prop="endDate" label="要求完成时间" width="110"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="Sched_operation">
            <el-button @click="OnRouter" size="medium" type="primary" class="Sched_operation_bnt">返回</el-button>
            <el-button
                size="medium"
                type="primary"
                class="Sched_operation_bnt"
                style="margin-left: 0px"
                @click="AutomaticProduction"
            >自动排产</el-button>
        </div>
    </div>
</template>

<script>
import { AutomaticScheduling } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            DeleteArrStats: this.$route.query.DeleteArrStats,
            TableHeight: {
                height: ""
            },
            SchedulingRules: "", //排产规则
            Frequency: "", //班次
            FrequencyArr: [], //班次信息
            SchedulingArr: [], //排产信息
            TickArr: [], //勾选信息
            Ticksortie: "", //架次号
            mesTaskId: "", //勾选id
            valueTime: "" //排产选择时间
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OnFrequency();
        this.OnScheduling();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 170 + "px";
        },
        //获取班次
        OnFrequency() {
            this.axios
                .get(AutomaticScheduling.GET_C_Frequency, {
                    parmas: {}
                })
                .then(res => {
                    this.FrequencyArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //排产信息
        OnScheduling() {
            this.axios
                .get(AutomaticScheduling.GET_C_Scheduling, {
                    params: {
                        status: this.DeleteArrStats
                    }
                })
                .then(res => {
                    this.SchedulingArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //勾选
        Tick(row) {
            this.TickArr = row;
        },
        // 自动排产
        AutomaticProduction() {
            console.log(this.TickArr)
            if (this.TickArr.length == 0) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.axios({
                    method: "post",
                    url:
                        AutomaticScheduling.GET_C_AutomaticProduction +
                       
                        "?schedulingDate=" +
                        this.valueTime,
                    data: this.TickArr
                })
                    .then(res => {
                        if (res.data.success == true) {
                            this.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            this.OnScheduling();
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
        //工艺配置
        OnProcessConfiguration() {
            if (this.TickArr < 1) {
                this.$message({
                    //失败后的提示
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                if (this.TickArr > 1) {
                    this.$message({
                        //失败后的提示
                        message: "只能选择选择一条数据",
                        type: "warning",
                        duration: 1500
                    });
                } else {
                    this.$router.push({
                        path: "ProcessProperties",
                        query: {
                            mesTaskId: this.TickArr[0].mesTaskId,
                            Ticksortie: this.TickArr[0].sortie
                        }
                    });
                }
            }
        },
        //物料库存信息
        OnMaterialInventory() {
            this.$router.push({
                path: "SchedulingInformation"
            });
        },
        // //物料需求信息
        OnMaterialRequirements() {
            console.log(1);
            //   this.$router.push({
            //     path: "MaterialPlanning",
            //   });
        },
        //设备信息
        OnDeviceInformation() {
            this.$router.push({
                path: "DeviceInformation"
            });
        },
        //工装信息
        OnToolingConfiguration() {
            this.$router.push({
                path: "SchedulingWorkClothes"
            });
        },
        //量具信息
        OnMeasuringTools() {
            this.$router.push({
                path: "SchedulingMeasuringTools"
            });
        },
        //制造日历
        OnManufacturingCalendar() {
            this.$router.push({
                path: "MakeCalendar",
                query: {
                    isShow: true
                }
            });
        },

        //工装定检
        OnRegularInspection0fTooling() {
            this.$router.push({
                path: "FrockRegularCheck",
                // query: {
                //     isShow: true
                // }
            });
        },

         //工量具定检
        OnMeasuringTools0fTooling() {
            this.$router.push({
                path: "MeasuringCheck",
                // query: {
                //     isShow: true
                // }
            });
        },
        //设备定检
        OnEquipment0fTooling() {
            this.$router.push({
                path: "EquipmentRegularInspection",
                // query: {
                //     isShow: true
                // }
            });
        },
        //返回
        OnRouter() {
            this.$router.push({
                path: "SchedulingHome"
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
.container {
    width: 100%;
    height: 100%;
}
.Sched_head {
    margin-bottom: 10px;
    overflow: hidden;
}
.Sched_head_a {
    float: left;
}
.Sched_head_left {
    width: 320px;
    height: 36px;
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}
.Sched_head_left p {
    width: 100px;
    float: left;
    line-height: 36px;
}
.Sched_head_left div {
    width: 220px;
    float: left;
}
.Sched_head_B {
    float: left;
}
.Sched_head_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}
.Sched_head_C {
    float: right;
    margin-right: 10px;
}
.Sched_head_CBTN {
    margin-top: 30px;
}
.Sched_operation {
    height: 45px;
    margin-top: 10px;
}
.Sched_operation_bnt {
    float: right;
    margin-right: 10px;
}
.Sched_bnt {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}
.Sched_contnet {
    width: 100%;
}
.Sched_contnet_table {
    padding: 0px 10px;
    height: 100%;
}
</style>
