import { App } from 'vue'
import Age from './age/age.vue'

const components = [
    Age
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = (app: App) => {
    components.map((item: any) => {
        app.component(item.name, item)
    })
}


export default install