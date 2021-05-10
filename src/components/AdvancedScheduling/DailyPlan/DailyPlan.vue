<template>
    <div>
        <div class="Daily_head">
            <div class="Daily_head_left">
                <p>站位</p>
                <el-select size="medium" v-model="position" placeholder="请选择" clearable>
                    <el-option
                        v-for="item in optionOne"
                        :key="item.warehouseId"
                        :label="item.warehouseName"
                        :value="item.warehouseName"
                    ></el-option>
                </el-select>
            </div>
            <div class="Daily_head_left">
                <p>架次号</p>
                <el-input v-model="sortienum" size="medium" clearable placeholder="请输入"></el-input>
            </div>
            <el-button
                size="medium"
                type="primary"
                class="Daily_head_bnt"
                @click="AddCouponSelected"
            >查询</el-button>
        </div>
        <!------------------ 周计划 ---------------------->
        <div class="Daily_contnet">
            <div class="Daily_title">
                <div class="DailyBox_title">周计划</div>
                <div class="DailyBox_info">
                    <el-button size="mini" type="primary" class="operation_bnt" @click="Adddailyplan">添加</el-button>
                </div>
            </div>
            <div class="Daily_contnet_table">
                <el-table
                    border
                    :data="weektableData"
                    @selection-change="handleSelectionChangeweek"
                    ref="multipleTable"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column label="序号"  width="55">
                        <template slot-scope="scope"><span>{{scope.$index+( nowPagesweek - 1) * pageSizeweek + 1}} </span></template>
                    </el-table-column>
                    <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                    <el-table-column prop="stationName" label="站位名称"></el-table-column>
                    <el-table-column prop="instructNum" label="指令号"></el-table-column>
                    <el-table-column prop="instructName" label="指令名称"></el-table-column>
                    <el-table-column prop="planStartTime" :formatter="dateFormat" label="计划开始时间"></el-table-column>
                    <el-table-column prop="planEndTime" :formatter="dateFormat" label="计划完成时间"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                :page-size="pageSizeweek"
                :current-page="nowPagesweek"
                @size-change="handleSizeChangeweek"
                @current-change="OnPagingweek"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="totalweek"
            ></el-pagination>
        </div>

        <!------------------ 日计划 ---------------------->
        <div class="Daily_contnet">
            <div class="Daily_title">
                <div class="DailyBox_title">日计划</div>
                <div class="DailyBox_info">
                    <el-button size="mini" type="primary" class="operation_bnt" @click="issue">下发</el-button>
                </div>
            </div>
            <div class="Daily_contnet_table">
                <el-table
                    border
                    :data="daytableData"
                    @selection-change="handleSelectionChangeday"
                    ref="multipleTable"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column label="序号" width="55">
                        <template slot-scope="scope"><span>{{scope.$index+( nowPagesday - 1) * pageSizeday + 1}} </span></template>
                    </el-table-column>
                    <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                    <el-table-column prop="stationName" label="站位名称"></el-table-column>
                    <el-table-column prop="instructNum" label="指令号"></el-table-column>
                    <el-table-column prop="instructName" label="指令名称"></el-table-column>
                    <el-table-column prop="planStartTime" :formatter="dateFormat" label="计划开始时间"></el-table-column>
                    <el-table-column prop="planEndTime" :formatter="dateFormat" label="计划完成时间"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="ridelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                :page-size="pageSizeday"
                :current-page="nowPagesday"
                @size-change="handleSizeChangeday"
                @current-change="OnPagingday"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="totalday"
            ></el-pagination>
        </div>
     
    </div>
</template>

