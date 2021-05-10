import {
    modulesConfig
} from "./config"

/********集成模块 API*************/
export const Integration = {
    // 工具柜
    GET_A_selectAll: modulesConfig.Integration + '/tool/selectAll', // 查询
    // 物料呼叫 
    GET_B_getScrapWork: modulesConfig.Integration + '/smb/getScrapWork', // 呼叫
    // 通信导航 
    GET_B_CommunicationAndNavigation: modulesConfig.Integration + '/navigation/getNavigationInfo', // 查询
}

/********工艺规程 API*************/
export const ProcessSpecification = {
    ProcessList: modulesConfig.ProcessSpecification + '/basicInfo/getAllWorkFlow', //工艺规程查询数据
    PopUplist: modulesConfig.ProcessSpecification + '/basicInfo/getWorkFlowById', //工艺规程
    InstructionInformationList: modulesConfig.ProcessSpecification + '/basicInfo/getInstructByFlowId', //工艺规程
    DetailedInformation: modulesConfig.ProcessSpecification + '/basicInfo/getInstructDetail', //工艺规程  

    GET_A_findStation: modulesConfig.PlanningProduction + '/basicInfo/findStation', // 查询站位
    GET_A_findInstructByStation: modulesConfig.PlanningProduction + '/basicInfo/findInstructByStation', // 站位 查 指令
}

