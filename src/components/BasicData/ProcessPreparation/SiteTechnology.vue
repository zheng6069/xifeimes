<template>
    <div>
        <div class="SiteTech_operation">
            <div class="SiteTech_operation_div">
                <div class="SiteTech_operation_div_title">
                    架次号
                </div>
                <div class="SiteTech_operation_div_inp">
                     <el-input
                            v-model="sortieNo"
                            :disabled="true"
                            size="medium"
                            clearable
                        ></el-input>
                </div>
            </div>
            <el-button
                @click="OnReturn"
                size="medium"
                type="primary"
                class="SiteTech_operation_bntReturn"
            >返回</el-button>
            <el-button
                @click="NewlyAdded"
                size="medium"
                type="primary"
                class="SiteTech_operation_bntReturn"
            >新增</el-button>
          
        </div>

        <div class="SiteTech_contnet" :style="TableHeight">
            <div class="SiteTech_contnet_table">
                <el-table
                    @selection-change="Tick"
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
                    <el-table-column type="selection" width="40"></el-table-column>
                    <!-- <el-table-column label="序号" type="index" width="60"></el-table-column> -->
                    <el-table-column prop="aoName" label="AO名称"></el-table-column>
                    <el-table-column prop="aoNo" label="AO编号"></el-table-column>
                    <el-table-column prop="version" label="AO版本"></el-table-column>
                    <el-table-column prop="stationName" label="站位名称"></el-table-column>
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
        <!-------- 新增 -------->
        <el-dialog :visible.sync="ElasticFrame" width="650px">
            <div class="SiteTechNewlyAdded">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="AO名称" prop="AOName" class="SiteTechNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.AOName"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="AO编号" prop="AONumber" class="SiteTechNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.AONumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="AO版本" prop="AOEdition" class="SiteTechNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.AOEdition"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="站位名称" prop="StationName" class="SiteTechNewlyAddedBox">
                        <el-select v-model="ruleForm.StationName"  placeholder="请选择">
                            <el-option
                                v-for="item in StandingPositionArr"
                                :key="item.id"
                                :label="item.warehouseName"
                                :value="item.warehouseName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="SiteTechNewlyAdded_btn">
                <el-button
                    class="SiteTechNewlyAdded_Close"
                    @click="AddAndSave('ruleForm')"
                    type="primary"
                >确 定</el-button>
                <el-button class="SiteTechNewlyAdded_Close" @click="OnClose">取 消</el-button>
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
            sortieNo:this.$route.query.sortieNo,//获取架次号
            QueryArr: [], //站位工艺信息
            StandingPositionArr:[],//站位信息
            TableHeight: {
                height: ""
            },
            
            ElasticFrame: false, //是否隐藏新增弹框
            ruleForm: {
                AOName: "", //AO名称
                AONumber:"",//AO编号
                AOEdition:"",//AO版本
                StationName:"",//站位名称
            },
            rules: {
                //验证
                AOName: [
                    //AO名称
                    { required: true, message: " ", trigger: "blur" }
                ],
                AONumber: [
                    //AO编号
                    { required: true, message: " ", trigger: "blur" }
                ],
                AOEdition: [
                    //AO版本
                    { required: true, message: " ", trigger: "blur" }
                ],
                StationName: [
                    //站位名称
                    { required: true, message: " ", trigger: "blur" }
                ],
               
            },
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.OnQuery();
       
    },
    methods: {
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 60 + "px";
        },
        //查询
        OnQuery(){
            this.axios
                .get(BasicData.GET_P_SiteTechnologyQuery, {
                    params: {
                        workFlowId: this.ReceiveQuery.workFlowId,
                    }
                })
                .then(res => {
                    this.QueryArr = res.data
                })
                .catch(error => {
                    console.log(error);
                });
        },
        
    
        //新增
        NewlyAdded(){
            this.ElasticFrame = true;
            this.OnQueryStandingPosition()
        },
        //查询站位
        OnQueryStandingPosition(){
             this.axios({
                method: "post",
                url: BasicData.GET_Z_findAllWarehouse,
                data: {
    
                }
            })
                .then(res => {
                    console.log(res.data,'res')
                    this.StandingPositionArr = res.data
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //新增保存
        AddAndSave(formName){
              this.$refs[formName].validate(valid => {
                if (valid) {
                     this.axios({
                            method: "post",
                            url: BasicData.GET_P_SiteTechnologyNewlyAdded,
                            data: {
                                workFlowId:this.ReceiveQuery.workFlowId,
                                aoName:this.ruleForm.AOName, //AO名称
                                aoNo:this.ruleForm.AONumber,//AO编号
                                version:this.ruleForm.AOEdition,//AO版本
                                stationName:this.ruleForm.StationName,//站位名称
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
        //编制
        OnOrganization($index,row){
                this.$router.push({
                    path: "InstructionEditing",
                    query: {
                        workFlowId: this.ReceiveQuery.workFlowId,
                        sortieNo:this.ReceiveQuery.sortieNo,
                        stationId:row.stationId,
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


.SiteTech_operation {
    height: 50px;
    /* padding: 0px 10px;  */
    overflow: hidden;
}
.SiteTech_operation_div{
    width: 240px;
    margin-left: 10px;
    margin-top: 7px;
    float: left;
}
.SiteTech_operation_div_title{
    width: 60px;
    float: left;
    line-height: 36px;
}
.SiteTech_operation_div_inp{
    width: 180px;
    float: left;
}
.SiteTech_operation_nei {
    width: 100%;
    height: 100%;
    /* background: #ccc; */
}

.SiteTech_operation_bnt {
    margin-left: 10px;
    margin-top: 7px;
}
.SiteTech_operation_bntReturn{
    float: right;
    margin-right: 10px;
    margin-top: 7px;
}

.SiteTech_contnet {
    width: 100%;
}
.SiteTech_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.SiteTechNewlyAdded {
    height: 140px;
}
.SiteTechNewlyAddedBox {
    width: 300px;
    float: left;
}
.SiteTechNewlyAddedBox div {
    width: 170px;
}
.SiteTechNewlyAddedBoxremarks {
    width: 500px;
    float: left;
}
.SiteTechNewlyAddedBoxremarks div {
    width: 470px;
}
/* form表单之间的间距样式 */
.el-form-item {
    margin-bottom: 5px;
}
.SiteTechNewlyAdded_btn {
    height: 40px;
}
.SiteTechNewlyAdded_Close {
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