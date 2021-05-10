<template>
    <div class="container">
     
        <div class="Mr_contnet" :style="TableHeight">
            <div class="MrContent_title">
                <div class="Mr_title">添加维修物料信息</div>
                <div class="Mr_info">
                    <el-button size="mini" type="primary" @click="MrDel">删除</el-button>
                    <el-button size="mini" type="primary" @click="MrAdds">添加</el-button>
                </div>
            </div>
            <div class="Mr_contnet_table">
                <el-table
                    border
                    :data="MrTableData"
                        ref="multipleTable"
                    @selection-change="handleSelectionChange"
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
           <div class="Mrdescribe">
            <el-row :gutter="20" class="rows" style="margin-left: -8px; margin-right: -8px;">
                <el-col :span="12">
                    <div class="Mr_errorDescription">
                        <div class="Mr_title">设备故障描述</div>
                        <div class="textarea">
                            <el-input type="textarea" v-model="errorDescription"></el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="Mr_reasonAnalysis">
                        <div class="Mr_title">故障原因分析</div>
                        <div class="textarea">
                            <el-input type="textarea" v-model="reasonAnalysis"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="Mrdescribe_top">
            <el-row :gutter="20" style="margin-left: -8px; margin-right: -8px;">
                <el-col :span="12">
                    <div class="Mr_handlingInformation">
                        <div class="Mr_title">故障处理情况</div>
                        <div class="textarea">
                            <el-input type="textarea" v-model="handlingInformation"></el-input>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="Mr_liabilityAnalysis">
                        <div class="Mr_title">责任分析及防止故障再发生建议</div>
                        <div class="textarea">
                            <el-input type="textarea" v-model="liabilityAnalysis"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="Mrdescribe_bottom">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="原损坏零件是否回收" class="item">
                    <el-radio-group v-model="formInline.one">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="操作工参与情况" class="item">
                    <el-radio-group v-model="formInline.two">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="OnPreservation">保存</el-button>
                    <el-button type="primary" size="mini" @click="OnSubmit">提交</el-button>
                    <el-button size="mini" type="primary" @click="OnReturn">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 新增 -->
        <el-dialog :visible.sync="MaintenanceRecordFrame" width="70%">
            <div class="AdvanElasticFrame_top">
                <el-form :model="ruleForm" ref="ruleForm">
                    <el-form-item label="物料编号" prop="one" class="AdvanTesting">
                        <el-input v-model="ruleForm.materialNum" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="物料名称" prop="two" class="AdvanTesting">
                        <el-input v-model="ruleForm.materialName" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="规则型号" prop="three" class="AdvanTesting">
                        <el-input v-model="ruleForm.materialFormat" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="消耗数量" prop="four" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.materialQty"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="five" class="AdvanTesting">
                        <el-input v-model="ruleForm.materialUnit" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="更换位置" prop="six" class="AdvanTesting">
                        <el-input v-model="ruleForm.materialPosition" size="medium" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button  @click="close">取 消</el-button>
                <el-button
                    @click="AddSave('ruleForm')"
                    type="primary"
                >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { ResourceManagement } from "../../../common/api";
