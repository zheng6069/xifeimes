<template>
    <div class="container">
        <div class="Mvi_contnet" :style="TableHeight">
            <div class="MviContent_title">
                <div class="Mvi_title">添加维修物料信息</div>
                <div class="Mvi_info">
                    <el-button @click="OnReturn" size="mini" type="primary">返回</el-button>

                </div>
            </div>
            <div class="Mvi_contnet_table">
                <el-table
                    border
                    :data="MviTableData"
                    height="100%"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="50"></el-table-column>
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
        <div class="Mvidescribe">
            <el-row :gutter="20" class="rows" style="margin-left: -8px; margin-right: -8px;">
                <el-col :span="12">
                    <div class="Mvi_errorDescription">
                        <div class="Mvi_title">设备故障描述</div>
                        <div class="textarea">
                            <el-input type="textarea" v-model="errorDescription"></el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="Mvi_reasonAnalysis">
                        <div class="Mvi_title">故障原因分析</div>
                        <div class="textarea">
                            <el-input type="textarea" v-model="reasonAnalysis"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="Mvidescribe_top">
            <el-row :gutter="20" style="margin-left: -8px; margin-right: -8px;">
                <el-col :span="12">
                    <div class="Mvi_handlingInformation">
                        <div class="Mvi_title">故障处理情况</div>
                        <div class="textarea">
                            <el-input type="textarea" v-model="handlingInformation"></el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="Mvi_liabilityAnalysis">
                        <div class="Mvi_title">责任分析及防止故障再发生建议</div>
                        <div class="textarea">
                            <el-input type="textarea" v-model="liabilityAnalysis"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="Mvidescribe_bottom">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="原损坏零件是否回收" class="item">
                    <el-radio-group v-model="formInline.one">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="操作工参与情况" class="item">
                    <el-radio-group v-model="formInline.two">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否影响生产" class="item">
                    <el-radio-group v-model="formInline.three">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="维修是否合格" class="item">
                    <el-radio-group v-model="formInline.four">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>

<script>
import { ResourceManagement } from "../../../common/api";
export default {
    data() {
        return {
            resourcesId: this.$route.query.resourcesId,
            errorDescription: "", //设备故障描述
            reasonAnalysis: "", //故障原因分析
            handlingInformation: "", //故障处理情况
            liabilityAnalysis: "", // 责任分析及防止故障再发生建议
            TableHeight: {
                height: ""
            },
            MviTableData: [],
            formInline: {
                one: "", //原损坏零件是否回收
                two: "", //操作工参与情况
                three: "", //是否影响生产
                four: "" // 维修是否合格
            },
            MaintenanceRecordFrame: false, //新增弹框
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化

        this.OnSee();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 320 + "px";
        },
        //查询
        OnSee() {
            this.axios
                .get(ResourceManagement.GET_J_See, {
                    params: {
                        resourcesId: this.resourcesId
                    }
                })
                .then(res => {
                    console.log(res, "res");
                    this.MviTableData = res.data.materialsList;
                    this.errorDescription = res.data.description;//设备故障描述
                    this.reasonAnalysis = res.data.analysis;//故障原因分析
                    this.handlingInformation = res.data.situation;//故障处理情况
                    this.liabilityAnalysis = res.data.advice;//责任分析及防止故障再发生建议
                    if(res.data.isRecover == "1"){//原损坏零件是否回收
                        this.formInline.one = true;
                    } else {
                        this.formInline.one = false;
                    }
                    if(res.data.isJoin == "1"){//操作工参与情况
                        this.formInline.two  = true;
                    } else {
                        this.formInline.two  = false;
                    }
                    if(res.data.isProduce == "1"){//是否影响生产
                        this.formInline.three  = true;
                    } else {
                        this.formInline.three  = false;
                    }
                    if(res.data.isQualified == "1"){//维修是否合格
                        this.formInline.four = true;
                    } else {
                       this.formInline.four = false;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }, 
         // 返回
        OnReturn() {
            this.$router.push({
                path: "MaintainViewNewly"
            });
        }
    }
};
</script>

<style>
.container{
    padding: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
}
.Mvi_title {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
}
.Mvi_contnet {
    margin-top: 10px;
    width: 100%;
}
.MviContent_title {
    height: 30px;
    overflow: hidden;
}
.MviContent_title .Mvi_title {
    float: left;
    font-size: 12px;
    line-height: 30px;
}
.MviContent_title .Mvi_info {
    float: right;
    font-size: 12px;
}
.Mvi_contnet_table {
    /* padding: 0px 10px; */
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
.Mvidescribe_top {
    margin-top: 10px;
}
.Mvidescribe_bottom {
    margin-top: 10px;
}
.Mvidescribe_bottom .item .el-form-item__label {
    font-size: 14px;
    color: black;
}
.Mvidescribe_bottom .item {
    display: inline-block;
    margin-right: 20px;
    vertical-align: top;
}

.Mvidescribe_bottom .item {
    margin-bottom: 0px;
}
</style>