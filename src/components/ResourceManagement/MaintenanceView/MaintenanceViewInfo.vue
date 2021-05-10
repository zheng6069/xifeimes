<template>
    <div class="container">
        <div class="MviSearch">
            <el-form :inline="true" :model="MviSearchform" class="demo-form-inline" size="medium">
                <el-form-item label="设备名称" class="item">
                    <el-input :disabled="true" v-model="MviSearchform.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="设备编号" class="item">
                    <el-input :disabled="true" v-model="MviSearchform.number" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="维保类型" class="item">
                    <el-select :disabled="true" v-model="MviSearchform.type" placeholder="请选择">
                        <el-option label="日保" value="日保"></el-option>
                        <el-option label="周保" value="周保"></el-option>
                        <el-option label="月保" value="月保"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="Mvi_contnet" :style="TableHeight">
            <div class="MviContent_title">
                <div class="Mvi_title">维保信息</div>
                <div class="Mvi_info">
                    <el-button size="mini" type="primary" class="operation_bnt" @click="OnReturn">返回</el-button>
                </div>
            </div>
            <div class="Mvi_contnet_table">
                <el-table
                    border
                    :data="MviTableData"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="checkParts" label="检查部位"></el-table-column>
                    <el-table-column prop="checkContent" label="检查内容"></el-table-column>
                    <el-table-column prop="checkMethod" label="检查方法"></el-table-column>
                    <el-table-column prop="checkNormal" label="检查标准"></el-table-column>
                    <el-table-column prop="checkResult" label="维保结果"></el-table-column>
                    <el-table-column prop="remarks" label="备注"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { ResourceManagement } from "../../../common/api";
export default {
    data() {
        return {
            mainId: this.$route.query.mainId,
            resourcesId: this.$route.query.resourcesId,
            MviSearchform: {
                name: this.$route.query.facilityName, //设备名称
                number: this.$route.query.facilityNum, //设备编号
                type: this.$route.query.mainType //维保类型
            },
            TableHeight: {
                height: ""
            },
            MviTableData: []
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OnSee();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 80 + "px";
        },
        OnSee() {
            this.axios
                .get(ResourceManagement.GET_F_See, {
                    params: {
                        mainId: this.mainId,
                        resourcesId: this.resourcesId
                    }
                })
                .then(res => {
                    this.MviTableData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 返回
        OnReturn() {
            this.$router.push({
                path: "MaintenanceView"
            });
        }
    }
};
</script>

<style>
.MviSearch .el-input {
    width: 150px;
}
.MviSearch .item .el-form-item__label {
    font-size: 16px;
    color: #000000;
}
.Mvi_contnet {
    width: 100%;
}

.MviContent_title {
    height: 30px;
    overflow: hidden;
}
.MviContent_title .Mvi_title {
    float: left;
    font-size: 12px;
    line-height: 30px;
}
.MviContent_title .Mvi_info {
    float: right;
    font-size: 12px;
}
.Mvi_contnet_table {
    /* padding: 0px 10px; */
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
</style>