/********高级计划排产 API*************/
export const PlanningProduction = {

    //********工单生成*************
    GET_A_WorkOrderList: modulesConfig.PlanningProduction + '/mesTask/getAll', //工单生成列表、分页查询
    GET_A_TaskInformation: modulesConfig.PlanningProduction + '/mesTask/getMesTaskById', //工单生成弹窗查询
    GET_A_ProcessSpecificationList: modulesConfig.PlanningProduction + '/workDispatch/getAllWorkFlow', //工单生成弹窗列表工艺规格查询
    GET_A_CreateAPopUp: modulesConfig.PlanningProduction + '/workDispatch/getStation', //工单生成弹窗 创建
    GET_A_SaveStation: modulesConfig.PlanningProduction + '/workDispatch/insertWorkDispatch', //工单生成弹窗 创建保存站位

    //********生产任务 API*************/
    GET_B_TaskList: modulesConfig.PlanningProduction + '/mesTask/getAllMesTask', //生产任务查询 分页
    GET_B_Add: modulesConfig.PlanningProduction + '/mesTask/insertMesTask', //新增
    GET_B_Delete: modulesConfig.PlanningProduction + '/mesTask/deleteMesTask', //删除
    GET_B_Modify: modulesConfig.PlanningProduction + '/mesTask/updateMesTask', //修改
    GET_B_Submit: modulesConfig.PlanningProduction + '/mesTask/importMesTask', //导入

}
/********高级计划排产——自动排产 API*************/
export const AutomaticScheduling = {

    //********物料齐套性检查*************
    GET_A_Query: modulesConfig.AutomaticScheduling + '/plan/findAll', //查询
    GET_A_MissingParts: modulesConfig.AutomaticScheduling + '/plan/findStation', //缺件查看
    GET_A_Station: modulesConfig.AutomaticScheduling + '/plan/findMissing', //站位查看

    //********订单主界面*************
    GET_B_Query: modulesConfig.AutomaticScheduling + '/tdDMesTask/selectAll', //查询
    //********生产排产高级*************
    GET_C_Frequency: modulesConfig.AutomaticScheduling + '/tdDMesTask/selectRoster', //获取班次
    GET_C_Scheduling: modulesConfig.AutomaticScheduling + '/tdDMesTask/choose', //订单信息 
    GET_C_AutomaticProduction: modulesConfig.AutomaticScheduling + '/tdDMesTask/scheduling', // 自动排产
    GET_C_findAllMaterialInfos: modulesConfig.AutomaticScheduling + '/materialInfo/findAllMaterialInfo ', // 物料需求计划
    //********工艺配置************* 
    GET_D_ProcessConfiguration: modulesConfig.AutomaticScheduling + '/tdDMesTask/findWorkFlow', //工艺配置
    GET_D_AttributeAdjustment: modulesConfig.AutomaticScheduling + '/tdDMesTask/findStation', //属性调整
    GET_D_OAQuery: modulesConfig.AutomaticScheduling + '/tdDMesTask/findInstruct', //点击OA信息查询指令信息
    GET_D_InstructionInformation: modulesConfig.AutomaticScheduling + '/tdDMesTask/findInstructById', //点击指令信息查询详情
    // GET_D_InstructionSaving: modulesConfig.AutomaticScheduling + '/target/addTarget', //指令保存
    GET_D_TransferHours: modulesConfig.AutomaticScheduling + '/target/updateStation', //转移工时保存
    GET_D_Equipment: modulesConfig.AutomaticScheduling + '/target/findFacility', //设备信息
    GET_D_ToolingInformation: modulesConfig.AutomaticScheduling + '/target/findFrockInfo', //工装信息
    GET_D_InsertInformation: modulesConfig.AutomaticScheduling + '/target/findAssem', //装入件信息
    GET_D_ToolInformation: modulesConfig.AutomaticScheduling + '/target/findToolInfo', //工具信息
    GET_D_GaugeInformation: modulesConfig.AutomaticScheduling + '/target/findMeasuring', //量具信息
    GET_D_AuxiliaryMaterialInformation: modulesConfig.AutomaticScheduling + '/target/findAssist', //辅材信息
    GET_D_QueryEquipment: modulesConfig.AutomaticScheduling + '/target/findBasicFacility', //替换设备信息
    GET_D_PreservationEquipment: modulesConfig.AutomaticScheduling + '/target/add', //替换设备保存
    GET_D_SeeEquipmen: modulesConfig.AutomaticScheduling + '/target/findFacilityReplace', //替换设备保存
    // GET_D_DeleteDismantlingStation: modulesConfig.AutomaticScheduling + '/target/delTarget', //删除拆解站位
    GET_D_DeleteEquipment: modulesConfig.AutomaticScheduling + '/target/delFacilityReplace', //删除替换设备

    //********临时任务分派 API*************/
    GET_E_Query: modulesConfig.AutomaticScheduling + '/tdDTemporaryTask/selectAll', //查询
    GET_E_AddAndSav: modulesConfig.AutomaticScheduling + '/tdDTemporaryTask/insertTemporaryTask', //新增
    //********临时任务报工 API*************/
    GET_F_Query: modulesConfig.AutomaticScheduling + '/tdDTemporaryTask/findAll', //查询
    GET_F_Preservation: modulesConfig.AutomaticScheduling + '/tdDTemporaryTask/addreport', //保存
    //********工单状态调整 API*************/
    GET_J_Query: modulesConfig.AutomaticScheduling + '/releaseOrder/findOrder', //查询
    GET_J_QueryFrozen: modulesConfig.AutomaticScheduling + '/releaseOrder/findInstruction', //查询冻结信息
    GET_J_Frozen: modulesConfig.AutomaticScheduling + '/releaseOrder/pauseOrder', //冻结
    GET_J_QueryRelease: modulesConfig.AutomaticScheduling + '/releaseOrder/findInstruct', //查询释放信息
    GET_J_Release: modulesConfig.AutomaticScheduling + '/releaseOrder/releaseOrder', //释放
    //********生产准备反馈-设备 API*************/
    GET_K_Query: modulesConfig.AutomaticScheduling + '/ProductionPreFbkEqu/findAll', //查询
    GET_K_AddTo: modulesConfig.AutomaticScheduling + '/ProductionPreFbkEqu/change', //添加
    GET_K_Confirm: modulesConfig.AutomaticScheduling + '/ProductionPreFbkEqu/update', //确认  
    GET_K_QueryRemarks: modulesConfig.AutomaticScheduling + '/ProductionPreFbkEqu/chooseInfo', //查看备注信息
    GET_K_DeleteRemarks: modulesConfig.AutomaticScheduling + '/ProductionPreFbkEqu/delete', //删除备注信息
    GET_K_modifyRemarks: modulesConfig.AutomaticScheduling + '/ProductionPreFbkEqu/modifyRemarks', //修改备注信息
    //********生产准备反馈-工装 API*************/
    GET_L_Query: modulesConfig.AutomaticScheduling + '/ProductionPreFbkTool/findAll', //查询
    GET_L_AddTo: modulesConfig.AutomaticScheduling + '/ProductionPreFbkTool/change', //添加
    GET_L_Confirm: modulesConfig.AutomaticScheduling + '/ProductionPreFbkTool/update', //确认
    GET_L_ToolingInformation: modulesConfig.AutomaticScheduling + '/ProductionPreFbkTool/toolInfo', //工装信息
    GET_L_QueryRemarks: modulesConfig.AutomaticScheduling + '/ProductionPreFbkTool/chooseInfo', //查看备注信息 
    GET_L_DeleteRemarks: modulesConfig.AutomaticScheduling + '/ProductionPreFbkTool/delete', //删除备注信息
    GET_L_modifyRemarks: modulesConfig.AutomaticScheduling + '/ProductionPreFbkTool/modifyRemarks', //修改备注信息
    //********生产准备反馈 - 查看*************
    GET_Z_findMaterialProductList: modulesConfig.AutomaticScheduling + "/materialResult/findMaterialProductList", // 查看物料信息
    GET_Z_findMaterialResultList: modulesConfig.AutomaticScheduling + "/materialResult/findMaterialResultList", // 查看物料 - 详细信息
    GET_Z_findEqu: modulesConfig.AutomaticScheduling + "/tdDProductionPreView/findAllEqu", // 查看设备信息
    GET_Z_findEquInfo: modulesConfig.AutomaticScheduling + "/tdDProductionPreView/findEqu", // 查看设备 - 详细信息
    GET_Z_findTool: modulesConfig.AutomaticScheduling + "/tdDProductionPreView/findAllTool", // 查看工装信息
    GET_Z_findToolInfo: modulesConfig.AutomaticScheduling + "/tdDProductionPreView/findTool", // 查看工装 - 详细信息
    GET_Z_findResultToolsInfo: modulesConfig.AutomaticScheduling + "/toolsResult/findResultToolsInfo", // 查看工量具信息
    GET_Z_findResultUserTools: modulesConfig.AutomaticScheduling + "/toolsResult/findResultUserTools", // 查看工量具 - 详细信息

    //********生产准备反馈 - 物料*************
    GET_X_findAll: modulesConfig.AutomaticScheduling + "/materialResult/findAll", // 查询
    GET_X_insertFeedBack: modulesConfig.AutomaticScheduling + "/materialResult/insertFeedBack", // 添加
    GET_X_findAllBackInfo: modulesConfig.AutomaticScheduling + "/materialResult/findAllBackInfo", // 查询
    GET_X_updateBackInfo: modulesConfig.AutomaticScheduling + "/materialResult/updateBackInfo", // 确定
    GET_X_deleteInfo: modulesConfig.AutomaticScheduling + '/materialResult/deleteInfo', //删除
    GET_X_updateBackInfoRemakrs: modulesConfig.AutomaticScheduling + '/materialResult/updateBackInfoRemakrs', //修改

    //********生产准备反馈 - 工量具*************
    GET_V_findToolsAll: modulesConfig.AutomaticScheduling + "/toolsResult/findToolsAll", // 查询
    GET_V_findToolsInfo: modulesConfig.AutomaticScheduling + "/toolsResult/findToolsInfo", // 工量具使用信息-查询
    GET_V_updateRemarks: modulesConfig.AutomaticScheduling + "/toolsResult/updateRemarks", // 添加  
    GET_V_findResultBackToolsInfo: modulesConfig.AutomaticScheduling + "/toolsResult/findResultBackToolsInfo", // 添加 - 查询
    GET_V_updateResultsFeedback: modulesConfig.AutomaticScheduling + "/toolsResult/updateResultsFeedback", // 确定
    GET_V_deleteInfo: modulesConfig.AutomaticScheduling + '/toolsResult/deleteInfo', //删除
    GET_V_updateRemakrs: modulesConfig.AutomaticScheduling + '/toolsResult/updateByRemakrs', //修改

    //********检验任务分派*************
    GET_U_findAllTask: modulesConfig.AutomaticScheduling + "/materialResult/findAllTask", // 查询
    GET_U_updateCheckUser: modulesConfig.AutomaticScheduling + "/materialResult/updateCheckUser", // 确定
    GET_U_selectUserByRoleName: modulesConfig.AutomaticScheduling + "/materialResult/selectUserByRoleName", // 确定

    //********排产结果输出*************
    GET_V_findAllTask: modulesConfig.AutomaticScheduling + "/tdDMesTask/findAllPlan", // 查询
    GET_V_monthReplant: modulesConfig.AutomaticScheduling + "/tdDMesTask/monthReplant", // 调整
    GET_V_RollingProductionSchedulingConfirmation: modulesConfig.AutomaticScheduling + "/weekPlan/makeWeekPlan", //滚动排产确认

    // 输出结果下发  
    // 主   
    GET_Q_find: modulesConfig.AutomaticScheduling + "/regenerate/find", // 查询
    GET_Q_findByMonthPlanId: modulesConfig.AutomaticScheduling + "/regenerate/findByMonthPlanId", // 查看
    GET_Q_updateMonthPlan: modulesConfig.AutomaticScheduling + "/regenerate/updateMonthPlan", // 修改
    GET_Q_issued: modulesConfig.AutomaticScheduling + "/regenerate/issued", // 下发

    // 详细界面  
    GET_Q_findAllPlan: modulesConfig.AutomaticScheduling + "/regenerate/findAllPlan", // 查询 
    GET_Q_addMonthPlan: modulesConfig.AutomaticScheduling + "/regenerate/addMonthPlan", // 确定
    GET_Q_findUser: modulesConfig.AutomaticScheduling + "/regenerate/findUser", // 负责人

    // 流程  
    GET_Q_monthAgree: modulesConfig.AutomaticScheduling + "/regenerate/monthAgree", // 批准 
    GET_Q_monthDisagree: modulesConfig.AutomaticScheduling + "/regenerate/monthDisagree", // 驳回 
    GET_Q_findByLogUser: modulesConfig.AutomaticScheduling + "/regenerate/findByLogUser", // 站位长 查询
    GET_Q_StationReceiving: modulesConfig.AutomaticScheduling + "/regenerate/StationReceiving", // 站位长 接收

    //甘特图
    GET_O_Query: modulesConfig.AutomaticScheduling + "/monthPlanGantt/threeLevelMonthPlan", // 查询
    GET_O_JumpQuery: modulesConfig.AutomaticScheduling + "/monthPlanGantt/getPlanInstructByMonthPlanId", // 甘特图点击跳转查询
    
    //周计划展示
    GET_O_weekFind: modulesConfig.AutomaticScheduling + "/weekPlan/weekFind", // 周计划展示
    //周计划下发
    GET_O_weekIssued: modulesConfig.AutomaticScheduling + "/weekPlan/weekIssued", // 周计划展示
    // 周计划展示内容回显
    GET_O_findByWeekPlanId: modulesConfig.AutomaticScheduling + "/weekPlan/findByWeekPlanId", // 周计划展示内容回显
    // 周计划展示内容增加**
    GET_O_addWeekPlan: modulesConfig.AutomaticScheduling + "/weekPlan/addWeekPlan", // 周计划展示内容增加**updateWeekPlan
    // 周计划展示内容修改**
    GET_O_updateWeekPlan: modulesConfig.AutomaticScheduling + "/weekPlan/updateWeekPlan", // 周计划展示内容修改**
    // 排产结果查询打包周计划
    GET_O_findAllWeekPlan: modulesConfig.AutomaticScheduling + "/weekPlan/findAllWeekPlan", // 排产结果查询打包周计划
    //周计划流程审批同意**
    GET_O_weekAgree: modulesConfig.AutomaticScheduling + "/weekPlan/weekAgree", // 周计划流程审批同意
     //周计划流程审批驳回**
    GET_O_weekDisagree: modulesConfig.AutomaticScheduling + "/weekPlan/weekDisagree", // 周计划流程驳回同意

    //周计划条件查询
    GET_O_weekFindday: modulesConfig.AutomaticScheduling + "/dayPlan/weekFind", //周计划条件查询
     //日计划添加
    GET_O_addDayIssued: modulesConfig.AutomaticScheduling + "/dayPlan/addDayIssued",  //日计划添加
    //日计划删除
    GET_O_deleteDayIssued: modulesConfig.AutomaticScheduling + "/dayPlan/deleteDayIssued",  //日计划删除
    //日计划删除
    GET_O_dayFind: modulesConfig.AutomaticScheduling + "/dayPlan/dayFind",  //日计划删除
    //日计划下发
    GET_O_dayIssued: modulesConfig.AutomaticScheduling + "/dayPlan/dayIssued",  //日计划下发

    // ********************生产反馈信息****************
    GET_P_findStuffFeedbackInfo: modulesConfig.AutomaticScheduling + "/plan/findStuffFeedbackInfo",  //物料
    GET_P_findFacilityFeedbackInfo: modulesConfig.AutomaticScheduling + "/plan/findFacilityFeedbackInfo",  //设备
    GET_P_findFrockFeedbackInfo: modulesConfig.AutomaticScheduling + "/plan/findFrockFeedbackInfo",  //工装
    GET_P_findToolFeedbackInfo: modulesConfig.AutomaticScheduling + "/plan/findToolFeedbackInfo",  //工量具
}
 
