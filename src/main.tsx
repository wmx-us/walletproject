import  { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import sensors from 'sa-sdk-javascript'
import './index.css'

import { Provider } from 'mobx-react'
import store from './store/index.ts'
import { BrowserRouter } from 'react-router-dom'
import { AliveScope } from 'react-activation'

// sensors.init({
//   // 服务器地址，用于发送数据的地址
//   server_url: 'your_server_url',

//   // 是否开启可视化埋点分析功能
//   heatmap: {
//     // 是否开启可视化埋点功能
//     clickmap: true,
//     // 是否开启可视化埋点移动端功能
//     scroll_notice_map: true,
//     // 是否开启触达区域类型事件采集
//     scroll_delay_time: 4000,
//     // 其他 heatmap 配置...
//   },

//   // 是否开启调试模式，用于输出日志
//   show_log: true,

//   // 其他配置项...
// });


const container = document.getElementById("root") as HTMLElement
const root = ReactDOM.createRoot(container);

root.render(
  <Provider {...store}>
    <div className='app'>
      <BrowserRouter>
        <Suspense fallback={<></>}>
          <AliveScope>
            <App/>
          </AliveScope>
        </Suspense>
      </BrowserRouter>
    </div>
  </Provider>
)

