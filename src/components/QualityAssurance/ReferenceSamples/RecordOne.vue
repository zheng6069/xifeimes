<template>
    <div>
        <template v-for="item in RecordOneData">
            <div :key="item.stationId">
                <div class="table_title">
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">图号</span>
                                <span class="fieldContent">{{ item.drawing }}</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light field">
                                <span class="fieldName">名称</span>
                                <span class="fieldContent">{{ item.name }}</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">架次号</span>
                                <span class="fieldContent">{{ item.sortieNo }}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">AOL号</span>
                                <span class="fieldContent">{{ item.aolNo }}</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light field">
                                <span class="fieldName">AOL名称</span>
                                <span class="fieldContent">{{ item.aolName }}</span>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple field">
                                <span class="fieldName">站位名称</span>
                                <span class="fieldContent">{{ item.stationName }}</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <el-table :data="item.instructList" style="width: 100%;margin-bottom: 20px;" border>
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <div v-for="it in scope.row.stepList" :key="it.stepId">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="工步号:">
                                        <span>{{ it.stepSerial }}</span>
                                    </el-form-item>
                                    <el-form-item label="工步内容:">
                                        <span>{{ it.stepContex }}</span>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="instructNum" label="指令号/工步号" width="260px"></el-table-column>
                    <el-table-column prop="instructName" label="指令名称/工步内容"></el-table-column>
                </el-table>
            </div>
        </template>
    </div>
</template>

<script>
import { AssemblyPerform } from "../../../common/api";
export default {
    props: ["sortieNo"],
    data() {
        return {
            RecordOneData: []
        };
    },
    created() {},
    methods: {
        RecordOneList() {
            this.axios
                .get(AssemblyPerform.GET_V_findWorkList, {
                    params: {
                        flag: "报工记录",
                        sortieNo: this.sortieNo
                    }
                })
                .then(res => {
                    this.RecordOneData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>
<style>
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
</style>