/********基础数据 工装界面 API*************/ 
export const BasicData = {

    // 工装界面****************
    GET_A_AddAndSave: modulesConfig.BasicData + '/basicData/addData', //新增保存
    GET_A_Query: modulesConfig.BasicData + '/basicData/findAll', //查询
    GET_A_See: modulesConfig.BasicData + '/basicData/findById', //查看
    GET_A_Modify: modulesConfig.BasicData + '/basicData/updateData', //修改
    GET_A_Import: modulesConfig.BasicData + '/basicData/importBasicData', //导入
    GET_A_AddSave: modulesConfig.BasicData + '/file/fileUpload', //上传
    GET_A_AddArr: modulesConfig.BasicData + '/file/findAllFile', //获取上传文件信息
    GET_A_DeleteFile: modulesConfig.BasicData + '/file/delFileUpload', //删除文档

    //工具界面**************
    GET_B_Query: modulesConfig.BasicData + '/basicTool/findAll', //查询
    GET_B_AddAndSave: modulesConfig.BasicData + '/basicTool/addTool', //新增
    GET_B_Modify: modulesConfig.BasicData + '/basicTool/updateTool', //修改

    //物料信息**************
    GET_C_Query: modulesConfig.BasicData + '/basicMaterials/findAll', //查询
    GET_C_AddAndSave: modulesConfig.BasicData + '/basicMaterials/addMaterials', //新增
    GET_C_Import: modulesConfig.BasicData + '/basicMaterials/importMaterials', //导入

    //设备信息**************
    GET_D_Query: modulesConfig.BasicData + '/basicFacility/findAll', //查询
    GET_D_AddAndSave: modulesConfig.BasicData + '/basicFacility/addFacility', //新增
    GET_D_Modify: modulesConfig.BasicData + '/basicFacility/updateFacility', //修改
    GET_D_Import: modulesConfig.BasicData + '/basicFacility/importFacility', //导入
    GET_D_DocumentAddSave: modulesConfig.BasicData + '/file/fileUpload', //文档上传
    GET_D_QueryFile: modulesConfig.BasicData + '/file/findAllFile', //查询文档
    GET_D_DeleteFile: modulesConfig.BasicData + '/file/delFileUpload', //删除文档

    //BOM信息**************
    GET_E_Query: modulesConfig.BasicData + '/bom/findBom', //查询
    GET_E_JumpQuery: modulesConfig.BasicData + '/bom/findBomById', //跳转查询
    GET_E_ClickQuery: modulesConfig.BasicData + '/bom/findById', //点击查询

    //设备维保基准保护**************
    GET_F_QueryBasicData: modulesConfig.BasicData + '/basicFacility/findAll', //查询设备信息
    GET_F_AddAndSave: modulesConfig.BasicData + '/maintain/addMaintain', //新增保存
    GET_F_QueryMaintenance: modulesConfig.BasicData + '/maintain/findAllMaintain', //查询设备维保全部信息
    GET_F_See: modulesConfig.BasicData + '/maintain/findMaintainById', //查询设备维保全部信息

    //制造日历**************
    GET_J_Query: modulesConfig.BasicData + '/holiday/findAllHoliday', //查询
    GET_J_AddAndSave: modulesConfig.BasicData + '/holiday/addHoliday', //新增日历
    GET_J_WorkOvertime: modulesConfig.BasicData + '/roster/addRosterWork', //加班方式
    GET_J_RosterWork: modulesConfig.BasicData + '/roster/findRosterWork', //加班回显
    GET_J_Modify: modulesConfig.BasicData + '/holiday/updateHoliday', //修改
    GET_J_Delete: modulesConfig.BasicData + '/holiday/delHoliday', //删除

    //班次**************
    GET_H_Query: modulesConfig.BasicData + '/roster/findAllRoster', //查询
    GET_H_AddAndSave: modulesConfig.BasicData + '/roster/addRoster', //新增日历
    GET_H_Delete: modulesConfig.BasicData + '/roster/delRoster', //删除
    GET_H_updateRosterWork: modulesConfig.BasicData + "/roster/updateRosterWork", // 使用当前班次

    //大修年限配置**************
    GET_Y_Query: modulesConfig.BasicData + '/equipment/findEquipment', //查询
    GET_Y_AddAndSave: modulesConfig.BasicData + '/equipment/add', //新增
    GET_Y_UpdateAndSave: modulesConfig.BasicData + '/equipment/updateById', //修改  
    GET_Y_Look: modulesConfig.BasicData + '/equipment/findById', //查看
    GET_Y_findByEquType: modulesConfig.BasicData + '/basicFacility/findByEquType', // 查询设备类型下的设备型号

    //维修文档**************
    GET_K_Query: modulesConfig.BasicData + '/repairFile/findAll', //查询
    GET_K_AddAndSave: modulesConfig.BasicData + '/repairFile/add', //新增
    GET_K_UpdateAndSave: modulesConfig.BasicData + '/repairFile/update', //修改
    GET_K_Del: modulesConfig.BasicData + '/repairFile/del', //删除
    GET_K_findFacilityType: modulesConfig.BasicData + '/repairFile/findFacilityType', //适用设备类型
    GET_K_findFacilityName: modulesConfig.BasicData + '/repairFile/findFacilityName', //适用设备

    //高级排产——物料需求计划**************
    GET_L_Query: modulesConfig.BasicData + '/basicMaterials/findAll', //查询
    //高级排产——设备信息**************
    GET_M_Query: modulesConfig.BasicData + '/basicFacility/findAll', //查询
    //高级排产——工装信息**************
    GET_N_Query: modulesConfig.BasicData + '/basicData/findAll', //查询

    //库位维护**************
    GET_Z_findAllWarehouse: modulesConfig.BasicData + "/dropdownWarehouse/findAllWarehouse", // 库房查询     
    GET_Z_addWarehouse: modulesConfig.BasicData + "/dropdownWarehouse/addWarehouse", // 库房新增
    GET_Z_deleteWarehouse: modulesConfig.BasicData + "/dropdownWarehouse/deleteWarehouse", // 库房删除
    GET_Z_findAllLocation: modulesConfig.BasicData + "/dropdownLocation/findAllLocation", // 库位查询
    GET_Z_addLocation: modulesConfig.BasicData + "/dropdownLocation/addLocation", // 库位新增
    GET_Z_deleteLocation: modulesConfig.BasicData + "/dropdownLocation/deleteLocation", // 库位删除
    GET_Z_selectAllLocation: modulesConfig.BasicData + "/dropdownLocation/selectAllLocation", // 查询所有库位

    //设备、工装、工量具状态维护 --- (maintainStatus状态：1.设备 2.工具 3.工量具 4.所属产线 5.工装种类 6.冻结原因 7.释放原因 8.故障代码 9.异常类型 10.工具种类  11.责任单位) **************
    GET_V_findAllByFlag: modulesConfig.BasicData + "/dropdownMaintain/findAllByFlag", // 查询
    GET_V_addMaintain: modulesConfig.BasicData + "/dropdownMaintain/addMaintain", // 新增
    GET_V_deleteMaintain: modulesConfig.BasicData + "/dropdownMaintain/deleteMaintain", // 删除

    //人员站位维护**************
    GET_U_selectPersonInfo: modulesConfig.BasicData + "/personStation/selectPersonInfo", //查询
    GET_U_addPersonInfo: modulesConfig.BasicData + "/personStation/addPersonInfo", //选中
    GET_U_selectByStation: modulesConfig.BasicData + "/personStation/selectByStation", // 查看
    GET_U_deletePersonInfo: modulesConfig.BasicData + "/personStation/deletePersonInfo", // 取消  
    GET_U_selectUserInfo: modulesConfig.BasicData + "/personStation/selectUserInfo", // 左查询组织机构人员
    GET_U_selectAllUserInfo: modulesConfig.BasicData + "/personStation/selectAllUserInfo", // 左查询全部人员
    GET_U_selectDepartmentInfo: modulesConfig.BasicData + "/personStation/selectDepartmentInfo", // 获取组织机构下拉框

    //人员资质维护**************
    GET_T_selectQualificaInfo: modulesConfig.BasicData + "/personQualifica/selectQualificaInfo", //查询
    GET_T_selectByUser: modulesConfig.BasicData + "/personQualifica/selectByUser", // 查看
    GET_T_deletePersonInfo: modulesConfig.BasicData + "/personQualifica/deletePersonInfo", // 取消
    GET_T_selectQualificaList: modulesConfig.BasicData + "/personQualifica/selectAllQualifica", // 左查询  
    GET_T_updateQualificaInfo: modulesConfig.BasicData + "/personQualifica/updateQualificaInfo", // 选中

    // 角色接口  
    GET_W_findByStationAndRole: modulesConfig.BasicData + "/personStation/findByStationAndRole", // 查询
    GET_W_selectUserByStationAndRole: modulesConfig.BasicData + "/personStation/selectUserByStationAndRole", // 查询

    // 备件基础信息
    GET_Q_findAll: modulesConfig.BasicData + "/spare/findAll", //查询
    GET_Q_addSpare: modulesConfig.BasicData + "/spare/addSpare", //新增
    GET_Q_updateSpare: modulesConfig.BasicData + "/spare/updateSpare", //修改

     // 物料基础信息
     GET_Y_findAllStuff: modulesConfig.BasicData + "/stuff/findAllStuff", //查询
     GET_Y_addStuff: modulesConfig.BasicData + "/stuff/addStuff", //新增
     GET_Y_updateStuff: modulesConfig.BasicData + "/stuff/updateStuff", //修改
     GET_Y_deleteStuff: modulesConfig.BasicData + "/stuff/deleteStuff", //删除

    //工艺编制
    GET_P_ProcessPlanningQuery: modulesConfig.BasicData + "/workFlow/getWorkFlowPage", //工艺编制查询
    GET_P_ProcessPlanningNewlyAdded: modulesConfig.BasicData + "/workFlow/addWorkFlow", //工艺编制新增保存
    GET_P_SiteTechnologyQuery: modulesConfig.BasicData + "/station/getStationList", //添加站位工艺查询
    GET_P_SiteTechnologyNewlyAdded: modulesConfig.BasicData + "/station/addStation", //添加站位工艺新增保存
    GET_P_InstructionEditingQuery: modulesConfig.BasicData + "/dInstruct/getTdDInstructPage", //指令编辑查询
    GET_P_InstructionEditingNewlyAdded: modulesConfig.BasicData + "/dInstruct/addDInstruct", //指令编辑新增保存
    GET_P_InstructionEditingModifyAndSave: modulesConfig.BasicData + "/dInstruct/updateInstruct", //指令编辑修改保存
    GET_P_InstructionEditingModifyDelete: modulesConfig.BasicData + "/dInstruct/delInstruct", //指令编辑删除
    GET_P_WorkingProcedureQuery: modulesConfig.BasicData + "/dWorkStep/getDWorkStepPage", //查询工序内容
    GET_P_WorkingProcedureNewlyAdded: modulesConfig.BasicData + "/dWorkStep/addDWorkStep", //工序新增保存
    GET_P_WorkingProcedureModify: modulesConfig.BasicData + "/dWorkStep/updateDWorkStep", //工序修改保存
    GET_P_WorkingProcedureDelete: modulesConfig.BasicData + "/dWorkStep/delWordStepById", //工序删除
    GET_P_PesourcesEquipmentQuery: modulesConfig.BasicData + "/instructToolInfo/findFacilityListByInstructId", //资源查询新增设备信息
    GET_P_PesourcesEquipmentQueryWhole: modulesConfig.BasicData + "/instructToolInfo/findBasicFacilityPageByInstructId", //资源查询所有设备信息
    GET_P_PesourcesEquipmentQueryConfirm: modulesConfig.BasicData + "/instructToolInfo/addFacility", //资源查询所有设备信息勾选确认
    GET_P_PesourcesEquipmentDelete: modulesConfig.BasicData + "/instructToolInfo/delFacilityById", //资源设备删除
    GET_P_AccessoriesQuery: modulesConfig.BasicData + "/instructToolInfo/findAssemProductListByInstructId", //查询添加完后配件信息
    GET_P_AccessoriesQueryWhole: modulesConfig.BasicData + "/stuff/findAllStuff", //查询所有配件信息
    GET_P_AccessoriesQueryConfirm: modulesConfig.BasicData + "/instructToolInfo/addAssemProduct", //新增配件信息
    GET_P_AccessoriesQueryDelete: modulesConfig.BasicData + "/instructToolInfo/delAssemProductById", //删除配件信息
    GET_P_MeasuringToolsQuery: modulesConfig.BasicData + "/instructToolInfo/findToolInfoListByInstructId", //查询添加后工量具信息
    GET_P_MeasuringToolsQueryWhole: modulesConfig.BasicData + "/basicTool/findAll", //查询所有工量具信息
    GET_P_MeasuringToolsConfirm: modulesConfig.BasicData + "/instructToolInfo/addToolInfo", //工量具确认
    GET_P_MeasuringToolsDelete: modulesConfig.BasicData + "/instructToolInfo/delToolInfoById", //工量具删除
    GET_P_WorkClothesQuery: modulesConfig.BasicData + "/instructToolInfo/findFrockInfoListByInstructId", //查询工装添加后的信息
    GET_P_WorkClothesQueryWhole: modulesConfig.BasicData + "/basicData/findAll", //查询所有的工装信息
    GET_P_WorkClothesQueryConfirm: modulesConfig.BasicData + "/instructToolInfo/addFrockInfo", //工装确认
    GET_P_WorkClothesQueryDelete: modulesConfig.BasicData + "/instructToolInfo/delFrockInfoById", //工装删除
    GET_P_AuxiliaryMaterialsQuery: modulesConfig.BasicData + "/instructToolInfo/findAssistByInstructId", //查询添加后辅材信息
    GET_P_AuxiliaryMaterialsQueryWhole: modulesConfig.BasicData + "/instructToolInfo/findAssitStuff", //查询全部辅材信息
    GET_P_AuxiliaryMaterialsConfirm: modulesConfig.BasicData + "/instructToolInfo/addAssist", //辅材确认信息
    GET_P_AuxiliaryMaterialsDelete: modulesConfig.BasicData + "/instructToolInfo/delAssistById", //辅材删除
    GET_P_AttributeQuery: modulesConfig.BasicData + "/instructToolInfo/getInstructAndQualifyByInstructId", //属性信息
    GET_P_AttributeConfirm: modulesConfig.BasicData + "/instructToolInfo/addInstructQualifications", //新增保存资质
    GET_P_AttributeDelete: modulesConfig.BasicData + "/instructToolInfo/delInstructQualificationsById", //删除资质
    GET_P_SaveNewAttributeConfirm: modulesConfig.BasicData + "/instructToolInfo/updateInstructById", //属性保存
}

