<template>
    <div>
        <div class="AddSeeTwohead">
            <div class="AddSeeTwohead_left">
                <span class="resultSpan">结果反馈： {{ result == "1" ? "其他" : "准备就绪" }}</span>
            </div>
            <div class="AddSeeTwohead_left" style="width: 300px">
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
            <div class="AddSeeTwohead_left">
                <el-button type="primary" size="medium" @click="re">返 回</el-button>
            </div>
        </div>
        <div class="titles">设备信息</div>
        <div class="AddSeeTwocontnet" :style="AddSeeTwoTableHeight">
            <div class="AddSeeTwocontnet_table">
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
                    <el-table-column type="expand" prop="list">
                        <template slot-scope="scope">
                            <el-table
                                :data="scope.row.list"
                                style="width: 100%"
                                height="100%"
                                :header-row-style="{ height: '39px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '39px' }"
                                :cell-style="{ padding: '0px' }"
                                border
                                ref="list"
                            >
                                <el-table-column label="序号" type="index" width="60"></el-table-column>
                                <el-table-column label="架次号" prop="sortieNo"></el-table-column>
                                <el-table-column label="站位名称" prop="stationName"></el-table-column>
                                <el-table-column label="指令号" prop="instructionNo"></el-table-column>
                                <el-table-column label="指令名称" prop="instructionName"></el-table-column>
                                <el-table-column label="开始时间" prop="startTime"></el-table-column>
                                <el-table-column label="结束时间" prop="endTime"></el-table-column>
                                <el-table-column label="备注" :show-overflow-tooltip="true">
                                    <template slot-scope="{ row }">
                                        <span>{{ row.instructionRemarks }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column label="设备名称" prop="equipmentName"></el-table-column>
                    <el-table-column label="设备型号" prop="equipmentModel"></el-table-column>
                    <el-table-column label="设备类型" prop="equipmentType"></el-table-column>
                    <el-table-column label="设备编号" prop="equipmentNo"></el-table-column>
                    <el-table-column label="设备大修时间" prop="repairDay"></el-table-column>
                    <el-table-column label="设备位置" prop="equipmentLocation"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="AddSeeTwoDetectPaging">
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
export default {
    name: "Start",
    data() {
        return {
            feedbackPerson: this.$route.query.feedbackPerson,
            feedbackResults: this.$route.query.feedbackResults,
            feedbackTime: this.$route.query.feedbackTime,
            time: null, //时间
            AddSeeTwoTableHeight: {
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
        let data = JSON.parse(localStorage.getItem('AddSeeList'));
        this.feedbackPerson = data.feedbackPerson,
        this.feedbackResults= data.feedbackResults,
        this.feedbackTime= data.feedbackTime,
        this.getDataList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.AddSeeTwoTableHeight.height = window.innerHeight - 250 + "px";
        },
        // 查询
        getDataList() {
            let that = this;
            let url = AutomaticScheduling.GET_Z_findEquInfo;
            let data = {
                page: that.nowPages,
                limit: that.pageSize,
                feedbackPerson: that.feedbackPerson,
                feedbackResults: that.feedbackResults,
                feedbackTime: that.feedbackTime
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.tableData = res.data.records;
                    that.total = res.data.total;
                    that.result =
                        res.data.records[0].records[0].feedbackResults;
                    let timeArr = [];
                    timeArr.push(
                        res.data.records[0].records[0].confirmStartTime
                    );
                    timeArr.push(res.data.records[0].records[0].confirmEndTime);
                    this.time = timeArr;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        parentHandleclick(){
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
} /*设置显示隐藏部分内容，按50%显示*/
.AddSeeTwohead {
    height: 60px;
    overflow: hidden;
}
.AddSeeTwohead_left {
    width: 250px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.AddSeeTwohead_left p {
    width: 80px;
    float: left;
    line-height: 36px;
}
.AddSeeTwohead_left .resultSpan {
    height: 36px;
    line-height: 36px;
}
.AddSeeTwohead_left div {
    width: 170px;
    float: left;
}
.AddSeeTwohead_bnt {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}

.AddSeeTwoElasticFrame_top {
    overflow: hidden;
}

.AddSeeTwoTesting {
    width: 250px;
    height: 40px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}

.AddSeeTwoTesting div {
    width: 160px;
    float: right;
}
.AddSeeTwoTaskContent {
    width: 510px;
    height: 80px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}
.AddSeeTwoTaskContent div {
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
.AddSeeTwocontnet {
    width: 100%;
}
.AddSeeTwocontnet_table {
    padding: 0px 10px;
    height: 100%;
}

.AddSeeTwoDetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
