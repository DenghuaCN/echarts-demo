import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';

import baseEChartOptions from '../common/baseEChartOptions';
import px from '../utils/px';

const originData = [
  [12.2, 7.83],
  [2.02, 4.47],
  [1.05, 3.33],
  [4.05, 4.96],
  [6.03, 7.24],
  [12.0, 6.26],
  [12.0, 8.84],
  [7.08, 5.82],
  [5.02, 5.68],
]

export default () => {
  const myChart = useRef(null);
  const divRef = useRef(null);
  const [data, setData] = useState(originData);

  const getRandom = () => Number((Math.random() * 10).toFixed(2))

  /**
   * @description 使用setInterval模拟数据变化
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      const updateStatus = (prev) => {
        if (prev.length >= 30) {
          return structuredClone(originData);
        }
        return [...prev, [getRandom(), getRandom()]]
      }

      setData((prev) => updateStatus(prev))

      return () => clearInterval(intervalId)
    }, 1000);
  }, [])

  useEffect(() => {
    myChart.current = echarts.init(divRef.current);
    myChart.current.setOption({
      ...baseEChartOptions,
      grid: {
        ...baseEChartOptions.grid,
        left: px(50),
      },
      xAxis: {
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#8D70F8', '##33A4FA']
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#0A97FE'
          },
        },
        axisLabel: {
          formatter: "{value} cm",
          fontSize: px(12),
        }
      },
      yAxis: {
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#33A4FA', '#8D70F8']
          }
        },
        axisLine: {
          show: true,
          lineStyle: { color: '#0A97FE' },
        },
        axisLabel: {
          formatter: "{value} kg",
          fontSize: px(14),
        }
      },
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: '#0A97FE'
      }, {
        offset: 1,
        color: '#1E34FF'
      }]),
      series: [
        {
          type: 'scatter',
          symbolSize: 12,
          data: data
        }
      ]
    });
  }, []);

  /**
   * 跟踪data变化，重新set数据
   */
  useEffect(() => {
    myChart.current.setOption({
      series: [
        {
          data: data
        }
      ],
    })
  }, [data])

  return (
    <div ref={divRef} className="chart"></div>
  );
};