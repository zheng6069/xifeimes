<template>
    <div class="Release_container">
        <div class="Release_Title">
            <el-button size="medium" type="primary" @click="ReleaseStatusAdd">新增</el-button>
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
                <el-table-column prop="stationName" label="站位名称"></el-table-column>
                <el-table-column prop="produceLine" label="所属产线"></el-table-column>
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

        <!--站位人员 弹框 -->
        <el-dialog :visible.sync="ReleaseStatusVisible" width="70%">
            <div class="AdvanElasticFrame_top">
                <el-form :model="ReleaseStatusform">
                    <el-form-item label="站位名称" class="AdvanTesting">
                        <el-select
                            :disabled="disabled"
                            size="medium"
                            v-model="ReleaseStatusform.one"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionsFour"
                                :key="item.warehouseId"
                                :label="item.warehouseName"
                                :value="item.warehouseName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属产线" class="AdvanTesting">
                        <el-select
                            size="medium"
                            v-model="ReleaseStatusform.two"
                            placeholder="请选择"
                            :disabled="disabled"
                        >
                            <el-option
                                v-for="item in optionThree"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="process_search" v-show="isShow">
                <el-form :inline="true" :model="processForm">
                    <el-form-item label="组织机构">
                        <el-select
                            size="mini"
                            v-model="processForm.organization"
                            placeholder="请选择"
                            :disabled="disabled"
                            clearable
                            @change="getCouponSelected($event)"
                        >
                            <el-option
                                v-for="item in optionOrganization"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tableStation">
                <!-- 左 -->
                <el-col :span="11" v-show="isShow">
                    人员信息
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
                        <el-table-column prop="nickname" label="姓名"></el-table-column>
                        <el-table-column prop="username" label="登录名"></el-table-column>
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
                <el-col :span="11">
                    站位人员信息
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
                        <el-table-column prop="nickname" label="姓名"></el-table-column>
                        <el-table-column prop="username" label="登录名"></el-table-column>
                    </el-table>
                </el-col>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="ReleaseStatusVisible = false">取 消</el-button>
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
                search: "", // 查询条件
                organization: ""
            },
            nowSelectLeftData: [], // 左边选中列表数据
            nowSelectRightData: [], // 右边选中列表数据
            optionThree: [], // 设备所属产线
            optionsFour: [], // 站位名称
            isShow: true,
            disabled: false,
            optionOrganization: [],
            modelName: ""
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
            this.TableHeight.height = window.innerHeight - 60 + "px";
        },
        // 查询所属产线
        getOptionThreeInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 4
                    }
                })
                .then(res => {
                    that.optionThree = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询组织机构
        optionOrganizationList() {
            let that = this;
            that.axios
                .post(BasicData.GET_U_selectDepartmentInfo)
                .then(res => {
                    that.optionOrganization = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询站位名称
        getoptionsFourInfo() {
            let that = this;
            that.axios
                .post(BasicData.GET_Z_findAllWarehouse)
                .then(res => {
                    that.optionsFour = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //站位人员 - 查询
        ReleaseStatusList() {
            let that = this;
            that.axios
                .post(BasicData.GET_U_selectPersonInfo)
                .then(res => {
                    that.ReleaseStatusArr = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //站位人员 - 新增
        ReleaseStatusAdd() {
            this.ReleaseStatusVisible = true;
            this.getOptionThreeInfo();
            this.getoptionsFourInfo();
            this.optionOrganizationList();
            this.submitSearch();
            this.ReleaseStatusform.one = "";
            this.ReleaseStatusform.two = "";
            this.processForm.search = "";
            this.processForm.organization = "";
            this.selectRightArr = [];
            this.isShow = true;
            this.disabled = false;
        },
        // 站位人员 - 修改
        ReleaseStatusUpdata(row) {
            this.ReleaseStatusVisible = true;
            this.ReleaseStatusform.one = row.stationName;
            this.ReleaseStatusform.two = row.produceLine;
            this.processForm.search = "";
            this.processForm.organization = "";
            this.getOptionThreeInfo();
            this.getoptionsFourInfo();
            this.optionOrganizationList();
            this.submitSearch();
            this.rightSearch();
            this.isShow = true;
            this.disabled = false;
        },
        //站位人员 - 查看
        ReleaseStatusLook(row) {
            this.ReleaseStatusVisible = true;
            this.ReleaseStatusform.one = row.stationName;
            this.ReleaseStatusform.two = row.produceLine;
            this.getOptionThreeInfo();
            this.optionOrganizationList();
            this.rightSearch();
            this.isShow = false;
            this.disabled = true;
        },
        getCouponSelected(id) {
            let that = this;
            that.axios
                .post(BasicData.GET_U_selectUserInfo, {
                    username: this.processForm.search,
                    departId: this.processForm.organization
                })
                .then(res => {
                    that.selectLeftArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
            // 获取name
            let obj = {};
            obj = this.optionOrganization.find(item => {
                //model就是上面的数据源
                return item.id === id; //筛选出匹配数据
            });
            this.modelName = obj.name;
        },
        // 左边 - 人员查询
        submitSearch() {
            let that = this;
            that.axios
                .post(BasicData.GET_U_selectAllUserInfo)
                .then(res => {
                    that.selectLeftArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 右边 - 人员查询
        rightSearch() {
            let that = this;
            that.axios
                .post(BasicData.GET_U_selectByStation, {
                    stationName: that.ReleaseStatusform.one,
                    produceLine: that.ReleaseStatusform.two
                })
                .then(res => {
                    that.selectRightArr = res.data.list;
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
        // 选中
        handelSelect() {
            if (
                this.ReleaseStatusform.one == "" ||
                this.ReleaseStatusform.two == ""
            ) {
                this.$message({
                    message: "站位名称和所属产线不能为空",
                    type: "warning",
                    duration: 1500
                });
            } else {
                let that = this;
                let addAry = that.nowSelectLeftData;
                addAry.map(item => {
                    item.stationName = this.ReleaseStatusform.one;
                    item.produceLine = this.ReleaseStatusform.two;
                    item.department = this.modelName;
                });
                that.axios
                    .post(BasicData.GET_U_addPersonInfo, addAry)
                    .then(res => {
                        if (res.data.success == true) {
                            this.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            this.$refs.selectionLeft.clearSelection();
                            this.rightSearch();
                            this.ReleaseStatusList();
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
            }
        },
        // 取消
        handleRemoveSelect() {
            let that = this;
            let aryList = [];
            that.nowSelectRightData.map(it => {
                aryList.push(it.personStationId);
            });
            that.axios
                .post(BasicData.GET_U_deletePersonInfo, aryList)
                .then(res => {
                    if (res.data.success == true) {
                        this.$message({
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        this.$refs.selectionLeft.clearSelection();
                        this.rightSearch();
                        this.ReleaseStatusList();
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
        }
    }
};
</script>
