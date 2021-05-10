<template>
    <div class="container">
        <div class="TpSearch">
            <el-form :inline="true" :model="TpSearchform" class="demo-form-inline" size="medium">
                <el-form-item label="种类" class="item">
                    <el-select v-model="TpSearchform.kind" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in optionOne"
                            :key="item.maintainId"
                            :label="item.maintainStatus"
                            :value="item.maintainStatus"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" class="item">
                    <el-input v-model="TpSearchform.name" clearable placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="编号" class="item">
                    <el-input v-model="TpSearchform.serialNumber" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="库位" class="item">
                    <el-select v-model="TpSearchform.storage" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in optionTwo"
                            :key="item.locationId"
                            :label="item.locationName"
                            :value="item.locationName"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="
              nowPages = 1;
              TpSearchSubmit();
            "
                    >查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="Tp_contnet" :style="TableHeight">
            <div class="TpContent_title">
                <div class="Tp_title">工装台账信息</div>
            </div>
            <div class="Tp_contnet_table">
                <el-table
                    border
                    :data="TpTableData"
                    height="100%"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="dataNumber" label="编号"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="species" label="种类"></el-table-column>
                    <el-table-column prop="position" label="位置"></el-table-column>
                    <el-table-column prop="project" label="项目"></el-table-column>
                    <el-table-column prop="expirationDate" label="有效期至"></el-table-column>
                    <el-table-column prop="station" label="负责人"></el-table-column>
                </el-table>
            </div>
            <div class="DetectPaging">
                <el-pagination
                    background
                    @size-change="sizeChange"
                    @current-change="currentChange"
                    :page-size="pageSize"
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
import { ResourceManagement, BasicData } from "../../../common/api";
export default {
    data() {
        return {
            TpSearchform: {
                kind: "", //种类
                name: "", //名称
                serialNumber: "", //编号
                storage: "" //库位
            },
            TableHeight: {
                height: ""
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            TpTableData: [],
            optionOne: [], // 工装种类
            optionTwo: [] // 库位
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.TpSearchSubmit();
        this.getOptionOneInfo();
        this.getOptionTwoInfo();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 120 + "px";
        },
        // 查询工装种类
        getOptionOneInfo() {
            let _that = this;
            _that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 5
                    }
                })
                .then(res => {
                    _that.optionOne = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询库位
        getOptionTwoInfo() {
            let that = this;
            that.axios
                .post(BasicData.GET_Z_selectAllLocation)
                .then(res => {
                    that.optionTwo = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询
        TpSearchSubmit() {
            let that = this;
            let url = ResourceManagement.GET_U_selectWorkInfoList;
            let data = {
                pageSize: that.pageSize,
                pageNum: that.nowPages,
                species: that.TpSearchform.kind,
                name: that.TpSearchform.name,
                dataNumber: that.TpSearchform.serialNumber,
                position: that.TpSearchform.storage
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.TpTableData = res.data.records;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        sizeChange(val) {
            this.pageSize = val;
            this.TpSearchSubmit();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.TpSearchSubmit();
        }
    }
};
</script>

<style>
.TpSearch .el-input {
    width: 150px;
}
.TpSearch .item .el-form-item__label {
    font-size: 16px;
    color: #000000;
}
.Tp_contnet {
    width: 100%;
}

.TpContent_title {
    height: 30px;
    overflow: hidden;
}
.TpContent_title .Tp_title {
    float: left;
    font-size: 12px;
    line-height: 30px;
}
.TpContent_title .Tp_info {
    float: right;
    font-size: 12px;
    margin-right: 10px;
}
.Tp_contnet_table {
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
</style>
