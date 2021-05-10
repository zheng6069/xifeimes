<template>
    <div>
        <div style="margin-top: 10px">
            <div class="AddSeeFourtitles">工（量）具信息</div>
            <el-button
                type="primary"
                size="small"
                @click="re"
                style="float: right; margin-right: 10px"
            >返 回</el-button>
            <div style="clear: both"></div>
        </div>

        <div class="AddSeeFourcontnet" :style="AddSeeFourTableHeight">
            <div class="AddSeeFourcontnet_table">
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
                    <el-table-column type="expand" prop="backTools">
                        <template slot-scope="scope">
                            <el-table
                                :data="scope.row.backTools"
                                style="width: 100%"
                                height="100%"
                                :header-row-style="{ height: '39px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '39px' }"
                                :cell-style="{ padding: '0px' }"
                                border
                                ref="backTools"
                            >
                                <el-table-column label="序号" type="index" width="60"></el-table-column>
                                <el-table-column label="架次号" prop="sortieNo"></el-table-column>
                                <el-table-column label="站位名称" prop="stationName"></el-table-column>
                                <el-table-column label="指令号" prop="instructNum"></el-table-column>
                                <el-table-column label="指令名称" prop="instructName"></el-table-column>
                                <el-table-column
                                    label="开始时间"
                                    prop="startTime"
                                    :formatter="dateFormat"
                                ></el-table-column>
                                <el-table-column
                                    label="结束时间"
                                    prop="endTime"
                                    :formatter="dateFormat"
                                ></el-table-column>
                                <el-table-column label="备注" :show-overflow-tooltip="true">
                                    <template slot-scope="{ row }">
                                        <span>{{ row.remarks }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column label="名称" prop="materialName"></el-table-column>
                    <el-table-column label="规格" prop="specs"></el-table-column>
                    <el-table-column label="备注" :show-overflow-tooltip="true">
                        <template slot-scope="{ row }">
                            <span>{{ row.remarks }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="AddSeeFourDetectPaging">
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
import { AutomaticScheduling } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    name: "Start",
    data() {
        return {
            feedbackPerson: this.$route.query.feedbackPerson,
            time: null, //时间
            AddSeeFourTableHeight: {
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
        this.feedbackPerson = data.feedbackPerson
        this.getDataList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.AddSeeFourTableHeight.height = window.innerHeight - 185 + "px";
        },
        // 查询
        getDataList() {
            let that = this;
            let url = AutomaticScheduling.GET_Z_findResultUserTools;
            let data = {
                pageNum: that.nowPages,
                pageSize: that.pageSize,
                resultUser: that.feedbackPerson
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
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
.AddSeeFourhead {
    height: 60px;
    overflow: hidden;
}
.AddSeeFourhead_left {
    width: 250px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.AddSeeFourhead_left p {
    width: 80px;
    float: left;
    line-height: 36px;
}
.AddSeeFourhead_left div {
    width: 170px;
    float: left;
}
.AddSeeFourhead_bnt {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}

.AddSeeFourElasticFrame_top {
    overflow: hidden;
}

.AddSeeFourTesting {
    width: 250px;
    height: 40px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}

.AddSeeFourTesting div {
    width: 160px;
    float: right;
}
.AddSeeFourTaskContent {
    width: 510px;
    height: 80px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}
.AddSeeFourTaskContent div {
    width: 420px;
    float: right;
}

.AddSeeFourtitles {
    height: 30px;
    line-height: 30px;
    text-indent: 10px;
    float: left;
}
.AddSeeFourcontnet {
    width: 100%;
}
.AddSeeFourcontnet_table {
    padding: 0px 10px;
    height: 100%;
}

.AddSeeFourDetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
