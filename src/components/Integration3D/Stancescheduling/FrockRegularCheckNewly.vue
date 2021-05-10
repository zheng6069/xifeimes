<template>
    <div class="container">
        <div class="FRC_contnet" :style="TableHeight">
            <div class="FRC_contnet_table">
                <el-table
                    border
                    :data="FRCTableData"
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    :highlight-current-row="true"
                    height="100%"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="name" label="工装名称">
                        <template slot-scope="scope">
                            <span @click="clickChange(scope.row)" style="cursor: pointer;">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="product" label="工装图号"></el-table-column>
                    <el-table-column prop="dataNumber" label="工装编号"></el-table-column>
                    <el-table-column prop="qty" label="数量"></el-table-column>
                    <el-table-column prop="checkTime" label="定检日期" :formatter="dateFormat"></el-table-column>
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
import { ResourceManagement,Dintegrate } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            Finalassembly: 2,
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
            this.TableHeight.height = window.innerHeight - 175 + "px";
        },
        // 查询
        frockList() {
            let that = this;
            let url = Dintegrate.GET_A_frock;
            let data = {
                pageSize: that.pageSize,
                pageNum: that.nowPages,
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
        // 点击当前行
        clickChange(row){
            this.$emit('func',row.name)
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.nowPages = 1;
            this.frockList();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.frockList();
        },
        // 确定-更新状态和时间
        dispatchList() {
            if (this.multipleSelection < 1) {
                this.$message({
                    //警示
                    message: "请选择数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                let that = this;
                let url = ResourceManagement.GET_D_updateWorkCheckTime;
                let upadtaArryTime = [];

                that.multipleSelection.map(i => {
                    upadtaArryTime.push(i.recordId);
                });

                that.axios
                    .post(url, upadtaArryTime)
                    .then(res => {
                        if (res.data.code == 0) {
                            that.$message({
                                //成功后的提示
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            that.frockList();
                        } else {
                            that.$message({
                                //成功后的提示
                                message: res.data.message,
                                type: "error",
                                duration: 1500
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        // 工装使用信息
        EquipmentUse() {
            // this.$router.push({
            //     path: "EquipmentUse"
            // });
            console.log("点击了")
            this.$emit('func',this.Finalassembly)
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

<style scoped>
.demo-form-inline {
    height: 50px;
}
.FRC_contnet {
    width: 100%;
}
.container{
    width: calc(100% - 20px);
    padding: 0 10px;
}

.FRCContent_title {
    height: 30px;
    overflow: hidden;
}
.FRCContent_title .FRC_title {
    float: left;
    font-size: 12px;
    line-height: 30px;
}
.FRCContent_title .FRC_info {
    float: right;
    font-size: 12px;
}
.FRC_contnet_table {
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
    margin-top: 10px;
}
.DetectPaging {
    height: 40px;
    margin-top: 5px;
}
</style>