<template>
    <div class="Ex_container">
        <div class="Ex_Title">
            <el-button size="medium" type="primary" @click="ExStatusAdd">新增</el-button>
        </div>
        <div :style="TableHeight">
            <el-table
                border
                :data="ExStatusArr"
                ref="ExStatusTable"
                height="100%"
                style="width: 100%;height:100%;"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="maintainStatus" label="资质等级维护"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            @click.native="ExStatusDel(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 资质维护弹框 -->
        <el-dialog :visible.sync="ExStatusVisible">
            <el-form :model="ExStatusform" ref="ExStatusform" class="ExStatusform">
                <el-form-item label="资质等级维护" :label-width="formLabelWidth">
                    <el-input v-model="ExStatusform.one" autocomplete="off" placeholder="请输入资质等级"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ExStatusVisible = false">取 消</el-button>
                <el-button type="primary" @click="ExStatusAddVisibleAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Ex_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Ex_Title {
    height: 40px;
}
.ExStatusform .el-input {
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
            ExStatusArr: [], // 资质等级维护状态
            ExStatusSelection: [],
            ExStatusVisible: false, // 资质等级维护弹框
            ExStatusform: {
                one: "" // 资质等级维护状态名称
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.ExStatusList(); // 资质等级维护
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 60 + "px";
        },
        // 资质等级维护列表 - 查询
        ExStatusList() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 15
                    }
                })
                .then(res => {
                    that.ExStatusArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 资质等级维护 - 新增
        ExStatusAdd() {
            this.ExStatusVisible = true;
            this.ExStatusform.one = "";
        },
        // 资质等级维护 - 新增 - 确定
        ExStatusAddVisibleAdd() {
            const that = this;
            const addData = {
                maintainStatus: that.ExStatusform.one, // 状态
                maintainFlag: 15 //所属资质等级维护
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
                        that.ExStatusVisible = false;
                        that.ExStatusList();
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
        // 资质等级维护 - 删除
        ExStatusDel(row) {
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
                                    message: "删除成功!"
                                });
                                that.ExStatusList();
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
