<template>
    <div>
        <div class="Propre_operation">
            <el-button
                size="medium"
                type="primary"
                class="Propre_operation_bnt"
            >复制</el-button>
            <el-button
                @click="NewlyAdded"
                size="medium"
                type="primary"
                class="Propre_operation_bnt"
            >新增</el-button>
        </div>

        <div class="Propre_contnet" :style="TableHeight">
            <div class="Propre_contnet_table">
                <el-table
                    @selection-change="Tick"
                    border
                    :data="QueryArr"
                    ref="multipleTable"
                    height="100%"
                    style="width: 100%;height:100%;"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <!-- <el-table-column label="序号" type="index" width="60"></el-table-column> -->
                    <el-table-column prop="name" label="工艺流程名称" width="120"></el-table-column>
                    <el-table-column prop="code" label="工艺流程编号" width="120"></el-table-column>
                    <el-table-column prop="airType" label="机型" width="100"></el-table-column>
                    <el-table-column prop="version" label="工艺流程版本" width="120"></el-table-column>
                    <el-table-column prop="sortieNo" label="适用架次号" width="120"></el-table-column>
                    <el-table-column prop="drawing" label="产品图号" width="120"></el-table-column>
                    <el-table-column prop="description" label="描述"></el-table-column>
                
                    <el-table-column label="操作" width="105">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="OnOrganization(scope.$index, scope.row)"
                            >编制</el-button>
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
            <div class="PropreNewlyAdded">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="工艺流程名称" prop="TechnologicalProcessName" class="PropreNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.TechnologicalProcessName"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="工艺流程编号" prop="TechnologicalProcessNumber" class="PropreNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.TechnologicalProcessNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="工艺流程版本" prop="TechnologicalProcessEdition" class="PropreNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.TechnologicalProcessEdition"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="架次号" prop="SortieNumber" class="PropreNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.SortieNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="产品图号" prop="ProductDrawingNumber" class="PropreNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.ProductDrawingNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="机型" prop="ProductMdel" class="PropreNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.ProductMdel"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                     <el-form-item label="描述" class="PropreNewlyAddedBoxremarks">
                        <el-input
                            style="width:100%;"
                            v-model="ruleForm.Describe"
                            type="textarea"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="PropreNewlyAdded_btn">
                <el-button
                    class="PropreNewlyAdded_Close"
                    @click="AddAndSave('ruleForm')"
                    type="primary"
                >确 定</el-button>
                <el-button class="PropreNewlyAdded_Close" @click="OnClose">取 消</el-button>
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
            QueryArr: [], //工艺编制数据
            TableHeight: {
                height: ""
            },
            
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数

            ElasticFrame: false, //是否隐藏新增弹框
            ruleForm: {
                TechnologicalProcessName: "", //工艺流程名称
                TechnologicalProcessNumber:"",//工艺流程编号
                TechnologicalProcessEdition:"",//工艺流程版本
                SortieNumber:"",//架次号
                ProductDrawingNumber:"",//产品图号
                ProductMdel:"",//机型
                Describe:"",//描述
            },
            rules: {
                //验证
                TechnologicalProcessName: [
                    //工艺流程名称
                    { required: true, message: " ", trigger: "blur" }
                ],
                TechnologicalProcessNumber: [
                    //工艺流程编号
                    { required: true, message: " ", trigger: "blur" }
                ],
                TechnologicalProcessEdition: [
                    //工艺流程版本
                    { required: true, message: " ", trigger: "blur" }
                ],
                SortieNumber: [
                    //架次号
                    { required: true, message: " ", trigger: "blur" }
                ],
                ProductDrawingNumber: [
                    //产品图号
                    { required: true, message: " ", trigger: "blur" }
                ],
                ProductMdel: [
                    //机型
                    { required: true, message: " ", trigger: "blur" }
                ],
                Describe: [
                    //描述
                    { required: true, message: " ", trigger: "blur" }
                ],
               
            },
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
            this.TableHeight.height = window.innerHeight - 105 + "px";
        },
        OnQuery(){
            this.axios({
                method: "post",
                url: BasicData.GET_P_ProcessPlanningQuery,
                data: {
                    pageNum: 1, //当前页
                    pageSize: this.pageSize, //每页多少条
                    condetion: "" //名称
                }
            })
                .then(res => {
                    console.log(res.data.records,'res')
                    this.QueryArr = res.data.records;
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
                url: BasicData.GET_P_ProcessPlanningQuery,
                data: {
                        pageNum: nowPages, //当前页
                        pageSize: this.pageSize, //第几页
                        condetion: "" //名称
                }
            })
                .then(res => {
                    this.QueryArr = res.data.records;
                    this.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //新增
        NewlyAdded(){
            this.ElasticFrame = true;
            this.ruleForm.TechnologicalProcessName = ""; //工艺流程名称
            this.ruleForm.TechnologicalProcessNumber = ""; //工艺流程编号
            this.ruleForm.TechnologicalProcessEdition = ""; //工艺流程版本
            this.ruleForm.SortieNumber = ""; //架次号
            this.ruleForm.ProductDrawingNumber = ""; //产品图号
            this.ruleForm.ProductMdel = ""; //机型
            this.ruleForm.Describe = ""; //描述
        },
        //新增保存
        AddAndSave(formName){
              this.$refs[formName].validate(valid => {
                if (valid) {
                     this.axios({
                            method: "post",
                            url: BasicData.GET_P_ProcessPlanningNewlyAdded,
                            data: {
                                name:this.ruleForm.TechnologicalProcessName, //工艺流程名称
                                code:this.ruleForm.TechnologicalProcessNumber,//工艺流程编号
                                version:this.ruleForm.TechnologicalProcessEdition,//工艺流程版本
                                sortieNo:this.ruleForm.SortieNumber,//架次号
                                drawing:this.ruleForm.ProductDrawingNumber,//产品图号
                                airType:this.ruleForm.ProductMdel,//机型
                                description:this.ruleForm.Describe,//描述
                               
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
        },
        //勾选
        Tick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.DeleteArr = row.pop(); //储存新的单选数据
                if (this.DeleteArr != undefined) {
                    this.WorkClothesID = this.DeleteArr.facilityId;
                }
            }
        },
        OnOrganization($index,row){
                this.$router.push({
                    path: "SiteTechnology",
                    query: {
                        workFlowId: row.workFlowId,
                        sortieNo:row.sortieNo,
                    }
                });
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


.Propre_operation {
    height: 50px;
    /* padding: 0px 10px;  */
}

.Propre_operation_nei {
    width: 100%;
    height: 100%;
    /* background: #ccc; */
}

.Propre_operation_bnt {
    margin-left: 10px;
    margin-top: 7px;
}

.Propre_contnet {
    width: 100%;
}
.Propre_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.PropreNewlyAdded {
    height: 200px;
}
.PropreNewlyAddedBox {
    width: 300px;
    float: left;
}
.PropreNewlyAddedBox div {
    width: 170px;
}
.PropreNewlyAddedBoxremarks {
    width: 500px;
    float: left;
}
.PropreNewlyAddedBoxremarks div {
    width: 470px;
}
/* form表单之间的间距样式 */
.el-form-item {
    margin-bottom: 5px;
}
.PropreNewlyAdded_btn {
    height: 40px;
}
.PropreNewlyAdded_Close {
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