export default {
    data() {
        return {
            WorkClothesID: this.$route.query.WorkClothesID,
            referenceMaterial: "", //维修参考资料
            errorDescription: "", //设备故障描述
            reasonAnalysis: "", //故障原因分析
            handlingInformation: "", //故障处理情况
            liabilityAnalysis: "", // 责任分析及防止故障再发生建议
            TableHeight: {
                height: ""
            },
            MrTableData: [],
            AddSaveArr:[],
            cccdata: [],
            multipleSelection: [],
            formInline: {
                one: "", //原损坏零件是否回收
                two: "", //操作工参与情况
           
            },
            MaintenanceRecordFrame: false, //新增弹框
            ruleForm: {
                materialNum: "", //物料编号
                materialName: "", // 物料名称
                materialFormat: "", // 规则型号
                materialQty: "", // 消耗数量
                materialUnit: "", // 单位
                materialPosition: "" // 更换位置
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化

        this.OnRepair();
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 250 + "px";
        },
        //维修
        OnRepair() {
            this.axios
                .get(ResourceManagement.GET_C_Repair, {
                    params: {
                        resourcesId: this.WorkClothesID
                    }
                })
                .then(res => {
                    this.errorDescription = res.data.description; //设备故障描述
                    this.reasonAnalysis = res.data.analysis;//故障原因分析
                    this.MrTableData = res.data.materialsList ; //维修物料信息
                    this.handlingInformation = res.data.situation; //故障处理情况
                    this.liabilityAnalysis =  res.data.advice; //建议
                    this.formInline.one = res.data.isRecover; //是否回收
                    this.formInline.two = res.data.isJoin; //操作工参与情况
                })
                .catch(error => {
                    console.log(error);
                });
        },

        // 新增-保存
        AddSave() {
            let a = { ...this.ruleForm };
            a.uId = Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);
            this.AddSaveArr.push(a);
            this.MrTableData = this.AddSaveArr
            this.MaintenanceRecordFrame = false;
        },
        // 添加
        MrAdds(){
            this.MaintenanceRecordFrame=true
             this.ruleForm.materialNum = "" //物料编号
                this.ruleForm.materialName = "" // 物料名称
                this.ruleForm.materialFormat = "" // 规则型号
                this.ruleForm.materialQty = "" // 消耗数量
                this.ruleForm.materialUnit = "" // 单位
                this.ruleForm.materialPosition = "" // 更换位置
        },
        // 删除
        MrDel() {
            if (this.multipleSelection<1 || this.multipleSelection == undefined) {
                     this.$message({
            message: "请选择一条数据",
            type: "warning",
            duration: 1500,
          });
            }else{
                 this.MrTableData.map((val, index) => {
                if (val.uId == this.multipleSelection.uId) {
                    this.MrTableData.splice(index, 1);
                }
            });
            }
           
        },
        // 取消
        close() {
            this.MaintenanceRecordFrame = false;
        },
        // 保存
        OnPreservation() {
            this.axios({
                method: "post",
                url:
                    ResourceManagement.GET_C_Preservation +
                    "?resourcesId=" +
                    this.WorkClothesID,
                data: {
                    description: this.errorDescription, //设备故障描述
                    analysis: this.reasonAnalysis, //故障原因分析
                    materialsList: this.MrTableData, //维修物料信息
                    situation: this.handlingInformation, //故障处理情况
                    advice: this.liabilityAnalysis, //建议
                    isRecover: this.formInline.one, //是否回收
                    isJoin: this.formInline.two, //操作工参与情况
                }
            })
                .then(res => {
                    console.log(res);
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
        //提交
        OnSubmit(){
             this.axios({
                method: "post",
                url:
                    ResourceManagement.GET_C_Submit +
                    "?resourcesId=" +
                    this.WorkClothesID,
                data: {
                    description: this.errorDescription, //设备故障描述
                    analysis: this.reasonAnalysis, //故障原因分析
                    materialsList: this.MrTableData, //维修物料信息
                    situation: this.handlingInformation, //故障处理情况
                    advice: this.liabilityAnalysis, //建议
                    isRecover: this.formInline.one, //是否回收
                    isJoin: this.formInline.two, //操作工参与情况
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.data.success === true) {
                        this.$message({
                            //成功后的提示
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
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
        handleSelectionChange(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.multipleSelection = row.pop(); //储存新的单选数据
            }
        },
        //返回
        OnReturn() {
            this.$router.push({
                path: "Reception"
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
.Mr_contnet {
    margin-top: 10px;
    width: 100%;
}
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
    width: 160px;
    float: right;
}
/* form表单之间的间距样式 */
.el-form-item {
    margin-bottom: 5px;
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

.Advan_operation_bnt {
    margin-right: 10px;
}

.Advan_contnet {
    width: 100%;
}
.Advan_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.DetectPaging {
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}

.ExportStyle {
    height: 160px;
}
</style>