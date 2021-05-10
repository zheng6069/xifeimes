<template>
    <div class="container">
        <div class="Mr_contnet" :style="TableHeight">
            <div class="MrContent_title">
                <div class="Mr_title">添加维修物料信息</div>
                <div class="Mr_info"></div>
            </div>
            <div class="Mr_contnet_table">
                <el-table
                    border
                    :data="MrTableData"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="materialNum" label="物料编号"></el-table-column>
                    <el-table-column prop="materialName" label="物料名称"></el-table-column>
                    <el-table-column prop="materialFormat" label="规格类型"></el-table-column>
                    <el-table-column prop="materialQty" label="消耗数量"></el-table-column>
                    <el-table-column prop="materialUnit" label="单位"></el-table-column>
                    <el-table-column prop="materialPosition" label="跟换位置"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="Mrdescribe">
            <el-row :gutter="20" class="rows" style="margin-left: -8px; margin-right: -8px">
                <el-col :span="12">
                    <div class="Mr_errorDescription">
                        <div class="Mr_title">设备故障描述</div>
                        <div class="textarea">
                            <el-input :disabled="true" type="textarea" v-model="errorDescription"></el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="Mr_reasonAnalysis">
                        <div class="Mr_title">故障原因分析</div>
                        <div class="textarea">
                            <el-input type="textarea" :disabled="true" v-model="reasonAnalysis"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="Mrdescribe_top">
            <el-row :gutter="20" style="margin-left: -8px; margin-right: -8px">
                <el-col :span="12">
                    <div class="Mr_handlingInformation">
                        <div class="Mr_title">故障处理情况</div>
                        <div class="textarea">
                            <el-input
                                type="textarea"
                                v-model="handlingInformation"
                                :disabled="true"
                            ></el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="Mr_liabilityAnalysis">
                        <div class="Mr_title">责任分析及防止故障再发生建议</div>
                        <div class="textarea">
                            <el-input type="textarea" v-model="liabilityAnalysis" :disabled="true"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="Mrdescribe_bottom">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="原损坏零件是否回收" class="item">
                    <el-radio-group v-model="formInline.one" :disabled="true">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="操作工参与情况" class="item">
                    <el-radio-group v-model="formInline.two" :disabled="true">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>

        <div class="Mrdescribe_forre">
            <div class="Mrdescribe_forre_left">
                <p>验收信息</p>
                <div>
                    <el-input type="textarea" v-model="AcceptanceInformation"></el-input>
                </div>
            </div>
            <div class="Mrdescribe_forre_right">
                <el-button
                    @click="OnConfirm"
                    class="Mrdescribe_forre_right_btn"
                    type="primary"
                    size="medium"
                >确认</el-button>
                <el-button size="medium" type="primary" @click="OnReturn">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { ResourceManagement } from "../../../common/api";
export default {
    data() {
        return {
            resourcesId: this.$route.query.resourcesId, //接收参数
            errorDescription: "", //设备故障描述
            reasonAnalysis: "", //故障原因分析
            handlingInformation: "", //故障处理情况
            liabilityAnalysis: "", // 责任分析及防止故障再发生建议
            MrTableData: [],
            TableHeight: {
                height: ""
            },

            formInline: {
                one: "", //原损坏零件是否回收
                two: "" //操作工参与情况
            },
            AcceptanceInformation: "" //验收信息
        };
    },
    created() {
        this.OnQuery();
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 310 + "px";
        },

        OnQuery() {
            this.axios
                .get(ResourceManagement.GET_H_QueryDetails, {
                    params: {
                        resourcesId: this.resourcesId
                    }
                })
                .then(res => {
                    this.MrTableData = res.data.materialsList;
                    this.errorDescription = res.data.description; //设备故障描述
                    this.reasonAnalysis = res.data.analysis; //故障原因分析
                    this.handlingInformation = res.data.situation; //故障处理情况
                    this.liabilityAnalysis = res.data.advice; //建议
                    this.formInline.one = res.data.isRecover; //是否回收
                    this.formInline.two = res.data.isJoin; //操作工参与情况
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //
        OnConfirm() {
            this.axios({
                method: "post",
                url: ResourceManagement.GET_H_QueryConfirm,
                data: {
                    resourcesId: this.resourcesId, //设备故障描述
                    confirmDescription: this.AcceptanceInformation //故障原因分析
                }
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
                path: "ResultConfirmation"
            });
        }
    }
};
</script>

<style>
.Mr_title {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
}
/* .Mr_contnet {
    width: 100%;
} */
.MrContent_title {
    height: 30px;
    overflow: hidden;
}
.MrContent_title .Mr_title {
    float: left;
    font-size: 12px;
    line-height: 30px;
}
.MrContent_title .Mr_info {
    float: right;
    font-size: 12px;
}
.Mr_contnet_table {
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
.Mrdescribe_top {
    margin-top: 10px;
}
.Mrdescribe_bottom {
    margin-top: 10px;
}
.Mrdescribe_bottom .item .el-form-item__label {
    font-size: 14px;
    color: black;
}
.Mrdescribe_bottom .item {
    display: inline-block;
    margin-right: 20px;
    vertical-align: top;
}

.Mrdescribe_bottom .item {
    margin-bottom: 0px;
}
.Mrdescribe_forre {
    height: 55px;
    overflow: hidden;
}
.Mrdescribe_forre_left {
    width: 600px;
    overflow: hidden;
    float: left;
}
.Mrdescribe_forre_left p {
    width: 80px;
    float: left;
}
.Mrdescribe_forre_left div {
    width: 520px;
    float: left;
}
.Mrdescribe_forre_right {
    float: left;
    margin-left: 10px;
}
</style>