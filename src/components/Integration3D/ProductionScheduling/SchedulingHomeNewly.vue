<template>
    <div>
        <div class="SchHome_head">
            <div class="SchHome_head_left">
                <p>订单号</p>
                <div>
                    <el-input v-model="orderNumber" size="medium" clearable placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="SchHome_head_left">
                <p>架次号</p>
                <div>
                    <el-input v-model="SortieNumber" size="medium" clearable placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="SchHome_head_left">
                <p>批次号</p>
                <div>
                    <el-input v-model="BatchNumber" size="medium" clearable placeholder="请输入"></el-input>
                </div>
            </div>
            <div class="SchHome_head_left" style="width:250px;">
                <p style="width:110px;">计划开始时间</p>
                <div style="width:140px;">
                    <el-date-picker
                        size="medium"
                        type="date"
                        style="width:100%"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        v-model="startTime"
                    ></el-date-picker>
                </div>
            </div>
            <div class="SchHome_orderName">
                <p>订单状态</p>
                <div>
                    <el-select
                        v-model="OrderStatus"
                        size="medium"
                        clearable
                        style="width:140px;"
                        placeholder="请选择"
                    >
                        <el-option label="未排产" value="0"></el-option>
                        <el-option label="已排产" value="88"></el-option>
                        <el-option label="已下发" value="2"></el-option>
                    </el-select>
                </div>
            </div>
            <el-button
                @click="nowPages=1;OnQuery()"
                size="medium"
                type="primary"
                class="SchHome_head_bnt"
            >查询</el-button>
        </div>

        <div class="SchHome_operation">
            <div class="SchHome_operation_nei">
                <el-button
                    @click="OnScheduling"
                    size="medium"
                    type="primary"
                    class="SchHome_operation_bnt"
                >排产</el-button>
                <el-button
                    size="medium"
                    type="primary"
                    class="SchHome_operation_bnt"
                    @click="IssuedResults"
                >已排产结果下发</el-button>
            </div>
        </div>

        <div class="SchHome_contnet" :style="TableHeight">
            <div class="SchHome_contnet_table">
                <el-table
                    @selection-change="Tick"
                    border
                    :data="QueryArr"
                    :highlight-current-row="true"
                    @cell-click="IssuedResultsss"
                    height="100%"
                    style="width: 100%;height:100%; "
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column type="index" width="60" label="序号"></el-table-column>
                    <el-table-column prop="orderNo" label="订单号" width="180"></el-table-column>
                    <el-table-column prop="sortie" label="架次号" width="180"></el-table-column>
                    <el-table-column prop="xbomNumber" label="XBOM号" width="120"></el-table-column>
                    <el-table-column prop="productName" label="产品名称" width="150"></el-table-column>
                    <el-table-column prop="planQty" label="数量" width="60"></el-table-column>
                    <el-table-column prop="batch" label="批次"></el-table-column>
                    <el-table-column prop="mesTaskStatus" label="订单状态"></el-table-column>
                    <el-table-column prop="customer" label="客户名称"></el-table-column>
                    <el-table-column prop="startDate" label="计划开始时间"></el-table-column>
                    <el-table-column prop="endDate" label="计划完成时间"></el-table-column>
                </el-table>
            </div>
        </div>

        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="OnPaging"
                :page-size="pageSize"
                :current-page="nowPages"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import { AutomaticScheduling } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            orderNumber: "", //订单号
            SortieNumber: "", //架次号
            BatchNumber: "", //批次号
            startTime: "", //开始时间
            OrderStatus: "", //订单状态
            QueryArr: [], //table数据
            TableHeight: {
                height: ""
            },
            QueryArrState: [
                {
                    name: "未排产",
                    id: "0"
                },
                {
                    name: "已排产",
                    id: "88"
                },
                {
                    name: "已下发",
                    id: "2"
                }
            ],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            CheckDataArr: [],
            DeleteArr: [],
            SchedulingArr: []
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
            this.TableHeight.height = window.innerHeight - 250 + "px";
        },
        //查询
        OnQuery() {
            this.axios({
                method: "post",
                url: AutomaticScheduling.GET_B_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //每页多少条
                    orderNo: this.orderNumber, //订单号
                    sortie: this.SortieNumber, //架次号
                    batch: this.BatchNumber, //批次
                    startDate: this.startTime, //开始时间
                    mesTaskStatus: this.OrderStatus //订单状态
                }
            })
                .then(res => {
                    this.QueryArr = res.data.records;
                    // 存sortieNum localStorage
                    localStorage.setItem('sortieNum',res.data.records[0].sortie);
                    this.total = res.data.total;
                    this.QueryArr.map(ite => {
                        this.QueryArrState.map(val => {
                            if (ite.mesTaskStatus == val.id) {
                                ite.mesTaskStatus = val.name;
                            }
                        });
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //切换每页展示多少条数据
        handleSizeChange(val) {
            this.pageSize = val;
            this.OnQuery();
        },
        // 点击行触发父组件事件
        IssuedResultsss(row){
            this.$emit('func',row.sortie)
        },
        //分页
        OnPaging(val) {
            this.nowPages = val;
            this.OnQuery();
        },
        //勾选
        Tick(row) {
            this.CheckDataArr = row; //勾选导出数据
            var str = "";
            row.forEach(function(e) {
                str += e.mesTaskId + ",";
            });
            str = str.substring(0, str.length - 1);
            this.DeleteArr = str.split(",");
        },
        //排产
        OnScheduling() {
            this.$router.push({
                path: "ProductionSchedulingNewly",
                query: {
                    DeleteArrStats: 0
                }
            });
        },
        // 已排产结果下发
        IssuedResults() {
            this.$router.push({
                path: "SchedulingResultsNewly"
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
.SchHome_head {
    height: 60px;
    overflow: hidden;
}
.SchHome_head_left {
    width: 210px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.SchHome_head_left p {
    width: 60px;
    float: left;
    line-height: 36px;
}
.SchHome_head_left div {
    width: 150px;
    float: left;
}
.SchHome_orderName {
    width: 180px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.SchHome_orderName p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.SchHome_orderName div {
    width: 110px;
    float: left;
}
.SchHome_head_bnt {
    margin-top: 10px;
    margin-left: 10px;
}
.SchHome_operation {
    height: 50px;
    padding: 0px 10px;
}
.SchHome_operation_nei {
    width: 100%;
    height: 100%;
}
.SchHome_contnet {
    width: 100%;
}
.SchHome_contnet_table {
    padding: 0px 10px;
    height: 100%;
}
.DetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
