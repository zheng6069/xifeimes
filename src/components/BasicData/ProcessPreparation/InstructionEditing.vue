<template>
    <div>
        <div class="Instru_operation">
            <div class="Instru_operation_div_inp">
                <el-input v-model="condetion" size="medium" clearable ></el-input>
            </div>
             <el-button
                @click="NewlyAdded"
                size="medium"
                type="primary"
                class="Instru_operation_bnt"
            >查询</el-button>
            <el-button
                @click="OnReturn"
                size="medium"
                type="primary"
                class="Instru_operation_bntleft"
            >返回</el-button>
            <el-button
                @click="NewlyAdded"
                size="medium"
                type="primary"
                class="Instru_operation_bntleft"
            >新增</el-button>           
        </div>

        <div class="Instru_contnet" :style="TableHeight">
            <div class="Instru_contnet_table">
                <el-table
                    border
                    :data="QueryArr"
                    ref="multipleTable"
                    height="100%"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <!-- <el-table-column type="selection" width="40"></el-table-column> -->
                    <!-- <el-table-column label="序号" type="index" width="60"></el-table-column> -->
                    <el-table-column prop="instructSort" label="序号"></el-table-column>
                    <el-table-column prop="instructName" label="指令名称"></el-table-column>
                    <el-table-column prop="instructNum" label="指令号"></el-table-column>
                    <el-table-column prop="workingArea" label="区域"></el-table-column>
                    <el-table-column prop="version" label="版本" width="60"></el-table-column>
                    <el-table-column prop="parallel" label="与上一指令是否并行" width="150"></el-table-column>
                    <el-table-column label="操作" width="240">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="OnOrganization(scope.$index, scope.row)"
                            >编制</el-button>
                            <el-button
                                size="mini"
                                type="primary"
                                @click="OnModify(scope.$index, scope.row)"
                            >修改</el-button>
                            <el-button
                                size="mini"
                                type="primary"
                                @click="OnDelete(scope.$index, scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="DetectPaging">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="OnPaging"
                :page-size="pageSize"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>

        <!-------- 新增 -------->
        <el-dialog :visible.sync="ElasticFrame" width="650px">
            <div class="InstruNewlyAdded">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="指令名称" prop="InstructionName" class="InstruNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.InstructionName"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="指令号" prop="Instruction" class="InstruNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.Instruction"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="区域" prop="region" class="InstruNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.region"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="版本" prop="edition" class="InstruNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.edition"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="序号" prop="SerialNumber" class="InstruNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.SerialNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="与上一指令是否并行" class="InstruNewlyAddedBoxFixed">
                        <el-checkbox v-model="ruleForm.EquipmentFixed" name="type"></el-checkbox>
                    </el-form-item>
                </el-form>
            </div>
            <div class="InstruNewlyAdded_btn">
                <el-button
                    class="InstruNewlyAdded_Close"
                    @click="AddAndSave('ruleForm')"
                    type="primary"
                >确 定</el-button>
                <el-button class="InstruNewlyAdded_Close" @click="OnClose">取 消</el-button>
            </div>
        </el-dialog>



        <!-------- 修改 -------->
        <el-dialog :visible.sync="ModifyFrame" width="650px">
            <div class="InstruNewlyAdded">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="指令名称" prop="InstructionName" class="InstruNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.InstructionName"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="指令号" prop="Instruction" class="InstruNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.Instruction"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="区域" prop="region" class="InstruNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.region"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="版本" prop="edition" class="InstruNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.edition"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="序号" prop="SerialNumber" class="InstruNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.SerialNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="与上一指令是否并行" class="InstruNewlyAddedBoxFixed">
                        <el-checkbox v-model="ruleForm.EquipmentFixed" name="type"></el-checkbox>
                    </el-form-item>
                </el-form>
            </div>
            <div class="InstruNewlyAdded_btn">
                <el-button
                    class="InstruNewlyAdded_Close"
                    @click="OnModifyAndSave('ruleForm')"
                    type="primary"
                >确 定</el-button>
                <el-button class="InstruNewlyAdded_Close" @click="OnClose">取 消</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
