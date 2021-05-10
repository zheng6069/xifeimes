<template>
  <div :style="TableHeight">
    <el-row class="box">
      <h5>物料配送任务</h5>
      <el-table
        border
        :highlight-current-row="true"
        @row-click="rowclick"
        ref="multipleTable"
        :data="tasklist"
        style="width: 100%; height: 100%"
        :header-row-style="{ height: '39px' }"
        :header-cell-style="{ padding: '0px' }"
        :row-style="{ height: '39px' }"
        :cell-style="{ padding: '0px' }"
      >
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="taskNo" label="任务号"></el-table-column>
        <el-table-column prop="deliveryTime" label="配送时间"></el-table-column>
        <el-table-column
          prop="deliveryStation"
          label="配送站位"
        ></el-table-column>
        <el-table-column prop="deliveryStatus" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.deliveryStatus == 0">已开始</span>
            <span v-if="scope.row.deliveryStatus == 1">待接收</span>
            <span v-if="scope.row.deliveryStatus == 2">已接收</span>
            <span v-if="scope.row.deliveryStatus == 3">完成</span>
          </template>
        </el-table-column>
        <el-table-column prop="deliveryStation" label="接收">
          <template slot-scope="scope">
            <el-button @click="reception(scope.row)" type="text" size="small"
              >接收</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="nowPages"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top: 10px"
      >
      </el-pagination>
    </el-row>
    <el-row class="boxbottom">
      <h5>物料信息</h5>
      <el-table
        border
        ref="multipleTable"
        :data="messagelist"
        :header-row-style="{ height: '39px' }"
        :header-cell-style="{ padding: '0px' }"
        :row-style="{ height: '39px' }"
        :cell-style="{ padding: '0px' }"
      >
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="materialName" label="物料名称"></el-table-column>
        <el-table-column prop="sortieNo" label="架次号"></el-table-column>
        <el-table-column prop="drawNo" label="物料图号"></el-table-column>
        <el-table-column prop="inventoryNum" label="数量"></el-table-column>
        <el-table-column prop="stationName" label="站位"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<style>
* {
  margin: 0px;
  padding: 0px;
}
.box,
.boxbottom,
.bottombotton {
  padding: 10px;
}
.box{
   height: 60%;
}
.box .el-table{
   height: 85% !important;
}
.boxbottom{
   height: 40%;
}
.boxbottom .el-table{
   height: 90% !important;
}
h5 {
  margin-bottom: 10px;
}
</style>
<script>
import { StationDispatching } from "../../../common/api";
export default {
  name: "Start",
  data() {
    return {
      TableHeight: {
        height: "",
      },
      tasklist: [], //配送任务列表
      messagelist: [], //物料信息列表
      pageSize: 10, //每页都少条
      nowPages: 1, //当前页数
      total: 0, //总数
    };
  },
  created() {
    this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
    window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    this.ONlist();
  },
  methods: {
    gaodu() {
      //获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
      this.TableHeight.height = window.innerHeight + "px";
    },
    //物料配送列表展示
    ONlist() {
      let that = this;
      let url = StationDispatching.GET_B_selectDeliveryMaterials;
      that.axios
        .get(url, {
          params: {
            pageSize: that.pageSize,
            pageNum: that.nowPages,
            checkFlag: 1,
          },
        })
        .then((res) => {
          that.tasklist = res.data.records;
          that.total = res.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询物料信息
    findlist(data) {
      let that = this;
      let url = StationDispatching.GET_B_sselectMaterielById;
      that.axios
        .get(url, {
          params: {
            materielTaskId: data,
          },
        })
        .then((res) => {
          that.messagelist = res.data.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 当前页数
    sizeChange(val) {
      this.pageSize = val;
      this.nowPages = 1;
      this.ONlist();
    },
    // 当前页
    currentChange(val) {
      this.nowPages = val;
      this.ONlist();
    },
    // 当点击配送任务触发事件
    rowclick(row) {
      console.log(row);
      this.findlist(row.materielTaskId);
    },
    // 任务接收
    reception(row) {
      let that = this;
      let url = StationDispatching.GET_B_updateStatus;
      that.axios
        .get(url, {
          params: {
            materielTaskId: row.materielTaskId,
            checkFlag: 1,
          },
        })
        .then((res) => {
          this.ONlist();
          if (res.data.success) {
            this.$message({
              //成功后的提示
              message: res.data.message,
              type: "success",
              duration: 1500,
            });
          }else{
            this.$message({
              //失败后的提示
              message: res.data.message,
              type: "error",
              duration: 1500,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 任务完成
    handleClick(tab) {},
  },
};
</script>
