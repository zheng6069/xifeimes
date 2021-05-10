<template>
    <div>
        <div class="Result_contnet" :style="TableHeight">
            <div class="Result_contnet_table">
                <el-table
                    ref="multipleTable"
                    border
                    :data="tableData"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" width="60" label="序号"></el-table-column>
                    <el-table-column prop="facilityMainId" label="设备维修单号"></el-table-column>
                    <el-table-column prop="facilityNum" label="设备编号"></el-table-column>
                    <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                    <el-table-column prop="station" label="设备位置" width="200"></el-table-column>
                    <el-table-column prop="mainType" label="故障类型" width="100"></el-table-column>
                    <el-table-column prop="mainTime" label="上报时间" width="100"></el-table-column>
                    <el-table-column prop="person" label="提交人" width="80"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="OnResultAcceptance(scope.row)"
                            >结果验收</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { ResourceManagement } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            tableData: [], //检测项table数据
            TableHeight: {
                height: ""
            },
            DeleteArr: [],
            resourcesId: ""
        };
    },
    created() {
        this.OnQuery();

        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 20 + "px";
        },
        //默认查询生产全部任务
        OnQuery() {
            this.axios
                .get(ResourceManagement.GET_H_Query, {})
                .then(res => {
                    this.tableData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //结果验收
        OnResultAcceptance(row) {
            this.$router.push({
                path: "AcceptanceResults",
                query: {
                    resourcesId: row.resourcesId
                }
            });
        }
    }
};
</script>
<style>
.Result_head_bnt {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}
.Result_contnet {
    margin-top: 10px;
    width: 100%;
}
.Result_contnet_table {
    height: 100%;
}
</style>
