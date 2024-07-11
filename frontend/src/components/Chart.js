import React, { useState, useEffect } from "react";
import { AgCharts} from "ag-charts-react";

const ChartExample = ({ universitiesData }) => {
  const [options, setOptions] = useState({
    data: [],
    title: {
      text: "Университеты и количество людей",
      fontSize: 20,
      color: "#FFFFFF"
    },
    background: {
      fill: 'transparent',
    },
    series: [
      {
        type: "donut",
        calloutLabelKey: "institution",
        calloutLabel: {
          color: "#FFFFFF",
          fontSize: 14,
        },
        angleKey: "count",
        innerRadiusRatio: 0.6,
      },
    ],
    legend: {
      item: {
        label: {
          color: "#FFFFFF",
        },
      },
    },
    width: 600,
    height: 600,
  });

  useEffect(() => {
    if (universitiesData && universitiesData.length > 0) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        data: universitiesData,
      }));
    }
  }, [universitiesData]);

  return (
    <div style={{ margin: "0 auto", marginTop: 60, width: 1000, height: 650, border: '2px solid grey', borderRadius: 20, padding: '20px', fontSize: 16 }}>
      <AgCharts options={options} />
    </div>
  );
};

export default ChartExample;
