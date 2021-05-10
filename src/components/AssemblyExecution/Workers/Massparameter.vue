<template>
    <div class="container">
        <div class="head_content">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="工艺规程名称">
                    <el-input v-model="formInline.name" size="medium" disabled></el-input>
                </el-form-item>
                <el-form-item label="指令编号">
                    <el-input v-model="formInline.number" size="medium" disabled></el-input>
                </el-form-item>
                <el-form-item label="指令名称">
                    <el-input v-model="formInline.instruct" size="medium" disabled></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableContents_title">
            <div class="parametersTablenName_title">质量参数表名称</div>
            <div class="parametersTablenContent_title">
                表格内容
                <div class="operatingButton">
                    <el-button type="primary" size="mini" @click="submit">保存</el-button>
                    <el-button type="primary" size="mini" @click="returnW">返回</el-button>
                </div>
            </div>
        </div>
        <div class="tableContents" :style="TableHeight">
            <div class="table_content">
                <div class="parametersTablenName_left">
                    <el-table
                        border
                        :data="tableDataName"
                        @row-click="massParameterClick"
                        highlight-current-row
                        ref="multipleTable"
                        height="100%"
                        style="width: 100%; height: 100%"
                        :header-row-style="{ height: '38px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '34px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column prop="rownum" label="序号" width="60"></el-table-column>
                        <el-table-column prop="tableName" label="表名称"></el-table-column>
                    </el-table>
                </div>
                <div class="parametersTablenContent_right">
                    <el-table
                        border
                        :data="tableDataContent.newBody"
                        height="100%"
                        style="width: 100%; height: 100%"
                        :header-row-style="{ height: '38px' }"
                        :header-cell-style="{ padding: '0px' }"
                        :row-style="{ height: '34px' }"
                        :cell-style="{ padding: '0px' }"
                    >
                        <el-table-column prop="rowNum" label="序号"></el-table-column>
                        <el-table-column
                            v-for="(item, key) in tableDataContent.header"
                            :key="key"
                            :prop="item.columEng"
                            :label="item.columName"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row[item.columEng + '1'] == 1">
                                    <el-input
                                        size="mini"
                                        placeholder="请输入内容"
                                        v-model="scope.row[item.columEng]"
                                    ></el-input>
                                </span>
                                <span v-else>{{ scope.row[item.columEng] }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.head_content {
    height: 60px;
    padding: 10px 10px 0px;
    box-sizing: border-box;
    overflow: hidden;
}
.tableContents {
    padding: 0px 10px;
    box-sizing: border-box;
}
.tableContents_title {
    height: 30px;
    overflow: hidden;
}
.parametersTablenName_title {
    width: 20%;
    float: left;
    text-indent: 10px;
    font-size: 12px;
    line-height: 30px;
}
.parametersTablenContent_title {
    width: 79%;
    float: right;
    text-indent: 7px;
    font-size: 12px;
    line-height: 30px;
}
.operatingButton {
    float: right;
    margin-right: 10px;
}
.tableContents {
    width: 100%;
}
.table_content {
    height: 100%;
}
.parametersTablenName_left {
    width: 20%;
    height: 100%;
    float: left;
}
.parametersTablenContent_right {
    width: 79%;
    height: 100%;
    float: right;
    border: 1px solid #f1f1f1;
    box-sizing: border-box;
}
</style>
<script>
import { AssemblyPerform } from "../../../common/api";
export default {
    data() {
        return {
            instructId: this.$route.query.instructId,
            instructionId: this.$route.query.instructionId,
            stepId: this.$route.query.stepId,
            orderId: this.$route.query.orderId,
            TableHeight: {
                height: ""
            },
            detailedInformationHeight: {
                height: ""
            },
            formInline: {
                name: "",
                number: "",
                instruct: ""
            },
            tableDataName: [],
            tableDataContent: {
                header: [],
                body: [],
                newBody: []
            },
            qualparaId: ""
        };
    },
    created() {
        this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
        this.detailedInformation(); //在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.detailedInformation); //在生命周期里面监听浏览器变化
        this.massparameterList();
    },
    methods: {
        // 表格内容数据组装
        getJsonArray() {
            let newBody = [];
            this.tableDataContent.body.map(item => {
                if (newBody.length == 0) {
                    let b = item.columEng;
                    let m = { rowNum: item.rowNum };
                    m[b] = item.content;
                    m[b + "1"] = item.columType;
                    newBody.push(m);
                } else {
                    let index = newBody.map(x => x.rowNum).indexOf(item.rowNum);
                    let n = item.columEng;
                    if (index < 0) {
                        let x = { rowNum: item.rowNum };
                        x[n] = item.content;
                        x[n + "1"] = item.columType;
                        newBody.push(x);
                    } else {
                        newBody[index][n] = item.content;
                        newBody[index][n + "1"] = item.columType;
                    }
                }
            });
            this.tableDataContent.newBody = newBody;
            // console.log(this.tableDataContent.newBody,'xxxxxx');
        },
        gaodu() {
            //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 110 + "px";
        },
        detailedInformation() {
            this.detailedInformationHeight.height =
                window.innerHeight - 150 + "px";
        },
        // 质量参数表 列表展示
        massparameterList() {
            let that = this;
            let url = AssemblyPerform.GET_A_findTableName;
            that.axios
                .get(url, {
                    params: {
                        instructId: that.instructId,
                        instructionId: that.instructionId,
                        stepId: this.stepId
                    }
                })
                .then(res => {
                    that.tableDataName = res.data.table;
                    that.formInline.name = res.data.head.REGULATION;
                    that.formInline.number = res.data.head.INSTRUCT_NUM;
                    that.formInline.instruct = res.data.head.INSTRUCT_NAME;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 质量参数表 - 单击事件
        massParameterClick(row) {
            let that = this;
            let url = AssemblyPerform.GET_A_findTable;
            that.qualparaId = row.qualparaId;
            that.axios
                .get(url, {
                    params: {
                        qualparaId: row.qualparaId,
                        instructionId: that.instructionId,
                        stepId: this.stepId
                    }
                })
                .then(res => {
                    that.tableDataContent.header = res.data.header;
                    that.tableDataContent.body = res.data.body;
                    that.getJsonArray();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 保存
        submit() {
            let that = this;
            let upadtaArry = [];
            that.tableDataContent.body.map(i => {
                if (i.columType == 1) {
                    that.tableDataContent.newBody.map(j => {
                        if (j[i.columEng + "1"] == 1 && i.rowNum == j.rowNum) {
                            i.content = j[i.columEng];
                        }
                    });
                    upadtaArry.push(i);
                }
            });
            let url =
                AssemblyPerform.GET_A_addColum +
                "?qualparaId=" +
                that.qualparaId +
                "&instructionId=" +
                that.instructionId +
                "&stepId=" +
                that.stepId;
            that.axios
                .post(url, upadtaArry)
                .then(res => {
                    if (res.data.success == true) {
                        that.$message({
                            message: "保存成功",
                            type: "success"
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
        },
        // 返回
        returnW() {
            this.$router.push({
                name: "Workers",
                query: {
                    instructId: this.instructId,
                    instructionId: this.instructionId,
                    orderId: this.orderId,
                    stepId: this.stepId
                }
            });
        }
    }
};
</script>
