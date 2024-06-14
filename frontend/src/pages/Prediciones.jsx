import { useAppStore } from "../components/appStore";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
import { Progress, Card, CardBody } from "@nextui-org/react";
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
  ToolboxComponent,
]);

export default function Predicciones() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const open = useAppStore((state) => state.dopen);

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
        symbol: "emptyCircle",
        symbolSize: 15,
        borderType: "dotted",
      }));

      const option = {
        //color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        textStyle: {
          fontSize: 14,
        },
        title: {
          show: true,
          subtext: "Predicción de Ventas",
          text: "Ventas por Semana",
        },
        tooltip: {
          trigger: "axis",
          shadowBlur: 50,
        },
        legend: {
          data: Object.keys(productData),
          left: "center",
          top: "top",
          lineStyle: {
            type: "dotted",
          },
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "5%",
          top: "15%",
          containLabel: true,
          show: true,
          borderWidth: 3,
          borderType: "dotted",
        },
        toolbox: {
          iconStyle: {
            borderColor: "black",
          },
          itemSize: 20,
          feature: {
            itemSize: 40,
            saveAsImage: { show: true, title: "Guardar" },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: weeks,
          name: "Semanas",
          nameLocation: "center",
          nameGap: 30,
          nameTextStyle: {
            fontStyle: "bold",
            color: "blue",
          },
        },
        yAxis: {
          type: "value",
          name: "Ventas",
          nameLocation: "center",
          nameGap: 70,
          nameTextStyle: {
            fontStyle: "bold",
            color: "blue",
          },
        },
        series,
      };
      myChart.setOption(option);
    };

    fetchData();
  }, []);

  return (
    <div className="flex bg-gray-100 h-screen">
      <div className={`m-7 w-screen ${open ? "ml-64" : "ml-24"}`}>
        <Card className="m-5 p-9 shadow-2xl bg-white rounded-3xl">
          <h2 className="text-3xl font-bold ">PREDICCION</h2>
          <div ref={chartRef} style={{ width: "100%", height: "600px" }}>
            <div
              className="flex justify-center items-center"
              style={{ minHeight: "400px" }}>
              <Progress
                size="lg"
                isIndeterminate
                label="Calculando..."
                className="max-w-md"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
