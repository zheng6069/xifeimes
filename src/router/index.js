import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


// 高级计划与排产模块 AdvancedScheduling //
const PlannedReceipt = (resolve) => { // 生产任务
    import('../components/AdvancedScheduling/PlannedReceipt/PlannedReceipt').then((module) => {
        resolve(module)
    })
}

const MaterialInspection = (resolve) => { // 物料齐套性检查
    import('../components/AdvancedScheduling/MaterialInspection/MaterialInspection').then((module) => {
        resolve(module)
    })
}

const ShortItem = (resolve) => { // 物料缺件
    import('../components/AdvancedScheduling/MaterialInspection/ShortItem').then((module) => {
        resolve(module)
    })
}

const WorkOrderProduction = (resolve) => { // 工单生成
    import('../components/AdvancedScheduling/WorkOrderProduction/WorkOrderProduction').then((module) => {
        resolve(module)
    })
}
const WorkOrderProductionBox = (resolve) => { // 工单生成弹框
    import('../components/AdvancedScheduling/WorkOrderProduction/WorkOrderProductionBox').then((module) => {
        resolve(module)
    })
}

const SchedulingHome = (resolve) => { // 生产排产主界面
    import('../components/AdvancedScheduling/ProductionScheduling/SchedulingHome').then((module) => {
        resolve(module)
    })
}
const ProductionScheduling = (resolve) => { // 生产排产高级
    import('../components/AdvancedScheduling/ProductionScheduling/ProductionScheduling').then((module) => {
        resolve(module)
    })
}

const ProcessProperties = (resolve) => { // 工艺属性配置
    import('../components/AdvancedScheduling/ProductionScheduling/ProcessProperties').then((module) => {
        resolve(module)
    })
}
const ProcessPropertiesBox = (resolve) => { // 工艺属性配置弹框
    import('../components/AdvancedScheduling/ProductionScheduling/ProcessPropertiesBox').then((module) => {
        resolve(module)
    })
}

const MaterialPlanning = (resolve) => { // 物料需求计划
    import('../components/AdvancedScheduling/ProductionScheduling/MaterialPlanning').then((module) => {
        resolve(module)
    })
}
const SchedulingInformation = (resolve) => { // 物料库存信息
    import('../components/AdvancedScheduling/ProductionScheduling/SchedulingInformation').then((module) => {
        resolve(module)
    })
}
const DeviceInformation = (resolve) => { // 设备信息
    import('../components/AdvancedScheduling/ProductionScheduling/DeviceInformation').then((module) => {
        resolve(module)
    })
}
const SchedulingWorkClothes = (resolve) => { // 工装信息
    import('../components/AdvancedScheduling/ProductionScheduling/SchedulingWorkClothes').then((module) => {
        resolve(module)
    })
}
const SchedulingMeasuringTools = (resolve) => { // 量具信息
    import('../components/AdvancedScheduling/ProductionScheduling/SchedulingMeasuringTools').then((module) => {
        resolve(module)
    })
}
const GanttChart = (resolve) => { // 排产结果甘特图
    import('../components/AdvancedScheduling/ProductionScheduling/GanttChart').then((module) => {
        resolve(module)
    })
}
const MonthlyGanttChart = (resolve) => { // 排产结果甘特图月计划
    import('../components/AdvancedScheduling/ProductionScheduling/MonthlyGanttChart').then((module) => {
        resolve(module)
    })
}
const TemporaryAssignment = (resolve) => { // 临时任务分派
    import('../components/AdvancedScheduling/TemporaryAssignment/TemporaryAssignment').then((module) => {
        resolve(module)
    })
}
const WorkOrderStatus = (resolve) => { // 工单状态调整
    import('../components/AdvancedScheduling/WorkOrderStatus/WorkOrderStatus').then((module) => {
        resolve(module)
    })
}
const AddSee = (resolve) => { // 生产准备反馈- 查看
    import('../components/AdvancedScheduling/AddSee/AddSee').then((module) => {
        resolve(module)
    })
}
const AddSeeOne = (resolve) => { // 生产准备反馈- 查看 - 物料信息
    import('../components/AdvancedScheduling/AddSee/AddSeeOne').then((module) => {
        resolve(module)
    })
}
const AddSeeTwo = (resolve) => { // 生产准备反馈- 查看 - 设备信息
    import('../components/AdvancedScheduling/AddSee/AddSeeTwo').then((module) => {
        resolve(module)
    })
}
const AddSeeThree = (resolve) => { // 生产准备反馈- 查看 - 工装信息
    import('../components/AdvancedScheduling/AddSee/AddSeeThree').then((module) => {
        resolve(module)
    })
}
const AddSeeFour = (resolve) => { // 生产准备反馈- 查看 - 工量具信息
    import('../components/AdvancedScheduling/AddSee/AddSeeFour').then((module) => {
        resolve(module)
    })
}

const AddMaterial = (resolve) => { // 生产准备反馈（物料）
    import('../components/AdvancedScheduling/AddMaterial/AddMaterial').then((module) => {
        resolve(module)
    })
}
const AddMeasure = (resolve) => { // 生产准备反馈（工量具）
    import('../components/AdvancedScheduling/AddMeasure/AddMeasure').then((module) => {
        resolve(module)
    })
}
const AddWorkClothes = (resolve) => { // 生产准备反馈 - 工装
    import('../components/AdvancedScheduling/AddWorkClothes/AddWorkClothes').then((module) => {
        resolve(module)
    })
}
const AddEquipment = (resolve) => { // 生产准备反馈 - 设备
    import('../components/AdvancedScheduling/AddEquipment/AddEquipment').then((module) => {
        resolve(module)
    })
}
const InspectionTasks = (resolve) => { // 检验任务分派
    import('../components/AdvancedScheduling/InspectionTasks/InspectionTasks').then((module) => {
        resolve(module)
    })
}
const SchedulingResults = (resolve) => { // 排产结果输出
    import('../components/AdvancedScheduling/ProductionScheduling/SchedulingResults').then((module) => {
        resolve(module)
    })
}

const IssueResultsHome = (resolve) => { // 输出结果（下发）-主界面
    import('../components/AdvancedScheduling/IssueResults/IssueResultsHome').then((module) => {
        resolve(module)
    })
}
const IssueResultsOneInfo = (resolve) => { // 输出结果（下发）-详细界面1
    import('../components/AdvancedScheduling/IssueResults/IssueResultsOneInfo').then((module) => {
        resolve(module)
    })
}
const MonthlyOutput = (resolve) => { // 输出结果（下发）-主界面 周计划  新增
        import('../components/AdvancedScheduling/WeeklySchedule/MonthlyOutput').then((module) => {
            resolve(module)
        })
}
const MonthlyOutputDetail = (resolve) => { // 输出结果（下发）-详细界面1 周计划  新增
        import('../components/AdvancedScheduling/WeeklySchedule/MonthlyOutputDetail').then((module) => {
            resolve(module)
        })
}
const TypeRoom = (resolve) => { // 下发（型号室主任）
    import('../components/AdvancedScheduling/IssueResults/TypeRoom').then((module) => {
        resolve(module)
    })
}
const TypeRoomweek = (resolve) => { // 下发（型号室主任） 周计划 主任计划师审批
    import('../components/AdvancedScheduling/IssueResults/TypeRoomweek').then((module) => {
        resolve(module)
    })
}
const ProductionRoom = (resolve) => { // 下发（生产室主任）
    import('../components/AdvancedScheduling/IssueResults/ProductionRoom').then((module) => {
        resolve(module)
    })
}
const ProductionRoomweek = (resolve) => { // 下发（生产室主任） 周计划集成交付中心主任审批
    import('../components/AdvancedScheduling/IssueResults/ProductionRoomweek').then((module) => {
        resolve(module)
    })
}
const StationChiefs = (resolve) => { // 站位负责人
    import('../components/AdvancedScheduling/IssueResults/StationChiefs').then((module) => {
        resolve(module)
    })
}
const RollProduction = (resolve) => { // 滚动排产
    import('../components/AdvancedScheduling/RollProduction/RollProduction').then((module) => {
        resolve(module)
    })
}
const RollProductionHome = (resolve) => { // 滚动排产主界面
    import('../components/AdvancedScheduling/RollProduction/RollProductionHome').then((module) => {
        resolve(module)
    })
}

const DailyPlan = (resolve) => { // 日计划
    import('../components/AdvancedScheduling/DailyPlan/DailyPlan').then((module) => {
        resolve(module)
    })
}
//高级计划排产^^^^^^^^^//

//基础数据 BasicData//
const ProcessSpecification = (resolve) => { // 工艺规程
    import('../components/BasicData/ProcessSpecification/ProcessSpecification').then((module) => {
        resolve(module)
    })
}
const ProcessSpecificationHmoe = (resolve) => { // 工艺规程主界面
    import('../components/BasicData/ProcessSpecification/ProcessSpecificationHmoe').then((module) => {
        resolve(module)
    })
}

