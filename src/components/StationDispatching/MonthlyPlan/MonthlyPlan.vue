<template>
    <div>
        <div class="Month_head">
            <div class="Month_head_left">
                <p>架次号</p>
                <div>
                    <el-input v-model="SortieNumber" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="Month_head_left">
                <p>任务包</p>
                <div>
                    <el-input v-model="TaskPackage" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="Month_head_left">
                <p>完工状态</p>
                <div>
                    <el-select size="medium" v-model="CompletionStatus" clearable placeholder="请选择">
                        <el-option label="已完成" value="已完成"></el-option>
                        <el-option label="未完成" value="未完成"></el-option>
                    </el-select>
                </div>
            </div>
            <el-button size="medium" type="primary" class="Month_head_bnt">查询</el-button>
            <div class="Month_total">
                <p class="Month_TotalTlete">未完成数</p>
                <p class="Month_TotalCon">10</p>
            </div>
            <div class="Month_total">
                <p class="Month_TotalTlete">总数</p>
                <p class="Month_TotalCon">10</p>
            </div>
        </div>
        <div class="Month_contnet" :style="TableHeight">
            <div class="Month_contnet_table">
                <el-table border :data="QueryArr" height="100%" style="width: 100%;height:100%;">
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column prop="facilityName" label="架次号"></el-table-column>
                    <el-table-column prop="facilityNum" label="工单号"></el-table-column>
                    <el-table-column prop="facilityType" label="任务包"></el-table-column>
                    <el-table-column prop="facilityModel" label="指令数"></el-table-column>
                    <el-table-column prop="useYear" label="完工状态"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { BasicData } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            TableHeight: {
                height: ""
            },
            SortieNumber: "", //架次号
            TaskPackage: "", //任务包
            CompletionStatus: "", //完成状态
            QueryArr: []
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 70 + "px";
        }
    }
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Month_head {
    height: 60px;
    overflow: hidden;
}
.Month_head_left {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Month_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.Month_head_left div {
    width: 170px;
    float: left;
}

.Month_head_bnt {
    /* float: right; */
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}
.Month_total {
    float: right;
    margin-right: 10px;
}
.Month_TotalTlete {
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    font-weight: bold;
}
.Month_TotalCon {
    height: 30px;
    font-size: 12px;
    text-align: center;
    font-weight: bold;
}

.Montht_contnet {
    width: 100%;
}
.Month_contnet_table {
    padding: 0px 10px;
    height: 100%;
}
</style>