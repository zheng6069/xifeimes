<template>
    <div>
        <div class="SPB_head">
            <div class="SPB_head_left">
                <div>
                    <el-input v-model="QueryName" size="medium" placeholder="名称、型号、设备" clearable></el-input>
                </div>
            </div>
            <el-button
                @click="
          nowPages = 1;
          OnQuery();
        "
                size="medium"
                type="primary"
                class="SPB_head_bnt"
            >查询</el-button>
        </div>

        <div class="SPB_operation">
            <el-button size="medium" type="primary" f @click="spAdd" class="SPB_operation_bnt">新增</el-button>

            <el-button @click="spSee" size="medium" type="primary" class="SPB_operation_bnt">查看</el-button>
        </div>

        <div class="SPB_contnet" :style="TableHeight">
            <div class="SPB_contnet_table">
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
                    <el-table-column prop="spareName" label="备件名称"></el-table-column>
                    <el-table-column prop="spareType" label="备件类型"></el-table-column>
                    <el-table-column prop="spareModel" label="规格型号"></el-table-column>
                    <el-table-column prop="applyEquipment" label="适用设备"></el-table-column>
                    <el-table-column label="备注" :show-overflow-tooltip="true">
                        <template slot-scope="{ row }">
                            <span>{{ row.remarks }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="spEdit(scope.row)" size="mini">修改</el-button>
                            <el-button
                                type="primary"
                                size="mini"
                                @click="ViewDocument(scope.row)"
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

        <el-dialog :visible.sync="spVisible" width="70%">
            <div class="AdvanElasticFrame_top">
                <el-form :model="ruleForm" ref="ruleForm" label-width="120px" size="medium">
                    <el-form-item label="备件名称" class="AdvanTesting">
                        <el-input
                            :disabled="Disable"
                            v-model="ruleForm.name"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="备件类型" class="AdvanTesting">
                        <el-select v-model="ruleForm.type" :disabled="Disable" placeholder="请选择">
                            <el-option label="通用件" value="通用件"></el-option>
                            <el-option label="专用件" value="专用件"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规格型号" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.model"
                            :disabled="Disable"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="生产厂家" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.Manufacturer"
                            :disabled="Disable"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="适用设备" class="AdvanTesting">
                        <el-input
                            v-model="ruleForm.macbook"
                            :disabled="Disable"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="数量"
                        prop="number"
                        :rules="[
              { required: true, message: '数量不能为空' },
              { type: 'number', message: '数量必须为数字值' },
            ]"
                        class="AdvanTesting"
                    >
                        <el-input
                            v-model.number="ruleForm.number"
                            :disabled="Disable"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="站位名称" class="AdvanTesting">
                        <el-select
                            :disabled="Disable"
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
                    <el-form-item label="库位" class="AdvanTesting">
                        <el-select
                            v-model="ruleForm.Location"
                            :disabled="Disable"
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
                    <el-form-item label="备注" class="Advan">
                        <el-input
                            v-model="ruleForm.remarks"
                            :disabled="Disable"
                            type="textarea"
                            placeholder="请输入"
                            clearable
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button v-show="isShow" @click="spVisible = false">取 消</el-button>
                <el-button type="primary" v-show="isShow" @click="addSave('ruleForm')">确 定</el-button>
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
            QueryName: "", //查询
            QueryArr: [], //列表数据
            ruleForm: {
                name: "", // 备件名称
                type: "", // 备件类型
                model: "", //规格型号
                Manufacturer: "", //生产厂商
                macbook: "", //适用设备
                number: "", //数量
                station: "", //站位
                Location: "", //库位
                remarks: "" //备注
            },
            spVisible: false,
            rowId: "",
            Disable: false,
            isShow: false,

            DocumentPath: "", //文档路径

            ElasticFrame: false, //是否隐藏弹框
            TechnicaltFeame: false, //技术文档
            TechnicalDocumentation: false, //技术文档查看弹框,
            DeleteArr: [], //储存勾选到的新的数组
            WorkClothesID: "", //勾选id
            TableHeight: {
                height: ""
            },
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数

            formData: "", // 导入文件
            index_text: "",
            Loading: false,

            formData_Technical: "", // 导入技术文档
            index_Technical: "",
            ViewID: "", //获取当前信息id

            TechnicalOnAddArr: [],
            MOArr: [],
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
            this.axios
                .post(BasicData.GET_Q_findAll, {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //第几页
                    condetion: this.QueryName //名称
                })
                .then(res => {
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
        // 新增
        spAdd() {
            this.spVisible = true;
            this.Disable = false;
            this.isShow = true;
            this.getoptionsFourInfo();
            this.ruleForm.name = "";
            this.ruleForm.type = "";
            this.ruleForm.model = "";
            this.ruleForm.Manufacturer = "";
            this.ruleForm.macbook = "";
            this.ruleForm.number = "";
            this.ruleForm.station = "";
            this.ruleForm.Location = "";
            this.ruleForm.remarks = "";
        },
        addSave(ruleForm) {
            let that = this;
            this.$refs[ruleForm].validate(valid => {
                if (valid) {
                    if (!this.rowId) {
                        // 新增
                        that.axios
                            .post(BasicData.GET_Q_addSpare, {
                                spareName: that.ruleForm.name,
                                spareType: that.ruleForm.type,
                                spareModel: that.ruleForm.model,
                                productUnit: that.ruleForm.Manufacturer,
                                applyEquipment: that.ruleForm.macbook,
                                spareNum: that.ruleForm.number,
                                wareHose: that.ruleForm.station,
                                locationName: that.ruleForm.Location,
                                remarks: that.ruleForm.remarks
                            })
                            .then(res => {
                                if (res.data.success == true) {
                                    that.$message({
                                        showClose: true,
                                        message: res.data.message,
                                        type: "success"
                                    });
                                    this.$refs[ruleForm].resetFields();
                                    that.spVisible = false;
                                    that.OnQuery();
                                } else {
                                    that.$message({
                                        showClose: true,
                                        message: res.data.message,
                                        type: "error"
                                    });
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    } else {
                        // 修改
                        that.axios
                            .post(BasicData.GET_Q_updateSpare, {
                                sparePartId: that.rowId,
                                spareName: that.ruleForm.name,
                                spareType: that.ruleForm.type,
                                spareModel: that.ruleForm.model,
                                productUnit: that.ruleForm.Manufacturer,
                                applyEquipment: that.ruleForm.macbook,
                                spareNum: that.ruleForm.number,
                                wareHose: that.ruleForm.station,
                                locationName: that.ruleForm.Location,
                                remarks: that.ruleForm.remarks
                            })
                            .then(res => {
                                if (res.data.success == true) {
                                    that.$message({
                                        showClose: true,
                                        message: res.data.message,
                                        type: "success"
                                    });
                                    this.$refs[ruleForm].resetFields();
                                    that.spVisible = false;
                                    that.OnQuery();
                                } else {
                                    that.$message({
                                        showClose: true,
                                        message: res.data.message,
                                        type: "error"
                                    });
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 修改
        spEdit(row) {
            this.spVisible = true;
            this.Disable = false;
            this.isShow = true;
            this.getoptionsFourInfo();
            this.rowId = row.sparePartId;
            this.ruleForm.name = row.spareName;
            this.ruleForm.type = row.spareType;
            this.ruleForm.model = row.spareModel;
            this.ruleForm.Manufacturer = row.productUnit;
            this.ruleForm.macbook = row.applyEquipment;
            this.ruleForm.number = row.spareNum;
            this.ruleForm.station = row.wareHose;
            this.ruleForm.Location = row.locationName;
            this.ruleForm.remarks = row.remarks;
        },
        // 查看
        spSee() {
            if (this.DeleteArr < 1) {
                this.$message({
                    message: "请选择一条数据",
                    type: "warning"
                });
            } else {
                this.spVisible = true;
                this.Disable = true;
                this.isShow = false;
                this.getoptionsFourInfo();
                this.ruleForm.name = this.DeleteArr.spareName;
                this.ruleForm.type = this.DeleteArr.spareType;
                this.ruleForm.model = this.DeleteArr.spareModel;
                this.ruleForm.Manufacturer = this.DeleteArr.productUnit;
                this.ruleForm.macbook = this.DeleteArr.applyEquipment;
                this.ruleForm.number = this.DeleteArr.spareNum;
                this.ruleForm.station = this.DeleteArr.wareHose;
                this.ruleForm.Location = this.DeleteArr.locationName;
                this.ruleForm.remarks = this.DeleteArr.remarks;
            }
        },
        //查看文档
        ViewDocument(row) {
            this.ViewID = row.sparePartId;
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
                    "&category=SPARE",
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
                });
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
                        "&category=SPARE"
                )
                .then(res => {
                    this.TechnicalOnAddArr = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //查看文件
        SeeFile(row) {
            window.open(row.url);
        },
        //删除文件
        OnDeleteFile(row) {
            console.log(row, "sdfsdfsdf");
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
                                "&category=SPARE"
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
        }
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
.SPB_head {
    height: 60px;
    overflow: hidden;
}
.SPB_head_left {
    width: 200px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}

.SPB_head_left div {
    width: 200px;
    float: left;
}
.SPB_head_bnt {
    margin-top: 10px;
    margin-left: 10px;
}

.SPB_operation {
    height: 50px;
}

.SPB_operation_nei {
    width: 100%;
    height: 100%;
}

.SPB_operation_bnt {
    margin-left: 10px;
}

.SPB_contnet {
    width: 100%;
}
.SPB_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

.AdvanElasticFrame_top {
    overflow: hidden;
}

.AdvanTesting {
    width: 290px;
    height: 40px;
    /* overflow: hidden; */
    float: left;
    margin-left: 10px;
}
.AdvanTesting div {
    width: 170px;
}
.Advan {
    width: 600px;
    height: 40px;
    float: left;
    margin-left: 10px;
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
