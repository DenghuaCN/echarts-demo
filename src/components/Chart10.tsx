import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';

import px from '../utils/px';
import baseEChartOptions from '../common/baseEChartOptions';

const originData = {
  xName: ['field1', 'field2', 'field3', 'field4', 'field5'],
  series: [40, 22, 20, 18, 32],
}

export default () => {
  const [data, setData] = useState(originData);
  const myChart = useRef(null);
  const divRef = useRef(null);

  /**
   * @description 使用setInterval模拟数据变化
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      const updateState = (prev) => {
        if (prev.xName[prev.xName.length - 1] === 'field20') {
          return structuredClone(originData);
        }

        return {
          xName: [...prev.xName, `field${prev.xName.length}`],
          series: [...prev.series, Number((Math.random() * 100).toFixed(2))],
        }
      }

      setData((prev) => updateState(prev))

      return () => clearInterval(intervalId)
    }, 1000);
  }, [])

  /**
   * @description 初始化ECharts
   */
  useEffect(() => {
    myChart.current = echarts.init(divRef.current);
    myChart.current.setOption({
      ...baseEChartOptions,
      xAxis: {
        data: data.xName,
        axisTick: { show: false },
        axisLine: {
          lineStyle: { color: '#083B70' },
        },
        axisLabel: {
          fontSize: px(16),
          // 格式化字段文字展示
          // formatter(val) {
          //   if (val.length > 2) {
          //     const array = val.split('');
          //     array.splice(2, 0, '\n');
          //     return array.join('');
          //   } else {
          //     return val;
          //   }
          // }
        }
      },

      yAxis: {
        splitLine: { show: false },
        axisLine: {
          show: true,
          lineStyle: { color: '#083B70' },
        },
        axisLabel: {
          fontSize: px(16)
        }
      },
      series: [{
        type: 'bar',
        data: data.series,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#0A97FE'
        }, {
          offset: 1,
          color: '#1E34FF'
        }]),
      }]
    });
  }, []);

  /**
   * @description 跟踪data变化，重新set数据
   */
  useEffect(() => {
    myChart.current.setOption({
      xAxis: {
        data: data.xName
      },
      series: [{
        type: 'bar',
        data: data.series
      }],
    })
  }, [data])

  return (
    <div ref={divRef} className="chart"></div>
  );
};