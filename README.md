```
npm install h5age
```

## API

| 参数| 说明 |类型|默认值|
| --- | --- |--- |--- |
| Mtitle |大标题|string |你期望ta的年龄 |
| Stitle |小标题|string |选择范围 |
| icon |图标:使用是font-awesome(https://fontawesome.dashgame.com/) 图标库 |string |选择范围 |fa fa-arrows-h
| isReset |不限|Boolean |true |
| v-slot:footer | 是否要底部自定义信息|--- |--- |



## Events

| 事件名| 说明 |类型|
| --- | --- |--- |
| onSection | 返回一个数组,数组里面是选中的最小值和最最大值|--- |

## 默认模板
```
<zxh-age ></zxh-age>
```
## 带参数和事件
```
<zxh-age Mtitle="你希望他的年龄" Stitle="区间" icon="fa fa-arrows-h" :data="arr" @onSection="alertSome" >
      <template v-slot:footer>
        <div> 为了打造100%真实的交友平台，请如实填写资料，不真实的资料审核将会被拒绝。</div>
      </template>
    </zxh-age> 

const alertSome = (list) => {
  console.log(list);

}
let arr = [1, 2, 3, 4, 5, 7, 7]
```