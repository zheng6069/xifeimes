<template>
    <div class="Ap_container">
        <div class="Ap_Title">
            <el-button size="medium" type="primary" @click="ApStatusAdd">新增</el-button>
        </div>
        <div :style="TableHeight">
            <el-table
                border
                :data="ApStatusArr"
                ref="ApStatusTable"
                height="100%"
                style="width: 100%; height: 100%"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="maintainStatus" label="所属产线名称"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            @click.native="ApStatusDel(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 所属产线弹框 -->
        <el-dialog :visible.sync="ApStatusVisible">
            <el-form :model="ApStatusform" ref="ApStatusform" class="ApStatusform">
                <el-form-item label="所属产线名称" :label-width="formLabelWidth">
                    <el-input v-model="ApStatusform.one" autocomplete="off" placeholder="请输入所属产线名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ApStatusVisible = false">取 消</el-button>
                <el-button type="primary" @click="ApStatusAddVisibleAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Ap_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Ap_Title {
    height: 40px;
}
.ApStatusform .el-input {
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
            ApStatusArr: [], // 所属产线状态
            ApStatusSelection: [],
            ApStatusVisible: false, // 所属产线弹框
            ApStatusform: {
                one: "" // 所属产线状态名称
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.ApStatusList(); // 所属产线
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 60 + "px";
        },
        // 所属产线 - 查询
        ApStatusList() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 4
                    }
                })
                .then(res => {
                    that.ApStatusArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 所属产线 - 新增
        ApStatusAdd() {
            this.ApStatusVisible = true;
            this.ApStatusform.one = "";
        },
        // 所属产线 - 新增 - 确定
        ApStatusAddVisibleAdd() {
            let that = this;
            let addData = {
                maintainStatus: that.ApStatusform.one, // 状态
                maintainFlag: 4 //所属种类
            };
            that.axios
                .post(BasicData.GET_V_addMaintain, addData)
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        that.ApStatusVisible = false;
                        that.ApStatusList();
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
        },
        // 所属产线 - 删除
        ApStatusDel(row) {
            let that = this;
            let url = BasicData.GET_V_deleteMaintain;
            that.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    that.axios
                        .post(url, row)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    type: "success",
                                    message: res.data.message,
                                    duration: 1500
                                });
                                that.ApStatusList();
                            } else {
                                that.$message({
                                    type: "error",
                                    message: res.data.message,
                                    duration: 1500
                                });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(() => {
                    that.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    }
};
</script>
