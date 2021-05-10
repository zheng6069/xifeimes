<template>
    <div class="container">
        <el-row :gutter="8">
            <!-- 左边区域 -->
            <el-col :span="5">
                <!-- 左边区域 -->
                <div>
                    <!-- 工步部分 -->
                    <div class="tableStep">
                        <el-table
                            border
                            :data="tableStepData"
                            @row-click="tableStepClick"
                            highlight-current-row
                            ref="multipleTable"
                            height="300px"
                            style="width: 100%; height: 100%"
                            :header-row-style="{ height: '38px' }"
                            :header-cell-style="{ padding: '0px' }"
                            :row-style="{ height: '34px' }"
                            :cell-style="{ padding: '0px' }"
                        >
                            <el-table-column width="200" label="工步号" prop="stepSerial"></el-table-column>
                            <el-table-column label="工步名称" prop="stepName"></el-table-column>
                        </el-table>
                    </div>
                    <!-- 视频-三维-图片-文档 -->
                    <div class="tableVideo" :style="InformationHeight">
                        <el-table
                            :data="tableData"
                            style="width: 100%; height: 100%"
                            :header-row-style="{ height: '38px' }"
                            :header-cell-style="{ padding: '0px' }"
                            :row-style="{ height: '34px' }"
                            :cell-style="{ padding: '0px' }"
                            height="100%"
                        >
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">
                                        {{
                                        scope.row.fileName
                                        }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column width="80">
                                <template slot-scope="scope">
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        @click="handleEdit(scope.row)"
                                    >查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <!-- </div> -->
                </div>
            </el-col>
            <!-- 右边区域 -->
            <el-col :span="19">
                <div>
                    <!-- 右侧顶部区域 -->
                    <div class="DispatchBox_head_box">
                        <div class="DispatchBox_head_boxleft">
                            <!-- 顶部查询条件 -->
                            <div class="DispatchBox_head">
                                <div class="DispatchBox_head_left">
                                    <p>架次号</p>
                                    <el-input
                                        v-model="workTimes"
                                        size="medium"
                                        style="width: 150px"
                                        disabled
                                    ></el-input>
                                </div>
                                <div class="DispatchBoxOperationNei">
                                    <p>指令名称</p>
                                    <el-input class="div" v-model="instructName" size="medium" disabled></el-input>
                                    </div>
                                <el-button
                                    size="medium"
                                    type="primary"
                                    class="DispatchBoxOperation_bnt"
                                    style="margin-top: 10px; width: 150px"
                                    @click="processChange"
                                    v-show="fourShow"
                                >工艺更改记录</el-button>
                            </div>
                            <div class="DispatchBox_operation">
                                <div class="DispatchBox_operation_nei">
                                    <div class="DispatchBox_head_left">
                                    <p>站位</p>
                                    <el-input
                                        v-model="workPosition"
                                        size="medium"
                                        style="width: 150px"
                                        disabled
                                    ></el-input>
                                </div>
                                <div class="DispatchBoxOperationNei">
                                    <p>指令号</p>
                                    <el-input class="div" v-model="instructNum" size="medium" disabled></el-input>
                                </div>
                                <el-button
                                        size="medium"
                                        type="primary"
                                        class="DispatchBoxOperation_bnt"
                                        :disabled="
                        this.statusA == 6 || this.statusA == 2 || this.statusB === 4
                        "
                                        @click="startWork"
                                    >开工</el-button>
                                    <el-button
                                        size="medium"
                                        type="primary"
                                        class="DispatchBoxOperation_bnt"
                                        @click="pauseWork"
                                        v-show="noShow"
                                        :disabled="this.statusB === 4"
                                    >暂停</el-button>
                                    <el-button
                                        size="medium"
                                        type="primary"
                                        class="DispatchBoxOperation_bnt"
                                        @click="release"
                                        v-show="isShow"
                                        :disabled="this.statusB === 4"
                                    >释放</el-button>
                                </div>
                            </div>
                        </div>
                        <!-- 头部右侧区域 -->
                        <div class="DispatchBox_head_boxright">
                            <!-- 工作总量 -->
                            <div>
                                <el-progress type="dashboard" :width="80" :percentage="percentage" :format="format" :color="colors"></el-progress>
                                <p>工作总量</p>
                            </div>
                             <div>
                                <el-progress type="dashboard" :width="80" :percentage="gross" :color="colors" :format="format"></el-progress>
                                <p>工时</p>
                            </div>
                            <el-button
                                size="medium"
                                type="primary"
                                class="DispatchBoxOperation_bnt"
                                style="float: right; margin-right: 10px"
                                @click="returnWork"
                            >返回</el-button>
                        </div>
                    </div>
                    <!-- 中间主体内容 -->
                    <div class="content">
                        <div class="contnet_table" :style="detailedInformationHeight">
                            <div class="contnet_table_right">
                                <div class="detailedInformation_con">
                                    <div class="detailedInformation_content">
                                        <div class="jsd">
                                            <div class="Equipment">
                                                <el-tabs
                                                    v-model="activeName"
                                                    style="height: 100%; overflow: auto"
                                                >
                                                    <el-tab-pane label="设备" name="first">
                                                        <div class="Materia_contnet">
                                                            <div class="Materia_contnet_table">
                                                                <el-table
                                                                    border
                                                                    :data="facilityInfo"
                                                                    style="width: 100%; height: 100%"
                                                                    :header-row-style="{ height: '25px' }"
                                                                    :header-cell-style="{ padding: '0px' }"
                                                                    :row-style="{ height: '25px' }"
                                                                    :cell-style="{ padding: '0px' }"
                                                                >
                                                                    <el-table-column
                                                                        prop="facilityType"
                                                                        label="型号"
                                                                    ></el-table-column>
                                                                    <el-table-column
                                                                        prop="facilityName"
                                                                        label="名称"
                                                                    ></el-table-column>
                                                                    <el-table-column
                                                                        prop="facilityCode"
                                                                        label="编码"
                                                                    ></el-table-column>
                                                                    <el-table-column
                                                                        prop="specifications"
                                                                        label="规格"
                                                                    ></el-table-column>
                                                                    <el-table-column
                                                                        prop="needQty"
                                                                        label="数量"
                                                                        width="50"
                                                                    ></el-table-column>
                                                                </el-table>
                                                            </div>
                                                        </div>
                                                    </el-tab-pane>
                                                    <el-tab-pane label="工装" name="second">
                                                        <div class="Materia_contnet">
                                                            <div class="Materia_contnet_table">
                                                                <el-table
                                                                    border
                                                                    :data="frockInfo"
                                                                    style="width: 100%; height: 100%"
                                                                    :header-row-style="{ height: '25px' }"
                                                                    :header-cell-style="{ padding: '0px' }"
                                                                    :row-style="{ height: '25px' }"
                                                                    :cell-style="{ padding: '0px' }"
                                                                >
                                                                    <el-table-column
                                                                        prop="frockProduct"
                                                                        label="图号"
                                                                    ></el-table-column>
                                                                    <el-table-column
                                                                        prop="frockName"
                                                                        label="名称"
                                                                    ></el-table-column>
                                                                    <el-table-column
                                                                        prop="frockCode"
                                                                        label="编号"
                                                                    ></el-table-column>
                                                                    <el-table-column
                                                                        prop="qty"
                                                                        label="数量"
                                                                        width="50"
                                                                    ></el-table-column>
                                                                </el-table>
                                                            </div>
                                                        </div>
                                                    </el-tab-pane>
                                                    <el-tab-pane label="工具" name="third">
                                                        <div class="Materia_contnet">
                                                            <div class="Materia_contnet_table">
                                                                <el-table
                                                                    border
                                                                    :data="instrumentInfo"
                                                                    style="width: 100%; height: 100%"
                                                                    :header-row-style="{ height: '25px' }"
                                                                    :header-cell-style="{ padding: '0px' }"
                                                                    :row-style="{ height: '25px' }"
                                                                    :cell-style="{ padding: '0px' }"
                                                                >
                                                                    <el-table-column
                                                                        prop="toolName"
                                                                        label="名称"
                                                                    ></el-table-column>
                                                                    <el-table-column
                                                                        prop="toolCode"
                                                                        label="编码"
                                                                    ></el-table-column>
                                                                    <el-table-column
                                                                        prop="toolSpec"
                                                                        label="规格"
                                                                    ></el-table-column>
                                                                    <el-table-column
                                                                        prop="qty"
                                                                        label="数量"
                                                                        width="50"
                                                                    ></el-table-column>
                                                                </el-table>
                                                            </div>
                                                        </div>
                                                    </el-tab-pane>
                                                    <el-tab-pane label="量具" name="fourth">
                                                        <div class="Materia_contnet">
                                                            <div class="Materia_contnet_table">
                                                                <el-table
                                                                    border
                                                                    :data="measureInfo"
                                                                    style="width: 100%; height: 100%"
                                                                    :header-row-style="{ height: '25px' }"
                                                                    :header-cell-style="{ padding: '0px' }"
                                                                    :row-style="{ height: '25px' }"
                                                                    :cell-style="{ padding: '0px' }"
                                                                >
                                                                    <el-table-column
                                                                        prop="toolName"
                                                                        label="名称"
                                                                    ></el-table-column>
                                                                    <el-table-column
                                                                        prop="toolNum"
                                                                        label="编码"
                                                                    ></el-table-column>
                                                                    <el-table-column
                                                                        prop="toolFormat"
                                                                        label="规格"
                                                                    ></el-table-column>
                                                                    <el-table-column
                                                                        prop="precision"
                                                                        label="精度"
                                                                    ></el-table-column>
                                                                </el-table>
                                                            </div>
                                                        </div>
                                                    </el-tab-pane>
                                                </el-tabs>
                                            </div>
                                            <div class="enclose">
                                                <p class="enclose_p" style="margin-top: 34px">装入件信息</p>
                                                <div class="enclose_div">
                                                    <el-table
                                                        border
                                                        :data="tdDAssemProduct"
                                                        height="100%"
                                                        style="width: 100%; height: 100%"
                                                        :header-row-style="{ height: '25px' }"
                                                        :header-cell-style="{ padding: '0px' }"
                                                        :row-style="{ height: '25px' }"
                                                        :cell-style="{ padding: '0px' }"
                                                    >
                                                        <el-table-column
                                                            prop="assemProduct"
                                                            label="类别"
                                                        ></el-table-column>
                                                        <el-table-column
                                                            prop="assemName"
                                                            label="名称"
                                                        ></el-table-column>
                                                        <el-table-column
                                                            prop="version"
                                                            label="编号"
                                                            width="110"
                                                        ></el-table-column>
                                                        <el-table-column
                                                            prop="qty"
                                                            label="数量"
                                                            width="50"
                                                        ></el-table-column>
                                                    </el-table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="jsd">
                                            <div class="Equipment">
                                                <p class="Equipment_p">工步工作内容</p>
                                                <div class="Equipment_div">
                                                    <textarea
                                                        readonly
                                                        type="textarea"
                                                        v-model="workStepContent"
                                                        v-on:dblclick="shishiClick"
                                                        style="
                              width: 100%;
                              height: 100%;
                              border: 1px solid #ebeef5;
                              text-indent: 10px;
                              font-size: 16px
                            "
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div class="enclose">
                                                <p class="enclose_p">工步工作说明</p>
                                                <div class="enclose_div">
                                                    <textarea
                                                        readonly
                                                        type="textarea"
                                                        v-model="workStepInstructions"
                                                        v-on:dblclick="jobdescription"
                                                        style="
                              width: 100%;
                              height: 100%;
                              border: 1px solid #ebeef5;
                              text-indent: 10px;
                              font-size: 16px
                            "
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="8" class="bigbotton">
            <!-- 左边区域 -->
            <el-col :span="5">
                <!-- 按钮 -->
                <div>
                    <el-button
                    size="medium"
                    type="primary"
                    class="operation_bnt"
                    @click="ConfirmCaterial"
                    :disabled="this.statusA === 6 || this.statusB === 4"
                    >物料确认</el-button>
                    <el-button
                        size="medium"
                        type="primary"
                        @click="uploadFile"
                        class="operation_bnt"
                        :disabled="this.statusA === 6 || this.statusB === 4"
                    >上传附件</el-button>
                </div>
                <div>
                    <!-- <el-button
                        size="medium"
                        type="primary"
                        @click="OnMaterialCall"
                        class="operation_bnt"
                        :disabled="this.statusA === 6 || this.statusB === 4"
                    >呼叫物料</el-button> -->
                    
                    <el-button
                        size="medium"
                        type="primary"
                        @click="ExceptionReporting"
                        class="operation_bnt"
                    >异常上报</el-button>
                     <el-button
                    size="medium"
                    type="primary"
                    @click="ParametersEntry"
                    class="operation_bnt"
                    v-show="oneShow"
                    :disabled="this.statusA === 6 || this.statusB === 4"
                    >表单录入</el-button>
                </div>
            </el-col>
            <el-col :span="14">
                <!-- 底部按钮 -->
                <div class="EndOfPageRight_head">
                    <div class="EndOfPageRight_head_left">
                        <p>
                            <el-button
                                type="primary"
                                size="medium"
                                @click="ExamineLook"
                                :disabled="this.statusA === 6 || this.statusB === 4"
                            >工检</el-button>
                        </p>
                        <el-input
                            v-model="workInline.examineName"
                            size="medium"
                            placeholder
                            style="width: 300px; margin-left: 10px"
                            disabled
                        ></el-input>
                    </div>
                    <div class="EndOfPageRight_head_left">
                        <p>
                            <el-button
                                type="primary"
                                size="medium"
                                @click="mutualInspectionTrue"
                                :disabled="this.statusA === 6 || this.statusB === 4"
                            >互检</el-button>
                        </p>
                        <el-input
                            v-model="workInline.mutualInspectionName"
                            size="medium"
                            placeholder
                            style="width: 300px; margin-left: 10px"
                            disabled
                        ></el-input>
                    </div>
                </div>
                <div class="EndOfPageRight_head">
                    <div class="EndOfPageRight_head_left" v-show="twoShow">
                        <p>
                            <el-button
                                type="primary"
                                size="medium"
                                @click="specialInspectionTrue"
                                :disabled="this.statusA === 6 || this.statusB === 4"
                            >专检</el-button>
                        </p>
                        <el-input
                            v-model="workInline.specialInspectionName"
                            size="medium"
                            placeholder
                            style="width: 300px; margin-left: 10px"
                            disabled
                        ></el-input>
                    </div>
                    <div class="EndOfPageRight_head_left" v-show="threeShow">
                        <p>
                            <el-button
                                type="primary"
                                size="medium"
                                @click="userRepresentativesTrue"
                                :disabled="this.statusA === 6 || this.statusB === 4"
                            >适航代表</el-button>
                        </p>
                        <el-input
                            v-model="workInline.userRepresentativesName"
                            size="medium"
                            placeholder
                            style="width: 300px; margin-left: 10px"
                            disabled
                        ></el-input>
                    </div>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="displayright">
                    <el-button
                    size="medium"
                    type="primary"
                    @click="qualityissue"
                    class="operation_bnt"
                    :disabled="this.statusA === 6 || this.statusB === 4"
                    >质量异常</el-button>
                    <el-button
                        size="medium"
                        type="primary"
                        @click="inspectionprocedure"
                        class="operation_bnt"
                    >检验规程</el-button>
                </div>
                <div class="displayright">
                    <el-button
                        size="medium"
                        type="primary"
                        @click="Abnormalclosed"
                        class="operation_bnt"
                    >质量异常封闭</el-button>
                </div>
            </el-col>
        </el-row>

        <!-- 工检-弹出框 -->
        <my-personnel
            :personnelPopTrue="workExamine"
            @closeDialog="closeDialog"
            @handleInput="workExamineInput"
            @personnelPopSava="workExaminePopSava"
            ref="workExaminechildRules"
        ></my-personnel>
        <!-- 互检-弹出框 -->
        <my-personnel
            :personnelPopTrue="mutualInspection"
            @closeDialog="closeDialog"
            @handleInput="mutualInspectionInput"
            @personnelPopSava="mutualInspectionPopSava"
            ref="mutualInspectionchildRules"
        ></my-personnel>

        <!-- 专检-弹出框 -->
        <my-personnel
            :personnelPopTrue="specialInspection"
            @closeDialog="closeDialog"
            @handleInput="specialInspectionInput"
            @personnelPopSava="specialInspectionPopSava"
            ref="specialInspectionchildRules"
        ></my-personnel>
        <!-- 质量异常封闭-弹出框 -->
        <my-personnel
            :personnelPopTrue="Abnormalclosedstart"
            @closeDialog="closeDialog"
            @handleInput="AbnormalInspectionInput"
            @personnelPopSava="AbnormalInspectionPopSava"
            ref="AbnormalInspectionchildRules"
        ></my-personnel>
        <!-- 质量异常-弹出框 -->
        <my-personnel
            :personnelPopTrue="qualitstart"
            @closeDialog="closeDialog"
            @handleInput="qualityInspectionInput"
            @personnelPopSava="qualityInspectionPopSava"
            ref="qualityInspectionchildRules"
        ></my-personnel>
        <!-- 用户代表-弹出框 -->
        <el-dialog title :visible.sync="userRepresentatives" width="30%">
            <el-form :model="formWorkuser" ref="formWorkuser" :rules="rule">
                <el-form-item label="人员名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="formWorkuser.name" autocomplete="off" style="width:220px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="specialInspection = false">取 消</el-button>
                <el-button type="primary" @click="userRepresentativesForm('formWorkuser')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 暂停 -->
        <el-dialog title="暂停原因" :visible.sync="suspensionReasonVios">
            <el-form :model="suspensionReason" :rules="rules" ref="suspensionReason" inline-message>
                <el-form-item label="暂停原因" :label-width="formLabelWidth" prop="name">
                    <el-input
                        type="textarea"
                        v-model="suspensionReason.name"
                        :rows="8"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="suspensionReasonVios = false">取 消</el-button>
                <el-button type="primary" @click="suspensionReasonViosForm('suspensionReason')">确 定</el-button>
            </div>
        </el-dialog>
        <!----------- 技术文档弹框 ------------->
        <el-dialog :visible.sync="TechnicalDocumentation" width="70%">
            <div style="height:50px;">
                <el-button class="dialog_Close" type="primary" @click="AddToDocument">新增</el-button>
            </div>
            <div style="height:300px;">
                <el-table
                    border
                    :data="TechnicalOnAddArr"
                    height="100%"
                    style="width: 100%;height:100%;"
                >
                    <el-table-column prop="fileName" label="文档名称"></el-table-column>
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
         <!---------- 异常上报 ---------->
        <el-dialog
            title="异常上报"
            :visible.sync="abnormal"
            width="50%">
            <div class="ExportStyle">
               <el-input
                    type="textarea"
                    :rows="8"
                    placeholder="请输入内容"
                    v-model="exceptionContent">
                </el-input>
            </div>
            <div slot="footer" style="text-align: center;" class="dialog-footer">
                <el-button @click="abnormal = false">取 消</el-button>
                <el-button type="primary" @click="abnormalupdata">确 定</el-button>
            </div>
        </el-dialog>
        <!---------- 检验规格 ---------->
        <el-dialog
            title="检验规格"
            :visible.sync="checkoutstart"
            width="50%">
            <el-table
                :data="checkoutdata"
                border
                size="small"
                height="401"
                style="width: 100%">
                <el-table-column
                prop="inspectionId"
                label="指令号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="instructId"
                label="指令名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="inspectionContent"
                label="检验内容">
                </el-table-column>
                <el-table-column
                prop="inspectionTools"
                label="检验内容">
                </el-table-column>
            </el-table>
            <div slot="footer" style="text-align: center;" class="dialog-footer">
                <el-button @click="checkoutstart = false">取 消</el-button>
                <el-button type="primary" @click="checkoutstart = false">确 定</el-button>
            </div>
        </el-dialog>
        <!----------工步工作内容 ---------->
        <el-dialog
            title="工步工作内容"
            :visible.sync="Workstep"
            width="30%"
            :before-close="handleClose">
            <div class="tanchuangstyle">
                <p>{{workStepContent}}</p>
            </div>
        </el-dialog>
        <!----------工步工作内容说明 ---------->
        <el-dialog
            title="工步工作说明"
            :visible.sync="Workstepexplain"
            width="30%"
            :before-close="handleClose">
            <div class="tanchuangstyle">
                <p>{{workStepInstructions}}</p>
            </div>
        </el-dialog>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.tanchuangstyle{
    height: 300px;
    overflow: hidden;
    overflow-y: auto;
    font-size: 16px;
}

.tanchuangstyle p{
    text-indent: 10px;
}
.el-row {
    margin-left: 0px !important;
    margin-right: 0px !important;
}
.bulletin_content {
    width: 100%;
    height: 100%;
    padding: 0px 10px;
    box-sizing: border-box;
}
.EndOfPageRight_head {
    height: 50px;
    overflow: hidden;
}
.EndOfPageRight_head_left {
    /* width: 240px; */
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.EndOfPageRight_head_left p {
    width: 120px;
    float: left;
    line-height: 36px;
    /* font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif; */
}
.EndOfPageRight_head_left .el-button--medium {
    width: 120px;
}
.bigbotton .el-button--medium{
    width: 120px;
}
.bigbotton .displayright {
    display: flex;
    justify-content: flex-end;
}
.EndOfPageRight_head_left div {
    width: 170px;
    float: left;
}
.EndOfPageRight_head_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}
.DispatchBox_head_box{
    display: flex;
    justify-content: flex-start;
}
.DispatchBox_head_boxleft{
    width: 75%;
}
.DispatchBox_head_boxright{
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end
}
.DispatchBox_head_boxright div p{
    text-align: center
}
/* .DispatchBox_head_boxright .button{
    height: ;
} */
.DispatchBox_head {
    /* height: 60px; */
    overflow: hidden;
}
.DispatchBox_head_left {
    /* width: 240px; */
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.DispatchBox_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
    /* font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif; */
}
.DispatchBox_head_left div {
    width: 170px;
    float: left;
}
.DispatchBox_head_bnt {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
}

.DispatchBox_operation {
    /* height: 50px; */
    margin: 10px 0px;
}

.DispatchBox_operation_nei {
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* background: #ccc; */
}

.DispatchBoxOperationNei {
    width: 451px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.DispatchBoxOperationNei p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.DispatchBoxOperationNei .div {
    width: 381px;
    float: left;
}
.DispatchBoxOperation_bnt {
    margin-top: 10px;
    margin-left: 10px;
}
.tableStep {
    margin-top: 11px;
    margin-bottom: 20px;
}
.contnet {
    width: 100%;
}
.contnet_table {
    padding: 0px 10px;
    /* height: 100%; */
    height: -moz-calc(100% - 100px); /* WebKit */
    height: -webkit-calc(100% - 100px); /* Opera */
    height: -o-calc(100% - 100px); /* Standard */
    height: calc(100% - 100px);
}
.jsd {
    width: 50%;
    height: 100%;
    float: right;
}
.contnet_table_right {
    width: 100%;
    height: 100%;
    float: right;
    /* margin-bottom: 20px; */
    border: 1px solid #f1f1f1;
    box-sizing: border-box;
}
.detailedInformation_head {
    width: 100%;
    height: 50px;
    overflow: hidden;
}
.detailedInformation_head_div {
    width: 200px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.detailedInformation_head_div p {
    width: 60px;
    float: left;
    line-height: 36px;
    font-size: 14px;
}
.detailedInformation_head_div div {
    width: 140px;
    float: left;
}
.detailedInformation_head_bnt {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
}
.detailedInformation_con {
    width: 100%;
    height: -moz-calc(100% - 20px); /* WebKit */
    height: -webkit-calc(100% - 20px); /* Opera */
    height: -o-calc(100% - 20px); /* Standard */
    height: calc(100% - 20px);
}
.detailedInformation_content {
    width: calc(100% - 20px);
    height: 100%;
    margin-left: 10px;
}
.Equipment {
    /* width: 100%; */
    height: 50%;
    /* float: left; */
    margin-left: 1%;
}

.Equipment_p {
    width: 100%;
    height: 20px;
    margin-top: 17px;
    font-size: 12px;
}
.Equipment_div {
    width: 100%;
    height: -moz-calc(100% - 37px); /* WebKit */
    height: -webkit-calc(100% - 37px); /* Opera */
    height: -o-calc(100% - 37px); /* Standard */
    height: calc(100% - 37px);
}
.Equipment .Materia_contnet {
    width: 100%;
    height: 100%;
}
.Equipment .Materia_contnet_table {
    height: 100%;
}
.Equipment_div .el-textarea__inner {
    height: 100%;
}
.enclose {
    /* width: 100%; */
    height: 50%;
    /* float: left; */
    margin-left: 1%;
}
.enclose_p {
    width: 100%;
    height: 20px;
    margin-top: 17px;
    font-size: 12px;
}
.enclose_div {
    width: 100%;
    height: -moz-calc(100% - 37px); /* WebKit */
    height: -webkit-calc(100% - 37px); /* Opera */
    height: -o-calc(100% - 37px); /* Standard */
    height: calc(100% - 37px);
}
.operation {
    height: 46px;
    padding: 20px 10px 0px;
}

.operation_bnt {
    margin-top: 11px;
    margin-left: 10px;
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
<script>
import { AssemblyPerform } from "../../../common/api";
export default {
    data() {
        return {
            // instructionData: [],
            percentage: 0, //工时总量
            gross:0, //工时
            colors:[
                {color: 'bule', percentage: 20},
                {color: 'bule', percentage: 40},
                {color: 'bule', percentage: 60},
                {color: 'bule', percentage: 80},
                {color: 'bule', percentage: 100},
                {color: '#f56c6c', percentage: 101}
            ], //进度条颜色
            instructNum: "", // 指令号
            instructName: "", // 指令名称
            frockInfo: [], // 工装
            facilityInfo: [], // 设备
            instrumentInfo: [], // 工具
            measureInfo: [], // 量具
            activeName: "first",
            tdDAssemProduct: [],
            workAoH: "",
            workAoName: "",
            workTimes: "",
            workProduct: "",
            workAircraftType: "",
            workPosition: "",
            statusA: "", // 指令状态
            statusB: "", // 工单状态
            workReportId: "",
            instructId: this.$route.query.instructId,
            instructionId: this.$route.query.instructionId,
            orderId: this.$route.query.orderId,
            stepIds: this.$route.query.stepId,
            tableStepData: [], // 工步
            workStepContent: "", // 工步工作内容
            workStepInstructions: "", // 工步工作说明
            stepId: "",
            heights: "", // 动态高度
            tableData: [],
            formInline: {
                aoSize: "",
                aoType: "",
                flightSize: "",
                productDrawing: "",
                aircraftType: ""
            },
            TableHeight: {
                height: ""
            },
            detailedInformationHeight: {
                height: ""
            },
            InformationHeight: {
                height: ""
            },
            Informat: {
                height: ""
            },
            workInline: {
                examineName: "", //工检
                mutualInspectionName: "", //互检
                specialInspectionName: "", //专检
                userRepresentativesName: "" //用户代表
            },
            formLabelWidth: "120px",
            workExamine: false, //工检
            mutualInspection: false, //互检
            specialInspection: false, //专检
            userRepresentatives: false, //用户代表
            Abnormalclosedstart:false,//异常封闭
            abnormal: false, //异常上报
            checkoutstart: false,//检验规格
            qualitstart: false, //质量异常
            Workstep:false,//工作内容
            Workstepexplain:false,//工作说明
            exceptionContent: "",//异常上报参数
            checkoutdata: [],//检验规格数据
            formWorkuser: {
                name: ""
            },
            suspensionReasonVios: false, //暂停
            suspensionReason: {
                name: ""
            },
            noShow: true,
            isShow: false, // 显示隐藏
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入暂停原因",
                        trigger: "blur"
                    }
                ]
            },
            oneShow: false,
            twoShow: false,
            threeShow: false,
            fourShow: false,
            TechnicaltFeame: false,
            index_Technical: "",
            Loading: false,
            TechnicalDocumentation: false,
            TechnicalOnAddArr: [],
            eeee: "已超时",
            rule: {
                name: [{ required: true, message: "请输入人员名称" }]
            }
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化

        this.detailedInformation(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.detailedInformation); //在生命周期里面监听浏览器变化

        this.Information(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.Information); //在生命周期里面监听浏览器变化

        this.Informats(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.Informat); //在生命周期里面监听浏览器变化

        this.workList();
        this.findHasChangeOrderList();
        this.tableVideoList();
        this.GetInstrumentNum()
    },
    methods: {
        // 工步工作内容双击弹窗
        shishiClick(){
            this.Workstep = true
        },
        // 工步工作说明双击弹窗
        jobdescription(){
            this.Workstepexplain = true
        },
        handleClose(){
            this.Workstep = false
            this.Workstepexplain = false
        },
        //检验规程
        inspectionprocedure(){
            let that = this;
            let url = AssemblyPerform.GET_V_findInspectionProcedures;
            that.axios
                .get(url, {
                    params: {
                        instructId: that.instructId,
                        // instructionId: that.instructionId,
                    }
                })
                .then(res => {
                    console.log(res)
                    that.checkoutdata = res.data
                    that.checkoutstart = true
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 异常上报
        ExceptionReporting(){
            this.abnormal = true
        },
        // 异常上报接口
        abnormalupdata(){
            let that = this;
            let url = AssemblyPerform.GET_V_createExceptionReport;
            that.axios
                .post(AssemblyPerform.GET_V_createExceptionReport, {
                    reportingType: "1",
                    exceptionContent: that.exceptionContent
                })
                .then(res => {
                    if(res.data.success){
                        this.$message({
                            message: '上报成功',
                            type: 'success'
                        });
                        this.abnormal = false
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 获取右上方仪表盘
        GetInstrumentNum(){
            let that = this;
            let url = AssemblyPerform.GET_V_findHasChangeOrder;
            that.axios
                .get(url, {
                    params: {
                        instructionId: that.instructionId,
                        instructId: that.instructId
                    }
                })
                .then(res => {
                    console.log(res)
                    this.percentage =  res.data.workloadProportion//工时总量
                    this.gross = res.data.workingHoursProportion //工时
                })
                .catch(error => {
                    console.log(error);
                });
        },
        format(percentage) {
            return percentage > 100 ? `${percentage}%` : `${percentage}%`;
        },
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行content
            this.TableHeight.height = window.innerHeight - 370 + "px";
        },
        detailedInformation() {
            this.detailedInformationHeight.height =
                window.innerHeight - 215 + "px";
        },
        Information() {
            this.InformationHeight.height = window.innerHeight - 436 + "px";
        },
        Informats() {
            this.Informat.height =
                window.innerHeight -
                this.detailedInformationHeight.height +
                "px";
        },
        findHasChangeOrderList() {
            let that = this;
            let url = AssemblyPerform.GET_A_findHasChangeOrder;
            that.axios
                .get(url, {
                    params: {
                        instructionId: that.instructionId,
                        instructId: that.instructId,
                    }
                })
                .then(res => {
                    if (res.data == false) {
                        this.fourShow = false;
                    } else {
                        this.fourShow = true;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 数据展示
        workList() {
            let that = this;
            let url = AssemblyPerform.GET_A_findWordStep;
            that.axios
                .get(url, {
                    params: {
                        instructId: that.instructId,
                        instructionId: that.instructionId,
                        orderId: that.orderId
                    }
                })
                .then(res => {
                    // console.log(res.data)
                    that.instructNum =res.data.tdDInstructionList[0].instructNum;
                    that.instructName =res.data.tdDInstructionList[0].instructName;
                    that.workAoH = res.data.tdDDispatchInfoList[0].aoNO;
                    that.workAoName = res.data.tdDDispatchInfoList[0].aoName;
                    that.workTimes = res.data.tdDDispatchInfoList[0].sortieNo;
                    that.workPosition =res.data.tdDDispatchInfoList[0].stationName;
                    that.tableStepData = res.data.tdDWordStepList;
                    console.log(this.tableStepData)
                    that.frockInfo = res.data.tdDFrockInfoList; // 工装
                    that.facilityInfo = res.data.facilityList; // 设备
                    that.instrumentInfo = res.data.toolInfoList; // 工具
                    that.measureInfo = res.data.measuringList; // 量具

                    that.tdDAssemProduct = res.data.tdDAssemProductList;
                    that.statusA = res.data.tdDInstructionList[0].status;
                    that.statusB = res.data.dispatchStatus;
                    if (this.statusA == 6) {
                        this.noShow = false;
                        this.isShow = true;
                    }
                    
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 开工
        startWork() {
            let that = this;
            let url = AssemblyPerform.GET_A_startWordStep;
            that.axios
                .get(url, {
                    params: {
                        instructionId: that.instructionId
                    }
                })
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: "开工成功",
                            type: "success"
                        });
                        that.workList();
                    } else {
                        that.$message({
                            message: res.data.message,
                            type: "error"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 暂停
        pauseWork() {
            this.suspensionReason.name = "";
            this.suspensionReasonVios = true;
        },
        // 暂停 - 确定
        suspensionReasonViosForm(suspensionReason) {
            let that = this;
            this.$refs[suspensionReason].validate(valid => {
                if (valid) {
                    that.axios
                        .post(AssemblyPerform.GET_A_stop, {
                            stopReason: that.suspensionReason.name,
                            instructionId: that.instructionId
                        })
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: "暂停成功",
                                    type: "success"
                                });
                                that.noShow = false;
                                that.isShow = true;
                                that.suspensionReasonVios = false;
                                that.workList();
                            } else {
                                that.$message({
                                    message: res.data.message,
                                    type: "error"
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
        // 释放
        release() {
            let that = this;
            that.axios
                .get(AssemblyPerform.GET_A_start, {
                    params: {
                        instructionId: that.instructionId
                    }
                })
                .then(res => {
                    // console.log(res, "dsfsdfsd");
                    if (res.data.success == true) {
                        that.$message({
                            message: "释放成功",
                            type: "success"
                        });
                        that.noShow = true;
                        that.isShow = false;
                        that.workList();
                    } else {
                        that.$message({
                            message: res.data.message,
                            type: "error"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 工艺更改单
        processChange() {
            this.$router.push({
                path: "/WorkRecord",
                query: {
                    instructionId: this.instructionId
                }
            });
        },
        // 工步-单击事件
        tableStepClick(row) {
            this.workStepContent = row.stepContex;
            this.workStepInstructions = row.stepExplan;
            this.stepId = row.stepId;
            this.stepIdInfo();
        },
        stepIdInfo() {
            let url = AssemblyPerform.GET_A_findWorkerFinish;
            this.axios
                .get(url, {
                    params: {
                        stepId: this.stepId,
                        instructionId: this.instructionId
                    }
                })
                .then(res => {
                    if (res.data.byInstructionId.length === 0) {
                        this.workInline.examineName = ""; // 工捡
                        this.workInline.specialInspectionName = ""; // 专检
                        this.workInline.mutualInspectionName = ""; // 互检
                        this.workInline.userRepresentativesName = ""; // 用户代表
                    } else {
                        this.workInline.examineName =
                            res.data.byInstructionId[0].workCheck; // 工捡
                        this.workInline.specialInspectionName =
                            res.data.byInstructionId[0].specialCheck; // 专检
                        this.workInline.mutualInspectionName =
                            res.data.byInstructionId[0].mutualCheck; // 互检
                        this.workInline.userRepresentativesName =
                            res.data.byInstructionId[0].userPresent; // 用户代表
                        this.workReportId =
                            res.data.byInstructionId[0].workReportId;
                    }
                    if (res.data.hasParam == true) {
                        this.oneShow = true;
                    } else {
                        this.oneShow = false;
                    }
                    if (res.data.importerStep == true) {
                        this.twoShow = true;
                    } else {
                        this.twoShow = false;
                    }
                    if (res.data.trialStep == true) {
                        this.threeShow = true;
                    } else {
                        this.threeShow = false;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        closeDialog(et, it) {
            et.name = "";
            et.region = "";
            it.num = "";
            this.workExamine = false;
            this.mutualInspection = false;
            this.specialInspection = false;
            this.Abnormalclosedstart = false;
            this.qualitstart = false;
        },
        // 工检弹框
        ExamineLook() {
            if (this.stepId != "") {
                this.workExamine = true;
            } else {
                this.$message({
                    message: "请选择工步",
                    type: "warning"
                });
            }
        },
        workExamineInput(val) {
            let that = this;
            let url =
                AssemblyPerform.GET_A_workExamineFinish +
                "?cardNo=" +
                val.num +
                "&flag=" +
                2;
            that.axios
                .post(url, {
                    instructionId: that.instructionId,
                    stepId: this.stepId
                })
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: res.data.message,
                            type: "success"
                        });
                        that.workExamine = false;
                        that.stepIdInfo();
                    } else {
                        val.num = "";
                        that.$message({
                            message: res.data.message,
                            type: "error"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        workExaminePopSava(item) {
            let flag = this.$refs["workExaminechildRules"].validateForm();
            if (flag) {
                let that = this;
                let url =
                    AssemblyPerform.GET_A_workExamineFinish +
                    "?cardNo=" +
                    item.name +
                    "&flag=" +
                    1;
                that.axios
                    .post(url, {
                        instructionId: that.instructionId,
                        workCheckNum: item.name,
                        workCheck: item.region,
                        stepId: that.stepId
                    })
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            that.workExamine = false;
                            that.stepIdInfo();
                        } else {
                            that.$message({
                                message: res.data.message,
                                type: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                this.$message.error("信息不完整，请填写完整");
            }
        },
        // 互检 -弹框
        mutualInspectionTrue() {
            if (this.workInline.examineName == "") {
                this.$message({
                    message: "请先点击工检，添加人员信息",
                    type: "warning"
                });
            } else {
                this.mutualInspection = true;
            }
        },
        mutualInspectionInput(mu) {
            let that = this;
            let url =
                AssemblyPerform.GET_A_updateFinishWork +
                "?cardNo=" +
                mu.num +
                "&flag=" +
                2 +
                "&checkFlag=" +
                1;
            that.axios
                .post(url, {
                    instructId: that.instructId,
                    instructionId: that.instructionId,
                    workReportId: that.workReportId
                })
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: res.data.message,
                            type: "success"
                        });
                        that.mutualInspection = false;
                        that.stepIdInfo();
                    } else {
                        mu.num = "";
                        that.$message({
                            message: res.data.message,
                            type: "error"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        mutualInspectionPopSava(ms) {
            let flag = this.$refs["mutualInspectionchildRules"].validateForm();
            if (flag) {
                let that = this;
                let url =
                    AssemblyPerform.GET_A_updateFinishWork +
                    "?cardNo=" +
                    ms.name +
                    "&flag=" +
                    1 +
                    "&checkFlag=" +
                    1;
                let data = {
                    instructId: that.instructId,
                    instructionId: that.instructionId,
                    workReportId: that.workReportId,
                    mutualCheckNum: ms.name,
                    mutualCheck: ms.region
                };
                that.axios
                    .post(url, data)
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            that.mutualInspection = false;
                            that.stepIdInfo();
                        } else {
                            that.$message({
                                message: res.data.message,
                                type: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                this.$message.error("信息不完整，请填写完整");
            }
        },
        // 专检 -弹框
        specialInspectionTrue() {
            if (this.workInline.examineName == "") {
                this.$message({
                    message: "请先点击工检，添加人员信息",
                    type: "warning"
                });
            } else {
                this.specialInspection = true;
            }
        },
        specialInspectionInput(sp) {
            let that = this;
            let url =
                AssemblyPerform.GET_A_updateFinishWork +
                "?cardNo=" +
                sp.num +
                "&flag=" +
                2 +
                "&checkFlag=" +
                2;
            that.axios
                .post(url, {
                    instructId: that.instructId,
                    instructionId: that.instructionId,
                    workReportId: that.workReportId
                })
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: res.data.message,
                            type: "success"
                        });
                        that.specialInspection = false;
                        that.stepIdInfo();
                    } else {
                        sp.num = "";
                        that.$message({
                            message: res.data.message,
                            type: "error"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        specialInspectionPopSava(st) {
            let flag = this.$refs["specialInspectionchildRules"].validateForm();
            if (flag) {
                let that = this;
                let url =
                    AssemblyPerform.GET_A_updateFinishWork +
                    "?cardNo=" +
                    st.name +
                    "&flag=" +
                    1 +
                    "&checkFlag=" +
                    2;
                that.axios
                    .post(url, {
                        instructId: that.instructId,
                        instructionId: that.instructionId,
                        workReportId: that.workReportId,
                        specialCheckNum: st.name,
                        specialCheck: st.region
                    })
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            that.specialInspection = false;
                            that.stepIdInfo();
                        } else {
                            that.$message({
                                message: res.data.message,
                                type: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                this.$message.error("信息不完整，请填写完整");
            }
        },
        // 用户代表 -弹框
        userRepresentativesTrue() {
            if (this.workInline.examineName == "") {
                this.$message({
                    message: "请先点击工检，添加人员信息",
                    type: "warning"
                });
            } else {
                this.userRepresentatives = true;
                this.formWorkuser.name = "";
            }
        },
        // 用户代表 - 保存
        userRepresentativesForm(formWorkuser) {
            let that = this;
            let url =
                AssemblyPerform.GET_A_updateFinishWork +
                "?checkFlag=" +
                2 +
                "&flag=" +
                1 +
                "&cardNo=" +
                that.formWorkuser.name;
            this.$refs[formWorkuser].validate(valid => {
                if (valid) {
                    that.axios
                        .post(url, {
                            instructId: that.instructId,
                            instructionId: that.instructionId,
                            workReportId: that.workReportId,
                            userPresent: that.formWorkuser.name
                        })
                        .then(res => {
                            if (res.data.success == true) {
                                that.$message({
                                    message: res.data.message,
                                    type: "success"
                                });
                                that.userRepresentatives = false;
                                this.$refs[formWorkuser].resetFields();
                                that.stepIdInfo();
                            } else {
                                that.$message({
                                    message: res.data.message,
                                    type: "error"
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
        // 异常封闭
        Abnormalclosed(){
            this.Abnormalclosedstart = true;
        },
        // 质量异常封闭
        AbnormalInspectionInput(sp) {
            let that = this;
            let url =
                AssemblyPerform.GET_V_checkExaminerAuth
                
            that.axios
                .post(url, {
                    cardNo:sp.num
                })
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: res.data.message,
                            type: "success"
                        });
                        that.Abnormalclosedstart = false;
                        that.$router.push({
                                path: "/AndSealing",
                                query: {
                                    instructId: that.instructId,
                                    instructionId: that.instructionId,
                                    orderId: that.orderId
                            }
                        });
                    } else {
                        sp.num = "";
                        that.$message({
                            message: res.data.message,
                            type: "error"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        AbnormalInspectionPopSava(st) {
            let flag = this.$refs["AbnormalInspectionchildRules"].validateForm();
            if (flag) {
                let that = this;
                let url =
                    AssemblyPerform.GET_V_checkExaminerAuth
                that.axios
                    .post(url, {
                        cardNo:st.name
                    })
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            that.Abnormalclosedstart = false;
                            that.$router.push({
                                path: "/AndSealing",
                                query: {
                                    instructId: that.instructId,
                                    instructionId: that.instructionId,
                                    orderId: that.orderId
                                }
                            });
                        } else {
                            that.$message({
                                message: res.data.message,
                                type: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                this.$message.error("信息不完整，请填写完整");
            }
        },
        // 质量异常
        qualityissue() {
            this.qualitstart = true
        },
        // 质量异常
        qualityInspectionInput(sp) {
            let that = this;
            let url =
                AssemblyPerform.GET_V_checkExaminerAuth 
            that.axios
                .post(url, {
                    cardNo:sp.num
                })
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: res.data.message,
                            type: "success"
                        });
                        that.qualitstart = false;
                        that.$router.push({
                            path: "/Abnormalquality",
                            query: {
                                instructId: that.instructId,
                                instructionId: that.instructionId,
                                orderId: that.orderId
                            }
                        });
                    } else {
                        sp.num = "";
                        that.$message({
                            message: res.data.message,
                            type: "error"
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        qualityInspectionPopSava(st) {
            let flag = this.$refs["qualityInspectionchildRules"].validateForm();
            if (flag) {
                let that = this;
                let url =
                    AssemblyPerform.GET_V_checkExaminerAuth
                that.axios
                    .post(url, {
                        cardNo:st.name
                    })
                    .then(res => {
                        if (res.data.success == true) {
                            that.$message({
                                message: res.data.message,
                                type: "success"
                            });
                            that.qualitstart = false;
                            that.$router.push({
                                path: "/Abnormalquality",
                                query: {
                                    instructId: that.instructId,
                                    instructionId: that.instructionId,
                                    orderId: that.orderId
                                }
                            });
                        } else {
                            that.$message({
                                message: res.data.message,
                                type: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                this.$message.error("信息不完整，请填写完整");
            }
        },
        // 返回
        returnWork() {
            this.$router.push({
                name: "WorkersReceive"
            });
        },
        // 参数录入
        ParametersEntry() {
            if (this.status != 1) {
                if (this.stepId != "") {
                    this.$router.push({
                        name: "Massparameter",
                        query: {
                            instructId: this.instructId,
                            instructionId: this.instructionId,
                            stepId: this.stepId,
                            orderId: this.orderId
                        }
                    });
                } else {
                    this.$message({
                        message: "请选择工步",
                        type: "warning"
                    });
                }
            } else {
                this.$message({
                    message: "请先点击开工",
                    type: "warning"
                });
            }
        },
        // 工序检验
        processInspection() {
            this.$router.push({
                path: "/Examine"
            });
        },
        //呼叫物料
        OnMaterialCall() {
            this.$router.push({
                path: "/MaterialCall",
                query: {
                    instructId: this.instructId,
                    instructionId: this.instructionId,
                    orderId: this.orderId
                }
            });
        },
        ConfirmCaterial() {
            this.$router.push({
                path: "/MaterialConfirmation",
                query: {
                    instructId: this.instructId,
                    orderId: this.orderId
                }
            });
        },
        // 获取工艺规程附件
        tableVideoList() {
            let that = this;
            let url = AssemblyPerform.GET_A_findFileAss;
            that.axios
                .get(url, {
                    params: {
                        instructId: that.instructId,
                        category: "WORKORDER"
                    }
                })
                .then(res => {
                    that.tableData = res.data.tInstructFiles;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleEdit(row) {
            window.open(row.fileUrl);
        },
        // 新增 上传附件
        AddToDocument() {
            this.TechnicaltFeame = true;
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
        uploadFile() {
            this.TechnicalDocumentation = true;
            this.findFileList();
        },
        findFileList() {
            let that = this;
            let url = AssemblyPerform.GET_A_findFileAss;
            that.axios
                .get(url, {
                    params: {
                        instructId: that.instructId,
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
        //添加保存
        OnAddSave() {
            var options = {
                // 设置axios的参数
                url:
                    AssemblyPerform.GET_A_uploadFileAss +
                    "?instructId=" +
                    this.instructId,
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
        }
    }
};
</script>
