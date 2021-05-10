// 封装一个插件  注册所有的全局组件
import MyPersonnel from '@/encapsulation/my-personnel'
export default {
  install (Vue) {
    // 基于Vue做任何事情（注册全局组件，指令，过滤器，挂载原型函数）
    // 人员编号名称- 刷卡 手输 子组件
    Vue.component(MyPersonnel.name, MyPersonnel)
  }
}
