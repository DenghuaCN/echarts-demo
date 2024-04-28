import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import baseEChartOptions from '../common/baseEChartOptions';
import px from '../utils/px';

export default () => {
  const divRef = useRef(null);

  const data = [
    { value: 0.08, name: '东岗路' },
    { value: 0.06, name: '段家滩' },
    { value: 0.11, name: '雁北' },
    { value: 0.09, name: '五泉山' },
    { value: 0.12, name: '中山路' },
    { value: 0.06, name: '庆阳路' },
    { value: 0.08, name: '武都路' },
    { value: 0.08, name: '酒泉路' },
    { value: 0.08, name: '天水路' },
  ];
  useEffect(() => {
    let myChart = echarts.init(divRef.current);

    myChart.setOption({
      ...baseEChartOptions,
      xAxis: { show: false },
      yAxis: { show: false },
      // 图例组件
      legend: {
        orient: 'vertical',
        left: '0%',
        top: 'middle',
        textStyle: {
          color: 'white',
          fontSize: px(12),
        },
        itemWidth: px(20),
        itemHeight: px(15),
        itemGap: px(15),
        // 注意: 图例的间隔需要使用相对单位(即计算后的值)，不能使用ECharts原生的值，会导致在不同宽高比下的间隔表现不一致。
        // itemGap: 15, // 放开这个itemGap的注释，切换到1920*500的分辨率查看问题
        formatter(name) {
          const value = data.find(i => i.name === name)?.value * 100 + '%';
          return name + ' ' + value;
        }
      },
      series: [
        {
          type: 'pie',
          radius: '80%',
          center: ['60%', '50%'], // 图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
          left: '15%',
          label: {  // 饼图图形上的文本标签
            show: true,
            position: 'inside', // 标签的位置。
            fontStyle: 'italic',
            fontWeight: 'bold',
          },
          labelLine: { show: false }, // 标签的视觉引导线配置
          selectedMode: "single",
          emphasis: { // 高亮状态的扇区和标签样式
            label: {
              color: '#fff',
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: [
            ...data,
          ],
        }
      ]
    });
  }, []);

  return (
    <div className="chart12">
      <div className="chart">
        <div className="main" ref={divRef} />
      </div>
    </div>
  );
};