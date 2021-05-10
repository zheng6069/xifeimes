<template>
    <div class="container">
        <div class="MvSearch">
            <el-form :inline="true" :model="MvSearchform" class="demo-form-inline" size="medium">
                <el-form-item label="设备名称" class="item">
                    <el-input v-model="MvSearchform.name" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="设备编号" class="item">
                    <el-input v-model="MvSearchform.number" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="维保类型" class="item">
                    <el-select v-model="MvSearchform.type" placeholder="请选择" clearable>
                        <el-option label="日保" value="日保"></el-option>
                        <el-option label="周保" value="周保"></el-option>
                        <el-option label="月保" value="月保"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="
              nowPages = 1;
              MvSearchSubmit();
            "
                    >查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="Mv_contnet" :style="TableHeight">
            <div class="Mv_contnet_table">
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
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="facilityMainId" label="设备维保单号"></el-table-column>
                    <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                    <el-table-column prop="facilityNum" label="设备编号"></el-table-column>
                    <el-table-column prop="facilityModel" label="设备类型"></el-table-column>
                    <el-table-column prop="station" label="设备位置"></el-table-column>
                    <el-table-column prop="mainType" label="维保类型" width="120"></el-table-column>
                    <el-table-column prop="endTime" label="维保时间" width="120"></el-table-column>
                    <el-table-column prop="person" label="保养人"></el-table-column>
                    <el-table-column label="操作" width="105">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="MvLook(scope.$index, scope.row)"
                            >查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="Mv_DetectPaging">
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
import { ResourceManagement } from "../../../common/api";
export default {
    data() {
        return {
            MvSearchform: {
                name: "", //设备名称
                number: "", //设备编号
                type: "" //维保类型
            },
            TableHeight: {
                height: ""
            },
            QueryArr: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0 //总数
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.MvSearchSubmit();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 130 + "px";
        },
        // 查询
        MvSearchSubmit() {
            this.axios({
                method: "post",
                url: ResourceManagement.GET_F_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    facilityName: this.MvSearchform.name, //设备名称
                    facilityNum: this.MvSearchform.number, //设备编号
                    mainType: this.MvSearchform.type //维保类型
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
        //切换每页展示多少条数据
        handleSizeChange(val) {
            this.pageSize = val;
            this.MvSearchSubmit();
        },
        //分页
        OnPaging(val) {
            this.nowPages = val;
            this.MvSearchSubmit();
        },
        // 查看
        MvLook(index, row) {
            this.$router.push({
                path: "MaintenanceViewInfo",
                query: {
                    mainId: row.mainId,
                    resourcesId: row.resourcesId,
                    facilityName: row.facilityName,
                    facilityNum: row.facilityNum,
                    mainType: row.mainType
                }
            });
        }
    }
};
</script>

<style>
.MvSearch .el-input {
    width: 150px;
}
.MvSearch .item .el-form-item__label {
    font-size: 16px;
    color: #000000;
}
.Mv_contnet {
    width: 100%;
}

.MvContent_title {
    height: 30px;
    overflow: hidden;
}
.MvContent_title .Mv_title {
    float: left;
    font-size: 12px;
    line-height: 30px;
}
.MvContent_title .Mv_info {
    float: right;
    font-size: 12px;
}
.Mv_contnet_table {
    height: 100%;
}
.Mv_DetectPaging {
    height: 50px;
    margin-top: 5px;
}
</style>