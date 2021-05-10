<template>
    <div>
        <div class="Materia_head">
            <div class="Materia_head_left">
                <p>订单号</p>
                <div>
                    <el-input v-model="TaskNumber" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="Materia_head_left">
                <p>图号</p>
                <div>
                    <el-input v-model="DrawingNo" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>

            <div class="Materia_head_left">
                <p>名称</p>
                <div>
                    <el-input v-model="Name" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="Materia_head_left">
                <p>开始时间</p>
                <div>
                    <el-date-picker
                        size="medium"
                        type="date"
                        style="width: 100%"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        v-model="StartTime"
                    ></el-date-picker>
                </div>
            </div>
            <el-button
                size="medium"
                type="primary"
                class="MateriaOperation_bnt"
                @click="
          nowPages = 1;
          OnQuery();
        "
            >查询</el-button>
        </div>
        <div class="Materia_contnet" :style="TableHeight">
            <div class="Materia_contnet_table">
                <el-table
                    border
                    :data="QueryArr"
                    ref="multipleTable"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="orderNo" label="订单号"></el-table-column>
                    <el-table-column prop="product" label="产品图号"></el-table-column>
                    <el-table-column prop="productName" label="产品名称"></el-table-column>
                    <el-table-column prop="customer" label="客户"></el-table-column>
                    <el-table-column prop="planQty" label="计划数量"></el-table-column>
                    <el-table-column prop="sortie" label="架次"></el-table-column>
                    <el-table-column prop="startDate" label="计划开始时间"></el-table-column>
                    <el-table-column prop="endDate" label="计划结束时间"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="OnMissingPartsCheck(scope.row)"
                            >缺件查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="OnPagingNumbe"
                :page-size="pageSize"
                @current-change="OnPaging"
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
            TaskNumber: "", //任务号
            DrawingNo: "", //图号
            Name: "", //名称
            StartTime: "", //开始时间
            QueryArr: [], //储存查询到的数据
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数

            TableHeight: {
                height: ""
            },
            TickArr: [], //储存新的勾选数据
            mesTaskId: "", //储蓄勾选到的id
            TaskDrawingNo: "", //储存勾选到的图号
            TasSorties: "" //储存勾选到的架次
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
            this.TableHeight.height = window.innerHeight - 110 + "px";
        },
        //查询
        OnQuery() {
            this.axios({
                method: "post",
                url: AutomaticScheduling.GET_A_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //每页多少条
                    orderNo: this.TaskNumber, //任务号
                    product: this.DrawingNo, //图号
                    productName: this.Name, //名称
                    startDate: this.StartTime //开始时间
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
        //分页功能
        OnPaging(val) {
            this.nowPages = val;
            this.OnQuery();
        },
        //选择每页展示多少条
        OnPagingNumbe(val) {
            this.pageSize = val;
            this.OnQuery();
        },
        //缺件查看
        OnMissingPartsCheck(row) {
            console.log(row, "sdfsdf");
            this.$router.push({
                path: "ShortItem",
                query: {
                    mesTaskId: row.mesTaskId,
                    TaskDrawingNo: row.product,
                    TasSorties: row.sortie
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
    width: 100%;
    height: 100%;
}
.Materia_head {
    margin-bottom: 18px;
}
.Materia_head_left {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Materia_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.Materia_head_left div {
    width: 170px;
    float: left;
}
.Materia_head_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}

.Materia_operation_nei {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.MateriaOperationNei {
    margin-left: 10px;
    float: left;
}
.MateriaOperationNei p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.MateriaOperationNei div {
    width: 170px;
    float: left;
}
.MateriaOperation_bnt {
    margin-top: 10px;
    margin-left: 10px;
}
.Materia_contnet {
    width: 100%;
}
.Materia_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.DetectPaging {
    padding: 0px 10px;
    margin-top: 5px;
}
</style>