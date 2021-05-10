<template>
    <div>
        <div class="Properties_head">
            <div class="Properties_head_left">
                <div>
                    <el-input v-model="query" size="medium" placeholder="名称、图号"></el-input>
                </div>
            </div>
            <el-button
                @click="OnProcessConfiguration"
                size="medium"
                type="primary"
                class="Properties_bnt"
            >查询</el-button>
        </div>

        <div class="Properties_contnet" :style="TableHeight">
            <div class="Properties_contnet_table">
                <el-table
                    :data="ProcessConfigurationArr"
                    border
                    height="100%"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                    ref="multipleTable"
                    @selection-change="Tick"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="name" label="产品名称"></el-table-column>
                    <el-table-column prop="drawing" label="产品图号"></el-table-column>
                    <el-table-column prop="scope" label="使用范围"></el-table-column>
                    <el-table-column prop="airType" label="机型"></el-table-column>
                    <el-table-column prop="version" label="版本"></el-table-column>
                    <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                    <el-table-column prop="regulation" label="工艺规程"></el-table-column>
                    <el-table-column prop="code" label="代号"></el-table-column>
                    <el-table-column prop="description" label="工艺规程描述"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="Properties_operation">
            <el-button
                @click="OnRouter"
                size="medium"
                type="primary"
                class="Properties_operation_bnt"
            >返回</el-button>
            <el-button
                @click="OnAttributeAdjustment"
                size="medium"
                type="primary"
                class="Properties_operation_bnt"
            >属性调整</el-button>
        </div>
    </div>
</template>

<script>
import { AutomaticScheduling } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            ReceiveQuery: this.$route.query,
            query: "", //查询
            TableHeight: {
                height: ""
            },
            ProcessConfigurationArr: [],
            TickArr: [],
            workFlowId: ""
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化

        this.OnProcessConfiguration();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 120 + "px";
        },
        //工艺配置
        OnProcessConfiguration() {
            this.axios
                .get(AutomaticScheduling.GET_D_ProcessConfiguration, {
                    params: {
                        mesTaskId: this.ReceiveQuery.mesTaskId,
                        sortie: this.ReceiveQuery.Ticksortie,
                        condetion: this.query
                    }
                })
                .then(res => {
                    this.ProcessConfigurationArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //勾选
        Tick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.TickArr = row.pop(); //储存新的单选数据
                if (this.TickArr != undefined) {
                    this.workFlowId = this.TickArr.workFlowId;
                }
            }
        },
        //属性调整
        OnAttributeAdjustment() {
            if (this.TickArr < 1 || this.TickArr == undefined) {
                this.$message({
                    //失败后的提示
                    message: "请选择数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.$router.push({
                    path: "ProcessPropertiesBox",
                    query: {
                        workFlowId: this.workFlowId,
                        mesTaskId: this.ReceiveQuery.mesTaskId,
                        Ticksortie: this.ReceiveQuery.Ticksortie
                    }
                });
            }
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
.container {
    width: 100%;
    height: 100%;
}
.Properties_head {
    height: 60px;
    overflow: hidden;
}
.Properties_head_left {
    width: 170px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Properties_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.Properties_head_left div {
    width: 170px;
    float: left;
}
.Properties_head_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}

.Properties_operation {
    height: 45px;
    margin-top: 10px;
}
.Properties_operation_bnt {
    float: right;
    margin-right: 10px;
}
.Properties_bnt {
    margin-top: 10px;
    margin-left: 10px;
}
.Properties_contnet {
    width: 100%;
}
.Properties_contnet_table {
    padding: 0px 10px;
    height: 100%;
}
</style>