const ToolingInformation = (resolve) => { // 工装基础信息
    import('../components/BasicData/ToolingInformation/ToolingInformation').then((module) => {
        resolve(module)
    })
}

const ToolInformation = (resolve) => { // 工具基础信息
    import('../components/BasicData/ToolInformation/ToolInformation').then((module) => {
        resolve(module)
    })
}

const MaterialInformation = (resolve) => { // 物料信息
    import('../components/BasicData/MaterialInformation/MaterialInformation').then((module) => {
        resolve(module)
    })
}
const BOMInformation = (resolve) => { // BOM信息
    import('../components/BasicData/BOMInformation/BOMInformation').then((module) => {
        resolve(module)
    })
}

const BOMInformationHome = (resolve) => { // BOM信息
    import('../components/BasicData/BOMInformation/BOMInformationHome').then((module) => {
        resolve(module)
    })
}

const Equipment = (resolve) => { // 设备
    import('../components/BasicData/Equipment/Equipment').then((module) => {
        resolve(module)
    })
}

const EquipmentMaintenanceHmoe = (resolve) => { // 设备维保基准维护主界面
    import('../components/BasicData/EquipmentMaintenance/EquipmentMaintenanceHmoe').then((module) => {
        resolve(module)
    })
}
const EquipmentMaintenance = (resolve) => { // 设备维保基准维护弹窗界面
    import('../components/BasicData/EquipmentMaintenance/EquipmentMaintenance').then((module) => {
        resolve(module)
    })
}

const MakeCalendar = (resolve) => { // 制造日历
    import('../components/BasicData/MakeCalendar/MakeCalendar').then((module) => {
        resolve(module)
    })
}

const Classes = (resolve) => { // 班次
    import('../components/BasicData/Classes/Classes').then((module) => {
        resolve(module)
    })
}
const OverhaulPeriod = (resolve) => { // 大修年限配置
    import('../components/BasicData/OverhaulPeriod/OverhaulPeriod').then((module) => {
        resolve(module)
    })
}
const MaintenanceDocument = (resolve) => { // 维修文档
    import('../components/BasicData/MaintenanceDocument/MaintenanceDocument').then((module) => {
        resolve(module)
    })
}
const LocationMaintenance = (resolve) => { // 库位维护
    import('../components/BasicData/LocationMaintenance/LocationMaintenance').then((module) => {
        resolve(module)
    })
}
const EquipmentStatus = (resolve) => { // 设备、工装、工量具状态维护
    import('../components/BasicData/EquipmentStatus/EquipmentStatus').then((module) => {
        resolve(module)
    })
}
const AffiliationProduction = (resolve) => { // 所属产线维护
    import('../components/BasicData/EquipmentStatus/AffiliationProduction').then((module) => {
        resolve(module)
    })
}
const kind = (resolve) => { // 种类维护
    import('../components/BasicData/EquipmentStatus/kind').then((module) => {
        resolve(module)
    })
}
const deviceType = (resolve) => { // 设备类型维护
    import('../components/BasicData/EquipmentStatus/deviceType').then((module) => {
        resolve(module)
    })
}
const FrozenReasons = (resolve) => { // 冻结原因维护 
    import('../components/BasicData/EquipmentStatus/FrozenReasons').then((module) => {
        resolve(module)
    })
}
const Release = (resolve) => { // 释放原因维护
    import('../components/BasicData/EquipmentStatus/Release').then((module) => {
        resolve(module)
    })
}
const FaultCode = (resolve) => { // 故障代码维护
    import('../components/BasicData/EquipmentStatus/FaultCode').then((module) => {
        resolve(module)
    })
}
const Technology = (resolve) => { // 责任单位 维护
    import('../components/BasicData/EquipmentStatus/Technology').then((module) => {
        resolve(module)
    })
}

const ExceptionTypes = (resolve) => { // 异常类型
    import('../components/BasicData/EquipmentStatus/ExceptionTypes').then((module) => {
        resolve(module)
    })
}
const StationPersonnel = (resolve) => { // 站位人员维护
    import('../components/BasicData/Personnels/StationPersonnel').then((module) => {
        resolve(module)
    })
}
const PersonnelQualification = (resolve) => { // 人员资质维护
    import('../components/BasicData/Personnels/PersonnelQualification').then((module) => {
        resolve(module)
    })
}

const certification = (resolve) => { // 资质维护
    import('../components/BasicData/Personnels/certification').then((module) => {
        resolve(module)
    })
}

const credential = (resolve) => { // 资质等级维护
    import('../components/BasicData/Personnels/credential').then((module) => {
        resolve(module)
    })
}

const ResultCode = (resolve) => { // 处理结果维护  
    import('../components/BasicData/EquipmentStatus/ResultCode').then((module) => {
        resolve(module)
    })
}

const SparePartsBasics = (resolve) => { // 备件基础信息
    import('../components/BasicData/SparePartsBasics/SparePartsBasics').then((module) => {
        resolve(module)
    })
}
const MaterialBasis = (resolve) => { // 物料基础信息
    import('../components/BasicData/MaterialBasis/MaterialBasis').then((module) => {
        resolve(module)
    })
}
const ProcessPreparation = (resolve) => { // 工艺编制
    import('../components/BasicData/ProcessPreparation/ProcessPreparation').then((module) => {
        resolve(module)
    })
}
const SiteTechnology = (resolve) => { // 添加站位工艺
    import('../components/BasicData/ProcessPreparation/SiteTechnology').then((module) => {
        resolve(module)
    })
}
const InstructionEditing = (resolve) => { // 指令编辑
    import('../components/BasicData/ProcessPreparation/InstructionEditing').then((module) => {
        resolve(module)
    })
}
const InstructionContent = (resolve) => { // 指令编辑内容
    import('../components/BasicData/ProcessPreparation/InstructionContent').then((module) => {
        resolve(module)
    })
}

const CommunicationAndNavigation = (resolve) => { // 通信导航
    import('../components/BasicData/CommunicationAndNavigation/CommunicationAndNavigation').then((module) => {
        resolve(module)
    })
}



//基础数据^^^^^^^^^^^^^^//   


//MOM站位内调度管理
const DispatchAdjustment = (resolve) => { // 工单信息
    import('../components/StationDispatching/DispatchAdjustment/DispatchAdjustment').then((module) => {
        resolve(module)
    })
}

const DispatchBox = (resolve) => { // 派工
    import('../components/StationDispatching/DispatchAdjustment/DispatchBox').then((module) => {
        resolve(module)
    })
}

const ReassignmentBox = (resolve) => { // 改派
    import('../components/StationDispatching/DispatchAdjustment/ReassignmentBox').then((module) => {
        resolve(module)
    })
}

const DisassemblySubmit = (resolve) => { // 拆解审批
    import('../components/StationDispatching/DisassemblySubmit/DisassemblySubmit').then((module) => {
        resolve(module)
    })
}
const WorkOrderDisassembly = (resolve) => { // 工单拆解
    import('../components/StationDispatching/WorkOrderDisassembly/WorkOrderDisassembly').then((module) => {
        resolve(module)
    })
}
const InstructionSelection = (resolve) => { // 指令选择界面
    import('../components/StationDispatching/WorkOrderDisassembly/InstructionSelection').then((module) => {
        resolve(module)
    })
}
const RepeatedlyDisassemble = (resolve) => { // 多次拆解
    import('../components/StationDispatching/RepeatedlyDisassemble/RepeatedlyDisassemble').then((module) => {
        resolve(module)
    })
}
const DisassembleAffirm = (resolve) => { // 拆解确认
    import('../components/StationDispatching/DisassembleAffirm/DisassembleAffirm').then((module) => {
        resolve(module)
    })
}
const AssemblyProcessTracking = (resolve) => { // 装配过程追踪
    import('../components/StationDispatching/AssemblyProcessTracking/AssemblyProcessTracking').then((module) => {
        resolve(module)
    })
}
const DetailedAssemblyInformation = (resolve) => { // 详细装配信息
    import('../components/StationDispatching/AssemblyProcessTracking/DetailedAssemblyInformation').then((module) => {
        resolve(module)
    })
}
const parameter = (resolve) => { // 参数表信息
    import('../components/StationDispatching/AssemblyProcessTracking/parameter').then((module) => {
        resolve(module)
    })
}
const StationHandover = (resolve) => { // 站位交接
    import('../components/StationDispatching/StationHandover/StationHandover').then((module) => {
        resolve(module)
    })
}
const TransferStation = (resolve) => { // 移交站位
    import('../components/StationDispatching/StationHandover/TransferStation').then((module) => {
        resolve(module)
    })
}
const ReceivingStation = (resolve) => { // 站位交接查询
    import('../components/StationDispatching/StationHandover/ReceivingStation').then((module) => {
        resolve(module)
    })
}
const StationHandoverRecord = (resolve) => { // 接收站位
    import('../components/StationDispatching/StationHandover/StationHandoverRecord').then((module) => {
        resolve(module)
    })
}
const PositionInstructSee = (resolve) => { // 站位质量信息 - 查看详细信息
    import('../components/StationDispatching/StationHandover/PositionInstructSee').then((module) => {
        resolve(module)
    })
}
const OutsourcingTransferOut = (resolve) => { // 外协转出
    import('../components/StationDispatching/OutsourcingTransferOut/OutsourcingTransferOut').then((module) => {
        resolve(module)
    })
}
const OutsourcingTransferIn = (resolve) => { // 外协转入
    import('../components/StationDispatching/OutsourcingTransferIn/OutsourcingTransferIn').then((module) => {
        resolve(module)
    })
}
const OutsourcingRecord = (resolve) => { // 外协记录查询
    import('../components/StationDispatching/OutsourcingRecord/OutsourcingRecord').then((module) => {
        resolve(module)
    })
}

