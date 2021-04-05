<template>
    <div style="display:flex">
        <div id="myChart" :style="{ width: '500px', height: '500px' }"></div>
         <div id="myChart2" :style="{ width: '500px', height: '500px' }"></div>
        <div id="myChart1" :style="{ width: '500px', height: '500px' }"></div>
       
    </div>
</template>
   
<style>
body {
    background-color: #eff1f4;
}
</style>

<script>
/** 后端返回这样的值
 *   {
 *       isRecommend:10,
 *       nIsRecommend:10,
 *       isPublic:10,
 *       nIsPublic:10,
 *       category:[{type:'javascript',num:10 },{type:'javascript',num:10 },{type:'javascript',num:10 },{type:'javascript',num:10 },{type:'javascript',num:10 }],
 *       register_num:[{time:'javascript',num:10 },{time:'javascript',num:10 },{time:'javascript',num:10 },{time:'javascript',num:10 },{time:'javascript',num:10 }]
 *   }
 *
 */

import { getDashboard } from "@/api/api";

export default {
    name: "hello",
    data() {
        return {
            msg: "Welcome to Your Vue.js App",
            isRecommend: "",
			nIsRecommend: "",
            isPublic:"",
            nIsPublic:"",
            category:[]
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        init() {
            getDashboard().then((res) => {
                this.isRecommend = res.data.isRecommend;
                this.nIsRecommend = res.data.nIsRecommend;
                this.isPublic = res.data.isPublic;
                this.nIsPublic = res.data.nIsPublic;
                this.category= res.data.category

                // 推荐
                let myChart = this.$echarts.init(
                    document.getElementById("myChart")
				);
                myChart.setOption({
                    title: {
                        text: '文章推荐',
                        subtext: '文章推荐占比例情况',
                        left: 'center'
                    },

                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    series: [
                        {
                            name: "数量",
                            type: "pie", // 设置图表类型为饼图
                            radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                            data: [
                                { value: this.isRecommend, name: '推荐文章' },
                                { value: this.nIsRecommend, name: '未被推荐文章' }
                            ],
                        },
                    ],
				});

                // 公开
                let myChart1 = this.$echarts.init(
                    document.getElementById("myChart1")
				);
                myChart1.setOption({
                    title: {
                        text: '文章公开',
                        subtext: '文章公开占比例情况',
                        left: 'center'
                    },

                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    series: [
                        {
                            name: "数量",
                            type: "pie", // 设置图表类型为饼图
                            radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                            data: [
                                { value: this.isPublic, name: '公开文章' },
                                { value: this.nIsPublic, name: '未被公开文章' }
                            ],
                        },
                    ],
				});

                // 文章分类所占比例
                let myChart2 = this.$echarts.init(
                    document.getElementById("myChart2")
				);
                myChart2.setOption({
                    title: {
                        text: '文章分类',
                        subtext: '文章分类所占比例情况',
                        left: 'center'
                    },

                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    series: [
                        {
                            name: "数量",
                            type: "pie", // 设置图表类型为饼图
                            radius: "60%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                            data:this.category,
                        },
                    ],
				});

            });
        }
    },
};
</script>
