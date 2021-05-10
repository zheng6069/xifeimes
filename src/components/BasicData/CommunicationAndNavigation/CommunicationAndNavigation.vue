<template>
    <div>
        <div class="Comm_contnet" :style="TableHeight">
            <div class="Comm_contnet_table">
                <el-table
                    border
                    :data="tableData"
                    height="100%"
                    style="width: 100%; height: 100%"
                    :header-row-style="{ height: '39px' }"
                    :header-cell-style="{ padding: '0px' }"
                    :row-style="{ height: '39px' }"
                    :cell-style="{ padding: '0px' }"
                >
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column prop="instrumentName" label="设备名称"></el-table-column>
                    <el-table-column prop="devType" label="设备类型"></el-table-column>
                    <el-table-column prop="queFailureStatue" label="维修状态" width="120"></el-table-column>
                    <el-table-column prop="queCalTime" label="设备计量时间"></el-table-column>
                    <el-table-column prop="queComSataue" label="设备通信状态" width="180"></el-table-column>
                    <el-table-column prop="queSataue" label="设备运行状态" width="180"></el-table-column>
                </el-table>
            </div>
        </div>

        
    </div>
</template>

<script>
import { Integration } from "../../../common/api";
export default {
    name: "Start",
    data() {
        return {
          
            tableData: [], //检测项table数据
            TableHeight: {
                height: ""
            },        
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
            this.TableHeight.height = window.innerHeight - 20 + "px";
        },

        // 列表展示
        OnQuery() {
            this.axios
                .get(Integration.GET_B_CommunicationAndNavigation, {
                    params: {}
                })
                .then(res => {
                    console.log(res,"res")
                    this.tableData = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
       
      
        //处理开始时间数据
        StartDataFn(Date) {
            // debugger
            this.StarthDataScope = Date;
        },
        //计划开始时间
        StartTime(Date) {
            this.ruleForm.NewScheduledStartTime = Date;
        },
        //计划完成时间
        CompletionTime(Date) {
            this.ruleForm.NewPlannedCompletionTime = Date;
        },

      
      
       

       
     
        
    }
};
</script>
<style>
* {
    margin: 0px;
    padding: 0px;
}



.Comm_contnet {
    width: 100%;
    margin-top: 10px;
}
.Comm_contnet_table {
    padding: 0px 10px;
    height: 100%;
}

</style>