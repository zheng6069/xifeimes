<template>
    <div class="StaHan_maximum">
        <div class="StaHan_Haed">
            <el-button @click="OnReceive" class="StaHan_Haed_Btn" size="medium" type="primary">接收</el-button>
            <el-button @click="OnTransfer" class="StaHan_Haed_Btn" size="medium" type="primary">移交</el-button>
        </div>
        <div class="StaHan_contnet" :style="TableHeight">
            <div class="StaHan_contnet_table">
                <el-table
                    :data="QueryArr"
                    ref="multipleTable"
                    @selection-change="Tick"
                    border
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="60"></el-table-column>
                    <el-table-column prop="drawing" label="图号"></el-table-column>
                    <el-table-column prop="workNo" label="工单号"></el-table-column>
                    <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                    <el-table-column prop="moveTime" label="转移时间" width="120"></el-table-column>
                    <el-table-column prop="stationName" label="当前站位"></el-table-column>
                    <el-table-column prop="moveStatus" label="状态" width="100"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { dispatchingManagement } from "../../../common/api";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            QueryArr: [],
            QueryArrState: [
                //
                {
                    name: "未移交",
                    id: "0"
                },
                {
                    name: "已移交",
                    id: "1"
                },
                {
                    name: "已接收",
                    id: "2"
                }
            ],
            handoverId: "", //id
            HanState: "", //
            DeleteArr: []
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OnQueryt();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 165 + "px";
        },
        //查询
        OnQueryt() {
            this.axios
                .get(dispatchingManagement.GET_K_Queryt)
                .then(res => {
                    this.QueryArr = res.data;
                    this.QueryArr.map(ite => {
                        this.QueryArrState.map(val => {
                            if (ite.moveStatus == val.id) {
                                ite.moveStatus = val.name;
                            }
                        });
                    });
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
                this.DeleteArr = row.pop(); //储存新的单选数据
                if (this.DeleteArr != undefined) {
                    this.handoverId = this.DeleteArr.handoverId;
                    this.HanState = this.DeleteArr.moveStatus;
                }
            }
        },
        //移交
        OnTransfer() {
            if (this.DeleteArr > 1 || this.DeleteArr != undefined) {
                if (this.HanState === "未移交") {
                    let data = {
                        handoverId: this.handoverId,
                        start:"移交"
                    }
                    this.$emit("fnuc",data)
                } else {
                    this.$message({
                        message: "请选择未移交站位",
                        type: "warning",
                        duration: 1500
                    });
                }
            } else {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //接收
        OnReceive() {
            if (this.DeleteArr > 1 || this.DeleteArr != undefined) {
                if (this.HanState === "已移交" || this.HanState === "已接收") {
                    let data = {
                        handoverId: this.handoverId,
                        start:"接收",
                        HanPage: 1
                    }
                    this.$emit("fnuc",data)
                } else {
                    this.$message({
                        message: "请选择已移交站位",
                        type: "warning",
                        duration: 1500
                    });
                }
            } else {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            }
        }
    }
};
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}
.StaHan_maximum {
    padding: 10px;
}
.StaHan_Haed {
    height: 45px;
}
.StaHan_contnet {
    width: 100%;
    height: 100%;
}
.StaHan_contnet_table {
    width: 100%;
    height: 100%;
}
</style>