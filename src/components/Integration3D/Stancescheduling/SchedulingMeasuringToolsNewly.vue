<template>
    <div>
        <div class="SchdMeas_contnet" :style="TableHeight">
            <div class="SchdMeas_contnet_table">
                <el-table
                    :data="QueryArr"
                    border
                    height="100%"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column label="序号"  width="50">
                        <template slot-scope="scope"><span>{{scope.$index+( nowPages - 1) * pageSize + 1}} </span></template>
                    </el-table-column>
                    <el-table-column prop="toolNum" label="计量编号" width="200"></el-table-column>
                    <el-table-column prop="toolName" label="工(量)具名称" width="200"></el-table-column>
                    <el-table-column prop="toolProduct" label="图号" width="200"></el-table-column>
                    <el-table-column prop="toolModel" label="型号" width="150"></el-table-column>
                    <el-table-column prop="toolFormat" label="规格" width="100"></el-table-column>
                    <el-table-column prop="expirationDate" label="有效期至" width="100"></el-table-column>
                    <el-table-column prop="planStartTime" label="计划开始" width="100"></el-table-column>
                    <el-table-column prop="planEndTime" label="计划结束" width="100"></el-table-column>
                    <el-table-column prop="station" label="所属站位" width="150"></el-table-column>
                    <el-table-column prop="operator" label="负责人" width="100"></el-table-column>
                    <el-table-column prop="remarks" label="备注" width="240"></el-table-column>
                    <!-- <el-table-column prop="qualified" label="合格证" width="200"></el-table-column>
                    <el-table-column prop="toolStatus" label="状态" width="60"></el-table-column>
                    <el-table-column label="备注" prop="remarker" :show-overflow-tooltip="true">
                        <template slot-scope="{ row }">
                            <span>{{ row.remarker }}</span>
                        </template>
                    </el-table-column> -->
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
import { BasicData,Dintegrate,StationDispatching } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            TableHeight: {
                height: ""
            },
            QueryName: "",
            QueryArr: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 1, //总数
            optionOne: [], // 种类
            typeTool: ""
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OnQuery();
        // this.getOptionOneInfo();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 178 + "px";
        },
        // 查询种类
        getOptionOneInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_A_tool, {
                    params: {
                        maintainFlag: 10
                    }
                })
                .then(res => {
                    that.optionOne = res.data;
                    this.OnQuery();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查询
        OnQuery() {
            let that = this;
            let url = Dintegrate.GET_A_tool;
            let data = {
                pageSize: that.pageSize,
                pageNum: that.nowPages,
            };
            that.axios
                .post(url, data)
                .then(res => {
                    console.log(res,'rererererere')
                    that.QueryArr = res.data.records;
                    that.total = res.data.total;
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
            this.nowPages = 1;
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
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
.container {
    width: 100%;
    height: 100%;
}

.SchdMeas_contnet {
    width: 100%;
    
}
.SchdMeas_contnet_table {
    padding: 10px;
    height: 100%;
    overflow: auto;
    
}

.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
.el-table--scrollable-x .el-table__body-wrapper{
    overflow: auto !important;
}
</style>
