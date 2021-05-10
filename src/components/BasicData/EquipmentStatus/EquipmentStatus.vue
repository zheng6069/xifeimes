<template>
    <div class="EquipmentStatus_container">
        <el-tabs type="border-card" @tab-click="handClick">
            <el-tab-pane label="设备">
                <div class="EquipmentStatus_Title">
                    <el-button size="medium" type="primary" @click="EqStatusAdd">新增</el-button>
                </div>
                <div :style="TableHeight">
                    <el-table
                        border
                        :data="EqStatusArr"
                        ref="EqStatusTable"
                        height="100%"
                        style="width: 100%;height:100%;"
                        :header-row-style="{ height: '39px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '39px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="maintainStatus" label="设备状态名称"></el-table-column>
                        <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click.native="EqStatusDel(scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="工装">
                <div class="EquipmentStatus_Title">
                    <el-button size="medium" type="primary" @click="frockStatusAdd">新增</el-button>
                </div>
                <div :style="TableHeight">
                    <el-table
                        border
                        :data="frockStatusArr"
                        ref="frockStatusTable"
                        height="100%"
                        style="width: 100%;height:100%;"
                    >
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="maintainStatus" label="工装状态名称"></el-table-column>
                        <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click.native="frockStatusDel(scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="工量具">
                <div class="EquipmentStatus_Title">
                    <el-button size="medium" type="primary" @click="MeStatusAdd">新增</el-button>
                </div>
                <div :style="TableHeight">
                    <el-table
                        border
                        :data="MeStatusArr"
                        ref="MeStatusTable"
                        height="100%"
                        style="width: 100%;height:100%;"
                    >
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="maintainStatus" label="工量具状态名称"></el-table-column>
                        <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click.native="MeStatusDel(scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 设备状态弹框 -->
        <el-dialog :visible.sync="EqStatusVisible">
            <el-form :model="EqStatusform" ref="EqStatusform" class="EqStatus">
                <el-form-item label="设备状态名称" :label-width="formLabelWidth">
                    <el-input
                        v-model="EqStatusform.one"
                        autocomplete="off"
                        placeholder="请输入设备状态名称"
                        clearable
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="EqStatusVisible = false">取 消</el-button>
                <el-button type="primary" @click="EqStatusAddVisibleAdd">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 工装状态弹框 -->
        <el-dialog :visible.sync="frockStatusVisible">
            <el-form :model="frockStatusform" ref="frockStatusform" class="EqStatus">
                <el-form-item label="工装状态名称" :label-width="formLabelWidth">
                    <el-input
                        v-model="frockStatusform.one"
                        autocomplete="off"
                        placeholder="请输入工装状态名称"
                        clearable
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="frockStatusVisible = false">取 消</el-button>
                <el-button type="primary" @click="frockStatusVisibleAdd">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 工量具状态弹框 -->
        <el-dialog :visible.sync="MeStatusVisible">
            <el-form :model="MeStatusform" ref="MeStatusform" class="EqStatus">
                <el-form-item label="工量具状态名称" :label-width="formLabelWidth">
                    <el-input
                        v-model="MeStatusform.one"
                        autocomplete="off"
                        placeholder="请输入工量具状态名称"
                        clearable
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="MeStatusVisible = false">取 消</el-button>
                <el-button type="primary" @click="MeStatusVisibleAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.EquipmentStatus_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.EquipmentStatus_Title {
    height: 40px;
}
.EqStatus .el-input {
    width: 220px;
}
</style>
<script>
import { BasicData } from "../../../common/api";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            formLabelWidth: "120px",
            frockStatusArr: [], // 工装状态
            frockStatusSelection: [],
            frockStatusVisible: false, // 工装弹框
            frockStatusform: {
                one: "" // 工装状态名称
            },
            EqStatusArr: [], // 设备状态
            EqStatusSelection: [],
            EqStatusVisible: false, // 设备弹框
            EqStatusform: {
                one: "" // 设备状态名称
            },
            MeStatusArr: [], // 工量具状态
            MeStatusSelection: [],
            MeStatusVisible: false, // 工量具弹框
            MeStatusform: {
                one: "" // 工量具状态名称
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.EqStatusList(); // 设备
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 130 + "px";
        },
        // 设备 - 查询
        EqStatusList() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 1
                    }
                })
                .then(res => {
                    that.EqStatusArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 设备 - 新增
        EqStatusAdd() {
            this.EqStatusVisible = true;
            this.EqStatusform.one = "";
        },
        // 设备 - 新增 - 确定
        EqStatusAddVisibleAdd() {
            const that = this;
            const addData = {
                maintainStatus: that.EqStatusform.one, // 状态
                maintainFlag: 1 //所属种类
            };
            that.axios
                .post(BasicData.GET_V_addMaintain, addData)
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            showClose: true,
                            message: "新增成功",
                            type: "success"
                        });
                        that.EqStatusVisible = false;
                        that.EqStatusList();
                    } else {
                        that.$message({
                            showClose: true,
                            message: "新增失败",
                            type: "error"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 设备 - 删除
        EqStatusDel(row) {
            const that = this;
            const url = BasicData.GET_V_deleteMaintain;
            that.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    that.axios
                        .post(url, row)
                        .then(res => {
                            // console.log(res, "oooo");
                            if (res.data.success == true) {
                                that.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                that.EqStatusList();
                            } else {
                                that.$message({
                                    type: "error",
                                    message: "删除失败!"
                                });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 工装 - 查询
        frockStatusList() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 2
                    }
                })
                .then(res => {
                    that.frockStatusArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 工装 - 新增
        frockStatusAdd() {
            this.frockStatusVisible = true;
            this.frockStatusform.one = "";
        },
        // 工装 - 删除
        frockStatusDel(row) {
            const that = this;
            const url = BasicData.GET_V_deleteMaintain;
            that.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    that.axios
                        .post(url, row)
                        .then(res => {
                            // console.log(res, "oooo");
                            if (res.data.success == true) {
                                that.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                that.frockStatusList();
                            } else {
                                that.$message({
                                    type: "error",
                                    message: "删除失败!"
                                });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 工装 - 新增 - 确定
        frockStatusVisibleAdd() {
            const that = this;
            const addData = {
                maintainStatus: that.frockStatusform.one, // 状态
                maintainFlag: 2 //所属种类
            };
            that.axios
                .post(BasicData.GET_V_addMaintain, addData)
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            showClose: true,
                            message: "新增成功",
                            type: "success"
                        });
                        that.frockStatusVisible = false;
                        that.frockStatusList();
                    } else {
                        that.$message({
                            showClose: true,
                            message: "新增失败",
                            type: "error"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 工量具 - 查询
        MeStatusList() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 3
                    }
                })
                .then(res => {
                    that.MeStatusArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 工量具 - 新增
        MeStatusAdd() {
            this.MeStatusVisible = true;
            this.MeStatusform.one = "";
        },
        // 工量具 - 删除
        MeStatusDel(row) {
            const that = this;
            const url = BasicData.GET_V_deleteMaintain;
            that.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    that.axios
                        .post(url, row)
                        .then(res => {
                            // console.log(res, "oooo");
                            if (res.data.success == true) {
                                that.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                that.MeStatusList();
                            } else {
                                that.$message({
                                    type: "error",
                                    message: "删除失败!"
                                });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 工量具 - 新增 - 确定
        MeStatusVisibleAdd() {
            const that = this;
            const addData = {
                maintainStatus: that.MeStatusform.one, // 状态
                maintainFlag: 3 //所属种类
            };
            that.axios
                .post(BasicData.GET_V_addMaintain, addData)
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            showClose: true,
                            message: "新增成功",
                            type: "success"
                        });
                        that.MeStatusVisible = false;
                        that.MeStatusList();
                    } else {
                        that.$message({
                            showClose: true,
                            message: "新增失败",
                            type: "error"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handClick(tab) {
            if (tab.label == "设备") {
                this.EqStatusList();
            } else if (tab.label == "工装") {
                this.frockStatusList();
            } else if (tab.label == "工量具") {
                this.MeStatusList();
            }
        }
    }
};
</script>
