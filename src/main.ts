import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App)
import 'font-awesome/css/font-awesome.min.css'
// 使用自定义插件
import age from './components/index'
app.use(age);

app.mount('#app')
