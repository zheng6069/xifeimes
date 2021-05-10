<template>
    <div>
        <div class="Temp_contnet">
            <div class="Temp_contnet_table">
                <el-tabs type="border-card" v-model="activeName" @tab-click="handClick">
                    <el-tab-pane label="物料信息" name="first">
                        <div class="Temp_head">
                            <div class="Temp_head_left">
                                <p>架次号</p>
                                <div>
                                    <el-input
                                        v-model="sortieNum"
                                        size="medium"
                                        placeholder="请输入"
                                        clearable
                                    ></el-input>
                                </div>
                            </div>
                            <!-- <div class="Temp_head_left">
                                <p>站位号</p>
                                <div>
                                    <el-input
                                        v-model="stanceNum"
                                        size="medium"
                                        placeholder="请输入"
                                        clearable
                                    ></el-input>
                                </div>
                            </div> -->
                            <div class="Temp_head_left" style="width: 300px">
                                <p style="width: 40px">时间</p>
                                <div style="width: 260px">
                                    <el-date-picker
                                        style="width: 260px"
                                        v-model="materialTime"
                                        size="medium"
                                        type="daterange"
                                        value-format="yyyy-MM-dd"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                    ></el-date-picker>
                                </div>
                            </div>
                            <el-button
                                size="medium"
                                type="primary"
                                class="Temp_head_bnt"
                                @click="findAllMaterialList"
                            >查询</el-button>
                        </div>
                        <div class="Materia_contnet" :style="TableHeight">
                            <div class="Materia_contnet_table">
                                <el-table
                                    border
                                    :data="tableDataOne"
                                    height="100%"
                                    style="width: 100%; height: 100%"
                                    :header-row-style="{ height: '39px' }"
                                    :header-cell-style="{ padding: '0px' }"
                                    :row-style="{ height: '39px' }"
                                    :cell-style="{ padding: '0px' }"
                                >
                                    <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                                    <el-table-column prop="stationName" label="站位号"></el-table-column>
                                    <el-table-column prop="aoName" label="AO名称"></el-table-column>
                                    <el-table-column prop="aoNo" label="AO编号"></el-table-column>
                                    <el-table-column prop="feedbackPerson" label="反馈人"></el-table-column>
                                    <el-table-column
                                        prop="feedbackTime"
                                        label="反馈时间"
                                        :formatter="dateFormat"
                                    ></el-table-column>
                                    <el-table-column prop="resultsFeedback" label="反馈结果"></el-table-column>
                                    <el-table-column label="操作" width="200">
                                        <template slot-scope="scope">
                                            <el-button
                                                type="primary"
                                                size="mini"
                                                @click.native="SeeOne(scope.row)"
                                            >查 看</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="DetectPaging">
                            <el-pagination
                                background
                                @size-change="onehandleSizeChange"
                                @current-change="oneOnPaging"
                                :page-size="onepageSize"
                                :current-page="onenowPages"
                                :page-sizes="[1,10, 50, 100, 200]"
                                layout="total,sizes, prev, pager, next, jumper"
                                :total="onetotal"
                            ></el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="设备信息" name="second">
                        <div class="Temp_head">
                            <div class="Temp_head_left" style="width: 300px">
                                <p style="width: 40px">时间</p>
                                <div style="width: 260px">
                                    <el-date-picker
                                        style="width: 260px"
                                        v-model="equTime"
                                        size="medium"
                                        type="daterange"
                                        value-format="yyyy-MM-dd"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                    ></el-date-picker>
                                </div>
                            </div>
                            <el-button
                                size="medium"
                                type="primary"
                                class="Temp_head_bnt"
                                @click="findAllEquList"
                            >查询</el-button>
                        </div>
                        <div class="Materia_contnet" :style="TableHeight">
                            <div class="Materia_contnet_table">
                                <el-table
                                    border
                                    :data="tableDataTwo"
                                    height="100%"
                                    style="width: 100%; height: 100%"
                                    :header-row-style="{ height: '39px' }"
                                    :header-cell-style="{ padding: '0px' }"
                                    :row-style="{ height: '39px' }"
                                    :cell-style="{ padding: '0px' }"
                                >
                                    <el-table-column prop="feedbackPerson" label="反馈人"></el-table-column>
                                    <el-table-column prop="feedbackTime" label="反馈时间"></el-table-column>
                                    <el-table-column prop="feedbackResults" label="反馈结果">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.feedbackResults == '0'">准备就绪</span>
                                            <span v-else-if="scope.row.feedbackResults == '1'">其他</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="200">
                                        <template slot-scope="scope">
                                            <el-button
                                                type="primary"
                                                size="mini"
                                                @click.native="SeeTwo(scope.row)"
                                            >查 看</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="DetectPaging">
                            <el-pagination
                                background
                                @size-change="twohandleSizeChange"
                                @current-change="twoOnPaging"
                                :page-size="twopageSize"
                                :current-page="twonowPages"
                                :page-sizes="[1,10, 50, 100, 200]"
                                layout="total,sizes, prev, pager, next, jumper"
                                :total="twototal"
                            ></el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="工装信息" name="third">
                        <div class="Temp_head">
                            <div class="Temp_head_left" style="width: 300px">
                                <p style="width: 40px">时间</p>
                                <div style="width: 260px">
                                    <el-date-picker
                                        style="width: 260px"
                                        v-model="toolTime"
                                        size="medium"
                                        type="daterange"
                                        value-format="yyyy-MM-dd"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                    ></el-date-picker>
                                </div>
                            </div>
                            <el-button
                                size="medium"
                                type="primary"
                                class="Temp_head_bnt"
                                @click="findAllToolList"
                            >查询</el-button>
                        </div>
                        <div class="Materia_contnet" :style="TableHeight">
                            <div class="Materia_contnet_table">
                                <el-table
                                    border
                                    :data="tableDataThree"
                                    height="100%"
                                    style="width: 100%; height: 100%"
                                    :header-row-style="{ height: '39px' }"
                                    :header-cell-style="{ padding: '0px' }"
                                    :row-style="{ height: '39px' }"
                                    :cell-style="{ padding: '0px' }"
                                >
                                    <el-table-column prop="feedbackPerson" label="反馈人"></el-table-column>
                                    <el-table-column prop="feedbackTime" label="反馈时间"></el-table-column>
                                    <el-table-column prop="feedbackResults" label="反馈结果">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.feedbackResults == '0'">准备就绪</span>
                                            <span v-else-if="scope.row.feedbackResults == '1'">其他</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="200">
                                        <template slot-scope="scope">
                                            <el-button
                                                type="primary"
                                                size="mini"
                                                @click.native="SeeThree(scope.row)"
                                            >查 看</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                         <div class="DetectPaging">
                            <el-pagination
                                background
                                @size-change="threehandleSizeChange"
                                @current-change="threeOnPaging"
                                :page-size="threepageSize"
                                :current-page="threenowPages"
                                :page-sizes="[1,10, 50, 100, 200]"
                                layout="total,sizes, prev, pager, next, jumper"
                                :total="threetotal"
                            ></el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="工（量）具信息" name="fourth">
                        <div class="Temp_head">
                            <div class="Temp_head_left" style="width: 300px">
                                <p style="width: 40px">时间</p>
                                <div style="width: 260px">
                                    <el-date-picker
                                        style="width: 260px"
                                        v-model="measureTime"
                                        size="measureTime"
                                        type="daterange"
                                        value-format="yyyy-MM-dd"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                    ></el-date-picker>
                                </div>
                            </div>
                            <el-button
                                size="medium"
                                type="primary"
                                class="Temp_head_bnt"
                                @click="findAllMeasureList"
                            >查询</el-button>
                        </div>
                        <div class="Materia_contnet" :style="TableHeight">
                            <div class="Materia_contnet_table">
                                <el-table
                                    border
                                    :data="tableDataFour"
                                    height="100%"
                                    style="width: 100%; height: 100%"
                                    :header-row-style="{ height: '39px' }"
                                    :header-cell-style="{ padding: '0px' }"
                                    :row-style="{ height: '39px' }"
                                    :cell-style="{ padding: '0px' }"
                                >
                                    <el-table-column prop="feedbackPerson" label="反馈人"></el-table-column>
                                    <el-table-column
                                        prop="feedbackTime"
                                        label="反馈时间"
                                        :formatter="dateFormat"
                                    ></el-table-column>
                                    <el-table-column prop="resultsFeedback" label="反馈结果"></el-table-column>
                                    <el-table-column label="操作" width="200">
                                        <template slot-scope="scope">
                                            <el-button
                                                type="primary"
                                                size="mini"
                                                @click.native="SeeFour(scope.row)"
                                            >查 看</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="DetectPaging">
                            <el-pagination
                                background
                                @size-change="fourhandleSizeChange"
                                @current-change="fourOnPaging"
                                :page-size="fourpageSize"
                                :current-page="fournowPages"
                                :page-sizes="[1,10, 50, 100, 200]"
                                layout="total,sizes, prev, pager, next, jumper"
                                :total="fourtotal"
                            ></el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import { AutomaticScheduling } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    data() {
        return {
            activeName: "first",
            sortieNum: "", //架次号
            stanceNum: "", //站位号
            materialTime: null, // 物料时间
            equTime: null, // 设备时间
            toolTime: null, // 工装时间
            measureTime: null, // 工量具时间
            TableHeight: {
                height: ""
            },
            tableDataOne: [], // 物料
            tableDataTwo: [], // 设备
            tableDataThree: [], // 工装
            tableDataFour: [], // 工量具
            onepageSize: 10, //每页多少条 物料
            onenowPages: 1, //当前页物料
            onetotal: 0 ,//总数物料
            twopageSize: 10, //每页多少条设备
            twonowPages: 1, //当前页设备
            twototal: 0 ,//总数设备
            threepageSize: 10, //每页多少条工装
            threenowPages: 1, //当前页工装
            threetotal: 0 ,//总数工装
            fourpageSize: 10, //每页多少条工量具
            fournowPages: 1, //当前页工量具
            fourtotal: 0 ,//总数工量具
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.showtabs();
        this.findAllMaterialList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 310 + "px";
        },
        showtabs() {
            if (this.$route.params.activeName != null) {
                this.activeName = this.$route.params.activeName;
                let current1 = this.activeName;
                if (current1 == "first") {
                    this.findAllMaterialList();
                } else if (current1 == "second") {
                    this.findAllEquList();
                } else if (current1 == "third") {
                    this.findAllToolList();
                } else if (current1 == "fourth") {
                    this.findAllMeasureList();
                }
            }
        },
        // 父组件调用切换标签事件
        callactiveName(data){
            this.activeName = data
             if ( this.activeName == "first") {
                    this.findAllMaterialList();
                } else if ( this.activeName == "second") {
                    this.findAllEquList();
                } else if ( this.activeName == "third") {
                    this.findAllToolList();
                } else if ( this.activeName == "fourth") {
                    this.findAllMeasureList();
                }
        },
        // 查询-物料
        findAllMaterialList() {
            let that = this;
            let url = AutomaticScheduling.GET_P_findStuffFeedbackInfo;
            if(this.materialTime == null){
                let data = {
                    pageNum: this.onenowPages,
                    pageSize: this.onepageSize,
                    orderNo: this.sortieNum,
                    startDate: "",
                    endDate: ""
                };
            that.axios
                .post(url, data)
                .then(res => {
                    that.tableDataOne = res.data.records;
                    that.onetotal = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
            }else{
                let data = {
                    pageNum: this.onenowPages,
                    pageSize: this.onepageSize,
                    orderNo: this.sortieNum,
                    startDate: this.materialTime[0],
                    endDate: this.materialTime[1]
                };
            that.axios
                .post(url, data)
                .then(res => {
                    that.tableDataOne = res.data.records;
                    that.onetotal = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        // 查询-设备
        findAllEquList() {
            let that = this;
            let url = AutomaticScheduling.GET_P_findFacilityFeedbackInfo;
            if(this.equTime == null){
                let data = {
                    pageNum: this.twonowPages,
                    pageSize: this.twopageSize,
                    startDate: "",
                    endDate: ""
                };
                that.axios
                .post(url, data)
                .then(res => {
                    that.tableDataTwo = res.data.records;
                    that.twototal = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
            }else{
                let data = {
                    pageNum: this.twonowPages,
                    pageSize: this.twopageSize,
                    startDate: this.equTime[0],
                    endDate: this.equTime[1]
                };
                that.axios
                .post(url, data)
                .then(res => {
                    that.tableDataTwo = res.data.records;
                    that.twototal = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        // 查询-工装
        findAllToolList() {
            let that = this;
            let url = AutomaticScheduling.GET_P_findFrockFeedbackInfo;
            if(this.toolTime == null){
                let data = {
                    pageNum: this.threenowPages,
                    pageSize: this.threepageSize,
                    startDate: "",
                    endDate: ""
                };
                that.axios
                .post(url, data)
                .then(res => {
                    that.tableDataThree = res.data.records;
                    that.threetotal = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
            }else{
                let data = {
                    pageNum: this.threenowPages,
                    pageSize: this.threepageSize,
                    startDate: this.toolTime[0],
                    endDate: this.toolTime[1]
                };
                that.axios
                .post(url, data)
                .then(res => {
                    that.tableDataThree = res.data.records;
                    that.threetotal = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
            }
            
        },
        // 查询-工量具
        findAllMeasureList() {
            let that = this;
            let url = AutomaticScheduling.GET_P_findToolFeedbackInfo;
            if(this.measureTime == null){
                let data = {
                    pageNum: this.fournowPages,
                    pageSize: this.fourpageSize,
                    startDate: "",
                    endDate: ""
                };
                that.axios
                .post(url, data)
                .then(res => {
                    that.tableDataFour = res.data.records;
                    that.fourtotal = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
            }else{
                let data = {
                    pageNum: this.fournowPages,
                    pageSize: this.fourpageSize,
                    startDate: that.measureTime[0],
                    endDate: that.measureTime[1]
                };
                that.axios
                .post(url, data)
                .then(res => {
                    that.tableDataFour = res.data.records;
                    that.fourtotal = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        handClick(tab) {
            if (tab.label == "物料信息") {
                this.findAllMaterialList();
            } else if (tab.label == "设备信息") {
                this.findAllEquList();
            } else if (tab.label == "工装信息") {
                this.findAllToolList();
            } else if (tab.label == "工（量）具信息") {
                this.findAllMeasureList();
            }
        },
        // 确定
        AndWorkerBoxSave() {},
        // 物料
        SeeOne(row) {
            let data = {
                stationName: row.stationName,
                resultsFeedback: row.resultsFeedback,
                remarks: row.remarks,
                orderId:row.orderId,
                id:2
            }
            this.$emit("func",data)
        },
        // 物料每页多少条
        onehandleSizeChange(val){
            this.onepageSize = val
            this.onenowPages = 1
            this.findAllMaterialList()
        },
        //物料当前页
        oneOnPaging(val){
            this.onenowPages = val
            this.findAllMaterialList()
        },
        // 设备
        SeeTwo(row) {
            let data = {
                feedbackPerson: row.feedbackPerson,
                feedbackResults: row.feedbackResults,
                feedbackTime: row.feedbackTime,
                id:3
            }
            this.$emit("func",data)
        },
        // 设备每页多少条
        twohandleSizeChange(val){
            this.twopageSize = val
            this.twonowPages = 1
            this.findAllEquList()
        },
        //设备当前页
        twoOnPaging(val){
            this.twonowPages = val
            this.findAllEquList()
        },
        // 工装
        SeeThree(row) {
           let data = {
                feedbackPerson: row.feedbackPerson,
                feedbackResults: row.feedbackResults,
                feedbackTime: row.feedbackTime,
                id:4
            }
            this.$emit("func",data)
        },
         // 工装每页多少条
        threehandleSizeChange(val){
            this.threepageSize = val
            this.threenowPages = 1
            this.findAllToolList()
        },
        //工装当前页
        threeOnPaging(val){
            this.threenowPages = val
            this.findAllToolList()
        },

        // 工量具
        SeeFour(row) {
            let data = {
                feedbackPerson: row.feedbackPerson,
                id:5
            }
            this.$emit("func",data)
        },
         // 工装每页多少条
        fourhandleSizeChange(val){
            this.fourpageSize = val
            this.fournowPages = 1
            this.findAllMeasureList()
        },
        //工装当前页
        fourOnPaging(val){
            this.fournowPages = val
            this.findAllMeasureList()
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
.Temp_head {
    height: 60px;
    overflow: hidden;
}
.Temp_head_left {
    width: 250px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Temp_head_left p {
    width: 80px;
    float: left;
    line-height: 36px;
}
.Temp_head_left div {
    width: 170px;
    float: left;
}
.Temp_head_bnt {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}

.Temp_ElasticFrame_top {
    overflow: hidden;
}

.Temp_Testing {
    width: 250px;
    height: 40px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}

.Temp_Testing div {
    width: 160px;
    float: right;
}
.Temp_TaskContent {
    width: 510px;
    height: 80px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}
.Temp_TaskContent div {
    width: 420px;
    float: right;
}
.Materia_contnet {
    width: 100%;
}
.Materia_contnet_table {
    height: 100%;
}

.Temp_contnet {
    margin-top: 10px;
    width: 100%;
}
.Temp_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.DetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
