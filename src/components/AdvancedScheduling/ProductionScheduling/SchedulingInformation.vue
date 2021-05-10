<template>
    <div>
        <div class="Planning_contnet" :style="TableHeight">
            <div class="Planning_contnet_title">
                <div class="Planning_contnet_title_div">
                    <el-input v-model="Query" clearable size="medium" placeholder="名称、图号"></el-input>
                </div>
                <el-button
                    @click="OnRouter"
                    class="Planning_contnet_title_bnt"
                    size="medium"
                    type="primary"
                >返回</el-button>
                <el-button
                    @click="nowPages=1;OnQuery()"
                    class="Planning_contnet_title_searchBnt"
                    size="medium"
                    type="primary"
                >查询</el-button>
            </div>
            <div class="Planning_contnet_table">
                <el-table
                    :data="QueryArr"
                    border
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="materialsNum" label="物料编码"></el-table-column>
                    <el-table-column prop="product" label="物料图号"></el-table-column>
                    <el-table-column prop="materialsName" label="物料名称"></el-table-column>
                    <el-table-column prop="format" label="规格型号"></el-table-column>
                    <el-table-column prop="qty" label="采购数量"></el-table-column>
                    <el-table-column prop="manufacturer" label="生产厂商"></el-table-column>
                </el-table>
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
    </div>
</template>

<script>
import { BasicData } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            Query: "",
            QueryArr: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            TableHeight: {
                height: ""
            }
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
            this.TableHeight.height = window.innerHeight - 10 + "px";
        },
        OnQuery() {
            this.axios({
                method: "post",
                url: BasicData.GET_L_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //每页条数
                    condetion: this.Query //xbom号
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
        //分页功能
        OnPaging(val) {
            this.nowPages = val;
            this.OnQuery();
        },
        //选择每页展示多少条
        handleSizeChange(val) {
            this.pageSize = val;
            this.OnQuery();
        },
        //返回
        OnRouter() {
            this.$router.go(-1);
        }
    }
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}

.Planning_contnet {
    width: 100%;
}
.Planning_contnet_title {
    height: 56px;
    overflow: hidden;
}
.Planning_contnet_title_div {
    width: 200px;
    height: 36px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Planning_contnet_title_bnt {
    float: right;
    margin-right: 10px;
    margin-top: 10px;
}
.Planning_contnet_title_searchBnt {
    margin-left: 10px;
    margin-top: 10px;
}
.Planning_contnet_table {
    padding: 0px 10px;
    height: 100%;
    height: -moz-calc(100% - 100px); /* WebKit */
    height: -webkit-calc(100% - 100px); /* Opera */
    height: -o-calc(100% - 100px); /* Standard */
    height: calc(100% - 100px);
}
.DetectPaging {
    height: 40px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
