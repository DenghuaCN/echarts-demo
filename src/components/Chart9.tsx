import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';

import px from '../utils/px';
import baseEChartOptions from '../common/baseEChartOptions';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const originData = {
  xName: letters.slice(0, 6),
  series: [0.39, 0.91, 0.18, 0.59, 0.29, 0.85],
}

export default () => {
  const myChart = useRef(null);
  const divRef = useRef(null);
  const [data, setData] = useState(originData);

  /**
   * @description 使用setInterval模拟数据变化
   */
  useEffect(() => {
    const intervalId = setInterval(() => {

      const updatePrev = (prev) => {
        let data = prev
        if (prev.xName[prev.xName.length - 1] === 'z') {
          return structuredClone(originData);
        }

        return {
          xName: [...prev.xName, letters[prev.xName.length]],
          series: [...data.series, Math.random()],
        }
      }

      setData((prev) => updatePrev(prev));

      return () => clearInterval(intervalId)
    }, 3500);
  }, [])

  useEffect(() => {
    myChart.current = echarts.init(divRef.current);
    myChart.current.setOption({
      ...baseEChartOptions,
      color: '#F7A110',
      grid: {
        ...baseEChartOptions.grid,
        left: px(50),
        right: px(10),
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.xName,
        splitLine: {
          show: true,
          lineStyle: { color: '#073E78' }
        },
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          fontSize: px(16)
        }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#073E78' } },
        axisLabel: {
          fontSize: px(12),
          formatter(val) {
            return (val * 100).toFixed(0) + '%';
          }
        }
      },
      series: [{
        type: 'line',
        data: data.series,
        symbol: 'circle',
        symbolSize: px(12),
        lineStyle: { width: px(2) },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#F7A110'
          }, {
            offset: 1,
            color: '#1B1D52'
          }]),
        }
      }]
    });
  }, []);


  /**
   * 跟踪data变化，重新set数据
   */
  useEffect(() => {
    myChart.current.setOption({
      xAxis: {
        data: data.xName,
      },
      series: [{ data: data.series }]
    })
  }, [data])

  return (
    <div className="chart-bottom-group3">
      <h3>折线图3</h3>
      <div ref={divRef} className="chart"></div>
    </div>
  );
};