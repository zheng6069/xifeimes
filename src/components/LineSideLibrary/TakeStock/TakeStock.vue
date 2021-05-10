<template>
    <div class="TakeStock_container">
        <div class="TakeStock_title">
            <div class="TakeStock_head">
                <p>盘点单号</p>
                <div>
                    <el-input v-model="TakeStockNum" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="TakeStock_head">
                <p>盘点人</p>
                <div>
                    <el-input v-model="TakeStockName" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <div class="TakeStock_head">
                <p>盘点时间</p>
                <div>
                    <el-date-picker
                        v-model="TakeStockTime"
                        size="medium"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </div>
            </div>
            <el-button
                size="medium"
                type="primary"
                @click="
          nowPages = 1;
          TakeStockSearchList();
        "
            >查询</el-button>
        </div>
        <div class="TakeStock_Title">
            盘点信息
            <el-button @click="check" size="small" type="primary" class="Out_bnt">盘点</el-button>
            <el-button @click="checkAdd" size="small" type="primary" class="Out_bnt">新增盘点</el-button>
            <el-button @click="CheckRecord" size="small" type="primary" class="Out_bnt">查看记录</el-button>
        </div>
        <div :style="TableHeight">
            <el-table
                border
                :data="TakeStockArr"
                ref="TakeStockTable"
                @selection-change="TakeStockSelectionChange"
                height="100%"
                style="width: 100%; height: 100%"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="checkNo" label="盘点单号"></el-table-column>
                <el-table-column prop="checkUser" label="盘点人"></el-table-column>
                <el-table-column prop="checkTime" label="盘点时间"></el-table-column>
                <el-table-column prop="wareHouse" label="仓库"></el-table-column>
                <el-table-column prop="locationName" label="库位"></el-table-column>
                <el-table-column prop="checkStatus" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.checkStatus == 1">新建</span>
                        <span v-else-if="scope.row.checkStatus == 2">保存</span>
                        <span v-else-if="scope.row.checkStatus == 3">已提交</span>
                        <span v-else-if="scope.row.checkStatus == 4">站位长审核</span>
                        <span v-else-if="scope.row.checkStatus == 5">工段长审核</span>
                        <span v-else-if="scope.row.checkStatus == 6">总计划审核</span>
                        <span v-else-if="scope.row.checkStatus == 7">站位长驳回待提交</span>
                        <span v-else-if="scope.row.checkStatus == 8">工段长驳回</span>
                        <span v-else-if="scope.row.checkStatus == 9">总计划驳回</span>
                    </template>
                </el-table-column>
                <el-table-column prop label="完成时间"></el-table-column>
            </el-table>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="sizeChange"
                @current-change="currentChange"
                :page-size="pageSize"
                :page-sizes="[10, 50, 100, 200]"
                :current-page="nowPages"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
        <!-- 增加盘点 - 弹框 -->
        <el-dialog :visible.sync="TakeStockFormVisible" width="70%">
            <div class="AdvanElasticFrame_top">
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules" inline-message>
                    <el-form-item label="盘点单号" prop="one" class="AdvanTesting">
                        <el-input v-model="ruleForm.one" size="medium" placeholder="请输入" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="盘点时间" prop="two" class="AdvanTesting">
                        <el-input v-model="ruleForm.two" size="medium" placeholder="请输入" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="盘点库位" prop="five" class="AdvanTesting">
                        <el-select
                            v-model="ruleForm.five"
                            size="medium"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.locationId"
                                :label="item.locationName"
                                :value="item.locationName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="TakeStockSave('ruleForm')">确 定</el-button>
                <el-button @click="TakeStockFormVisible = false">关 闭</el-button>
            </div>
        </el-dialog>
        <!-- 盘点信息录入 - 弹框 -->
        <el-dialog :visible.sync="TakeStockTableVisible" width="80%">
            <el-button type="primary" @click="editAll">填写</el-button>
            <el-table
                :data="tabledatas"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                border
                height="500px"
                :header-row-style="{ height: '40px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '38px' }"
                :cell-style="{ padding: '0px' }"
                style="width: 100%; height: 100%"
            >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="checkNo" label="盘点单号">
                    <el-input
                        size="mini"
                        placeholder="请输入内容"
                        v-model="checkNo"
                        v-if="(show = false)"
                    ></el-input>
                </el-table-column>
                <el-table-column prop="drawNo" label="物料图号">
                    <el-input
                        size="mini"
                        placeholder="请输入内容"
                        v-model="drawNo"
                        v-if="(show = false)"
                    ></el-input>
                </el-table-column>
                <el-table-column prop="materialName" label="物料名称">
                    <el-input
                        size="mini"
                        placeholder="请输入内容"
                        v-model="materialName"
                        v-if="(show = false)"
                    ></el-input>
                </el-table-column>
                <el-table-column prop="locationName" label="库位">
                    <el-input
                        size="mini"
                        placeholder="请输入内容"
                        v-model="locationName"
                        v-if="(show = false)"
                    ></el-input>
                </el-table-column>
                <el-table-column prop="inventoryNum" label="库存数量">
                    <el-input
                        size="mini"
                        placeholder="请输入内容"
                        v-model="inventoryNum"
                        v-if="(show = false)"
                    ></el-input>
                </el-table-column>
                <el-table-column prop="checkNum" label="盘点数量">
                    <template slot-scope="scope">
                        <span v-if="scope.row.show">
                            <el-input
                                size="mini"
                                placeholder="请输入内容"
                                v-model="scope.row.checkNum"
                                oninput="value=value.replace(/[^\d]/g,'')"
                            ></el-input>
                        </span>
                        <span v-else>{{ scope.row.checkNum }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remarks" label="备注">
                    <template slot-scope="scope">
                        <span v-if="scope.row.show">
                            <el-input size="mini" placeholder="请输入内容" v-model="scope.row.remarks"></el-input>
                        </span>
                        <span v-else>{{ scope.row.remarks }}</span>
                    </template>
                </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button @click="TakeStockTableVisible = false">关 闭</el-button>
                <el-button type="primary" @click="submitSava">保存</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
            </div>
        </el-dialog>
        <!-- 查看盘点记录 - 弹框 -->
        <el-dialog :visible.sync="TakeStockTableLook" width="80%">
            <el-table
                :data="tabledatas"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                border
                height="500px"
                :header-row-style="{ height: '40px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '38px' }"
                :cell-style="{ padding: '0px' }"
                style="width: 100%; height: 100%"
            >
                <el-table-column prop="checkNo" label="盘点单号">
                    <el-input
                        size="mini"
                        placeholder="请输入内容"
                        v-model="checkNo"
                        v-if="(show = false)"
                    ></el-input>
                </el-table-column>
                <el-table-column prop="drawNo" label="物料图号">
                    <el-input
                        size="mini"
                        placeholder="请输入内容"
                        v-model="drawNo"
                        v-if="(show = false)"
                    ></el-input>
                </el-table-column>
                <el-table-column prop="materialName" label="物料名称">
                    <el-input
                        size="mini"
                        placeholder="请输入内容"
                        v-model="materialName"
                        v-if="(show = false)"
                    ></el-input>
                </el-table-column>
                <el-table-column prop="locationName" label="库位">
                    <el-input
                        size="mini"
                        placeholder="请输入内容"
                        v-model="locationName"
                        v-if="(show = false)"
                    ></el-input>
                </el-table-column>
                <el-table-column prop="inventoryNum" label="库存数量">
                    <el-input
                        size="mini"
                        placeholder="请输入内容"
                        v-model="inventoryNum"
                        v-if="(show = false)"
                    ></el-input>
                </el-table-column>
                <el-table-column prop="checkNum" label="盘点数量">
                    <el-input
                        size="mini"
                        placeholder="请输入内容"
                        v-model="checkNum"
                        v-if="(show = false)"
                    ></el-input>
                </el-table-column>
                <el-table-column prop="remarks" label="备注">
                    <el-input
                        size="mini"
                        placeholder="请输入内容"
                        v-model="remarks"
                        v-if="(show = false)"
                    ></el-input>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="TakeStockTableLook = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.el-form-item__label {
    width: 120px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 150px;
}
.TakeStock_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
}
.TakeStock_title {
    height: 50px;
}

