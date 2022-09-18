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
$Color: rgb(176, 175, 169);
$Color_border: #ccc;
$Color_bg: rgb(65, 210, 208);
$Color_ff: #fff;

.alet {
    line-height: 2em;
    color: $Color;
}

.act {
    background: $Color_bg !important;
    color: $Color_ff ;
}

.actlist {
    background: $Color_bg !important;
    color: $Color_ff ;
    opacity: 0.5;
}

.btn {
    min-width: 40px;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    line-height: 3em;
    background: $Color_ff;
    margin: 5px;
    // 放大 缩放 ,尺寸
    // flex-grow: 0;
    // flex-shrink: 0;
    // flex-basis: 20%;
    flex: 0 0 17%;
}

.zxh-age {
    width: 100vw;
    height: 100vh;
    display: flex;
    font-size: 12px;
    background: rgb(243, 245, 246);
    flex-direction: column;
    justify-content: space-between;

    &_header {
        padding-top: .8rem;
        text-align: center;

        .zxh-age_title {
            font-size: 1.3rem;
            line-height: 1.5em;
        }

        span {
            font-size: .8rem;
            text-align: center;
            display: inline-block;
            margin-top: 5px;
            @extend .alet
        }
    }



    &_mian {
        flex: 1;
        padding: 1rem;

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

            .zxh-age-btn {
                @extend .btn;
            }
        }

        .zxh-age-icon {
            font-size: 1.5rem;
            color: $Color_bg;
            text-align: center;
            line-height: 2em;
            margin: 0 20px;
        }
    }

    &_footer {
        @extend .alet;
        padding: .5rem 1.5rem;
        font-size: .6rem;
        text-align: left;
        height: 5rem;
    }
}
</style>