<script>
import { BasicData, AutomaticScheduling } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    name: "Start",
    data() {
        return {
            weektableData: [], //周计划
            daytableData: [], //日计划
            position: "", // 站位
            sortienum: "", // 架次号
            pageSizeweek: 10, //每页多少条week
            nowPagesweek: 1, //当前页week
            totalweek: 0, //总数week
            pageSizeday: 10, //每页多少条day
            nowPagesday: 1, //当前页day
            totalday: 0, //总数day
            multipleSelection: [],//周计划勾选列表
            optionOne: [],//站位列表
            form: {
                startTime: null,
                endTime: null
            },
            TableHeight: {
                height: ""
            },
            weekplandata:[],
            issuedata:[]
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.getOptionOneInfo()
    },
    methods: {
         gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 85 + "px";
        },
       // 查询站位名称
        getOptionOneInfo() {
            let that = this;
            that.axios
                .post(BasicData.GET_Z_findAllWarehouse)
                .then(res => {
                    that.optionOne = res.data;
                    that.rhList();
                    that.Seedailyplan()
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 根据站位查询周计划
        rhList() {
            let that = this;
            let url = AutomaticScheduling.GET_O_weekFindday
            that.axios
                .post(url, {
                    pageNum: that.nowPagesweek,
                    pageSize: that.pageSizeweek,
                    stationName: that.position,
                    sortieNo: that.sortienum
                    })
                    .then(res => {
                        that.weektableData = res.data.tdWeekPlanList
                        that.totalweek = res.data.count
                    })
                    .catch(error => {
                        console.log(error);
                    });
        },
        // 选择站位查询周计划
        AddCouponSelected() {
            let that = this;
            let url = AutomaticScheduling.GET_O_weekFindday
            that.axios
                .post(url, {
                    pageNum: that.nowPagesweek,
                    pageSize: that.pageSizeweek,
                    stationName: that.position,
                    sortieNo: that.sortienum
                    })
                    .then(res => {
                        that.weektableData = res.data.tdWeekPlanList
                        that.totalweek = res.data.count  
                    })
                    .catch(error => {
                        console.log(error);
                    });
        },
        // 添加日计划
        Adddailyplan(){
            let that = this;
            if(that.weekplandata.length == 0){
                this.$message({
                message: '请选择一条数据',
                type: 'warning'
                });
            }else{
                 let url = AutomaticScheduling.GET_O_addDayIssued
                    that.axios
                        .post(url, that.weekplandata)
                            .then(res => {
                            if (res.data.success == true) {
                                    that.Seedailyplan()
                                    that.AddCouponSelected()
                                    that.weekplandata=[]
                                    this.$message({
                                        message: res.data.message,
                                        type: 'success'
                                    });
                                }else{
                                    this.$message.error(res.data.message);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
            }
        },
        // 选择周计划
        handleSelectionChangeweek(val){
            console.log(val)
            for ( var i = 0; i <val.length; i++){
                this.weekplandata.push(val[i].weekPlanInstructId)
            }
            console.log(this.weekplandata)
        },
        //切换每页展示多少条数据week
        handleSizeChangeweek(val) {
            this.pageSizeweek = val;
            this.AddCouponSelected()
        },
        //分页 week
        OnPagingweek(val) {
            this.nowPagesweek = val;
            this.AddCouponSelected()
        },
        // 查询日计划
        Seedailyplan(){
            let that = this;
            let url = AutomaticScheduling.GET_O_dayFind
            that.axios
                .post(url, {
                    pageNum: that.nowPagesday,
                    pageSize: that.pageSizeday,
                    stationName: "",
                    sortieNo: ""
                })
                    .then(res => {
                    this.daytableData = res.data.tdWeekPlanList
                    that.totalday = res.data.count 
                    })
                    .catch(error => {
                        console.log(error);
                    });
        },
        // 下发日计划
        issue(){
            let that = this;
            let url = AutomaticScheduling.GET_O_dayIssued
            that.axios
                .post(url, that.daytableData)
                    .then(res => {
                        if (res.data.success == true) {
                            that.Seedailyplan()
                            this.$message({
                                message: res.data.message,
                                type: 'success'
                            });
                        }else{
                            this.$message.error(res.data.message);
                        }
                        
                    })
                    .catch(error => {
                        console.log(error);
                    });
        },
        // 日计划事件
        handleSelectionChangeday(val){

        },
        // 删除日计划
        ridelete(row){
            let that = this;
            that.axios
                .get(AutomaticScheduling.GET_O_deleteDayIssued, {
                    params: {
                        weekPlanInstructId: row.weekPlanInstructId
                    }
                })
                .then(res => {
                    if (res.data.success == true) {
                        that.Seedailyplan()
                        that.AddCouponSelected()
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
         //切换每页展示多少条数据day
        handleSizeChangeday(val) {
            this.pageSizeday = val;
            this.Seedailyplan()
        },
        //分页 day
        OnPagingday(val) {
            this.nowPagesday = val;
            this.Seedailyplan()
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

.Daily_head {
    height: 55px;
    overflow: hidden;
}

.Daily_head_left {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}

.Daily_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}

.Daily_head_left div {
    width: 170px;
    float: left;
}

.Daily_head_bnt {
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
}

.Daily_operation{
    padding: 0px 10px;
    height: 40px;
}

.Daily_contnet {
    width: 100%;
    height: 400px;
}

.Daily_title {
    height: 30px;
    overflow: hidden;
}

.Daily_title .DailyBox_title {
    float: left;
    text-indent: 10px;
    font-size: 12px;
    line-height: 30px;
}

.Daily_title .DailyBox_info {
    float: right;
    font-size: 12px;
    margin-right: 10px;
}

.Daily_contnet_table {
    padding: 0px 10px;
    height: -moz-calc(100% - 30px);
    /* WebKit */
    height: -webkit-calc(100% - 30px);
    /* Opera */
    height: -o-calc(100% - 30px);
    /* Standard */
    height: calc(100% - 30px);
}

.DetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>