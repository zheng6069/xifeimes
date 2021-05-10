<template>
    <div>
        <div class="It_head">
            <div class="It_head_left">
                <p>架次号</p>
                <el-input v-model="daProductName" size="medium" clearable placeholder="请输入"></el-input>
            </div>
            <div class="It_head_left">
                <p>站位名称</p>
                <el-input v-model="daProductDrawing" size="medium" clearable placeholder="请输入"></el-input>
            </div>
            <div class="It_head_left">
                <p>状态</p>
                <el-select v-model="daJobNumber" placeholder="请选择状态" size="medium" clearable>
                    <el-option label="未派" value="0"></el-option>
                    <el-option label="已派" value="1"></el-option>
                    <el-option label="改派" value="2"></el-option>
                </el-select>
            </div>
            <el-button size="medium" type="primary" class="It_head_bnt" @click="ONTestItemQuery">查询</el-button>
        </div>
        <div class="It_contnet" :style="TableHeight">
            <div class="It_title">
                <div class="ItBox_title">工单信息（备注：棕色-未派，蓝色-已派，绿色-改派）</div>
                <div class="ItBox_info">
                    <el-button
                        size="mini"
                        type="primary"
                        class="operation_bnt"
                        @click="reassignment"
                    >分派/改派</el-button>
                </div>
            </div>
            <div class="It_contnet_table">
                <el-table
                    border
                    :data="tableData"
                    :row-class-name="ClassName"
                    @selection-change="handleSelectionChange"
                    ref="multipleTable"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="workNo" label="工单号"></el-table-column>
                    <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                    <el-table-column prop="stationName" label="站位名称"></el-table-column>
                    <el-table-column prop="instructNo" label="指令号"></el-table-column>
                    <el-table-column prop="instructName" label="指令名称"></el-table-column>
                    <el-table-column prop="checkUser" label="检验员"></el-table-column>
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

        <!-- 检验员弹框 -->
        <el-dialog :visible.sync="ItStatusVisible" width="30%">
            <el-form :model="ItStatusform">
                <el-form-item label="检验员名称" :label-width="formLabelWidth">
                    <el-select
                        size="medium"
                        v-model="ItStatusform.one"
                        placeholder="请选择"
                        @change="getOptionNameSelected($event)"
                    >
                        <el-option
                            v-for="item in optionName"
                            :key="item.nickname"
                            :label="item.nickname"
                            :value="item.nickname"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="检验员登录名" :label-width="formLabelWidth">
                    <el-input v-model="ItStatusform.two" disabled style="width: 217px" placeholder></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ItStatusVisible = false">取 消</el-button>
                <el-button type="primary" @click="ItStatusAddVisibleAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.It_head {
    height: 60px;
    overflow: hidden;
}
.It_head_left {
    width: 240px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.It_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.It_head_left div {
    width: 170px;
    float: left;
}
.It_head_bnt {
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
}
.It_contnet {
    width: 100%;
}
.It_title {
    height: 30px;
    overflow: hidden;
}
.It_title .ItBox_title {
    float: left;
    text-indent: 10px;
    font-size: 12px;
    line-height: 30px;
}
.It_title .ItBox_info {
    float: right;
    font-size: 12px;
    margin-right: 10px;
}
.It_contnet_table {
    padding: 0px 10px;
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
.DetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}
.el-table .blue-row {
    background: rgba(0, 204, 255, 0.2);
}
.el-table .red-row {
    background: rgba(255, 0, 0, 0.2);
}
.el-table .brown-row {
    background: rgba(163, 129, 19, 0.2);
}
.el-table .green-row {
    background: rgba(50, 248, 0, 0.2);
}
.el-table .yellow-row {
    background: rgba(230, 247, 2, 0.2);
}
.el-table .purple-row {
    background: rgba(247, 2, 214, 0.2);
}
</style>
<script>
import { AutomaticScheduling } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    name: "Start",
    data() {
        return {
            tableData: [], //检测项table数据
            daJobNumber: null, // 状态
            daProductDrawing: "", // 站位名称
            daProductName: "", // 架次号查询
            TableHeight: {
                height: ""
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            multipleSelection: [],
            formLabelWidth: "120px",
            ItStatusVisible: false, // 检验员弹框
            ItStatusform: {
                one: "", // 检验员名称
                two: "" // 检验员登录名
            },
            optionName: [],
            code: ""
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
            let url = AutomaticScheduling.GET_U_findAllTask;
            let data = {
                pageNum: that.nowPages,
                pageSize: that.pageSize,
                checkStatus: parseInt(that.daJobNumber),
                stationName: that.daProductDrawing,
                sortieNo: that.daProductName
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
        // 状态区分
        ClassName({ row }) {
            if (row.checkStatus === 0) {
                return "brown-row"; // 未派
            } else if (row.checkStatus === 1) {
                return "blue-row"; // 已派
            } else if (row.checkStatus === 2) {
                return "green-row"; // 改派
            }
            return "";
        },
        // 时间转换
        dateFormat(row, column, cellValue) {
            return cellValue
                ? fecha.format(new Date(cellValue), "yyyy-MM-dd")
                : "";
        },
        //检查项查询
        ONTestItemQuery() {
            this.nowPages = 1;
            this.ONlist();
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
        // 查询所有检验员
        getOptionName() {
            let that = this;
            that.axios
                .get(AutomaticScheduling.GET_U_selectUserByRoleName, {
                    params: {
                        roleName: "检验员"
                    }
                })
                .then(res => {
                    that.optionName = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getOptionNameSelected(nickname) {
            // 获取name
            let obj = {};
            obj = this.optionName.find(item => {
                //model就是上面的数据源
                return item.nickname === nickname; //筛选出匹配数据
            });
            this.ItStatusform.two = obj.username;
            this.code = obj.cardNo;
        },
        // 派工/改派
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
                this.ItStatusVisible = true;
                this.getOptionName();
                this.ItStatusform.one = "";
                this.ItStatusform.two = "";
            }
        },
        // 确定
        ItStatusAddVisibleAdd() {
            let that = this;
            let url = AutomaticScheduling.GET_U_updateCheckUser;
            let data = {
                checkTaskId: that.multipleSelection.checkTaskId,
                checkUser: that.multipleSelection.checkUser,
                userName: that.ItStatusform.one,
                userCode: that.code
            };
            that.axios
                .post(url, data)
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: res.data.message,
                            type: "success"
                        });
                        this.ONlist();
                        this.ItStatusVisible = false;
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
        }
    }
};
</script>
