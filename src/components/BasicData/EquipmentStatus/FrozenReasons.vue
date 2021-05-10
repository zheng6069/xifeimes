<template>
    <div class="Fr_container">
        <div class="Fr_Title">
            <el-button size="medium" type="primary" @click="FrStatusAdd">新增</el-button>
        </div>
        <div :style="TableHeight">
            <el-table
                border
                :data="FrStatusArr"
                ref="FrStatusTable"
                height="100%"
                style="width: 100%;height:100%;"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="maintainStatus" label="冻结原因名称"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            @click.native="FrStatusDel(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 冻结原因弹框 -->
        <el-dialog :visible.sync="FrStatusVisible">
            <el-form :model="FrStatusform" ref="FrStatusform" class="FrStatusform">
                <el-form-item label="冻结原因名称" :label-width="formLabelWidth">
                    <el-input v-model="FrStatusform.one" autocomplete="off" placeholder="请输入冻结原因名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="FrStatusVisible = false">取 消</el-button>
                <el-button type="primary" @click="FrStatusAddVisibleAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Fr_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Fr_Title {
    height: 40px;
}
.FrStatusform .el-input {
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
            FrStatusArr: [], // 冻结原因状态
            FrStatusSelection: [],
            FrStatusVisible: false, // 冻结原因弹框
            FrStatusform: {
                one: "" // 冻结原因状态名称
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.FrStatusList(); // 冻结原因
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 60 + "px";
        },
        // 冻结原因 - 查询
        FrStatusList() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 6
                    }
                })
                .then(res => {
                    that.FrStatusArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 冻结原因 - 新增
        FrStatusAdd() {
            this.FrStatusVisible = true;
            this.FrStatusform.one = "";
        },
        // 冻结原因 - 新增 - 确定
        FrStatusAddVisibleAdd() {
            const that = this;
            const addData = {
                maintainStatus: that.FrStatusform.one, // 状态
                maintainFlag: 6 //所属冻结原因
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
                        that.FrStatusVisible = false;
                        that.FrStatusList();
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
        // 冻结原因 - 删除
        FrStatusDel(row) {
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
                                that.FrStatusList();
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
