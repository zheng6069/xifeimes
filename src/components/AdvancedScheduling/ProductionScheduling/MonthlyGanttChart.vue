<template>
    <div class="MoGantt_large">
        <div class="MoGantt_head">
             <el-button
                size="medium"
                type="primary"
                class="MoGantt_bnt"
                @click="OnReturn()"
            >返回</el-button>
        </div>
        <div class="MoGantt_con" :style="TableHeight" ref="gantt"></div>
    </div>
</template>
 
<script>
import { gantt } from "dhtmlx-gantt";
import { AutomaticScheduling } from "../../../common/api";
export default {
    name: "gantt",
    data() {
        return {
            tasks: {
                data: []
            },
       

            StorageID:"",
            TableHeight: {
                height: ""
            },
            GanttChartID: this.$route.query.GanttChartID, //接收参数
        };
    },
     mounted: function() {
       

        gantt.config.columns = [
            { name: "text", label: "指令名称", tree: true, width: "230" },
            // { name: "duration", label: "总时长", align: "center", width: "50" },
            {
                name: "start_date",
                label: "开始时间",
                align: "center",
                width: "90"
            },
            {
                name: "end_date",
                label: "结束时间",
                align: "center",
                width: "90"
            },
            
        ];

        gantt.config.scale_unit = "year";
        gantt.config.step = 1;
        gantt.config.xml_date = "%Y-%m-%d %H:%i"; //设置x轴时间

        gantt.config.date_scale = "%Y";

        gantt.config.subscales = [
            { unit: "month", step: 1, date: "%m" },
            { unit: "day", step: 1, date: "%j" },
            { unit: "hour", step: 1, date: "%h" }
        ]; //当右侧不止显示年份时，可以添加展示月日，添加一个就加一行
        gantt.config.scale_height = 80; //甘特图右侧表头的高度
        gantt.config.min_column_width = 25;

        //下面日期的宽度，会随时间长短宽度变化。
        //但是设置最小宽度后，当时间跨度到达一定长度，
        //就会展示最小宽度
        gantt.i18n.setLocale("cn"); //使用中文
        // gantt.config.work_time = true;
        // gantt.config.correct_work_time = true;
        //跳过节假日：比如你选择的包含周六日，
        //他会自动延长时间或者缩短，
        //延长或者缩短是因为包含节假日，要增加或者减少天数。

        gantt.config.readonly = true; //设置为只读
        // gantt.config.details_on_dblclick = false;//双击弹出框
        // gantt.config.drag_links = false;//是否允许拖拽线条
        // gantt.config.drag_move = false;//是否允许拖拽
        // gantt.config.drag_progress = false;//允许用户推拽条形图上用来调整进度百分比的小按钮

        // gantt.attachEvent("onTaskDblClick", (id, e,a) => {
          
        //     this.StorageID = id;
    
        //     if(this.StorageID.substr(0,1) == "a"){
        //         console.log("this.StorageID","不可跳转")
        //     } else if(this.StorageID.substr(0,1) == "b"){
        //        console.log("this.StorageID","不可跳转")
        //     } else{
        //         console.log(id,'id')
        //          this.$router.push({
        //             path: "/EquipmentMaintenance",
        //             query: {
        //                 EquipmentID: id
        //             }
        //         });
        //     }
           
        // });
        // gantt.init(this.$refs.gantt); //初始化c
        // gantt.parse(this.tasks);

        // gantt.config.inherit_scale_class = true;
        
    },
    created() {
        console.log(this.tasks, "赋值前");
        this.OnQuery();
        this.gaodu(); // 在生命周期里面调用执行获取整体浏览器高度
        window.addEventListener("resize", this.gaodu); // 在生命周期里面监听浏览器变化
    },
     methods: {
         gaodu() {
            // 获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
            this.TableHeight.height = window.innerHeight - 60 + "px";
        },
        //查询排产数据
        OnQuery() {
            // console.log(this.tasks,'赋值前')
            this.axios
                .get(AutomaticScheduling.GET_O_JumpQuery, {
                    params: {
                        monthPlanId:this.GanttChartID
                    }
                })
                .then(res => {
                    console.log(res.data,'原始数据')
                    // this.tasks.data = JSON.stringify(res.data)
                    this.tasks.data = res.data
                    console.log(this.tasks.data,'赋值后')
                    // this.ProcessConfigurationArr = res.data;
                    gantt.init(this.$refs.gantt); //初始化c
                    gantt.parse(this.tasks);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        
        OnReturn(){
            this.$router.go(-1);
        
        },
        
    },
   
   
    watch: {}
};
</script> 

<style>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
*{
    margin: 0px;
    padding: 0px;
}
.MoGantt_large{
    padding: 0px 10px;
}
.MoGantt_head{
    height: 50px;
}
.MoGantt_bnt{
    float:right;
    margin-top: 7px;
}
.MoGantt_con{
    width: 100%;
}
</style>