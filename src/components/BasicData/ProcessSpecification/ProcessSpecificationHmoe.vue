<template>
    <div>
        <div class="Advan_head">
            <div class="Advan_head_left" style="width:280px;">
                <p style="width:110px;">工艺规程名称</p>
                <div>
                    <el-input v-model="ProcessSpecificationName" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="Advan_head_left" style="width:280px;">
                <p style="width:110px;">工艺规程编号</p>
                <div>
                    <el-input v-model="ProcessSpecificationCode" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="Advan_head_left">
                <p>图号</p>
                <div>
                    <el-input v-model="DrawingNo" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <el-button size="medium" type="primary" class="Advan_head_Bnt" @click="nowPages=1;QueryFunction()">查询</el-button>
        </div>
        <div class="Advan_contnet" :style="TableHeight">
            <div class="Advan_contnet_table">
                <el-table
                    ref="multipleTable"
                    border
                    :data="tableData"
                    height="100%"
                    style="width: 100%;height:100%; "
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="regulation" label="工艺规程名称" width="180"></el-table-column>
                    <el-table-column prop="code" label="工艺规程编号" width="120"></el-table-column>
                    <el-table-column prop="version" label="版本" width="70"></el-table-column>
                    <el-table-column prop="name" label="产品名称" width="120"></el-table-column>
                    <el-table-column prop="drawing" label="产品图号" width="100"></el-table-column>
                    <el-table-column prop="createByName" label="创建人" width="80"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
                    <el-table-column prop="description" label="工艺规程描述"></el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                          <el-button type="primary" size="mini" @click="RouteJump(scope.row)"
                            >查看</el-button
                          >
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
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Advan_head {
    height: 60px;
    overflow: hidden;
}
.Advan_head_left {
    width: 230px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Advan_head_left p {
    width: 60px;
    float: left;
    line-height: 36px;
}
.Advan_head_left div {
    width: 170px;
    float: left;
}
.Advan_head_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}
.Advan_head_Bnt{
    margin-top: 10px;
    margin-left: 10px;
}
.look_bnt{
    margin-left: 10px;
}
.Advan_contnet {
    width: 100%;
}
.Advan_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.DetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
<script>
import { ProcessSpecification } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            ProcessSpecificationName: "", //工艺规程名称
            ProcessSpecificationCode: "", //工艺规程编码
            DrawingNo: "", //图号
            tableData: [], //检测项table数据
            TableHeight: {
                height: ""
            },
            TickArr: [],
            TickID: "",
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0//总数
        };
    },
    created() {
        this.QueryTask();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 120 + "px";
        },
        //默认查询生产全部任务
        QueryTask() {
            this.axios
                .get(
                    ProcessSpecification.ProcessList +
                        "?pageNum=" +
                        this.nowPages +
                        "&pageSize=" +
                        this.pageSize
                )
                .then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查询功能
        QueryFunction() {
            this.axios
                .get(
                    ProcessSpecification.ProcessList +
                        "?pageNum=" +
                        this.nowPages +
                        "&pageSize=" +
                        this.pageSize +
                        "&regulation=" +
                        this.ProcessSpecificationName +
                        "&code=" +
                        this.ProcessSpecificationCode +
                        "&drawing=" +
                        this.DrawingNo
                )
                .then(res => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //分页功能
        OnPaging(val) {
            this.nowPages = val;
            this.QueryTask();
        },
        //选择每页展示多少条
        handleSizeChange(val) {
            this.pageSize = val;
            this.QueryTask();
        },
        //跳转界面
        RouteJump(row) {
                this.$router.push({
                    path: "ProcessSpecification",
                    query: {
                        workFlowId: row.workFlowId
                    }
                });
        }
    }
};
</script>