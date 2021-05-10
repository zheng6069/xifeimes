<template>
    <div class="Fc_container">
        <div class="Fc_Title">
            <el-button size="medium" type="primary" @click="FcStatusAdd">新增</el-button>
        </div>
        <div :style="TableHeight">
            <el-table
                border
                :data="FcStatusArr"
                ref="FcStatusTable"
                height="100%"
                style="width: 100%;height:100%;"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="maintainStatus" label="故障代码名称"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            @click.native="FcStatusDel(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 故障代码弹框 -->
        <el-dialog :visible.sync="FcStatusVisible">
            <el-form :model="FcStatusform" ref="FcStatusform" class="FcStatusform">
                <el-form-item label="故障代码名称" :label-width="formLabelWidth">
                    <el-input v-model="FcStatusform.one" autocomplete="off" placeholder="请输入故障代码名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="FcStatusVisible = false">取 消</el-button>
                <el-button type="primary" @click="FcStatusAddVisibleAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Fc_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Fc_Title {
    height: 40px;
}
.FcStatusform .el-input {
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
            FcStatusArr: [], // 故障代码状态
            FcStatusSelection: [],
            FcStatusVisible: false, // 故障代码弹框
            FcStatusform: {
                one: "" // 故障代码状态名称
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.FcStatusList(); // 故障代码
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 60 + "px";
        },
        // 故障代码 - 查询
        FcStatusList() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 8
                    }
                })
                .then(res => {
                    that.FcStatusArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 故障代码 - 新增
        FcStatusAdd() {
            this.FcStatusVisible = true;
            this.FcStatusform.one = "";
        },
        // 故障代码 - 新增 - 确定
        FcStatusAddVisibleAdd() {
            const that = this;
            const addData = {
                maintainStatus: that.FcStatusform.one, // 状态
                maintainFlag: 8 //所属故障代码
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
                        that.FcStatusVisible = false;
                        that.FcStatusList();
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
        // 故障代码 - 删除
        FcStatusDel(row) {
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
                                that.FcStatusList();
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
        }
    }
};
</script>
