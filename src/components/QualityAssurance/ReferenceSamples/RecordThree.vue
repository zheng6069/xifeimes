<template>
    <div>
        <template v-for="item in RecordThreeData">
            <div :key="item.abnormalId">
                <div class="table_title">
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">指令异常单号</span>
                                <span class="fieldContent">{{item.abnormalId}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-light field">
                                <span class="fieldName">异常物料图号</span>
                                <span class="fieldContent">{{item.assemProduct}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">异常物料名称</span>
                                <span class="fieldContent">{{item.assemName}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">数量</span>
                                <span class="fieldContent">{{item.qty}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">指令号</span>
                                <span class="fieldContent">{{item.instructNum}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-light field">
                                <span class="fieldName">指令名称</span>
                                <span class="fieldContent">{{item.instructName}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">故障代码</span>
                                <span class="fieldContent">{{item.errorCode}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">责任单位</span>
                                <span class="fieldContent">{{item.responsibleUnit}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <p class="MaterialInformation_p">质量问题描述：</p>
                                <el-input
                                    type="textarea"
                                    :value="item.description"
                                    :rows="6"
                                    placeholder="质量问题描述"
                                    disabled
                                ></el-input>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <p class="MaterialInformation_p">检验组长处理意见：</p>
                                <el-input
                                    type="textarea"
                                    :value="item.groupAdvice"
                                    :rows="6"
                                    placeholder="检验组长处理意见"
                                    disabled
                                ></el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <p class="MaterialInformation_p">技术负责人处理意见：</p>
                                <el-input
                                    type="textarea"
                                    :value="item.technicalAdvice"
                                    :rows="6"
                                    placeholder="技术负责人处理意见"
                                    disabled
                                ></el-input>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <p class="MaterialInformation_p">站位工程师处理意见：</p>
                                <el-input
                                    type="textarea"
                                    :value="item.groupResult"
                                    :rows="6"
                                    placeholder="站位工程师处理意见"
                                    disabled
                                ></el-input>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import { AssemblyPerform } from "../../../common/api";
export default {
    props: ["abnormal"],
    data() {
        return {
            RecordThreeData: [],
            form: {
                one: "",
                two: "",
                three: "",
                four: ""
            }
        };
    },
    created() {
        let { sortieNo, drawNo } = this.abnormal;
        this.sortieNo = sortieNo;
        this.drawNo = drawNo;
    },
    computed: {},
    methods: {
        RecordThreeList() {
            this.axios
                .get(AssemblyPerform.GET_V_findQualityList, {
                    params: {
                        drawNo: this.drawNo,
                        sortieNo: this.sortieNo
                    }
                })
                .then(res => {
                    this.RecordThreeData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>
<style scoped>
.field {
    display: flex;
    height: 40px;
    border: 1px solid #ebeef5;
}
.fieldName {
    flex: 2;
    line-height: 40px;
    text-align: center;
    border-right: 1px solid #ebeef5;
}
.fieldContent {
    flex: 3;
    line-height: 40px;
    text-align: center;
}
</style>
