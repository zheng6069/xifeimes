<template>
    <div>
        <div class="DeviceInf_head">
            <div class="DeviceInf_head_left" style="width: 170px">
                <div>
                    <el-input v-model="Query" size="medium" placeholder="名称、编号" clearable></el-input>
                </div>
            </div>
            <el-button @click="OnRouter" size="medium" type="primary" class="DeviceInf_bnt">返回</el-button>
            <el-button
                @click="nowPages=1;OnQuery()"
                size="medium"
                type="primary"
                class="DeviceInf_searchBnt"
            >查询</el-button>
        </div>

        <div class="DeviceInf_contnet" :style="TableHeight">
            <div class="DeviceInf_contnet_table">
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
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                    <el-table-column prop="facilityNum" label="设备编号"></el-table-column>
                    <el-table-column prop="facilityType" label="设备类型"></el-table-column>
                    <el-table-column prop="facilityModel" label="设备型号"></el-table-column>
                    <el-table-column prop="useYear" label="使用年限" width="100"></el-table-column>
                    <el-table-column prop="facilityStatus" label="设备状态" width="100"></el-table-column>
                    <el-table-column label="备注" prop="remarks" :show-overflow-tooltip="true">
                        <template slot-scope="{ row }">
                            <span>{{ row.remarks }}</span>
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
            Query: "",
            QueryArr: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0 //总数
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
                url: BasicData.GET_M_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //每页条数
                    condetion: this.Query //
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
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
.container {
    width: 100%;
    height: 100%;
}
.DeviceInf_head {
    height: 60px;
    overflow: hidden;
}
.DeviceInf_head_left {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.DeviceInf_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.DeviceInf_head_left div {
    width: 170px;
    float: left;
}
.DeviceInf_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}
.DeviceInf_searchBnt {
    margin-top: 10px;
    margin-left: 10px;
}
.DeviceInf_contnet {
    width: 100%;
}
.DeviceInf_contnet_table {
    padding: 0px 10px;
    height: 100%;
}
.DeviceInformation {
    overflow: hidden;
}

.DetectPaging {
    height: 40px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>