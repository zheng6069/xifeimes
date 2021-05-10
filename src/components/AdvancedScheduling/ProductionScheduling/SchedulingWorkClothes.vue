<template>
    <div>
        <div class="SchdInf_head">
            <div class="SchdInf_head_left" style="width: 170px">
                <div>
                    <el-input v-model="Query" size="medium" placeholder="名称、图号" clearable></el-input>
                </div>
            </div>
            <el-button @click="OnRouter" size="medium" type="primary" class="SchdInf_bnt">返回</el-button>
            <el-button
                @click="nowPages=1;OnQuery()"
                size="medium"
                type="primary"
                class="SchdInf_Bnt"
            >查询</el-button>
        </div>

        <div class="SchdInf_contnet" :style="TableHeight">
            <div class="SchdInf_contnet_table">
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
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="product" label="图号"></el-table-column>
                    <el-table-column prop="number" label="编号"></el-table-column>
                    <el-table-column prop="project" label="项目"></el-table-column>
                    <el-table-column prop="species" label="种类"></el-table-column>
                    <el-table-column prop="status" label="状态" width="80"></el-table-column>
                    <el-table-column prop="expirationDate" label="有效期至" width="100"></el-table-column>
                    <el-table-column prop="expirationCount" label="有效使用次数" width="110"></el-table-column>
                    <el-table-column prop="useCount" label="已使用次数" width="100"></el-table-column>
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
import { BasicData } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            Query: "",
            TableHeight: {
                height: ""
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            QueryArr: []
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
                url: BasicData.GET_N_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //每页条数
                    condetion: this.Query //
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
.container {
    width: 100%;
    height: 100%;
}
.SchdInf_head {
    height: 60px;
    overflow: hidden;
}
.SchdInf_head_left {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.SchdInf_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.SchdInf_head_left div {
    width: 170px;
    float: left;
}
.SchdInf_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}
.SchdInf_Bnt {
    margin-top: 10px;
    margin-left: 10px;
}
.SchdInf_contnet {
    width: 100%;
}
.SchdInf_contnet_table {
    padding: 0px 10px;
    height: 100%;
}
.SchdInformation {
    overflow: hidden;
}
.dialog_footer {
    height: 30px;
    margin-top: 10px;
}
.dialog_Preservation {
    float: right;
    margin-right: 10px;
}
.dialog_Close {
    float: right;
}
.DetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>