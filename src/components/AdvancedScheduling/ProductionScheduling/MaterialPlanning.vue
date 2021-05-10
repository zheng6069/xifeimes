<template>
    <div>
        <div class="Detaile_head">
            <div class="Detaile_head_left">
                <div>
                    <el-input v-model="DrawingNo" size="medium" clearable placeholder="名称、编码、图号"></el-input>
                </div>
            </div>
            <el-button
                @click="OnRouter"
                class="SchePlan_contnet_title_bnt"
                size="medium"
                type="primary"
            >返回</el-button>
            <el-button
                size="medium"
                type="primary"
                class="Detaile_Bnt"
                @click="MaterialSearchList"
            >查询</el-button>
        </div>
        <div class="SchePlan_contnet" :style="TableHeight">
            <div class="SchePlan_contnet_table">
                <el-table
                    border
                    :data="QueryArr"
                    height="100%"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="materialCode" label="物料编码"></el-table-column>
                    <el-table-column prop="drawingNo" label="物料图号"></el-table-column>
                    <el-table-column prop="materialName" label="物料名称"></el-table-column>
                    <el-table-column prop="materialModel" label="规格型号"></el-table-column>
                    <el-table-column prop="materialLocation" label="库位"></el-table-column>
                    <el-table-column prop="materialNum" label="库存数量"></el-table-column>
                    <el-table-column prop="materialTime" label="入库时间"></el-table-column>
                    <el-table-column prop="manufacturer" label="生产厂商"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { AutomaticScheduling } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            TableHeight: {
                height: ""
            },
            QueryArr: [],
            DrawingNo: ""
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.MaterialSearchList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 80 + "px";
        },
        MaterialSearchList() {
            this.axios({
                method: "post",
                url: AutomaticScheduling.GET_C_findAllMaterialInfos,
                data: {
                    searchName: this.DrawingNo
                }
            })
                .then(res => {
                    this.QueryArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
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
.Detaile_head {
    height: 60px;
    overflow: hidden;
}
.Detaile_head_left {
    width: 170px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Detaile_head_left p {
    width: 40px;
    float: left;
    line-height: 36px;
}
.Detaile_head_left div {
    width: 170px;
    float: left;
}
.Detaile_Bnt {
    margin-top: 10px;
    margin-left: 10px;
}

.SchePlan_contnet {
    width: 100%;
}

.SchePlan_contnet_title_bnt {
    float: right;
    margin-right: 10px;
    margin-top: 10px;
}
.SchePlan_contnet_table {
    padding: 0px 10px;
    height: 100%;
}
</style>
