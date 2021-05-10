<template>
    <div class="BomMaximum" :style="TableHeight">
        <div class="ProductDrawingNo">
            <p class="ProductDrawingNo_p">产品图号</p>
            <div class="ProductDrawingNo_tree">
                <el-tree
                    style="height:100%;"
                    :data="data"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                ></el-tree>
            </div>
        </div>
        <div class="MaterialInformation">
            <p class="MaterialInformation_p">
                物料信息
                <el-button @click="OnReturn" size="mini" type="primary" style="float: right;">返回</el-button>
            </p>
            <div class="MaterialInformation_table">
                <el-table
                    border
                    :data="ClickArr"
                    height="100%"
                    style="width: 100%;height:100%; "
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="assemProduct" label="图号" width="120"></el-table-column>
                    <el-table-column prop="assemName" label="名称"></el-table-column>
                    <el-table-column prop="amount" label="数量" width="100"></el-table-column>
                    <el-table-column prop="version" label="版本" width="100"></el-table-column>
                    <el-table-column prop="certificateNo" label="合格证号" width="100"></el-table-column>
                    <el-table-column prop="serialNumber" label="零件号" width="100"></el-table-column>
                    <el-table-column prop="manufacturer" label="生产厂商"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { ResourceManagement } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            sortie: this.$route.query.sortie, //接收参数
            tableData: [], //检测项table数据
            TableHeight: {
                height: ""
            },
            data: [],
            defaultProps: {
                children: "children",
                // label: "bomName",
                label: function(a, b) {
                    console.log(b);
                    return a.bomProduct + "-" + a.bomName;
                }
            },
            ClickArr: []
        };
    },
    created() {
        this.OnQuery();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 20 + "px";
        },
        //查询
        OnQuery() {
            this.axios
                .get(ResourceManagement.GET_E_QueryTree, {
                    params: {
                        sortieNo: this.sortie
                    }
                })
                .then(res => {
                    this.data = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //点击查询物料信息
        handleNodeClick(data) {
            this.ClickArr = [];
            this.axios({
                method: "post",
                url: ResourceManagement.GET_E_QueryMaterialIformation,
                data: data
            })
                .then(res => {
                    this.ClickArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //返回
        OnReturn() {
            this.$router.push({
                path: "PracticeBomHome"
            });
        }
    }
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.BomMaximum {
    overflow: hidden;
    padding: 10px;
}
.ProductDrawingNo {
    width: 20%;
    height: 100%;
    float: left;
}
.ProductDrawingNo_p {
    height: 30px;
    width: 100%;
}
.ProductDrawingNo_tree {
    width: 100%;
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
    border: 1.5px solid #f1f1f1;
    box-sizing: border-box;
    overflow: auto;
}
.MaterialInformation {
    width: -moz-calc(80% - 10px); /* WebKit */
    width: -webkit-calc(80% - 10px); /* Opera */
    width: -o-calc(80% - 10px); /* Standard */
    width: calc(80% - 10px);
    float: right;
    height: 100%;
}

.MaterialInformation_p {
    width: 100%;
    height: 30px;
}
.MaterialInformation_table {
    width: 100%;
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
</style>