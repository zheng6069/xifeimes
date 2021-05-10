<template>
    <div>
        <div class="Tooling_head">
            <div class="Tooling_head_left">
                <p>名称</p>
                <div>
                    <el-input v-model="QueryName" size="medium" placeholder="请输入" clearable></el-input>
                </div>
            </div>
            <el-button
                @click="
          nowPages = 1;
          OnQuery();
        "
                size="medium"
                type="primary"
                class="Tooling_head_bnt"
            >查询</el-button>
        </div>

        <div class="Tooling_operation">
            <el-button
                size="medium"
                type="primary"
                @click="NewlyAdded"
                class="Tooling_operation_bnt"
            >新增</el-button>
            <el-button
                @click="OnModify"
                size="medium"
                type="primary"
                class="Tooling_operation_bnt"
            >修改</el-button>
            <el-button @click="Import" size="medium" type="primary" class="Tooling_operation_bnt">导入</el-button>
            <el-button
                @click="Export"
                size="medium"
                type="primary"
                class="Tooling_operation_bnt"
            >导出模板</el-button>
            <el-button @click="OnSee" size="medium" type="primary" class="Tooling_operation_bnt">查看</el-button>
        </div>

        <div class="Tooling_contnet" :style="TableHeight">
            <div class="Tooling_contnet_table">
                <el-table
                    ref="multipleTable"
                    @selection-change="Tick"
                    border
                    :data="QueryArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="product" label="图号"></el-table-column>
                    <el-table-column prop="dataNumber" label="编号"></el-table-column>
                    <el-table-column prop="project" label="项目"></el-table-column>
                    <el-table-column prop="species" label="种类" width="120"></el-table-column>
                    <el-table-column prop="status" label="状态" width="80"></el-table-column>
                    <el-table-column prop="station" label="站位" width="180"></el-table-column>
                    <el-table-column prop="responsible" label="负责人" width="80"></el-table-column>
                    <el-table-column prop="expirationDate" label="有效期至" width="100"></el-table-column>
                    <el-table-column prop="expirationCount" label="有效使用次数" width="110"></el-table-column>
                    <el-table-column prop="useCount" label="已使用次数" width="100"></el-table-column>
                    <el-table-column label="备注" width="180" :show-overflow-tooltip="true">
                        <template slot-scope="{ row }">
                            <span>{{ row.remarks }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="105">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
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
                :page-size="pageSize"
                @current-change="OnPaging"
                :current-page="nowPages"
                :page-sizes="[10, 50, 100, 200]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
        <!-- -------新增----------- -->
        <el-dialog :visible.sync="ElasticFrame" width="70%">
            <div class="ToolingNewlyAdded">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="种类" prop="type" class="ToolingNewlyAddedBox">
                        <el-select
                            :disabled="Disable"
                            size="medium"
                            v-model="ruleForm.type"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionOne"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="名称" prop="name" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.name"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="图号" prop="DrawingNo" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.DrawingNo"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="编号" prop="code" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.code"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="项目" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.project"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="规格" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.Brand"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="状态" class="ToolingNewlyAddedBox">
                        <el-select
                            :disabled="Disable"
                            size="medium"
                            v-model="ruleForm.state"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionsTwo"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数量" prop="number" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model.number="ruleForm.number"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="启用日期" class="ToolingNewlyAddedBox">
                        <el-date-picker
                            :disabled="Disable"
                            size="medium"
                            type="date"
                            style="width: 100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.OpeningDate"
                        ></el-date-picker>
                    </el-form-item>

                    <el-form-item label="生产厂商" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.Manufacturer"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="有效期至" prop="TermOfValidity" class="ToolingNewlyAddedBox">
                        <el-date-picker
                            :disabled="Disable"
                            size="medium"
                            type="date"
                            style="width: 100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.TermOfValidity"
                        ></el-date-picker>
                    </el-form-item>

                    <el-form-item label="占用空间" prop="OccupiedSpace" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.OccupiedSpace"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="所属产线" prop="ProductionLine" class="ToolingNewlyAddedBox">
                        <el-select
                            :disabled="Disable"
                            size="medium"
                            v-model="ruleForm.ProductionLine"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionsThree"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="已使用次数" prop="UsedTimes" class="ToolingNewlyAddedBox">
                        <el-input
                            clearable
                            :disabled="Disable"
                            v-model.number="ruleForm.UsedTimes"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="有效使用次数"
                        prop="EffectiveUseTimes"
                        class="ToolingNewlyAddedBox"
                    >
                        <el-input
                            :disabled="Disable"
                            clearable
                            v-model.number="ruleForm.EffectiveUseTimes"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="设备是否固定" class="ToolingNewlyAddedBox">
                        <el-checkbox
                            :disabled="Disable"
                            v-model="ruleForm.IsTheEquipmentFixed"
                            name="type"
                        ></el-checkbox>
                    </el-form-item>
                    <el-form-item label="站位名称" class="ToolingNewlyAddedBox">
                        <el-select
                            :disabled="Disable"
                            size="medium"
                            v-model="ruleForm.station"
                            placeholder="请选择"
                            @change="AddCouponSelected($event)"
                            clearable
                        >
                            <el-option
                                v-for="item in optionsFour"
                                :key="item.warehouseId"
                                :label="item.warehouseName"
                                :value="item.warehouseName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="库位" class="ToolingNewlyAddedBox">
                        <el-select
                            :disabled="Disable"
                            size="medium"
                            v-model="ruleForm.Location"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionsFive"
                                :key="item.locationId"
                                :label="item.locationName"
                                :value="item.locationName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="负责人" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.responsible"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="备注" class="ToolingNewlyAddedremarks">
                        <el-input
                            :disabled="Disable"
                            style="width: 80%"
                            v-model="ruleForm.remarks"
                            type="textarea"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="ToolingNewlyAdded_btn">
                <el-button
                    v-show="isShow"
                    class="ToolingNewlyAdded_Close"
                    @click="submitForm('ruleForm')"
                    type="primary"
                >确 定</el-button>
                <el-button class="ToolingNewlyAdded_Close" @click="Close">取 消</el-button>
            </div>
        </el-dialog>

        <!-- ---------修改----------- -->
        <el-dialog :visible.sync="ModifyFrame" width="70%">
            <div class="ToolingNewlyAdded">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-form-item label="种类" prop="type" class="ToolingNewlyAddedBox">
                        <el-select
                            :disabled="Disable"
                            size="medium"
                            v-model="ruleForm.type"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionOne"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="名称" prop="name" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.name"
                            prop="name"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="图号" prop="DrawingNo" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.DrawingNo"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="编号" prop="code" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.code"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="项目" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.project"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="规格" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.Brand"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="状态" class="ToolingNewlyAddedBox">
                        <el-select
                            :disabled="Disable"
                            size="medium"
                            v-model="ruleForm.state"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionsTwo"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数量" prop="number" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model.number="ruleForm.number"
                            size="medium"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="启用日期" class="ToolingNewlyAddedBox">
                        <el-date-picker
                            :disabled="Disable"
                            size="medium"
                            type="date"
                            style="width: 100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.OpeningDate"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="生产厂商" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.Manufacturer"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="有效期至" prop="TermOfValidity" class="ToolingNewlyAddedBox">
                        <el-date-picker
                            :disabled="Disable"
                            size="medium"
                            type="date"
                            style="width: 100%"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            v-model="ruleForm.TermOfValidity"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="占用空间" prop="OccupiedSpace" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.OccupiedSpace"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="所属产线" prop="ProductionLine" class="ToolingNewlyAddedBox">
                        <el-select
                            :disabled="Disable"
                            size="medium"
                            v-model="ruleForm.ProductionLine"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionsThree"
                                :key="item.maintainId"
                                :label="item.maintainStatus"
                                :value="item.maintainStatus"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="已使用次数" prop="UsedTimes" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model.number="ruleForm.UsedTimes"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="有效使用次数"
                        prop="EffectiveUseTimes"
                        class="ToolingNewlyAddedBox"
                    >
                        <el-input
                            :disabled="Disable"
                            v-model.number="ruleForm.EffectiveUseTimes"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="设备是否固定" class="ToolingNewlyAddedBox">
                        <el-checkbox
                            :disabled="Disable"
                            v-model="ruleForm.IsTheEquipmentFixed"
                            name="IsTheEquipmentFixed"
                        ></el-checkbox>
                    </el-form-item>

                    <el-form-item label="站位名称" class="ToolingNewlyAddedBox">
                        <el-select
                            :disabled="Disable"
                            size="medium"
                            v-model="ruleForm.station"
                            placeholder="请选择"
                            @change="AddCouponSelected($event)"
                            clearable
                        >
                            <el-option
                                v-for="item in optionsFour"
                                :key="item.warehouseId"
                                :label="item.warehouseName"
                                :value="item.warehouseName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="库位" class="ToolingNewlyAddedBox">
                        <el-select
                            :disabled="Disable"
                            size="medium"
                            v-model="ruleForm.Location"
                            placeholder="请选择"
                            clearable
                        >
                            <el-option
                                v-for="item in optionsFive"
                                :key="item.locationId"
                                :label="item.locationName"
                                :value="item.locationName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="负责人" class="ToolingNewlyAddedBox">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.responsible"
                            size="medium"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="备注" class="ToolingNewlyAddedremarks">
                        <el-input
                            :disabled="Disable"
                            style="width: 80%"
                            v-model="ruleForm.remarks"
                            type="textarea"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="ToolingNewlyAdded_btn">
                <el-button
                    class="ToolingNewlyAdded_Close"
                    @click="OnModifyAndSave('ruleForm')"
                    type="primary"
                >确 定</el-button>
                <el-button class="ToolingNewlyAdded_Close" @click="Close">取 消</el-button>
            </div>
        </el-dialog>
        <!----------- 导入 ------------->
        <el-dialog :visible.sync="ExportFeame" width="50%">
            <div class="ExportStyle">
                <input v-model="index_text" type="text" class="text" />
                <input type="file" class="file" @change="change" ref="clear" />
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
                    @click="OnImportSave"
                >保 存</el-button>
            </div>
        </el-dialog>

        <!----------- 技术文档弹框 ------------->
        <el-dialog :visible.sync="TechnicalDocumentation" width="70%">
            <div style="height: 50px">
                <el-button class="dialog_Close" type="primary" @click="AddTo">新增</el-button>
            </div>
            <div style="height: 300px">
                <el-table
                    ref="multipleTable"
                    border
                    :data="TechnicalOnAddArr"
                    height="100%"
                    style="width: 100%; height: 100%"
                >
                    <el-table-column prop="name" label="文档名称"></el-table-column>
                    <el-table-column prop="url" label="路径"></el-table-column>
                    <el-table-column label="操作" width="175">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="mini"
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
import { BasicData } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            QueryName: "", //查询名称
            QueryArr: [], //展示查询列表数据
            ruleForm: {
                //新增表单
                type: "", //种类
                name: "", //名称
                DrawingNo: "", //图号
                project: "", //项目
                Brand: "", //规格
                state: "", //状态
                code: "", //编号
                OpeningDate: "", //启用日期
                Manufacturer: "", //生产厂商
                TermOfValidity: "", //有效期至
                Warehouse: "", //仓库
                Location: "", //库位
                OccupiedSpace: "", //占用空间
                ProductionLine: "", //所属产线
                UsedTimes: "", //已使用次数
                IsTheEquipmentFixed: [], //设备是否固定
                number: "", //数量
                EffectiveUseTimes: "", //有效使用次数
                station: "", //站位
                responsible: "", //负责人
                remarks: "" //备注
            },
            DocumentPath: "", //文档路径
            Disable: false,
            isShow: false, // 隐藏
            ElasticFrame: false, //是否隐藏弹框
            ModifyFrame: false, //修改弹框
            ExportFeame: false, //导出弹框
            TechnicaltFeame: false, //技术文档
            TechnicalDocumentation: false, //技术文档查看弹框,
            DeleteArr: [], //储存勾选到的新的数组
            WorkClothesID: "", //勾选id
            rules: {
                //验证
                type: [
                    //种类
                    { required: true, message: "请输入种类", trigger: "change" }
                ],
                name: [
                    //名称
                    { required: true, message: "请输入名称", trigger: "blur" }
                ],
                DrawingNo: [
                    //图号
                    { required: true, message: "请输入图号", trigger: "blur" }
                ],
                code: [
                    //编号
                    { required: true, message: "请输入编号", trigger: "blur" }
                ],
                number: [
                    //数量
                    { required: true, message: "请输入数量" },
                    { type: "number", message: "数量为数字" }
                ],
                UsedTimes: [
                    //已使用次数
                    { required: true, message: "请输入使用次数" },
                    { type: "number", message: "使用次数为数字" }
                ],
                EffectiveUseTimes: [
                    //有效使用次数
                    { required: true, message: "请输入有效使用次数" },
                    { type: "number", message: "有效使用次数为数字" }
                ],
                TermOfValidity: [
                    //有效期至
                    {
                        required: true,
                        message: "请输入有效期至",
                        trigger: "blur"
                    }
                ],
                OccupiedSpace: [
                    //占用空间
                    {
                        required: true,
                        message: "请输入占用空间",
                        trigger: "blur"
                    }
                ],
                ProductionLine: [
                    //所属产线
                    {
                        required: true,
                        message: "请输入所属产线",
                        trigger: "change"
                    }
                ]
            },
            TableHeight: {
                height: ""
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数

            filename: "工装信息导出模板", //导出文件名称
            formData: "", // 导入文件
            index_text: "",
            Loading: false,

            formData_Technical: "", // 导入技术文档
            index_Technical: "",
            ViewID: "", //获取当前信息id

            TechnicalOnAddArr: [],
            MOArr: [],
            optionOne: [], // 工装种类
            optionsTwo: [], // 工装状态
            optionsThree: [], // 工装所属产线
            optionsFour: [], // 站位名称
            optionsFive: [], // 库位
            warehouseIdAdd: ""
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
        // 查询工装种类
        getOptionOneInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 5
                    }
                })
                .then(res => {
                    that.optionOne = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询工装状态
        getOptionsTwoInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 2
                    }
                })
                .then(res => {
                    that.optionsTwo = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询工装所属产线
        getOptionsThreeInfo() {
            let that = this;
            that.axios
                .get(BasicData.GET_V_findAllByFlag, {
                    params: {
                        maintainFlag: 4
                    }
                })
                .then(res => {
                    that.optionsThree = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 查询站位名称
        getoptionsFourInfo() {
            let that = this;
            that.axios
                .post(BasicData.GET_Z_findAllWarehouse)
                .then(res => {
                    let arry = res.data;
                    arry.push({ warehouseName: "公用" });
                    that.optionsFour = arry;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        AddCouponSelected(val) {
            let objAdd = {};
            objAdd = this.optionsFour.find(item => {
                return item.warehouseName === val; //筛选出匹配数据
            });
            this.warehouseIdAdd = objAdd.warehouseId;
            this.ruleForm.Location = ""; //库位
            this.axios
                .get(BasicData.GET_Z_findAllLocation, {
                    params: {
                        warehouseId: this.warehouseIdAdd
                    }
                })
                .then(res => {
                    this.optionsFive = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查询列表展示
        OnQuery() {
            this.axios({
                method: "post",
                url: BasicData.GET_A_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    condetion: this.QueryName //名称
                }
            })
                .then(res => {
                    this.QueryArr = res.data.list;
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
        OnPaging(val) {
            this.nowPages = val;
            this.OnQuery();
        },
        //新增弹框
        NewlyAdded() {
            this.ElasticFrame = true;
            this.Disable = false;
            this.isShow = true;
            this.getOptionOneInfo(); // 查询工装种类
            this.getOptionsTwoInfo(); // 查询工装状态
            this.getOptionsThreeInfo(); // 查询工装所属产线
            this.getoptionsFourInfo(); // 查询站位名称
            this.ruleForm.type = ""; //种类
            this.ruleForm.name = ""; //名称
            this.ruleForm.DrawingNo = ""; //图号
            this.ruleForm.project = ""; //项目
            this.ruleForm.Brand = ""; //规格
            this.ruleForm.state = ""; //状态
            this.ruleForm.code = ""; //编号
            this.ruleForm.OpeningDate = ""; //启用日期
            this.ruleForm.Manufacturer = ""; //生产厂商
            this.ruleForm.TermOfValidity = ""; //有效期至
            this.ruleForm.Warehouse = ""; //仓库
            this.ruleForm.Location = ""; //库位
            this.ruleForm.OccupiedSpace = ""; //占用空间
            this.ruleForm.ProductionLine = ""; //所属产线
            this.ruleForm.UsedTimes = ""; //已使用次数
            this.ruleForm.IsTheEquipmentFixed = ""; //设备是否固定
            this.ruleForm.number = ""; //数量
            this.ruleForm.EffectiveUseTimes = ""; //有效使用次数
            this.ruleForm.remarks = ""; //备注
        },
        //新增保存
        submitForm(formName) {
            if (this.ruleForm.IsTheEquipmentFixed != false) {
                this.ruleForm.IsTheEquipmentFixed = 1;
            } else {
                this.ruleForm.IsTheEquipmentFixed = 0;
            }
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios({
                        method: "post",
                        url: BasicData.GET_A_AddAndSave,
                        data: {
                            species: this.ruleForm.type, //种类
                            name: this.ruleForm.name, //名称
                            product: this.ruleForm.DrawingNo, //图号
                            project: this.ruleForm.project, //项目
                            specifications: this.ruleForm.Brand, //规格
                            status: this.ruleForm.state, //状态
                            dataNumber: this.ruleForm.code, //编号
                            startDate: this.ruleForm.OpeningDate, //启用日期
                            manufacturer: this.ruleForm.Manufacturer, //生产厂商
                            expirationDate: this.ruleForm.TermOfValidity, //有效期至
                            warehouse: this.ruleForm.Warehouse, //仓库
                            position: this.ruleForm.Location, //库位
                            dataSize: this.ruleForm.OccupiedSpace, //占用空间
                            productionLine: this.ruleForm.ProductionLine, //所属产线
                            useCount: this.ruleForm.UsedTimes, //已使用次数
                            isfixed: this.ruleForm.IsTheEquipmentFixed, //设备是否固定
                            qty: this.ruleForm.number, //数量
                            expirationCount: this.ruleForm.EffectiveUseTimes, //有效使用次数
                            station: this.ruleForm.station, //站位
                            responsible: this.ruleForm.responsible, //负责人
                            remarks: this.ruleForm.remarks //备注
                        } //种类
                    })
                        .then(res => {
                            if (res.data.success == true) {
                                this.$message({
                                    //成功后的提示
                                    message: res.data.message,
                                    type: "success",
                                    duration: 1500
                                });
                                this.OnQuery();
                                this.ElasticFrame = false;
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
        //关闭弹框
        Close() {
            this.ElasticFrame = false;
            this.ModifyFrame = false;
        },
        //查看
        OnSee() {
            this.Disable = true;
            this.isShow = false;
            if (this.WorkClothesID != "" && this.DeleteArr != undefined) {
                this.ElasticFrame = true;
                this.axios
                    .get(BasicData.GET_A_See, {
                        params: {
                            dataId: this.WorkClothesID
                        }
                    })
                    .then(res => {
                        if (res.data.isfixed != 0) {
                            this.ruleForm.IsTheEquipmentFixed = true; //设备是否固定
                        } else {
                            this.ruleForm.IsTheEquipmentFixed = false;
                        }
                        this.ruleForm.type = res.data.species; //种类
                        this.ruleForm.name = res.data.name; //名称
                        this.ruleForm.DrawingNo = res.data.product; //图号
                        this.ruleForm.project = res.data.project; //项目
                        this.ruleForm.Brand = res.data.specifications; //规格
                        this.ruleForm.state = res.data.status; //状态
                        this.ruleForm.code = res.data.dataNumber; //编号
                        this.ruleForm.OpeningDate = res.data.startDate; //启用日期
                        this.ruleForm.Manufacturer = res.data.manufacturer; //生产厂商
                        this.ruleForm.TermOfValidity = res.data.expirationDate; //有效期至
                        this.ruleForm.Warehouse = res.data.warehouse; //仓库
                        this.ruleForm.Location = res.data.position; //库位
                        this.ruleForm.OccupiedSpace = res.data.dataSize; //占用空间
                        this.ruleForm.ProductionLine = res.data.productionLine; //所属产线
                        this.ruleForm.UsedTimes = res.data.useCount; //已使用次数
                        this.ruleForm.number = res.data.qty; //数量
                        this.ruleForm.EffectiveUseTimes =
                            res.data.expirationCount; //有效使用次数
                        this.ruleForm.station = res.data.station; //站位
                        this.ruleForm.responsible = res.data.responsible; //负责人
                        this.ruleForm.remarks = res.data.remarks; //备注
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                this.$message({
                    //失败后的提示
                    message: "请选择一条数据",
                    type: "warning",
                    duration: 1500
                });
            }
        },
        //勾选
        Tick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.DeleteArr = row.pop(); //储存新的单选数据
                if (this.DeleteArr != undefined) {
                    this.WorkClothesID = this.DeleteArr.dataId;
                }
            }
        },
        //修改
        OnModify() {
            if (this.WorkClothesID != "" && this.DeleteArr != undefined) {
                this.Disable = false;
                this.ModifyFrame = true;
                if (this.DeleteArr.isfixed != 0) {
                    this.ruleForm.IsTheEquipmentFixed = true; //设备是否固定
                } else {
                    this.ruleForm.IsTheEquipmentFixed = false;
                }
                this.getOptionOneInfo(); // 查询工装种类
                this.getOptionsTwoInfo(); // 查询工装状态
                this.getOptionsThreeInfo(); // 查询工装所属产线
                this.getoptionsFourInfo(); // 查询站位名称
                this.ruleForm.type = this.DeleteArr.species; //种类
                this.ruleForm.name = this.DeleteArr.name; //名称
                this.ruleForm.DrawingNo = this.DeleteArr.product; //图号
                this.ruleForm.project = this.DeleteArr.project; //项目
                this.ruleForm.Brand = this.DeleteArr.specifications; //规格
                this.ruleForm.state = this.DeleteArr.status; //状态
                this.ruleForm.code = this.DeleteArr.dataNumber; //编号
                this.ruleForm.OpeningDate = this.DeleteArr.startDate; //启用日期
                this.ruleForm.Manufacturer = this.DeleteArr.manufacturer; //生产厂商
                this.ruleForm.TermOfValidity = this.DeleteArr.expirationDate; //有效期至
                this.ruleForm.Warehouse = this.DeleteArr.warehouse; //仓库
                this.ruleForm.Location = this.DeleteArr.position; //库位
                this.ruleForm.OccupiedSpace = this.DeleteArr.dataSize; //占用空间
                this.ruleForm.ProductionLine = this.DeleteArr.productionLine; //所属产线
                this.ruleForm.UsedTimes = this.DeleteArr.useCount; //已使用次数
                this.ruleForm.number = this.DeleteArr.qty; //数量
                this.ruleForm.EffectiveUseTimes = this.DeleteArr.expirationCount; //有效使用次数
                this.ruleForm.station = this.DeleteArr.station; //站位
                this.ruleForm.responsible = this.DeleteArr.responsible; //负责人
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
            if (this.ruleForm.IsTheEquipmentFixed != false) {
                this.ruleForm.IsTheEquipmentFixed = 1;
            } else {
                this.ruleForm.IsTheEquipmentFixed = 0;
            }
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios({
                        method: "post",
                        url: BasicData.GET_A_Modify,
                        data: {
                            dataId: this.WorkClothesID, //id
                            species: this.ruleForm.type, //种类
                            name: this.ruleForm.name, //名称
                            product: this.ruleForm.DrawingNo, //图号
                            project: this.ruleForm.project, //项目
                            specifications: this.ruleForm.Brand, //规格
                            status: this.ruleForm.state, //状态
                            dataNumber: this.ruleForm.code, //编号
                            startDate: this.ruleForm.OpeningDate, //启用日期
                            manufacturer: this.ruleForm.Manufacturer, //生产厂商
                            expirationDate: this.ruleForm.TermOfValidity, //有效期至
                            warehouse: this.ruleForm.Warehouse, //仓库
                            position: this.ruleForm.Location, //库位
                            dataSize: this.ruleForm.OccupiedSpace, //占用空间
                            productionLine: this.ruleForm.ProductionLine, //所属产线
                            // filfNamf: this.ruleForm.TechnicalDocumentation, //技术文档
                            useCount: this.ruleForm.UsedTimes, //已使用次数
                            isfixed: this.ruleForm.IsTheEquipmentFixed, //设备是否固定
                            qty: this.ruleForm.number, //数量
                            expirationCount: this.ruleForm.EffectiveUseTimes, //有效使用次数
                            station: this.ruleForm.station, //站位
                            responsible: this.ruleForm.responsible, //负责人
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
                                this.OnQuery();
                                this.ModifyFrame = false;
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
        //导入弹出框
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
        //导出保存ExportSave
        OnImportSave() {
            var options = {
                // 设置axios的参数
                url: BasicData.GET_A_Import,
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
                    // type: "success",
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
                                "种类",
                                "名称",
                                "图号",
                                "编号",
                                "项目",
                                "规格",
                                "状态(使用中,报废,维修)",
                                "库位",
                                "数量",
                                "启用日期",
                                "生产厂商",
                                "有效期至",
                                "占用空间",
                                "所属产线",
                                "已使用次数",
                                "是否固定(0:不固定,1:固定)",
                                "有效使用次数",
                                "备注",
                                "站位",
                                "负责人"
                            ];
                            const filterVal = [
                                "species",
                                "name",
                                "product",
                                "dataNumber",
                                "project",
                                "specifications",
                                "status",
                                "position",
                                "qty",
                                "startDate",
                                "manufacturer",
                                "expirationDate",
                                "dataSize",
                                "productionLine",
                                "userCount",
                                "isfixed",
                                "expirationCount",
                                "remarks",
                                "station",
                                "responsible"
                            ];
                            this.listLoading = true;

                            const list = this.MOArr;
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
                    } else {
                        return v[j];
                    }
                })
            );
        },
        //查看文档
        ViewDocument(index, row) {
            this.ViewID = row.dataId;
            this.TechnicalDocumentation = true;
            this.OnAddArr();
        },
        //技术文档
        AddTo() {
            this.TechnicaltFeame = true;
            this.index_Technical = "";
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
                    BasicData.GET_A_AddSave +
                    "?dataId=" +
                    this.ViewID +
                    "&category=BASIC",
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
                    BasicData.GET_A_AddArr +
                        "?dataId=" +
                        this.ViewID +
                        "&category=BASIC"
                )
                .then(res => {
                    this.TechnicalOnAddArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查看文件
        SeeFile(index, row) {
            window.open(row.url);
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
                            BasicData.GET_A_DeleteFile +
                                "?id=" +
                                row.id +
                                "&dataId=" +
                                row.dataId +
                                "&category=BASIC"
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
                                    message: res.data.message,
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
        }
    }
};
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}
/* 用来设置当前页面element全局table 选中某行时的背景色*/
/* .el-table__body tr.current-row>td{
    background-color: #ff784a !important;
     color: #fff;
  } */
.el-tooltip__popper {
    font-size: 14px;
    max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
.Tooling_head {
    height: 60px;
    overflow: hidden;
}
.Tooling_head_left {
    width: 230px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
.Tooling_head_left p {
    width: 60px;
    float: left;
    line-height: 36px;
}
.Tooling_head_left div {
    width: 170px;
    float: left;
}
.Tooling_head_bnt {
    margin-top: 10px;
    margin-left: 10px;
}

.Tooling_operation {
    height: 50px;
}

.Tooling_operation_nei {
    width: 100%;
    height: 100%;
}

.Tooling_operation_bnt {
    margin-left: 10px;
}

.Tooling_contnet {
    width: 100%;
}
.Tooling_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.ToolingNewlyAdded {
    height: 400px;
}

.ToolingNewlyAddedBox {
    width: 320px;
    float: left;
}
.ToolingNewlyAddedBox div {
    width: 170px;
}
.ToolingNewlyAddednNumber {
    width: 150px;
    float: left;
}
.ToolingNewlyAddednNumber div {
    width: 90px;
    float: left;
}

.ToolingNewlyAddednOpeningDater {
    width: 260px;
    float: left;
}
.ToolingNewlyAddednOpeningDater div {
    width: 170px;
    float: left;
}

.ToolingaddTor {
    width: 70px;
    float: left;
}
.ToolingaddTor div {
    width: 70px;
    float: left;
}
.ToolingNewlyAddedUsedTimes {
    width: 280px;
    float: left;
}
.ToolingNewlyAddedUsedTimes div {
    width: 170px;
    float: left;
}
.ToolingNewlyAddedFixed {
    width: 150px;
    float: left;
}
.ToolingNewlyAddedFixed div {
    width: 40px;
    float: left;
}
.ToolingNewlyAddedremarks {
    width: 560px;
    float: left;
}
.ToolingNewlyAddedremarks div {
    width: 615px;
}
/* form表单之间的间距样式 */
/* .el-form-item {
  margin-bottom: 5px;
} */
.ToolingNewlyAdded_btn {
    height: 40px;
}
.ToolingNewlyAdded_Close {
    float: right;
    margin-right: 10px;
}

.DetectPaging {
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
