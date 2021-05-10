<template>
    <div class="Kind_container">
        <el-tabs type="border-card" @tab-click="handClick">
            <el-tab-pane label="工装种类">
                <div class="Kind_Title">
                    <el-button size="medium" type="primary" @click="KindStatusAdd">新增</el-button>
                </div>
                <div :style="TableHeight">
                    <el-table
                        border
                        :data="KindStatusArr"
                        ref="KindStatusTable"
                        height="100%"
                        style="width: 100%;height:100%;"
                        :header-row-style="{ height: '39px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '39px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="maintainStatus" label="工装种类名称"></el-table-column>
                        <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click.native="KindStatusDel(scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="工量具种类">
                <div class="Kind_Title">
                    <el-button size="medium" type="primary" @click="MeKindStatusAdd">新增</el-button>
                </div>
                <div :style="TableHeight">
                    <el-table
                        border
                        :data="MeKindStatusArr"
                        ref="KindStatusTable"
                        height="100%"
                        style="width: 100%;height:100%;"
                        :header-row-style="{ height: '39px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '39px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="maintainStatus" label="工（量）具种类名称"></el-table-column>
                        <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click.native="MeKindStatusDel(scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 工装种类弹框 -->
        <el-dialog :visible.sync="KindStatusVisible">
            <el-form :model="KindStatusform" ref="KindStatusform" class="KindStatus">
                <el-form-item label="工装种类" :label-width="formLabelWidth">
                    <el-input
                        v-model="KindStatusform.one"
                        autocomplete="off"
                        placeholder="请输入工装种类名称"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="KindStatusVisible = false">取 消</el-button>
                <el-button type="primary" @click="KindStatusAddVisibleAdd">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 工量具种类弹框 -->
        <el-dialog :visible.sync="MeKindStatusVisible">
            <el-form :model="MeKindStatusform" ref="MeKindStatusform" class="KindStatus">
                <el-form-item label="工量具种类" :label-width="formLabelWidth">
                    <el-input
                        v-model="MeKindStatusform.one"
                        autocomplete="off"
                        placeholder="请输入工量具种类名称"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="MeKindStatusVisible = false">取 消</el-button>
                <el-button type="primary" @click="MeKindStatusAddVisibleAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Kind_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Kind_Title {
    height: 40px;
}
.KindStatus .el-input {
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
            KindStatusArr: [], // 工装种类状态
            KindStatusVisible: false, // 工装种类弹框
            KindStatusform: {
                one: "" // 工装种类状态名称
            },
            MeKindStatusArr: [], // 工量具种类状态
            MeKindStatusVisible: false, // 工量具种类弹框
            MeKindStatusform: {
                one: "" // 工量具种类状态名称
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.KindStatusList(); // 种类
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 130 + "px";
        },
        // 工装种类 - 查询
        KindStatusList() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 5
                    }
                })
                .then(res => {
                    that.KindStatusArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 工装种类 - 新增
        KindStatusAdd() {
            this.KindStatusVisible = true;
            this.KindStatusform.one = "";
        },
        // 工装种类 - 新增 - 确定
        KindStatusAddVisibleAdd() {
            const that = this;
            const addData = {
                maintainStatus: that.KindStatusform.one, // 状态
                maintainFlag: 5 //所属种类
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
                        that.KindStatusVisible = false;
                        that.KindStatusList();
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
        // 工装种类 - 删除
        KindStatusDel(row) {
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
                                that.KindStatusList();
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
        // 工量具种类 - 查询
        MeKindStatusList() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 10
                    }
                })
                .then(res => {
                    that.MeKindStatusArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 工量具种类 - 新增
        MeKindStatusAdd() {
            this.MeKindStatusVisible = true;
            this.MeKindStatusform.one = "";
        },
        // 工量具种类 - 新增 - 确定
        MeKindStatusAddVisibleAdd() {
            const that = this;
            const addData = {
                maintainStatus: that.MeKindStatusform.one, // 状态
                maintainFlag: 10 //所属种类
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
                        that.MeKindStatusVisible = false;
                        that.MeKindStatusList();
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
        // 工量具种类 - 删除
        MeKindStatusDel(row) {
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
                                that.MeKindStatusList();
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
        handClick(tab) {
            if (tab.label == "工装种类") {
                this.KindStatusList();
            } else if (tab.label == "工量具种类") {
                this.MeKindStatusList();
            }
        }
    }
};
</script>
