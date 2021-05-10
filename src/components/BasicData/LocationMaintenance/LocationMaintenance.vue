<template>
    <div class="Dismantling_container">
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="Dismantling_Title">
                    <el-button size="medium" type="primary" @click="warehouseAdd">新增</el-button>
                </div>
                <div :style="TableHeight">
                    <el-table
                        border
                        :data="warehouseArr"
                        ref="warehouseTable"
                        @selection-change="warehouseChange"
                        height="100%"
                        style="width: 100%;height:100%;"
                        :header-row-style="{ height: '39px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '39px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column type="selection" width="50"></el-table-column>
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="warehouseName" label="库房名称"></el-table-column>
                        <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click.native="warehouseDel(scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col :span="12" v-show="isShow">
                <div class="Dismantling_Title">
                    <el-button size="medium" type="primary" @click="locationAdd">新增</el-button>
                </div>
                <div :style="TableHeight">
                    <el-table
                        border
                        :data="locationArr"
                        ref="multipleTable"
                        height="100%"
                        style="width: 100%;height:100%;"
                        :header-row-style="{ height: '39px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '39px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="locationName" label="库位名称"></el-table-column>
                        <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click.native="locationDel(scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>

        <!-- 库房新增 -->
        <el-dialog :visible.sync="warehouseAddVisible">
            <el-form :model="warehouseAddform" ref="warehouseAddform">
                <el-form-item label="库房名称" :label-width="formLabelWidth" class="warehouse">
                    <el-input
                        v-model="warehouseAddform.one"
                        autocomplete="off"
                        placeholder="请选择库房名称"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="warehouseAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="warehouseAddVisibleAdd">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 库房修改 -->
        <el-dialog :visible.sync="warehouseEdiVisible">
            <el-form :model="warehouseEditform" ref="warehouseEditform" class="warehouse">
                <el-form-item label="库房名称" :label-width="formLabelWidth">
                    <el-input
                        v-model="warehouseEditform.one"
                        autocomplete="off"
                        placeholder="请选择库房名称"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="warehouseEdiVisible = false">取 消</el-button>
                <el-button type="primary" @click="warehouseEdiVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 库位新增 -->
        <el-dialog :visible.sync="locationAddVisible">
            <el-form :model="locationAddform" ref="locationAddform" class="warehouse">
                <el-form-item label="库位名称" :label-width="formLabelWidth">
                    <el-input
                        v-model="locationAddform.one"
                        autocomplete="off"
                        placeholder="请选择库位名称"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="locationAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="locationAddVisibleAdd">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 库位修改 -->
        <el-dialog :visible.sync="locationEdiVisible">
            <el-form :model="locationEditform" ref="locationEditform" class="warehouse">
                <el-form-item label="库位名称" :label-width="formLabelWidth">
                    <el-input
                        v-model="locationEditform.one"
                        autocomplete="off"
                        placeholder="请选择库位名称"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="locationEdiVisible = false">取 消</el-button>
                <el-button type="primary" @click="locationEdiVisible = false">确 定</el-button>
            </div>
        </el-dialog>
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
.Dismantling_Title {
    height: 40px;
}
.warehouse .el-input {
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
            warehouseArr: [], // 库房
            warehouseSelection: [],
            warehouseId: "",
            formLabelWidth: "120px",
            warehouseAddVisible: false, // 库房新增
            warehouseAddform: {
                one: "" // 库房名称
            },
            warehouseEdiVisible: false, // 库房修改
            warehouseEditform: {
                one: "" // 库房名称
            },
            locationArr: [], // 库位
            locationAddVisible: false, // 库位新增
            locationAddform: {
                one: "" // 库位名称
            },
            locationEdiVisible: false, // 库位修改
            locationEditform: {
                one: "" // 库位名称
            },
            isShow: false
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.warehouseList();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 70 + "px";
        },
        // 库房查询
        warehouseList() {
            let that = this;
            that.axios
                .post(BasicData.GET_Z_findAllWarehouse)
                .then(res => {
                    that.warehouseArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 库房新增
        warehouseAdd() {
            this.warehouseAddVisible = true;
            this.warehouseAddform.one = "";
        },
        // 库房新增 - 确定
        warehouseAddVisibleAdd() {
            const that = this;
            const addData = {
                warehouseName: that.warehouseAddform.one
            };
            that.axios
                .post(BasicData.GET_Z_addWarehouse, addData)
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            showClose: true,
                            message: "新增成功",
                            type: "success"
                        });
                        that.warehouseAddVisible = false;
                        that.warehouseList();
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
        // 库房删除
        warehouseDel(row) {
            const that = this;
            const url = BasicData.GET_Z_deleteWarehouse;
            that.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    that.axios
                        .post(url, {
                            warehouseId: row.warehouseId
                        })
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                that.warehouseList();
                            } else {
                                that.$message({
                                    type: "error",
                                    message: res.data.message
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
        warehouseChange(val) {
            if (val.length > 1) {
                this.$refs.warehouseTable.clearSelection();
                this.$refs.warehouseTable.toggleRowSelection(val.pop());
            } else {
                this.warehouseSelection = val.pop(); //储存新的单选数据
                if (this.warehouseSelection != undefined) {
                    this.locationList();
                    console.log(this.warehouseSelection, "DeleteArr");
                }
            }
        },
        // 库位查询
        locationList() {
            let that = this;
            that.axios
                .get(BasicData.GET_Z_findAllLocation, {
                    params: {
                        warehouseId: this.warehouseSelection.warehouseId
                    }
                })
                .then(res => {
                    that.locationArr = res.data;
                    this.isShow = true;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 库位新增
        locationAdd() {
            this.locationAddVisible = true;
            this.locationAddform.one = "";
        },
        // 库位新增 - 确定
        locationAddVisibleAdd() {
            const that = this;
            const addData = {
                warehouseId: this.warehouseSelection.warehouseId,
                locationName: that.locationAddform.one
            };
            that.axios
                .post(BasicData.GET_Z_addLocation, addData)
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            showClose: true,
                            message: "新增成功",
                            type: "success"
                        });
                        that.locationAddVisible = false;
                        that.locationList();
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
        // 库位删除
        locationDel(row) {
            const that = this;
            const url = BasicData.GET_Z_deleteLocation;
            that.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    that.axios
                        .post(url, {
                            warehouseId: row.warehouseId,
                            locationId: row.locationId
                        })
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                that.locationList();
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
