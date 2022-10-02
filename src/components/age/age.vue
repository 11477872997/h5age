<template>
    <div class="zxh-age">
        <div class="zxh-age_header">
            <div class="zxh-age_title">
                {{Mtitle}}
            </div>
            <span>{{Stitle}}</span>
        </div>
        <div class="zxh-age_mian">
            <div class="zxh-age_section">
                <div class="zxh-age-min" :class="[{act:min !=max}]">{{min || '不限'}}</div>
                <i :class="[`zxh-age-icon ${icon}`]"></i>
                <div class="zxh-age-max" :class="[{act:min !=max}]">{{max || '不限'}}</div>
            </div>
            <div class="zxh-age_list">
                <div class="zxh-age-btn" :class="[{act:min === max}]" v-if="isReset" @click="onReset('不限')">不限</div>
                <div class="zxh-age-btn" :class="[ {act:min === item}, {act:max === item},
                {actlist:max > (item as unknown  as number) && min< (item as unknown  as number)}]"
                    v-for="(item,index) in data.filter((v,i)=>data.indexOf(v)===i)" :key="index"
                    @click="onChose(item as number)">
                    {{item}}
                </div>
            </div>
        </div>
        <div class="zxh-age_footer" v-if="$slots.footer">
            <!-- 默认插槽 -->
            <slot name="footer"> </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';
const emit = defineEmits(["onSection"])
const props = defineProps({
    Mtitle: {
        type: String,
        default: '你期望ta的年龄',
        required: false
    },
    Stitle: {
        type: String,
        default: '选择范围',
        required: false
    },
    icon: {
        type: String,
        default: 'fa fa-arrows-h',
        required: false
    },
    color: {
        type: String,
        default: '#41d2d0',
        required: false
    },
    width: {
        type: String,
        default: '17%',
        required: false
    },
    height: {
        type: String,
        default: '40px',
        required: false
    },
    iconColor: {
        type: String,
        default: '#41d2d0',
        required: false
    },
 
    isReset: {
        type: Boolean,
        default: true,
        required: false
    },
    data: {
        type: Array,
        default: arr,
        required: false
    }
})
// 最大值和最小值
let min: any = ref('');
let max: any = ref('');
// 重置
let onReset = (v: string) => {
    if (v === '不限') {
        [min.value, max.value] = ['', ''];
        return;
    }

}
// 选择区间
let onChose = (v: number) => {
    // 当前
    if (min.value === v) {
        if (!max.value) return
        min.value = max.value;
        max.value = '';
        return
    }
    if (max.value === v) {
        max.value = '';
        return
    }
    // 起点
    if (!min.value && !max.value) {
        min.value = v;
    } else if (min.value < v) {
        // 结束
        max.value = v;
    } else if (max.value && min.value > v) {
        // 最小值-前
        min.value = v;
    } else if (!max.value && min.value > v) {
        // 交换
        max.value = min.value;
        min.value = v;
    }
}


// 返回值选中的值
watch(() => [min.value, max.value], (newValue, oldValue) => {
    emit('onSection', newValue);
});


</script>
<script lang="ts">
// 默认值
let arr: Array<number> = [];
for (let i = 18; i < 61; i++) {
    arr.push(i);
}
export default {
    name: "ZxhAge",
};
</script>

<style lang="scss" scoped>
$Color: #b0afa9;
$Color_border: #ccc;
$Color_bg: v-bind('color');
$iconColor: v-bind('iconColor');
$Color_ff: #fff;

.alet {
    color: $Color;
}
// 选中按钮颜色
.act {
    background: $Color_bg !important;
    color: $Color_ff ;
}
// 选中按钮区间颜色
.actlist {
    background: $Color_bg !important;
    color: $Color_ff ;
    opacity: 0.5;
}
// 按钮颜色
.btn {
    cursor: pointer;
    width: v-bind('width');
    height: v-bind('height');
    border-radius: 10px;
    text-align: center;
    line-height: v-bind('height');
    background: $Color_ff;
    margin: 5px;
}

.zxh-age {
    max-width: 760px;
    margin: 0 auto;
    position: relative;
    display: flex;
    font-size: 12px;
    background: rgb(243, 245, 246);
    flex-direction: column;
    &_header {
        position: relative;
        padding-top:20px;
        text-align: center;
        .zxh-age_title {
            font-size: 22px;
            line-height: 22px;
        }
        span {
            text-align: center;
            display: inline-block;
            margin-top: 5px;
            @extend .alet
        }
    }

    &_mian {
        position:relative;
        flex: 1;
        padding:10px;
        .zxh-age_section {
            display: flex;
            justify-content: center;
            .zxh-age-min,
            .zxh-age-max {
                @extend .btn;
            }
        }
        .zxh-age_list {
            display: flex;
            flex-wrap: wrap;
            padding-top: 30px;
            justify-content: center;
            .zxh-age-btn {
                @extend .btn;
            }
        }
        .zxh-age-icon {
            position:relative;
            font-size: 12px;
            color: $iconColor;
            text-align: center;
            line-height: 20px;
            margin: 12px;
        }
    }
    &_footer {
        @extend .alet;
        padding: 10px;
        font-size:12px;
    }
}
</style>