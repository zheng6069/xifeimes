<template>
    <div class="container">
        <div class="containerbox" :style="TableHeight">
            <el-table
                border
                :data="StandardParts"
                height="100%"
                style="width: 100%; height: 100%"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
                >
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column prop="name" label="物料名称"></el-table-column>
                <el-table-column prop="drawNo" label="牌号/图号"></el-table-column>
                <el-table-column prop="model" label="标准件规格"></el-table-column>
                <el-table-column prop="stockNum" label="在库数" width="80"></el-table-column>
                <el-table-column prop="stuffNum" label="需求数" width="80"></el-table-column>
                <el-table-column prop="lackStuffNum" label="缺件数" width="80"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { AutomaticScheduling } from "../../../common/api";
import { StationDispatching } from "../../../common/api";
export default {
    data() {
        return {
            mesTaskId: this.$route.query, //接收参数
            DrawingNo: "", //图号
            Sorties: "", //架次
            CompleteSetRate: "", //物料齐套率
            InstructionCompletionRate: "", //指令齐套率
            Station: "", //站位
            StationArr: [], //站位数据
            StructuralMember: [], //结构件
            StandardParts: [], //标准件
            ShortTableDataOne: [],
            ShortTableDataTwo: [],
            TableHeight: {
                height: ""
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.GetInquireMaterial()
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 121 + "px";
        },
        // 获取物料缺件信息
        GetInquireMaterial(){
            this.axios
                .get(StationDispatching.GET_A_LackStuff, {
                    
                })
                .then(res => {
                    console.log(res)
                    this.StandardParts = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //返回
        OnReturn() {
            this.$router.push({
                path: "MaterialInspection"
            });
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    watch: {
        // Station() {
        //     this.OnStation();
        // }
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
.containerbox{
    height: 100%;
}
.Short_head {
    overflow: hidden;
    margin-bottom: 18px;
}
.Short_head_left {
    width: 170px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Short_head_left p {
    width: 40px;
    float: left;
    line-height: 36px;
}
.Short_head_left div {
    width: 130px;
    float: left;
}
.Short_head_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}

.Short_operation {
    height: 50px;
}

.Short_operation_nei {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.ShortOperationNei {
    margin-left: 10px;
    float: left;
}
.ShortOperationNei p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.ShortOperationNei div {
    width: 170px;
    float: left;
}
.Short_tab {
    padding: 0px 10px;
}
.Materia_contnet {
    width: 100%;
}
.Materia_contnet_table {
    height: 100%;
}
.Short_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}
</style>