<template>
    <div>
        <div class="And_Search">
            <el-form :inline="true" class="demo-form-inline" size="medium">
                <el-form-item class="item">
                    <el-input v-model="QuerySortieNumber" placeholder="架次号" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="nowPages = 1;OnQuery()" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="Dispatch_title">
            <div class="DispatchBox_title">质量异常信息</div>
            <div class="DispatchBox_info">
                <el-button @click="MvLook" type="primary" size="mini">问题处理</el-button>
            </div>
        </div>
        <div class="And_contnet" :style="TableHeight">
            <div class="And_contnet_table">
                <el-table
                    ref="multipleTable"
                    @selection-change="Tick"
                    border
                    :data="QueryArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="60"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="abnormalId" label="质量记载单"></el-table-column>
                    <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                    <el-table-column prop="workNo" label="工单号"></el-table-column>
                    <el-table-column prop="stationName" label="站位号"></el-table-column>
                    <el-table-column prop="instructNum" label="指令号"></el-table-column>
                    <el-table-column prop="instructName" label="指令名称"></el-table-column>
                    <el-table-column prop="person" label="提交人"></el-table-column>
                    <el-table-column prop="abTime" label="提交时间"></el-table-column>
                    <el-table-column prop="assemName" label="零部组件名称"></el-table-column>
                    <el-table-column prop="assemProduct" label="零部组件图号"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="And_DetectPaging">
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
import { AssemblyPerform } from "../../../common/api";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            QuerySortieNumber: "",
            QueryArr: [],
            DeleteArr: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0 //总数
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
            this.TableHeight.height = window.innerHeight - 140 + "px";
        },
        // 查询
        OnQuery() {
            this.axios({
                method: "post",
                url: AssemblyPerform.GET_C_Query + "?abStatus=" + 5,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    condetion: this.QuerySortieNumber
                }
            })
                .then(res => {
                    this.QueryArr = res.data.records;
                    this.total = res.data.total;
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
        //分页
        OnPaging(val) {
            this.nowPages = val;
            this.OnQuery();
        },
        //勾选
        Tick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.DeleteArr = row.pop(); //储存新的单选数据
                if (this.DeleteArr != undefined) {
                    this.resourcesId = this.DeleteArr.abnormalId;
                } else {
                    this.resourcesId = "";
                }
            }
        },
        // 问题处理
        MvLook() {
            if (this.DeleteArr.length < 1 || this.DeleteArr == undefined) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.$router.push({
                    path: "AndSealingBox",
                    query: {
                        abnormalId: this.resourcesId
                    }
                });
            }
        }
    }
};
</script>

<style>
.And_Search .item .el-form-item__label {
    font-size: 16px;
    color: #000000;
}
.And_contnet {
    width: 100%;
    height: 50px;
}
.demo-form-inline {
    width: 100%;
    height: 50px;
}
.And_contnet_table {
    height: 100%;
}
.And_DetectPaging {
    height: 35px;
    margin-top: 5px;
}
.Dispatch_title {
    height: 30px;
    overflow: hidden;
}
.Dispatch_title .DispatchBox_title {
    float: left;
    font-size: 12px;
    line-height: 30px;
}
.Dispatch_title .DispatchBox_info {
    float: right;
    font-size: 12px;
}
</style>