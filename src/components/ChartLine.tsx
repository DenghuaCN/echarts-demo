import React, { useEffect, useRef, useState } from "react";
import * as echarts from 'echarts';

import px from "../utils/px";
import baseEChartOptions from "../common/baseEChartOptions";


const originData = {
  xName: [2010, 2011, 2012, 2013, 2014],
  series: {
    a: [0.20, 0.61, 0.61, 0.91, 0.10],
    b: [0.40, 0.12, 0.85, 0.38, 0.03],
    c: [0.61, 0.91, 0.81, 0.59, 0.94],
    d: [0.256, 0.35, 0.16, 0.19, 0.39],
    e: [0.10, 0.18, 0.48, 0.10, 0.69]
  }
}

export default function ChartLine() {
  const myChart = useRef(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState(originData);


  /**
   * @description 使用setInterval模拟数据变化
   */
  useEffect(() => {
    const intervalId = setInterval(() => {

      const updatePrev = (prev) => {
        let data = prev
        if (prev.xName[prev.xName.length - 1] >= 2030) {
          data = originData
        }

        return {
          xName: [...data.xName, data.xName[data.xName.length - 1] + 1],
          series: {
            a: [...data.series.a, Math.random()],
            b: [...data.series.b, Math.random()],
            c: [...data.series.c, Math.random()],
            d: [...data.series.d, Math.random()],
            e: [...data.series.e, Math.random()],
          }
        }
      }

      setData((prev) => updatePrev(prev))
      return () => clearInterval(intervalId)
    }, 3000);
  }, [])

  useEffect(() => {
    myChart.current = echarts.init(divRef.current);

    myChart.current.setOption({
      ...baseEChartOptions,
      legend: {
        bottom: px(8), // 图例组件离容器下侧的距离
        itemWidth: px(30), // 图例标记的图形宽度
        itemHeight: px(20), //  图例标记的图形高度
        itemGap: px(5),
        textStyle: { color: 'white' }, // 图例的公用文本样式
      },
      grid: {
        left: px(10),
        right: px(20),
        top: px(20),
        bottom: px(70),
        containLabel: true // grid 区域是否包含坐标轴的刻度标签, 常用于『防止标签溢出』的场景
      },
      xAxis: {
        type: 'category', //  类目轴
        boundaryGap: false, // 坐标轴两边留白策略
        data: data.xName,
        splitLine: { show: true, lineStyle: { color: '#073E78' } }, // 坐标轴在 grid 区域中的分隔线
        axisTick: { show: false }, // 坐标轴刻度
        axisLine: { show: false }, // 坐标轴轴线
        axisLabel: {
          fontSize: px(12),
          show: true,
          // interval: 0, // 间隔，0为显示所有
        }
      },
      yAxis: {
        type: 'value', // 数值轴，适用于连续数据
        splitLine: { lineStyle: { color: '#073E78' } },
        axisLabel: { // 坐标轴刻度标签
          fontSize: px(12),
          formatter(val: number) {
            return val * 100 + '%';
          }
        }
      },
      series: [
        {
          name: 'A',
          type: 'line',
          symbol: 'circle',
          data: data.series.a
        },
        {
          name: 'B',
          type: 'line',
          symbol: 'rect',
          data: data.series.b
        },
        {
          name: 'C',
          type: 'line',
          symbol: 'diamond',
          data: data.series.c
        },
        {
          name: 'D',
          type: 'line',
          symbol: 'arrow',
          data: data.series.d
        },
        {
          name: 'E',
          type: 'line',
          symbol: 'triangle',
          data: data.series.e
        }
      ].map(seriesItem => ({
        ...seriesItem,
        // symbol: 'rect', // 线两端的标记类型
        symbolSize: px(10), // 线两端的标记大小
        lineStyle: { width: px(2) } // 线的样式
      }))
    });
  }, []);

  /**
   * 跟踪data变化，重新set数据
   */
  useEffect(() => {
    myChart.current.setOption({
      xAxis: {
        data: data.xName
      },
      series: [
        {
          name: "A",
          data: data.series.a,
        },
        {
          name: "B",
          data: data.series.b,
        },
        {
          name: "C",
          data: data.series.c,
        },
        {
          name: "D",
          data: data.series.d,
        },
        {
          name: "E",
          data: data.series.e,
        }
      ]
    })
  }, [data])

  return (
    <div className='bordered chart3-box'>
      <h2>折线图</h2>
      <div ref={divRef} className='chart'></div>
    </div>
  )
};
