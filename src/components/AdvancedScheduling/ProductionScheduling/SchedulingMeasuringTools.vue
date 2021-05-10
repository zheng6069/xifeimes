<template>
    <div>
        <div class="SchdMeas_head">
            <div class="SchdMeas_head_left" style="width:170px;">
                <div>
                    <el-input v-model="QueryName" size="medium" placeholder="名称、图号" clearable></el-input>
                </div>
            </div>
            <div class="SchdMeas_head_left" style="width:170px;">
                <div>
                    <el-select size="medium" v-model="typeTool" placeholder="请选择">
                        <el-option
                            v-for="item in optionOne"
                            :key="item.maintainId"
                            :label="item.maintainStatus"
                            :value="item.maintainStatus"
                        ></el-option>
                    </el-select>
                </div>
            </div>
            <el-button @click="OnRouter" size="medium" type="primary" class="SchdMeas_bnt">返回</el-button>
            <el-button
                size="medium"
                type="primary"
                class="SchdMeas_Bnt"
                @click="nowPages=1;OnQuery()"
            >查询</el-button>
        </div>

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
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="species" label="种类" width="200"></el-table-column>
                    <el-table-column prop="toolName" label="名称" width="200"></el-table-column>
                    <el-table-column prop="toolProduct" label="图号" width="200"></el-table-column>
                    <el-table-column prop="toolModel" label="型号" width="200"></el-table-column>
                    <el-table-column prop="toolFormat" label="规格" width="200"></el-table-column>
                    <el-table-column prop="price" label="单价" width="60"></el-table-column>
                    <el-table-column prop="toolNum" label="计量编号" width="100"></el-table-column>
                    <el-table-column prop="qty" label="数量" width="60"></el-table-column>
                    <el-table-column prop="shelf" label="货架号" width="120"></el-table-column>
                    <el-table-column prop="layer" label="层号" width="100"></el-table-column>
                    <el-table-column prop="position" label="位置号" width="200"></el-table-column>
                    <el-table-column prop="inspectionDate" label="定检日期" width="200"></el-table-column>
                    <el-table-column prop="inspectionYear" label="定检周期" width="100"></el-table-column>
                    <el-table-column prop="manufacturer" label="生产厂商" width="200"></el-table-column>
                    <el-table-column prop="qualified" label="合格证" width="200"></el-table-column>
                    <el-table-column prop="toolStatus" label="状态" width="60"></el-table-column>
                    <el-table-column label="备注" prop="remarker" :show-overflow-tooltip="true">
                        <template slot-scope="{ row }">
                            <span>{{ row.remarker }}</span>
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
        this.getOptionOneInfo();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 120 + "px";
        },
        // 查询种类
        getOptionOneInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 10
                    }
                })
                .then(res => {
                    that.optionOne = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查询
        OnQuery() {
            this.axios({
                method: "post",
                url: BasicData.GET_B_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    condetion: this.QueryName, //名称
                    species: this.typeTool // 下拉框
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
.SchdMeas_head {
    height: 60px;
    overflow: hidden;
}
.SchdMeas_head_left {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.SchdMeas_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.SchdMeas_head_left div {
    width: 170px;
    float: left;
}
.SchdMeas_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}
.SchdMeas_Bnt {
    margin-top: 10px;
    margin-left: 10px;
}
.SchdMeas_contnet {
    width: 100%;
}
.SchdMeas_contnet_table {
    padding: 0px 10px;
    height: 100%;
}
.SchdMeasormation {
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
    margin-top: 5px;
}
</style>
