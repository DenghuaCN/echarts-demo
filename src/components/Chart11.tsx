import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

import px from '../utils/px';
import baseEChartOptions from '../common/baseEChartOptions';

export default () => {
  const divRef = useRef(null);
  const colors = ['#F46064', '#F38E1C', '#1CDB7C', '#33A4FA'];

  useEffect(() => {
    let myChart = echarts.init(divRef.current);

    myChart.setOption({
      ...baseEChartOptions,

      color: colors,
      xAxis: { show: false },
      yAxis: { show: false },
      legend: { // 图例标记
        show: true,
        bottom: '5%',
        width: px(1000),
        itemWidth: px(20), // 图例标记的图形宽度
        itemHeight: px(15), // 图例标记的图形高度
        itemGap: px(10), // 图例标记之间的间隔
        textStyle: {
          fontSize: px(12),
          color: '#fff',
        }
      },
      series: [
        {
          startAngle: -20,
          type: 'pie',
          bottom: '15%',
          radius: ['25%', '90%'],
          avoidLabelOverlap: false,
          label: {
            show: true, position: 'outside', textStyle: { color: 'white', fontSize: px(20) },
            distanceToLabelLine: 0,
            formatter(options) {
              return options.value * 100 + '%';
            }
          },
          labelLine: { show: true, length: 0 },
          roseType: 'area',
          itemStyle: {
            shadowBlur: px(200),
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          data: [
            { value: 0.36, name: '字段1' },
            { value: 0.20, name: '字段2' },
            { value: 0.18, name: '字段3' },
            { value: 0.24, name: '字段4' },
          ]
        }
      ]
    });
  }, []);

  return (
    <div className="chart11">
      <div className="chart">
        <div className="main" ref={divRef} />
      </div>
    </div>
  );
};