/********站位内调度管理-MOM  API*************/
export const dispatchingManagement = {
    //********派工调整 API*************/
    GET_A_findWorkList: modulesConfig.MOMStationScheduling + '/dispatch/findWorkDispatch', //工单信息列表
    GET_A_findInstructList: modulesConfig.MOMStationScheduling + '/dispatch/findInstruct', //派工列表
    GET_A_findDispatchSearch: modulesConfig.MOMStationScheduling + '/dispatch/findDispatch', //字段渲染
    GET_A_addDispatchInfo: modulesConfig.MOMStationScheduling + '/dispatch/addDispatchInfo', //派工
    GET_A_updatePerson: modulesConfig.MOMStationScheduling + '/dispatch/updatePerson', //改派人员保存

    GET_B_getWorkList: modulesConfig.MOMStationScheduling + '/dispatch/getWorkDismantling', // 查询列表
    GET_B_getInstructionInfo: modulesConfig.MOMStationScheduling + '/dispatch/getInstructionInfo', // 查询可拆解指令
    GET_B_getStationByWorkId: modulesConfig.MOMStationScheduling + '/dispatch/getStationByWorkId', // 查询当前工单下所有站位
    GET_B_getInstructionById: modulesConfig.MOMStationScheduling + '/dispatch/getInstructionById', // 查询当前站位下所有指令
    GET_B_updateInstructionById: modulesConfig.MOMStationScheduling + '/dispatch/updateInstructionById', // 更新派工指令

    //********线边库入库 API*************/
    GET_C_getMaterialList: modulesConfig.MOMStationScheduling + "/material/getMaterialList", // 入库后查询列表
    GET_C_addMaterial: modulesConfig.MOMStationScheduling + "/material/addMaterial", // 入库
    GET_C_getLocationInfo: modulesConfig.MOMStationScheduling + "/material/getLocationInfo", // 查询库位信息
    GET_C_getMaterialInfo: modulesConfig.MOMStationScheduling + "/material/getMaterialInfo", // 解析二维码

    //********线边库出库 API*************/
    GET_D_getMaterialOutList: modulesConfig.MOMStationScheduling + "/material/getMaterialOutList", // 查询列表
    GET_D_addMaterialOut: modulesConfig.MOMStationScheduling + "/material/addMaterialOut", // 出库

    //********线边库台账 API*************/
    GET_E_getMaterialOutList: modulesConfig.MOMStationScheduling + "/material/getMaterialInfoList", // 查询列表

    //********线边库盘点 API*************/
    GET_F_getCheckMaterialList: modulesConfig.MOMStationScheduling + '/checkMaterial/getCheckMaterial', // 查询列表
    GET_F_addCheckMaterial: modulesConfig.MOMStationScheduling + '/checkMaterial/addCheckMaterial', // 新增盘点
    GET_F_getCheckMaterialDetail: modulesConfig.MOMStationScheduling + '/checkMaterial/getCheckMaterialDetail', // 盘点详情查询
    GET_F_updateCheckMaterialNum: modulesConfig.MOMStationScheduling + '/checkMaterial/updateCheckMaterialNum', // 盘点详情 - 保存
    GET_F_updateMaterialInfo: modulesConfig.MOMStationScheduling + '/checkMaterial/updateCheckMaterialInfo', // 盘点详情 - 提交
    GET_F_getCheckMaterialRecord: modulesConfig.MOMStationScheduling + '/checkMaterial/getCheckMaterialRecord', // 盘点记录查看

    //********装配过程追踪 API*************/
    GET_J_Queryt: modulesConfig.MOMStationScheduling + '/process/findProcess', //工单信息列表
    GET_J_QuerytAssemblyInformation: modulesConfig.MOMStationScheduling + '/process/findInstruction', //查看
    GET_J_QueryInsert: modulesConfig.MOMStationScheduling + '/process/findAssemById', //装入件信息
    GET_J_QueryAssemblyInformatio: modulesConfig.MOMStationScheduling + '/process/findMesTask', //装入件信息
    GET_J_findReport: modulesConfig.MOMStationScheduling + '/process/findReport', //报工信息

    //********站位交接 API*************/
    GET_K_Queryt: modulesConfig.MOMStationScheduling + '/handover/findFinishStation', // 查询列表
    GET_K_Transfer: modulesConfig.MOMStationScheduling + '/handover/findById', // 查询移交数据
    GET_K_TransferAndPreservation: modulesConfig.MOMStationScheduling + '/handover/updateById', // 移交保存提交
    GET_K_RecordQuery: modulesConfig.MOMStationScheduling + '/handover/selectHistory', // 站位交接记录查询
    GET_K_selectInstructInfo: modulesConfig.MOMStationScheduling + "/handover/selectInstructInfo", // 拆解指令信息
    GET_K_selectQualityInfo: modulesConfig.MOMStationScheduling + "/handover/selectQualityInfo", // 站位指令信息

    //********外协转出转入 API*************/
    GET_L_Queryt: modulesConfig.MOMStationScheduling + '/outSourcing/findOut', // 查询列表
    GET_L_TransferOutConfirmation: modulesConfig.MOMStationScheduling + '/outSourcing/outSourcing', // 转出确认
    GET_L_ToChangeInto: modulesConfig.MOMStationScheduling + '/outSourcing/inSourcing', // 转入确认

    //********线边库-库存调整 API*************/
    GET_Z_getCheckMaterial: modulesConfig.MOMStationScheduling + "/material/getCheckMaterial", // 查询列表
    GET_Z_getCheckMaterialDetail: modulesConfig.MOMStationScheduling + "/material/getCheckMaterialDetail", // 库存调整详情页面查询
    GET_Z_updateSureMaterialInfo: modulesConfig.MOMStationScheduling + "/material/updateSureMaterialInfo", // 确定

    //********线边库-分拣 API*************/
    GET_Y_showWorkOderList: modulesConfig.MOMStationScheduling + "/workOrder/showWorkOderList", // 查询列表
    GET_Y_showWorkOderSorting: modulesConfig.MOMStationScheduling + "/workOrder/showWorkOderSorting", // 详细信息 查询列表
    GET_Y_updateSubtractStock: modulesConfig.MOMStationScheduling + "/workOrder/updateSubtractStock", // 详细信息 - 刷卡
    GET_Y_updateSureMaterialInfo: modulesConfig.MOMStationScheduling + "/workOrder/updateSureMaterialInfo", // 修改配套数量 - 确定
    GET_Y_showWorkOderSortingCopy: modulesConfig.MOMStationScheduling + "/workOrder/showWorkOderSortingCopy", // 复制
    GET_Y_deleteStock: modulesConfig.MOMStationScheduling + "/workOrder/deleteStock", // 删除

    //********拆解审批 API*************//  
    GET_X_findAllQuery: modulesConfig.MOMStationScheduling + "/disassemblyApply/findAll", //拆解审批-查询
    GET_X_findAllRemarks: modulesConfig.MOMStationScheduling + "/disassemblyApply/findAllRemarks", //拆解审批-查询备注
    GET_X_addRemarks: modulesConfig.MOMStationScheduling + "/disassemblyApply/addRemarks", //拆解审批-添加备注
    GET_X_delete: modulesConfig.MOMStationScheduling + "/disassemblyApply/delete", //拆解审批-删除
    GET_X_updateRemarks: modulesConfig.MOMStationScheduling + "/disassemblyApply/updateRemarks", //拆解审批- 修改
    GET_X_disassemblyApply: modulesConfig.MOMStationScheduling + "/disassemblyApply/disassemblyApply", //拆解审批- 拆解申请

    //********工单拆解 API*************//
    GET_W_findAllQuery: modulesConfig.MOMStationScheduling + "/disassembly/findAll", //工单拆解-查询
    GET_W_findAllStation: modulesConfig.MOMStationScheduling + "/disassembly/findAllStation", //工单拆解-查询站位
    GET_W_findAllInstruct: modulesConfig.MOMStationScheduling + "/disassembly/findAllInstruct", //工单拆解-查询站位下的指令
    GET_W_updateInstruct: modulesConfig.MOMStationScheduling + "/disassembly/updateInstruct", //工单拆解-拆解完成后保存指令
    GET_W_backInstruct: modulesConfig.MOMStationScheduling + "/disassembly/backInstruct", //工单拆解-退回

    //********拆解确认 API*************//
    GET_V_findAllQuery: modulesConfig.MOMStationScheduling + "/approval/findAll", //拆解确认-查询
    GET_V_agreeApproval: modulesConfig.MOMStationScheduling + "/approval/agreeApproval", //拆解确认-同意
    GET_V_backApproval: modulesConfig.MOMStationScheduling + "/approval/backApproval", //拆解确认-退回

    //********多次拆解 API*************//
    GET_T_multipleDisassembly: modulesConfig.MOMStationScheduling + "/disassemblyApply/multipleDisassembly", //多次拆解-查询
    GET_T_multipleDisassemblyConfirm: modulesConfig.MOMStationScheduling + "/disassemblyApply/multipleDisassemblyConfirm", //拆解申请

    //********盘点审批 API*************//
    GET_U_getSubmitInventoryMaterialInfo: modulesConfig.MOMStationScheduling + "/checkMaterial/getSubmitInventoryMaterialInfo", //盘点审批-查询
    GET_U_getSubmitAllMaterialInfo: modulesConfig.MOMStationScheduling + "/checkMaterial/getSubmitAllMaterialInfo", //盘点审批-详细信息
    GET_U_updateMaterialInfoStatus: modulesConfig.MOMStationScheduling + "/checkMaterial/updateMaterialInfoStatus", //盘点审批- 审核
    GET_U_updateMaterialInfoRebutStatus: modulesConfig.MOMStationScheduling + "/checkMaterial/updateMaterialInfoRebutStatus", //盘点审批- 驳回

    // 备件出库
    GET_U_getSpareOutList: modulesConfig.MOMStationScheduling + "/spareOut/getSpareOutList", // 查询
    GET_U_addSpareOut: modulesConfig.MOMStationScheduling + "/spareOut/addSpareOut", // 出库
   
}

