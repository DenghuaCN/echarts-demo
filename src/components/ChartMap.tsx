import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

import china from '../../assets/geo/china.json';
import baseEChartOptions from '../common/baseEChartOptions';
import px from '../utils/px';

export default function ChartMap() {
  const divRef = useRef(null);

  useEffect(() => {
    let myChart = echarts.init(divRef.current);

    echarts.registerMap('CN', china as any);
    const options = {
      ...baseEChartOptions,
      series: [
        {
          type: 'map',
          map: 'CN', // 自定义扩展图表类型
          zoom: 1.2,
          selectedMode: 'multiple',
          label: {show: false},
          // 地图区域的多边形 图形样式。
          itemStyle: {
            areaColor: '#010D3D', // 普通状态 地图区域背景色
            borderColor: '#01A7F7', // 图形的描边颜色
            fontWeight: 'bold',
          },
          // 高亮(hover)状态下的多边形和标签样式。
          emphasis: {
            label: {
              show: true,
              color: '#fff',  // 标签文字的颜色
              fontSize: px(14),
            },
            itemStyle: {
              areaColor: '#01A7F7', // 地图区域的颜色
            }
          },
          // 选中(click)状态下的多边形和标签样式。
          select: {
            label: {
              show: true,
              color: '#fff', // 标签文字的颜色
              fontSize: px(16),
              fontWeight: 'bold',
            },
            itemStyle: {
              areaColor: '#00ff00', // 选中状态下的区域颜色
            },
          },
          data: [
            {
              name: '四川省',
              selected: true, // 是否选中
              // value: 1,
            },
            {
              name: '广东省',
              selected: true,
            },
          ],
        },
      ]
    }
    myChart.setOption(options);
  }, []);

  return (
    <div className="bordered chart6-map">
      <h2>Map</h2>
      <div className="wrapper">
        <div ref={divRef} className="chart" />
      </div>
    </div>
  );
};