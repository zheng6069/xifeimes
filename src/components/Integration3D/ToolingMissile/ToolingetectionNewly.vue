<template>
    <div class="FRCcontainer">
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
                <div class="FRC_title">工装定检信息</div>
                <div class="FRC_info">
                    <el-button
                        size="mini"
                        type="primary"
                        class="operation_bnt"
                        @click="dispatchList"
                    >送检</el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        class="operation_bnt"
                        @click="RegularInspectionCompleted"
                    >定检完成</el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        class="operation_bnt"
                        @click="OnReturn"
                    >返回</el-button>
                   
                </div>
            </div>
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
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="name" label="工装名称">
                        <el-table-column prop="facilityMainId" label="设备维修单号" width="180">
                        <template slot-scope="scope">
                            <span @click="IssuedResultsss(scope.row)" style="cursor: pointer;">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    </el-table-column>
                    <el-table-column prop="product" label="工装图号/型号"></el-table-column>
                    <el-table-column prop="dataNumber" label="工装编号"></el-table-column>
                    <el-table-column prop="checkStatus" label="送检状态" width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.checkStatus == 2">已送检</span>
                            <span v-else>未送检</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="qty" label="数量"></el-table-column>
                    <el-table-column prop="expirationDate" label="有效期至" :formatter="dateFormat"></el-table-column>
                    <el-table-column prop="planStartTime" label="计划开始">
                        <template slot-scope="scope">
                            <p v-if="!scope.row.isChange"  v-text="scope.row.planStartTime"></p>
                            <el-date-picker
                                size="medium"
                                type="date"
                                style="width: 100%"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                v-if="scope.row.isChange"
                                v-model="scope.row.planStartTime"
                            ></el-date-picker>
                           
                        </template>
                    </el-table-column>
                    <el-table-column prop="planEndTime" label="计划结束" :formatter="dateFormat">
                         <template slot-scope="scope">
                            <p v-if="!scope.row.isChange"  v-text="scope.row.planEndTime"></p>
                            <el-date-picker
                                size="medium"
                                type="date"
                                style="width: 100%"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                v-if="scope.row.isChange"
                                v-model="scope.row.planEndTime"
                            ></el-date-picker>
                        </template>
                    </el-table-column>
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
            this.TableHeight.height = window.innerHeight - 180 + "px";
        },
        // 查询
        frockList() {
            let that = this;
            let url = ResourceManagement.GET_D_Query;
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
            this.nowPages = 1;
            this.frockList();
        },
        IssuedResultsss(row){
            this.$emit('func',row.dataNumber)
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
                    if(i.planStartTime != undefined || i.planEndTime != undefined){
                        upadtaArryTime.push({
                            recordId : i.recordId,
                            dataNumber : i.dataNumber,
                            expirationDate :i.expirationDate,
                            planStartTime:i.planStartTime,
                            planEndTime:i.planEndTime
                        });
                    }
                });
                // 送检时判断时间是否填写
                if(upadtaArryTime.length !=0){
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
                }else{
                    this.$message({
                        //警示
                        message: "请填写时间",
                        type: "warning",
                        duration: 1500
                    }); 
                }
            }
        },
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd")
                : "";
        },
        //定检完成
        RegularInspectionCompleted(){
             if (this.multipleSelection < 1) {
                this.$message({
                    //警示
                    message: "请选择数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                let that = this;
                let url = ResourceManagement.GET_D_RegularInspectionCompleted;
                let RegularInspectionCompletedArr = [];
                that.multipleSelection.map(i => {
                    if(i.checkStatus == 2){
                        RegularInspectionCompletedArr.push({
                            recordId : i.recordId,
                            dataNumber : i.dataNumber,
                            expirationDate :i.expirationDate,
                        });
                    }
                });
                // 送检时时判断是否送检
                if(RegularInspectionCompletedArr.length !=0){
                    that.axios
                    .post(url, RegularInspectionCompletedArr)
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
                }else{
                    this.$message({
                        //警示
                        message: "工装未送检",
                        type: "warning",
                        duration: 1500
                    });
                }
                
            }
        },
      
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.multipleSelection.map(val => {
                //循环让table 可以修改数量
                val.isChange = true;
            });
             
        },
          //返回
        OnReturn(){
            this.$router.go(-1);
        },

    }
};
</script>

<style>
*{
    margin: 0px;
    padding: 0px;
}
.FRCcontainer{
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.demo-form-inline {
    height: 50px;
}
.FRC_contnet {
    width: 100%;
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
}
.DetectPaging {
    height: 40px;
    margin-top: 5px;
}
</style>