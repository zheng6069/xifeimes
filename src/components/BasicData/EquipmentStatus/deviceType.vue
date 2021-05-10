<template>
    <div class="Release_container">
        <div class="Release_Title">
            <el-button size="medium" type="primary" @click="ReleaseStatusAdd">新增</el-button>
        </div>
        <div :style="TableHeight">
            <el-table
                border
                :data="ReleaseStatusArr"
                ref="ReleaseStatusTable"
                height="100%"
                style="width: 100%;height:100%;"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="maintainStatus" label="设备类型名称"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            @click.native="ReleaseStatusDel(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 设备类型弹框 -->
        <el-dialog :visible.sync="ReleaseStatusVisible">
            <el-form :model="ReleaseStatusform" ref="ReleaseStatusform" class="ReleaseStatusform">
                <el-form-item label="设备类型名称" :label-width="formLabelWidth">
                    <el-input
                        v-model="ReleaseStatusform.one"
                        autocomplete="off"
                        placeholder="请输入设备类型名称"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ReleaseStatusVisible = false">取 消</el-button>
                <el-button type="primary" @click="ReleaseStatusAddVisibleAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Release_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Release_Title {
    height: 40px;
}
.ReleaseStatusform .el-input {
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
            ReleaseStatusArr: [], // 设备类型状态
            ReleaseStatusSelection: [],
            ReleaseStatusVisible: false, // 设备类型弹框
            ReleaseStatusform: {
                one: "" // 设备类型状态名称
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.ReleaseStatusList(); // 设备类型
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 60 + "px";
        },
        // 设备类型 - 查询
        ReleaseStatusList() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 13
                    }
                })
                .then(res => {
                    that.ReleaseStatusArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 设备类型 - 新增
        ReleaseStatusAdd() {
            this.ReleaseStatusVisible = true;
            this.ReleaseStatusform.one = "";
        },
        // 设备类型 - 新增 - 确定
        ReleaseStatusAddVisibleAdd() {
            const that = this;
            const addData = {
                maintainStatus: that.ReleaseStatusform.one, // 状态
                maintainFlag: 13 //所属设备类型
            };
            that.axios
                .post(BasicData.GET_V_addMaintain, addData)
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            duration: 1500,
                            message: res.data.message,
                            type: "success"
                        });
                        that.ReleaseStatusVisible = false;
                        that.ReleaseStatusList();
                    } else {
                        that.$message({
                            duration: 1500,
                            message: res.data.message,
                            type: "error"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 设备类型 - 删除
        ReleaseStatusDel(row) {
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
                            if (res.data.success == true) {
                                that.$message({
                                    type: "success",
                                    message: res.data.message,
                                    duration: 1500
                                });
                                that.ReleaseStatusList();
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
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    }
};
</script>
