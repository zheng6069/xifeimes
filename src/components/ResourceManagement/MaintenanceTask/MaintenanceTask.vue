<template>
    <div class="container">
        <div class="MtSearch">
            <el-form :inline="true" :model="MtSearchform" class="demo-form-inline" size="medium">
                <el-form-item label="设备名称" class="item">
                    <el-input v-model="MtSearchform.name" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="设备编号" class="item">
                    <el-input v-model="MtSearchform.number" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item label="维保类型" class="item">
                    <el-select v-model="MtSearchform.type" placeholder="请选择" clearable>
                        <el-option label="日保" value="日保"></el-option>
                        <el-option label="周保" value="周保"></el-option>
                        <el-option label="月保" value="月保"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="nowPages=1;OnQuery()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="Mt_contnet" :style="TableHeight">
            <!-- <div class="MtContent_title">
        <div class="Mt_info">
          <el-button size="medium" type="success" @click="maintain"
            >保养</el-button
          >
        </div>
            </div>-->
            <div class="Mt_contnet_table">
                <el-table
                    @selection-change="Tick"
                    ref="multipleTable"
                    border
                    :data="QueryArr"
                    height="100%"
                    style="width: 100%;height:100%;"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column type="index" label="序号" width="60"></el-table-column>
                    <el-table-column prop="facilityMainId" label="设备维保单号"></el-table-column>
                    <el-table-column prop="facilityNum" label="设备编号"></el-table-column>
                    <el-table-column prop="facilityName" label="设备名称"></el-table-column>
                    <el-table-column prop="facilityModel" label="设备类型"></el-table-column>
                    <el-table-column prop="station" label="设备位置"></el-table-column>
                    <el-table-column prop="mainType" label="维保类型"></el-table-column>
                    <el-table-column prop="mainTime" label="维保时间"></el-table-column>
                    <el-table-column label="操作" width="190">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="maintain(scope.row)">保养</el-button>
                            <el-button
                                type="primary"
                                size="mini"
                                @click="ViewDocument(scope.$index, scope.row)"
                            >查看文档</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="Mt_DetectPaging">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="OnPaging"
                    :page-size="pageSize"
                    :current-page="nowPages"
                    :page-sizes="[10, 50, 100, 200]"
                    layout="total,sizes, prev, pager, next, jumper"
                    :total="total"
                ></el-pagination>
            </div>
            <!----------- 技术文档弹框 ------------->
            <el-dialog :visible.sync="TechnicalDocumentation" width="70%">
                <div style="height:300px;">
                    <el-table
                        ref="multipleTable"
                        border
                        :data="TechnicalOnAddArr"
                        height="100%"
                        style="width: 100%;height:100%;"
                        :header-row-style="{ height: '39px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '39px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column prop="name" label="文档名称"></el-table-column>
                        <el-table-column prop="url" label="路径"></el-table-column>
                        <el-table-column label="操作" width="175">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    @click="SeeFile(scope.$index, scope.row)"
                                >查看文档</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { ResourceManagement, BasicData } from "../../../common/api";
export default {
    data() {
        return {
            MtSearchform: {
                name: "", //设备名称
                number: "", //设备编号
                type: "" //维保类型
            },
            TableHeight: {
                height: ""
            },
            QueryArr: [], //查询数组
            pageSize: 10, //每页多少条
            nowPages: 1, //当前页
            total: 0, //总数

            SingleChoiceArr: [], //储存勾选数据
            mainId: "", //储存勾选id
            resourcesId: "", //储存勾选id
            TechnicalDocumentation: false,
            ViewID: "",
            TechnicalOnAddArr: []
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
            this.TableHeight.height = window.innerHeight - 100 + "px";
        },
        //查询
        OnQuery() {
            this.axios({
                method: "post",
                url: ResourceManagement.GET_A_Query,
                data: {
                    pageNum: this.nowPages, //当前页
                    pageSize: this.pageSize, //当前页数
                    facilityName: this.MtSearchform.name, //设备名称
                    facilityNum: this.MtSearchform.number, //设备编码
                    mainType: this.MtSearchform.type //维保类型
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
        OnPaging(val) {
            this.nowPages = val;
            this.OnQuery();
        },
        //单选
        Tick(row) {
            if (row.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row.pop());
            } else {
                this.SingleChoiceArr = row.pop(); //储存新的单选数据
                if (this.SingleChoiceArr != undefined) {
                    this.mainId = this.SingleChoiceArr.mainId;
                    this.resourcesId = this.SingleChoiceArr.resourcesId;
                }
            }
        },
        // 保养
        maintain(row) {
            this.$router.push({
                path: "MaintenanceInfo",
                query: {
                    mainId: row.mainId,
                    resourcesId: row.resourcesId,
                    facilityName: row.facilityName,
                    facilityNum: row.facilityNum,
                    facilityModel: row.facilityModel
                }
            });
        },

        //查看技术文档
        ViewDocument(index, row) {
            this.TechnicalDocumentation = true;
            this.ViewID = row.mainId;
            this.OnAddArr();
        },
        //获取全部文件
        OnAddArr() {
            this.axios
                .get(
                    BasicData.GET_D_QueryFile +
                        "?dataId=" +
                        this.ViewID +
                        "&category=MAINTAIN"
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
        }
    }
};
</script>

<style>
.MtSearch .el-input {
    width: 150px;
}
.MtSearch .item .el-form-item__label {
    font-size: 16px;
    color: #000000;
}
.Mt_contnet {
    width: 100%;
}

.MtContent_title {
    height: 40px;
    overflow: hidden;
}
.MtContent_title .Mt_title {
    float: left;
    font-size: 12px;
    line-height: 40px;
}
.MtContent_title .Mt_info {
    font-size: 12px;
}
.Mt_contnet_table {
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
.Mt_DetectPaging {
    height: 50px;
    margin-top: 5px;
}
</style>
