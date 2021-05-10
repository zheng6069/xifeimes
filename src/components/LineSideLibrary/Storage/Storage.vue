<template>
    <div class="Storage_container">
        <div class="Storage_title">
            <div class="Storage_head">
                <p>
                    <i class="el-icon-full-screen"></i>
                </p>
                <div>
                    <el-input v-model="auxiliaryProjects" size="medium" placeholder="请扫描" clearable></el-input>
                </div>
            </div>
        </div>
        <div class="AdvanElasticFrame_top">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" inline-message>
                <el-form-item label="物料名称" prop="One" class="AdvanTesting">
                    <el-input v-model="ruleForm.One" size="medium" placeholder="请输入" disabled></el-input>
                </el-form-item>
                <el-form-item label="物料图号" prop="Two" class="AdvanTesting">
                    <el-input v-model="ruleForm.Two" size="medium" placeholder="请输入" disabled></el-input>
                </el-form-item>
                <el-form-item label="合格证号" prop="Three" class="AdvanTesting">
                    <el-input v-model="ruleForm.Three" size="medium" placeholder="请输入" disabled></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="Four" class="AdvanTesting">
                    <el-input v-model="ruleForm.Four" size="medium" placeholder="请输入" disabled></el-input>
                </el-form-item>
                <el-form-item label="生产厂商" prop="Five" class="AdvanTesting">
                    <el-input v-model="ruleForm.Five" size="medium" placeholder="请输入" disabled></el-input>
                </el-form-item>

                <el-form-item label="架次号" prop="Six" class="AdvanTesting">
                    <el-input v-model="ruleForm.Six" size="medium" placeholder="请输入" disabled></el-input>
                </el-form-item>
                <el-form-item label="入库时间" prop="eleven" class="AdvanTesting">
                    <el-date-picker
                        type="datetime"
                        size="medium"
                        placeholder="请输入"
                        v-model="ruleForm.eleven"
                        disabled
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="库位" prop="thirteen" class="AdvanTesting">
                    <el-select
                        v-model="ruleForm.thirteen"
                        size="medium"
                        clearable
                        placeholder="请选择"
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
        <el-button @click="Storage('ruleForm')" size="small" type="primary">入库</el-button>
        <el-button @click="returnStockAdjustment" size="small" type="primary" v-show="isShow">返回库存调整</el-button>
        <el-divider></el-divider>
        <div class="Storage_Title">物料信息</div>
        <div :style="TableHeight">
            <el-table
                border
                :data="StandingStorageArr"
                height="100%"
                style="width: 100%;height:100%;"
                :header-row-style="{ height: '39px' }"
                :header-cell-style="{ padding: '0px' }"
                :row-style="{ height: '39px' }"
                :cell-style="{ padding: '0px' }"
            >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="materialName" label="物料名称"></el-table-column>
                <el-table-column prop="drawNo" label="物料图号"></el-table-column>
                <el-table-column prop="stockNum" label="数量"></el-table-column>
                <el-table-column prop="certificateNo" label="合格证号"></el-table-column>
                <el-table-column prop="sortieNo" label="架次号"></el-table-column>
                <el-table-column prop="stationName" label="配套站位"></el-table-column>
                <el-table-column prop="productUnit" label="生产单位"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 200px;
}
.Storage_container {
    width: 100%;
    height: 100%;
    padding: 10px 10px 0px;
    box-sizing: border-box;
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
.Storage_Title {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
}
.Out_bnt {
    float: right;
}
.AdvanElasticFrame_top {
    overflow: hidden;
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
.Advan {
    width: 570px;
    float: left;
    margin-left: 10px;
}
.Advan div {
    width: 490px;
    float: right;
}
.DetectPaging {
    height: 50px;
    margin-top: 5px;
}
</style>
<script>
import { dispatchingManagement } from "../../../common/api";
export default {
    data() {
        return {
            TableHeight: {
                height: ""
            },
            StandingStorageArr: [],
            auxiliaryProjects: "", // 解析二维码
            OverhaulPeriodFrame: false, // 入库弹框
            ruleForm: {
                One: "", // 物料名称
                Two: "", // 物料图号
                Three: "", // 合格证号
                Four: "", // 数量
                Five: "", // 生产厂商
                Six: "", // 架次号
                eleven: new Date(), // 入库时间
                thirteen: "" // 库位
            },
            rules: {
                One: [
                    {
                        required: true,
                        message: "物料名称不能为空，请扫描",
                        trigger: "blur"
                    }
                ],
                Two: [
                    {
                        required: true,
                        message: "物料图号不能为空，请扫描",
                        trigger: "blur"
                    }
                ],
                Three: [
                    {
                        required: true,
                        message: "合格证号不能为空，请扫描",
                        trigger: "blur"
                    }
                ],
                Four: [
                    {
                        required: true,
                        message: "数量不能为空，请扫描",
                        trigger: "blur"
                    }
                ],
                Five: [
                    {
                        required: true,
                        message: "生产厂商不能为空，请扫描",
                        trigger: "blur"
                    }
                ],
                Six: [
                    {
                        required: true,
                        message: "架次号不能为空，请扫描",
                        trigger: "blur"
                    }
                ],
                eleven: [
                    {
                        required: true,
                        message: "入库时间不能为空",
                        trigger: "blur"
                    }
                ],
                thirteen: [
                    { required: true, message: "请选择库位", trigger: "blur" }
                ]
            },
            timer: "",
            options: [],
            completeId: "",
            stationId: "",
            stationName: "",
            stationAry: [],
            isShow: this.$route.query.isShow
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.currentTime();
        this.getMaterialInfo();
        this.storageSearchList();
        this.getLocationInfo();
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 305 + "px";
        },
        // 解析二维码
        getMaterialInfo() {
            let lett = this;
            document.onkeydown = function() {
                let key = window.event.keyCode;
                if (key == 13) {
                    if (lett.auxiliaryProjects == "") {
                        lett.$message({
                            message: "请扫描二维码"
                        });
                    } else {
                        lett.OnQuery();
                    }
                }
            };
        },
        OnQuery() {
            let that = this;
            let url = dispatchingManagement.GET_C_getMaterialInfo;
            that.axios
                .post(url, JSON.parse(this.auxiliaryProjects))
                .then(res => {
                    if (res.data.success == false) {
                        that.$message({
                            message: res.data.message,
                            type: "error",
                            duration: 1500
                        });
                    } else {
                        that.stationAry = res.data;
                        that.completeId = res.data.completeId;
                        that.stationId = res.data.stationId;
                        that.ruleForm.One = res.data.assemName; // 物料名称
                        that.ruleForm.Two = res.data.assemProduct; // 物料图号
                        that.ruleForm.Three = res.data.certificateNo; // 合格证号
                        that.ruleForm.Four = res.data.amount; // 数量
                        that.ruleForm.Five = res.data.manufacturer; // 生产厂商
                        that.ruleForm.Six = res.data.sortieNo; // 架次号
                    }
                })
                .catch(error => {
                    console.log(error);
                });
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
        // 入库
        Storage(ruleForm) {
            let that = this;
            let url = dispatchingManagement.GET_C_addMaterial;
            let savaData = {
                completeId: that.completeId,
                stationId: that.stationId,
                materialsNum: that.stationAry.materialsNum,
                serialNumber: that.stationAry.serialNumber,
                amountUnit: that.stationAry.amountUnit,
                version: that.stationAry.version,
                assemName: that.ruleForm.One, //物料名称
                assemProduct: that.ruleForm.Two, //物料图号
                certificateNo: that.ruleForm.Three, //合格证号
                amount: that.ruleForm.Four, //数量
                manufacturer: that.ruleForm.Five, //生产厂商
                sortieNo: that.ruleForm.Six, //架次号
                storageTime: that.ruleForm.eleven, //入库时间
                locationName: that.ruleForm.thirteen //库位
            };
            this.$refs[ruleForm].validate(valid => {
                if (valid) {
                    that.axios
                        .post(url, savaData)
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                that.storageSearchList();
                                this.$refs[ruleForm].resetFields();
                                that.auxiliaryProjects = "";
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
        // 返回上一级 - 库存调整
        returnStockAdjustment() {
            this.$router.go(-1);
        },
        // 查询
        storageSearchList() {
            let that = this;
            that.axios
                .post(dispatchingManagement.GET_C_getMaterialList)
                .then(res => {
                    that.StandingStorageArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
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
                return (_this.ruleForm.eleven =
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
