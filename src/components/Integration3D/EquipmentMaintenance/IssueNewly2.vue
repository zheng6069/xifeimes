<template>
    <div class="container">
        <div class="IssueSearch">
            <el-form :inline="true" :model="IssueSearchform" class="demo-form-inline" size="medium">
                <el-form-item label="设备名称" class="item">
                    <el-input v-model="IssueSearchform.name" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="设备编号" class="item">
                    <el-input v-model="IssueSearchform.serialNumber" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="上报时间" class="item">
                    <el-date-picker
                        size="medium"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        v-model="IssueSearchform.time"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="维修状态" class="item">
                    <el-select v-model="IssueSearchform.status" placeholder="请选择" clearable>
                        <el-option label="已下发" value="5"></el-option>
                        <el-option label="未下发" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="
              nowPages = 1;
              OnQuery();
            "
                    >查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="Issue_contnet" :style="TableHeight">
            <div class="IssueContent_title">
                <div class="Issue_info">
                    <el-button
                        size="medium"
                        type="primary"
                        class="operation_bnt"
                        @click="OnIssue"
                    >下发</el-button>
                    <el-button
                        size="medium"
                        type="primary"
                        class="operation_bnt"
                        @click="OnModify"
                    >修改</el-button>
                </div>
            </div>
            <div class="Issue_contnet_table">
                <el-table
                    border
                    :data="QueryArr"
                    ref="multipleTable"
                    yan
                    张
                    海
                    萍
                    @selection-change="handleSelectionChange"
                    :highlight-current-row="true"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="60"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="facilityMainId" label="设备维修单号" width="180">
                        <template slot-scope="scope">
                            <span @click="IssuedResultsss(scope.row)" style="cursor: pointer;">{{scope.row.facilityMainId}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="facilityNum" label="设备编号"></el-table-column>
                    <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                    <el-table-column prop="station" label="设备位置"></el-table-column>
                    <el-table-column prop="mainType" label="故障类型" width="80"></el-table-column>
                    <el-table-column prop="mainTime" label="上报时间"></el-table-column>
                    <el-table-column prop="person" label="提交人员"></el-table-column>
                    <el-table-column prop="receiver" label="维修人员"></el-table-column>
                    <el-table-column prop="mainStatus" label="状态" width="80"></el-table-column>
                    <el-table-column label="操作" width="240">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
                                @click="IsLookExplain(scope.row)"
                            >查看说明文档</el-button>
                            <el-button
                                type="primary"
                                size="mini"
                                @click="IsLookFacility(scope.row)"
                            >查看设备文档</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="DetectPaging">
                <el-pagination
                    background
                    @size-change="PageSizeSwitch"
                    @current-change="OnPaging"
                    :page-size="pageSize"
                    :current-page="nowPages"
                    :page-sizes="[10, 50, 100, 200]"
                    layout="total,sizes, prev, pager, next, jumper"
                    :total="total"
                ></el-pagination>
            </div>
            <div class="Issuedescribe_title">
                <div class="Issuedescribe_title_left">
                    <div class="Issue_describetitle">工人问题描述</div>
                    <div class="textarea">
                        <el-input :disabled="true" type="textarea" v-model="describe"></el-input>
                    </div>
                </div>
                <!----------- 人员弹框 ------------->
                <el-dialog :visible.sync="personnelPopUp" width="30%">
                    <div style="height: 300px">
                        <el-table
                            border
                            :data="PersonnelArr"
                            height="100%"
                            style="width: 100%; height: 100%"
                            :header-row-style="{ height: '39px' }"
                            :header-cell-style="{ padding: '0px' }"
                            :row-style="{ height: '39px' }"
                            :cell-style="{ padding: '0px' }"
                            @selection-change="CheckPerson"
                        >
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column prop="personName" label="人员"></el-table-column>
                        </el-table>
                    </div>
                    <div class="dialog_footer">
                        <el-button
                            type="primary"
                            class="dialog_Close"
                            @click="OnIssuePreservation"
                        >保 存</el-button>
                    </div>
                </el-dialog>

                <!----------- 人员修改弹框 ------------->
                <el-dialog :visible.sync="ModifyPersonnelPopUp" width="30%">
                    <div style="height: 300px">
                        <el-table
                            border
                            :data="PersonnelUpdateArr"
                            height="100%"
                            style="width: 100%; height: 100%"
                            :header-row-style="{ height: '39px' }"
                            :header-cell-style="{ padding: '0px' }"
                            :row-style="{ height: '39px' }"
                            :cell-style="{ padding: '0px' }"
                            @selection-change="CheckPerson"
                        >
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column prop="personName" label="人员"></el-table-column>
                        </el-table>
                    </div>
                    <div class="dialog_footer">
                        <el-button
                            type="primary"
                            class="dialog_Close"
                            @click="OnModifyPreservation"
                        >保 存</el-button>
                    </div>
                </el-dialog>

                <!----------- 查看说明文档 ------------->
                <el-dialog :visible.sync="LookExplainument" width="70%">
                    <div style="height: 300px">
                        <el-table
                            border
                            :data="LookExplainumentArr"
                            height="100%"
                            style="width: 100%; height: 100%"
                            :header-row-style="{ height: '39px' }"
                            :header-cell-style="{ padding: '0px' }"
                            :row-style="{ height: '39px' }"
                            :cell-style="{ padding: '0px' }"
                        >
                            <el-table-column prop="fileName" label="文档名称"></el-table-column>
                            <el-table-column prop="url" label="路径"></el-table-column>
                            <el-table-column label="操作" width="120">
                                <template slot-scope="scope">
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="LookExplainSeeFile(scope.row)"
                                    >查看文档</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-dialog>
                <!----------- 查看设备文档 ------------->
                <el-dialog :visible.sync="LookFacilityument" width="70%">
                    <div style="height: 300px">
                        <el-table
                            border
                            :data="LookFacilityumentArr"
                            height="100%"
                            style="width: 100%; height: 100%"
                            :header-row-style="{ height: '39px' }"
                            :header-cell-style="{ padding: '0px' }"
                            :row-style="{ height: '39px' }"
                            :cell-style="{ padding: '0px' }"
                        >
                            <el-table-column prop="name" label="文档名称"></el-table-column>
                            <el-table-column prop="url" label="路径"></el-table-column>
                            <el-table-column label="操作" width="120">
                                <template slot-scope="scope">
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="LookFacilitySeeFile(scope.row)"
                                    >查看文档</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { ResourceManagement } from "../../../common/api";
export default {
    data() {
        return {
            IssueSearchform: {
                name: "", //设备名称
                serialNumber: "", //设备编号
                status: "", //维修状态
                time: "" //上报时间
            },

            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            QueryArr: [],
            QueryArrState: [
                {
                    name: "未下发",
                    id: "4"
                },
                {
                    name: "已下发",
                    id: "5"
                },
                {
                    name: "已接收",
                    id: "6"
                }
            ],

            describe: "", // 工人问题描述
            personnel: "", // 人员
            TableHeight: {
                height: ""
            },
            personnelPopUp: false,
            ModifyPersonnelPopUp: false,
            IssueTableData: [],
            multipleSelection: [],
            PersonnelArr: [],
            PersonnelUpdateArr: [],
            CheckPersonArr: [],
            WorkClothesID: "", //任务id
            LookExplainument: false, // 查看说明文档
            LookExplainumentArr: [],
            LookFacilityument: false, // 查看设备文档
            LookFacilityumentArr: []
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OnQuery();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 255 + "px";
        },
        // 查询
        OnQuery() {
            this.axios({
                method: "post",
                url: ResourceManagement.GET_B_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    facilityName: this.IssueSearchform.name, //设备名称
                    facilityNum: this.IssueSearchform.serialNumber, //设备编码
                    mainTime: this.IssueSearchform.time, //上报时间
                    mainStatus: this.IssueSearchform.status //状态
                }
            })
                .then(res => {
                    this.QueryArr = res.data.records;
                    this.total = res.data.total;
                    this.QueryArr.map(ite => {
                        this.QueryArrState.map(val => {
                            if (ite.mainStatus == val.id) {
                                ite.mainStatus = val.name;
                            }
                        });
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 点击调用右侧维修信息
        IssuedResultsss(row){
            console.log(row)
            this.$emit('func',row)
        },
        //切换每页展示多少条数据
        PageSizeSwitch(val) {
            this.pageSize = val;
            this.nowPages = 1;
            this.OnQuery();
        },
        // 分页
        OnPaging(val) {
            this.nowPages = val;
            this.OnQuery();
        },
        //下发
        OnIssue() {
            if (
                this.multipleSelection != 0 &&
                this.multipleSelection != undefined
            ) {
                if (this.multipleSelection.mainStatus != "已下发") {
                    this.personnelPopUp = true;
                    this.axios
                        .get(ResourceManagement.GET_B_findUserByRole, {
                            params: {
                                roleName: "维修工"
                            }
                        })
                        .then(res => {
                            if (res.data.success === false) {
                                this.$message({
                                    message: res.data.message,
                                    type: "error",
                                    duration: 1500
                                });
                            } else {
                                this.PersonnelArr = res.data;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.$message({
                        //失败后的提示
                        message: "请选择未下发的任务",
                        type: "warning",
                        duration: 1500
                    });
                }
            } else {
                this.$message({
                    //失败后的提示
                    message: "请选择要下发的任务",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //下发保存
        OnIssuePreservation() {
            this.axios({
                method: "post",
                url:
                    ResourceManagement.GET_B_Issue +
                    "?resourcesId=" +
                    this.WorkClothesID,
                data: this.CheckPersonArr
            })
                .then(res => {
                    if (res.data.success === true) {
                        this.$message({
                            //成功后的提示
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        this.personnelPopUp = false;
                        this.OnQuery();
                    } else {
                        this.$message({
                            //失败后的提示
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
        //勾选下发任务
        handleSelectionChange(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.multipleSelection = row.pop(); //储存新的单选数据
                if (this.multipleSelection != undefined) {
                    this.WorkClothesID = this.multipleSelection.resourcesId;
                    this.describe = this.multipleSelection.workRemarks;
                }
            }
        },
        //勾选人员
        CheckPerson(row) {
            this.CheckPersonArr = row;
        },
        //修改
        OnModify() {
            if (
                this.multipleSelection != 0 &&
                this.multipleSelection != undefined
            ) {
                if (this.multipleSelection.mainStatus != "未下发") {
                    this.ModifyPersonnelPopUp = true;
                    this.axios
                        .get(ResourceManagement.GET_B_findUserByRole, {
                            params: {
                                roleName: "维修工"
                            }
                        })
                        .then(res => {
                            if (res.data.success === false) {
                                this.$message({
                                    message: res.data.message,
                                    type: "error",
                                    duration: 1500
                                });
                            } else {
                                this.PersonnelUpdateArr = res.data;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.$message({
                        //失败后的提示
                        message: "请选择已下发的任务",
                        type: "warning",
                        duration: 1500
                    });
                }
            } else {
                this.$message({
                    //失败后的提示
                    message: "请选择要修改的任务",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //修改保存
        OnModifyPreservation() {
            this.axios({
                method: "post",
                url:
                    ResourceManagement.GET_B_modify +
                    "?resourcesId=" +
                    this.WorkClothesID,
                data: this.CheckPersonArr
            })
                .then(res => {
                    if (res.data.success === true) {
                        this.$message({
                            //成功后的提示
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        this.ModifyPersonnelPopUp = false;
                        this.OnQuery();
                    } else {
                        this.$message({
                            //失败后的提示
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
        // 查看说明文档
        IsLookExplain(row) {
            console.log(row);
            this.LookExplainument = true;
            this.axios
                .get(
                    ResourceManagement.GET_B_LookExplain +
                        "?resourcesId=" +
                        row.resourcesId
                )
                .then(res => {
                    this.LookExplainumentArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        LookExplainSeeFile(row) {
            window.open(row.url);
        },
        // 查看设备文档
        IsLookFacility(row) {
            this.LookFacilityument = true;
            this.axios
                .get(
                    ResourceManagement.GET_B_IsLookFacility +
                        "?resourcesId=" +
                        row.resourcesId
                )
                .then(res => {
                    this.LookFacilityumentArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        LookFacilitySeeFile(row) {
            window.open(row.url);
        }
    }
};
</script>

<style>
.IssueSearch .el-input {
    width: 150px;
}
.IssueSearch .item .el-form-item__label {
    font-size: 16px;
    color: #000000;
}
.container{
    padding: 10px;
}
.Issue_contnet {
    width: 100%;
}
.Issue_contnet_table {
    height: -moz-calc(100% - 60px); /* WebKit */
    height: -webkit-calc(100% - 60px); /* Opera */
    height: -o-calc(100% - 60px); /* Standard */
    height: calc(100% - 60px);
}
.Issuedescribe_title {
    height: 30px;
    margin-top: 10px;
}
.Issuedescribe_title_left {
    float: left;
    width: 100%;
    margin-bottom: 20px;
}
.Issuedescribe_title .Issue_describetitle {
    height: 30px;
    font-size: 12px;
    line-height: 30px;
}
.lssue_personnel {
    height: 53px;
}
.personnel_left {
    float: left;
    height: 53px;
}
.personnel_right {
    float: right;
    width: -moz-calc(100% - 150px); /* WebKit */
    width: -webkit-calc(100% - 150px); /* Opera */
    width: -o-calc(100% - 150px); /* Standard */
    width: calc(100% - 150px);
    height: 53px;
}
.personnel_right input {
    height: 53px;
}
.DetectPaging {
    height: 30px;
    margin-top: 5px;
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
</style>
