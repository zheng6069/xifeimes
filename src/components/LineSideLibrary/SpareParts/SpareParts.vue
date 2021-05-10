<template>
    <div>
        <div class="SP_head">
            <div class="SP_head_left">
                <el-input v-model="searchName" size="medium" clearable placeholder="名称、型号、设备"></el-input>
            </div>
            <el-button
                size="medium"
                type="primary"
                class="SP_head_bnt"
                @click="nowPages=1;ONTestItemQuery()"
            >查询</el-button>
        </div>
        <div class="SP_contnet" :style="TableHeight">
            <div class="SP_title">
                <div class="ItBox_info">
                    <el-button
                        size="medium"
                        type="primary"
                        class="operation_bnt"
                        @click="reassignment"
                    >出库</el-button>
                </div>
            </div>
            <div class="SP_contnet_table">
                <el-table
                    border
                    :data="tableData"
                    @selection-change="handleSelectionChange"
                    ref="multipleTable"
                    height="100%"
                    style="width: 100%;height:100%; "
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="spareName" label="备用件名称"></el-table-column>
                    <el-table-column prop="spareType" label="备用件类型"></el-table-column>
                    <el-table-column prop="spareModel" label="型号规格"></el-table-column>
                    <el-table-column prop="applyEquipment" label="适用设备"></el-table-column>
                    <el-table-column prop="spareNum" label="数量"></el-table-column>
                    <el-table-column prop="productUnit" label="生产厂商"></el-table-column>
                    <el-table-column prop="locationName" label="库位"></el-table-column>
                    <el-table-column label="备注" :show-overflow-tooltip="true">
                        <template slot-scope="{ row }">
                            <span>{{ row.remarks }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="sizeChange"
                @current-change="currentChange"
                :page-size="pageSize"
                :current-page="nowPages"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>

        <!-- 出库弹框 -->
        <el-dialog :visible.sync="SparePartsVisible" width="30%">
            <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="刷卡" name="first">
                    <el-form
                        :label-position="labelPosition"
                        label-width="80px"
                        :model="SparePartsCard"
                        ref="SparePartsCard"
                    >
                        <el-form-item
                            label="需求数量"
                            prop="one"
                            :rules="[
                { required: true, message: '请输入需求数量' },
                { type: 'number', message: '需求数量必须为数字值' },
              ]"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model.number="SparePartsCard.one"
                                style="width:220px"
                                clearable
                                placeholder="请输入"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="刷卡卡号"
                            prop="two"
                            :rules="[
                { required: true, message: '请刷卡' },
                { type: 'number', message: '卡号为数字值' },
              ]"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model.number="SparePartsCard.two"
                                style="width:220px;"
                                clearable
                                placeholder="请刷卡"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="刷卡卡号" v-show="false">
                            <el-input style="width:220px;"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="手输" name="second">
                    <el-form :model="SparePartsform" ref="SparePartsform" :rules="rules">
                        <el-form-item label="需求数量" prop="one" :label-width="formLabelWidth">
                            <el-input
                                v-model.number="SparePartsform.one"
                                style="width:220px"
                                clearable
                                placeholder="请输入"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="人员编号" prop="two" :label-width="formLabelWidth">
                            <el-input
                                v-model="SparePartsform.two"
                                style="width:220px"
                                clearable
                                placeholder="请输入"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="人员名称" prop="three" :label-width="formLabelWidth">
                            <el-input
                                v-model="SparePartsform.three"
                                style="width:220px"
                                clearable
                                placeholder="请输入"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="SparePartsVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="SparePartsCardVisibleAdd('SparePartsCard')"
                    v-show="isShow"
                >确 定</el-button>
                <el-button
                    type="primary"
                    @click="SparePartsAddVisibleAdd('SparePartsform')"
                    v-show="needShow"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.SP_head {
    height: 60px;
    overflow: hidden;
}
.SP_head_left {
    width: 200px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.SP_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.SP_head_left div {
    width: 200px;
    float: left;
}
.SP_head_bnt {
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
}
.SP_contnet {
    width: 100%;
}
.SP_title {
    height: 40px;
    overflow: hidden;
}
.SP_title .ItBox_title {
    float: left;
    text-indent: 10px;
    font-size: 12px;
    line-height: 40px;
}
.SP_title .ItBox_info {
    float: right;
    font-size: 12px;
    line-height: 40px;
    margin-right: 10px;
}
.SP_contnet_table {
    padding: 0px 10px;
    height: -moz-calc(100% - 40px); /* WebKit */
    height: -webkit-calc(100% - 40px); /* Opera */
    height: -o-calc(100% - 40px); /* Standard */
    height: calc(100% - 40px);
}

.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/

.DetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
</style>
<script>
import { dispatchingManagement } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            tableData: [], //检测项table数据
            searchName: "", // 查询条件
            TableHeight: {
                height: ""
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            multipleSelection: [],
            formLabelWidth: "120px",
            SparePartsVisible: false, // 出库弹框
            SparePartsform: {
                one: "", // 需求数量
                two: "", // 人员编号
                three: "" // 人员名称
            },
            activeName: "first",
            labelPosition: "right",
            SparePartsCard: {
                one: "",
                two: ""
            },
            needShow: false,
            isShow: true,
            rules: {
                one: [
                    { required: true, message: "请输入需求数量" },
                    { type: "number", message: "需求数量必须为数字值" }
                ],
                two: [
                    {
                        required: true,
                        message: "请输入人员编号",
                        trigger: "blur"
                    },
                    {
                        pattern: /^[^\u4e00-\u9fa5]|[A-Za-z]+$/,
                        message: "不允许输入中文和字母",
                        trigger: "blur"
                    },
                    {
                        pattern: /^[0-9]*$/,
                        message: "只可以输入数字",
                        trigger: "blur"
                    }
                ],
                three: [
                    {
                        required: true,
                        message: "请输入人员名称",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.ONlist();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 115 + "px";
        },
        //列表展示
        ONlist() {
            let that = this;
            let url = dispatchingManagement.GET_U_getSpareOutList;
            let data = {
                pageNum: that.nowPages,
                pageSize: that.pageSize,
                condetion: that.searchName
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.tableData = res.data.records;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.ONlist();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.ONlist();
        },
        //检查项查询
        ONTestItemQuery() {
            let that = this;
            that.nowPages = 1;
            that.ONlist();
        },
        // 获取点击时的数据
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
            } else {
                this.multipleSelection = val.pop(); //储存新的单选数据
            }
        },
        handleClick(tab) {
            console.log(tab);
            if (tab.name == "second") {
                this.needShow = true;
                this.isShow = false;
            } else if (tab.name == "first") {
                this.needShow = false;
                this.isShow = true;
            }
        },
        // 出库
        reassignment() {
            if (
                this.multipleSelection < 1 ||
                this.multipleSelection == undefined
            ) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning"
                });
            } else {
                this.SparePartsVisible = true;
                this.SparePartsCard.one = "";
                this.SparePartsCard.two = "";
                this.SparePartsform.one = "";
                this.SparePartsform.two = "";
                this.SparePartsform.three = "";
            }
        },
        SparePartsCardVisibleAdd(SparePartsCard) {
            this.$refs[SparePartsCard].validate(valid => {
                if (valid) {
                    let that = this;
                    let url =
                        dispatchingManagement.GET_U_addSpareOut +
                        "?cardNo=" +
                        this.SparePartsCard.two +
                        "&flag=" +
                        2;
                    let data = this.multipleSelection;
                    that.multipleSelection.stockNum = that.SparePartsCard.one;
                    that.axios
                        .post(url, data)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success"
                                });
                                this.ONlist();
                                this.SparePartsVisible = false;
                                this.$refs[SparePartsCard].resetFields();
                            } else {
                                that.$message({
                                    message: res.data.message,
                                    type: "error"
                                });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 确定
        SparePartsAddVisibleAdd(SparePartsform) {
            this.$refs[SparePartsform].validate(valid => {
                if (valid) {
                    let that = this;
                    let url =
                        dispatchingManagement.GET_U_addSpareOut +
                        "?cardNo=" +
                        this.SparePartsform.two +
                        "&flag=" +
                        1;
                    let data = this.multipleSelection;
                    that.multipleSelection.stockNum = that.SparePartsform.one;
                    that.multipleSelection.userCode = that.SparePartsform.two;
                    that.multipleSelection.userName = that.SparePartsform.three;
                    that.axios
                        .post(url, data)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success"
                                });
                                this.ONlist();
                                this.SparePartsVisible = false;
                                this.$refs[SparePartsform].resetFields();
                            } else {
                                that.$message({
                                    message: res.data.message,
                                    type: "error"
                                });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>
