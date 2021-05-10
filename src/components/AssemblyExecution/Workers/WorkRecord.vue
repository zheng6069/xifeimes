<template>
    <div class="processChangContent">
        <el-button type="primary" style="small" @click="re">返回</el-button>
        <template v-for="item in todos">
            <el-card class="box-card" :key="item.changeOrderId">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="更改单单号">
                        <el-input v-model="item.changeOrderNumber" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="有效性">
                        <el-input v-model="item.effectiveness" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="机型">
                        <el-input v-model="item.model" disabled></el-input>
                    </el-form-item>
                </el-form>
                <div class="processChangTable">
                    <div class="title">质量问题描述</div>
                    <div class="tableContent">
                        <el-table border :data="item.list" style="width: 100%;height:100%">
                            <el-table-column type="index" label="序号" width="60"></el-table-column>
                            <el-table-column prop="processNumber" label="工序号"></el-table-column>
                            <el-table-column prop="changeCode" label="更改代码"></el-table-column>
                            <el-table-column prop="changeContent" label="更改内容"></el-table-column>
                            <el-table-column prop="changeBasis" label="更改依据"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="flexible">
                    <ul>
                        <li>编制：{{ item.organization }}</li>
                        <li>校队：{{ item.schoolTeam }}</li>
                        <li>质审：{{ item.qualityExamination }}</li>
                        <li>审查：{{ item.examination }}</li>
                        <li>批准：{{ item.approval }}</li>
                        <li>用户/适航代表：{{ item.representative }}</li>
                    </ul>
                </div>
            </el-card>
        </template>
    </div>
</template>
<script>
import { AssemblyPerform } from "../../../common/api";
export default {
    data() {
        return {
            instructionId: this.$route.query.instructionId,
            processChangline: {
                one: "",
                two: "",
                three: ""
            },
            processChangData: [],
            authorizedStrength: "", //编制
            schoolTeam: "", //校队
            qualityAudit: "", //质审
            examine: "", //审查
            ratify: "", //批准
            userRepresentative: "", //用户/适航代表
            todos: []
        };
    },
    created() {
        this.processChangeList();
    },
    computed: {},
    methods: {
        // 工艺工改记录
        processChangeList() {
            let that = this;
            that.axios
                .get(AssemblyPerform.GET_A_findAllChangeOrder, {
                    params: {
                        instructionId: that.instructionId
                    }
                })
                .then(res => {
                    this.todos = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        re() {
            this.$router.go(-1);
        }
    }
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.processChangContent {
    margin: 10px;
}
.processChangTable {
    height: 300px;
}
.processChangTable .title {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
}
.processChangTable .tableContent {
    height: -moz-calc(100% - 30px); /* WebKit */
    height: -webkit-calc(100% - 30px); /* Opera */
    height: -o-calc(100% - 30px); /* Standard */
    height: calc(100% - 30px);
}
.flexible {
    margin-top: 10px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
}
ul,
li {
    list-style: none;
}
.flexible ul {
    display: flex;
}
.flexible ul li {
    flex: 1;
}
</style>