const OnsiteProblem = resolve => {
    // 生产异常 站位长-流程
    import('../components/StationDispatching/OnsiteProblem/OnsiteProblem').then(module => {
        resolve(module)
    })
}
const SectionChief = resolve => {
    // 生产异常 工段长-流程
    import('../components/StationDispatching/OnsiteProblem/SectionChief').then(module => {
        resolve(module)
    })
}
const Principal = resolve => {
    // 生产异常 负责人-流程
    import('../components/StationDispatching/OnsiteProblem/Principal').then(module => {
        resolve(module)
    })
}

const MonthlyPlan = resolve => {
    // 月计划查看
    import('../components/StationDispatching/MonthlyPlan/MonthlyPlan').then(module => {
        resolve(module)
    })
}
const WeeklyPlan = resolve => {
    // 周计划查看
    import('../components/StationDispatching/WeeklyPlan/WeeklyPlan').then(module => {
        resolve(module)
    })
}



//站位内调度管理 ^^^^^^^^^^^//


//MOM装配执行管理//
const WorkersReceive = (resolve) => { // 工人接收
    import('../components/AssemblyExecution/Workers/WorkersReceive').then((module) => {
        resolve(module)
    })
}
const Workers = (resolve) => { // 工人报工
    import('../components/AssemblyExecution/Workers/Workers').then((module) => {
        resolve(module)
    })
}
const WorkRecord = (resolve) => { // 工艺更改单
    import('../components/AssemblyExecution/Workers/WorkRecord').then((module) => {
        resolve(module)
    })
}
const Massparameter = (resolve) => { // 质量参数录入界面   
    import('../components/AssemblyExecution/Workers/Massparameter').then((module) => {
        resolve(module)
    })
}

const Abnormalquality = (resolve) => { // 质量异常记录
    import('../components/AssemblyExecution/Workers/Abnormalquality').then((module) => {
        resolve(module)
    })
}

const MaterialCall = (resolve) => { // 物料呼叫
    import('../components/AssemblyExecution/Workers/MaterialCall').then((module) => {
        resolve(module)
    })
}
const MaterialConfirmation = (resolve) => { // 物料确认
    import('../components/AssemblyExecution/Workers/MaterialConfirmation').then((module) => {
        resolve(module)
    })
}
const TemporaryTaskReport = (resolve) => { // 临时任务报工
    import('../components/AssemblyExecution/Workers/TemporaryTaskReport').then((module) => {
        resolve(module)
    })
}
const PublicResource = (resolve) => { // 公用资源的使用与归还
    import('../components/AssemblyExecution/Workers/PublicResource').then((module) => {
        resolve(module)
    })
}
const WorkerSee = (resolve) => { // 工人接收
    import('../components/AssemblyExecution/Workers/WorkerSee').then((module) => {
        resolve(module)
    })
}
const ToolCabinet = (resolve) => { // 智能工具柜库存信息查看
    import('../components/AssemblyExecution/Workers/ToolCabinet').then((module) => {
        resolve(module)
    })
}
//装配执行管理^^^^^^///// 


//资源管理 ResourceManagement//
const ToolingParameter = (resolve) => { // 工装台账
    import('../components/ResourceManagement/ToolingParameter/ToolingParameter').then((module) => {
        resolve(module)
    })
}
const MaintenanceTask = (resolve) => { // 维保任务保养
    import('../components/ResourceManagement/MaintenanceTask/MaintenanceTask').then((module) => {
        resolve(module)
    })
}
const MaintenanceInfo = (resolve) => { // 维保信息录入
    import('../components/ResourceManagement/MaintenanceTask/MaintenanceInfo').then((module) => {
        resolve(module)
    })
}
const Reception = (resolve) => { // 设备维修 - 接收
    import('../components/ResourceManagement/FacilityMaintenance/Reception').then((module) => {
        resolve(module)
    })
}
const Issue = (resolve) => { // 设备维修 - 下发
    import('../components/ResourceManagement/FacilityMaintenance/Issue').then((module) => {
        resolve(module)
    })
}
const MaintenanceRecord = (resolve) => { // 设备维修 - 维修过程记录详细信息
    import('../components/ResourceManagement/MaintenanceRecord/MaintenanceRecord').then((module) => {
        resolve(module)
    })
}
const MaintenanceView = (resolve) => { // 维保记录查看
    import('../components/ResourceManagement/MaintenanceView/MaintenanceView').then((module) => {
        resolve(module)
    })
}
const MaintenanceViewInfo = (resolve) => { // 维保记录查看详细信息
    import('../components/ResourceManagement/MaintenanceView/MaintenanceViewInfo').then((module) => {
        resolve(module)
    })
}
const MaintainView = (resolve) => { // 维修记录查看
    import('../components/ResourceManagement/MaintainView/MaintainView').then((module) => {
        resolve(module)
    })
}
const MaintainViewInfo = (resolve) => { // 维修记录查看-详细信息
    import('../components/ResourceManagement/MaintainView/MaintainViewInfo').then((module) => {
        resolve(module)
    })
}
const PracticeBomHome = (resolve) => { // 实作bom主界面
    import('../components/ResourceManagement/PracticeBom/PracticeBomHome').then((module) => {
        resolve(module)
    })
}
const PracticeBom = (resolve) => { // 实作bom弹框界面
    import('../components/ResourceManagement/PracticeBom/PracticeBom').then((module) => {
        resolve(module)
    })
}

const FrockRegularCheck = (resolve) => { // 工装定检--子界面
    import('../components/ResourceManagement/FrockRegularCheck/FrockRegularCheck').then((module) => {
        resolve(module)
    })
}

const EquipmentUse = (resolve) => { //工装定检--工装使用信息
    import('../components/ResourceManagement/FrockRegularCheck/EquipmentUse').then((module) => {
        resolve(module)
    })
}
const MeasuringParameter = (resolve) => { // 工（量）具台账
    import('../components/ResourceManagement/MeasuringParameter/MeasuringParameter').then((module) => {
        resolve(module)
    })
}

const MeasuringCheck = (resolve) => { // 工（量）具定检信息
    import('../components/ResourceManagement/MeasuringCheck/MeasuringCheck').then((module) => {
        resolve(module)
    })
}

const EquipmentRegularInspection = (resolve) => { // 设备定检信息
    import('../components/ResourceManagement/EquipmentRegularInspection/EquipmentRegularInspection').then((module) => {
        resolve(module)
    })
}

const MeasuringUse = (resolve) => { // 工量具使用信息
    import('../components/ResourceManagement/MeasuringUse/MeasuringUse').then((module) => {
        resolve(module)
    })
}
const ResultConfirmation = (resolve) => { // 维修结果确认
    import('../components/ResourceManagement/ResultConfirmation/ResultConfirmation').then((module) => {
        resolve(module)
    })
}
const AcceptanceResults = (resolve) => { // 维修结果确认弹框
    import('../components/ResourceManagement/ResultConfirmation/AcceptanceResults').then((module) => {
        resolve(module)
    })
}
const EquipmentRecord = (resolve) => { // 设备台账
    import('../components/ResourceManagement/EquipmentRecord/EquipmentRecord').then((module) => {
        resolve(module)
    })
}

//资源管理^^^^^^^^^^^^^^//  


//线边库
const StandingBook = (resolve) => { // 线边库台账
    import('../components/LineSideLibrary/StandingBook/StandingBook').then((module) => {
        resolve(module)
    })
}
const WarehouseOut = (resolve) => { // 线边库出库
    import('../components/LineSideLibrary/WarehouseOut/WarehouseOut').then((module) => {
        resolve(module)
    })
}
const Storage = (resolve) => { // 线边库入库
    import('../components/LineSideLibrary/Storage/Storage').then((module) => {
        resolve(module)
    })
}
const TakeStock = (resolve) => { // 线边库盘点
    import('../components/LineSideLibrary/TakeStock/TakeStock').then((module) => {
        resolve(module)
    })
}
const StockAdjustment = (resolve) => { // 库存调整
    import('../components/LineSideLibrary/StockAdjustment/StockAdjustment').then((module) => {
        resolve(module)
    })
}
const WorkSorting = (resolve) => { // 线边库分拣
    import('../components/LineSideLibrary/WorkSorting/WorkSorting').then((module) => {
        resolve(module)
    })
}
const WorkSortInfo = (resolve) => { // 线边库分拣 - 详细信息
    import('../components/LineSideLibrary/WorkSorting/WorkSortInfo').then((module) => {
        resolve(module)
    })
}
const AddLongPosition = (resolve) => { // 线边库盘点审批 - 站位长
    import('../components/LineSideLibrary/checkApprove/AddLongPosition').then((module) => {
        resolve(module)
    })
}

