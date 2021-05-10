<template>
    <div>
        <div class="Equipment_head">
            <div class="Equipment_head_left">
                <p>名称</p>
                <div>
                    <el-input v-model="QueryName" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <el-button @click="OnQuery" size="medium" type="primary" class="Equipment_head_bnt">查询</el-button>
        </div>

        <div class="Equipment_operation">
            <el-button
                size="medium"
                type="primary"
                @click="NewlyAdded"
                class="Equipment_operation_bnt"
            >新增</el-button>
            <el-button
                @click="OnModify"
                size="medium"
                type="primary"
                class="Equipment_operation_bnt"
            >修改</el-button>
            <el-button
                @click="Import"
                size="medium"
                type="primary"
                class="Equipment_operation_bnt"
            >导入</el-button>
            <el-button
                @click="Export"
                size="medium"
                type="primary"
                class="Equipment_operation_bnt"
            >导出模板</el-button>
            <el-button
                @click="OnSee"
                size="medium"
                type="primary"
                class="Equipment_operation_bnt"
            >查看</el-button>
        </div>

        <div class="Equipment_contnet" :style="TableHeight">
            <div class="Equipment_contnet_table">
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
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                    <el-table-column prop="facilityNum" label="设备编号"></el-table-column>
                    <el-table-column prop="facilityType" label="设备类型"></el-table-column>
                    <el-table-column prop="facilityModel" label="设备型号"></el-table-column>
                    <el-table-column prop="useYear" label="使用年限"></el-table-column>
                    <el-table-column prop="facilityStatus" label="设备状态"></el-table-column>
                    <el-table-column label="备注" :show-overflow-tooltip="true">
                        <template slot-scope="{ row }">
                            <span>{{ row.remarks }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="105">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="ViewDocument(scope.$index, scope.row)"
                            >查看文档</el-button>
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

        <!----------- 导入 ------------->
        <el-dialog :visible.sync="ExportFeame" width="50%">
            <div class="ExportStyle">
                <input v-model="index_text" type="text" class="text" ref="clear" />
                <input type="file" class="file" @change="change" />
                <button class="preview">预览</button>
                <div class="title">
                    <span class="title_sapn">*注：</span>
                    文件大小不能超过100M
                </div>
            </div>
            <div class="dialog_footer">
                <el-button
                    class="dialog_Close"
                    v-loading.fullscreen.lock="Loading"
                    @click="OnImportSave"
                >保 存</el-button>
            </div>
        </el-dialog>

        <!-------- 新增 -------->
        <el-dialog :visible.sync="ElasticFrame" width="70%">
            <div class="EquipmentNewlyAdded">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="设备名称" prop="EquipmentName" class="EquipmentNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.EquipmentName"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="设备编号"
                        prop="EquipmentNumber"
                        class="EquipmentNewlyAddedBox"
                    >
                        <el-input
                            v-model="ruleForm.EquipmentNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型" prop="EquipmentType" class="EquipmentNewlyAddedBox">
                        <el-select
                            size="medium"
                            v-model="ruleForm.EquipmentType"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionFour"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备型号" class="EquipmentNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.EquipmentModel"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="生产厂家" class="EquipmentNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.Manufacturer"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="使用车间" prop="UseWorkshop" class="EquipmentNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.UseWorkshop"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="生产日期" class="EquipmentNewlyAddedBox">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.DateOfManufacture"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="设备规格" prop="OccupiedSpace" class="EquipmentNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.OccupiedSpace"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="出厂日期" class="EquipmentNewlyAddedBox">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.DateOfProduction"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="使用年限" class="EquipmentNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.serviceLife"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="安装日期" class="EquipmentNewlyAddedBox">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.InstallDate"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="运营日期" class="EquipmentNewlyAddedBox">
                        <el-date-picker
                            size="medium"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.OperationDate"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="责任人" class="EquipmentNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.PersonLiable"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="设备状态"
                        prop="EquipmentStatus"
                        class="EquipmentNewlyAddedBox"
                    >
                        <el-select
                            size="medium"
                            v-model="ruleForm.EquipmentStatus"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionTwo"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属站位" prop="Station" class="EquipmentNewlyAddedBox">
                        <el-select
                            size="medium"
                            v-model="ruleForm.Station"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionOne"
                                :key="item.warehouseId"
                                :label="item.warehouseName"
                                :value="item.warehouseName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="技术参数"
                        prop="TechnicalParameter"
                        class="EquipmentNewlyAddedBox"
                    >
                        <el-input
                            v-model="ruleForm.TechnicalParameter"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                  
                    <el-form-item label="所属产线" class="EquipmentNewlyAddedBox">
                        <el-select
                            size="medium"
                            v-model="ruleForm.ProductionLine"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionThree"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备效率" class="EquipmentNewlyAddedBox">
                        <el-input
                            v-model="ruleForm.EquipmentEfficiency"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="设备是否固定" class="EquipmentNewlyAddedBoxFixed">
                        <el-checkbox v-model="ruleForm.EquipmentFixed" name="type"></el-checkbox>
                    </el-form-item>
                    <el-form-item label="备注" class="EquipmentNewlyAddedBoxremarks">
                        <el-input
                            style="width:78%;"
                            v-model="ruleForm.remarks"
                            type="textarea"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="EquipmentNewlyAdded_btn">
                <el-button
                    class="EquipmentNewlyAdded_Close"
                    @click="AddAndSave('ruleForm')"
                    type="primary"
                >确 定</el-button>
                <el-button class="EquipmentNewlyAdded_Close" @click="Close">取 消</el-button>
            </div>
        </el-dialog>

        <!------- 修改 ------->
        <el-dialog :visible.sync="ModifyFrame" width="70%">
            <div class="EquipmentNewlyAdded">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="设备名称" prop="EquipmentName" class="EquipmentNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.EquipmentName"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="设备编号"
                        prop="EquipmentNumber"
                        class="EquipmentNewlyAddedBox"
                    >
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.EquipmentNumber"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型" prop="EquipmentType" class="EquipmentNewlyAddedBox">
                        <el-select
                            size="medium"
                            v-model="ruleForm.EquipmentType"
                            placeholder="请选择"
                            clearable
                            :disabled="Disable"
                        >
                            <el-option
                                v-for="item in optionFour"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备型号" class="EquipmentNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.EquipmentModel"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="生产厂家" class="EquipmentNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.Manufacturer"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="使用车间" prop="UseWorkshop" class="EquipmentNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.UseWorkshop"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="生产日期" class="EquipmentNewlyAddedBox">
                        <el-date-picker
                            :disabled="Disable"
                            size="medium"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.DateOfManufacture"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="设备规格" prop="OccupiedSpace" class="EquipmentNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.OccupiedSpace"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="出厂日期" class="EquipmentNewlyAddedBox">
                        <el-date-picker
                            :disabled="Disable"
                            size="medium"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.DateOfProduction"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="使用年限" class="EquipmentNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.serviceLife"
                            oninput="value=value.replace(/[^\d]/g,'')"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="安装日期" class="EquipmentNewlyAddedBox">
                        <el-date-picker
                            :disabled="Disable"
                            size="medium"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.InstallDate"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="运营日期" class="EquipmentNewlyAddedBox">
                        <el-date-picker
                            :disabled="Disable"
                            size="medium"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.OperationDate"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="责任人" class="EquipmentNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.PersonLiable"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="设备状态"
                        prop="EquipmentStatus"
                        class="EquipmentNewlyAddedBox"
                    >
                        <el-select
                            :disabled="Disable"
                            size="medium"
                            v-model="ruleForm.EquipmentStatus"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionTwo"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属站位" prop="Station" class="EquipmentNewlyAddedBox">
                        <el-select
                            :disabled="Disable"
                            size="medium"
                            v-model="ruleForm.Station"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionOne"
                                :key="item.warehouseId"
                                :label="item.warehouseName"
                                :value="item.warehouseName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="技术参数"
                        prop="TechnicalParameter"
                        class="EquipmentNewlyAddedBox"
                    >
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.TechnicalParameter"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                   
                    <el-form-item label="所属产线" class="EquipmentNewlyAddedBox">
                        <el-select
                            :disabled="Disable"
                            size="medium"
                            v-model="ruleForm.ProductionLine"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionThree"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备效率" class="EquipmentNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.EquipmentEfficiency"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="设备是否固定" class="EquipmentNewlyAddedBoxFixed">
                        <el-checkbox
                            :disabled="Disable"
                            v-model="ruleForm.EquipmentFixed"
                            name="type"
                        ></el-checkbox>
                    </el-form-item>
                    <el-form-item label="备注" class="EquipmentNewlyAddedBoxremarks">
                        <el-input
                            :disabled="Disable"
                            style="width:78%;"
                            v-model="ruleForm.remarks"
                            type="textarea"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="EquipmentNewlyAdded_btn">
                <el-button
                    :disabled="Disable"
                    v-show="isShow"
                    class="EquipmentNewlyAdded_Close"
                    @click="OnModifyAndSave('ruleForm')"
                    type="primary"
                >确 定</el-button>
                <el-button class="EquipmentNewlyAdded_Close" @click="Close">取 消</el-button>
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
                    <el-table-column prop="name" label="文档名称"></el-table-column>
                    <el-table-column label="操作" width="175">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="SeeFile(scope.$index, scope.row)"
                            >查看文档</el-button>
                            <el-button
                                size="mini"
                                type="primary"
                                @click="OnDeleteFile(scope.$index, scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!---------- 技术文档预览弹框 ---------->
        <el-dialog :visible.sync="TechnicaltFeame" width="50%">
            <div class="ExportStyle">
                <input v-model="index_Technical" type="text" class="text" />
                <input type="file" class="file" @change="AddToDocumentFormData" ref="both" />
                <button class="preview">预览</button>
                <div class="title">
                    <span class="title_sapn">*注：</span>
                    文件大小不能超过100M
                </div>
            </div>
            <div class="dialog_footer">
                <el-button
                    class="dialog_Close"
                    v-loading.fullscreen.lock="Loading"
                    @click="OnDocumentAddSave"
                    type="primary"
                >保 存</el-button>
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
            QueryArr: [], //检测项table数据
            QueryName: "",
            ruleForm: {
                EquipmentName: "", //设备名称
                EquipmentNumber: "", //设备编码
                EquipmentType: "", //设备类型
                EquipmentModel: "", //设备型号
                Manufacturer: "", //生产厂家
                UseWorkshop: "", //使用车间
                DateOfManufacture: "", //生产日期
                DateOfProduction: "", //出厂日期
                serviceLife: "", //使用年限
                InstallDate: "", //安装日期
                OperationDate: "", //投入运营日期
                PersonLiable: "", //责任人
                EquipmentStatus: "", //设备状态
                Station: "", //所属站位
                TechnicalParameter: "", //技术参数
                OccupiedSpace: "", //占用空间
                EquipmentFixed: "", //设备是否固定
                ProductionLine: "", //所属产线
                EquipmentEfficiency: "", //设备效率
                remarks: "" //备注
            },
            Disable: false,
            rules: {
                //验证
                EquipmentName: [
                    //设备名称
                    { required: true, message: " ", trigger: "blur" }
                ],
                EquipmentNumber: [
                    //设备编码
                    { required: true, message: " ", trigger: "blur" }
                ],
                EquipmentType: [
                    //设备类型
                    { required: true, message: " ", trigger: "blur" }
                ],
                UseWorkshop: [
                    //使用车间
                    { required: true, message: " ", trigger: "blur" }
                ],
                EquipmentStatus: [
                    //设备状态
                    { required: true, message: " ", trigger: "blur" }
                ],
                Station: [
                    //所属站位
                    { required: true, message: " ", trigger: "blur" }
                ],
                TechnicalParameter: [
                    //技术参数
                    { required: true, message: " ", trigger: "blur" }
                ],
                OccupiedSpace: [
                    //设备规格
                    { required: true, message: " ", trigger: "blur" }
                ]
            },
            add: [],

            ElasticFrame: false, //是否隐藏弹框
            ExportFeame: false, //导入弹框
            ModifyFrame: false, //修改
            TechnicalDocumentation: false, //技术文档弹框
            TechnicaltFeame: false, //技术文档
            TableHeight: {
                height: ""
            },

            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数

            Loading: false,
            formData: "", // 导入文件
            index_text: "",
            filename: "设备信息导入模板", //导出文件名称
            DeleteArr: [], //储存勾选到的新的数组
            WorkClothesID: "", //储存勾选到的id
            ViewID: "", //技术文档id
            formData_Technical: "", // 导入技术文档
            index_Technical: "",
            TechnicalOnAddArr: [],
            isShow: true,
            optionOne: [], // 站位
            optionTwo: [], // 设备状态
            optionThree: [], // 设备所属产线
            optionFour: [] // 设备类型
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
            this.TableHeight.height = window.innerHeight - 175 + "px";
        },
        // 查询设备状态
        getOptionTwoInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 1
                    }
                })
                .then(res => {
                    that.optionTwo = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询设备所属产线
        getOptionThreeInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 4
                    }
                })
                .then(res => {
                    that.optionThree = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询 - 工量具站位
        getOptionOneInfo() {
            let that = this;
            that.axios
                .post(BasicData.GET_Z_findAllWarehouse)
                .then(res => {
                    let arry = res.data;
                    arry.push({ warehouseName: "公用" });
                    that.optionOne = arry;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询设备类型
        getOptionFourInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 13
                    }
                })
                .then(res => {
                    that.optionFour = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查询
        OnQuery() {
            this.axios({
                method: "post",
                url: BasicData.GET_D_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    condetion: this.QueryName //名称
                }
            })
                .then(res => {
                    this.QueryArr = res.data.list;
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
                url: BasicData.GET_D_Query,
                data: {
                    pageNum: nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    condetion: this.QueryName //名称
                }
            })
                .then(res => {
                    this.QueryArr = res.data.list;
                    this.total = res.data.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //新增
        NewlyAdded() {
            this.ElasticFrame = true;
            this.getOptionTwoInfo(); // 查询设备状态
            this.getOptionThreeInfo(); // 查询设备所属产线
            this.getOptionOneInfo(); // 查询设备站位
            this.getOptionFourInfo(); // 查询设备类型
            this.ruleForm.EquipmentName = ""; //设备名称
            this.ruleForm.EquipmentNumber = ""; //设备编码
            this.ruleForm.EquipmentType = ""; //设备类型
            this.ruleForm.EquipmentModel = ""; //设备型号
            this.ruleForm.Manufacturer = ""; //生产厂家
            this.ruleForm.UseWorkshop = ""; //使用车间
            this.ruleForm.DateOfManufacture = ""; //生产日期
            this.ruleForm.DateOfProduction = ""; //出厂日期
            this.ruleForm.serviceLife = ""; //使用年限
            this.ruleForm.InstallDate = ""; //安装日期
            this.ruleForm.OperationDate = ""; //投入运营日期
            this.ruleForm.PersonLiable = ""; //责任人
            this.ruleForm.EquipmentStatus = ""; //设备状态
            this.ruleForm.Station = ""; //所属站位
            this.ruleForm.TechnicalParameter = ""; //技术参数
            this.ruleForm.OccupiedSpace = ""; //占用空间
            this.ruleForm.EquipmentFixed = ""; //设备是否固定
            this.ruleForm.ProductionLine = ""; //所属产线
            this.ruleForm.EquipmentEfficiency = ""; //设备效率
            this.ruleForm.remarks = ""; //备注
        },
        //新增保存
        AddAndSave(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios({
                        method: "post",
                        url: BasicData.GET_D_AddAndSave,
                        data: {
                            facilityName: this.ruleForm.EquipmentName, //设备名称
                            facilityNum: this.ruleForm.EquipmentNumber, //设备编码
                            facilityType: this.ruleForm.EquipmentType, //设备类型
                            facilityModel: this.ruleForm.EquipmentModel, //设备型号
                            manufacturer: this.ruleForm.Manufacturer, //生产厂家
                            useAddress: this.ruleForm.UseWorkshop, //使用车间
                            productionDate: this.ruleForm.DateOfManufacture, //生产日期
                            factoryDate: this.ruleForm.DateOfProduction, //出厂日期
                            useYear: this.ruleForm.serviceLife, //使用年限
                            installDate: this.ruleForm.InstallDate, //安装日期
                            useDate: this.ruleForm.OperationDate, //投入运营日期
                            principal: this.ruleForm.PersonLiable, //责任人
                            facilityStatus: this.ruleForm.EquipmentStatus, //设备状态
                            station: this.ruleForm.Station, //所属站位
                            parameter: this.ruleForm.TechnicalParameter, //技术参数
                            facilitySize: this.ruleForm.OccupiedSpace, //占用空间
                            isfixed: this.ruleForm.EquipmentFixed, //设备是否固定
                            ownerLine: this.ruleForm.ProductionLine, //所属产线
                            efficiency: this.ruleForm.EquipmentEfficiency, //设备效率
                            remarks: this.ruleForm.remarks //备注
                        }
                    })
                        .then(res => {
                            if (res.data.success == true) {
                                this.$message({
                                    //成功后的提示
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                this.ElasticFrame = false;
                                this.OnQuery();
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
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
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
        //修改
        OnModify() {
            if (this.WorkClothesID != "") {
                this.Disable = false;
                this.isShow = true;
                this.ModifyFrame = true;
                this.getOptionTwoInfo(); // 查询设备状态
                this.getOptionThreeInfo(); // 查询设备所属产线
                this.getOptionOneInfo(); // 查询设备站位
                this.getOptionFourInfo(); // 查询设备类型
                this.ruleForm.EquipmentName = this.DeleteArr.facilityName; //设备名称
                this.ruleForm.EquipmentNumber = this.DeleteArr.facilityNum; //设备编码
                this.ruleForm.EquipmentType = this.DeleteArr.facilityType; //设备类型
                this.ruleForm.EquipmentModel = this.DeleteArr.facilityModel; //设备型号
                this.ruleForm.Manufacturer = this.DeleteArr.manufacturer; //生产厂家
                this.ruleForm.UseWorkshop = this.DeleteArr.useAddress; //使用车间
                this.ruleForm.DateOfManufacture = this.DeleteArr.productionDate; //生产日期
                this.ruleForm.DateOfProduction = this.DeleteArr.factoryDate; //出厂日期
                this.ruleForm.serviceLife = this.DeleteArr.useYear; //使用年限
                this.ruleForm.InstallDate = this.DeleteArr.installDate; //安装日期
                this.ruleForm.OperationDate = this.DeleteArr.useDate; //投入运营日期
                this.ruleForm.PersonLiable = this.DeleteArr.principal; //责任人
                this.ruleForm.EquipmentStatus = this.DeleteArr.facilityStatus; //设备状态
                this.ruleForm.Station = this.DeleteArr.station; //所属站位
                this.ruleForm.TechnicalParameter = this.DeleteArr.parameter; //技术参数
                this.ruleForm.OccupiedSpace = this.DeleteArr.facilitySize; //占用空间
                this.ruleForm.EquipmentFixed = this.DeleteArr.isfixed; //设备是否固定
                this.ruleForm.ProductionLine = this.DeleteArr.ownerLine; //所属产线
                this.ruleForm.EquipmentEfficiency = this.DeleteArr.efficiency; //设备效率
                this.ruleForm.remarks = this.DeleteArr.remarks; //备注
            } else {
                this.$message({
                    //失败后的提示
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //修改保存
        OnModifyAndSave(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios({
                        method: "post",
                        url: BasicData.GET_D_Modify,
                        data: {
                            facilityId: this.WorkClothesID, //修改id
                            facilityName: this.ruleForm.EquipmentName, //设备名称
                            facilityNum: this.ruleForm.EquipmentNumber, //设备编码
                            facilityType: this.ruleForm.EquipmentType, //设备类型
                            facilityModel: this.ruleForm.EquipmentModel, //设备型号
                            manufacturer: this.ruleForm.Manufacturer, //生产厂家
                            useAddress: this.ruleForm.UseWorkshop, //使用车间
                            productionDate: this.ruleForm.DateOfManufacture, //生产日期
                            factoryDate: this.ruleForm.DateOfProduction, //出厂日期
                            useYear: this.ruleForm.serviceLife, //使用年限
                            installDate: this.ruleForm.InstallDate, //安装日期
                            useDate: this.ruleForm.OperationDate, //投入运营日期
                            principal: this.ruleForm.PersonLiable, //责任人
                            facilityStatus: this.ruleForm.EquipmentStatus, //设备状态
                            station: this.ruleForm.Station, //所属站位
                            parameter: this.ruleForm.TechnicalParameter, //技术参数
                            facilitySize: this.ruleForm.OccupiedSpace, //占用空间
                            isfixed: this.ruleForm.EquipmentFixed, //设备是否固定
                            ownerLine: this.ruleForm.ProductionLine, //所属产线
                            efficiency: this.ruleForm.EquipmentEfficiency, //设备效率
                            remarks: this.ruleForm.remarks //备注
                        }
                    })
                        .then(res => {
                            if (res.data.success == true) {
                                this.$message({
                                    //成功后的提示
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                this.ModifyFrame = false;
                                this.OnQuery();
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
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },

        //关闭
        Close() {
            this.ElasticFrame = false;
            this.ModifyFrame = false;
        },
        //查看
        OnSee() {
            if (this.WorkClothesID != "") {
                this.Disable = true;
                this.isShow = false;
                this.ModifyFrame = true;
                this.getOptionTwoInfo(); // 查询设备状态
                this.getOptionThreeInfo(); // 查询设备所属产线
                this.getOptionOneInfo(); // 查询设备站位
                this.ruleForm.EquipmentName = this.DeleteArr.facilityName; //设备名称
                this.ruleForm.EquipmentNumber = this.DeleteArr.facilityNum; //设备编码
                this.ruleForm.EquipmentType = this.DeleteArr.facilityType; //设备类型
                this.ruleForm.EquipmentModel = this.DeleteArr.facilityModel; //设备型号
                this.ruleForm.Manufacturer = this.DeleteArr.manufacturer; //生产厂家
                this.ruleForm.UseWorkshop = this.DeleteArr.useAddress; //使用车间
                this.ruleForm.DateOfManufacture = this.DeleteArr.productionDate; //生产日期
                this.ruleForm.DateOfProduction = this.DeleteArr.factoryDate; //出厂日期
                this.ruleForm.serviceLife = this.DeleteArr.useYear; //使用年限
                this.ruleForm.InstallDate = this.DeleteArr.installDate; //安装日期
                this.ruleForm.OperationDate = this.DeleteArr.useDate; //投入运营日期
                this.ruleForm.PersonLiable = this.DeleteArr.principal; //责任人
                this.ruleForm.EquipmentStatus = this.DeleteArr.facilityStatus; //设备状态
                this.ruleForm.Station = this.DeleteArr.station; //所属站位
                this.ruleForm.TechnicalParameter = this.DeleteArr.parameter; //技术参数
                this.ruleForm.OccupiedSpace = this.DeleteArr.facilitySize; //占用空间
                this.ruleForm.EquipmentFixed = this.DeleteArr.isfixed; //设备是否固定
                this.ruleForm.ProductionLine = this.DeleteArr.ownerLine; //所属产线
                this.ruleForm.EquipmentEfficiency = this.DeleteArr.efficiency; //设备效率
                this.ruleForm.remarks = this.DeleteArr.remarks; //备注
            } else {
                this.$message({
                    //失败后的提示
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //导出
        Export() {
            this.$confirm("确认导出模板？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    import("../../../../src/common/js/Export2Excel").then(
                        excel => {
                            const tHeader = [
                                "名称",
                                "编号",
                                "类型",
                                "型号",
                                "生产厂家",
                                "使用车间",
                                "生产日期",
                                "出厂日期",
                                "使用年限",
                                "安装日期",
                                "运行日期",
                                "责任人",
                                "设备状态",
                                "所属站位",
                                "技术参数",
                                "设备规格",
                                "是否固定",
                                "所属产线",
                                "设备效率",
                                "备注"
                            ];
                            const filterVal = [];
                            this.listLoading = true;

                            const list = this.add;
                            const data = this.formatJson(filterVal, list);
                            var date = new Date();
                            var seperator1 = "-";
                            var year = date.getFullYear();
                            var month = date.getMonth() + 1;
                            var strDate = date.getDate();
                            if (month >= 1 && month <= 9) {
                                month = "0" + month;
                            }
                            if (strDate >= 0 && strDate <= 9) {
                                strDate = "0" + strDate;
                            }
                            var currentdate =
                                year +
                                seperator1 +
                                month +
                                seperator1 +
                                strDate;
                            console.log(currentdate);
                            excel.export_json_to_excel({
                                header: tHeader,
                                data,
                                filename: this.filename,
                                autoWidth: this.autoWidth,
                                bookType: this.bookType
                            });

                            setTimeout(() => {
                                this.listLoading = false;
                            }, 1.5 * 1000);
                        }
                    );
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        // 用户数据转成Json格式
        formatJson(filterVal, jsonData) {
            console.info(jsonData);
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === "timestamp") {
                        // console.log('1')
                        // return parseTime(v[j]);
                    } else {
                        return v[j];
                    }
                })
            );
        },

        //导入
        Import() {
            this.ExportFeame = true;
            this.index_text = "";
        },
        //转换FormData
        change() {
            this.formData = new window.FormData(); // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
            this.formData.append(
                "filename",
                document.querySelector("input[type=file]").files[0]
            );
            this.index_text = document.querySelector(
                "input[type=file]"
            ).files[0].name;
            this.$refs.clear.value = "";
        },
        //导入保存ExportSave
        OnImportSave() {
            var options = {
                // 设置axios的参数
                url: BasicData.GET_D_Import,
                data: this.formData,
                method: "post",
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }; //'userfile'是formData这个对象的键名
            if (this.index_text != "") {
                this.axios(options).then(res => {
                    if (res.data.success === true) {
                        this.$message({
                            //成功后的提示
                            message: res.data.message,
                            type: "success",
                            duration: 1500
                        });
                        this.ExportFeame = false;
                        this.OnQuery();
                    } else if (res.data.success === false) {
                        this.$message({
                            //失败后的提示
                            message: res.data.message,
                            type: "error",
                            duration: 1500
                        });
                        this.ExportFeame = false;
                    }
                }); // 发送请求
            } else {
                this.$message({
                    //成功后的提示
                    message: "请选择文件",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //查看技术文档
        ViewDocument(index, row) {
            this.ViewID = row.facilityId;
            this.TechnicalDocumentation = true;
            this.OnAddArr();
        },
        //技术文档
        AddToDocument() {
            this.TechnicaltFeame = true;
            this.index_Technical = "";
        },
        //技术文档转换FormData AddToFormData
        AddToDocumentFormData() {
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
        //添加保存OnAddSave
        OnDocumentAddSave() {
            var options = {
                // 设置axios的参数
                url:
                    BasicData.GET_D_DocumentAddSave +
                    "?dataId=" +
                    this.ViewID +
                    "&category=FACILITY",
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
                        this.OnAddArr();
                    } else {
                        this.$message({
                            //失败后的提示
                            message: res.data.message,
                            type: "error",
                            duration: 1500
                        });
                        this.TechnicaltFeame = false;
                    }
                }); // 发送请求
            } else {
                this.$message({
                    //成功后的提示
                    message: "请选择文件",
                    type: "warning",
                    duration: 1500
                });
            }
        },

        //获取全部文件
        OnAddArr() {
            this.axios
                .get(
                    BasicData.GET_D_QueryFile +
                        "?dataId=" +
                        this.ViewID +
                        "&category=FACILITY"
                )
                .then(res => {
                    this.TechnicalOnAddArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        //删除文件
        OnDeleteFile(index, row) {
            this.$confirm("确认删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.axios
                        .get(
                            BasicData.GET_D_DeleteFile +
                                "?id=" +
                                row.id +
                                "&dataId=" +
                                this.ViewID +
                                "&category=FACILITY"
                        )
                        .then(res => {
                            if (res.data.success === true) {
                                this.$message({
                                    //成功后的提示
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });

                                this.OnAddArr();
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
        //查看文件
        SeeFile(index, row) {
            window.open(row.url);
        }
    }
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Equipment_head {
    height: 60px;
    overflow: hidden;
}
.Equipment_head_left {
    width: 230px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Equipment_head_left p {
    width: 60px;
    float: left;
    line-height: 36px;
}
.Equipment_head_left div {
    width: 170px;
    float: left;
}
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
.Equipment_head_bnt {
    /* float: right; */
    margin-top: 10px;
    margin-left: 10px;
}

.Equipment_operation {
    height: 50px;
    /* padding: 0px 10px;  */
}

.Equipment_operation_nei {
    width: 100%;
    height: 100%;
    /* background: #ccc; */
}

.Equipment_operation_bnt {
    margin-left: 10px;
}

.Equipment_contnet {
    width: 100%;
}
.Equipment_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.EquipmentNewlyAdded {
    height: 400px;
}

.EquipmentNewlyAddedBox {
    width: 300px;
    float: left;
}

.EquipmentNewlyAddedBox div {
    width: 170px;
    /* float: left; */
}

.EquipmentNewlyAddedBoxFixed {
    width: 140px;
    float: left;
}

.EquipmentNewlyAddedBoxFixed div {
    width: 30px;
    /* float: left; */
}

.EquipmentNewlyAddedBoxremarks {
    width: 500px;
    float: left;
}
.EquipmentNewlyAddedBoxremarks div {
    width: 420px;
    /* float: left; */
}

/* form表单之间的间距样式 */
.el-form-item {
    margin-bottom: 5px;
}
.EquipmentNewlyAdded_btn {
    height: 40px;
}
.EquipmentNewlyAdded_Close {
    float: right;
    margin-right: 10px;
}

.DetectPaging {
    /* width: 100%; */
    height: 50px;
    padding: 0px 10px;
    margin-top: 5px;
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