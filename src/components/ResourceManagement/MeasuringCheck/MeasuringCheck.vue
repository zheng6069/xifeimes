<template>
    <div class="MeasuringCheck_container">
        <!-- <div class="MeasuringCheck_Title">工（量）具定检信息</div> -->
        <div class="FRCContent_title">
            <div class="FRC_title">工（量）具定检信息</div>
            <div class="FRC_info">
                <el-button
                    size="mini"
                    type="primary"
                    class="operation_bnt"
                    @click="MeasuringCheckConfirm"
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
        <div :style="TableHeight">
            <el-table
                border
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                :data="StandingMeasuringCheckArr"
                height="100%"
                style="width: 100%; height: 100%"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="toolNum" label="计量编号" width="120"></el-table-column>
                <el-table-column prop="toolName" label="工（量）具名称"></el-table-column>
                <el-table-column prop="checkStatus" label="送检状态 "width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.checkStatus == 2">已送检</span>
                            <span v-else>未送检</span>
                        </template>
                    </el-table-column>
                <el-table-column prop="toolModel" label="型号" width="120"></el-table-column>
                <el-table-column prop="toolProduct" label="图号"></el-table-column>
                <el-table-column prop="toolFormat" label="规格" width="80"></el-table-column>
                <el-table-column prop="expirationDate" label="有效期至" width="100" :formatter="dateFormat"></el-table-column>
               
                <el-table-column prop="planStartTime" label="计划开始" width="160">
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
                <el-table-column prop="planEndTime" label="计划结束" width="160" :formatter="dateFormat">
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
                <el-table-column prop="station" label="所属站位" width="100"></el-table-column>
                <el-table-column prop="operator" label="负责人" width="80"></el-table-column>
                <el-table-column label="备注" width="200" :show-overflow-tooltip="true">
                    <template slot-scope="{ row }">
                        <span>{{ row.remarks }}</span>
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
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
.el-form-item__label {
    width: 120px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 150px;
}
.MeasuringCheck_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.MeasuringCheck_title {
    height: 50px;
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
.MeasuringCheck_head {
    width: 220px;
    float: left;
    margin-right: 10px;
}
.MeasuringCheck_head p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.MeasuringCheck_head div {
    width: 150px;
    float: left;
}
.MeasuringCheck_Title {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
}
.Out_bnt {
    float: right;
}
.AdvanElasticFrame_top {
    overflow: hidden;
}

.AdvanTesting {
    width: 280px;
    height: 40px;
    float: left;
    margin-left: 10px;
}
.AdvanTesting div {
    width: 160px;
    float: right;
}
.Advan {
    width: 570px;
    float: left;
    margin-left: 10px;
}
.Advan div {
    width: 450px;
    float: right;
}
.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
</style>
<script>
import { ResourceManagement } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            StandingMeasuringCheckArr: [],
            multipleSelection: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0 //总数
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.MeasuringCheckSearchList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 95 + "px";
        },
        // 查询
        MeasuringCheckSearchList() {
            let that = this;
            let url = ResourceManagement.GET_X_selectCheckBasicTools;
            let data = {
                pageNum: that.nowPages,
                pageSize: that.pageSize,
                species: that.auxiliaryProjects,
                toolProduct: that.materialDrawingNum,
                toolNum: that.materialNum
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.StandingMeasuringCheckArr = res.data.records;
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
            this.MeasuringCheckSearchList();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.MeasuringCheckSearchList();
        },
        // 确定
        MeasuringCheckConfirm() {
            if (this.multipleSelection < 1) {
                this.$message({
                    //警示
                    message: "请选择数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                let that = this;
                let url = ResourceManagement.GET_X_updateWorkCheckTime;
                let upadtaArryTime = [];
                that.multipleSelection.map(i => {
                    if(i.planStartTime != undefined || i.planEndTime != undefined){
                         upadtaArryTime.push({
                            checkToolId : i.checkToolId,
                            toolNum : i.toolNum,
                            expirationDate :i.expirationDate,
                            planStartTime:i.planStartTime,
                            planEndTime:i.planEndTime
                        });
                    }
                });
                // 判断送检时是否已填写时间
                if(upadtaArryTime.length != 0){
                    that.axios
                    .post(url, upadtaArryTime)
                    .then(res => {
                        console.log(res, "sdfsdf");
                        if (res.data.code == 0) {
                            that.$message({
                                //成功后的提示
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            that.MeasuringCheckSearchList();
                        } else {
                            that.$message({
                                message: "操作失败",
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
                let url = ResourceManagement.GET_X_RegularInspectionCompleted;
                let RegularInspectionCompletedArr = [];
                that.multipleSelection.map(i => {
                    if(i.checkStatus == 2){
                        RegularInspectionCompletedArr.push({
                            checkToolId : i.checkToolId,
                            toolNum : i.toolNum,
                            expirationDate :i.expirationDate,
                        });
                    }
                });
                if(RegularInspectionCompletedArr.length !=0){
                    that.axios
                    .post(url, RegularInspectionCompletedArr)
                    .then(res => {
                        console.log(res, "sdfsdf");
                        if (res.data.code == 0) {
                            that.$message({
                                //成功后的提示
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            that.MeasuringCheckSearchList();
                        } else {
                            that.$message({
                                message: "操作失败",
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
                        message: "工(量)具未送检",
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
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd")
                : "";
        },
           //返回
        OnReturn(){
            this.$router.go(-1);
        },
    }
};
</script>