const AddSectionChief = (resolve) => { // 线边库盘点审批 - 工段长
    import('../components/LineSideLibrary/checkApprove/AddSectionChief').then((module) => {
        resolve(module)
    })
}

const AddTotalPlanner = (resolve) => { // 线边库盘点审批 - 总计划员
    import('../components/LineSideLibrary/checkApprove/AddTotalPlanner').then((module) => {
        resolve(module)
    })
}

const SpareParts = (resolve) => { // 备件出库
    import('../components/LineSideLibrary/SpareParts/SpareParts').then((module) => {
        resolve(module)
    })
}
const MDistributionTask = (resolve) => { // 物料配送任务
    import('../components/LineSideLibrary/delivery/MDistributionTask').then((module) => {
        resolve(module)
    })
}
const StorageAreatask = (resolve) => { // 物料接收（线边库）
    import('../components/LineSideLibrary/delivery/StorageAreatask').then((module) => {
        resolve(module)
    })
}

const Materialbox = (resolve) => { // 料盒与AGV绑定
    import('../components/LineSideLibrary/delivery/Materialbox').then((module) => {
        resolve(module)
    })
}

//质量管理模块  
const AndGroupLeader = (resolve) => { // 质量异常处理-检验组长
    import('../components/QualityAssurance/AndGroupLeader/AndGroupLeader').then((module) => {
        resolve(module)
    })
}
const AndGroupLeaderBox = (resolve) => { // 质量异常处理-检验组长-质量异常详细信息
    import('../components/QualityAssurance/AndGroupLeader/AndGroupLeaderBox').then((module) => {
        resolve(module)
    })
}
const AndTechnicalDirector = (resolve) => { // 质量异常处理-技术负责人
    import('../components/QualityAssurance/AndTechnicalDirector/AndTechnicalDirector').then((module) => {
        resolve(module)
    })
}
const AndTechnicalDirectorBox = (resolve) => { // 质量异常处理-技术负责人-质量异常详细信息
    import('../components/QualityAssurance/AndTechnicalDirector/AndTechnicalDirectorBox').then((module) => {
        resolve(module)
    })
}
const AndTechnology = (resolve) => { // 质量异常处理-工艺
    import('../components/QualityAssurance/AndTechnology/AndTechnology').then((module) => {
        resolve(module)
    })
}
const AndTechnologyBox = (resolve) => { // 质量异常处理-工艺-质量异常详细信息
    import('../components/QualityAssurance/AndTechnology/AndTechnologyBox').then((module) => {
        resolve(module)
    })
}
const AndSealing = (resolve) => { // 质量异常处理-封闭
    import('../components/QualityAssurance/AndSealing/AndSealing').then((module) => {
        resolve(module)
    })
}
const AndSealingBox = (resolve) => { // 质量异常处理-封闭-质量异常详细信息
    import('../components/QualityAssurance/AndSealing/AndSealingBox').then((module) => {
        resolve(module)
    })
}
const ScrapForm = (resolve) => { // 报废单
    import('../components/QualityAssurance/ScrapForm/ScrapForm').then((module) => {
        resolve(module)
    })
}
const ReferenceSamplesHome = (resolve) => { // 质量履历本 - 主界面
    import('../components/QualityAssurance/ReferenceSamples/ReferenceSamplesHome').then((module) => {
        resolve(module)
    })
}
const RecordHome = (resolve) => { // 质量履历本 - 主详细界面
    import('../components/QualityAssurance/ReferenceSamples/RecordHome').then((module) => {
        resolve(module)
    })
}
const RecordOne = (resolve) => { // 质量履历本 - 报工记录表 - 详细界面
    import('../components/QualityAssurance/ReferenceSamples/RecordOne').then((module) => {
        resolve(module)
    })
}
const RecordTwo = (resolve) => { // 质量履历本 - 质量记录表 - 详细界面 
    import('../components/QualityAssurance/ReferenceSamples/RecordTwo').then((module) => {
        resolve(module)
    })
}
const RecordThree = (resolve) => { // 质量履历本 - 质量异常记录表 - 详细界面
    import('../components/QualityAssurance/ReferenceSamples/RecordThree').then((module) => {
        resolve(module)
    })
}
const RecordFour = (resolve) => { // 质量履历本 - 配套表 - 详细界面
    import('../components/QualityAssurance/ReferenceSamples/RecordFour').then((module) => {
        resolve(module)
    })
}
const RecordFive = (resolve) => { // 质量履历本 - 工艺更改单 - 详细界面
    import('../components/QualityAssurance/ReferenceSamples/RecordFive').then((module) => {
        resolve(module)
    })
}
const RecordSix = (resolve) => { // 质量履历本 - 上传附件 - 详细界面
    import('../components/QualityAssurance/ReferenceSamples/RecordSix').then((module) => {
        resolve(module)
    })
}
//质量管理模块^^^^^^^^^^^^^^//    


const ExceptionMessage = resolve => {
    // 新增异常信息查看及添加页面
    import('../components/StationDispatching/OnsiteProblem/ExceptionMessage').then(module => {
        resolve(module)
    })
}
const DeviceInformationNewly = (resolve) => { // 新增设备信息作为指令调整子组件 设备总数 和不可用数
    import('../components/AdvancedScheduling/ProductionScheduling/DeviceInformationNewly').then((module) => {
        resolve(module)
    })
}
const PositionTheHandover = (resolve) => { //  新增站位交接页面父组件 //无用
    import('../components/StationDispatching/StationHandover/PositionTheHandover').then((module) => {
        resolve(module)
    })
}
const AbnormalqualityNewly = (resolve) => { //  新增质量异常记录作为站位交接质量问题子组件 //无用
    import('../components/AssemblyExecution/Workers/AbnormalqualityNewly').then((module) => {
        resolve(module)
    })
}
const EquipmentNewly = (resolve) => { // 新增设备维修任务
    import('../components/StationDispatching/OnsiteProblem/EquipmentNewly').then((module) => {
        resolve(module)
    })
}
const AssemblyProduction = (resolve) => { //新增总装产线页面
    import('../components/StationDispatching/DispatchAdjustment/AssemblyProduction').then((module) => {
        resolve(module)
    })
}

