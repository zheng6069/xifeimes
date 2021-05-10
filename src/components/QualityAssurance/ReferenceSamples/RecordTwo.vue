<template>
    <div>
        <template v-for="item in RecordTwoData">
            <div :key="item.head.qualparaId">
                <div class="table_title">
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">架次号</span>
                                <span class="fieldContent">{{ item.head.sortieNo }}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-light field">
                                <span class="fieldName">工单号</span>
                                <span class="fieldContent">{{ item.head.workNo }}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">指令编号</span>
                                <span class="fieldContent">{{ item.head.instructNum }}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">指令名称</span>
                                <span class="fieldContent">{{ item.head.instructName }}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row></el-row>
                </div>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark LiveTable">{{ item.head.tableName }}</div>
                    </el-col>
                </el-row>
                <el-table
                    border
                    :data="item.newBody"
                    height="100%"
                    style="width: 100%; height: 100%;margin-bottom: 20px;"
                    :header-row-style="{ height: '38px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '34px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column prop="rowNum" label="序号"></el-table-column>
                    <el-table-column
                        v-for="(item, key) in item.header"
                        :key="key"
                        :prop="item.columEng"
                        :label="item.columName"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row[item.columEng] }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </template>
    </div>
</template>
<script>
import { AssemblyPerform } from "../../../common/api";
export default {
    props: ["parameter"],
    data() {
        return {
            RecordTwoData: [],
            sortieNo: "",
            workFlowId: "",
            workId: "",
            workNo: ""
        };
    },
    created() {
        let { sortieNo, workFlowId, workId, workNo } = this.parameter;
        this.sortieNo = sortieNo;
        this.workFlowId = workFlowId;
        this.workId = workId;
        this.workNo = workNo;
    },
    computed: {},
    methods: {
        // 表格内容数据组装
        getJsonArray() {
            this.RecordTwoData.map((j, ind) => {
                let newBody = [];
                j.body.map(item => {
                    if (newBody.length == 0) {
                        let b = item.columEng;
                        let m = { rowNum: item.rowNum };
                        m[b] = item.content;
                        m[b + "1"] = item.columType;
                        newBody.push(m);
                        console.log(newBody, item, "vvvvv");
                    } else {
                        let index = newBody
                            .map(x => x.rowNum)
                            .indexOf(item.rowNum);
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
                this.RecordTwoData[ind].newBody = newBody;
            });
        },
        RecordTwoList() {
            this.axios
                .post(AssemblyPerform.GET_V_findTableList, {
                    flag: "质量记录表",
                    sortieNo: this.sortieNo,
                    workFlowId: parseInt(this.workFlowId),
                    workId: parseInt(this.workId),
                    workNo: this.workNo
                })
                .then(res => {
                    if (res.data.success == false) {
                        this.$message({
                            message: res.data.message,
                            type: "error",
                            duration: 1500
                        });
                    } else {
                        this.RecordTwoData = res.data;
                        this.getJsonArray();
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>
<style scoped>
.field {
    display: flex;
    height: 40px;
    border: 1px solid #ebeef5;
}
.fieldName {
    flex: 2;
    line-height: 40px;
    text-align: center;
    border-right: 1px solid #ebeef5;
}
.fieldContent {
    flex: 3;
    line-height: 40px;
    text-align: center;
}
.LiveTable {
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ebeef5;
    background-color: #eee;
}
</style>
