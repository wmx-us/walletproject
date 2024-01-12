import * as echarts from "echarts"
import React, { useEffect, useRef } from 'react';

type EchartsWrapperProps = {
    options: echarts.EChartsOption;
    style?: React.CSSProperties;
};
const EchartsWrapper: React.FC<EchartsWrapperProps> = ({ options, style }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
        const resizeHandler = () => chartInstance.current?.resize()
        window.addEventListener('resize', resizeHandler)
        // 组件卸载时清除监听时间
        return () => {
            window.removeEventListener('resize', resizeHandler)
            chartInstance.current?.dispose();
        }
    }, [])

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }
            chartInstance.current = echarts.init(chartRef.current);
            chartInstance.current.setOption(options);
        }
    }, [options]);
    return <div ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />;
};

export default EchartsWrapper;