//*************3D集成模块***************//
const Instructionadjust = (resolve) => { // 集成3D场景主页
    import('../components/Integration3D/Stancescheduling/Instructionadjust').then((module) => {
        resolve(module)
    })
}
const DispatchAdjustmentNewly = (resolve) => { // 集成3D场景主页 指令调整 默认子组件
    import('../components/Integration3D/Stancescheduling/DispatchAdjustmentNewly').then((module) => {
        resolve(module)
    })
}
const ShortItemNewly = (resolve) => { //  集成3D场景主页 指令调整 物料信息子组件
    import('../components/Integration3D/Stancescheduling/ShortItemNewly').then((module) => {
        resolve(module)
    })
}
const SchedulingWorkClothesNewly = (resolve) => { // 集成3D场景主页 指令调整 工装信息总数和不可用数
    import('../components/Integration3D/Stancescheduling/SchedulingWorkClothesNewly').then((module) => {
        resolve(module)
    })
}
const SchedulingMeasuringToolsNewly = (resolve) => { //  集成3D场景主页 指令调整 工量具信息子组件
    import('../components/Integration3D/Stancescheduling/SchedulingMeasuringToolsNewly').then((module) => {
        resolve(module)
    })
}
const AddSeeNewly = (resolve) => { // 集成3D场景主页 生产反馈 默认子组件
    import('../components/Integration3D/Stancescheduling/AddSeeNewly').then((module) => {
        resolve(module)
    })
}
const AddSeeOneNewly = (resolve) => { // 集成3D场景主页-生产反馈 - 物料信息 
    import('../components/Integration3D/Stancescheduling/AddSeeOneNewly').then((module) => {
        resolve(module)
    })
}
const AddSeeTwoNewly = (resolve) => { // 集成3D场景主页-生产反馈 - 设备信息
    import('../components/Integration3D/Stancescheduling/AddSeeTwoNewly').then((module) => {
        resolve(module)
    })
}
const AddSeeThreeNewly = (resolve) => { // 集成3D场景主页-生产反馈 - 工装信息
    import('../components/Integration3D/Stancescheduling/AddSeeThreeNewly').then((module) => {
        resolve(module)
    })
}
const AddSeeFourNewly = (resolve) => { // 集成3D场景主页-生产反馈 - 工量具信息
    import('../components/Integration3D/Stancescheduling/AddSeeFourNewly').then((module) => {
        resolve(module)
    })
}
const OnsiteProbleNewly = resolve => {// 集成3D场景主页 异常信息 默认子组件
    import('../components/Integration3D/Stancescheduling/OnsiteProbleNewly').then(module => {
        resolve(module)
    })
}
const StationHandoverNewly = (resolve) => { // 集成3D场景主页 站位交接 默认子组件
    import('../components/Integration3D/Stancescheduling/StationHandoverNewly').then((module) => {
        resolve(module)
    })
}
const PositionInstructSeeNewly = (resolve) => { // 集成3D场景主页 站位交接 站位质量信息详细子组件
    import('../components/Integration3D/Stancescheduling/PositionInstructSeeNewly').then((module) => {
        resolve(module)
    })
}
const IssueNewly = (resolve) => { // 集成3D场景主页 指令调整 设备情况子组件
    import('../components/Integration3D/Stancescheduling/IssueNewly').then((module) => {
        resolve(module)
    })
}
const FrockRegularCheckNewly = (resolve) => { // 集成3D场景主页 指令调整 工装情况子组件
    import('../components/Integration3D/Stancescheduling/FrockRegularCheckNewly').then((module) => {
        resolve(module)
    })
}
const ReassignmentBoxNewly = (resolve) => { // 集成3D场景主页 指令调整 改派子组件
    import('../components/Integration3D/Stancescheduling/ReassignmentBoxNewly').then((module) => {
        resolve(module)
    })
}
const DispatchBoxNewly = (resolve) => { // 集成3D场景主页 指令调整 调整子组件
    import('../components/Integration3D/Stancescheduling/DispatchBoxNewly').then((module) => {
        resolve(module)
    })
}
const TransferStationNewly = (resolve) => { // 集成3D场景主页 移交站位
    import('../components/Integration3D/Stancescheduling/TransferStationNewly').then((module) => {
        resolve(module)
    })
}
const ReceivingStationNewly = (resolve) => { //集成3D场景主页 站位交接查询
    import('../components/Integration3D/Stancescheduling/ReceivingStationNewly').then((module) => {
        resolve(module)
    })
}
//*************集成3D排产信息**************//
const Scheduling = (resolve) => { // 集成3D排产信息场景页面
    import('../components/Integration3D/ProductionScheduling/Scheduling').then((module) => {
        resolve(module)
    })
}
const SchedulingHomeNewly = (resolve) => { // 集成3D排产信息场景 默认子组件
    import('../components/Integration3D/ProductionScheduling/SchedulingHomeNewly').then((module) => {
        resolve(module)
    })
}

const ProductionSchedulingNewly = (resolve) => { // 集成3D排产信息场景 排产高级子组件
    import('../components/Integration3D/ProductionScheduling/ProductionSchedulingNewly').then((module) => {
        resolve(module)
    })
}

