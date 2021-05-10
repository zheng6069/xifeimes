<template>
    <div class="Book_container">
        <div class="Book_title">
            <div class="Book_head">
                <p>物料名称</p>
                <div>
                    <el-input v-model="materialName" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>

            <div class="Book_head">
                <p>物料图号</p>
                <div>
                    <el-input
                        v-model="materialDrawingNum"
                        size="medium"
                        placeholder="请输入"
                        clearable
                    ></el-input>
                </div>
            </div>

            <div class="Book_head">
                <p>入库时间</p>
                <div>
                    <el-date-picker
                        v-model="startTime"
                        type="date"
                        size="medium"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </div>
            </div>

            <div class="Book_head">
                <p>出库时间</p>
                <div>
                    <el-date-picker
                        v-model="endTime"
                        type="date"
                        size="medium"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </div>
            </div>
            <div class="Book_head">
                <p>领用人</p>
                <div>
                    <el-input v-model="recipient" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <el-button size="medium" type="primary" @click="nowPages=1;getSbSearchList()">查询</el-button>
        </div>
        <div style="clear:both"></div>
        <div class="Book_Title">物料信息</div>
        <div :style="TableHeight">
            <el-table
                border
                :data="StandingBookArr"
                height="100%"
                style="width: 100%;height:100%;"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="serialNumber" label="产品序号"></el-table-column>
                <el-table-column prop="materialCode" label="物料编码"></el-table-column>
                <el-table-column prop="drawNo" label="物料图号"></el-table-column>
                <el-table-column prop="materialName" label="物料名称"></el-table-column>
                <el-table-column prop="specificationModel" label="规格型号" width="180"></el-table-column>
                <el-table-column prop="locationName" label="库位" width="120"></el-table-column>
                <el-table-column prop="productNum" label="入库数量" width="120"></el-table-column>
                <el-table-column prop="productOutNum" label="出库数量" width="120"></el-table-column>
                <el-table-column
                    prop="storageTime"
                    label="入库时间"
                    :formatter="dateFormat"
                    width="120"
                ></el-table-column>
                <el-table-column
                    prop="storageOutTime"
                    label="出库时间"
                    :formatter="dateFormat"
                    width="120"
                ></el-table-column>
                <el-table-column prop="storageOutUser" label="领用人" width="120"></el-table-column>
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
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 150px;
}
.Book_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Book_head {
    width: 220px;
    float: left;
    margin-right: 10px;
}
.Book_head p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.Book_head div {
    width: 150px;
    float: left;
}
.Book_Title {
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    font-size: 14px;
}
.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
</style>
<script>
import { dispatchingManagement } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";

export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            StandingBookArr: [],
            materialName: "", // 物料名称
            materialDrawingNum: "", // 物料图号
            startTime: "", // 入库时间
            endTime: "", // 出库时间
            recipient: "", // 领用人
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0 //总数
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.getSbSearchList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 150 + "px";
        },
        // 查询
        getSbSearchList() {
            let that = this;
            let url = dispatchingManagement.GET_E_getMaterialOutList;
            let data = {
                pageNum: that.nowPages,
                pageSize: that.pageSize,
                materialName: that.materialName,
                drawNo: that.materialDrawingNum,
                storageTime: that.startTime,
                storageOutTime: that.endTime,
                storageOutUser: that.recipient
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.StandingBookArr = res.data.records;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.getSbSearchList();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.getSbSearchList();
        },
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd")
                : "";
        }
    }
};
</script>


