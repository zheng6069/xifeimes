<template>
    <div class="container">
        <div class="Short_tab">
            <el-tabs type="border-card" @tab-click="handleClick">
                <el-tab-pane label="工装信息">
                    <div class="Storage_title">
                        <div class="Storage_head">
                            <p>
                                <i class="el-icon-full-screen"></i>
                            </p>
                            <div>
                                <el-input
                                    v-model="PublicListSearch"
                                    size="medium"
                                    placeholder="请输入或扫描编号"
                                    clearable
                                ></el-input>
                            </div>
                        </div>
                        <el-button size="medium" type="primary" @click="PublicListInfo">查询</el-button>
                    </div>
                    <div class="Materia_contnet" :style="TableHeight">
                        <div class="Materia_contnet_table">
                            <el-table
                                border
                                :data="StructuralMember"
                                height="100%"
                                style="width: 100%; height: 100%"
                                :header-row-style="{ height: '39px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '39px' }"
                                :cell-style="{ padding: '0px' }"
                            >
                                <el-table-column type="index" label="序号" width="60"></el-table-column>
                                <el-table-column prop="species" label="工装类型"></el-table-column>
                                <el-table-column prop="product" label="工装图号"></el-table-column>
                                <el-table-column prop="name" label="工装名称"></el-table-column>
                                <el-table-column prop="dataNumber" label="工装编号"></el-table-column>
                                <el-table-column prop="expirationDate" label="有效期至"></el-table-column>
                                <el-table-column prop="project" label="项目"></el-table-column>
                                <el-table-column prop="status" label="状态"></el-table-column>
                                <el-table-column prop="useName" label="借用人"></el-table-column>
                                <el-table-column prop="useStation" label="借用站位"></el-table-column>
                                <el-table-column label="操作" width="200">
                                    <template slot-scope="scope">
                                        <el-button
                                            type="primary"
                                            size="mini"
                                            v-show="scope.row.status != '使用中'"
                                            @click.native="ToolingOccupy(scope.row)"
                                        >借用</el-button>
                                        <el-button
                                            type="primary"
                                            size="mini"
                                            v-show="scope.row.status != '闲置中'"
                                            @click.native="ToolingRelease(scope.row)"
                                        >归还</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="设备信息">
                    <div class="Storage_title">
                        <div class="Storage_head">
                            <p>
                                <i class="el-icon-full-screen"></i>
                            </p>
                            <div>
                                <el-input
                                    v-model="FacilityListSearch"
                                    size="medium"
                                    placeholder="请输入"
                                    clearable
                                ></el-input>
                            </div>
                        </div>
                        <el-button size="medium" type="primary" @click="FacilityListInfo">查询</el-button>
                    </div>
                    <div class="Materia_contnet" :style="TableHeight">
                        <div class="Materia_contnet_table">
                            <el-table
                                border
                                :data="StandardParts"
                                height="100%"
                                style="width: 100%; height: 100%"
                                :header-row-style="{ height: '39px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '39px' }"
                                :cell-style="{ padding: '0px' }"
                            >
                                <el-table-column type="index" label="序号" width="60"></el-table-column>
                                <el-table-column prop="species" label="设备类型"></el-table-column>
                                <el-table-column prop="name" label="设备名称"></el-table-column>
                                <el-table-column prop="facilityModel" label="设备型号"></el-table-column>
                                <el-table-column prop="dataNumber" label="设备编号"></el-table-column>
                                <el-table-column prop="status" label="状态"></el-table-column>
                                <el-table-column prop="useName" label="借用人"></el-table-column>
                                <el-table-column prop="useStation" label="借用站位"></el-table-column>
                                <el-table-column label="操作" width="200">
                                    <template slot-scope="scope">
                                        <el-button
                                            type="primary"
                                            size="mini"
                                            v-show="scope.row.status != '使用中'"
                                            @click.native="FacilityOccupy(scope.row)"
                                        >借用</el-button>
                                        <el-button
                                            type="primary"
                                            size="mini"
                                            v-show="scope.row.status != '闲置中'"
                                            @click.native="FacilityRelease(scope.row)"
                                        >归还</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="工（量）具信息">
                    <div class="Storage_title">
                        <div class="Storage_head">
                            <p>
                                <i class="el-icon-full-screen"></i>
                            </p>
                            <div>
                                <el-input
                                    v-model="measurListSearch"
                                    size="medium"
                                    placeholder="请输入"
                                    clearable
                                ></el-input>
                            </div>
                        </div>
                        <el-button size="medium" type="primary" @click="measurListInfo">查询</el-button>
                    </div>
                    <div class="Materia_contnet" :style="TableHeight">
                        <div class="Materia_contnet_table">
                            <el-table
                                border
                                :data="MeasurParts"
                                height="100%"
                                style="width: 100%; height: 100%"
                                :header-row-style="{ height: '39px' }"
                                :header-cell-style="{ padding: '0px' }"
                                :row-style="{ height: '39px' }"
                                :cell-style="{ padding: '0px' }"
                            >
                                <el-table-column type="index" label="序号" width="60"></el-table-column>
                                <el-table-column prop="species" label="工（量）具类型"></el-table-column>
                                <el-table-column prop="name" label="工（量）具名称"></el-table-column>
                                <el-table-column prop="facilityModel" label="型号"></el-table-column>
                                <el-table-column prop="product" label="图号"></el-table-column>
                                <el-table-column prop="qualified" label="合格证"></el-table-column>
                                <el-table-column prop="status" label="状态"></el-table-column>
                                <el-table-column prop="useName" label="借用人"></el-table-column>
                                <el-table-column prop="useStation" label="借用站位"></el-table-column>
                                <el-table-column label="操作" width="200">
                                    <template slot-scope="scope">
                                        <el-button
                                            type="primary"
                                            size="mini"
                                            v-show="scope.row.status != '使用中'"
                                            @click.native="measurOccupy(scope.row)"
                                        >借用</el-button>
                                        <el-button
                                            type="primary"
                                            size="mini"
                                            v-show="scope.row.status != '闲置中'"
                                            @click.native="measurRelease(scope.row)"
                                        >归还</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 借用弹框 -->
        <el-dialog title :visible.sync="ToolingdialogFormVisible" width="30%">
            <el-tabs type="card" v-model="activeName" @tab-click="ToolingHandleClick">
                <el-tab-pane label="刷卡" name="first">
                    <div class="imgCon"></div>
                    <el-form
                        :label-position="labelPosition"
                        label-width="80px"
                        :model="ToolingCard"
                    >
                        <el-form-item label class="transparent">
                            <el-input
                                v-model="ToolingCard.num"
                                ref="ToolingCard"
                                @change="ToolingCardInput"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="刷卡卡号" v-show="false">
                            <el-input style="width:220px;"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="手输" name="second">
                    <el-form :model="Tooling" :rules="rules" ref="Tooling">
                        <el-form-item label="人员编号" label-width="120px" prop="number">
                            <el-input
                                v-model="Tooling.number"
                                placeholder="请输入"
                                autocomplete="off"
                                style="width:220px;"
                                clearable
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="人员名称" label-width="120px" prop="name">
                            <el-input
                                v-model="Tooling.name"
                                placeholder="请输入"
                                autocomplete="off"
                                style="width:220px;"
                                clearable
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer" v-show="ToolingShow">
                <el-button @click="ToolingdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="ToolingSave('Tooling')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 归还弹框 -->
        <el-dialog title :visible.sync="FacilitydialogFormVisible" width="30%">
            <el-tabs type="card" v-model="FacilityName" @tab-click="FacilityHandleClick">
                <el-tab-pane label="刷卡" name="Third">
                    <div class="imgCon"></div>
                    <el-form
                        :label-position="labelPosition"
                        label-width="80px"
                        :model="FacilityCard"
                    >
                        <el-form-item label class="transparent">
                            <el-input
                                v-model="FacilityCard.num"
                                placeholder="请刷卡"
                                ref="FacilityCard"
                                @change="FacilityCardInput"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="刷卡卡号" v-show="false">
                            <el-input style="width:220px;"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="手输" name="Fourth">
                    <el-form :model="Facility" :rules="rules" ref="Facility">
                        <el-form-item label="人员编号" label-width="120px" prop="number">
                            <el-input
                                v-model="Facility.number"
                                placeholder="请输入"
                                autocomplete="off"
                                style="width:220px;"
                                clearable
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="人员名称" label-width="120px" prop="name">
                            <el-input
                                v-model="Facility.name"
                                placeholder="请输入"
                                autocomplete="off"
                                style="width:220px;"
                                clearable
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer" v-show="FacilityShow">
                <el-button @click="FacilitydialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="FacilitySave('Facility')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { ResourceManagement } from "../../../common/api";
