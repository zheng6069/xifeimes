<template>
    <div class="container">
        <div class="MiSearch">
            <el-form :inline="true" :model="MiSearchform" class="demo-form-inline" size="medium">
                <el-form-item label="设备名称" class="item">
                    <el-input :disabled="true" v-model="MiSearchform.name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="设备编号" class="item">
                    <el-input :disabled="true" v-model="MiSearchform.number" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="维保类型" class="item">
                    <el-select :disabled="true" v-model="MiSearchform.type" placeholder="">
                        <el-option label="一级保养" value="0"></el-option>
                        <el-option label="二级保养" value="1"></el-option>
                        <el-option label="三级保养" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="Mi_contnet" :style="TableHeight">
            <div class="MiContent_title">
                <div class="Mi_title">维保信息</div>
                <div class="Mi_info">
                    <el-button
                        size="mini"
                        type="primary"
                        class="operation_bnt"
                        @click="OnPreservation"
                    >保存</el-button>
            <el-button class="operation_bnt" size="mini" type="primary" @click="OnSubmit">提交</el-button>
                    <el-button size="mini" type="primary" class="operation_bnt" @click="OnReturn">返回</el-button>
                </div>
            </div>
            <div class="Mi_contnet_table">
                <el-table border :data="MaintainArr" height="100%" style="width: 100%;height:100%;">
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="checkParts" label="检查部位"></el-table-column>
                    <el-table-column prop="checkContent" label="检查内容"></el-table-column>
                    <el-table-column prop="checkMethod" label="检查方法"></el-table-column>
                    <el-table-column prop="checkNormal" label="检查标准"></el-table-column>
                    <el-table-column prop="remarks" label="备注"></el-table-column>
                    <el-table-column prop="checkResult" label="维保结果">
                        <template slot-scope="scope">
                            <div v-if="!scope.row.isChange" v-text="scope.row.checkResult"></div>
                            <el-select
                                v-if="scope.row.isChange"
                                v-model="scope.row.checkResult"
                                size="medium"
                                style="width:100%"
                                placeholder="请选择"
                            >
                                <el-option label="正常" value="正常"></el-option>
                                <el-option label="异常" value="异常"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="description" label="结果说明">
                        <template slot-scope="scope">
                            <p v-if="!scope.row.isChange" v-text="scope.row.description"></p>
                            <el-input
                                type="textarea"
                                :rows="2"
                                style="width:100%"
                                v-if="scope.row.isChange"
                                v-model="scope.row.description"
                                placeholder="请输入内容"
                            ></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        
    </div>
</template>

<script>
import { ResourceManagement } from "../../../common/api";
export default {
    data() {
        return {
            ReceiveAggregate: this.$route.query,
            MiSearchform: {
                name: "", //设备名称
                number: "", //设备编号
                type: "" //维保类型
            },
            TableHeight: {
                height: ""
            },
            MaintainArr: []
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化

        this.maintain();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 70 + "px";
        },

        // 保养
        maintain() {
            if (this.ReceiveAggregate.mainId != "") {
                this.MiSearchform.name = this.ReceiveAggregate.facilityName;
                this.MiSearchform.number = this.ReceiveAggregate.facilityNum;
                this.MiSearchform.type = this.ReceiveAggregate.facilityModel;
                this.axios
                    .get(ResourceManagement.GET_A_Maintain, {
                        params: {
                            mainId: this.ReceiveAggregate.mainId,
                            resourcesId: this.ReceiveAggregate.resourcesId
                        }
                    })
                    .then(res => {
                        this.MaintainArr = res.data;
                        this.MaintainArr.map(val => {
                            //循环让table 可以修改数量
                            val.isChange = true;
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        // 保存
        OnPreservation() {
            this.axios({
                method: "post",
                url:
                    ResourceManagement.GET_A_Preservation +
                    "?resourcesId=" +
                    this.ReceiveAggregate.resourcesId,
                data: this.MaintainArr //当前页
            })
                .then(res => {
                    if (res.data.success === true) {
                        this.$message({
                            //成功后的提示
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        // this.OnReturn();
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
        //提交
        OnSubmit() {
            this.axios({
                method: "post",
                url:
                    ResourceManagement.GET_A_Submite +
                    "?resourcesId=" +
                    this.ReceiveAggregate.resourcesId,
                data: this.MaintainArr //当前页
            })
                .then(res => {
                    if (res.data.success === true) {
                        this.$message({
                            //成功后的提示
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        this.OnReturn();
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
        //返回
        OnReturn() {
            this.$router.push({
                path: "MaintenanceTask"
            });
        }
    }
};
</script>

<style>
.MiSearch .el-input{
    width: 150px;
}
.MiSearch .item .el-form-item__label {
    font-size: 16px;
    color: #000000;
}
.Mi_contnet {
    width: 100%;
}

.MiContent_title {
    height: 30px;
    overflow: hidden;
}
.MiContent_title .Mi_title {
    float: left;
    font-size: 12px;
    line-height: 30px;
}
.MiContent_title .Mi_info {
    float: right;
    font-size: 12px;
}
.Mi_contnet_table {
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
.Mi_foeer {
    height: 40px;
    overflow: hidden;
}
.Mi_foeer_btn{
    float:right;
    margin-top: 7px;
}
</style>