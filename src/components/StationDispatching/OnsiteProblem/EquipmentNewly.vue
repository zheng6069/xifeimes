<template>
  <div class="container" :style="TableHeight">
    <div class="headerbotton">
      <el-button type="primary" @click="OnQueryEquipment">查询设备</el-button>
      <el-button type="primary" @click="SubmiTask">生成维修任务</el-button>
    </div>
    <el-row style="margin-bottom: 20px">
      <el-table :data="tableData" height="500" border style="width: 100%">
        <el-table-column prop="facilityName" label="设备名称" width="180">
        </el-table-column>
        <el-table-column prop="facilityNum" label="设备编号" width="180">
        </el-table-column>
        <el-table-column prop="mainType" label="设备类型"> </el-table-column>
        <el-table-column prop="facilityModel" label="设备型号">
        </el-table-column>
        <el-table-column prop="mainTime" label="提交时间"> </el-table-column>
        <el-table-column prop="person" label="提交人"> </el-table-column>
        <el-table-column prop="workRemarks" label="问题描述"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button @click="DeleteTask(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button @click="ShowButton(scope.row)" type="text" size="small"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-form ref="form" v-model="ruleFormAdd" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="设备名称" prop="name" class="AdvanTesting">
            <el-input
              v-model="ruleFormAdd.name"
              clearable
              placeholder="请点击查询设备名称"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="设备编号"
            prop="SerialNumber"
            class="AdvanTesting"
          >
            <el-input
              v-model="ruleFormAdd.SerialNumber"
              clearable
              placeholder="请点击查询设备"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="设备类型" prop="category" class="AdvanTesting">
            <el-input
              v-model="ruleFormAdd.category"
              clearable
              placeholder="请点击查询设备"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="设备型号" prop="type" class="AdvanTesting">
            <el-input
              v-model="ruleFormAdd.type"
              clearable
              placeholder="请点击查询设备"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="问题描述" prop="problemdescription" class="Advan">
          <el-input
            type="textarea"
            v-model="ruleFormAdd.problemdescription"
            clearable
            placeholder="请输入"
            :rows="5"
          ></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-button type="primary" v-if="ButtonShow" @click="AddTask"
          >添加任务</el-button
        >
        <el-button type="primary" v-else @click="AmendTask">修改任务</el-button>
      </el-row>
    </el-form>
    <!----------- 设备信息弹框 ------------->
    <el-dialog :visible.sync="TechnicalDocumentation" width="70%">
      <div style="height: 50px">
        <el-input
          style="width: 220px"
          v-model="EquipmentQueryName"
          size="medium"
          placeholder="请输入"
        ></el-input>
        <el-button
          size="medium"
          type="primary"
          style="margin-left: 10px"
          @click="OnQueryEquipment"
          >查 询</el-button
        >
      </div>
      <div style="height: 260px">
        <el-table
          ref="multipleTable"
          @selection-change="Tick"
          border
          :data="EquipmentArr"
          height="100%"
          style="width: 100%; height: 100%"
          :header-row-style="{ height: '39px' }"
          :header-cell-style="{ padding: '0px' }"
          :row-style="{ height: '39px' }"
          :cell-style="{ padding: '0px' }"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column
            prop="facilityName"
            label="设备名称"
          ></el-table-column>
          <el-table-column
            prop="facilityNum"
            label="设备编号"
          ></el-table-column>
          <el-table-column
            prop="facilityModel"
            label="设备型号"
          ></el-table-column>
          <el-table-column prop="station" label="所属站位"></el-table-column>
        </el-table>
      </div>
      <div class="dialog_footer">
        <el-button class="dialog_Close" @click="TechnicalDocumentation = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="OnPreservationEquipment"
          class="dialog_Preservation"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  AssemblyPerform,
  BasicData,
  ResourceManagement,
} from "../../../common/api";
import * as fecha from "element-ui/lib/utils/date";
export default {
  data() {
    return {
      TableHeight: {
        height: "",
      },
      ButtonShow: true,
      pageSize: 10, //每页多少条
      nowPages: 1, //当前页
      total: 0, //总数
      ruleFormAdd: {
        name: "", //设备名称
        type: "", // 设备型号
        category: "", // 设备类型
        SerialNumber: "", // 设备编号
        problemdescription: "", //问题描述
        resourcesId: "", //主键
        mainStatus: "", //状态
      },
      TechnicalDocumentation: false, // 查询设备弹框
      EquipmentQueryName: "", //查询设备信息
      QueryArr: [], //检测项table数据
      EquipmentArr: [], //储存设备信息
      selectdata: [], //x选中设备信息
      facilityName: "",
      QueryArr: [], //检测项table数据
      tableData: [], //设备列表数据
    };
  },
  created() {
    this.gaodu(); // 在生命周期里面调用执行获取整体浏览器高度
    window.addEventListener("resize", this.gaodu); // 在生命周期里面监听浏览器变化
    this.QueryTask();
  },
  methods: {
    gaodu() {
      // 获取整体浏览器的高度此时还没有执行 要在生命周期created里面 调用执行
      this.TableHeight.height = window.innerHeight - 160 + "px";
    },
    // 当前页数
    sizeChange(val) {
      this.pageSize = val;
      this.nowPages = 1;
      this.siSearch();
    },
    // 当前页
    currentChange(val) {
      this.nowPages = val;
      this.siSearch();
    },
    //勾选
    Tick(row) {
      this.selectdata = row;
      console.log(this.selectdata);
    },
    //查询设备信息
    OnQueryEquipment() {
      this.TechnicalDocumentation = true;
      this.axios({
        method: "post",
        url: BasicData.GET_F_QueryBasicData,
        data: {
          pageNum: 1, //当前页
          pageSize: 1000000, //每页多少条
          condetion: this.EquipmentQueryName, //名称
        },
      })
        .then((res) => {
          this.EquipmentArr = res.data.list;
          console.log(this.EquipmentArr);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //保存设备信息
    OnPreservationEquipment() {
      if (this.selectdata < 1 || this.selectdata == undefined) {
        this.$message({
          message: "请选择一条数据",
          type: "warning",
          duration: 1500,
        });
      } else {
        this.ButtonShow = true;
        this.ruleFormAdd.SerialNumber = this.selectdata[0].facilityNum; //设备编号
        this.ruleFormAdd.category = this.selectdata[0].facilityType; //设备类型
        this.ruleFormAdd.type = this.selectdata[0].facilityModel; //设备型号
        this.ruleFormAdd.name = this.selectdata[0].facilityName; //设备名称
        this.TechnicalDocumentation = false; //关闭弹框
        this.selectdata = [];
      }
    },
    // 查询维修任务
    QueryTask() {
      this.axios
        .get(ResourceManagement.GET_O_selectEquipmentRepairInfo)
        .then((res) => {
          console.log(res);
          this.tableData = res.data.list;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 修改维修任务
    AmendTask() {
      this.axios({
        method: "post",
        url: ResourceManagement.GET_O_updateEquipmentInfo,
        data: {
          resourcesId: this.ruleFormAdd.resourcesId, //主键
          mainStatus: this.ruleFormAdd.mainStatus, //状态
          workRemarks: this.ruleFormAdd.problemdescription, //问题描述
        },
      })
        .then((res) => {
          if(res.data.success){
            this.QueryTask();
          }else{
            this.$message({
              message: res.data.message,
              type: "warning",
              duration: 1500,
            });
          }
          // 清空ruleFormAdd 数据
            this.ruleFormAdd.resourcesId = ""; //主键
            this.ruleFormAdd.SerialNumber = ""; //设备编号
            this.ruleFormAdd.category = ""; //设备类型
            this.ruleFormAdd.type = ""; //设备型号
            this.ruleFormAdd.name = ""; //设备名称
            this.ruleFormAdd.problemdescription = ""; //问题描述
            this.ruleFormAdd.mainStatus = ""; //状态
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 添加维修任务
    AddTask() {
      if(this.ruleFormAdd.SerialNumber !="" && this.ruleFormAdd.problemdescription !=""){
        this.axios({
        method: "post",
        url: ResourceManagement.GET_O_insertEquipmentInfo,
        data: {
          facilityNum: this.ruleFormAdd.SerialNumber, //设备编号
          facilityName: this.ruleFormAdd.name, //设备名称
          facilityModel: this.ruleFormAdd.type, //设备型号
          workRemarks: this.ruleFormAdd.problemdescription, //问题描述
        },
      })
        .then((res) => {
          if(res.data.success){
            this.QueryTask();
          }else{
            this.$message({
              message: res.data.message,
              type: "warning",
              duration: 1500,
            });
          }
          // 清空ruleFormAdd 数据
            this.ruleFormAdd.resourcesId = ""; //主键
            this.ruleFormAdd.SerialNumber = ""; //设备编号
            this.ruleFormAdd.category = ""; //设备类型
            this.ruleFormAdd.type = ""; //设备型号
            this.ruleFormAdd.name = ""; //设备名称
            this.ruleFormAdd.problemdescription = ""; //问题描述
            this.ruleFormAdd.mainStatus = ""; //状态
        })
        .catch((error) => {
           console.log(error);
        });
      }else{
         this.$message({
          message: "请选择设备且填写问题描述",
          type: "warning",
          duration: 1500,
        });
      }
    },
    // 生成维修任务
    SubmiTask() {
      this.axios({
        method: "post",
        url: ResourceManagement.GET_O_updateEquipmentInfoStates,
        data: this.tableData,
      })
        .then((res) => {
           this.QueryTask();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 删除维修任务
    DeleteTask(row) {
      this.axios
        .get(ResourceManagement.GET_O_deleteEquipmentInfo, {
          params: {
            resourcesId: row.resourcesId,
          },
        })
        .then((res) => {
          this.QueryTask();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 维修显示
    ShowButton(row) {
      this.ButtonShow = false;
      this.ruleFormAdd.resourcesId = row.resourcesId; //主键
      this.ruleFormAdd.SerialNumber = row.facilityNum; //设备编号
      this.ruleFormAdd.category = row.mainType; //设备类型
      this.ruleFormAdd.type = row.facilityModel; //设备型号
      this.ruleFormAdd.name = row.facilityName; //设备名称
      this.ruleFormAdd.problemdescription = row.workRemarks; //问题描述
      this.ruleFormAdd.mainStatus = row.mainStatus; //状态
    },
    // 时间转换
    dateFormat(row, column, cellValue) {
      return cellValue ? fecha.format(new Date(cellValue), "yyyy-MM-dd") : "";
    },
  },
};
</script>

<style scoped>
.headerbotton {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
.headerbotton .el-button {
  width: 150px;
}
.el-tooltip__popper {
  font-size: 14px;
  max-width: 30%;
} /*设置显示隐藏部分内容，按30%显示*/
.demo-form-inline {
  height: 50px;
}
.Tooling_contnet {
  width: 100%;
}
.Tooling_contnet_table {
  height: 100%;
}
.AdvanElasticFrame_top {
  overflow: hidden;
}

.AdvanTesting {
  width: 280px;
  height: 40px;
  float: left;
  margin-left: 10px;
}
.AdvanTesting div {
  width: 160px;
  float: right;
}
.Advan {
  width: 570px;
  float: left;
  margin-left: 10px;
}
.Advan div {
  width: 450px;
  float: right;
}
.DetectPaging {
  height: 50px;
  margin-top: 5px;
}
/* form表单之间的间距样式 */
.dialog_footer {
  height: 30px;
  margin-top: 10px;
}
.dialog_Preservation {
  float: right;
  margin-right: 10px;
  margin-left: 0px;
}
.dialog_Close {
  float: right;
}

.Advan_operation_bnt {
  margin-right: 10px;
}

.Advan_contnet {
  width: 100%;
}
.Advan_contnet_table {
  padding: 0px 10px;
  height: 100%;
}
</style>