export default {
    data() {
        return {
            activeName: "first",
            FacilityName: "Third",
            labelPosition: "right",
            PublicListSearch: "",
            StructuralMember: [], //工装信息
            FacilityListSearch: "",
            StandardParts: [], //设备信息
            measurListSearch: "",
            MeasurParts: [], //工量具信息
            TableHeight: {
                height: ""
            },
            ToolingdialogFormVisible: false, // 借用弹框
            Tooling: {
                name: "",
                number: ""
            },
            FacilitydialogFormVisible: false, // 归还弹框
            Facility: {
                name: "",
                number: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入人员姓名",
                        trigger: "blur"
                    }
                ],
                number: [
                    {
                        required: true,
                        message: "请输入人员编号",
                        trigger: "blur"
                    },
                    {
                        pattern: /^[0-9]*$/,
                        message: "只可以输入数字",
                        trigger: "blur"
                    }
                ]
            },
            ToolingShow: false,
            ToolingCard: {
                num: ""
            },
            FacilityShow: false,
            FacilityCard: {
                num: ""
            },
            ToolingOccupyArr: {}, // 借用
            ToolingReleaseArr: {}, // 归还
            disabled: false,
            dis: false,
            disa: false
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        // this.PublicList();
        this.PublicListInfo();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 140 + "px";
        },
        // 解析-工装二维码
        PublicList() {
            var lett = this;
            document.onkeydown = function() {
                var key = window.event.keyCode;
                if (key == 13) {
                    if (lett.PublicListSearch == "") {
                        lett.$message({
                            message: "请扫描二维码",
                            type: "warning"
                        });
                    } else {
                        lett.PublicListInfo();
                    }
                }
            };
        },
        // 工装-列表
        PublicListInfo() {
            let that = this;
            let url = ResourceManagement.GET_Z_findAllDataQuery;
            let data = {
                searchNum: that.PublicListSearch
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.StructuralMember = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 解析-设备二维码
        FacilityList() {
            var lett = this;
            document.onkeydown = function() {
                var key = window.event.keyCode;
                if (key == 13) {
                    if (lett.FacilityListSearch == "") {
                        lett.$message({
                            message: "请扫描二维码",
                            type: "warning"
                        });
                    } else {
                        lett.FacilityListInfo();
                    }
                }
            };
        },
        // 设备-列表
        FacilityListInfo() {
            let that = this;
            let url = ResourceManagement.GET_Z_findAllFacilityQuery;
            let data = {
                searchNum: that.FacilityListSearch
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.StandardParts = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 解析-工量具二维码
        measurList() {
            var lett = this;
            document.onkeydown = function() {
                var key = window.event.keyCode;
                if (key == 13) {
                    if (lett.measurListSearch == "") {
                        lett.$message({
                            message: "请扫描二维码",
                            type: "warning"
                        });
                    } else {
                        lett.measurListInfo();
                    }
                }
            };
        },
        // 工量具-列表
        measurListInfo() {
            let _sefl = this;
            let url = ResourceManagement.GET_Z_findAllTools;
            let data = {
                searchNum: _sefl.measurListSearch
            };
            _sefl.axios
                .post(url, data)
                .then(res => {
                    _sefl.MeasurParts = res.data.list;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 工装-借用
        ToolingOccupy(row) {
            this.ToolingOccupyArr = row;
            this.ToolingOccupyArr.flag = "w";
            this.Tooling.name = "";
            this.Tooling.number = "";
            this.ToolingdialogFormVisible = true;

            this.ToolingCard.num = "";
            this.$nextTick(() => {
                this.$refs.ToolingCard.focus();
            });
        },
        // 工装-归还
        ToolingRelease(row) {
            this.ToolingReleaseArr = row;
            this.ToolingReleaseArr.flag = "w";
            this.Facility.name = "";
            this.Facility.number = "";
            this.FacilitydialogFormVisible = true;
            this.FacilityCard.num = "";
            this.$nextTick(() => {
                this.$refs.FacilityCard.focus();
            });
        },
        // 设备-借用
        FacilityOccupy(row) {
            this.ToolingOccupyArr = row;
            this.ToolingOccupyArr.flag = "s";
            this.Tooling.name = "";
            this.Tooling.number = "";
            this.ToolingdialogFormVisible = true;

            this.ToolingCard.num = "";
            this.$nextTick(() => {
                this.$refs.ToolingCard.focus();
            });
        },
        // 设备-归还
        FacilityRelease(row) {
            this.ToolingReleaseArr = row;
            this.ToolingReleaseArr.flag = "s";
            this.Facility.name = "";
            this.Facility.number = "";
            this.FacilitydialogFormVisible = true;
            this.FacilityCard.num = "";
            this.$nextTick(() => {
                this.$refs.FacilityCard.focus();
            });
        },
        // 工量具-借用
        measurOccupy(row) {
            this.ToolingOccupyArr = row;
            this.ToolingOccupyArr.flag = "g";
            this.Tooling.name = "";
            this.Tooling.number = "";
            this.ToolingdialogFormVisible = true;

            this.ToolingCard.num = "";
            this.$nextTick(() => {
                this.$refs.ToolingCard.focus();
            });
        },
        // 工量具-归还
        measurRelease(row) {
            this.ToolingReleaseArr = row;
            this.ToolingReleaseArr.flag = "g";
            this.Facility.name = "";
            this.Facility.number = "";
            this.FacilitydialogFormVisible = true;
            this.FacilityCard.num = "";
            this.$nextTick(() => {
                this.$refs.FacilityCard.focus();
            });
        },
        // 借用
        ToolingHandleClick(tab) {
            if (tab.name == "second") {
                this.ToolingShow = true;
            } else if (tab.name == "first") {
                this.ToolingShow = false;
                this.$nextTick(() => {
                    this.$refs.ToolingCard.focus();
                });
            }
        },
        ToolingCardInput() {
            let that = this;
            let url =
                ResourceManagement.GET_Z_updateUseBasicData +
                "?cardNo=" +
                that.ToolingCard.num +
                "&flagCard=" +
                2;
            if (that.ToolingCard.num != "") {
                that.axios
                    .post(url, that.ToolingOccupyArr)
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            that.FacilityListInfo();
                            that.PublicListInfo();
                            that.measurListInfo();
                            that.ToolingdialogFormVisible = false;
                        } else {
                            that.ToolingCard.num = "";
                            that.$message({
                                message: res.data.message,
                                type: "error",
                                duration: 1500
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                return false;
            }
        },

        ToolingSave(Tooling) {
            let that = this;
            let url =
                ResourceManagement.GET_Z_updateUseBasicData +
                "?cardNo=" +
                that.Tooling.number +
                "&flagCard=" +
                1;
            that.$set(that.ToolingOccupyArr, "cardNo", that.Tooling.number);
            that.$set(that.ToolingOccupyArr, "useName", that.Tooling.name);
            that.$set(
                that.ToolingOccupyArr,
                "useUserCode",
                that.Tooling.number
            );
            that.$refs[Tooling].validate(valid => {
                if (valid) {
                    that.axios
                        .post(url, that.ToolingOccupyArr)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                that.FacilityListInfo();
                                that.PublicListInfo();
                                that.measurListInfo();
                                this.$refs[Tooling].resetFields();
                                that.ToolingdialogFormVisible = false;
                            } else {
                                that.$message({
                                    message: res.data.message,
                                    type: "error",
                                    duration: 1500
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
        // 归还
        FacilityHandleClick(tab) {
            if (tab.name == "Fourth") {
                this.FacilityShow = true;
            } else if (tab.name == "Third") {
                this.FacilityShow = false;
                this.$nextTick(() => {
                    this.$refs.FacilityCard.focus();
                });
            }
        },
        FacilityCardInput() {
            let that = this;
            let url =
                ResourceManagement.GET_Z_updateReleaseBasicData +
                "?cardNo=" +
                that.FacilityCard.num +
                "&flagCard=" +
                2;
            if (that.FacilityCard.num != "") {
                that.axios
                    .post(url, that.ToolingReleaseArr)
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            that.FacilityListInfo();
                            that.PublicListInfo();
                            that.measurListInfo();
                            that.FacilitydialogFormVisible = false;
                        } else {
                            that.FacilityCard.num = "";
                            that.$message({
                                message: res.data.message,
                                type: "error",
                                duration: 1500
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                return false;
            }
        },
        FacilitySave(Facility) {
            let that = this;
            let url =
                ResourceManagement.GET_Z_updateReleaseBasicData +
                "?cardNo=" +
                that.Facility.number +
                "&flagCard=" +
                1;
            that.$set(that.ToolingReleaseArr, "useName", that.Facility.name);
            that.$set(
                that.ToolingReleaseArr,
                "useUserCode",
                that.Facility.number
            );
            that.$set(that.ToolingReleaseArr, "cardNo", that.Facility.number);
            that.$refs[Facility].validate(valid => {
                if (valid) {
                    that.axios
                        .post(url, that.ToolingReleaseArr)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                that.FacilityListInfo();
                                that.PublicListInfo();
                                that.measurListInfo();
                                this.$refs[Facility].resetFields();
                                that.FacilitydialogFormVisible = false;
                            } else {
                                that.$message({
                                    message: res.data.message,
                                    type: "error",
                                    duration: 1500
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
        handleClick(tab) {
            if (tab.label == "设备信息") {
                // this.FacilityList();
                this.FacilityListInfo();
            } else if (tab.label == "工装信息") {
                // this.PublicList();
                this.PublicListInfo();
            } else if (tab.label == "工（量）具信息") {
                // this.measurList();
                this.measurListInfo();
            }
        }
    }
};
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}
.container {
    width: 100%;
    height: 100%;
}
.Storage_title {
    height: 50px;
}

.Storage_head {
    width: 220px;
    float: left;
    margin-right: 10px;
}
.Storage_head p {
    width: 40px;
    float: left;
    line-height: 36px;
    font-size: 36px;
}
.Storage_head div {
    width: 180px;
    float: left;
}
.Short_head {
    height: 60px;
    overflow: hidden;
}
.Short_head_left {
    width: 170px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Short_head_left p {
    width: 40px;
    float: left;
    line-height: 36px;
}
.Short_head_left div {
    width: 130px;
    float: left;
}
.Short_head_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}

.Short_operation {
    height: 50px;
    /* padding: 0px 10px;  */
}

.Short_operation_nei {
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* background: #ccc; */
}

.ShortOperationNei {
    /* margin-top: 10px; */
    margin-left: 10px;
    float: left;
}
.ShortOperationNei p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.ShortOperationNei div {
    width: 170px;
    float: left;
}
.Short_tab {
    margin-top: 10px;
    padding: 0px 10px;
}
.Materia_contnet {
    width: 100%;
}
.Materia_contnet_table {
    height: 100%;
}
.Short_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}
.DetectPag .DetectPaging {
    /* width: 100%; */
    height: 40px;
    padding: 0px 10px;
    margin-top: 5px;
}
.imgCon {
    width: 260px;
    height: 200px;
    margin: auto;
    background: url("../../../assets/icon.png") no-repeat;
}
.transparent .el-input {
    width: 20px;
    height: 10px;
}
.transparent .el-input .el-input__inner {
    width: 20px;
    height: 10px;
    background: transparent;
    border: none;
    color: #fff;
}
</style>
