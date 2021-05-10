<template>
    <div class="container">
        <div class="Detaile_head">
            <span class="remark_title">备注：棕色-已派工，蓝色-已开工，紫色-已拆解，黄色-已暂停，绿色-已完工</span>
            <el-button size="medium" type="primary" class="Detaile_bnt" @click="OnReturn">返回</el-button>
        </div>
        <div class="Detaile_tab">
            <el-tabs type="border-card">
                <el-tab-pane label="生产过程信息">
                    <div class="Detaile_head">
                        <div class="Detaile_head_left">
                            <div>
                                <el-input
                                    v-model="DrawingNo"
                                    size="medium"
                                    placeholder="名称、编号"
                                    clearable
                                ></el-input>
                            </div>
                        </div>
                        <el-button
                            size="medium"
                            type="primary"
                            class="Detaile_Bnt"
                            @click="
                nowPages = 1;
                OnMissingParts();
              "
                        >查询</el-button>
                    </div>
                    <div class="Detaile_contnet" :style="TableHeight">
                        <div class="Detaile_contnet_table Detaile_css">
                            <el-table
                                border
                                :data="ProcessInformation"
                                :row-class-name="tableRowClassName"
                                height="100%"
                                style="width: 100%; height: 100%"
                                :header-row-style="{ height: '39px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '39px' }"
                                :cell-style="{ padding: '0px' }"
                            >
                                <el-table-column type="index" label="序号" width="60"></el-table-column>
                                <el-table-column prop="orderName" label="指令单号"></el-table-column>
                                <el-table-column prop="instructName" label="指令名称"></el-table-column>
                                <el-table-column prop="instructNum" label="指令编号"></el-table-column>
                                <el-table-column prop="createByName" label="派工人" width="120"></el-table-column>
                                <el-table-column prop="createTime" label="派工时间"></el-table-column>
                                <el-table-column prop="workStartTime" label="指令开始时间"></el-table-column>
                                <el-table-column prop="workDate" label="指令结束时间"></el-table-column>
                                <el-table-column label="操作" width="320">
                                    <template slot-scope="scope">
                                        <el-button
                                            type="primary"
                                            size="mini"
                                            @click="OnParameter(scope.$index, scope.row)"
                                        >参数表信息</el-button>
                                        <el-button
                                            type="primary"
                                            size="mini"
                                            @click="OnInsert(scope.$index, scope.row)"
                                        >装入件信息</el-button>
                                        <el-button
                                            type="primary"
                                            size="mini"
                                            @click="OnReportWork(scope.$index, scope.row)"
                                        >报工信息</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="Detaile_DetectPaging">
                            <el-pagination
                                background
                                @size-change="handleSizeChange"
                                @current-change="OnPaging"
                                :current-page="nowPages"
                                :page-size="pageSize"
                                :page-sizes="[10, 50, 100, 200]"
                                layout="total,sizes, prev, pager, next, jumper"
                                :total="total"
                            ></el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="质量信息">
                    <div class="Detaile_contnet" :style="TableHeight">
                        <div class="Detaile_contnet_table">
                            <el-table
                                border
                                :data="Processnformation"
                                height="100%"
                                style="width: 100%; height: 100%"
                                :header-row-style="{ height: '39px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '39px' }"
                                :cell-style="{ padding: '0px' }"
                            >
                                <el-table-column type="index" label="序号" width="60"></el-table-column>
                                <el-table-column prop="abnormalNum" label="质量记载单号"></el-table-column>
                                <el-table-column prop="serialNumber" label="合格证号"></el-table-column>
                                <el-table-column prop="responsibleUnit" label="责任单位"></el-table-column>
                                <el-table-column prop="errorCode" label="故障代码"></el-table-column>
                                <el-table-column
                                    label="问题描述"
                                    prop="description"
                                    :show-overflow-tooltip="true"
                                >
                                    <template slot-scope="{ row }">
                                        <span>{{ row.description }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="groupResult" label="处理意见"></el-table-column>
                                <el-table-column prop="person" label="提交人" width="110"></el-table-column>
                                <el-table-column prop="abTime" label="提交时间"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 装入件信息 -->
        <el-dialog :visible.sync="ElasticFrame" width="80%">
            <div class="ParameterBox">
                <el-table border :data="InsertArr" height="100%" style="width: 100%; height: 100%">
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="materialName" label="装入件名称"></el-table-column>
                    <el-table-column prop="drawNo" label="装入件图号"></el-table-column>
                    <el-table-column prop="productNum" label="数量" width="100"></el-table-column>
                    <el-table-column prop="specificationModel" label="规格"></el-table-column>
                    <el-table-column prop="certificateNo" label="合格证号"></el-table-column>
                    <el-table-column prop="producerUnit" label="生产厂商"></el-table-column>
                </el-table>
            </div>
            <div class="dialog_footer">
                <el-button class="dialog_Close" @click="close">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 报工信息 -->
        <el-dialog :visible.sync="ReportWorkFrame" width="80%">
            <div class="ParameterBox">
                <el-table
                    border
                    :data="ReportWorkFrametArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                >
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="stepSerial" label="工步编号"></el-table-column>
                    <el-table-column prop="stepName" label="工步名称"></el-table-column>
                    <el-table-column prop="workCheck" label="报工人"></el-table-column>
                    <el-table-column prop="workDate" label="报工时间"></el-table-column>
                    <el-table-column prop="mutualCheck" label="互检人"></el-table-column>
                    <el-table-column prop="specialCheck" label="专检人"></el-table-column>
                    <el-table-column prop="specialCheckDate" label="专检时间"></el-table-column>
                    <el-table-column prop="userPresent" label="适航代表"></el-table-column>
                </el-table>
            </div>
            <div class="dialog_footer">
                <el-button class="dialog_Close" @click="close">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { dispatchingManagement } from "../../../common/api";
export default {
    data() {
        return {
            wsid: this.$route.query.wsid, //接收参数
            DrawingNo: "", //图号
            ElasticFrame: false, //是否隐藏弹框
            ProcessInformation: [], //生产过程信息
            Processnformation: [], //质量信息
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            TableHeight: {
                height: ""
            },
            InsertArr: [], //装入件
            ReportWorkFrametArr: [], //报工信息
            ReportWorkFrame: false
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OnMissingParts();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 210 + "px";
        },
        //缺件查看
        OnMissingParts() {
            this.axios({
                method: "post",
                url: dispatchingManagement.GET_J_QuerytAssemblyInformation,
                data: {
                    page: this.nowPages, //当前页
                    limit: this.pageSize, //每页多少条
                    wsid: this.wsid, //工单号
                    condition: this.DrawingNo //订单号
                }
            })
                .then(res => {
                    this.ProcessInformation = res.data.responseVos;
                    this.Processnformation = res.data.qualities;
                    this.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //切换每页展示多少条数据
        handleSizeChange(val) {
            this.pageSize = val;
            this.OnMissingParts();
        },
        //分页
        OnPaging(val) {
            this.nowPages = val;
            this.OnMissingParts();
        },
        //参数表信息
        OnParameter(index, row) {
            this.$router.push({
                path: "parameter",
                query: {
                    instructId: row.instructId,
                    instructionId: row.instructionId,
                    wsid: this.wsid
                }
            });
        },
        //装入件信息
        OnInsert(index, row) {
            this.axios
                .get(dispatchingManagement.GET_J_QueryInsert, {
                    params: {
                        orderId: row.orderId,
                        instructId: row.instructId
                    }
                })
                .then(res => {
                    this.InsertArr = res.data;
                    this.ElasticFrame = true;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 报工信息
        OnReportWork(index, row) {
            this.ReportWorkFrame = true;
            this.axios
                .get(dispatchingManagement.GET_J_findReport, {
                    params: {
                        instructionId: row.instructionId
                    }
                })
                .then(res => {
                    this.ReportWorkFrametArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
            console.log(row);
        },
        // 显示是否派工
        tableRowClassName({ row }) {
            if (row.status === 1) {
                //  已派工
                return "brown-row";
            } else if (row.status === 2) {
                // 已开工
                return "blue-row";
            } else if (row.status === 3) {
                // 已完工
                return "green-row";
            } else if (row.status === 4) {
                // 已拆解
                return "purple-row";
                // 工单 指令 暂停
            } else if (row.status === 5 || row.status === 6) {
                return "yellow-row";
            }
            return "";
        },
        //关闭
        close() {
            this.ElasticFrame = false;
            this.ReportWorkFrame = false;
        },
        //返回
        OnReturn() {
            this.$router.push({
                path: "AssemblyProcessTracking"
            });
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
.container {
    width: 100%;
    height: 100%;
}
.Detaile_head {
    height: 60px;
    overflow: hidden;
}
.Detaile_head_left {
    width: 220px;
    margin-top: 10px;
    float: left;
}
.Detaile_head_left p {
    width: 40px;
    float: left;
    line-height: 36px;
}
.Detaile_head_left div {
    width: 220px;
    float: left;
}
.Detaile_head_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}

.Detaile_operation {
    height: 50px;
}
.Detaile_operation_nei {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.ParameterBox {
    height: 300px;
}
.dialog_footer {
    height: 30px;
    margin-top: 10px;
}
.dialog_Preservation {
    float: right;
    margin-right: 10px;
}
.dialog_Close {
    float: right;
}
.Detaile_tab {
    padding: 0px 10px;
}
.Detaile_contnet {
    width: 100%;
}
.Detaile_contnet_table {
    height: 100%;
}
.Detaile_css {
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
.remark_title {
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    margin-left: 10px;
}
.Detaile_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}
.Detaile_Bnt {
    margin-top: 10px;
    margin-left: 10px;
}
.Detaile_DetectPaging {
    height: 30px;
    margin-top: 5px;
    margin-left: -10x;
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