<template>
    <div class="Release_container">
        <div class="Release_Title">
            <!-- 查询 -->
            <el-form :inline="true" size="medium" class="demo-form-inline">
                <el-form-item label>
                    <el-input v-model="queryInfo" placeholder="登录名、姓名、部门" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="
              nowPages = 1;
              ReleaseStatusList();
            "
                    >查询</el-button>
                </el-form-item>
            </el-form>
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
                <el-table-column prop="nickname" label="姓名"></el-table-column>
                <el-table-column prop="username" label="登录名"></el-table-column>
                <el-table-column prop="department" label="部门"></el-table-column>
                <el-table-column prop="stationName" label="站位名称"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            @click.native="ReleaseStatusUpdata(scope.row)"
                        >修改</el-button>
                        <el-button
                            type="primary"
                            size="mini"
                            @click.native="ReleaseStatusLook(scope.row)"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="sizeChange"
                @current-change="currentChange"
                :page-size="pageSize"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
        <!--站位人员 弹框 -->
        <el-dialog :visible.sync="ReleaseStatusVisible" width="70%">
            <div class="tableStation">
                <!-- 左 -->
                <el-col :span="8" v-show="isShow">
                    资质信息
                    <el-table
                        :data="selectLeftArr"
                        border
                        ref="selectionLeft"
                        @selection-change="checkLeftAll"
                        height="300px"
                        style="width: 100%"
                        :header-row-style="{ height: '38px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '34px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column type="selection" width="60"></el-table-column>
                        <el-table-column prop="qualifications" label="资质"></el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="2" v-show="isShow">
                    <div class="opSetting">
                        <el-button
                            icon="el-icon-d-arrow-right"
                            :disabled="nowSelectLeftData.length ? false : true"
                            size="medium"
                            type="primary"
                            @click="handelSelect"
                        >选中</el-button>
                        <div class="spacing">
                            <el-button
                                icon="el-icon-d-arrow-left"
                                :disabled="nowSelectRightData.length ? false : true"
                                size="medium"
                                type="primary"
                                @click="handleRemoveSelect"
                            >取消</el-button>
                        </div>
                    </div>
                </el-col>
                <!-- 右 -->
                <el-col :span="14">
                    人员资质信息
                    <el-table
                        :data="selectRightArr"
                        border
                        ref="selectionRight"
                        height="300px"
                        @selection-change="checkRightAll"
                        style="width: 100%"
                        :header-row-style="{ height: '38px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '34px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column type="selection" width="60"></el-table-column>
                        <el-table-column prop="qualifications" label="资质"></el-table-column>
                        <el-table-column prop="qualificaLevel" label="资质等级">
                            <template slot-scope="scope">
                                <el-select
                                    size="mini"
                                    v-model="scope.row.qualificaLevel"
                                    placeholder="请选择"
                                    clearable
                                >
                                    <el-option
                                        v-for="item in optionOne"
                                        :key="item.maintainId"
                                        :label="item.maintainStatus"
                                        :value="item.maintainStatus"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="expireDate" label="有效期至">
                            <template slot-scope="scope">
                                <el-date-picker
                                    size="mini"
                                    v-model="scope.row.expireDate"
                                    type="date"
                                    placeholder="日期为必填项"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="ReleaseStatusVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAddDate" v-show="isShow">确 定</el-button>
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
.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
.opSetting {
    text-align: center;
    margin-top: 100px;
}
.spacing {
    margin-top: 10px;
}
.process_search {
    height: 40px;
}
.AdvanElasticFrame_top {
    overflow: hidden;
}
.tableStation {
    height: 300px;
}
.AdvanTesting {
    width: 280px;
    height: 40px;
    float: left;
    margin-left: 10px;
}
.AdvanTesting div {
    width: 200px;
    float: right;
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
            ReleaseStatusArr: [], //站位人员
            ReleaseStatusSelection: [],
            ReleaseStatusVisible: false, //站位人员-弹框
            ReleaseStatusform: {
                one: "", //站位人员名称
                two: "" // 所属产线
            },
            selectRightArr: [], // 右边列表
            selectLeftArr: [], // 左边列表
            processForm: {
                search: "" // 查询条件
            },
            nowSelectLeftData: [], // 左边选中列表数据
            nowSelectRightData: [], // 右边选中列表数据
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            queryInfo: "",
            updataRow: [],
            isShow: true,
            optionOne: []
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.ReleaseStatusList(); //站位人员
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 110 + "px";
        },
        // 资质等级维护 - 查询
        getOptionOneInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 15
                    }
                })
                .then(res => {
                    that.optionOne = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //站位人员 - 查询
        ReleaseStatusList() {
            let that = this;
            that.axios
                .post(BasicData.GET_T_selectQualificaInfo, {
                    pageNum: that.nowPages,
                    pageSize: that.pageSize,
                    searchName: that.queryInfo
                })
                .then(res => {
                    that.ReleaseStatusArr = res.data.records;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.ReleaseStatusList();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.ReleaseStatusList();
        },
        // 站位人员 - 修改
        ReleaseStatusUpdata(row) {
            this.updataRow = row;
            this.ReleaseStatusVisible = true;
            this.submitSearch();
            this.rightSearch();
            this.isShow = true;
        },
        //站位人员 - 查看
        ReleaseStatusLook(row) {
            this.updataRow = row;
            this.ReleaseStatusVisible = true;
            this.submitSearch();
            this.rightSearch();
            this.isShow = false;
        },
        // 左边 - 人员
        submitSearch() {
            let that = this;
            that.axios
                .post(BasicData.GET_T_selectQualificaList)
                .then(res => {
                    that.selectLeftArr = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        checkLeftAll(val) {
            this.nowSelectLeftData = val;
        },
        // 右边
        checkRightAll(val) {
            this.nowSelectRightData = val;
        },
        // 右边 - 人员查询
        rightSearch() {
            let that = this;
            that.axios
                .post(BasicData.GET_T_selectByUser, {
                    username: this.updataRow.username,
                    userCode: this.updataRow.userCode
                })
                .then(res => {
                    that.selectRightArr = res.data.list;
                    that.getOptionOneInfo();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 选中
        handelSelect() {
            let that = this;
            let addAry = that.nowSelectLeftData;
            addAry.map(item => {
                item.username = this.updataRow.username;
                item.nickname = this.updataRow.nickname;
                item.stationName = this.updataRow.stationName;
                item.userCode = this.updataRow.userCode;
                item.department = this.updataRow.department;
            });
            that.axios
                .post(
                    BasicData.GET_T_updateQualificaInfo + "?checkFlag=" + 1,
                    addAry
                )
                .then(res => {
                    if (res.data.success == true) {
                        this.$message({
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        this.$refs.selectionLeft.clearSelection();
                        this.rightSearch();
                    } else {
                        this.$message({
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
        // 取消
        handleRemoveSelect() {
            let that = this;
            let aryList = [];
            that.nowSelectRightData.map(it => {
                aryList.push(it.qualificaId);
            });
            that.axios
                .post(BasicData.GET_T_deletePersonInfo, aryList)
                .then(res => {
                    if (res.data.success == true) {
                        this.$message({
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        this.$refs.selectionLeft.clearSelection();
                        this.rightSearch();
                    } else {
                        this.$message({
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
        // 保存
        saveAddDate() {
            let _that = this;
            if (this.nowSelectRightData < 1) {
                _that.$message({
                    message: "请选择人员资质信息",
                    type: "warning",
                    duration: 1500
                });
            } else {
                _that.axios
                    .post(
                        BasicData.GET_T_updateQualificaInfo + "?checkFlag=" + 2,
                        _that.nowSelectRightData
                    )
                    .then(res => {
                        if (res.data.success == true) {
                            _that.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            _that.$refs.selectionLeft.clearSelection();
                            _that.ReleaseStatusVisible = false;
                            _that.rightSearch();
                        } else {
                            _that.$message({
                                message: res.data.message,
                                type: "error",
                                duration: 1500
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
};
</script>
