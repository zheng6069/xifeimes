<template>
    <div class="Dismantling_container">
        <div class="Dismantling_title">
            <div class="Dismantling_head">
                <p>指令号</p>
                <div>
                    <el-input size="medium" v-model="InstructionNum" placeholder="请输入" clearable></el-input>
                </div>
            </div>

            <div class="Dismantling_head">
                <p>指令名称</p>
                <div>
                    <el-input size="medium" v-model="InstructionName" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <el-button size="medium" type="primary" @click="WorkOrderList">查询</el-button>
        </div>
        <div class="Dismantling_Title">
            指令详细信息
            <el-button @click="OnDismantling" size="small" type="primary" class="Dismantling_bnt">确定</el-button>
        </div>
        <div>
            <el-table
                border
                :data="WorkOrderArr"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                height="300"
                style="width: 100%;height:100%;"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="instructNum" label="指令号"></el-table-column>
                <el-table-column prop="instructName" label="指令名称"></el-table-column>
            </el-table>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="sizeChange"
                @current-change="currentChange"
                :page-size="pageSize"
                :current-page="nowPages"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Dismantling_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Dismantling_title {
    height: 50px;
}

.Dismantling_head {
    width: 250px;
    float: left;
    margin-right: 10px;
}
.Dismantling_head p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.Dismantling_head div {
    width: 180px;
    float: left;
}
.Dismantling_bnt {
    float: right;
}
.Dismantling_Title {
    height: 30px;
    font-size: 14px;
}
.DetectPaging {
    height: 50px;
    margin-top: 5px;
}

.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
</style>
<script>
import { dispatchingManagement } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    props: ["datamsg"],
    data() {
        return {
            TableHeight: {
                height: ""
            },
            WorkOrderArr: [],
            InstructionNum: "", // 指令号
            InstructionName: "", // 指令名称
            multipleSelection: [],
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0 //总数
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.WorkOrderList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 145 + "px";
        },
        // 查询
        WorkOrderList() {
            let that = this;
            let url = dispatchingManagement.GET_W_findAllInstruct;
            that.axios
                .post(url, {
                    instructName: that.InstructionName,
                    instructNum: that.InstructionNum,
                    stationId: that.datamsg,
                    limit: that.pageSize,
                    page: that.nowPages
                })
                .then(res => {
                    that.WorkOrderArr = res.data.records;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.WorkOrderList();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.WorkOrderList();
        },
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd")
                : "";
        },
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            } else {
                this.multipleSelection = val.pop(); //储存新的单选数据
            }
        },
        // 确定
        OnDismantling() {
            if (
                this.multipleSelection < 1 ||
                this.multipleSelection == undefined
            ) {
                this.$message({
                    //警示
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                this.$emit("fatherMethod", this.multipleSelection);
            }
        }
    }
};
</script>
