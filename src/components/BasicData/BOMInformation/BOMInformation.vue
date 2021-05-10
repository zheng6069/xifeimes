<template>
    <div class="BomMaximum" :style="TableHeight">
        <div class="ProductDrawingNo">
            <p class="ProductDrawingNo_p">产品图号</p>
            <div class="ProductDrawingNo_tree">
                <el-tree
                    style="height: 100%"
                    :data="data"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                ></el-tree>
            </div>
        </div>
        <div class="MaterialInformation">
            <p class="MaterialInformation_p">
                物料信息
                <el-button @click="OnReturn" size="mini" type="primary" style="float: right">返回</el-button>
            </p>
            <div class="MaterialInformation_table">
                <el-table
                    border
                    :data="ClickArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="bomProduct" label="图号" width="200"></el-table-column>
                    <el-table-column prop="bomName" label="名称"></el-table-column>
                    <el-table-column prop="bomQty" label="数量" width="100"></el-table-column>
                    <el-table-column prop="bomVersion" label="版本" width="100"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
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
<script>
import { BasicData } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            BOMinformaID: this.$route.query.BOMinformaID, //接收参数
            tableData: [], //检测项table数据
            TableHeight: {
                height: ""
            },
            data: [],
            defaultProps: {
                children: "children",
                label: "bomName"
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
        //点击查询物料信息
        handleNodeClick(data) {
            console.log(data);
            this.axios
                .get(BasicData.GET_E_ClickQuery, {
                    params: {
                        bid: data.bid
                    }
                })
                .then(res => {
                    this.ClickArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查询
        OnQuery() {
            this.axios
                .get(BasicData.GET_E_JumpQuery, {
                    params: {
                        bid: this.BOMinformaID
                    }
                })
                .then(res => {
                    this.data = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //返回
        OnReturn() {
            this.$router.push({
                path: "BOMInformationHome"
            });
        }
    }
};
</script>