<script setup lang="ts">
let arr = [1, 2, 3, 4, 5, 7, 7]
const alertSome = (list: Array<number>) => {
  console.log(list);

}
</script>

<template>
  <div class="app">
    <!-- Mtitle:大标题 String 默认：你期望ta的年龄-->
    <!-- Stitle:小标题 String 默认:选择范围-->
    <!-- color:按钮自动以颜色 默认：#41d2d0-->
    <!-- iconColor:图标颜色 默认：#41d2d0-->
    <!-- icon 图标 String 使用是font-awesome 图标库 默认fa fa-arrows-h -->
    <!-- isReset  Boolean 默认true -->
    <!-- windth  String 默认 17% -->
    <!-- height  String 默认 40px -->
    <!-- data  Array -->
    <!--  v-slot:footer 是否要底部自定义信息 默认空-->
    <!--  @onSection  事件 返回一个数组,数组里面是选中的最小值和最最大值-->
    <zxh-age > 
      <template v-slot:footer>
        <div> 为了打造100%真实的交友平台，请如实填写资料，不真实的资料审核将会被拒绝。</div>
      </template>
    </zxh-age>
    <!-- 默认标签 -->
    <!-- <zxh-age @onSection="alertSome">
    </zxh-age> -->
  </div>

</template>

<style scoped>
.app {
  height: 500px;
}
</style>
