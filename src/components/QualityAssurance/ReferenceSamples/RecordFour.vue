<template>
    <div :style="TableHeight">
        <el-table :data="RecordFourData" border height="100%" style="width: 100%;height:100%">
            <el-table-column prop="drawNo" label="图号"></el-table-column>
            <el-table-column prop="materialName" label="名称"></el-table-column>
            <el-table-column prop="productNum" label="需求数量" width="80"></el-table-column>
            <el-table-column prop="instructNum" label="指令号"></el-table-column>
            <el-table-column prop="instructName" label="指令名称"></el-table-column>
            <el-table-column prop="productOutNum" label="配套数量" width="80"></el-table-column>
            <el-table-column prop="certificateNo" label="合格证号"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import { AssemblyPerform } from "../../../common/api";
export default {
    props: ["mating"],
    data() {
        return {
            RecordFourData: [],
            sortieNo: "",
            workId: "",
            TableHeight: {
                height: ""
            }
        };
    },
    created() {
        let { sortieNo, workId } = this.mating;
        this.sortieNo = sortieNo;
        this.workId = workId;
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    computed: {},
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 50 + "px";
        },
        RecordFourList() {
            this.axios
                .get(AssemblyPerform.GET_V_findMaterialList, {
                    params: {
                        workId: this.workId,
                        sortieNo: this.sortieNo
                    }
                })
                .then(res => {
                    this.RecordFourData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>
<style scoped></style>
