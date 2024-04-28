import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

import px from '../utils/px';
import baseEChartOptions from '../common/baseEChartOptions';

const Chart7 = () => {
  const divRef = useRef(null);

  useEffect(() => {
    let myChart = echarts.init(divRef.current);

    myChart.setOption({
      ...baseEChartOptions,
      color: ['#8D70F8', '#33A4FA'],
      xAxis: { show: false },
      yAxis: { show: false },
      legend: { // 图例标记
        show: true,
        bottom: '4%',
        width: px(270),
        itemWidth: px(40), // 图例标记的图形宽度
        itemHeight: px(25), // 图例标记的图形高度
        itemGap: px(30), // 图例标记之间的间隔
        textStyle: {
          fontSize: px(18),
          color: '#fff',
        }
      },
      series: [
        {
          name: 'origin',
          type: 'pie',
          radius: ['70%', '85%'], // 饼图的半径
          avoidLabelOverlap: false, // 是否启用防止标签重叠策略
          top: '-15%',
          label: { // 饼图图形上的文本标签
            show: true,
            position: 'inside',
            color: 'white',
            fontSize: px(20),
            formatter(options) {
              return (options.value * 100).toFixed(0) + '%';
            }
          },
          labelLine: { show: false }, // 标签的视觉引导线配置
          itemStyle: {
            borderColor: '#0F113A',
            borderWidth: px(4)
          },
          data: [
            { value: 0.5, name: '女' },
            { value: 0.5, name: '男' },
          ]
        }
      ]
    });
  }, []);

  return (
    <div className="chart-bottom-group1">
      <div className="chart">
        <div className="main" ref={divRef} />
        <div className="text">性别</div>
      </div>
    </div>
  )
}

export default Chart7;