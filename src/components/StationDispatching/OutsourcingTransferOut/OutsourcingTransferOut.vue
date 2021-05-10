<template>
    <div>
        <div class="OuteSo_head">
            <div class="OuteSo_head_left" style="width: 250px">
                <p style="width: 90px">协作指令号</p>
                <div style="width: 160px">
                    <el-input
                        style="width: 160px"
                        v-model="InstructionNumber"
                        size="medium"
                        placeholder="请输入"
                        clearable
                    ></el-input>
                </div>
            </div>
            <div class="OuteSo_head_left" style="width: 260px">
                <p style="width: 100px">协作指令名称</p>
                <div style="width: 160px">
                    <el-input
                        style="width: 160px"
                        v-model="InstructionName"
                        size="medium"
                        placeholder="请输入"
                        clearable
                    ></el-input>
                </div>
            </div>
            <div class="OuteSo_head_left">
                <p>架次号</p>
                <div>
                    <el-input v-model="SortieNumber" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="OuteSo_head_left" style="width: 240px">
                <p style="width: 70px">协作单位</p>
                <div>
                    <el-input v-model="CooperationUnit" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>

            <el-button
                @click="nowPages=1;OnQuery()"
                size="medium"
                type="primary"
                class="OuteSo_head_bnt"
            >查询</el-button>
        </div>
        <div class="OuteSo_contnet" :style="TableHeight">
            <div class="OuteSo_contnet_table">
                <el-table
                    ref="multipleTable"
                    border
                    :data="QueryArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="workNo" label="工单号" width="180"></el-table-column>
                    <el-table-column prop="product" label="产品图号"></el-table-column>
                    <el-table-column prop="sortieNo" label="架次号" width="150"></el-table-column>
                    <el-table-column prop="aoNo" label="AO编号" width="180"></el-table-column>
                    <el-table-column prop="stationName" label="站位号" width="100"></el-table-column>
                    <el-table-column prop="instructNum" label="协作指令号" width="250"></el-table-column>
                    <el-table-column prop="instructName" label="协作指令名称" width="180"></el-table-column>
                    <el-table-column prop="outUnit" label="协作单位" width="160"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="OnTransferOutConfirmation(scope.row)"
                            >转出</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="handleSizeChange"
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
import { dispatchingManagement } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            InstructionNumber: "", //协作指令号
            InstructionName: "", //协作指令名称
            SortieNumber: "", //架次号
            CooperationUnit: "", //协作单位
            QueryArr: [], //检测项table数据

            TableHeight: {
                height: ""
            },
            DeleteArr: [],
            outId: "",
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
            this.TableHeight.height = window.innerHeight - 120 + "px";
        },
        //查询
        OnQuery() {
            this.axios({
                method: "post",
                url: dispatchingManagement.GET_L_Queryt,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    instructNum: this.InstructionNumber, //协作指令号
                    instructName: this.InstructionName, //协作指令名称
                    sortieNo: this.SortieNumber, //架次号
                    outUnit: this.CooperationUnit, //协作单位
                    outStatus: 1 //转出
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
        // 转出确认
        OnTransferOutConfirmation(row) {
            this.axios
                .get(dispatchingManagement.GET_L_TransferOutConfirmation, {
                    params: {
                        outId: row.outId
                    }
                })
                .then(res => {
                    if (res.data.success === true) {
                        this.$message({
                            //成功后的提示
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        this.OnQuery();
                    } else {
                        this.$message({
                            //失败后的提示
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
    }
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.OuteSo_head {
    height: 60px;
    overflow: hidden;
}
.OuteSo_head_left {
    width: 230px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.OuteSo_head_left p {
    width: 60px;
    float: left;
    line-height: 36px;
}
.OuteSo_head_left div {
    width: 170px;
    float: left;
}
.OuteSo_head_bnt {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}
.rollOutBtn {
    margin-left: 10px;
}
.OuteSo_contnet {
    width: 100%;
}
.OuteSo_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.DetectPaging {
    height: 45px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