const SchedulingResultsNewly = (resolve) => { // 集成3D排产信息场景 排产结果输出子组件
    import('../components/Integration3D/ProductionScheduling/SchedulingResultsNewly').then((module) => {
        resolve(module)
    })
}
const MaterialInspectionNewly = (resolve) => { // 3D嵌套排产物料齐套性检查
    import('../components/AdvancedScheduling/MaterialInspection/MaterialInspectionNewly').then((module) => {
        resolve(module)
    })
}
const ShortItemNewly2 = (resolve) => { // 3D嵌套排产物料缺件
    import('../components/AdvancedScheduling/MaterialInspection/ShortItemNewly2').then((module) => {
        resolve(module)
    })
}
const IssueResultsHomeNewly = (resolve) => { // 3D嵌套排产 输出下发
    import('../components/Integration3D/ProductionScheduling/IssueResultsHomeNewly').then((module) => {
        resolve(module)
    })
}
const IssueResultsOneInfoNewly = (resolve) => { // 3D嵌套排产 输出下发详细
    import('../components/Integration3D/ProductionScheduling/IssueResultsOneInfoNewly').then((module) => {
        resolve(module)
    })
}
//*************集成3D工装定检**************//
const FrockRegularCheckHome = (resolve) => { // 工装定检--主界面
    import('../components/Integration3D/ToolingMissile/FrockRegularCheckHome').then((module) => {
        resolve(module)
    })
}
const ToolingetectionNewly = (resolve) => { // ToolingetectionNewly
    import('../components/Integration3D/ToolingMissile/ToolingetectionNewly').then((module) => {
        resolve(module)
    })
}
//*************集成3D场景主页 维修任务**************//
const maintainNewly = (resolve) => { // 集成3D场景主页 维修任务主页
    import('../components/Integration3D/EquipmentMaintenance/maintainNewly').then((module) => {
        resolve(module)
    })
}
const IssueNewly2 = (resolve) => { // 集成3D场景 维修任务设备子
    import('../components/Integration3D/EquipmentMaintenance/IssueNewly2').then((module) => {
        resolve(module)
    })
}
const MaintainViewNewly = (resolve) => { //  集成3D场景主页 维修记录查看子组件
    import('../components/Integration3D/EquipmentMaintenance/MaintainViewNewly').then((module) => {
        resolve(module)
    })
}
const MaintainViewInfoNewly = (resolve) => { // 集成3D场景主页 维修记录查看-详细信息子组件
    import('../components/Integration3D/EquipmentMaintenance/MaintainViewInfoNewly').then((module) => {
        resolve(module)
    })
}
export default new Router({
    mode: 'history',
    routes: [{ //生产任务
        path: '/',
        name: 'PlannedReceipt',
        component: PlannedReceipt
    },
    { // 物料齐套性检查
        path: '/MaterialInspection',
        name: 'MaterialInspection',
        component: MaterialInspection
    },
    { // 物料缺件
        path: '/ShortItem',
        name: 'ShortItem',
        component: ShortItem
    },

    { // 工单生成
        path: '/WorkOrderProduction',
        name: 'WorkOrderProduction',
        component: WorkOrderProduction
    },
    { // 工单生成弹框
        path: '/WorkOrderProductionBox',
        name: 'WorkOrderProductionBox',
        component: WorkOrderProductionBox
    },
    { // 生产排产主界面
        path: '/SchedulingHome',
        name: 'SchedulingHome',
        component: SchedulingHome
    },
    { // 生产排产高级
        path: '/ProductionScheduling',
        name: 'ProductionScheduling',
        component: ProductionScheduling
    },
    { // 工艺属性配置
        path: '/ProcessProperties',
        name: 'ProcessProperties',
        component: ProcessProperties
    },
    { // 工艺属性配置弹框
        path: '/ProcessPropertiesBox',
        name: 'ProcessPropertiesBox',
        component: ProcessPropertiesBox
    },
    { // 物料需求计划
        path: '/MaterialPlanning',
        name: 'MaterialPlanning',
        component: MaterialPlanning
    },
    { // 排产物料信息
        path: '/SchedulingInformation',
        name: 'SchedulingInformation',
        component: SchedulingInformation
    },
    { // 设备信息
        path: '/DeviceInformation',
        name: 'DeviceInformation',
        component: DeviceInformation
    },
    { // 工装信息
        path: '/SchedulingWorkClothes',
        name: 'SchedulingWorkClothes',
        component: SchedulingWorkClothes
    },
    { // 量具信息
        path: '/SchedulingMeasuringTools',
        name: 'SchedulingMeasuringTools',
        component: SchedulingMeasuringTools
    },
    { // 排产结果甘特图
        path: '/GanttChart',
        name: 'GanttChart',
        component: GanttChart
    },
    { // 排产结果甘特图月度计划
        path: '/MonthlyGanttChart',
        name: 'MonthlyGanttChart',
        component: MonthlyGanttChart
    },
    { // 临时任务分派
        path: '/TemporaryAssignment',
        name: 'TemporaryAssignment',
        component: TemporaryAssignment
    },
    { // 工单状态调整
        path: '/WorkOrderStatus',
        name: 'WorkOrderStatus',
        component: WorkOrderStatus
    },
    { // 生产准备反馈 - 工装
        path: '/AddWorkClothes',
        name: 'AddWorkClothes',
        component: AddWorkClothes
    },
    { // 生产准备反馈 - 设备
        path: '/AddEquipment',
        name: 'AddEquipment',
        component: AddEquipment
    },
    { // 生产准备反馈（物料）
        path: '/AddMaterial',
        name: 'AddMaterial',
        component: AddMaterial
    },
    { // 生产准备反馈- 工量具信息
        path: '/AddMeasure',
        name: 'AddMeasure',
        component: AddMeasure
    },
    { // 生产准备反馈 - 查看
        path: '/AddSee',
        name: 'AddSee',
        component: AddSee
    },
    { // 生产准备反馈- 查看 - 物料信息
        path: '/AddSeeOne',
        name: 'AddSeeOne',
        component: AddSeeOne
    },
    { // 生产准备反馈- 查看 - 设备信息
        path: '/AddSeeTwo',
        name: 'AddSeeTwo',
        component: AddSeeTwo
    },
    { // 生产准备反馈- 查看 - 工装信息
        path: '/AddSeeThree',
        name: 'AddSeeThree',
        component: AddSeeThree
    },
    { // 生产准备反馈- 查看 - 工量具信息
        path: '/AddSeeFour',
        name: 'AddSeeFour',
        component: AddSeeFour
    },
    { // 检验任务分派
        path: '/InspectionTasks',
        name: 'InspectionTasks',
        component: InspectionTasks
    },
    { // 排产结果输出
        path: '/SchedulingResults',
        name: 'SchedulingResults',
        component: SchedulingResults
    },
    { // 输出结果（下发）-主界面
        path: '/IssueResultsHome',
        name: 'IssueResultsHome',
        component: IssueResultsHome
    },
    { // 输出结果（下发）-详细界面1
        path: '/IssueResultsOneInfo',
        name: 'IssueResultsOneInfo',
        component: IssueResultsOneInfo
    },
    { // 输出结果（下发）-主界面 周计划
        path: '/MonthlyOutput',
        name: 'MonthlyOutput',
        component: MonthlyOutput
    },
    { // 输出结果（下发）-详细界面1 周计划
        path: '/MonthlyOutputDetail',
        name: 'MonthlyOutputDetail',
        component: MonthlyOutputDetail
    },
    { // 下发（型号室主任）
        path: '/TypeRoom',
        name: 'TypeRoom',
        component: TypeRoom
    },
    { // 下发（型号室主任） 周计划
        path: '/TypeRoomweek',
        name: 'TypeRoomweek',
        component: TypeRoomweek
    },
    { // 下发（生产室主任）
        path: '/ProductionRoom',
        name: 'ProductionRoom',
        component: ProductionRoom
    },
    { // 下发（生产室主任）周计划
        path: '/ProductionRoomweek',
        name: 'ProductionRoomweek',
        component: ProductionRoomweek
    },
    { // 站位负责人
        path: '/StationChiefs',
        name: 'StationChiefs',
        component: StationChiefs
    },
    { // 滚动排产主界面
        path: '/RollProductionHome',
        name: 'RollProductionHome',
        component: RollProductionHome
    },
    { // 滚动排产 
        path: '/RollProduction',
        name: 'RollProduction',
        component: RollProduction
    },
    { // 日计划 
        path: '/DailyPlan',
        name: 'DailyPlan',
        component: DailyPlan
    },
    { // 工艺规程    
        path: '/ProcessSpecification',
        name: 'ProcessSpecification',
        component: ProcessSpecification
    },
    { // 工艺规程主界面
        path: '/ProcessSpecificationHmoe',
        name: 'ProcessSpecificationHmoe',
        component: ProcessSpecificationHmoe
    },
    { // 工装基础信息
        path: '/ToolingInformation',
        name: 'ToolingInformation',
        component: ToolingInformation
    },
    { // 工具基础信息
        path: '/ToolInformation',
        name: 'ToolInformation',
        component: ToolInformation
    },
    { // 物料信息
        path: '/MaterialInformation',
        name: 'MaterialInformation',
        component: MaterialInformation
    },
    { // BOM信息
        path: '/BOMInformation',
        name: 'BOMInformation',
        component: BOMInformation
    },
    { // BOM信息
        path: '/BOMInformationHome',
        name: 'BOMInformationHome',
        component: BOMInformationHome
    },
    { // 设备
        path: '/Equipment',
        name: 'Equipment',
        component: Equipment
    },
    { // 设备维保基准维护主界面
        path: '/EquipmentMaintenanceHmoe',
        name: 'EquipmentMaintenanceHmoe',
        component: EquipmentMaintenanceHmoe
    },
    { // 设备维保基准维护弹窗界面
        path: '/EquipmentMaintenance',
        name: 'EquipmentMaintenance',
        component: EquipmentMaintenance
    },
    { // 制造日历
        path: '/MakeCalendar',
        name: 'MakeCalendar',
        component: MakeCalendar
    },
    { // 班次
        path: '/Classes',
        name: 'Classes',
        component: Classes
    },
    { // 大修年限配置
        path: '/OverhaulPeriod',
        name: 'OverhaulPeriod',
        component: OverhaulPeriod
    },
    { // 维修文档
        path: '/MaintenanceDocument',
        name: 'MaintenanceDocument',
        component: MaintenanceDocument
    },
    { // 库位维护
        path: '/LocationMaintenance',
        name: 'LocationMaintenance',
        component: LocationMaintenance
    },
    { // 设备、工装、工量具状态维护
        path: '/EquipmentStatus',
        name: 'EquipmentStatus',
        component: EquipmentStatus
    },
    { // 所属产线维护
        path: '/AffiliationProduction',
        name: 'AffiliationProduction',
        component: AffiliationProduction
    },
    { // 种类维护
        path: '/kind',
        name: 'kind',
        component: kind
    },
    { // 设备类型维护
        path: '/deviceType',
        name: 'deviceType',
        component: deviceType
    },
    { // 冻结原因维护 
        path: '/FrozenReasons',
        name: 'FrozenReasons',
        component: FrozenReasons
    },
    { // 释放原因维护
        path: '/Release',
        name: 'Release',
        component: Release
    },
    { // 故障代码维护
        path: '/FaultCode',
        name: 'FaultCode',
        component: FaultCode
    },
    { // 责任单位 维护
        path: '/Technology',
        name: 'Technology',
        component: Technology
    },
    { // 异常类型
        path: '/ExceptionTypes',
        name: 'ExceptionTypes',
        component: ExceptionTypes
    },
    { // 站位人员维护
        path: '/StationPersonnel',
        name: 'StationPersonnel',
        component: StationPersonnel
    },
    { // 人员资质维护
        path: '/PersonnelQualification',
        name: 'PersonnelQualification',
        component: PersonnelQualification
    },
    { // 资质维护
        path: '/certification',
        name: 'certification',
        component: certification
    },
    { // 资质等级维护
        path: '/credential',
        name: 'credential',
        component: credential
    },
    { // 处理结果维护 
        path: '/ResultCode',
        name: 'ResultCode',
        component: ResultCode
    },
    { // 备件基础信息
        path: '/SparePartsBasics',
        name: 'SparePartsBasics',
        component: SparePartsBasics
    },
    { // 物料配送任务
        path: '/MDistributionTask',
        name: 'MDistributionTask',
        component: MDistributionTask
    },
    { // 物料接收（线边库）
        path: '/StorageAreatask',
        name: 'StorageAreatask',
        component: StorageAreatask
    },
    { // 料盒与AGV绑定
        path: '/Materialbox',
        name: 'Materialbox',
        component: Materialbox
    },
    { // 物料基础信息
        path: '/MaterialBasis',
        name: 'MaterialBasis',
        component: MaterialBasis
    },
    { // 工艺编制
        path: '/ProcessPreparation',
        name: 'ProcessPreparation',
        component: ProcessPreparation
    },
    { // 添加站位工艺
        path: '/SiteTechnology',
        name: 'SiteTechnology',
        component: SiteTechnology
    },
    { // 指令编辑
        path: '/InstructionEditing',
        name: 'InstructionEditing',
        component: InstructionEditing
    },
    { // 指令编辑内容
        path: '/InstructionContent',
        name: 'InstructionContent',
        component: InstructionContent
    },
    { // 通信导航
        path: '/CommunicationAndNavigation',
        name: 'CommunicationAndNavigation',
        component: CommunicationAndNavigation
    },
    { // 派工调整    
        path: '/DispatchAdjustment',
        name: 'DispatchAdjustment',
        component: DispatchAdjustment
    },
    { // 派工调整弹框
        path: '/DispatchBox',
        name: 'DispatchBox',
        component: DispatchBox
    },
    { // 改派
        path: '/ReassignmentBox',
        name: 'ReassignmentBox',
        component: ReassignmentBox
    },
    { // 拆解审批
        path: '/DisassemblySubmit',
        name: 'DisassemblySubmit',
        component: DisassemblySubmit
    },
    { // 工单拆解
        path: '/WorkOrderDisassembly',
        name: 'WorkOrderDisassembly',
        component: WorkOrderDisassembly
    },
    { // 指令选择界面
        path: '/InstructionSelection',
        name: 'InstructionSelection',
        component: InstructionSelection
    },
    { // 拆解确认
        path: '/DisassembleAffirm',
        name: 'DisassembleAffirm',
        component: DisassembleAffirm
    },
    { // 多次拆解
        path: '/RepeatedlyDisassemble',
        name: 'RepeatedlyDisassemble',
        component: RepeatedlyDisassemble
    },
    { //  生产异常 - 站位长 流程
        path: '/OnsiteProblem',
        name: 'OnsiteProblem',
        component: OnsiteProblem
    },
    { // 生产异常 - 工段长 流程
        path: '/SectionChief',
        name: 'SectionChief',
        component: SectionChief
    },
    { // 生产异常 - 负责人 流程
        path: '/Principal',
        name: 'Principal',
        component: Principal
    },
    { // 月计划查看
        path: '/MonthlyPlan',
        name: 'MonthlyPlan',
        component: MonthlyPlan
    },
    { // 周计划查看
        path: '/WeeklyPlan',
        name: 'WeeklyPlan',
        component: WeeklyPlan
    },
    { // 装配过程追踪
        path: '/AssemblyProcessTracking',
        name: 'AssemblyProcessTracking',
        component: AssemblyProcessTracking
    },
    { // 详细装配信息
        path: '/DetailedAssemblyInformation',
        name: 'DetailedAssemblyInformation',
        component: DetailedAssemblyInformation
    },
    { // 参数表信息
        path: '/parameter',
        name: 'parameter',
        component: parameter
    },
    { // 站位交接
        path: '/StationHandover',
        name: 'StationHandover',
        component: StationHandover
    },
    { // 移交站位
        path: '/TransferStation',
        name: 'TransferStation',
        component: TransferStation
    },
    { // 接收站位
        path: '/ReceivingStation',
        name: 'ReceivingStation',
        component: ReceivingStation
    },
    { // 站位交接记录
        path: '/StationHandoverRecord',
        name: 'StationHandoverRecord',
        component: StationHandoverRecord
    },
    { // 站位质量信息 - 查看详细信息
        path: '/PositionInstructSee',
        name: 'PositionInstructSee',
        component: PositionInstructSee
    },
    { // 外协转出
        path: '/OutsourcingTransferOut',
        name: 'OutsourcingTransferOut',
        component: OutsourcingTransferOut
    },
    { // 外协转入
        path: '/OutsourcingTransferIn',
        name: 'OutsourcingTransferIn',
        component: OutsourcingTransferIn
    },
    { // 外协记录查询
        path: '/OutsourcingRecord',
        name: 'OutsourcingRecord',
        component: OutsourcingRecord
    },
    { // 工人接收
        path: '/WorkersReceive',
        name: 'WorkersReceive',
        component: WorkersReceive
    },
    { // 工人报工
        path: '/Workers',
        name: 'Workers',
        component: Workers
    },
    { // 工艺更改单
        path: '/WorkRecord',
        name: 'WorkRecord',
        component: WorkRecord
    },
    { // 质量参数录入界面  
        path: '/Massparameter',
        name: 'Massparameter',
        component: Massparameter
    },
    { // 质量异常记录
        path: '/Abnormalquality',
        name: 'Abnormalquality',
        component: Abnormalquality
    },
    { // 物料呼叫
        path: '/MaterialCall',
        name: 'MaterialCall',
        component: MaterialCall
    },
    { // 物料确认
        path: '/MaterialConfirmation',
        name: 'MaterialConfirmation',
        component: MaterialConfirmation
    },
    { // 临时任务报工
        path: '/TemporaryTaskReport',
        name: 'TemporaryTaskReport',
        component: TemporaryTaskReport
    },
    { // 公用资源的使用与归还
        path: '/PublicResource',
        name: 'PublicResource',
        component: PublicResource
    },
    { // 报工记录查看
        path: '/WorkerSee',
        name: 'WorkerSee',
        component: WorkerSee
    },
    { // 智能工具柜库存信息查看
        path: '/ToolCabinet',
        name: 'ToolCabinet',
        component: ToolCabinet
    },
    { // 工装台账   
        path: '/ToolingParameter',
        name: 'ToolingParameter',
        component: ToolingParameter
    },
    { // 维保任务保养
        path: '/MaintenanceTask',
        name: 'MaintenanceTask',
        component: MaintenanceTask
    },
    { // 维保信息录入
        path: '/MaintenanceInfo',
        name: 'MaintenanceInfo',
        component: MaintenanceInfo
    },
    { // 设备维修 - 维修
        path: '/Reception',
        name: 'Reception',
        component: Reception
    },
    { // 设备维修 - 下发
        path: '/Issue',
        name: 'Issue',
        component: Issue
    },
    { // 设备维修 - 维修过程记录
        path: '/MaintenanceRecord',
        name: 'MaintenanceRecord',
        component: MaintenanceRecord
    },
    { // 维保记录查看
        path: '/MaintenanceView',
        name: 'MaintenanceView',
        component: MaintenanceView
    },
    { // 维保记录查看-详细信息
        path: '/MaintenanceViewInfo',
        name: 'MaintenanceViewInfo',
        component: MaintenanceViewInfo
    },
    { // 维修记录查看
        path: '/MaintainView',
        name: 'MaintainView',
        component: MaintainView
    },
    { // 维修记录查看-详细信息
        path: '/MaintainViewInfo',
        name: 'MaintainViewInfo',
        component: MaintainViewInfo
    },
    { // 实做bom
        path: '/PracticeBomHome',
        name: 'PracticeBomHome',
        component: PracticeBomHome
    },
    { // 实做bom弹框
        path: '/PracticeBom',
        name: 'PracticeBom',
        component: PracticeBom
    },
    { // 工装定检--子界面
        path: '/FrockRegularCheck',
        name: 'FrockRegularCheck',
        component: FrockRegularCheck
    },
    { // 工装定检--工装使用信息
        path: '/EquipmentUse',
        name: 'EquipmentUse',
        component: EquipmentUse
    },
    { // 工（量）具台账
        path: '/MeasuringParameter',
        name: 'MeasuringParameter',
        component: MeasuringParameter
    },
    { // 工（量）具定检信息
        path: '/MeasuringCheck',
        name: 'MeasuringCheck',
        component: MeasuringCheck
    },
    { // 设备定检信息
        path: '/EquipmentRegularInspection',
        name: 'EquipmentRegularInspection',
        component: EquipmentRegularInspection
    },
    { // 工量具使用信息
        path: '/MeasuringUse',
        name: 'MeasuringUse',
        component: MeasuringUse
    },
    { // 维修结果确认
        path: '/ResultConfirmation',
        name: 'ResultConfirmation',
        component: ResultConfirmation
    },
    { // 维修结果确认弹框
        path: '/AcceptanceResults',
        name: 'AcceptanceResults',
        component: AcceptanceResults
    },
    { // 设备台账
        path: '/EquipmentRecord',
        name: 'EquipmentRecord',
        component: EquipmentRecord
    },
    { // 线边库工单分拣  
        path: '/WorkSorting',
        name: 'WorkSorting',
        component: WorkSorting
    },
    { // 线边库工单分拣 - 详细信息
        path: '/WorkSortInfo',
        name: 'WorkSortInfo',
        component: WorkSortInfo
    },
    { // 线边库台账
        path: '/StandingBook',
        name: 'StandingBook',
        component: StandingBook
    },
    { // 线边库出库
        path: '/WarehouseOut',
        name: 'WarehouseOut',
        component: WarehouseOut
    },
    { // 线边库入库
        path: '/Storage',
        name: 'Storage',
        component: Storage
    },
    { // 线边库盘点
        path: '/TakeStock',
        name: 'TakeStock',
        component: TakeStock
    },
    { // 库存调整
        path: '/StockAdjustment',
        name: 'StockAdjustment',
        component: StockAdjustment
    },
    { // 线边库盘点审批 - 站位长
        path: '/AddLongPosition',
        name: 'AddLongPosition',
        component: AddLongPosition
    },
    { // 线边库盘点审批 - 工段长
        path: '/AddSectionChief',
        name: 'AddSectionChief',
        component: AddSectionChief
    },
    { // 线边库盘点审批 - 总计划员
        path: '/AddTotalPlanner',
        name: 'AddTotalPlanner',
        component: AddTotalPlanner
    },
    { // 备件出库
        path: '/SpareParts',
        name: 'SpareParts',
        component: SpareParts
    },
    { // 质量异常处理-检验组长
        path: '/AndGroupLeader',
        name: 'AndGroupLeader',
        component: AndGroupLeader
    },
    { // 质量异常处理-检验组长-质量异常详细信息
        path: '/AndGroupLeaderBox',
        name: 'AndGroupLeaderBox',
        component: AndGroupLeaderBox
    },
    { // 质量异常处理-技术负责人
        path: '/AndTechnicalDirector',
        name: 'AndTechnicalDirector',
        component: AndTechnicalDirector
    },
    { // 质量异常处理-技术负责人-质量异常详细信息
        path: '/AndTechnicalDirectorBox',
        name: 'AndTechnicalDirectorBox',
        component: AndTechnicalDirectorBox
    },
    { // 质量异常处理-工艺
        path: '/AndTechnology',
        name: 'AndTechnology',
        component: AndTechnology
    },
    { // 质量异常处理-工艺-质量异常详细信息
        path: '/AndTechnologyBox',
        name: 'AndTechnologyBox',
        component: AndTechnologyBox
    },
    { //质量异常处理-封闭
        path: '/AndSealing',
        name: 'AndSealing',
        component: AndSealing
    },
    { //质量异常处理-封闭-质量异常详细信息
        path: '/AndSealingBox',
        name: 'AndSealingBox',
        component: AndSealingBox
    },
    { //报废单
        path: '/ScrapForm',
        name: 'ScrapForm',
        component: ScrapForm
    },
    { // 质量履历本- 主界面 
        path: '/ReferenceSamplesHome',
        name: 'ReferenceSamplesHome',
        component: ReferenceSamplesHome
    },
    { // 质量履历本- 主详细界面
        path: '/RecordHome',
        name: 'RecordHome',
        component: RecordHome
    },
    { // 质量履历本- 报工记录表 - 详细界面
        path: '/RecordOne',
        name: 'RecordOne',
        component: RecordOne
    },
    { // 质量履历本- 质量记录表 - 详细界面
        path: '/RecordTwo',
        name: 'RecordTwo',
        component: RecordTwo
    },
    { // 质量履历本- 质量异常记录表 - 详细界面
        path: '/RecordThree',
        name: 'RecordThree',
        component: RecordThree
    },
    { // 质量履历本- 配套表 - 详细界面
        path: '/RecordFour',
        name: 'RecordFour',
        component: RecordFour
    },
    { // 质量履历本- 工艺更改单 - 详细界面  RecordSix
        path: '/RecordFive',
        name: 'RecordFive',
        component: RecordFive
    },
    { // 质量履历本- 上传附件 - 详细界面  
        path: '/RecordSix',
        name: 'RecordSix',
        component: RecordSix
    },
// ***************集成3D场景******************
    { // 集成3D场景主页
        path: '/Instructionadjust',
        name: 'Instructionadjust',
        component: Instructionadjust,
    },
    { // 集成3D场景主页 异常信息 默认子组件
        path: '/OnsiteProbleNewly',
        name: 'OnsiteProbleNewly',
        component: OnsiteProbleNewly
    },
    { //  新增异常信息查看及添加页面 //无用
        path: '/ExceptionMessage',
        name: 'ExceptionMessage',
        component: ExceptionMessage
    },
    { // 集成3D场景主页 指令调整 调整子组件
        path: '/DispatchBoxNewly',
        name: 'DispatchBoxNewly',
        component: DispatchBoxNewly
    },
    { // 集成3D场景主页 指令调整 物料信息子组件
        path: '/ShortItemNewly',
        name: 'ShortItemNewly',
        component: ShortItemNewly
    },
    { // 集成3D场景主页 移交站位
        path: '/TransferStationNewly',
        name: 'TransferStationNewly',
        component: TransferStationNewly
    },
    { // 集成3D场景主页 站位交接查询
        path: '/ReceivingStationNewly',
        name: 'ReceivingStationNewly',
        component: ReceivingStationNewly
    },
    { // 新增设备信息子组件作为指令调整中的设备总数及不可用数页面 //无用
        path: '/DeviceInformationNewly',
        name: 'DeviceInformationNewly',
        component: DeviceInformationNewly
    },
    { // 新增工装信息子组件作为指令调整的工装总数及不可用数页面 //无用
        path: '/SchedulingWorkClothesNewly',
        name: 'SchedulingWorkClothesNewly',
        component: SchedulingWorkClothesNewly
    },
    { // 集成3D场景主页 指令调整 工量具信息子组件
        path: '/SchedulingMeasuringToolsNewly',
        name: 'SchedulingMeasuringToolsNewly',
        component: SchedulingMeasuringToolsNewly
    },
    { //集成3D场景主页 生产反馈 默认子组件
        path: '/AddSeeNewly',
        name: 'AddSeeNewly',
        component: AddSeeNewly
    },
    { // 生产准备反馈- 查看 - 物料信息 新增
        path: '/AddSeeOneNewly',
        name: 'AddSeeOneNewly',
        component: AddSeeOneNewly
    },
    { // 生产准备反馈- 查看 - 设备信息 新增
        path: '/AddSeeTwoNewly',
        name: 'AddSeeTwoNewly',
        component: AddSeeTwoNewly
    },
    { // 生产准备反馈- 查看 - 工装信息 新增
        path: '/AddSeeThreeNewly',
        name: 'AddSeeThreeNewly',
        component: AddSeeThreeNewly
    },
    { // 生产准备反馈- 查看 - 工量具信息 新增
        path: '/AddSeeFourNewly',
        name: 'AddSeeFourNewly',
        component: AddSeeFourNewly
    },
    { // 集成3D场景主页 指令调整 默认子组件
        path: '/DispatchAdjustmentNewly',
        name: 'DispatchAdjustmentNewly',
        component: DispatchAdjustmentNewly
    },
    { // 集成3D场景主页 指令调整 改派子组件
        path: '/ReassignmentBoxNewly',
        name: 'ReassignmentBoxNewly',
        component: ReassignmentBoxNewly
    },
    { // 新增站位交接页面父组件 //无用
        path: '/PositionTheHandover',
        name: 'PositionTheHandover',
        component: PositionTheHandover
    },

    { // 集成3D场景主页 站位交接 默认子组件
        path: '/StationHandoverNewly',
        name: 'StationHandoverNewly',
        component: StationHandoverNewly
    },
    { // 新增质量异常记录作为站位交接质量问题子组件 //无用
        path: '/AbnormalqualityNewly',
        name: 'AbnormalqualityNewly',
        component: AbnormalqualityNewly
    },
    { // 集成3D场景主页 指令调整 工装情况子组件
        path: '/FrockRegularCheckNewly',
        name: 'FrockRegularCheckNewly',
        component: FrockRegularCheckNewly
    },
    { // 集成3D场景主页 站位交接 站位质量信息详细子组件
        path: '/PositionInstructSeeNewly',
        name: 'PositionInstructSeeNewly',
        component: PositionInstructSeeNewly
    },
    { // 新增设备维修任务
        path: '/EquipmentNewly',
        name: 'EquipmentNewly',
        component: EquipmentNewly
    },
    { // 集成3D场景主页 指令调整 设备情况子组件
        path: '/IssueNewly',
        name: 'IssueNewly',
        component: IssueNewly
    },
    { // 新增总装产线页面
        path: '/AssemblyProduction',
        name: 'AssemblyProduction',
        component: AssemblyProduction
    },
    { // 集成3D排产信息场景页面
        path: '/Scheduling',
        name: 'Scheduling',
        component: Scheduling,
        children: [
            { // 集成3D排产信息场景 默认子组件
                path: '/SchedulingHomeNewly',
                name: 'SchedulingHomeNewly',
                component: SchedulingHomeNewly
            },
            { // 集成3D排产信息场景 排产高级子组件
                path: '/ProductionSchedulingNewly',
                name: 'ProductionSchedulingNewly',
                component: ProductionSchedulingNewly
            },
            { // 集成3D排产信息场景 排产结果输出子组件
                path: '/SchedulingResultsNewly',
                name: 'SchedulingResultsNewly',
                component: SchedulingResultsNewly
            },
            { // 3D嵌套排产物料齐套性检查
                path: '/MaterialInspectionNewly',
                name: 'MaterialInspectionNewly',
                component: MaterialInspectionNewly
            },
            { //3D嵌套排产 物料缺件
                path: '/ShortItemNewly2',
                name: 'ShortItemNewly2',
                component: ShortItemNewly2
            },
            { //3D嵌套排产 输出下发
                path: '/IssueResultsHomeNewly',
                name: 'IssueResultsHomeNewly',
                component: IssueResultsHomeNewly
            },
            { //3D嵌套排产 输出下发详细
                path: '/IssueResultsOneInfoNewly',
                name: 'IssueResultsOneInfoNewly',
                component: IssueResultsOneInfoNewly
            },
            
        ]
    },
    { // 集成3D场景主页 维修任务主页
        path: '/maintainNewly',
        name: 'maintainNewly',
        component: maintainNewly,
        children: [
            { // 集成3D场景主页 维修记录 下发
                path: '/IssueNewly2',
                name: 'IssueNewly2',
                component: IssueNewly2
            },
            { // 集成3D场景主页 维修记录查看子组件
                path: '/MaintainViewNewly',
                name: 'MaintainViewNewly',
                component: MaintainViewNewly
            },
            { // 集成3D场景主页 维修记录查看-详细信息子组件
                path: '/MaintainViewInfoNewly',
                name: 'MaintainViewInfoNewly',
                component: MaintainViewInfoNewly
            },
        ]
    },
    { // 工装定检--主界面
        path: '/FrockRegularCheckHome',
        name: 'FrockRegularCheckHome',
        component: FrockRegularCheckHome,
        children:[
            { // 新增工装信息工装定检
                path: '/ToolingetectionNewly',
                name: 'ToolingetectionNewly',
                component: ToolingetectionNewly
            }
        ]
    },
    ]
})