<template>
    <div class="StaRec_maximum">
        <div class="StaRec_Haed">
            <div class="StaRec_Haed_Inp">
                <el-input v-model="QueryName" size="medium" placeholder="架次号"></el-input>
            </div>
            <el-button @click="nowPages=1;OnQuery()" class="StaRec_Haed_Btn" size="medium" type="primary">查询</el-button>
        </div>
        <div class="StaRec_contnet" :style="TableHeight">
            <div class="StaRec_contnet_table">
                <el-table
                    :data="QueryArr"
                    ref="multipleTable"
                    border
                    height="100%"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                    <el-table-column prop="moveTime" label="转移时间"></el-table-column>
                    <el-table-column prop="stationName" label="移交站位"></el-table-column>
                    <el-table-column prop="receiveStation" label="接收站位"></el-table-column>
                     <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                          <el-button type="primary" size="mini" @click="OnSee(scope.row)"
                            >查看</el-button
                          >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="StaRec_DetectPaging">
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
import { dispatchingManagement } from "../../../common/api";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            QueryName: "",
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            QueryArr: [],
            DeleteArr: [],
            handoverId:"",
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
            this.TableHeight.height = window.innerHeight - 105 + "px";
        },
        //查询接收信息确认信息
        OnQuery() {
            this.axios({
                method: "post",
                url: dispatchingManagement.GET_K_RecordQuery,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    condetion: this.QueryName //名称
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
        //分页
        OnPaging(val) {
           this.nowPages = val;
            this.OnQuery();
        },
        //切换每页展示多少条数据
        handleSizeChange(val) {
            this.pageSize = val;
            this.OnQuery();
        },
        OnSee(row) {
                this.$router.push({
                    path: "ReceivingStation",
                    query: {
                        handoverId: row.handoverId,
                        HanPage:2,
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
.StaRec_maximum {
    padding: 10px;
}
.StaRec_Haed {
    height: 58px;
    overflow: hidden;
}
.StaRec_Haed_Inp {
    width: 200px;
    float: left;
    margin-right: 10px;
}
.StaRec_contnet {
    width: 100%;
    height: 100%;
}
.StaRec_contnet_table {
    width: 100%;
    height: 100%;
}
.StaRec_DetectPaging {
    height: 30px;
    margin-top: 5px;
}
</style>