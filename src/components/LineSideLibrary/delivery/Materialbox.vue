<template>
  <div :style="TableHeight">
    <!-- 物料配送任务 -->
    <el-row class="box">
      <h5>物料配送任务</h5>
      <el-table
        border
        :data="tasklist"
        height="300"
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
        <el-table-column prop="checkUser" label="物料需求详情">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
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
    <!-- 料盒信息 -->
    <el-row class="boxbottom">
      <el-row class="bottombotton">
        <el-col :span="2">
          <h5>料盒信息</h5>
        </el-col>
        <el-col :span="10" class="number">
          AGV编号：
          <el-select v-model="AGVvalue" placeholder="请选择">
            <el-option
              v-for="item in AGVoptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="right">
          <el-button type="primary" @click="addmagazinelist">添加</el-button>
        </el-col>
      </el-row>
      <el-table
        border
        @selection-change="handleSelectionChange"
        :data="magazinelist"
        height="200"
        :header-row-style="{ height: '39px' }"
        :header-cell-style="{ padding: '0px' }"
        :row-style="{ height: '39px' }"
        :cell-style="{ padding: '0px' }"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column
          prop="materielBoxNo"
          label="料盒编号"
        ></el-table-column>
        <el-table-column
          prop="stationName"
          label="物料所属站位"
        ></el-table-column>
        <el-table-column prop="checkUser" label="物料详情">
          <template slot-scope="scope">
            <el-button
              @click="magazineClick(scope.row)"
              type="text"
              size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 料盒信息 -->
    <el-row class="boxbottom">
      <el-row class="bottombotton">
        <el-col :span="12">
          <h5>料盒信息</h5>
        </el-col>
        <el-col :span="12" class="right">
          <el-button type="primary" @click="deliverymagazinelist"
            >配送</el-button
          >
        </el-col>
      </el-row>
      <el-table
        border
        :data="magazinelisttwo"
        height="200"
        :header-row-style="{ height: '39px' }"
        :header-cell-style="{ padding: '0px' }"
        :row-style="{ height: '39px' }"
        :cell-style="{ padding: '0px' }"
      >
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="materielBoxNo" label="料盒编号"></el-table-column>
        <el-table-column prop="agvNo" label="AGV编号"></el-table-column>
        <el-table-column
          prop="stationName"
          label="物料所属站位"
        ></el-table-column>
        <el-table-column prop="checkUser" label="物料详情">
          <template slot-scope="scope">
            <el-button
              @click="magazineClick(scope.row)"
              type="text"
              size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
         <el-table-column prop="checkUser" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="deletemagazinelist(scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 配送任务列表弹窗 -->
    <el-dialog
      title="物料需求信息"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <el-table
        border
        ref="multipleTable"
        :data="messagelist"
        height="400"
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
    </el-dialog>
    <!-- 料盒中的物料信息弹窗 -->
    <el-dialog
      title="料盒中的物料信息"
      :visible.sync="dialogVisibletwo"
      width="70%"
      :before-close="handleClose"
    >
      <el-table
        border
        ref="multipleTable"
        :data="magazinelisttc"
        height="400"
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
        <el-table-column
          prop="certificateNo"
          label="合格证号"
        ></el-table-column>
        <el-table-column prop="productUnit" label="生产厂商"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<style>
