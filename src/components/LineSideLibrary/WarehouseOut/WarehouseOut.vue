<template>
    <div class="Out_container">
        <div class="Out_title">
            <div class="Out_head">
                <p>架次号</p>
                <div>
                    <el-input v-model="auxiliaryProjects" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>

            <div class="Out_head">
                <p>指令号</p>
                <div>
                    <el-input
                        v-model="auxiliaryInstructions"
                        size="medium"
                        placeholder="请输入"
                        clearable
                    ></el-input>
                </div>
            </div>
            <div class="Out_head">
                <p>指令名称</p>
                <div>
                    <el-input v-model="materialNum" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <el-button size="medium" type="primary" @click="getOutSearchList">查询</el-button>
        </div>
        <div class="Out_Title">
            物料信息
            <el-button @click="OnWarehouseOut" size="small" type="primary" class="Out_bnt">出库</el-button>
        </div>
        <div :style="TableHeight">
            <el-table
                border
                :data="WarehouseOutArr"
                :row-key="getRowKeys"
                :expand-row-keys="expands"
                @expand-change="expandSelect"
                @selection-change="handleSelectionChange"
                ref="multipleTable"
                height="100%"
                style="width: 100%; height: 100%"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="expand" prop="materialInfos">
                    <template slot-scope="scope">
                        <el-table
                            :data="scope.row.materialInfos"
                            style="width: 100%"
                            height="100%"
                            border
                            @selection-change="handleSelectionChange"
                            ref="materialInfos"
                            :header-row-style="{ height: '39px' }"
                            :header-cell-style="{ padding: '0px' }"
                            :row-style="{ height: '39px' }"
                            :cell-style="{ padding: '0px' }"
                        >
                            <el-table-column type="selection" width="60"></el-table-column>
                            <el-table-column label="序号" type="index" width="60"></el-table-column>
                            <el-table-column label="产品图号" prop="drawNo"></el-table-column>
                            <el-table-column label="产品名称" prop="materialName"></el-table-column>
                            <el-table-column label="需求数量" prop="stockNum"></el-table-column>
                            <el-table-column label="合格证号" prop="certificateNo"></el-table-column>
                            <el-table-column label="生产厂商" prop="productUnit"></el-table-column>
                            <el-table-column label="配套数" prop="matchNum"></el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column label="序号" type="index" width="60"></el-table-column>
                <el-table-column label="架次号" prop="sortieNo"></el-table-column>
                <el-table-column label="指令号" prop="instructNum"></el-table-column>
                <el-table-column label="指令名称" prop="instructName"></el-table-column>
            </el-table>
        </div>
        <!-- 出库 -->
        <my-personnel
            :personnelPopTrue="personnelPop"
            @closeDialog="closeDialog"
            @handleInput="handleInput"
            @personnelPopSava="personnelPopSava"
            ref="childRules"
        ></my-personnel>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Out_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Out_title {
    height: 50px;
    overflow: hidden;
}

.Out_head {
    width: 235px;
    float: left;
    margin-right: 10px;
}
.Out_head p {
    width: 85px;
    float: left;
    line-height: 36px;
}
.Out_head div {
    width: 150px;
    float: left;
}
.Out_bnt {
    float: right;
}
.Out_Title {
    height: 30px;
    font-size: 14px;
}
.DetectPaging {
    height: 40px;
    margin-top: 5px;
}

.WarehouseOut_pop {
    height: 270px;
}
.WarehouseOut_personnel {
    width: 100px;
    height: 30px;
    margin-top: 10px;
}
</style>
<script>
import { dispatchingManagement } from "../../../common/api";
import myPersonnel from "../../../encapsulation/my-personnel.vue";
export default {
    components: { myPersonnel },
    data() {
        return {
            TableHeight: {
                height: ""
            },
            WarehouseOutArr: [],
            multipleSelection: [],
            auxiliaryProjects: "", // 架次号
            auxiliaryInstructions: "", // 指令号
            materialNum: "", // 指令名称
            materialDrawingNum: "", // 图号
            personnelPop: false,
            ruleForm: {
                personnelNum: "", //人员编号
                personnelName: "" //人员名称
            },
            expands: [],
            getRowKeys(row) {
                return row.instructId;
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.getOutSearchList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 105 + "px";
        },
        // 查询
        getOutSearchList() {
            let that = this;
            let url = dispatchingManagement.GET_D_getMaterialOutList;
            let data = {
                sortieNo: that.auxiliaryProjects,
                instructNum: that.auxiliaryInstructions,
                instructName: that.materialNum,
                drawNo: that.materialDrawingNum
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.WarehouseOutArr = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 出库
        OnWarehouseOut() {
            if (
                this.multipleSelection < 1 ||
                this.multipleSelection == undefined
            ) {
                this.$message({
                    message: "请选择指令号下的一条产品图号数据",
                    type: "warning"
                });
            } else {
                this.personnelPop = true;
            }
        },
        closeDialog(et, it) {
            et.name = "";
            et.region = "";
            it.num = "";
            this.personnelPop = false;
        },
        // 刷卡触发
        handleInput(item) {
            let that = this;
            let data = that.multipleSelection;
            let url =
                dispatchingManagement.GET_D_addMaterialOut +
                "?cardNo=" +
                item.num +
                "&flag=" +
                2;
            that.axios
                .post(url, data)
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        that.getOutSearchList();
                        that.personnelPop = false;
                    } else {
                        item.num = "";
                        that.$message({
                            message: res.data.message,
                            type: "error",
                            duration: 1500
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 出库 - 确定
        personnelPopSava(formLabelAlign) {
            let flag = this.$refs["childRules"].validateForm();
            if (flag) {
                let that = this;
                let url =
                    dispatchingManagement.GET_D_addMaterialOut +
                    "?cardNo=" +
                    formLabelAlign.name +
                    "&flag=" +
                    1;
                let data = that.multipleSelection;
                that.multipleSelection.storageUserCode = formLabelAlign.name;
                that.multipleSelection.storageOutUser = formLabelAlign.region;
                that.axios
                    .post(url, data)
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            that.getOutSearchList();
                            that.personnelPop = false;
                        } else {
                            that.$message({
                                message: res.data.message,
                                type: "error",
                                duration: 1500
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                return false;
            }
        },
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.materialInfos.clearSelection();
                this.$refs.materialInfos.toggleRowSelection(val.pop());
            } else {
                this.multipleSelection = val.pop(); //储存新的单选数据
            }
        },
        // 折叠面板每次只能展开一行
        expandSelect(row, expandedRows) {
            var that = this;
            if (expandedRows.length) {
                that.expands = [];
                if (row) {
                    that.expands.push(row.instructId); // 每次push进去的是每行的ID
                }
            } else {
                that.expands = []; // 默认不展开
            }
        }
    }
};
</script>
