<template>
    <div class="Storage_container">
        <div class="Storage_title">
            <div class="Storage_head">
                <p>种类</p>
                <div>
                    <el-select
                        size="medium"
                        v-model="auxiliaryProjects"
                        placeholder="请选择"
                        clearable
                    >
                        <el-option
                            v-for="item in optionOne"
                            :key="item.maintainId"
                            :label="item.maintainStatus"
                            :value="item.maintainStatus"
                        ></el-option>
                    </el-select>
                </div>
            </div>
            <div class="Storage_head">
                <p>图号</p>
                <div>
                    <el-input
                        v-model="materialDrawingNum"
                        size="medium"
                        placeholder="请输入"
                        clearable
                    ></el-input>
                </div>
            </div>
            <div class="Storage_head">
                <p>编号</p>
                <div>
                    <el-input v-model="materialNum" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <el-button size="medium" type="primary" @click="nowPages=1;storageSearchList()">查询</el-button>
        </div>
        <div class="Storage_Title">工（量）具台账</div>
        <div :style="TableHeight">
            <el-table
                border
                ref="multipleTable"
                :data="StandingStorageArr"
                height="100%"
                style="width: 100%; height: 100%"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="toolName" label="工（量）具名称"></el-table-column>
                <el-table-column prop="toolProduct" label="图号"></el-table-column>
                <el-table-column prop="toolNum" label="编号"></el-table-column>
                <el-table-column prop="species" label="种类"></el-table-column>
                <el-table-column prop="toolFormat" label="规格"></el-table-column>
                <el-table-column prop="expirationDate" label="有效期至"></el-table-column>
                <el-table-column prop="operator" label="负责人"></el-table-column>
                <el-table-column prop="station" label="所属站位"></el-table-column>
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
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.el-form-item__label {
    width: 120px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 150px;
}
.Storage_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Storage_title {
    height: 50px;
}

.Storage_head {
    width: 220px;
    float: left;
    margin-right: 10px;
}
.Storage_head p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.Storage_head div {
    width: 150px;
    float: left;
}
.Storage_Title {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
}
.Out_bnt {
    float: right;
}
.AdvanElasticFrame_top {
    overflow: hidden;
}

.AdvanTesting {
    width: 280px;
    height: 40px;
    float: left;
    margin-left: 10px;
}
.AdvanTesting div {
    width: 160px;
    float: right;
}
.Advan {
    width: 570px;
    float: left;
    margin-left: 10px;
}
.Advan div {
    width: 450px;
    float: right;
}
.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
</style>
<script>
import { ResourceManagement, BasicData } from "../../../common/api";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            StandingStorageArr: [],
            multipleSelection: [],
            auxiliaryProjects: "", // 种类
            materialNum: "", // 编号
            materialDrawingNum: "", // 图号
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            optionOne: [] // 工量具种类
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.storageSearchList();
        this.getOptionOneInfo();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 145 + "px";
        },
        // 查询工装种类
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
        // 查询
        storageSearchList() {
            let that = this;
            let url = ResourceManagement.GET_Y_findAllData;
            let data = {
                page: that.nowPages,
                limit: that.pageSize,
                species: that.auxiliaryProjects,
                toolProduct: that.materialDrawingNum,
                toolNum: that.materialNum
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.StandingStorageArr = res.data.list;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.storageSearchList();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.storageSearchList();
        }
    }
};
</script>