* {
  margin: 0px;
  padding: 0px;
}
.box,
.boxbottom {
  padding: 10px;
}
.bottombotton {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}
.bottombotton .right {
  text-align: right;
}
.box{
   height: 40%;
}
.box .el-table{
   height: 80% !important;
}
.boxbottom{
   height: 30%;
}
.boxbottom .el-table{
   height: 80% !important;
}
h5 {
  margin-bottom: 10px;
  font-size: 14px;
}
.number {
  font-size: 14px;
}
</style>
<script>
import { StationDispatching } from "../../../common/api";
export default {
  name: "Start",
  data() {
    return {
      dialogVisible: false, //物料需求信息弹窗
      dialogVisibletwo: false, //料盒中的物料信息弹窗
      messagelist: [], //配送任务列表详情弹窗数据
      magazinelisttc: [], //料盒信息列表详情弹窗数据
      TableHeight: {
        height: "",
      },
      tasklist: [], //配送任务列表
      magazinelist: [], //料盒信息列表
      magazinelisttwo: [], //料盒信息2列表
      pageSize: 1, //每页都少条
      nowPages: 1, //当前页数
      total: 0, //总数
      AGVvalue: "",
      AGVoptions: [
        {
          value: "001",
        },
        {
          value: "002",
        },
        {
          value: "003",
        },
      ],
      pitchonlist: [], //第一个料盒信息选中列表
      pitchonlisttwo: [], //第二个料盒信息选中列表
    };
  },
  created() {
    this.gaodu(); //在生命周期里面调用执行获取整体浏览器高度
    window.addEventListener("resize", this.gaodu); //在生命周期里面监听浏览器变化
    this.ONlist();
    this.findfirstmagazine();
    this.findsecondmagazine()
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
            checkFlag: 3,
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
    // 查询第一个料盒信息
    findfirstmagazine() {
      let that = this;
      let url = StationDispatching.GET_B_selectBoxInfo;
      that.axios
        .get(url)
        .then((res) => {
          that.magazinelist = res.data.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查询第二个料盒信息
    findsecondmagazine() {
      let that = this;
      let url = StationDispatching.GET_B_selectBoxNos;
      that.axios
        .get(url)
        .then((res) => {
          that.magazinelisttwo = res.data.list;
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
    // 获取第一个料盒选中时的数据
    handleSelectionChange(val) {
      this.pitchonlist = val;
    },
    // 获取第二个料盒选中时的数据
    handleSelectionChangetwo(val) {
      this.pitchonlisttwo = val;
    },
    // 第一个料盒添加
    addmagazinelist() {
      if (this.pitchonlist.length != 0 && this.AGVvalue != "") {
        this.axios({
          method: "post",
          url: StationDispatching.GET_B_updateAGVNo + "?agvNo="+ this.AGVvalue,
          data: this.pitchonlist,
        })
          .then((res) => {
            if(res.data.success){
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
            this.findfirstmagazine();
            this.findsecondmagazine()
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$message({
          showClose: true,
          message: "请勾选料盒信息且选择AGV编号",
          type: "warning",
        });
      }
    },
    // 第二个料盒信息删除
    deletemagazinelist(row) {
      let that = this;
      let url = StationDispatching.GET_B_deleteAGVNo;
      that.axios
        .get(url, {
          params: {
            materielBoxNo: row.materielBoxNo,
          },
        })
        .then((res) => {
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
           this.findfirstmagazine();
            this.findsecondmagazine()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 第二个料盒信息配送
    deliverymagazinelist() {
      this.axios({
          method: "post",
          url: StationDispatching.GET_B_updateTackStatus,
          data: this.magazinelisttwo,
        })
          .then((res) => {
            if(res.data.success){
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
            this.findfirstmagazine();
            this.findsecondmagazine()
          })
          .catch((error) => {
            console.log(error);
          });
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisibletwo = false;
      this.dialogVisible = false;
    },
    // 任务接收
    reception() {},
    // 物料需求详情查看
    handleClick(row) {
      this.findlist(row.materielTaskId);
      this.dialogVisible = true;
    },
    // 物料需求详情
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
    // 料盒信息查看
    magazineClick(row) {
      this.dialogVisibletwo = true;
      let that = this;
      let url = StationDispatching.GET_B_selectMaterielDetail;
      that.axios
        .get(url, {
          params: {
            materielBoxNo: row.materielBoxNo,
          },
        })
        .then((res) => {
          that.magazinelisttc = res.data.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 料盒信息删除
    magazinedelete() {},
  },
};
</script>
