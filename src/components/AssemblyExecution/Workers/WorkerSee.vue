<template>
    <div>
        <div class="Dispatch_head">
            <div class="Dispatch_head_left">
                <p>指令号</p>
                <el-input v-model="positions" size="medium" clearable placeholder="请输入"></el-input>
            </div>
            <div class="Dispatch_head_left">
                <p>架次号</p>
                <el-input v-model="TimesNo" size="medium" clearable placeholder="请输入"></el-input>
            </div>
            <div class="Dispatch_head_left" style="width: 300px">
                <p style="width: 40px">时间</p>
                <div style="width: 260px">
                    <el-date-picker
                        style="width: 260px"
                        v-model="times"
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
                class="Dispatch_head_bnt"
                @click="nowPages =1;
          ONTestItemQuery();
        "
            >查询</el-button>
        </div>
        <div class="Dispatch_contnet" :style="TableHeight">
            <div class="Dispatch_title">
                <div class="DispatchBox_title">报工信息</div>
            </div>
            <div class="Dispatch_contnet_table">
                <el-table
                    border
                    :data="tableData"
                    @selection-change="handleSelectionChange"
                    ref="multipleTable"
                    height="100%"
                    style="width: 100%; height: 100%"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="workNo" label="工单号"></el-table-column>
                    <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                    <el-table-column prop="drawing" label="产品图号"></el-table-column>
                    <el-table-column prop="name" label="产品名称"></el-table-column>
                    <el-table-column prop="instructNum" label="指令号"></el-table-column>
                    <el-table-column prop="instructName" label="指令名称"></el-table-column>
                    <el-table-column prop="workStartTime" :formatter="dateFormat" label="开工时间"></el-table-column>
                    <el-table-column prop="workEndTime" :formatter="dateFormat" label="报工时间"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                :page-size="pageSize"
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="nowPages"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}

.Dispatch_head {
    height: 60px;
    overflow: hidden;
}

.Dispatch_head_left {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}

.Dispatch_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}

.Dispatch_head_left div {
    width: 170px;
    float: left;
}

.Dispatch_head_bnt {
    /* float: right; */
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
}

.Dispatch_contnet {
    width: 100%;
}

.Dispatch_title {
    height: 30px;
    overflow: hidden;
}

.Dispatch_title .DispatchBox_title {
    float: left;
    text-indent: 10px;
    font-size: 12px;
    line-height: 30px;
}

.Dispatch_contnet_table {
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
    /* width: 100%; */
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
<script>
import { AssemblyPerform } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    name: "Start",
    data() {
        return {
            tableData: [], //检测项table数据
            positions: "", // 指令
            TimesNo: "", // 架次号
            times: null, // 时间
            TableHeight: {
                height: ""
            },
            multipleSelection: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            optionOne: []
        };
    },
    created() {
        this.ONTestItemQuery();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 115 + "px";
        },
        //列表展示
        ONTestItemQuery() {
            let that = this;
            let url = AssemblyPerform.GET_X_findWorkRecord;
            let data = {
                page: that.nowPages, //当前页
                limit: that.pageSize, //第几页
                sortieNo: that.TimesNo,
                instructNum: that.positions,
                times: that.times
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.tableData = res.data.list;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.ONTestItemQuery();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.ONTestItemQuery();
        },
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd HH:mm")
                : "";
        },
        // 获取点击时的数据
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            } else {
                this.multipleSelection = val.pop(); //储存新的单选数据
            }
        }
    }
};
</script>
