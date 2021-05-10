// let baseUrl = 'http://192.168.1.117'; //本地环境
// let baseUrl = 'http://192.168.1.122'; //本地环境
// let baseUrl = 'http://192.168.1.106';//本地环境
// let baseUrl = 'http://192.168.1.113';//本地环境
let baseUrl = 'http://192.168.100.67';//本地环境
// let baseUrl='http://api.gateway.com';//服务器
// 项目配置相关
const config = {
    BASE_URL: baseUrl,
}
const modulesConfig = {

    //服务器
    ProcessSpecification: baseUrl + ':8080/api-e', //工艺规程
    MOMAssemblyExecution: baseUrl + ':8080/api-t', //MOM装配执行管理模块端口
    MOMStationScheduling: baseUrl + ':8080/api-e', //MOM站位内调度模块端口
    PlanningProduction: baseUrl + ':8080/api-e', //高级计划排产模块端口
    AutomaticScheduling: baseUrl + ':8080/api-p', //高级计划排产模块自动排产端口
    BasicData: baseUrl + ':8080/api-q', //基础数据模块端口
    ResourceManagement: baseUrl + ':8080/api-c', //资源管理模块
    Integration: baseUrl + ':8080/api-i', //集成模块
    StationDispatching: baseUrl + ':8080/api-e', //3D集成模块新增

    //本地
    // ProcessSpecification: baseUrl + ':9801', //工艺规程
    // MOMAssemblyExecution: baseUrl + ':9223', //MOM装配执行管理模块端口
    // MOMStationScheduling: baseUrl + ':9779', //MOM站位内调度模块端口
    // PlanningProduction: baseUrl + ':9801', //高级计划排产模块端口
    // AutomaticScheduling: baseUrl + ':9225', //高级计划排产模块自动排产端口
    // BasicData: baseUrl + ':9778', //基础数据模块端口
    // ResourceManagement: baseUrl + ':9224', //资源管理模块

}
exports.config = config
exports.modulesConfig = modulesConfig