/********装配执行管理-MOM   API*************/
export const AssemblyPerform = {
    //********飞机总装报工界面-工人接收 API*************/
    GET_A_findWorkLists: modulesConfig.MOMAssemblyExecution + '/work/findWork', //工人接收列表及查询
    GET_A_findWordStep: modulesConfig.MOMAssemblyExecution + '/receive/findWordStep', //工人报工列表
    GET_A_startWordStep: modulesConfig.MOMAssemblyExecution + '/receive/startWordStep', //工人报工-开工
    GET_A_stop: modulesConfig.MOMAssemblyExecution + '/instructionStop/stop', //工人报工-暂停
    GET_A_start: modulesConfig.MOMAssemblyExecution + '/instructionStop/start', //工人报工-释放
    GET_A_workExamineFinish: modulesConfig.MOMAssemblyExecution + '/work/finish', //工人报工-工检/work/updateFinishWork
    GET_A_updateFinishWork: modulesConfig.MOMAssemblyExecution + '/work/updateFinishWork', //工人报工-工检、互检、用户代表
    GET_A_findTableName: modulesConfig.MOMAssemblyExecution + '/qualpara/findTableName', //质量参数-表名称
    GET_A_findTable: modulesConfig.MOMAssemblyExecution + '/qualpara/findTable', //质量参数-表名称详细展示
    GET_A_addColum: modulesConfig.MOMAssemblyExecution + '/qualpara/addColum', //质量参数-保存
    GET_A_findBy: modulesConfig.MOMAssemblyExecution + '/abnormal/findBy', //质量异常 - 工序装入件渲染
    GET_A_findNumber: modulesConfig.MOMAssemblyExecution + '/abnormal/findNumber', //质量异常 - 产品序号渲染
    GET_A_preservation: modulesConfig.MOMAssemblyExecution + '/abnormal/add', //质量异常 - 保存
    GET_A_QueryQualityRecordSheet: modulesConfig.MOMAssemblyExecution + '/abnormal/findQuality', //质量异常 - 查询质量记载单
    GET_A_DeleteQualityRecordSheet: modulesConfig.MOMAssemblyExecution + '/abnormal/del', //质量异常 - 删除质量记载单
    GET_A_viewQualityRecordShee: modulesConfig.MOMAssemblyExecution + '/abnormal/findByAbnormalNum', //质量异常 - 查看质量记载单
    GET_A_Submit: modulesConfig.MOMAssemblyExecution + '/abnormal/commitAbnormal', //质量异常 - 提交质量记载单
    GET_A_TheWhole: modulesConfig.MOMAssemblyExecution + '/abnormal/findWorkFlow', //质量异常 - 整机异常
    GET_A_AbnormalMaterial: modulesConfig.MOMAssemblyExecution + '/abnormal/findAll', //呼叫物料 - 异常物料
    GET_A_findWorkerFinish: modulesConfig.MOMAssemblyExecution + '/receive/findWorkerFinish', //点击工步、回显工人报工-工检、互检、用户代表
    GET_A_findAllChangeOrder: modulesConfig.MOMAssemblyExecution + '/changeOrder/findAllChangeOrder', //工艺更改单
    GET_A_uploadFileAss: modulesConfig.MOMAssemblyExecution + '/workFile/uploadFile', // 上传附件
    GET_A_findFileAss: modulesConfig.MOMAssemblyExecution + '/workFile/findFile', // 查询附件
    GET_A_delFileAss: modulesConfig.MOMAssemblyExecution + '/workFile/delFile', // 删除附件
    GET_A_findHasChangeOrder: modulesConfig.MOMAssemblyExecution + '/changeOrder/findHasChangeOrder', // 控制工艺更改按钮 

    ////********飞机总装报工界面-物料确认 API*************/
    GET_B_Query: modulesConfig.MOMAssemblyExecution + '/confirm/findMaterial', //物料查询
    GET_B_materialConfirm: modulesConfig.MOMAssemblyExecution + '/confirm/materialConfirm', //物料确认
    GET_B_getMaterialCode: modulesConfig.MOMAssemblyExecution + '/confirm/getMaterialCode', //物料扫描

    ////********质量异常处理-检验组长 API*************/
    GET_C_Query: modulesConfig.MOMAssemblyExecution + '/abnormalConfirm/findBy', //物料查询  
    GET_C_DetailedQuery: modulesConfig.MOMAssemblyExecution + '/abnormalConfirm/findById', //查询信详细信息
    GET_C_Submit: modulesConfig.MOMAssemblyExecution + '/abnormalConfirm/addOrCommit', //提交或保存
    GET_C_shutDownAbnormal: modulesConfig.MOMAssemblyExecution + "/abnormalConfirm/shutDownAbnormal", //质量异常处理-封闭
    GET_C_findByAIdInfo: modulesConfig.MOMAssemblyExecution + "/abnormalConfirm/findByAId", // 站位指令信息 - 查看详细信息
    //********报废单 API*************/
    GET_D_findGenerateQuery: modulesConfig.MOMAssemblyExecution + "/abnormalConfirm/findGenerate",
    GET_D_addOrCommitGenerate: modulesConfig.MOMAssemblyExecution + "/abnormalConfirm/addOrCommitGenerate",

    //********生产异常 API*************/
    GET_Z_selectProductInfoByProposeUser: modulesConfig.MOMAssemblyExecution + "/productProblem/selectProductInfoByProposeUser", // 查询
    GET_Z_insertProductInfo: modulesConfig.MOMAssemblyExecution + "/productProblem/insertProductInfo", // 新增-保存
    GET_Z_updateProductInfo: modulesConfig.MOMAssemblyExecution + "/productProblem/updateProductInfo", //  提交
    // 工段长和指定负责人 flag;//1：工段长 2:负责人
    GET_Z_selectProductInfoByAcceptUser: modulesConfig.MOMAssemblyExecution + "/productProblem/selectProductInfoByAcceptUser", // 查询
    GET_Z_updateBackProductInfo: modulesConfig.MOMAssemblyExecution + "/productProblem/updateBackProductInfo", // 驳回
    GET_Z_updateCloseProductInfo: modulesConfig.MOMAssemblyExecution + "/productProblem/updateCloseProductInfo", // 封闭  
    GET_Z_updateAppointUserProductInfo: modulesConfig.MOMAssemblyExecution + "/productProblem/updateAppointUserProductInfo", // 指定负责人
    GET_Z_getUserByRole: modulesConfig.MOMAssemblyExecution + "/productProblem/getUserByRole", // 查询工段长
    GET_Z_getChargeUser: modulesConfig.MOMAssemblyExecution + "/productProblem/getChargeUser", //查询负责人

    //********报工记录查看 API*************/
    GET_X_findWorkRecord: modulesConfig.MOMAssemblyExecution + "/work/findWorkRecord", // 查询 

    //********质量履历本 API*************/  
    GET_V_findWorkRecord: modulesConfig.MOMAssemblyExecution + "/quality/findAllInfo", // 查询  
    GET_V_findAllTreeList: modulesConfig.MOMAssemblyExecution + "/quality/findAllTreeList", // 查询 - 树    
    GET_V_findWorkList: modulesConfig.MOMAssemblyExecution + "/quality/findWorkList", // 查询 - 报工记录
    GET_V_findTableList: modulesConfig.MOMAssemblyExecution + "/quality/findTableList", // 查询 - 质量记录表  
    GET_V_findQualityList: modulesConfig.MOMAssemblyExecution + "/quality/findQualityList", // 查询 - 质量异常记录表
    GET_V_findMaterialList: modulesConfig.MOMAssemblyExecution + "/quality/findMaterialList", // 查询 - 配套表   
    GET_V_findChaneOrderList: modulesConfig.MOMAssemblyExecution + "/quality/findChaneOrderList", // 查询 - 工艺更改单  /quality/findFile
    GET_V_uploadFile: modulesConfig.MOMAssemblyExecution + "/quality/uploadFile", // 附件 - 上传
    GET_V_findFile: modulesConfig.MOMAssemblyExecution + "/quality/findFile", // 附件 -  查询   
    GET_V_delFile: modulesConfig.MOMAssemblyExecution + "/quality/delFile", // 附件 -  删除   
    GET_V_updateNodeName: modulesConfig.MOMAssemblyExecution + "/quality/updateNodeName", // 名称 - 修改 
    
    //********新增接口员工报工界面--右上角仪表盘 API*************/ 
    GET_V_findHasChangeOrder: modulesConfig.MOMAssemblyExecution + "/changeOrder/findHasChangeOrder", //
    GET_V_createExceptionReport: modulesConfig.MOMAssemblyExecution + "/receive/createExceptionReport", //员工报工界面--异常上报API**
    GET_V_findInspectionProcedures: modulesConfig.MOMAssemblyExecution + "/receive/findInspectionProcedures", //员工报工界面--检验规程**
    GET_V_checkExaminerAuth: modulesConfig.MOMAssemblyExecution + "/work/checkExaminerAuth", //员工报工界面--检验规程*
    //物料呼叫
    GET_W_findByStation: modulesConfig.MOMAssemblyExecution + "/abnormal/findByStation", //物料呼叫
}

