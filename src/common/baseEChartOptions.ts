import px from "../utils/px";

const baseEChartOptions = {
  // 全局的字体样式
  textStyle: {
    fontSize: px(12),
    color: '#79839E'
  },
  // 标题组件，包含主标题和副标题
  title: { show: false },
  // 图例组件
  legend: { show: false },
  // 配置Grid默认间距
  grid: {
    left: px(40), // grid 组件离容器左侧的距离。
    right: px(20),// grid 组件离容器右侧的距离。
    top: px(20), // grid 组件离容器上侧的距离。
    bottom: px(50),// grid 组件离容器下侧的距离。
  },
}

export default baseEChartOptions