<template>
    <div class="RecordFiveContent">
        <template v-for="item in todos">
            <div :key="item.changeOrderId">
                <el-row>
                    <el-col :span="8">
                        <div class="grid-content bg-purple field">
                            <span class="fieldName">更改单号</span>
                            <span class="fieldContent">{{ item.changeOrderNumber }}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light field">
                            <span class="fieldName">有效性</span>
                            <span class="fieldContent">{{ item.effectiveness }}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple field">
                            <span class="fieldName">机型</span>
                            <span class="fieldContent">{{ item.model }}</span>
                        </div>
                    </el-col>
                </el-row>
                <div class="RecordFiveTable">
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
                <div class="bottomTitle">
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">编制</span>
                                <span class="fieldContent">{{ item.organization }}</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light field">
                                <span class="fieldName">校队</span>
                                <span class="fieldContent">{{ item.schoolTeam }}</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">质审</span>
                                <span class="fieldContent">{{ item.qualityExamination }}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">审查</span>
                                <span class="fieldContent">{{ item.examination }}</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light field">
                                <span class="fieldName">批准</span>
                                <span class="fieldContent">{{ item.approval }}</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">用户/适航代表</span>
                                <span class="fieldContent">{{ item.representative }}</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import { AssemblyPerform } from "../../../common/api";
export default {
    props: ["changeOrder"],
    data() {
        return {
            RecordFiveData: [],
            todos: [],
            sortieNo: ""
        };
    },
    created() {
        let { sortieNo } = this.changeOrder;
        this.sortieNo = sortieNo;
    },
    computed: {},
    methods: {
        // 工艺工改记录
        RecordFiveeList() {
            let that = this;
            that.axios
                .get(AssemblyPerform.GET_V_findChaneOrderList, {
                    params: {
                        sortieNo: that.sortieNo
                    }
                })
                .then(res => {
                    if (res.data.success == false) {
                        this.$message({
                            message: res.data.message,
                            type: "error",
                            duration: 1500
                        });
                    } else {
                        this.todos = res.data;
                    }
                })
                .catch(error => {
                    console.log(error);
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
.RecordFiveTable {
    height: 300px;
}
.RecordFiveTable .tableContent {
    height: 100%;
}
.bottomTitle {
    margin-bottom: 20px;
}
</style>
