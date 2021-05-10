<template>
    <div>
        <div class="Equipment_head">
            <el-form :inline="true" class="demo-form-inline" size="medium">
                <el-form-item label>
                    <el-input v-model="QueryName" placeholder="名称、编码" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="
              nowPages = 1;
              OnQuery();
            "
                    >查询</el-button>
                </el-form-item>
            </el-form>
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
                    <el-table-column prop="toolName" label="工具名称"></el-table-column>
                    <el-table-column prop="toolNo" label="工具编号"></el-table-column>
                    <el-table-column prop="toolSerial" label="工具型号"></el-table-column>
                    <el-table-column prop="specifications" label="规格"></el-table-column>
                    <el-table-column prop="location" label="库位"></el-table-column>
                    <el-table-column prop="num" label="数量" width="100"></el-table-column>
                    <el-table-column prop="manufacturer" label="生产厂家"></el-table-column>
                    <el-table-column prop="storageUser" label="借用人"></el-table-column>
                </el-table>
            </div>
        </div>
        <!-- <div class="DetectPaging">
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
        </div>-->
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Equipment_head {
    height: 50px;
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
import { Integration } from "../../../common/api";
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
            // this.TableHeight.height = window.innerHeight - 120 + "px";
            this.TableHeight.height = window.innerHeight - 70 + "px";
        },
        //查询
        OnQuery() {
            this.axios({
                method: "post",
                url: Integration.GET_A_selectAll,
                data: {
                    // pageNum: this.nowPages, //当前页
                    // pageSize: this.pageSize, //第几页
                    searchName: this.QueryName //名称
                }
            })
                .then(res => {
                    this.QueryArr = res.data;
                    // this.total = res.data.total;
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
        }
    }
};
</script>
