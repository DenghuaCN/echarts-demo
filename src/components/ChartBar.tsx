import React, { useEffect, useRef, useState } from "react";
import * as echarts from 'echarts';

import px from "../utils/px";
import baseEChartOptions from "../common/baseEChartOptions";

const originData = [
  { xName: 'A', value: 10 },
  { xName: 'B', value: 20 },
  { xName: 'C', value: 30 },
  { xName: 'D', value: 40 },
  { xName: 'E', value: 50 },
  { xName: 'F', value: 60 },
  { xName: 'G', value: 70 },
  { xName: 'H', value: 80 },
  { xName: 'I', value: 90 },
  { xName: 'J', value: 100 },
]

export default function ChartBar() {
  const myChart = useRef(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState(originData);

  /**
   * @description 使用setInterval模拟数据变化
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((prev) =>
        prev.map((item) => ({ ...item, value: Math.random() * 100 }))
      )

      return () => clearInterval(intervalId)
    }, 2000);
  }, [])

  /**
   * @description 初始化Echarts
   */
  useEffect(() => {
    myChart.current = echarts.init(divRef.current);
    myChart.current.setOption({
      ...baseEChartOptions,
      // x轴
      xAxis: {
        data: data.map((item) => item.xName),
        axisTick: { show: false }, // 不显示坐标轴刻度
        // 坐标轴轴线相关设置
        axisLine: { // y 轴轴线
          lineStyle: { color: '#083B70' }
        },
        axisLabel: {
          fontSize: px(12),
          //  X轴文字换行
          formatter(val) {
            if (val.length > 2) {
              const array = val.split('');
              array.splice(2, 0, '\n');
              return array.join('');
            } else {
              return val;
            }
          }
        },
      },
      // y轴
      yAxis: {
        // 坐标轴在 grid 区域中的分隔线
        splitLine: {
          lineStyle: {
            // 依次循环设置颜色
            color: ['#083B70', '#0a5299']
          }
        },
        axisLine: {
          show: true,
          lineStyle: { color: '#083B70' }
        },
        //坐标轴刻度标签的相关设置
        axisLabel: {
          fontSize: px(12)
        },
      },
      series: [{
        // 柱状图
        type: 'bar',
        data: data.map((item) => item.value)
      }]
    });
  }, []);

  /**
   * 跟踪data变化，重新set数据
   */
  useEffect(() => {
    myChart.current.setOption({
      xAxis: {
        data: data.map((item) => item.xName),
      },
      series: {
        data: data.map((item) => item.value)
      },
    })
  }, [data])

  return (
    <div className='bordered chart1-box'>
      <h2>柱状图</h2>
      <div ref={divRef} className='chart'></div>
    </div>
  )
};
