<template>
    <div class="container">
        <div class="Short_head">
            <div class="Short_head_left" style="width: 210px">
                <p style="width: 40px">图号</p>
                <div style="width: 170px">
                    <el-input
                        style="width: 170px"
                        :disabled="true"
                        v-model="DrawingNo"
                        size="medium"
                    ></el-input>
                </div>
            </div>
            <div class="Short_head_left">
                <p>架次</p>
                <div>
                    <el-input :disabled="true" v-model="Sorties" size="medium"></el-input>
                </div>
            </div>
            <div class="Short_head_left" style="width: 180px">
                <p style="width: 90px">物料齐套率</p>
                <div style="width: 90px">
                    <el-input
                        :disabled="true"
                        style="width: 90px"
                        v-model="CompleteSetRate"
                        size="medium"
                    ></el-input>
                </div>
            </div>
            <div class="Short_head_left" style="width: 180px">
                <p style="width: 90px">指令齐套率</p>
                <div style="width: 90px">
                    <el-input
                        :disabled="true"
                        style="width: 90px"
                        v-model="InstructionCompletionRate"
                        size="medium"
                    ></el-input>
                </div>
            </div>
            <div class="Short_head_left" style="width: 200px">
                <p style="width: 70px">选择站位</p>
                <div style="width: 130px">
                    <el-select size="medium" v-model="Station">
                        <el-option
                            v-for="item in StationArr"
                            :key="item.stationId"
                            :value="item.stationId"
                            :label="item.stationName"
                        ></el-option>
                    </el-select>
                </div>
            </div>
            <el-button size="medium" type="primary" class="Short_bnt" @click="OnReturn">返回</el-button>
        </div>
        <div class="Short_tab">
            <el-tabs type="border-card">
                <el-tab-pane label="结构件缺件信息">
                    <div class="Materia_contnet" :style="TableHeight">
                        <div class="Materia_contnet_table">
                            <el-table
                                border
                                :data="StructuralMember"
                                height="100%"
                                style="width: 100%; height: 100%"
                                :header-row-style="{ height: '39px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '39px' }"
                                :cell-style="{ padding: '0px' }"
                            >
                                <el-table-column prop="materialName" label="缺件物料名称"></el-table-column>
                                <el-table-column prop="product" label="排号/图号"></el-table-column>
                                <el-table-column prop="qty" label="在库数" width="80"></el-table-column>
                                <el-table-column prop="needQty" label="需求数" width="80"></el-table-column>
                                <el-table-column prop="misQty" label="缺件数" width="80"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="标准件缺件信息">
                    <div class="Materia_contnet" :style="TableHeight">
                        <div class="Materia_contnet_table">
                            <el-table
                                border
                                :data="StandardParts"
                                height="100%"
                                style="width: 100%; height: 100%"
                                :header-row-style="{ height: '39px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '39px' }"
                                :cell-style="{ padding: '0px' }"
                            >
                                <el-table-column prop="materialName" label="标准件名称"></el-table-column>
                                <el-table-column prop="product" label="排号/图号"></el-table-column>
                                <el-table-column prop="format" label="标准件规格"></el-table-column>
                                <el-table-column prop="qty" label="在库数" width="80"></el-table-column>
                                <el-table-column prop="needQty" label="需求数" width="80"></el-table-column>
                                <el-table-column prop="misQty" label="缺件数" width="80"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { AutomaticScheduling } from "../../../common/api";
export default {
    data() {
        return {
            mesTaskId: this.$route.query, //接收参数
            DrawingNo: "", //图号
            Sorties: "", //架次
            CompleteSetRate: "", //物料齐套率
            InstructionCompletionRate: "", //指令齐套率
            Station: "", //站位
            StationArr: [], //站位数据
            StructuralMember: [], //结构件
            StandardParts: [], //标准件
            ShortTableDataOne: [],
            ShortTableDataTwo: [],
            TableHeight: {
                height: ""
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OnMissingParts();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 140 + "px";
        },
        //缺件查看
        OnMissingParts() {
            this.axios
                .get(AutomaticScheduling.GET_A_MissingParts, {
                    params: {
                        mesTaskId: this.mesTaskId.mesTaskId
                    }
                })
                .then(res => {
                    this.StationArr = res.data;
                    if (this.StationArr.length != 0) {
                        this.Station = this.StationArr[0].stationId; //站位
                        this.DrawingNo = this.mesTaskId.TaskDrawingNo; //图号
                        this.Sorties = this.mesTaskId.TasSorties; //图号
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //切换站位
        OnStation() {
            this.axios
                .get(AutomaticScheduling.GET_A_Station, {
                    params: {
                        stationId: this.Station
                    }
                })
                .then(res => {
                    this.CompleteSetRate = res.data.percentage; //物料齐套率
                    this.InstructionCompletionRate = res.data.instructPercent; //指令齐套率
                    this.StructuralMember = res.data.structureList; //结构件
                    this.StandardParts = res.data.standardList; //标准件
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //返回
        OnReturn() {
            this.$router.push({
                path: "MaterialInspection"
            });
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    watch: {
        Station() {
            this.OnStation();
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
.Short_head {
    overflow: hidden;
    margin-bottom: 18px;
}
.Short_head_left {
    width: 170px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Short_head_left p {
    width: 40px;
    float: left;
    line-height: 36px;
}
.Short_head_left div {
    width: 130px;
    float: left;
}
.Short_head_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}

.Short_operation {
    height: 50px;
}

.Short_operation_nei {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.ShortOperationNei {
    margin-left: 10px;
    float: left;
}
.ShortOperationNei p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.ShortOperationNei div {
    width: 170px;
    float: left;
}
.Short_tab {
    padding: 0px 10px;
}
.Materia_contnet {
    width: 100%;
}
.Materia_contnet_table {
    height: 100%;
}
.Short_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}
</style>