.TakeStock_head {
    width: 220px;
    float: left;
    margin-right: 10px;
}
.TakeStock_head p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.TakeStock_head div {
    width: 150px;
    float: left;
}
.TakeStock_Title {
    height: 25px;
    font-size: 14px;
}
.Out_bnt {
    float: right;
    margin-left: 10px;
}
.AdvanElasticFrame_top {
    overflow: hidden;
}

.AdvanTesting {
    width: 290px;
    height: 40px;
    float: left;
    margin-left: 10px;
}
.AdvanTesting div {
    width: 170px;
    float: right;
}
.DetectPaging {
    height: 50px;
    margin-top: 15px;
}
</style>
<script>
import { dispatchingManagement } from "../../../common/api";
import Vue from "vue";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            TakeStockArr: [],
            TakeStockName: "", // 盘点人
            TakeStockNum: "", // 盘点单号
            TakeStockTime: "", // 盘点时间
            TakeStockFormVisible: false, // 增加盘点
            TakeStockTableVisible: false, // 盘点
            TakeStockTableLook: false, // 查看记录
            tabledatas: [],
            multipleSelection: [],
            TakeStockSelection: [],
            ruleForm: {
                one: "", // 盘点单号
                two: "", // 盘点时间
                five: "" // 盘点库位
            },
            rules: {
                one: [
                    {
                        required: true,
                        message: "请输入盘点单号",
                        trigger: "blur"
                    },
                    {
                        pattern: /^[^\u4e00-\u9fa5]+$/,
                        message: "不允许输入中文",
                        trigger: "blur"
                    },
                    {
                        pattern: /[0-9a-zA-Z]/,
                        message: "只可以输入数字和字母",
                        trigger: "blur"
                    }
                ],
                two: [
                    {
                        required: true,
                        message: "请输入盘点时间",
                        trigger: "blur"
                    }
                ],
                five: [
                    {
                        required: true,
                        message: "请输入盘点库位",
                        trigger: "blur"
                    }
                ]
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数
            InventoryFilterValue: 1,
            options: [],
            timer: ""
        };
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.TakeStockSearchList();
        this.currentTime();
        this.tabledatas.map(i => {
            i.show = false;
            return i;
        });
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 140 + "px";
        },
        // 查询
        TakeStockSearchList() {
            let that = this;
            let url = dispatchingManagement.GET_F_getCheckMaterialList;
            let data = {
                pageNum: that.nowPages,
                pageSize: that.pageSize,
                checkNo: that.TakeStockNum,
                checkTime: that.TakeStockTime,
                checkUser: that.TakeStockName
            };
            that.axios
                .post(url, data)
                .then(res => {
                    that.TakeStockArr = res.data.records;
                    that.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 当前页数
        sizeChange(val) {
            this.pageSize = val;
            this.TakeStockSearchList();
        },
        // 当前页
        currentChange(val) {
            this.nowPages = val;
            this.TakeStockSearchList();
        },
        // 查看记录
        CheckRecord() {
            if (
                this.TakeStockSelection < 1 ||
                this.TakeStockSelection == undefined
            ) {
                this.$message({
                    //警示
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                if (this.TakeStockSelection.checkStatus == "1") {
                    this.$message({
                        //警示
                        message: "新建状态，无记录查看",
                        type: "warning",
                        duration: 1500
                    });
                } else {
                    this.TakeStockTableLook = true;
                    let that = this;
                    let url =
                        dispatchingManagement.GET_F_getCheckMaterialRecord +
                        "?checkId=" +
                        this.TakeStockSelection.checkId;
                    that.axios
                        .post(url)
                        .then(res => {
                            that.tabledatas = res.data;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
        },
        // 新增盘点
        checkAdd() {
            this.ruleForm.one = "";
            this.ruleForm.three = "";
            this.ruleForm.five = "";
            this.TakeStockFormVisible = true;
            this.getLocationInfo();
        },
        // 查询库位信息
        getLocationInfo() {
            let that = this;
            that.axios
                .post(dispatchingManagement.GET_C_getLocationInfo)
                .then(res => {
                    that.options = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 新增盘点 - 确定
        TakeStockSave(ruleForm) {
            let that = this;
            let addData = {
                checkNo: that.ruleForm.one,
                checkTime: that.ruleForm.two,
                locationName: that.ruleForm.five
            };
            this.$refs[ruleForm].validate(valid => {
                if (valid) {
                    that.axios
                        .post(
                            dispatchingManagement.GET_F_addCheckMaterial,
                            addData
                        )
                        .then(res => {
                            console.log(res);
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                that.TakeStockFormVisible = false;
                                that.$refs[ruleForm].resetFields();
                                that.TakeStockSearchList();
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
        // 盘点
        check() {
            if (
                this.TakeStockSelection < 1 ||
                this.TakeStockSelection == undefined
            ) {
                this.$message({
                    //警示
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            } else {
                if (
                    this.TakeStockSelection.checkStatus == 1 ||
                    this.TakeStockSelection.checkStatus == 2 ||
                    this.TakeStockSelection.checkStatus == 7
                ) {
                    this.TakeStockTableVisible = true;
                    let that = this;
                    let url =
                        dispatchingManagement.GET_F_getCheckMaterialDetail;
                    let data = {
                        checkId: this.TakeStockSelection.checkId,
                        locationName: this.TakeStockSelection.locationName,
                        checkNo: this.TakeStockSelection.checkNo
                    };
                    that.axios
                        .post(url, data)
                        .then(res => {
                            if (res.data.success == false) {
                                that.$message({
                                    message: res.data.message,
                                    type: "error"
                                });
                                that.tabledatas = [];
                            } else {
                                that.tabledatas = res.data.list;
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.$message({
                        //警示
                        message: "不能盘点，可以查看盘点记录",
                        type: "warning",
                        duration: 1500
                    });
                }
            }
        },
        // 填写
        editAll() {
            this.tabledatas.map((i, index) => {
                i.show = true;
                Vue.set(this.tabledatas, index, i);
            });
        },
        // 保存
        submitSava() {
            // let Array = [];
            // let ArrayData = [];
            // this.tabledatas.map((i, index) => {
            //     i.show = false;
            //     Vue.set(this.tabledatas, index, i);
            //     Array.push(Vue.set(this.tabledatas, index, i));
            // });
            // Array.map(item => {
            //     ArrayData.push(
            //         Object.assign({}, item, {
            //             checkId: this.TakeStockSelection.checkId
            //         })
            //     );
            // });
            this.axios
                .post(
                    dispatchingManagement.GET_F_updateCheckMaterialNum,
                    this.multipleSelection
                )
                .then(res => {
                    console.log(res);
                    if (res.data.success == true) {
                        this.$message({
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        this.check();
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
        //添加
        addAll() {
            if (this.multipleSelection.length == 0) {
                let list = {
                    name: "",
                    address: ""
                };
                this.tabledatas.push(list);
            } else {
                this.multipleSelection.forEach((val, index) => {
                    this.tabledatas.splice(
                        index,
                        0,
                        JSON.parse(JSON.stringify(val))
                    );
                });
            }
        },
        // 提交
        submit() {
            let that = this;
            let data = [];
            if (this.multipleSelection.length > 0) {
                this.multipleSelection.map(item => {
                    data.push(
                        Object.assign({}, item, {
                            checkId: this.TakeStockSelection.checkId
                        })
                    );
                });
                this.axios
                    .post(dispatchingManagement.GET_F_updateMaterialInfo, data)
                    .then(res => {
                        if (res.data.success == true) {
                            this.$message({
                                message: res.data.message,
                                type: "success",
                                duration: 1500
                            });
                            this.TakeStockSearchList();
                            this.TakeStockTableVisible = false;
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
            } else {
                that.$message({
                    message: "请选择数据",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        TakeStockSelectionChange(row) {
            if (row.length > 1) {
                this.$refs.TakeStockTable.clearSelection();
                this.$refs.TakeStockTable.toggleRowSelection(row.pop());
            } else {
                this.TakeStockSelection = row.pop(); //储存新的单选数据
            }
        },
        //选
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 当前时间
        currentTime() {
            var _this = this;
            this.timer = setInterval(function() {
                var date = new Date();
                var year = date.getFullYear();
                /* 在日期格式中，月份是从0开始的，因此要加0
                 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
                 * */
                var month =
                    date.getMonth() + 1 < 10
                        ? "0" + (date.getMonth() + 1)
                        : date.getMonth() + 1;
                var day =
                    date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                var hours =
                    date.getHours() < 10
                        ? "0" + date.getHours()
                        : date.getHours();
                var minutes =
                    date.getMinutes() < 10
                        ? "0" + date.getMinutes()
                        : date.getMinutes();
                var seconds =
                    date.getSeconds() < 10
                        ? "0" + date.getSeconds()
                        : date.getSeconds();
                // 拼接
                return (_this.ruleForm.two =
                    year +
                    "-" +
                    month +
                    "-" +
                    day +
                    " " +
                    hours +
                    ":" +
                    minutes +
                    ":" +
                    seconds); //修改数据date
            }, 1000);
        }
    }
};
</script>
