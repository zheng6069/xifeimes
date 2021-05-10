<template>
    <div>
        <div class="InstCon_operation">
                <el-button
                    @click="OnReturn"
                    size="mini"
                    type="primary"
                    class="InstCon_operation_bnt"
                >返回</el-button>
            </div>
        <div class="InstCon_contnet" :style="LargeHeight">
            <div class="InstCon_contnet_table" >
                <el-tabs type="border-card" v-model="activeName" @tab-click="handClick">
                    <el-tab-pane label="工序" name="WorkingProcedure">
                        <div  :style="TableHeight">
                            <div style="height: 100%">
                                <el-table
                                    border
                                    :data="WorkingProcedureArr"
                                    height="100%"
                                    style="width: 100%; height: 100%"
                                    :header-row-style="{ height: '39px' }"
                                    :header-cell-style="{ padding: '0px' }"
                                    :row-style="{ height: '39px' }"
                                    :cell-style="{ padding: '0px' }"
                                    highlight-current-row
                                    @row-click="WorkingProcedureRowClick"
                                >
                                    <el-table-column prop="stepSerial" label="序号"></el-table-column>
                                    <el-table-column prop="stepName" label="工序名称"></el-table-column>
                                    <el-table-column prop="stepNo" label="工序号"></el-table-column>
                                    <el-table-column label="操作" width="100">
                                        <template slot-scope="scope">
                                            <el-button
                                                type="primary"
                                                size="mini"
                                                @click.native="OnWorkingProcedureDelete(scope.row)"
                                            >删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="InstCon_head">
                            <el-button @click="WorkingProcedureNewlyAdded" size="medium" type="primary" class="InstCon_head_bnt">新增</el-button>
                            <el-button @click="WorkingProcedureModify" size="medium" type="primary" class="InstCon_head_bnt">修改</el-button>
                            <el-button @click="OnWorkingProcedureNewAddSave('ruleForm')"  v-if="WorkingProcedureNewlyAddedTrue" size="medium" type="primary" class="InstCon_head_bnt">保存</el-button>
                            <el-button @click="OnWorkingProcedureModifyAddSave('ruleForm')" v-if="WorkingProcedureModifyTrue" size="medium" type="primary" class="InstCon_head_bnt">保存</el-button>
                        </div>
                        <div>
                            <el-form
                                :model="ruleForm"
                                :rules="rules"
                                ref="ruleForm"
                                label-width="80px"
                            >
                                <el-form-item label="序号" prop="workingProcedure" class="InstCon_NewlyAddedBox">
                                    <el-input  v-model="ruleForm.workingProcedure" oninput="value=value.replace(/[^\d]/g,'')" :disabled="WorkingDisa" size="medium" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="工序名称" prop="ProcessName" class="InstCon_NewlyAddedBox">
                                    <el-input v-model="ruleForm.ProcessName" :disabled="WorkingDisa" size="medium" placeholder="请输入" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="工序号" prop="SerialNumber" class="InstCon_NewlyAddedBox">
                                    <el-input
                                        v-model="ruleForm.SerialNumber"
                                        oninput="value=value.replace(/[^\d]/g,'')"
                                        :disabled="WorkingDisa"
                                        size="medium"
                                        placeholder="请输入"
                                        clearable
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="工序说明" class="InstCon_NewlyAddedBoxremarks">
                                    <el-input
                                        style="width:100%;"
                                        :disabled="WorkingDisa"
                                        v-model="ruleForm.ProcessDescription"
                                        type="textarea"
                                        placeholder="请输入"
                                        clearable
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="工序内容" class="InstCon_NewlyAddedBoxremarks">
                                    <el-input
                                        style="width:100%;"
                                        :disabled="WorkingDisa"
                                        v-model="ruleForm.ProcessContent"
                                        type="textarea"
                                        placeholder="请输入"
                                        clearable
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="专检" class="InstCon_NewlyAddedBoxFixed">
                                    <el-checkbox v-model="ruleForm.SpecialInspection" :disabled="WorkingDisa" name="type"></el-checkbox>
                                </el-form-item>
                                <el-form-item label="适航代表确认" class="InstCon_NewlyAddedBoxFixed">
                                    <el-checkbox v-model="ruleForm.AirworthinessRepresentative" :disabled="WorkingDisa" name="type"></el-checkbox>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="资源" name="Resources">
                        <div class="InstCon_Resources" :style="ResourcesHeight">
                            <!-- 设备信息 -->
                            <div class="InstCon_Resources_Equipment">
                                <div class="InstCon_Resources_EquipmentHead">
                                    <div class="InstCon_Resources_EquipmentTitle">设备信息</div>
                                </div>
                                
                                <div class="InstCon_Resources_EquipmentCon">
                                    <el-table
                                        border
                                        :data="EquipmentArr"
                                        height="100%"
                                        style="width: 100%; height: 100%"
                                        :header-row-style="{ height: '35px' }"
                                        :header-cell-style="{ padding: '0px' }"
                                        :row-style="{ height: '35px' }"
                                        :cell-style="{ padding: '0px' }"
                                    >
                                        <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                                        <el-table-column prop="facilityModel" label="设备型号"></el-table-column>
                                        <el-table-column prop="specifications" label="设备规格"></el-table-column>
                                        <el-table-column prop="needQty" width="60" label="数量"></el-table-column>
                                        <el-table-column label="操作" width="80">
                                            <template slot-scope="scope">
                                                <el-button
                                                    type="primary"
                                                    size="mini"
                                                    @click="OnEquipmentDelete(scope.row)"
                                                >删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div class="InstCon_Resources_EquipmentFooter">
                                    <el-button
                                        @click="OnSelectDevice"
                                        class="InstCon_Resources_EquipmentFooterLfet"
                                        size="mini"
                                        type="primary"
                                    >选择设备</el-button>
                                </div>
                            </div>
                            <!-- 配套件信息 -->
                            <div class="InstCon_Resources_Accessories">
                                <div class="InstCon_Resources_AccessoriesTitle">配套件信息</div>
                                <div class="InstCon_Resources_AccessoriesCon">
                                    <el-table
                                        border
                                        :data="AccessoriesArr"
                                        height="100%"
                                        style="width: 100%; height: 100%"
                                        :header-row-style="{ height: '35px' }"
                                        :header-cell-style="{ padding: '0px' }"
                                        :row-style="{ height: '35px' }"
                                        :cell-style="{ padding: '0px' }"
                                    >
                                        <el-table-column prop="assemProduct" label="装入件图号"></el-table-column>
                                        <el-table-column prop="assemName" label="装入件名称"></el-table-column>
                                        <el-table-column prop="qty" width="60" label="数量"></el-table-column>
                                        <el-table-column label="操作" width="80">
                                            <template slot-scope="scope">
                                                <el-button
                                                    type="primary"
                                                    size="mini"
                                                    @click="OnAccessorDelete(scope.row)"
                                                >删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div class="InstCon_Resources_AccessoriesFooter">
                                    <el-button
                                        @click="OnSelectionOfAccessories"
                                        class="InstCon_Resources_AccessoriesFooterLfet"
                                        size="mini"
                                        type="primary"
                                    >选择配套件信息</el-button>
                                </div>
                            </div>
                            <!-- 工量具信息 -->
                            <div class="InstCon_Resources_Measuring">
                                <div class="InstCon_Resources_MeasuringTitle">工(量)具信息</div>
                                <div class="InstCon_Resources_MeasuringCon">
                                    <el-table
                                        border
                                        :data="MeasuringToolsArr"
                                        height="100%"
                                        style="width: 100%; height: 100%"
                                        :header-row-style="{ height: '35px' }"
                                        :header-cell-style="{ padding: '0px' }"
                                        :row-style="{ height: '35px' }"
                                        :cell-style="{ padding: '0px' }"
                                    >
                                        <el-table-column prop="toolName" label="工具名称"></el-table-column>
                                        <el-table-column prop="toolCode" label="编号"></el-table-column>
                                        <el-table-column prop="toolSpec" label="规格"></el-table-column>
                                        <el-table-column prop="toolsType" label="工具类型"></el-table-column>
                                        <el-table-column label="操作" width="80">
                                            <template slot-scope="scope">
                                                <el-button
                                                    type="primary"
                                                    size="mini"
                                                    @click="OnMeasuringToolsDelete(scope.row)"
                                                >删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div class="InstCon_Resources_MeasuringFooter">
                                    <el-button
                                        @click="OnSelectionMeasuringTools"
                                        class="InstCon_Resources_MeasuringFooterLfet"
                                        size="mini"
                                        type="primary"
                                    >选择工(量)具</el-button>
                                </div>
                            </div>

                            <!-- 工装信息 -->
                            <div class="InstCon_Resources_Clothes">
                                <div class="InstCon_Resources_ClothesTitle">工装信息</div>
                                <div class="InstCon_Resources_ClothesCon">
                                    <el-table
                                        border
                                        :data="WorkClothesArr"
                                        height="100%"
                                        style="width: 100%; height: 100%"
                                        :header-row-style="{ height: '35px' }"
                                        :header-cell-style="{ padding: '0px' }"
                                        :row-style="{ height: '35px' }"
                                        :cell-style="{ padding: '0px' }"
                                    >
                                        <el-table-column prop="frockName" label="工装名称"></el-table-column>
                                        <el-table-column prop="frockProduct" label="工装图号/型号"></el-table-column>
                                        <el-table-column prop="specifications" label="规格" width="60"></el-table-column>
                                        <el-table-column prop="frockType" label="类型" width="80"></el-table-column>
                                        <el-table-column prop="qty" label="数量" width="60"></el-table-column>
                                        <el-table-column label="操作" width="80">
                                            <template slot-scope="scope">
                                                <el-button
                                                    type="primary"
                                                    size="mini"
                                                    @click="OnWorkClothesDelete(scope.row)"
                                                >删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div class="InstCon_Resources_ClothesFooter">
                                    <el-button
                                        @click="OnSelectionWorkClothes"
                                        class="InstCon_Resources_ClothesFooterLfet"
                                        size="mini"
                                        type="primary"
                                    >选择工装</el-button>
                                </div>
                            </div>

                            <!-- 辅材信息 -->
                            <div class="InstCon_Resources_Auxiliary">
                                <div class="InstCon_Resources_AuxiliaryTitle">辅材信息</div>
                                <div class="InstCon_Resources_AuxiliaryCon">
                                    <el-table
                                        border
                                        :data="AuxiliaryMaterialsArr"
                                        height="100%"
                                        style="width: 100%; height: 100%"
                                        :header-row-style="{ height: '35px' }"
                                        :header-cell-style="{ padding: '0px' }"
                                        :row-style="{ height: '35px' }"
                                        :cell-style="{ padding: '0px' }"
                                    >
                                        <el-table-column prop="assemName" label="辅材名称"></el-table-column>
                                        <el-table-column prop="assemProduct" label="辅材图号/型号"></el-table-column>
                                        <el-table-column prop="version" label="规格" width="60"></el-table-column>
                                        <el-table-column prop="qty" label="数量" width="50"></el-table-column>
                                        <el-table-column label="操作" width="80">
                                            <template slot-scope="scope">
                                                <el-button
                                                    type="primary"
                                                    size="mini"
                                                    @click="OnAuxiliaryMaterialsDelete(scope.row)"
                                                >删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div class="InstCon_Resources_AuxiliaryFooter">
                                    <el-button
                                        @click="OnSelectionAuxiliaryMaterials"
                                        class="InstCon_Resources_AuxiliaryFooterLfet"
                                        size="mini"
                                        type="primary"
                                    >选择辅材</el-button>
                                </div>
                            </div>
                            <div class="InstCon_Resources_file">
                                <el-button
                                    @click="UploadEnclosure"
                                    class="InstCon_Resources_ClothesFooterLfet"
                                    size="mini"
                                    type="primary"
                                >上传及查看文档</el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="属性" name="Attribute">
                        <div :style="AttributeHeight">
                            <div style="height: 100%">
                                <el-table
                                    border
                                    :data="AttributeArr"
                                    height="100%"
                                    style="width: 100%; height: 100%"
                                    :header-row-style="{ height: '39px' }"
                                    :header-cell-style="{ padding: '0px' }"
                                    :row-style="{ height: '39px' }"
                                    :cell-style="{ padding: '0px' }"
                                >
                                    <el-table-column prop="needQualifications" label="资质"></el-table-column>
                                    <el-table-column prop="needPersons" label="需求数量"></el-table-column>
                                    <el-table-column prop="importantQua" label="是否重要资质"></el-table-column>
                                    <el-table-column label="操作" width="100">
                                        <template slot-scope="scope">
                                            <el-button
                                                type="primary"
                                                size="mini"
                                                @click.native="OnAddQualificationsDelete(scope.row)"
                                            >删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="InstCon_head">
                            
                            <el-button @click="SaveNewAttribute" size="medium" type="primary" class="InstCon_head_bnt">保存</el-button>
                            <el-button @click="AddQualifications" size="medium" type="primary" class="InstCon_head_bnt">添加资质</el-button>
                            
                        </div>
                        <div>
                            <el-form :model="AttributeRuleForm" label-width="80px">
                                <el-form-item label="准备工时" class="InstCon_NewlyAddedBox">
                                    <el-input 
                                        v-model="AttributeRuleForm.PreparationTime" 
                                        size="medium" 
                                        placeholder="请输入" clearable
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="生产工时"  class="InstCon_NewlyAddedBox">
                                    <el-input 
                                        v-model="AttributeRuleForm.ProductionHours" 
                                        size="medium" 
                                        placeholder="请输入" 
                                        clearable
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="人员需求"  class="InstCon_NewlyAddedBox">
                                    <el-input
                                        :disabled="true"
                                        v-model="AttributeRuleForm.PersonnelRequirements" 
                                        size="medium" 
                                        placeholder="请输入" 
                                        clearable
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="风险工序等级" class="InstCon_risk">   
                                    <el-select size="medium" v-model="AttributeRuleForm.RiskLevel" clearable placeholder="请选择">
                                        <el-option label="低级" value="低级"></el-option>
                                        <el-option label="中级" value="中级"></el-option>
                                        <el-option label="高级" value="高级"></el-option>
                                    </el-select>
                                </el-form-item>
                               <el-form-item label="外协单位" class="InstCon_NewlyAddedBox">
                                    <el-input
                                        v-model="AttributeRuleForm.OutsourcingUnit"
                                        size="medium"
                                        placeholder="请输入"
                                        clearable
                                    ></el-input>
                                </el-form-item>
                               
                                <el-form-item label="外协工序" class="InstCon_WorkingFixed">
                                    <el-checkbox 
                                        v-model="AttributeRuleForm.OutsourcingProcess" 
                                        name="type"
                                    ></el-checkbox>
                                </el-form-item>
                                <el-form-item label="关键工序" class="InstCon_WorkingFixed">
                                    <el-checkbox 
                                        v-model="AttributeRuleForm.KeyProcess" 
                                        name="type"
                                    ></el-checkbox>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>

        <!----------- 设备弹框 ------------->
        <el-dialog :visible.sync="EquipmentFrame" width="70%">
            <div style="height:50px;">
                <div class="InstCon_Frame_div">
                    <div class="InstCon_Frame_div_title">
                        设备名称
                    </div>
                    <div class="InstCon_Frame_div_inp">
                        <el-input
                                placeholder="请输入"
                                v-model="QueryEquipmentName"
                                size="medium"
                                clearable
                            ></el-input>
                    </div>
                </div>
                <div class="InstCon_Frame_div">
                    <div class="InstCon_Frame_div_title">
                        设备类型
                    </div>
                    <div class="InstCon_Frame_div_inp">
                        <el-input
                                placeholder="请输入"
                                v-model="QueryEquipmentType"
                                size="medium"
                                clearable
                            ></el-input>
                    </div>
                </div>
              
                <el-button @click="OnSelectDevice" size="medium" type="primary">查询</el-button>
                <el-button @click="EquipmentConfirmation" size="medium" class="InstCon_Frame_div_btn" type="primary">确认</el-button>
            </div>
            <div style="height:200px;">
                <el-table
                    border
                    height="100%"
                    :data="EquipmentWholeArr"
                    ref="multipleTable"
                    @selection-change="OnEquipmentTick"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '38px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '38px' }"
                    :cell-style="{ padding: '0px' }"
                >   
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                    <el-table-column prop="facilityType" label="设备类型"></el-table-column>
                    <el-table-column prop="facilityModel" label="设备型号"></el-table-column>
                    <el-table-column prop="facilitySize" label="设备规格"></el-table-column>
                </el-table>
            </div>

            <div class="InstCon_DetectPaging">
                <el-pagination
                    background
                    @size-change="OnEquipmentSizeChange"
                    @current-change="OnSelectDevicPaging"
                    :current-page="EquipmentNowPages"
                    :page-size="EquipmentPageSize"
                    :page-sizes="[10, 50, 100, 200]"
                    layout="total,sizes, prev, pager, next, jumper"
                    :total="EquipmentTotal"
                ></el-pagination>
            </div>
        </el-dialog>

        <!----------- 配套件弹框 ------------->
        <el-dialog :visible.sync="AccessoriesFrame" width="70%">
            <div style="height:50px;">
                <div class="InstCon_Accessories_div">
                    <div class="InstCon_Accessories_div_title">
                        图号
                    </div>
                    <div class="InstCon_Accessories_div_inp">
                        <el-input
                                placeholder="请输入"
                                v-model="AccessoryDrawingNo"
                                size="medium"
                                clearable
                            ></el-input>
                    </div>
                </div>
                <el-button @click="OnSelectionOfAccessories" size="medium" type="primary">查询</el-button>
                <el-button @click="AccessorConfirmation" size="medium" class="InstCon_Insert_div_btn" type="primary">确认</el-button>
                <div class="InstCon_Insert_div">
                    <div class="InstCon_Insert_div_title">
                        数量
                    </div>
                    <div class="InstCon_Insert_div_inp">
                        <el-input
                                placeholder="请填写"
                                v-model="AccessoryNumber"
                                size="medium"
                                clearable
                            ></el-input>
                    </div>
                </div>
            </div>
            <div style="height:200px;">
                <el-table
                    border
                    height="100%"
                    :data="AccessorWholeArr"
                    ref="multipleTable"
                    @selection-change="OnAccessorTick"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '38px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '38px' }"
                    :cell-style="{ padding: '0px' }"
                >   
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="product" label="图号"></el-table-column>
                    <el-table-column prop="stuffName" label="名称"></el-table-column>
                    <el-table-column prop="assemType" label="类型"></el-table-column>
                    <el-table-column prop="madeBy" label="材料名称"></el-table-column>
                    <el-table-column prop="format" label="规格"></el-table-column>
                </el-table>
            </div>

            <div class="InstCon_DetectPaging">
                <el-pagination
                    background
                    @size-change="OnAccessoriesSizeChange"
                    @current-change="OnAccessoriesPaging"
                    :current-page="AccessorNowPages"
                    :page-size="AccessorPageSize"
                    :page-sizes="[10, 50, 100, 200]"
                    layout="total,sizes, prev, pager, next, jumper"
                    :total="AccessorTotal"
                ></el-pagination>
            </div>
        </el-dialog>


        <!----------- 工量具弹框 ------------->
        <el-dialog :visible.sync="MeasuringToolsFrame" width="70%">
            <div style="height:50px;">
                <div class="InstCon_MeasuringTools_div">
                    <div class="InstCon_MeasuringTools_div_inp">
                        <el-input
                                placeholder="请输入"
                                v-model="MeasuringToolsQuery"
                                size="medium"
                                clearable
                            ></el-input>
                    </div>
                </div>
                <el-button @click="OnSelectionMeasuringTools" size="medium"  type="primary">查询</el-button>
                <el-button @click="MeasuringToolsConfirmation" size="medium" class="InstCon_MeasuringTools_div_btn" type="primary">确认</el-button>
            </div>
            <div style="height:200px;">
                <el-table
                    border
                    height="100%"
                    :data="MeasuringToolsWholeArr"
                    ref="multipleTable"
                    @selection-change="OnMeasuringToolsTick"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '38px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '38px' }"
                    :cell-style="{ padding: '0px' }"
                >   
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="toolName" label="名称"></el-table-column>
                    <el-table-column prop="species" label="类型"></el-table-column>
                    <el-table-column prop="toolProduct" label="图号"></el-table-column>
                    <el-table-column prop="toolFormat" label="规格"></el-table-column>
                </el-table>
            </div>

            <div class="InstCon_DetectPaging">
                <el-pagination
                    background
                    @size-change="OnMeasuringToolsSizeChange"
                    @current-change="OnMeasuringToolsPaging"
                    :current-page="MeasuringToolsNowPages"
                    :page-size="MeasuringToolsPageSize"
                    :page-sizes="[10, 50, 100, 200]"
                    layout="total,sizes, prev, pager, next, jumper"
                    :total="MeasuringToolsTotal"
                ></el-pagination>
            </div>
        </el-dialog>


        <!----------- 工装弹框 ------------->
        <el-dialog :visible.sync="WorkClothesFrame" width="70%">
            <div style="height:50px;">
                <div class="InstCon_MeasuringTools_div">
                    <div class="InstCon_MeasuringTools_div_inp">
                        <el-input
                                placeholder="请输入"
                                v-model="WorkClothesQuery"
                                size="medium"
                                clearable
                            ></el-input>
                    </div>
                </div>
                <el-button @click="OnSelectionWorkClothes" size="medium"  type="primary">查询</el-button>
                
                <el-button @click="WorkClothesConfirmation" size="medium" class="InstCon_Insert_div_btn" type="primary">确认</el-button>
                <div class="InstCon_Insert_div">
                    <div class="InstCon_Insert_div_title">
                        数量
                    </div>
                    <div class="InstCon_Insert_div_inp">
                        <el-input
                                placeholder="请填写"
                                v-model="WorkClothesNumber"
                                size="medium"
                                clearable
                            ></el-input>
                    </div>
                </div>
            </div>
            <div style="height:200px;">
                <el-table
                    border
                    height="100%"
                    :data="WorkClothesWholeArr"
                    ref="multipleTable"
                    @selection-change="OnWorkClothesTick"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '38px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '38px' }"
                    :cell-style="{ padding: '0px' }"
                >   
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="species" label="类型"></el-table-column>
                    <el-table-column prop="product" label="图号"></el-table-column>
                    <el-table-column prop="specifications" label="规格"></el-table-column>
                </el-table>
            </div>

            <div class="InstCon_DetectPaging">
                <el-pagination
                    background
                    @size-change="OnWorkClothesSizeChange"
                    @current-change="OnWorkClothesPaging"
                    :current-page="WorkClothesNowPages"
                    :page-size="WorkClothesPageSize"
                    :page-sizes="[10, 50, 100, 200]"
                    layout="total,sizes, prev, pager, next, jumper"
                    :total="WorkClothesTotal"
                ></el-pagination>
            </div>
        </el-dialog>


         <!----------- 辅材弹框 ------------->
        <el-dialog :visible.sync="AuxiliaryMaterialsFrame" width="70%">
            <div style="height:50px;">
                <div class="InstCon_AuxiliaryMaterials_div">
                    <div class="InstCon_AuxiliaryMaterials_div_inp">
                        <el-input
                                placeholder="请输入"
                                v-model="AuxiliaryMaterialsQuery"
                                size="medium"
                                clearable
                            ></el-input>
                    </div>
                </div>
                <el-button @click="OnSelectionAuxiliaryMaterials" size="medium" type="primary">查询</el-button>
                
                <el-button @click="AuxiliaryMaterialsConfirmation" size="medium" class="InstCon_AuxiliaryMaterials_div_btn" type="primary">确认</el-button>
                <div class="InstCon_Insert_div">
                    <div class="InstCon_Insert_div_title">
                        数量
                    </div>
                    <div class="InstCon_Insert_div_inp">
                        <el-input
                                placeholder="请填写"
                                v-model="AuxiliaryMaterialsNumber"
                                size="medium"
                                clearable
                            ></el-input>
                    </div>
                </div>
                <div class="InstCon_Insert_div">
                    <div class="InstCon_Insert_div_title">
                        单位
                    </div>
                    <div class="InstCon_Insert_div_inp">
                        <el-input
                                placeholder="请填写"
                                v-model="AuxiliaryMaterialsCompany"
                                size="medium"
                                clearable
                            ></el-input>
                    </div>
                </div>
            </div>
            <div style="height:200px;">
                <el-table
                    border
                    height="100%"
                    :data="AuxiliaryMaterialsWholeArr"
                    ref="multipleTable"
                    @selection-change="OnAuxiliaryMaterialsTick"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '38px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '38px' }"
                    :cell-style="{ padding: '0px' }"
                >   
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column prop="stuffName" label="辅材名称"></el-table-column>
                    <el-table-column prop="format" label="规格"></el-table-column>
                    <el-table-column prop="product" label="型号/图号"></el-table-column>
                </el-table>
            </div>

            <div class="InstCon_DetectPaging">
                <el-pagination
                    background
                    @size-change="OnAuxiliaryMaterialsSizeChange"
                    @current-change="OnAuxiliaryMaterialsPaging"
                    :current-page="AuxiliaryMaterialsNowPages"
                    :page-size="AuxiliaryMaterialsPageSize"
                    :page-sizes="[10, 50, 100, 200]"
                    layout="total,sizes, prev, pager, next, jumper"
                    :total="AuxiliaryMaterialsTotal"
                ></el-pagination>
            </div>
        </el-dialog>


         <!----------- 资质弹框 ------------->
        <el-dialog :visible.sync="AttributeFrame" width="480px">
            <div style="height: 100px;">
                <div class="InstCon_Attribute_div">
                    <div class="InstCon_Attribute_div_title">
                        资质
                    </div>
                    <div class="InstCon_Attribute_div_inp">
                        <el-input
                                placeholder="请输入"
                                v-model="QualificationName"
                                size="medium"
                                clearable
                            ></el-input>
                    </div>
                </div>

                 <div class="InstCon_Attribute_div">
                    <div class="InstCon_Attribute_div_title">
                        需求数量
                    </div>
                    <div class="InstCon_Attribute_div_inp">
                        <el-input
                                placeholder="请输入"
                                v-model="QualificationQty"
                                size="medium"
                                clearable
                            ></el-input>
                    </div>
                </div>

                <div class="InstCon_important_div">
                    <div class="InstCon_important_div_title">
                        是否重要资质
                    </div>
                    <div class="InstCon_important_div_inp">
                        <el-select size="medium" v-model="importantTrue" clearable placeholder="请选择">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                        </el-select>
                    
                    </div>
                </div>
            </div>
            <div  style="height: 50px;">
                <el-button @click="AddQualificationsConfirm" size="medium" class="InstCon_AuxiliaryMaterials_div_btn" type="primary">确认</el-button>
            </div>
           
        </el-dialog>

        

          <!----------- 附件弹框 ------------->
        <el-dialog :visible.sync="EnclosureFrame" width="70%">
            <div style="height:50px;">
                <el-button @click="OnNewNearby" class="dialog_Close" type="primary">新增</el-button>
            </div>
            <div style="height:300px;">
                <el-table
                    :data="TechnicalOnAddArr"
                    border
                    height="100%"
                    style="width: 100%;height:100%;"
                   
                >   
                    
                    <el-table-column prop="fileName" label="文档名称" width="240"></el-table-column>
                    <el-table-column prop="fileType" label="文档类型" width="80"></el-table-column>
                    <el-table-column prop="fileUrl" label="文档路径"></el-table-column>
                    <el-table-column label="操作" width="175">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="SeeFile(scope.row)">查看文档</el-button>
                            <el-button
                                type="primary"
                                size="mini"
                                @click="OnDeleteFile(scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>

        <!---------- 上传附件弹框 ---------->
        <el-dialog :visible.sync="TechnicaltFeame" width="50%">
            <div class="ExportStyle">
                <input v-model="index_Technical" type="text" class="text" />
                <input type="file" class="file" @change="AddToFormData" ref="both" />
                <button class="preview">预览</button>
                <div class="title">
                    <span class="title_sapn">*注：</span>
                    文件大小不能超过100M
                </div>
            </div>
            <div class="dialog_footer">
                <el-button
                    class="dialog_Close"
                    type="primary"
                    v-loading.fullscreen.lock="Loading"
                    @click="OnAddSave"
                >保 存</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { BasicData,AssemblyPerform } from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
    data() {
        return {
            ReceiveQuery: this.$route.query,//接收参数
            activeName: "WorkingProcedure",
           
            AttributeDisa:true,//控制属性新增修改是是否可输入
            ruleForm: {
                workingProcedure: "", //序号
                ProcessName: "", //工序名称
                SerialNumber: "", //工序号
                edition: "", //版本
                ProcessDescription:"",//工序说明
                ProcessContent:"",//工序内容
                SpecialInspection:"",//专检
                AirworthinessRepresentative:"",//适航代表确认 
            },
            rules: {
                //验证
                workingProcedure: [
                    //序号
                    { required: true, message: " ", trigger: "blur" }
                ],
                ProcessName: [
                    //工序名称
                    { required: true, message: " ", trigger: "blur" }
                ],
                SerialNumber: [
                    //工序号
                    { required: true, message: " ", trigger: "blur" }
                ],
            },
            WorkingDisa:true,//控制新增修改是是否可输入
            WorkingProcedureArr:[],//工序数据
            WorkingProcedureNewlyAddedTrue:false,//控制工序新增保存显示隐藏
            WorkingProcedureModifyTrue:false,//控制工序修改保存显示隐藏
            stepId:"",//工步id
            impotertStep:"",//专检
            trialStep:"",//适航代表
            LargeHeight: {
                //最外面
                height: ""
            },

            TableHeight: {
                //工序高度
                height: ""
            },
            ResourcesHeight: {
                //资源高度
                height: ""
            },
            AttributeHeight: {
                //属性高度
                height: ""
            },

            EquipmentArr:[],//储存添加完的设备信息
            EquipmentFrame:false,//设备弹框
            QueryEquipmentName:"",//设备名称查询条件字段
            QueryEquipmentType:"",//设备类型查询条件字段
           
            EquipmentWholeArr:[],//储存点击选择设备信息
            EquipmentPageSize: 10, //设备分页每页多少条
            EquipmentNowPages: 1, //设备分页当前页
            EquipmentTotal: 0, //设备分页总数
            EquipmentTickArr:[],//储存勾选信息
            EquipmentName:"",//储存勾选设备名称
            EquipmentType:"",//储存勾选设备类型
            EquipmentModel:"",//储存勾选设备型号
            EquipmentStation:"",//储存勾选站位字段
            EquipmentSpecification:"",//储存勾选设备规格
            
            

            AccessoriesArr:[],//储存装入件添加完后信息
            AccessoriesFrame:false,
            AccessoryDrawingNo:"",//配套件图号
            AccessorPageSize: 10, //配套件分页每页多少条
            AccessorNowPages: 1, //配套件分页当前页
            AccessorTotal: 0, //配套件分页总数
            AccessorWholeArr:[],//储存选择装入件信息
            AccessorTickArr:[],//储存勾选信息
            AccessorProduct:"",//储存勾选图号信息
            AccessorName:"",//储存勾选名称
            AccessorType:"",//储存勾选类型
            AccessorSpecification:"",//储存勾选规格
            AccessoryNumber:"",//确认是数量必填
            AccessoryState: [
                {
                    name: "标准件",
                    id: "0"
                },
                {
                    name: "结构件",
                    id: "1"
                },
                {
                    name: "成品",
                    id: "2"
                }
            ],


            MeasuringToolsArr:[],//查询工量具信息
            MeasuringToolsQuery:"",//工量具类型查询条件字段
            MeasuringToolsFrame:false,//工量具弹框显示隐藏
            MeasuringToolsWholeArr:[],//储存选择工量具信息
            MeasuringToolsPageSize: 10, //工量具分页每页多少条
            MeasuringToolsNowPages: 1, //工量具分页当前页
            MeasuringToolsTotal: 0, //工量具分页总数
            MeasuringToolsTickArr:[],//储存勾选信息
            MeasuringToolsName:"",//名称
            MeasuringToolsCode:"",//编号
            MeasuringToolsSpec:"",//规格
            MeasuringToolsType:"",//类型
            
            WorkClothesArr:[],//查询工装信息
            WorkClothesFrame:false,//工装弹框显示隐藏
            WorkClothesPageSize: 10, //工装分页每页多少条
            WorkClothesNowPages: 1, //工装分页当前页
            WorkClothesTotal: 0, //工装分页总数
            WorkClothesWholeArr:[],//储存选择工装信息
            WorkClothesQuery:"",//工装查询条件字段
            WorkClothesNumber:"",//确认是数量必填
            WorkClothesTickArr:[],//储存勾选信息
            WorkClothesName:"",//名称
            WorkClothesProduct:"",//图号
            WorkClothesSpec:"",//规格
            WorkClothesType:"",//类型

            AuxiliaryMaterialsArr:[],//查询辅材信息
            AuxiliaryMaterialsFrame:false,//辅材弹框显示隐藏
            AuxiliaryMaterialsPageSize: 10, //辅材分页每页多少条
            AuxiliaryMaterialsNowPages: 1, //辅材分页当前页
            AuxiliaryMaterialsTotal: 0, //辅材分页总数
            AuxiliaryMaterialsWholeArr:[],//储存选择辅材信息
            AuxiliaryMaterialsQuery:"",//辅材查询条件字段
            AuxiliaryMaterialsTickArr:[],//储存勾选信息
            AuxiliaryMaterialsNumber:"",//数量必填
            AuxiliaryMaterialsCompany:"",//单位必填
            AuxiliaryMaterialsName:"",//辅材名称
            AuxiliaryMaterialsProduct:"",//辅材名称图号
            AuxiliaryMaterialsSpec:"",//辅材名称规格

            AttributeRuleForm: {//
                PreparationTime: "", //准备工时
                ProductionHours: "", //生产工时
                PersonnelRequirements: "", //人员需求
                RiskLevel: "", //风险工序等级
                OutsourcingUnit:"",//外协单位
                OutsourcingProcess:"",//外协工序
                KeyProcess:"",//关键工序
            },
          
            AttributeArr:[],//查询资源信息
            AttributeFrame:false,//资质弹框
            QualificationName:"",//资质名称
            QualificationQty:"",//需求数量
            importantTrue:"",//是否重要资质
            AttributeState: [
                {
                    name: "否",
                    id: "0"
                },
                {
                    name: "是",
                    id: "1"
                },
              
            ],

            EnclosureFrame:false,//附件弹框
            TechnicaltFeame:false,//上传文档弹框
            index_Technical: "",
            TechnicalOnAddArr: [],
            Loading: false,
        };
    },
    created() {
        this.OnlargeHeight(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.OnlargeHeight); //在生命周期里面监听浏览器变化

        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化

        this.OnResourcesHeight(); //资源高度
        window.addEventListener("resize", this.OnResourcesHeight); //在生命周期里面监听浏览器变化

        this.OnAttributeHeight(); //属性高度
        window.addEventListener("resize", this.OnAttributeHeight); //在生命周期里面监听浏览器变化

        this.showtabs();
        this.OnQueryWorkingProcedure();
    },
    methods: {
        OnlargeHeight() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.LargeHeight.height = window.innerHeight - 200 + "px";
        },

        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 330 + "px";
        },

        OnResourcesHeight() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.ResourcesHeight.height = window.innerHeight - 120 + "px";
        },
        OnAttributeHeight() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.AttributeHeight.height = window.innerHeight - 270 + "px";
        },
        //点击切换table调取数据
        showtabs() {
            if (this.$route.params.activeName != null) {
                this.activeName = this.$route.params.activeName;
                let current1 = this.activeName;
                if (current1 == "WorkingProcedure") {//工序
                    this.OnQueryWorkingProcedure();
                } else if (current1 == "Resources") {//资源
                    this.OnQueryResourcesEquipment();//查询设备信息
                    this.OnQueryAccessories();//查询配套件信息
                    this.OnQueryMeasuringTools();//查询工量具信息
                    this.OnQueryWorkClothes();//查询工装信息
                    this.OnQueryAuxiliaryMaterials();//查询辅材信息
                } else if (current1 == "Attribute") {//属性
                    this.OnQueryAttribute();
                } 
            }
        },
          //
        handClick(tab) {
            if (tab.label == "工序") {
                this.OnQueryWorkingProcedure();
            } else if (tab.label == "资源") {
                this.OnQueryResourcesEquipment();//查询设备信息
                this.OnQueryAccessories();//查询配套件信息
                this.OnQueryMeasuringTools();//查询工量具信息
                this.OnQueryWorkClothes();//查询工装信息
                this.OnQueryAuxiliaryMaterials();//查询辅材信息
            } else if (tab.label == "属性") {
                this.OnQueryAttribute();
            } 
        },
        //查询
        OnQueryWorkingProcedure(){//查询工序
            this.axios({
                method: "post",
                url: BasicData.GET_P_WorkingProcedureQuery,
                data: {
                    pageNum: 1, //当前页
                    pageSize: 100000, //每页多少条
                    condetion:"", //名称
                    instructId:parseInt(this.ReceiveQuery.instructId),

                }
            })
                .then(res => {
                    console.log(res.data.records,'res')
                    this.WorkingProcedureArr = res.data.records;
                    // this.QueryArr = res.data.records;
                    // this.total = res.data.total;
                    
                })
                .catch(error => {
                    console.log(error);
                });
        },
      
        //工序新增
        WorkingProcedureNewlyAdded(){
            this.WorkingDisa = false;
            this.WorkingProcedureNewlyAddedTrue = true,//控制工序新增保存显示隐藏
            this.WorkingProcedureModifyTrue = false,//控制工序修改保存显示隐藏
            this.ruleForm.workingProcedure = "";//序号
            this.ruleForm.ProcessName = ""; //工序名称
            this.ruleForm.SerialNumber = ""; //工序号
            this.ruleForm.ProcessDescription = "";//工序说明
            this.ruleForm.ProcessContent = "";//工序内容
            this.ruleForm.SpecialInspection = "";//专检
            this.ruleForm.AirworthinessRepresentative = "";//适航代表确认
        },
        //工序新增保存
        OnWorkingProcedureNewAddSave(formName){
                if(this.WorkingDisa == false){
                    if(this.ruleForm.SpecialInspection == true ){
                        this.impotertStep = 1;
                    } else{
                        this.impotertStep = 0;
                    }
                    if(this.ruleForm.AirworthinessRepresentative == true ){
                        this.trialStep = 1;
                    } else{
                        this.trialStep = 0;
                    }
                     this.$refs[formName].validate(valid => {
                        if (valid) {
                            this.axios({
                                    method: "post",
                                    url: BasicData.GET_P_WorkingProcedureNewlyAdded,
                                    data: {
                                        instructId:parseInt(this.ReceiveQuery.instructId),//id
                                        stepSerial:this.ruleForm.workingProcedure, //序号
                                        stepName:this.ruleForm.ProcessName, //工序名称
                                        stepNo:this.ruleForm.SerialNumber, //工序号
                                        stepExplan:this.ruleForm.ProcessDescription,//工序说明
                                        stepContex:this.ruleForm.ProcessContent,//工序内容
                                        impotertStep:this.impotertStep,//专检
                                        trialStep:this.trialStep,//适航代表确认
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
                                        this.OnQueryWorkingProcedure();
                                        this.WorkingDisa = true;
                                        this.ruleForm.workingProcedure = "";//序号
                                        this.ruleForm.ProcessName = ""; //工序名称
                                        this.ruleForm.SerialNumber = ""; //工序号
                                        this.ruleForm.ProcessDescription = "";//工序说明
                                        this.ruleForm.ProcessContent = "";//工序内容
                                        this.ruleForm.SpecialInspection = "";//专检
                                        this.ruleForm.AirworthinessRepresentative = "";//适航代表确认
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
                } else{
                    this.$message({
                            //失败后的提示
                            message: "请选择新增或者修改",
                            type: "warning",
                            duration: 1500
                    });
                }
               
        },
        //点击展示工步信息
        WorkingProcedureRowClick(row){
            this.stepId = row.stepId
            this.ruleForm.workingProcedure = row.stepSerial;//序号
            this.ruleForm.ProcessName = row.stepName; //工序名称
            this.ruleForm.SerialNumber = row.stepNo; //工序号
            this.ruleForm.ProcessDescription = row.stepExplan;//工序说明
            this.ruleForm.ProcessContent = row.stepContex;//工序内容
            if(row.impotertStep == "1" ){//专检
                this.ruleForm.SpecialInspection = true
            } else{
                this.ruleForm.SpecialInspection = false
            }
            if(row.trialStep == "1" ){//适航代表确认
                this.ruleForm.AirworthinessRepresentative = true
            } else{
                this.ruleForm.AirworthinessRepresentative = false
            }
            console.log(row,'row-click')
        },
        //工步修改
        WorkingProcedureModify(){
            
            if( this.ruleForm.workingProcedure != ""){
                this.WorkingDisa = false;
                this.WorkingProcedureNewlyAddedTrue = false;//控制工序新增保存显示隐藏
                this.WorkingProcedureModifyTrue = true;//控制工序修改保存显示隐藏
            } else{
                this.$message({
                            //失败后的提示
                            message: "请选择一条数据进行修改",
                            type: "warning",
                            duration: 1500
                    });
            }
        },
        //工步修改保存
        OnWorkingProcedureModifyAddSave(formName){
                    if(this.ruleForm.SpecialInspection == true ){
                        this.impotertStep = 1;
                    } else{
                        this.impotertStep = 0;
                    }
                    if(this.ruleForm.AirworthinessRepresentative == true ){
                        this.trialStep = 1;
                    } else{
                        this.trialStep = 0;
                    }
                     this.$refs[formName].validate(valid => {
                        if (valid) {
                            this.axios({
                                    method: "post",
                                    url: BasicData.GET_P_WorkingProcedureModify,
                                    data: {
                                        instructId:parseInt(this.ReceiveQuery.instructId),//指令id
                                        stepId:parseInt(this.stepId),//工步id
                                        stepSerial:this.ruleForm.workingProcedure, //序号
                                        stepName:this.ruleForm.ProcessName, //工序名称
                                        stepNo:this.ruleForm.SerialNumber, //工序号
                                        stepExplan:this.ruleForm.ProcessDescription,//工序说明
                                        stepContex:this.ruleForm.ProcessContent,//工序内容
                                        impotertStep:this.impotertStep,//专检
                                        trialStep:this.trialStep,//适航代表确认
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
                                        this.OnQueryWorkingProcedure();
                                        this.WorkingDisa = true;
                                        this.ruleForm.workingProcedure = "";//序号
                                        this.ruleForm.ProcessName = ""; //工序名称
                                        this.ruleForm.SerialNumber = ""; //工序号
                                        this.ruleForm.ProcessDescription = "";//工序说明
                                        this.ruleForm.ProcessContent = "";//工序内容
                                        this.ruleForm.SpecialInspection = "";//专检
                                        this.ruleForm.AirworthinessRepresentative = "";//适航代表确认
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
        //工序删除
        OnWorkingProcedureDelete(row){
             this.axios
                .get(BasicData.GET_P_WorkingProcedureDelete, {
                    params: {
                        stepId: row.stepId,
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
                              
                                this.OnQueryWorkingProcedure();
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
        //查询资源设备信息
        OnQueryResourcesEquipment(){
             this.axios
                .get(BasicData.GET_P_PesourcesEquipmentQuery, {
                    params: {
                        instructId: this.ReceiveQuery.instructId,
                    }
                })
                .then(res => {
                    this.EquipmentArr = res.data
                    console.log(res.data,'res')     
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //选择设备
        OnSelectDevice(){
            this.EquipmentFrame = true,
            this.axios({
                method: "post",
                url: BasicData.GET_P_PesourcesEquipmentQueryWhole,
                data: {
                    pageNum: this.EquipmentNowPages, //当前页
                    pageSize: this.EquipmentPageSize, //每页条数
                    facilityName: this.QueryEquipmentName, //名称
                    facilityType:this.QueryEquipmentType,//类型
                    instructId:parseInt(this.ReceiveQuery.instructId),//指令id
                    
                }
            })
                .then(res => {
                    console.log(res.data.list,'1234543234543')
                    this.EquipmentWholeArr = res.data.records
                    this.EquipmentTotal = res.data.total
                
                })
                .catch(error => {
                    console.log(error);
                });
        },
         //分页
        OnSelectDevicPaging(row) {
            console.log(row,'fenye')
            this.EquipmentNowPages = row
            this.OnSelectDevice();
        },
        //切换设备每页展示多少条数据
        OnEquipmentSizeChange(val) {
            this.EquipmentPageSize = val
            this.OnSelectDevice();
        },
        //设备确认
        EquipmentConfirmation(){
            if(this.EquipmentName != ""){
                this.axios({
                    method: "post",
                    url: BasicData.GET_P_PesourcesEquipmentQueryConfirm,
                    data: {
                        facilityName: this.EquipmentName, //设备名称
                        facilityType: this.EquipmentType, //设备类型
                        facilityModel: this.EquipmentModel, //设备型号
                        specifications:this.EquipmentSpecification,//设备规格
                        facilityStation:this.EquipmentStation,//设备站位
                        instructId:parseInt(this.ReceiveQuery.instructId),//指令id
                        
                    }
                })
                    .then(res => {
                        if (res.data.success === true) {
                            this.EquipmentFrame = false,
                            this.OnQueryResourcesEquipment();
                            this.$message({
                                //成功后的提示
                                message: "确认成功",
                                type: "success",
                                duration: 1500
                            });
                            
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
                    message: "请选择信息",
                    type: "error",
                    duration: 1500
                });
            }
        },  
        //设备单选功能
        OnEquipmentTick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.EquipmentTickArr = row.pop(); //储存新的单选数据
                console.log(this.EquipmentTickArr,'this.EquipmentTickArr')
                if (this.EquipmentTickArr != undefined) {
                    // this.OrderID = this.EquipmentTickArr.mesTaskId;
                    this.EquipmentName = this.EquipmentTickArr.facilityName;//储存勾选设备名称
                    this.EquipmentType = this.EquipmentTickArr.facilityType;//储存勾选设备类型
                    this.EquipmentModel = this.EquipmentTickArr.facilityModel;//储存勾选设备型号
                    this.EquipmentSpecification = this.EquipmentTickArr.facilitySize;//储存勾选设备规格
                    this.EquipmentStation = this.EquipmentTickArr.station;
                }
            }
        },
        //设备删除
        OnEquipmentDelete(row){
             this.axios
                .get(BasicData.GET_P_PesourcesEquipmentDelete, {
                    params: {
                        facilityId: row.facilityId,
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
                         this.OnQueryResourcesEquipment();
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
       



        //查询配套件添加后的信息
        OnQueryAccessories(){
             this.axios
                .get(BasicData.GET_P_AccessoriesQuery, {
                    params: {
                        instructId: this.ReceiveQuery.instructId,
                    }
                })
                .then(res => {
                    console.log(res.data,'res')  
                    this.AccessoriesArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //选择配套件信息
        OnSelectionOfAccessories(){
            this.AccessoriesFrame = true;
            this.axios({
                method: "post",
                url: BasicData.GET_P_AccessoriesQueryWhole,
                data: {
                    pageNum: this.AccessorNowPages, //当前页
                    pageSize: this.AccessorPageSize, //每页条数
                    condetion: this.AccessoryDrawingNo, //配套件图号
                    
                }
            })
                .then(res => {
                    console.log(res.data.list,'1234543234543')
                    this.AccessorWholeArr = res.data.records
                    this.AccessorWholeArr.map(ite => {
                        this.AccessoryState.map(val => {
                            if (ite.assemType == val.id) {
                                ite.assemType = val.name;
                            }
                        });
                    });
                    this.AccessorTotal = res.data.total
                
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //配套件分页
        OnAccessoriesPaging(row){
            this.AccessorNowPages= row; //设备分页当前页
            this.OnSelectionOfAccessories();
        },
        //切换配套件每页展示多少条数据
        OnAccessoriesSizeChange(val) {
            this.AccessorPageSize = val
            this.OnSelectionOfAccessories();
        },

        //配套件单选功能
        OnAccessorTick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.AccessorTickArr = row.pop(); //储存新的单选数据
                console.log(this.AccessorTickArr,'this.AccessorTickArr')
                if (this.AccessorTickArr != undefined) {
                    // this.OrderID = this.EquipmentTickArr.mesTaskId;
                    this.AccessorProduct = this.AccessorTickArr.product;//储存勾选图号信息
                    this.AccessorName = this.AccessorTickArr.stuffName;//储存勾选名称
                    this.AccessorSpecification =this.AccessorTickArr.format;//储存勾选规格
                    if(this.AccessorTickArr.assemType == "标准件"){//储存勾选类型
                        this.AccessorType = 0;
                    } else if(this.AccessorTickArr.assemType == "结构件"){
                        this.AccessorType = 1;
                    } else if(this.AccessorTickArr.assemType == "成品"){
                        this.AccessorType = 2;
                    }
                    
                }
            }
        },
        //新增确认配套件信息
        AccessorConfirmation(){
            if(this.AccessorProduct != ""){
                if(this.AccessoryNumber != ""){
                    this.axios({
                        method: "post",
                        url: BasicData.GET_P_AccessoriesQueryConfirm,
                        data: {
                            assemProduct: this.AccessorProduct, //图号
                            assemName: this.AccessorName, //名称
                            assemType: this.AccessorType,//类型
                            version:this.AccessorSpecification,//规格
                            qty:parseInt(this.AccessoryNumber),//数量
                            instructId:parseInt(this.ReceiveQuery.instructId),//指令id
                            
                        }
                    })
                    .then(res => {
                        if (res.data.success === true) {
                           
                            this.OnQueryAccessories();
                            this.AccessoryDrawingNo = ""
                            this.AccessoryNumber = ""
                            this.$message({
                                //成功后的提示
                                message: "确认成功",
                                type: "success",
                                duration: 1500
                            });
                            this.AccessoriesFrame = false
                            
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
                } else{
                    this.$message({
                        //失败后的提示
                        message: "请填写数量",
                        type: "error",
                        duration: 1500
                    });
                }
            } else{
                this.$message({
                    //失败后的提示
                    message: "请选择信息",
                    type: "error",
                    duration: 1500
                });
            }
           
        },
        //装入件删除
        OnAccessorDelete(row){
             this.axios
                .get(BasicData.GET_P_AccessoriesQueryDelete, {
                    params: {
                        assemId: row.assemId,
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
                         this.OnQueryAccessories();
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

        //查询工量具添加后的信息
        OnQueryMeasuringTools(){
             this.axios
                .get(BasicData.GET_P_MeasuringToolsQuery, {
                    params: {
                        instructId: this.ReceiveQuery.instructId,
                    }
                })
                .then(res => {
                    console.log(res.data,'res')  
                    this.MeasuringToolsArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //选择工量具信息
        OnSelectionMeasuringTools(){
            this.MeasuringToolsFrame = true;
            this.axios({
                method: "post",
                url: BasicData.GET_P_MeasuringToolsQueryWhole,
                data: {
                    pageNum: this.MeasuringToolsNowPages, //当前页
                    pageSize: this.MeasuringToolsPageSize, //每页条数
                    condetion: this.MeasuringToolsQuery, //配套件图号
                  
                 
                }
            })
                .then(res => {
                    console.log(res.data.list,'1234543234543')
                    this.MeasuringToolsWholeArr = res.data.records
                    this.MeasuringToolsTotal = res.data.total
                
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //工量具分页
        OnMeasuringToolsPaging(row){
            this.MeasuringToolsNowPages= row; 
            this.OnSelectionMeasuringTools();
        },
        //切换工量具每页展示多少条数据
        OnMeasuringToolsSizeChange(val) {
            this.MeasuringToolsPageSize = val
            this.OnSelectionMeasuringTools();
        },

        //工量具确认
        MeasuringToolsConfirmation(){
            if(this.MeasuringToolsName != ""){
                this.axios({
                    method: "post",
                    url: BasicData.GET_P_MeasuringToolsConfirm,
                    data: {
                        toolName: this.MeasuringToolsName, //设备名称
                        toolCode: this.MeasuringToolsCode, //设备类型
                        toolSpec: this.MeasuringToolsSpec, //设备型号
                        toolsType:this.MeasuringToolsType,//设备规格
                        instructId:parseInt(this.ReceiveQuery.instructId),//指令id
                        
                    }
                })
                    .then(res => {
                        if (res.data.success === true) {
                            this.MeasuringToolsFrame = false,
                            this.OnQueryMeasuringTools();
                            this.$message({
                                //成功后的提示
                                message: "确认成功",
                                type: "success",
                                duration: 1500
                            });
                            
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
                    message: "请选择信息",
                    type: "error",
                    duration: 1500
                });
            }
        },  
        //工量具单选功能
        OnMeasuringToolsTick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.MeasuringToolsTickArr = row.pop(); //储存新的单选数据
                console.log(this.MeasuringToolsTickArr,'this.MeasuringToolsTickArr')
                if (this.MeasuringToolsTickArr != undefined) {
                   
                    this.MeasuringToolsName = this.MeasuringToolsTickArr.toolName;
                    this.MeasuringToolsCode = this.MeasuringToolsTickArr.toolNum;
                    this.MeasuringToolsSpec = this.MeasuringToolsTickArr.toolFormat;
                    this.MeasuringToolsType = this.MeasuringToolsTickArr.species;
                }
            }
        },
         //工量具删除
        OnMeasuringToolsDelete(row){
             this.axios
                .get(BasicData.GET_P_MeasuringToolsDelete, {
                    params: {
                        toolId: row.toolId,
                        toolsType: row.toolsType,
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
                        this.OnQueryMeasuringTools();
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


        //查询工装添加后的信息
        OnQueryWorkClothes(){
             this.axios
                .get(BasicData.GET_P_WorkClothesQuery, {
                    params: {
                        instructId: this.ReceiveQuery.instructId,
                    }
                })
                .then(res => {
                    console.log(res.data,'res')  
                    this.WorkClothesArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //选择工装信息
        OnSelectionWorkClothes(){
            this.WorkClothesFrame = true;
            this.axios({
                method: "post",
                url: BasicData.GET_P_WorkClothesQueryWhole,
                data: {
                    pageNum: this.WorkClothesNowPages, //当前页
                    pageSize: this.WorkClothesPageSize, //每页条数
                    condetion: this.WorkClothesQuery, //配套件图号
                  
                 
                }
            })
                .then(res => {
                    console.log(res.data.list,'1234543234543')
                    this.WorkClothesWholeArr = res.data.records
                    this.WorkClothesTotal = res.data.total
                
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //工工装分页
        OnWorkClothesPaging(row){
            this.WorkClothesNowPages= row; 
            this.OnSelectionWorkClothes();
        },

        //切换工装每页展示多少条数据
        OnWorkClothesSizeChange(val) {
            this.WorkClothesPageSize = val
            this.OnSelectionWorkClothes();
        },


         //工量确认
        WorkClothesConfirmation(){
            if(this.WorkClothesName != ""){
                if(this.WorkClothesNumber !=""){
                    this.axios({
                        method: "post",
                        url: BasicData.GET_P_WorkClothesQueryConfirm,
                        data: {
                              
                            frockName: this.WorkClothesName, //工具名称
                            frockProduct: this.WorkClothesProduct, //工具图号
                            frockType: this.WorkClothesType, //工具类型
                            specifications:this.WorkClothesSpec,//工具规格
                            qty:this.WorkClothesNumber,
                            instructId:parseInt(this.ReceiveQuery.instructId),//指令id
                            
                        }
                    })
                        .then(res => {
                            if (res.data.success === true) {
                                this.WorkClothesFrame = false,
                                this.OnQueryWorkClothes();
                                this.$message({
                                    //成功后的提示
                                    message: "确认成功",
                                    type: "success",
                                    duration: 1500
                                });
                                
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
                            message: "请填入数量",
                            type: "error",
                            duration: 1500
                        });
                }
            } else {
                this.$message({
                    //失败后的提示
                    message: "请选择信息",
                    type: "error",
                    duration: 1500
                });
            }
        },  
        //工具单选功能
        OnWorkClothesTick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.WorkClothesTickArr = row.pop(); //储存新的单选数据
                console.log(this.WorkClothesTickArr,'this.MeasuringToolsTickArr')
                if (this.WorkClothesTickArr != undefined) {
                    this.WorkClothesName = this.WorkClothesTickArr.name;//工具名称
                    this.WorkClothesProduct = this.WorkClothesTickArr.product;//工具图号
                    this.WorkClothesType = this.WorkClothesTickArr.species;//工具类型
                    this.WorkClothesSpec = this.WorkClothesTickArr.specifications;//工具规格
                }
            }
        },

        //工具删除
        OnWorkClothesDelete(row){
             this.axios
                .get(BasicData.GET_P_WorkClothesQueryDelete, {
                    params: {
                        frockId: row.frockId,
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
                        this.OnQueryWorkClothes();
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


        //查询辅材添加后的信息
        OnQueryAuxiliaryMaterials(){
             this.axios
                .get(BasicData.GET_P_AuxiliaryMaterialsQuery, {
                    params: {
                        instructId: this.ReceiveQuery.instructId,
                    }
                })
                .then(res => {
                    console.log(res.data,'res')  
                    this.AuxiliaryMaterialsArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //选择辅材信息
        OnSelectionAuxiliaryMaterials(){
            this.AuxiliaryMaterialsFrame = true;
            this.axios({
                method: "post",
                url: BasicData.GET_P_AuxiliaryMaterialsQueryWhole,
                data: {
                    pageNum: this.AuxiliaryMaterialsNowPages, //当前页
                    pageSize: this.AuxiliaryMaterialsPageSize, //每页条数
                    condetion: this.AuxiliaryMaterialsQuery, //辅材名称
                }
            })
                .then(res => {
                    console.log(res.data.list,'1234543234543')
                    this.AuxiliaryMaterialsWholeArr = res.data.records
                    this.AuxiliaryMaterialsTotal = res.data.total
                
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //工工装分页
        OnAuxiliaryMaterialsPaging(row){
            this.AuxiliaryMaterialsNowPages= row; 
            this.OnSelectionAuxiliaryMaterials();
        },

        //切换工装每页展示多少条数据
        OnAuxiliaryMaterialsSizeChange(val) {
            this.AuxiliaryMaterialsPageSize = val
            this.OnSelectionAuxiliaryMaterials();
        },

        //辅材信息确认
        AuxiliaryMaterialsConfirmation(){
            if(this.AuxiliaryMaterialsName != ""){
                if(this.AuxiliaryMaterialsNumber  && this.AuxiliaryMaterialsCompany !=""){
                    this.axios({
                        method: "post",
                        url: BasicData.GET_P_AuxiliaryMaterialsConfirm,
                        data: {
                              
                            assemName: this.AuxiliaryMaterialsName, //辅材名称
                            assemProduct: this.AuxiliaryMaterialsProduct, //辅材图号
                            version: this.AuxiliaryMaterialsSpec, //辅材规格
                            qty:this.AuxiliaryMaterialsNumber,//辅材数量
                            unit:this.AuxiliaryMaterialsCompany,//辅材单位
                            instructId:parseInt(this.ReceiveQuery.instructId),//指令id
                            
                        }
                    })
                        .then(res => {
                            if (res.data.success === true) {
                                this.AuxiliaryMaterialsFrame = false,
                                this.OnQueryAuxiliaryMaterials();
                                this.$message({
                                    //成功后的提示
                                    message: "确认成功",
                                    type: "success",
                                    duration: 1500
                                });
                                
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
                            message: "请填入数量和单位",
                            type: "error",
                            duration: 1500
                        });
                }
            } else {
                this.$message({
                    //失败后的提示
                    message: "请选择信息",
                    type: "error",
                    duration: 1500
                });
            }
        },
         //工具单选功能
        OnAuxiliaryMaterialsTick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.AuxiliaryMaterialsTickArr = row.pop(); //储存新的单选数据
                console.log(this.AuxiliaryMaterialsTickArr,'this.MeasuringToolsTickArr')
                if (this.AuxiliaryMaterialsTickArr != undefined) {
                    this.AuxiliaryMaterialsName = this.AuxiliaryMaterialsTickArr.stuffName;//辅材名称
                    this.AuxiliaryMaterialsProduct = this.AuxiliaryMaterialsTickArr.product;//辅材名称图号
                    this.AuxiliaryMaterialsSpec = this.AuxiliaryMaterialsTickArr.format;//辅材规格
                }
            }
        },
        //辅材删除
        OnAuxiliaryMaterialsDelete(row){
             this.axios
                .get(BasicData.GET_P_AuxiliaryMaterialsDelete, {
                    params: {
                        assistId: row.assistId,
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
                        this.OnQueryAuxiliaryMaterials();
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

        // 查询属性信息
        OnQueryAttribute(){
             this.axios
                .get(BasicData.GET_P_AttributeQuery, {
                    params: {
                         instructId:parseInt(this.ReceiveQuery.instructId),

                    }
                })
                .then(res => {
                    this.AttributeArr = res.data.tdInstructQualificationsList
                    this.AttributeArr.map(ite => {
                        this.AttributeState.map(val => {
                            if (ite.importantQua == val.id) {
                                ite.importantQua = val.name;
                            }
                        });
                    });
                    this.AttributeRuleForm.PreparationTime = res.data.readyHours; //准备工时
                    this.AttributeRuleForm.ProductionHours = res.data.repairHours; //生产工时
                    this.AttributeRuleForm.PersonnelRequirements = res.data.needPerson; //人员需求
                    this.AttributeRuleForm.RiskLevel = res.data.riskLevel;//风险工序等级
                    this.AttributeRuleForm.OutsourcingUnit = res.data.outUnit;//外协单位
                    if(res.data.outreach == 1){//外协工序
                        this.AttributeRuleForm.OutsourcingProcess = true;
                    } else{
                        this.AttributeRuleForm.OutsourcingProcess = false;
                    }
                    if(res.data.importInstruct == 1){//关键工序
                        this.AttributeRuleForm.KeyProcess = true;
                    } else{
                       this.AttributeRuleForm.KeyProcess = false;
                    }
                    
                   
                    console.log(res.data,'res')  
                    
                })
                .catch(error => {
                    console.log(error);
                });
     
        },

     
        //添加资质
        AddQualifications(){
            this.AttributeFrame = true
        },
         //添加资质
        AddQualificationsConfirm(){
            if(this.QualificationName && this.QualificationQty && this.importantTrue != ""){

              this.axios({
                method: "post",
                url: BasicData.GET_P_AttributeConfirm,
                data: {
                    needQualifications:this.QualificationName,//资质名称
                    needPersons:this.QualificationQty,//需求数量
                    importantQua:this.importantTrue,//是否重要资质
                    instructId:parseInt(this.ReceiveQuery.instructId),//id
                }
            })
                .then(res => {
                    console.log(res.data.list,'1234543234543')
                    if (res.data.success === true) {
                            this.$message({
                                        //成功后的提示
                                        message: "新增成功",
                                        type: "success",
                                        duration: 1500
                                    });
                                        
                                    this.AttributeFrame = false;
                                    this.OnQueryAttribute();
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
                
            } else{
                this.$message({
                    //失败后的提示
                    message: "请完善信息",
                    type: "error",
                    duration: 1500
                });
            }
        },

        //资质删除
        OnAddQualificationsDelete(row){
             this.axios
                .get(BasicData.GET_P_AttributeDelete, {
                    params: {
                        qualificationsId: row.qualificationsId,
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
                        this.OnQueryAttribute();
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
        //属性保存
        SaveNewAttribute(){
            if(this.AttributeRuleForm.KeyProcess == true){
                this.AttributeRuleForm.KeyProcess = 1
            } else{
                this.AttributeRuleForm.KeyProcess = 0
            }
            if(this.AttributeRuleForm.OutsourcingProcess == true){
                this.AttributeRuleForm.OutsourcingProcess = 1
            } else{
                this.AttributeRuleForm.OutsourcingProcess = 0
            }
             this.axios({
                        method: "post",
                        url: BasicData.GET_P_SaveNewAttributeConfirm,
                        data: {
                                instructId:parseInt(this.ReceiveQuery.instructId),//id
                                readyHours:this.AttributeRuleForm.PreparationTime, //准备工时
                                repairHours:this.AttributeRuleForm.ProductionHours, //生产工时
                                riskLevel:this.AttributeRuleForm.RiskLevel, //风险工序等级
                                outUnit:this.AttributeRuleForm.OutsourcingUnit,//外协单位
                                importInstruct:this.AttributeRuleForm.KeyProcess,//关键工序
                                outreach:this.AttributeRuleForm.OutsourcingProcess,//外协工序
                                }
                            }).then(res => {
                                    console.log(res,'1111')
                                if (res.data.success === true) {
                                    this.$message({
                                        //成功后的提示
                                        message: "保存成功",
                                        type: "success",
                                        duration: 1500
                                    });
                                        
                                    this.OnQueryAttribute();
                                    
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
      
        //上传附件
        UploadEnclosure(){
            this.EnclosureFrame = true
            this.findFileList();
        },

        findFileList() {
            let that = this;
            let url = AssemblyPerform.GET_A_findFileAss;
            that.axios
                .get(url, {
                    params: {
                        instructId:that.ReceiveQuery.instructId,
                        category: "INSTRUCTION"
                    }
                })
                .then(res => {
                    that.TechnicalOnAddArr = res.data.tInstructFiles;
                })
                .catch(error => {
                    console.log(error);
                });
        },

         //技术文档转换FormData
        AddToFormData() {
            this.formData_Technical = new window.FormData(); // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
            this.formData_Technical.append(
                "filename",
                document.querySelector("input[type=file]").files[0]
            );
            this.index_Technical = document.querySelector(
                "input[type=file]"
            ).files[0].name;
            this.$refs.both.value = "";
        },
        
        OnNewNearby(){
            this.TechnicaltFeame = true
            this.index_Technical = "";
        },
         // 查看 附件
        SeeFile(file) {
            window.open(file.fileUrl);
        },
        // 删除附件
        OnDeleteFile(delFile) {
            this.$confirm("确认删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.axios
                        .get(AssemblyPerform.GET_A_delFileAss, {
                            params: {
                                instructFileId: delFile.instructFileId,
                                category: "INSTRUCTION"
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
                                this.findFileList();
                            } else {
                                this.$message({
                                    //失败后的提示
                                    message: "删除失败",
                                    type: "error",
                                    duration: 1500
                                });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        //添加保存
        OnAddSave() {
            var options = {
                // 设置axios的参数
                url:
                    AssemblyPerform.GET_A_uploadFileAss +
                    "?instructId=" +
                    this.ReceiveQuery.instructId,
                data: this.formData_Technical,
                method: "post",
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }; //'userfile'是formData这个对象的键名
            if (this.index_Technical != "") {
                this.axios(options).then(res => {
                    if (res.data.success === true) {
                        this.$message({
                            //成功后的提示
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        this.TechnicaltFeame = false;
                        this.findFileList();
                    } else {
                        this.$message({
                            //失败后的提示
                            message: res.data.message,
                            type: "error",
                            duration: 1500
                        });
                    }
                });
            } else {
                this.$message({
                    message: "请选择文件",
                    type: "warning",
                    duration: 1500
                });
            }
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
.InstCon_head {
    height: 60px;
    overflow: hidden;
}
.InstCon_head_left {
    width: 250px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.InstCon_head_left p {
    width: 80px;
    float: left;
    line-height: 36px;
}
.InstCon_head_left div {
    width: 170px;
    float: left;
}
.InstCon_head_bnt {
    float: left;
    margin-top: 10px;
    /* margin-right: 10px; */
}

.InstCon_ElasticFrame_top {
    overflow: hidden;
}

.InstCon_Testing {
    width: 250px;
    height: 40px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}

.InstCon_Testing div {
    width: 160px;
    float: right;
}
.InstCon_TaskContent {
    width: 510px;
    height: 80px;
    overflow: hidden;
    float: left;
    margin-left: 10px;
}
.InstCon_TaskContent div {
    width: 420px;
    float: right;
}


.InstCon_contnet {
    /* margin-top: 10px; */
    width: 100%;
  /* height: calc(100% -100px); */
}
.InstCon_operation{
    height: 40px;
    padding: 0 10px;
    overflow: hidden;
    
}
.InstCon_operation_bnt{
    float:right;
    margin-top: 5px;
    
}
.InstCon_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.InstCon_NewlyAdded {
    height: 200px;
    overflow: hidden;
}
.InstCon_NewlyAddedBox {
    width: 260px;
    float: left;
}
.InstCon_NewlyAddedBox div {
    width: 170px;
}
.InstCon_risk {
    width: 300px;
    float: left;
}
.InstCon_risk label {
    width: 110px !important;
    float: left;
}
.InstCon_risk div {
    width: 170px;
    float: left;
    margin-left: 0px !important;
}
.InstCon_NewlyAddedBoxremarks {
    width: 500px;
    float: left;
}
.InstCon_NewlyAddedBoxremarks div {
    width: 470px;
}
.InstCon_NewlyAddedBoxFixed {
    width: 190px;
    float: left;
    overflow: hidden;
}
.InstCon_NewlyAddedBoxFixed label {
    width: 100px !important;
    float: left;
}
.InstCon_NewlyAddedBoxFixed div {
    width: 20px;
    float: left;
    margin-left: 0px !important;
}

.InstCon_WorkingFixed {
    width: 140px;
    float: left;
    overflow: hidden;
}
.InstCon_WorkingFixed label {
    width: 80px !important;
    float: left;
}
.InstCon_WorkingFixed div {
    width: 20px;
    float: left;
    margin-left: 0px !important;
}

.InstCon_NewlyAddedBoxremarks {
    width: 520px;
    float: left;
}
.InstCon_NewlyAddedBoxremarks div {
    width: 430px;
}
/* form表单之间的间距样式 */
.el-form-item {
    margin-bottom: 5px;
}

.InstCon_DetectPaging {
    height: 35px;
    /* padding: 0px 10px; */
    margin-top: 5px;
}

/* 资源信息css */
.InstCon_Resources {
    overflow: auto;
}
/* 设备信息 css */
.InstCon_Resources_Equipment {
    width: 49.5%;
    height: 225px;
    float: left;
    margin-bottom: 10px;
}
.InstCon_Resources_EquipmentTitle {
    height: 20px;
    font-size: 12px;
}
.InstCon_Resources_EquipmentCon {
    height: 170px;
}
.InstCon_Resources_EquipmentFooter {
    height: 30px;
    margin-top: 5px;
}
.InstCon_Resources_EquipmentFooterLfet {
    float: left;
}
.InstCon_Resources_EquipmentFooterRight {
    float: right;
}

/* 配套件信息 css */
.InstCon_Resources_Accessories {
    width: 49.5%;
    height: 225px;
    float: left;
    margin-left: 1%;
    margin-bottom: 10px;
}
.InstCon_Resources_AccessoriesTitle {
    height: 20px;
    font-size: 12px;
}
.InstCon_Resources_AccessoriesCon {
    height: 170px;
}
.InstCon_Resources_AccessoriesFooter {
    height: 30px;
    margin-top: 5px;
}
.InstCon_Resources_AccessoriesFooterLfet {
    float: left;
}
.InstCon_Resources_AccessoriesFooterRight {
    float: right;
}

/* 工量具信息 css */
.InstCon_Resources_Measuring {
    width: 49.5%;
    height: 225px;
    float: left;
    margin-bottom: 10px;
}
.InstCon_Resources_MeasuringTitle {
    height: 20px;
    font-size: 12px;
}
.InstCon_Resources_MeasuringCon {
    height: 170px;
}
.InstCon_Resources_MeasuringFooter {
    height: 30px;
    margin-top: 5px;
}
.InstCon_Resources_MeasuringFooterLfet {
    float: left;
}
.InstCon_Resources_MeasuringFooterRight {
    float: right;
}

/* 工装信息 css*/
.InstCon_Resources_Clothes {
    width: 49.5%;
    height: 225px;
    float: left;
    margin-bottom: 10px;
    margin-left: 1%;
}
.InstCon_Resources_ClothesTitle {
    height: 20px;
    font-size: 12px;
}
.InstCon_Resources_ClothesCon {
    height: 170px;
}
.InstCon_Resources_ClothesFooter {
    height: 30px;
    margin-top: 5px;
}
.InstCon_Resources_ClothesFooterLfet {
    float: left;
}
.InstCon_Resources_ClothesFooterRight {
    float: right;
}

/* 辅材信息 css*/
.InstCon_Resources_Auxiliary {
    width: 49.5%;
    height: 225px;
    float: left;
    margin-bottom: 10px;
    /* margin-left: 1%; */
}
.InstCon_Resources_AuxiliaryTitle {
    height: 20px;
    font-size: 12px;
}
.InstCon_Resources_AuxiliaryCon {
    height: 170px;
}
.InstCon_Resources_AuxiliaryFooter {
    height: 30px;
    margin-top: 5px;
}
.InstCon_Resources_AuxiliaryFooterLfet {
    float: left;
}
.InstCon_Resources_AuxiliaryFooterRight {
    float: right;
}

.InstCon_Resources_file {
    width: 49.5%;
    /* height: 225px; */
    float: left;
    margin-left: 10px;
    margin-bottom: 10px;
    margin-top: 20px;
}


.InstCon_Frame_div{
    width: 210px;
    margin-right: 10px;
    /* margin-top: 7px; */
    float: left;
}
.InstCon_Frame_div_title{
    width: 60px;
    float: left;
    line-height: 36px;
}
.InstCon_Frame_div_inp{
    width: 150px;
    float: left;
}
.InstCon_Frame_div_btn{
    float: right;
}

.InstCon_Accessories_div{
    width: 190px;
    margin-right: 10px;
    /* margin-top: 7px; */
    float: left;
}
.InstCon_Accessories_div_title{
    width: 40px;
    float: left;
    line-height: 36px;
}
.InstCon_Accessories_div_inp{
    width: 150px;
    float: left;
}
.InstCon_Accessories_div_btn{
    float: right;
}


.InstCon_Insert_div{
    width: 130px;
    /* margin-right: 10px; */
    /* margin-top: 7px; */
    float: right;
}
.InstCon_Insert_div_title{
    width: 40px;
    float: left;
    line-height: 36px;
    text-align: center;
}
.InstCon_Insert_div_inp{
    width: 90px;
    float: left;
}
.InstCon_Insert_div_btn{
    float: right;
}


.InstCon_MeasuringTools_div{
    width: 150px;
    margin-right: 10px;
    /* margin-top: 7px; */
    float: left;
}
/* .InstCon_MeasuringTools_div_title{
    width: 60px;
    float: left;
    line-height: 36px;
} */
.InstCon_MeasuringTools_div_inp{
    width: 150px;
    float: left;
}
.InstCon_MeasuringTools_div_btn{
    float: right;
}



.InstCon_AuxiliaryMaterials_div{
    width: 150px;
    margin-right: 10px;
    /* margin-top: 7px; */
    float: left;
}
/* .InstCon_AuxiliaryMaterials_div_title{
    width: 60px;
    float: left;
    line-height: 36px;
} */
.InstCon_AuxiliaryMaterials_div_inp{
    width: 150px;
    float: left;
}
.InstCon_AuxiliaryMaterials_div_btn{
    float: right;
}


.InstCon_Attribute_div{
    width: 210px;
    margin-right: 10px;
    margin-bottom: 10px;
    float: left;
}
.InstCon_Attribute_div_title{
    width: 60px;
    float: left;
    line-height: 36px;
}
.InstCon_Attribute_div_inp{
    width: 150px;
    float: left;
}
.InstCon_Attribute_div_btn{
    float: right;
}


.InstCon_important_div{
    width: 240px;
    margin-right: 10px;
    margin-bottom: 10px;
    float: left;
}
.InstCon_important_div_title{
    width: 90px;
    float: left;
    line-height: 36px;
}
.InstCon_important_div_inp{
    width: 150px;
    float: left;
}
.InstCon_important_div_btn{
    float: right;
}



/* 上传样式 */
.ExportStyle {
    height: 160px;
}
.text {
    width: 300px;
    height: 42px;
    float: left;
    font-size: 16px;
}
.file {
    width: 100px;
    font-size: 30px;
    float: left;
    margin-left: 10px;
    opacity: 0;
    z-index: 9999999;
    position: absolute;
    top: 60px;
    /* right: 110px; */
}
.file_1 {
    width: 100px;
    font-size: 30px;
    background: red;
    float: left;
    margin-left: 5px;
}
.button {
    width: 100px;
    height: 46px;
    position: absolute;
    top: 60px;
    margin-left: 120px;
}
.preview {
    width: 100px;
    height: 46px;
    position: absolute;
    top: 60px;
    margin-left: 10px;
    /* right: 110px; */
}
.title {
    width: 520px;
    position: absolute;
    margin-left: -250px;
    margin-top: -23px;
    left: 50%;
    top: 150px;
    font-size: 14px;
}
.title_sapn {
    color: red;
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

</style>
