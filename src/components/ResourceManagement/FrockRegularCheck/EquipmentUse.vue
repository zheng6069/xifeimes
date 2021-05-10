<template>
    <div class="container">
        <el-form :inline="true" class="demo-form-inline" size="medium">
            <el-form-item label>
                <el-input v-model="frockSearch" placeholder="名称、图号、编号" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="primary" @click="nowPages=1;frockList()">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="FRC_contnet" :style="TableHeight">
            <div class="FRCContent_title">
                <div class="FRC_title">工装使用信息</div>
                <div class="FRC_info">
                    <el-button size="mini" type="primary" class="operation_bnt" @click="returnOn">返回</el-button>
                </div>
            </div>
            <div class="FRC_contnet_table">
                <el-table
                    border
                    :data="FRCTableData"
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    height="100%"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="workName" label="工装名称"></el-table-column>
                    <el-table-column prop="workProduct" label="工装图号"></el-table-column>
                    <el-table-column prop="workNum" label="工装编号"></el-table-column>
                    <el-table-column prop="workOrderNo" label="工单号"></el-table-column>
                    <el-table-column prop="sorties" label="架次号"></el-table-column>
                    <el-table-column prop="aolNum" label="AOL编号"></el-table-column>
                    <el-table-column prop="aolName" label="AOL名称"></el-table-column>
                    <el-table-column prop="startTime" label="开始时间" :formatter="dateFormat"></el-table-column>
                    <el-table-column prop="endTime" label="结束时间" :formatter="dateFormat"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="sizeChange"
                @current-change="currentChange"
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
import { ResourceManagement } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            frockSearch: "",
            FRCTableData: [],
            multipleSelection: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0 //总数
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.frockList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 118 + "px";
        },
        // 查询
        frockList() {
            let that = this;
            let url = ResourceManagement.GET_v_selectWorkUseInfoList;
            let data = {
                pageSize: that.pageSize,
                pageNum: that.nowPages,
                condetion: that.frockSearch
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.FRCTableData = res.data.records;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.frockList();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.frockList();
        },
        returnOn() {
            this.$router.push({
                path: "FrockRegularCheck"
            });
        },
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd")
                : "";
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
};
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}
.demo-form-inline {
    height: 50px;
    margin-top: 10px;
    margin-left: 10px;
}
.FRCContent_title {
    height: 30px;
    overflow: hidden;
}
.FRCContent_title .FRC_title {
    float: left;
    text-indent: 10px;
    font-size: 12px;
    line-height: 30px;
}
.FRCContent_title .FRC_info {
    float: right;
    font-size: 12px;
    /* line-height: 30px; */
    margin-right: 10px;
}
.FRC_contnet_table {
    padding: 0px 10px;
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
.DetectPaging {
    /* width: 100%; */
    height: 40px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>