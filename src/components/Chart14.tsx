import * as echarts from 'echarts';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import baseEChartOptions from '../common/baseEChartOptions';
import px from '../utils/px';
import shuffle from '../utils/shuffle';

const originData = {
  a: [90, 90, 90, 85, 50, 18],
  b: [50, 14, 48, 99, 90, 80],
}

export default () => {
  const myChart = useRef(null);
  const divRef = useRef(null);
  const [data, setData] = useState(originData);

  useEffect(() => {
    myChart.current = echarts.init(divRef.current);
    myChart.current.setOption({
      ...baseEChartOptions,
      legend: {
        show: true,
        top: px(5),
        itemWidth: px(30), // 图例标记的图形宽度
        itemHeight: px(20), // 图例标记的图形高度
        itemGap: px(100), // 图例标记之间的间隔
        textStyle: {
          color: '#fff',
          fontSize: px(16)
        }
      },
      radar: {
        // radius: px(100), // 雷达图半径
        axisLine: {
          show: true,
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['#F38E1C', '#1CDB7C']
          },
        },
        splitNumber: 4, // 指示器轴的分割段数
        axisNameGap: px(10), // 指示器名称和指示器轴的距离
        axisName: { // 雷达图每个指示器名称的配置项
          color: '#fff', // 文字的颜色
          fontSize: px(16),
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
        indicator: [ // 雷达图的指示器
          { name: '销售' }, // max: 指示器的最大值
          { name: '管理' },
          { name: '信息技术' },
          { name: '客服' },
          { name: '研发' },
          { name: '市场' }
        ],
      },
      series: [
        {
          z: 3,
          name: 'A vs B',
          symbolSize: px(6), // 标记的大小
          type: 'radar',
          lineStyle: { // 线条样式
            width: px(4),
            type: 'solid',
            color: '#fff',
          },
          areaStyle: {
            opacity: 0.8,
          },
          data: [
            {
              value: data.a,
              name: 'A',
              areaStyle: {
                color: '#8D70F8'
              },
              itemStyle: {
                color: '#8D70F8'
              }
            },
            {
              value: data.b,
              name: 'B',
              areaStyle: {
                color: '#33A4FA'
              },
              itemStyle: {
                color: '#33A4FA'
              }
            }
          ]
        }
      ]
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((prev) => ({ a: shuffle(prev.a), b: shuffle(prev.b) }))

      return () => clearInterval(intervalId)
    }, 2000);
  }, [])

  useEffect(() => {
    myChart.current.setOption({
      series: [
        {
          data: [
            {
              name: 'A',
              areaStyle: {
                color: '#8D70F8'
              },
              itemStyle: {
                color: '#8D70F8'
              },
              value: data.a
            },
            {
              name: 'B',
              areaStyle: {
                color: '#33A4FA'
              },
              itemStyle: {
                color: '#33A4FA'
              },
              value: data.b
            },
          ]

        },

      ],
    })
  }, [data])

  return (
    <div ref={divRef} className="chart"></div>
  );
};