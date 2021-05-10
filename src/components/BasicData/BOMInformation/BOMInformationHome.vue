<template>
    <div>
        <div class="Equipment_head">
            <div class="Equipment_head_left">
                <p>名称</p>
                <div>
                    <el-input v-model="QueryName" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <el-button
                @click="nowPages=1;OnQuery()"
                size="medium"
                type="primary"
                class="Equipment_head_bnt"
            >查询</el-button>
        </div>
        <div class="Equipment_contnet" :style="TableHeight">
            <div class="Equipment_contnet_table">
                <el-table
                    border
                    :data="QueryArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column prop="bomName" label="产品名称"></el-table-column>
                    <el-table-column prop="bomProduct" label="产品图号"></el-table-column>
                    <el-table-column prop="bomVersion" label="版本" width="100"></el-table-column>
                    <el-table-column prop="bomQty" label="数量" width="100"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="OnSee(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="DetectPaging">
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
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Equipment_head {
    height: 60px;
    overflow: hidden;
}
.Equipment_head_left {
    width: 230px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Equipment_head_left p {
    width: 60px;
    float: left;
    line-height: 36px;
}
.Equipment_head_left div {
    width: 170px;
    float: left;
}
.Equipment_head_bnt {
    margin-top: 10px;
    margin-left: 10px;
}
.Equipment_contnet {
    width: 100%;
}
.Equipment_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.DetectPaging {
    /* width: 100%; */
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
<script>
import { BasicData } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            QueryArr: [], //检测项table数据
            QueryName: "",
            TableHeight: {
                height: ""
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0 //总数
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
            this.TableHeight.height = window.innerHeight - 120 + "px";
        },
        //查询
        OnQuery() {
            this.axios({
                method: "post",
                url: BasicData.GET_E_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    condetion: this.QueryName //名称
                }
            })
                .then(res => {
                    this.QueryArr = res.data.list;
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
        //查看
        OnSee(row) {
            this.$router.push({
                path: "BOMInformation",
                query: {
                    BOMinformaID: row.bid
                }
            });
        }
    }
};
</script>