/********资源管理  API*************/
export const ResourceManagement = {
    //********保养任务 API*************/
    GET_A_Query: modulesConfig.ResourceManagement + '/maintain/findAll', //查询
    GET_A_Maintain: modulesConfig.ResourceManagement + '/maintain/findBy', //保养
    GET_A_Preservation: modulesConfig.ResourceManagement + '/maintain/add', //保存
    GET_A_QueryFile: modulesConfig.ResourceManagement + '/file/findAllFile', //查询文档
    GET_A_Submite: modulesConfig.ResourceManagement + '/maintain/sub', //提交
    //********维修任务下发界面 API*************/
    GET_B_Query: modulesConfig.ResourceManagement + '/repair/findAll', //查询
    GET_B_Issue: modulesConfig.ResourceManagement + '/repair/sendTo', //下发
    GET_B_modify: modulesConfig.ResourceManagement + '/repair/updateSendTo', //修改
    GET_B_IsLookFacility: modulesConfig.ResourceManagement + '/repair/findFile', //查看设备文档
    GET_B_LookExplain: modulesConfig.ResourceManagement + '/repair/findRepairFile', //查看说明文档
    GET_B_findUserByRole: modulesConfig.ResourceManagement + '/repair/findUserByRole', //查看说明文档
    //********维修任务接收界面 API*************/
    GET_C_Query: modulesConfig.ResourceManagement + '/repairWorker/findAll', //查询
    GET_C_Receive: modulesConfig.ResourceManagement + '/repairWorker/receiveResources', //接收
    GET_C_Repair: modulesConfig.ResourceManagement + '/repairWorker/findById', //维修
    GET_C_Preservation: modulesConfig.ResourceManagement + '/repairWorker/add', //保存
    GET_C_Submit: modulesConfig.ResourceManagement + '/repairWorker/addAndCommit', //提交
    GET_C_ReLookFacility: modulesConfig.ResourceManagement + '/repair/findFile', //查看设备文档
    GET_C_ReLookExplain: modulesConfig.ResourceManagement + '/repair/findRepairFile', //查看说明文档

    //********实作bom界面 API*************/
    GET_E_Query: modulesConfig.ResourceManagement + '/completeMaterials/select', //查询
    GET_E_QueryTree: modulesConfig.ResourceManagement + '/completeMaterials/selectBom', //查询bom树
    GET_E_QueryMaterialIformation: modulesConfig.ResourceManagement + '/completeMaterials/selectMaterials', //查询bom树
    //********维保记录查看 API*************/
    GET_F_Query: modulesConfig.ResourceManagement + '/repairHistory/findMaintainHistory', //查询
    GET_F_See: modulesConfig.ResourceManagement + '/maintain/findBy', //查看
    //********维修记录查看 API*************/
    GET_J_Query: modulesConfig.ResourceManagement + '/repairHistory/findRepairHistory', //查询
    GET_J_See: modulesConfig.ResourceManagement + '/repairWorker/findById', //查看
    //********维修记录 API*************/
    GET_H_Query: modulesConfig.ResourceManagement + '/repairHistory/findAllMaintain', //查询
    GET_H_QueryDetails: modulesConfig.ResourceManagement + '/repairWorker/findById', //查询
    GET_H_QueryConfirm: modulesConfig.ResourceManagement + '/repairHistory/update', //确认
    /********资源管理  API*************/

    //********工（量）具台账 API*************/
    GET_Y_findAllData: modulesConfig.ResourceManagement + "/toolsManage/findAllData", // 查询
    //********工（量）具定检 API*************/
    GET_X_selectCheckBasicTools: modulesConfig.ResourceManagement + "/toolsManage/selectCheckBasicTools", // 查询
    GET_X_updateWorkCheckTime: modulesConfig.ResourceManagement + "/toolsManage/updateWorkCheckTime", // 送检
    GET_X_RegularInspectionCompleted: modulesConfig.ResourceManagement + "/toolsManage/updateWorkStatus", // 定检完成
    //********工（量）具使用信息 API*************/
    GET_W_findToolUseInfo: modulesConfig.ResourceManagement + "/toolsManage/findToolUseInfo", // 查询
    //********工装使用信息 API*************/
    GET_v_selectWorkUseInfoList: modulesConfig.ResourceManagement + "/work/selectWorkUseInfoList", // 查询
    //********工装定检 API*************/
    GET_D_Query: modulesConfig.ResourceManagement + "/work/selectWorkCheckAll", // 查询
    GET_D_updateWorkCheckTime: modulesConfig.ResourceManagement + "/work/updateWorkCheckTime", // 更新状态和时间
    GET_D_addWorkCheckRecordInfo: modulesConfig.ResourceManagement + "/work/addWorkCheckRecordInfo", // 新增定检记录信息
    GET_D_RegularInspectionCompleted: modulesConfig.ResourceManagement + "/work/updateWorkStatus", // 定检完成

    //********设备定检 API*************/
    GET_K_Query: modulesConfig.ResourceManagement + "/equpmentCheck/selectCheckEqupmentInfo", // 查询
    GET_K_updateWorkCheckTime: modulesConfig.ResourceManagement + "/equpmentCheck/updateEqupmnetCheckTime", // 送检
    GET_K_RegularInspectionCompleted: modulesConfig.ResourceManagement + "/equpmentCheck/updateEqupmentStatus", // 送检
    //********公用资源的使用与归还 API*************/
    GET_Z_findAllDataQuery: modulesConfig.ResourceManagement + "/communal/findAllData", //工装查询/
    GET_Z_findAllFacilityQuery: modulesConfig.ResourceManagement + "/communal/findAllFacility", //设备查询
    GET_Z_findAllTools: modulesConfig.ResourceManagement + "/communal/findAllTools", //工量具查询
    GET_Z_updateUseBasicData: modulesConfig.ResourceManagement + "/communal/updateUseBasicData", //占用 -flag 区分表示,w:工装信息，s:设备信息
    GET_Z_updateReleaseBasicData: modulesConfig.ResourceManagement + "/communal/updateReleaseBasicData", //释放 -flag 区分表示,w:工装信息，s:设备信息

    //********工装台账 API*************/
    GET_U_selectWorkInfoList: modulesConfig.ResourceManagement + "/work/selectWorkInfoList", // 查询

    //********设备台账 API*************/
    GET_M_findAllFacilitys: modulesConfig.ResourceManagement + "/maintain/findAllFacility", // 查询
    /******** 3D内嵌 排产 API*************/
    GET_N_findRepairFacility: modulesConfig.ResourceManagement + "/maintain/findRepairFacility", // 查询所有维修设备

    GET_N_findAllFrock: modulesConfig.ResourceManagement + "/work/findAllFrock", // 查询所有工装维修定检

    GET_N_findAllTool: modulesConfig.ResourceManagement + "/toolsManage/findAllTool", // 查询所有工量具维修定检
    /********设备维修接口*************/
    GET_O_selectEquipmentRepairInfo: modulesConfig.ResourceManagement + "/repair/selectEquipmentRepairInfo", // 查询维修设备列表

    GET_O_insertEquipmentInfo: modulesConfig.ResourceManagement + "/repair/insertEquipmentInfo", // 添加维修设备
    GET_O_updateEquipmentInfo: modulesConfig.ResourceManagement + "/repair/updateEquipmentInfo", // 修改维修设备
    GET_O_deleteEquipmentInfo: modulesConfig.ResourceManagement + "/repair/deleteEquipmentInfo", // 删除维修设备
    GET_O_updateEquipmentInfoStates: modulesConfig.ResourceManagement + "/repair/updateEquipmentInfoStates", // 生成维修设备任务
}
export const StationDispatching = {
        //******** 查询站台物料缺件信息接口 API*************/
        GET_A_LackStuff: modulesConfig.StationDispatching + "/statistic/LackStuff", // 查询站台物料缺件信息接口
        // //3d集成工量具
        // GET_A_tool: modulesConfig.StationDispatching  + "/statistic/tool", // 工量具情况
        // //3d集成设备
        // GET_A_facility: modulesConfig.StationDispatching  + "/statistic/facility", // 设备情况
        // //3d集成工装
        // GET_A_frock: modulesConfig.StationDispatching  + "/statistic/frock", // 工装情况
        // 站位交接 指令返回信息
        GET_A_stationInstruct: modulesConfig.StationDispatching  + "/handover/stationInstruct", // 工装情况
        // 站位交接 质量问题信息
        GET_A_stationIssue: modulesConfig.StationDispatching  + "/handover/stationIssue", // 工装情况
        // 指令调整人员信息
        GET_A_getUserInfo: modulesConfig.StationDispatching  + "/statistic/getUserInfo", // 人员信息
        
        //********物料配送任务*************/
        GET_B_selectDeliveryMaterials: modulesConfig.StationDispatching  + "/delivery/selectDeliveryMaterials", // 配送任务列表
        GET_B_sselectMaterielById: modulesConfig.StationDispatching  + "/delivery/selectMaterielById", // 根据派送任务ID查询配送物料信息
        GET_B_updateStatus: modulesConfig.StationDispatching  + "/delivery/updateStatus", // 点击接收，修改状态为已接收
        GET_B_selectBoxInfo: modulesConfig.StationDispatching  + "/delivery/selectBoxInfo", // 料盒信息
        GET_B_selectMaterielDetail: modulesConfig.StationDispatching  + "/delivery/selectMaterielDetail", // 查询物料详情
        GET_B_updateAGVNo: modulesConfig.StationDispatching  + "/delivery/updateAGVNo", // 料盒添加
        GET_B_selectBoxNos: modulesConfig.StationDispatching  + "/delivery/selectBoxNos", // 第二个料盒列表
        GET_B_deleteAGVNo: modulesConfig.StationDispatching  + "/delivery/deleteAGVNo", // 第二个料盒删除
        GET_B_updateTackStatus: modulesConfig.StationDispatching  + "/delivery/updateTackStatus", // 第二个料盒配送
         
}

export const Dintegrate = {
        //3d集成工量具
        GET_A_tool: modulesConfig.ResourceManagement + "/toolsManage/findAllByStation", // 工量具情况
        //3d集成设备
        GET_A_facility: modulesConfig.ResourceManagement + "/maintain/findAllRepairFacility", // 设备情况
        //3d集成工装
        GET_A_frock: modulesConfig.ResourceManagement + "/work/findAllByStation", // 工装情况
         
}

