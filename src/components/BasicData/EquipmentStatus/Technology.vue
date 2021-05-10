<template>
    <div class="Te_container">
        <div class="Te_Title">
            <el-button size="medium" type="primary" @click="TeStatusAdd">新增</el-button>
        </div>
        <div :style="TableHeight">
            <el-table
                border
                :data="TeStatusArr"
                ref="TeStatusTable"
                height="100%"
                style="width: 100%;height:100%;"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="maintainStatus" label="责任单位"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            @click.native="TeStatusDel(scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 责任单位弹框 -->
        <el-dialog :visible.sync="TeStatusVisible">
            <el-form :model="TeStatusform" ref="TeStatusform" class="TeStatusform">
                <el-form-item label="责任单位" :label-width="formLabelWidth">
                    <el-input v-model="TeStatusform.one" autocomplete="off" placeholder="请输入责任单位"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="TeStatusVisible = false">取 消</el-button>
                <el-button type="primary" @click="TeStatusAddVisibleAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Te_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.Te_Title {
    height: 40px;
}
.TeStatusform .el-input {
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
            TeStatusArr: [], // 责任单位状态
            TeStatusSelection: [],
            TeStatusVisible: false, // 责任单位弹框
            TeStatusform: {
                one: "" // 责任单位状态名称
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.TeStatusList(); // 责任单位
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 60 + "px";
        },
        // 责任单位 - 查询
        TeStatusList() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 11
                    }
                })
                .then(res => {
                    that.TeStatusArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 责任单位 - 新增
        TeStatusAdd() {
            this.TeStatusVisible = true;
            this.TeStatusform.one = "";
        },
        // 责任单位 - 新增 - 确定
        TeStatusAddVisibleAdd() {
            const that = this;
            const addData = {
                maintainStatus: that.TeStatusform.one, // 状态
                maintainFlag: 11 //所属责任单位
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
                        that.TeStatusVisible = false;
                        that.TeStatusList();
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
        // 责任单位 - 删除
        TeStatusDel(row) {
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
                                that.TeStatusList();
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
