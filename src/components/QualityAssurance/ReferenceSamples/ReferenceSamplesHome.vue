<template>
    <div class="container">
        <div class="RSHSearch">
            <el-form :inline="true" :model="RSHSearchform" class="demo-form-inline" size="medium">
                <el-form-item label class="item">
                    <el-input v-model="RSHSearchform.serialNumber" placeholder="请输入架次号" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="
              nowPages = 1;
              RSHSearchSubmit();
            "
                    >查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="RSH_contnet" :style="TableHeight">
            <div class="RSH_contnet_table">
                <el-table
                    border
                    :data="RSHTableData"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="name" label="产品名称"></el-table-column>
                    <el-table-column prop="drawing" label="产品图号"></el-table-column>
                    <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                    <el-table-column prop="workNo" label="订单号"></el-table-column>
                    <el-table-column prop="repairTime" label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="DataLook(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
    </div>
</template>

<script>
import { AssemblyPerform } from "../../../common/api";
export default {
    data() {
        return {
            RSHSearchform: {
                serialNumber: ""
            },
            TableHeight: {
                height: ""
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            RSHTableData: []
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.RSHSearchSubmit();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 95 + "px";
        },
        // 查询
        RSHSearchSubmit() {
            let that = this;
            let url = AssemblyPerform.GET_V_findWorkRecord;
            let data = {
                limit: that.pageSize,
                page: that.nowPages,
                sortieNo: that.RSHSearchform.serialNumber
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.RSHTableData = res.data.list;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        sizeChange(val) {
            this.pageSize = val;
            this.RSHSearchSubmit();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.RSHSearchSubmit();
        },
        DataLook(row) {
            this.$router.push({
                path: "RecordHome",
                query: {
                    drawing: row.drawing,
                    sortieNo: row.sortieNo,
                    workFlowId: row.workFlowId,
                    workId: row.workId,
                    workNo: row.workNo
                }
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
.container {
    padding: 10px;
}
.RSHSearch .el-input {
    width: 200px;
}
.RSHSearch .item .el-form-item__label {
    font-size: 16px;
    color: #000000;
}
.RSH_contnet {
    width: 100%;
}
.RSHContent_title {
    height: 30px;
    overflow: hidden;
}
.RSHContent_title .RSH_title {
    float: left;
    font-size: 12px;
    line-height: 30px;
}
.RSHContent_title .RSH_info {
    float: right;
    font-size: 12px;
    margin-right: 10px;
}
.RSH_contnet_table {
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
</style>
