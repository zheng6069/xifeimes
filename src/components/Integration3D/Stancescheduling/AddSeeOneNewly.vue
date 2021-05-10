<template>
    <div class="container">
        <div class="AddSeeOnehead">
            <div class="AddSeeOnehead_left">
                <span>结果反馈：{{ resultsFeedback }}</span>
            </div>
            <div class="AddSeeOnehead_left" style="width: 300px">
                <p style="width: 40px">时间</p>
                <div style="width: 260px">
                    <el-date-picker
                        style="width: 260px"
                        v-model="time"
                        size="medium"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        disabled
                    ></el-date-picker>
                </div>
            </div>
            <el-button
                type="primary"
                size="medium"
                @click="re"
                style="margin: 10px 0px 0px 10px"
            >返 回</el-button>
        </div>
        <div class="titles">物料信息</div>
        <div class="AddSeeOnecontnet" :style="AddSeeOneTableHeight">
            <div class="AddSeeOnecontnet_table">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    height="100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                    border
                    ref="multipletableData"
                >
                    <el-table-column type="expand" prop="backList">
                        <template slot-scope="scope">
                            <el-table
                                :data="scope.row.backList"
                                style="width: 100%"
                                height="100%"
                                :header-row-style="{ height: '39px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '39px' }"
                                :cell-style="{ padding: '0px' }"
                                border
                                ref="backList"
                            >
                                <el-table-column label="序号" type="index" width="60"></el-table-column>
                                <el-table-column label="产品图号" prop="drawNo"></el-table-column>
                                <el-table-column label="产品名称" prop="materialName"></el-table-column>
                                <el-table-column label="需求数量" prop="stockNum"></el-table-column>
                                <el-table-column label="缺件数" prop="staillNum"></el-table-column>
                                <el-table-column
                                    label="备注"
                                    prop="remark"
                                    :show-overflow-tooltip="true"
                                >
                                    <template slot-scope="{ row }">
                                        <span>{{ row.remark }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column label="架次号" prop="sortieNo"></el-table-column>
                    <el-table-column label="指令号" prop="instructNum"></el-table-column>
                    <el-table-column label="指令名称" prop="instructName"></el-table-column>
                    <el-table-column label="计划开始时间" prop="startTime" :formatter="dateFormat"></el-table-column>
                    <el-table-column label="计划结束时间" prop="endTime" :formatter="dateFormat"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="AddSeeOneDetectPaging">
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
        <div class="And_DescriptionProcessing">
            <div class="And_FaultDescription" style="margin-left: 20px">
                <p>备注</p>
                <div class="content">
                    <el-input
                        class="And_FaultDescription_textarea"
                        type="textarea"
                        v-model="remark"
                        disabled
                    ></el-input>
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
    </div>
</template>

<script>
import { AutomaticScheduling } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    name: "Start",
    data() {
        return {
            stationName: this.$route.query.stationName,
            resultsFeedback: this.$route.query.resultsFeedback,
            remarks:this.$route.query.remarks,
            orderId:this.$route.query.orderId,
            time: null, //时间
            AddSeeOneTableHeight: {
                height: ""
            },
            tableData: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            multipleSelection: [],
            multipleSelectionEee: [],
            result: "", //结果反馈
            remark: "" //备注
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        // 获取localStorage数据
        let data = JSON.parse(localStorage.getItem('AddSeeList'));
        this.stationName = data.stationName,
        this.resultsFeedback= data.resultsFeedback,
        this.remarks= data.remarks,
        this.orderId= data.orderId,
        this.getDataList();
        this.remark = this.remarks;
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.AddSeeOneTableHeight.height = window.innerHeight - 330 + "px";
        },
        // 查询
        getDataList() {
            let that = this;
            let url = AutomaticScheduling.GET_Z_findMaterialResultList;
            let data = {
                pageNum: that.nowPages,
                pageSize: that.pageSize,
                stationName: that.stationName,
                orderId:that.orderId
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.tableData = res.data.list;
                    that.total = res.data.total;
                    let ary = [];
                    ary.push(res.data.list[0].backStartTime);
                    ary.push(res.data.list[0].backEndTime);
                    this.time = ary;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.nowPages = 1;
            this.getDataList();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.getDataList();
        },
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd")
                : "";
        },
        // 返回父组件
        re() {
            this.$emit("func")
        }
    }
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.container{
    padding-bottom: 20px;
}
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
.AddSeeOnehead {
    height: 60px;
    overflow: hidden;
}
.AddSeeOnehead_left {
    width: 250px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.AddSeeOnehead_left p {
    /* width: 80px; */
    float: left;
    line-height: 36px;
}
.AddSeeOnehead_left div {
    width: 170px;
    float: left;
}
.AddSeeOnehead_left span {
    line-height: 36px;
}
.AddSeeOnehead_bnt {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}

.AddSeeOneElasticFrame_top {
    overflow: hidden;
}

.AddSeeOneTesting {
    width: 250px;
    height: 40px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}

.AddSeeOneTesting div {
    width: 160px;
    float: right;
}
.AddSeeOneTaskContent {
    width: 510px;
    height: 80px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}
.AddSeeOneTaskContent div {
    width: 420px;
    float: right;
}
.And_DescriptionProcessing {
    height: 55px;
    margin-top: 10px;
}
.And_FaultDescription {
    width: 50%;
    height: 100%;
    float: left;
    overflow: hidden;
}
.And_FaultDescription p {
    width: 80px;
    height: 100%;
    float: left;
    margin-top: 17px;
    box-sizing: border-box;
}
.And_FaultDescription .content {
    width: calc(100% - 80px);
    width: -moz-calc(100% - 80px);
    width: -webkit-calc(100% - 80px);
    width: -o-calc(100% - 80px);

    height: 100%;
    float: left;
}
.And_FaultDescription_textarea {
    width: 100%;
}
.titles {
    height: 30px;
    line-height: 30px;
    text-indent: 10px;
}
.AddSeeOnecontnet {
    width: 100%;
}
.AddSeeOnecontnet_table {
    padding: 0px 10px;
    height: 100%;
}

.AddSeeOneDetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
