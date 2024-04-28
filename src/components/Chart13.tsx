import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';

import baseEChartOptions from '../common/baseEChartOptions';
import px from '../utils/px';

const originData = [
  { value: 0.08, name: 'field1' },
  { value: 0.06, name: 'field2' },
  { value: 0.11, name: 'field3' },
  { value: 0.09, name: 'field4' },
  { value: 0.12, name: 'field5' },
  { value: 0.06, name: 'field6' },
  { value: 0.08, name: 'field7' },
  { value: 0.08, name: 'field8' },
];

export default () => {
  const myChart = useRef(null);
  const divRef = useRef(null);
  const [data, setData] = useState(originData);

  /**
   * @description 使用setInterval模拟数据变化
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setData(originData.map((item) => ({ name: item.name, value: Number(Math.random().toFixed(2)) })))

      return () => clearInterval(intervalId)
    }, 4000);
  }, [])

  useEffect(() => {
    myChart.current = echarts.init(divRef.current);
    myChart.current.setOption({
      ...baseEChartOptions,
      grid: {
        ...baseEChartOptions.grid,
        left: px(50),
        bottom: px(40),
      },
      xAxis: {
        data: data.map(i => i.name),
        axisTick: { show: false },
        axisLine: {
          lineStyle: { color: '#083B70' }
        },
        axisLabel: {
          fontSize: px(12),
        },
      },
      yAxis: {
        splitLine: { show: false },
        axisLine: {
          show: true,
          lineStyle: { color: '#083B70' }
        },
        axisLabel: {
          fontSize: px(12),
          formatter(value) {
            return (value * 100).toFixed(0) + '%';
          }
        }
      },
      series: [{
        type: 'bar',
        data: data.map(i => i.value),
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#0A97FB'
        }, {
          offset: 1,
          color: '#1E34FA'
        }]),
      }]
    });
  }, []);

  /**
   * 跟踪data变化，重新set数据
   */
  useEffect(() => {
    myChart.current.setOption({
      series: {
        data: data.map((item) => item.value)
      },
    })
  }, [data])

  return (
    <div ref={divRef} className="chart">

    </div>
  );
};