<template>
    <div class="Gantt_large">
        <div class="Gantt_con" :style="TableHeight" ref="gantt"></div>
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
                data: [
                    // {
                    //     id: "a-1",
                    //     text: "林岚", //任务名称
                    //     start_date: "2020-9-10 08:00", //开始时间
                    //     // duration: 5,//任务时长
                    //     // progress: 0.6, //任务进度
                    //     end_date: "2020-9-10 12:00", //结束时间
                    //     parent: 0 //父级id
                    // },
                    // {
                    //     id: "b-2",
                    //     text: "建军节",
                    //     start_date: "2020-09-11 13:00",
                    //     end_date: "2020-9-12 15:30",
                    //     // duration: 25,
                    //     // progress: 0.4,
                    //     parent: "a-1"
                    // },{
                    //     id: "c-3",
                    //     text: "建军节",
                    //     start_date: "2020-09-11 13:00",
                    //     end_date: "2020-9-12 15:30",
                    //     // duration: 25,
                    //     // progress: 0.4,
                    //     parent: "b-2"
                    // }
                ]
                // links: [
                //     // { id: 1, source: 1, target: 2, type: "0" }
                // ]
            },
            // lists: [
            //     // {
            //     //   icon: "mdi-account",
            //     //   text: "个人中心",
            //     //   src: "/user/info"
            //     // }
            // ]

            StorageID:"",
            TableHeight: {
                height: ""
            },
        };
    },
     mounted: function() {
       

        gantt.config.columns = [
            { name: "text", label: "架次号", tree: true, width: "230" },
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

        gantt.attachEvent("onTaskDblClick", (id, e,a) => {
            console.log(id,'11111')
            this.StorageID = id;
    
            if(this.StorageID.substr(0,1) == "a"){
                console.log("this.StorageID","不可跳转")
            } else if(this.StorageID.substr(0,1) == "b"){
               console.log("this.StorageID","不可跳转")
            } else{
                console.log(id,'id')
                 this.$router.push({
                    path: "/MonthlyGanttChart",
                    query: {
                        GanttChartID: id
                    }
                });
            }
           
        });
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
            this.TableHeight.height = window.innerHeight - 20 + "px";
        },
        //查询排产数据
        OnQuery() {
            // console.log(this.tasks,'赋值前')
            this.axios
                .get(AutomaticScheduling.GET_O_Query, {
                    params: {
                      
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
.Gantt_large{
    padding: 0px 10px;
}
.Gantt_con{
    width: 100%;
    margin-top: 10px;
}
</style>