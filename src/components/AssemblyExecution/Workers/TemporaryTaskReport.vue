<template>
    <div>
        <div class="Temp_contnet" :style="TableHeight">
            <div class="Temp_contnet_table">
                <el-table
                    @selection-change="Tick"
                    ref="multipleTable"
                    @row-click="OnEcho"
                    border
                    :data="tableData"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column type="selection" width="40"></el-table-column>
                    <el-table-column label="序号" type="index" width="55"></el-table-column>
                    <el-table-column prop="temporaryName" label="任务名称"></el-table-column>
                    <el-table-column prop="hours" label="工时"></el-table-column>
                    <el-table-column prop="sendworker" label="派工人"></el-table-column>
                    <el-table-column prop="sendtime" label="派工时间"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="Temp_head">
            <div class="Temp_head_left">
                <p>工作内容</p>
                <div>
                    <el-input
                        :rows="3"
                        :disabled="true"
                        style="width: 100%"
                        size="medium"
                        type="textarea"
                        v-model="JobContent"
                    ></el-input>
                </div>
            </div>
            <div class="Temp_head_left">
                <p>备注</p>
                <div>
                    <el-input
                        :rows="3"
                        style="width: 100%"
                        size="medium"
                        type="textarea"
                        v-model="remarks"
                    ></el-input>
                </div>
            </div>
        </div>
        <div class="Temp_feer">
            <el-button size="medium" type="primary" class="Temp_feer_bnt" @click="OnPreservation">完工</el-button>
        </div>
    </div>
</template>

<script>
import { AutomaticScheduling } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
            JobContent: "", //工作内容
            remarks: "", //备注

            tableData: [], //检测项table数据
            DeleteArr: [], //储存勾选到的新的数组
            temporaryId: "", //储存勾选到的id
            TableHeight: {
                height: ""
            }
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
            this.TableHeight.height = window.innerHeight - 165 + "px";
        },
        //默认查询生产全部任务
        OnQuery() {
            this.axios({
                method: "post",
                url: AutomaticScheduling.GET_F_Query,
                data: {}
            })
                .then(res => {
                    this.tableData = res.data;
                })
                .catch(error => {
                    console.log(error);
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
                    this.temporaryId = this.DeleteArr.temporaryId;
                }
            }
        },
        OnPreservation() {
            this.axios({
                method: "post",
                url: AutomaticScheduling.GET_F_Preservation,
                data: {
                    temporaryId: this.temporaryId, //id
                    remarks: this.remarks //备注
                }
            })
                .then(res => {
                    if (res.data.success == true) {
                        this.$message({
                            //成功后的提示
                            message: "报工成功",
                            type: "success",
                            duration: 1500
                        });

                        this.OnQuery();
                    } else {
                        this.$message({
                            //失败后的提示
                            message: "报工失败",
                            type: "error",
                            duration: 1500
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        OnEcho(row, column) {
            console.log(row, column);
            this.JobContent = row.taskcontent;
        }
    }
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}
.Temp_head {
    height: 100px;
    overflow: hidden;
}
.Temp_head_left {
    overflow: hidden;
    padding: 0px 10px;
    margin-top: 20px;
    width: -webkit-calc(50% - 20px);
    width: -moz-calc(50% - 20px);
    width: calc(50% - 20px);
    float: left;
}
.Temp_head_left p {
    width: 70px;
    float: left;
    line-height: 36px;
}
.Temp_head_left div {
    width: -webkit-calc(100% - 70px);
    width: -moz-calc(100% - 70px);
    width: calc(100% - 70px);
    float: left;
}

.Temp_contnet {
    width: 100%;
}
.Temp_contnet_table {
    padding: 10px 10px;
    height: 100%;
    overflow: hidden;
}
.Temp_feer {
    height: 40px;
    margin-top: 10px;
}
.Temp_feer_bnt {
    float: right;
    margin-right: 10px;
}
</style>