import { BasicData } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            ReceiveQuery: this.$route.query,//接收参数
            QueryArr: [], //指令编制数据
            QueryArrState: [
                {
                    name: "否",
                    id: "0"
                },
                {
                    name: "是",
                    id: "1"
                }
            ],
            instructId:"",//修改id
            condetion:"",
            TableHeight: {
                height: ""
            },
            
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数

            ElasticFrame: false, //是否隐藏新增弹框
            ModifyFrame:false,//是否隐藏修改弹框
            ruleForm: {
                InstructionName: "", //指令名称
                Instruction:"",//指令号
                region:"",//区域
                edition:"",//版本
                SerialNumber:"",//序号
                EquipmentFixed:false,//与上一指令是否并行
            },
            parallel:"",
            rules: {
                //验证
                InstructionName: [
                    //指令名称
                    { required: true, message: " ", trigger: "blur" }
                ],
                Instruction: [
                    //指令号
                    { required: true, message: " ", trigger: "blur" }
                ],
                region: [
                    //区域
                    { required: true, message: " ", trigger: "blur" }
                ],
                edition: [
                    //版本
                    { required: true, message: " ", trigger: "blur" }
                ],
                SerialNumber: [
                    //序号
                    { required: true, message: " ", trigger: "blur" }
                ],

               
            },
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OnQuery()
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 105 + "px";
        },
        //查询
        OnQuery(){
            this.axios({
                method: "post",
                url: BasicData.GET_P_InstructionEditingQuery,
                data: {
                    pageNum: 1, //当前页
                    pageSize: this.pageSize, //每页多少条
                    condetion: this.condetion, //名称
                    stationId:parseInt(this.ReceiveQuery.stationId),

                }
            })
                .then(res => {
                    console.log(res.data.records,'res')
                    this.QueryArr = res.data.records;
                    this.QueryArr.map(ite => {
                        this.QueryArrState.map(val => {
                            if (ite.parallel == val.id) {
                                ite.parallel = val.name;
                            }
                        });
                    });
                    this.total = res.data.total;
                    
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //切换每页展示多少条数据
        handleSizeChange(val) {
            this.pageSize = val;
            this.OnQuery();
        },
        //分页
        OnPaging(nowPages) {
            this.axios({
                method: "post",
                url: BasicData.GET_P_InstructionEditingQuery,
                data: {
                    pageNum: nowPages, //当前页
                    pageSize: this.pageSize, //每页条数
                    condetion: this.condetion, //名称
                    stationId:parseInt(this.ReceiveQuery.stationId),
                }
            })
                .then(res => {
                    this.QueryArr = res.data.records;
                    this.total = res.data.total;
                    this.QueryArr.map(ite => {
                        this.QueryArrState.map(val => {
                            if (ite.parallel == val.id) {
                                ite.parallel = val.name;
                            }
                        });
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //新增
        NewlyAdded(){
            this.ElasticFrame = true;
            this.ruleForm.SerialNumber = "";//序号
            this.ruleForm.InstructionName = "";//指令名称
            this.ruleForm.Instruction = "";//指令号
            this.ruleForm.region = "";//区域
            this.ruleForm.edition = "";//版本
            this.ruleForm.EquipmentFixed = false;
        },
           //新增保存
        AddAndSave(formName){
                if(this.ruleForm.EquipmentFixed == true){
                    this.parallel = 1
                } else{
                    this.parallel = 0
                }
              this.$refs[formName].validate(valid => {
                if (valid) {
                   
                    
                     this.axios({
                            method: "post",
                            url: BasicData.GET_P_InstructionEditingNewlyAdded,
                            data: {
                                stationId:parseInt(this.ReceiveQuery.stationId),//id
                                instructSort:this.ruleForm.SerialNumber,//序号
                                instructName:this.ruleForm.InstructionName, //指令名称
                                instructNum:this.ruleForm.Instruction,//指令号
                                workingArea:this.ruleForm.region,//区域
                                version:this.ruleForm.edition,//版本
                                parallel:this.parallel
                            }
                        }).then(res => {
                            console.log(res,'1111')
                             if (res.data.success === true) {
                                this.$message({
                                    //成功后的提示
                                    message: "新增成功",
                                    type: "success",
                                    duration: 1500
                                });
                                this.ElasticFrame = false; //是否隐藏弹框
                                this.OnQuery();
                            } else if (res.data.success === false) {
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
                  
                       
                   
                } else {
                    this.$message({
                        //失败后的提示
                        message: "请完善信息",
                        type: "warning",
                        duration: 1500
                    });
                    return false;
                }
            });
            
        },

        //关闭新增弹框
        OnClose(){
            this.ElasticFrame = false;
            this.ModifyFrame = false;
        },
        //修改
        OnModify($inxex,row){
            console.log(row,'row')
            this.instructId = row.instructId
            this.ModifyFrame = true;
            this.ruleForm.SerialNumber = row.instructSort;//序号
            this.ruleForm.InstructionName = row.instructName;//指令名称
            this.ruleForm.Instruction = row.instructNum;//指令号
            this.ruleForm.region = row.workingArea;//区域
            this.ruleForm.edition = row.version;//版本
            if(row.parallel == "否"){
                this.ruleForm.EquipmentFixed = false;
            } else{
                this.ruleForm.EquipmentFixed = true;
            }
            
        },
        //修改保存
        OnModifyAndSave(formName){
              if(this.ruleForm.EquipmentFixed == true){
                    this.parallel = 1
                } else{
                    this.parallel = 0
                }
              this.$refs[formName].validate(valid => {
                if (valid) {
                   
                    
                     this.axios({
                            method: "post",
                            url: BasicData.GET_P_InstructionEditingModifyAndSave,
                            data: {
                                instructId:this.instructId,//id
                                instructSort:this.ruleForm.SerialNumber,//序号
                                instructName:this.ruleForm.InstructionName, //指令名称
                                instructNum:this.ruleForm.Instruction,//指令号
                                workingArea:this.ruleForm.region,//区域
                                version:this.ruleForm.edition,//版本
                                parallel:this.parallel
                            }
                        }).then(res => {
                            console.log(res,'1111')
                             if (res.data.success === true) {
                                this.$message({
                                    //成功后的提示
                                    message: "修改成功",
                                    type: "success",
                                    duration: 1500
                                });
                                this.ModifyFrame = false; //是否隐藏弹框
                                this.OnQuery();
                            } else if (res.data.success === false) {
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
                  
                       
                   
                } else {
                    this.$message({
                        //失败后的提示
                        message: "请完善信息",
                        type: "warning",
                        duration: 1500
                    });
                    return false;
                }
            });
            
        },
        //删除
        OnDelete($idnex,row){
            this.axios
                .get(BasicData.GET_P_InstructionEditingModifyDelete, {
                    params: {
                        instructId: row.instructId,
                    }
                })
                .then(res => {
                    if (res.data.success === true) {
                                this.$message({
                                    //成功后的提示
                                    message: "删除成功",
                                    type: "success",
                                    duration: 1500
                                });
                              
                                this.OnQuery();
                            } else if (res.data.success === false) {
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
         //编制
        OnOrganization($index,row){
                this.$router.push({
                    path: "InstructionContent",
                    query: {
                        workFlowId: this.ReceiveQuery.workFlowId,
                        sortieNo:this.ReceiveQuery.sortieNo,
                        stationId:this.ReceiveQuery.stationId,
                        instructId:row.instructId
                    }
                });
        },
         //返回
        OnReturn(){
            this.$router.go(-1);
        },

  

   
       

     
    
    }
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}

.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/


.Instru_operation {
    height: 50px;
    padding: 0px 10px; 
}


.Instru_operation_div_inp{
    width: 200px;
    float: left;
    /* margin-left: 10px; */
    margin-top: 7px;
}

.Instru_operation_nei {
    width: 100%;
    height: 100%;
    /* background: #ccc; */
}

.Instru_operation_bnt {
    margin-left: 10px;
    margin-top: 7px;
}
.Instru_operation_bntleft{
    float:right;
    margin-top: 7px;
}

.Instru_contnet {
    width: 100%;
}
.Instru_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.InstruNewlyAdded {
    height: 200px;
}
.InstruNewlyAddedBox {
    width: 300px;
    float: left;
}
.InstruNewlyAddedBox div {
    width: 170px;
}
.InstruNewlyAddedBoxremarks {
    width: 500px;
    float: left;
}
.InstruNewlyAddedBoxremarks div {
    width: 470px;
}
.InstruNewlyAddedBoxFixed {
    width: 300px;
    float: left;
    overflow: hidden;
}
.InstruNewlyAddedBoxFixed label{
    width: 140px !important;
    float: left;
}
.InstruNewlyAddedBoxFixed div {
    width: 30px;
    float: left;
    margin-left: 0px !important;
}
/* form表单之间的间距样式 */
.el-form-item {
    margin-bottom: 5px;
}
.InstruNewlyAdded_btn {
    height: 40px;
}
.InstruNewlyAdded_Close {
    float: right;
    margin-right: 10px;
}

.DetectPaging {
    /* width: 100%; */
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
}

</style>