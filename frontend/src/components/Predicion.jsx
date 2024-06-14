import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  LegendComponent,
} from "echarts/components";
import { Progress } from "@nextui-org/react";
import { LineChart } from "echarts/charts";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  LineChart,
  CanvasRenderer,
  LabelLayout,
  UniversalTransition,
  LegendComponent,
]);

const Prediccion = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/predict-ventas");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const dataFromEndpoint = await response.json();
        const chartData = transformDataForChart(dataFromEndpoint);
        initChart(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const transformDataForChart = (dataFromEndpoint) => {
      const weeks = Object.keys(dataFromEndpoint);
      const products = new Set();

      weeks.forEach((week) => {
        Object.keys(dataFromEndpoint[week]).forEach((product) => {
          products.add(product);
        });
      });

      const productData = {};
      products.forEach((product) => {
        productData[product] = [];
      });

      weeks.forEach((week) => {
        products.forEach((product) => {
          productData[product].push(dataFromEndpoint[week][product] || 0);
        });
      });

      return {
        weeks,
        productData,
      };
    };

    const initChart = ({ weeks, productData }) => {
      const chartDom = chartRef.current;
      const myChart = echarts.init(chartDom);
      const series = Object.keys(productData).map((product) => ({
        name: product,
        type: "line",
        stack: "Total",
        data: productData[product],
      }));

      const option = {
        title: {
          text: "Predicción de Ventas",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: Object.keys(productData),
          left: "center",
          top: "top",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        },
        grid: {
          left: "1%", //3
          right: "10%", //4
          bottom: "10%", //3
          containLabel: true,
          CanvasRenderer: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: weeks,
        },
        yAxis: {
          type: "value",
        },
        series,
      };
      myChart.setOption(option);
    };

    fetchData();
  }, []);

  return (
    <div ref={chartRef} style={{ width: "70%", height: "600px" }}>
      <Progress
        size="lg"
        isIndeterminate
        aria-label="Cargando..."
        className="max-w-md"
      />
    </div>
  );
};

export default Prediccion;
