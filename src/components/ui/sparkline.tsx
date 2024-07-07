import React, { useRef, useEffect } from "react";

interface SparkLineChartProps {
  data: number[];
  percentageChange: number;
}

export const SparkLineChart: React.FC<SparkLineChartProps> = ({ data, percentageChange }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 100;
    const height = 32;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Define the sparkline properties
    const margin = 5;
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);

    // Define the scale
    const xScale = (width - margin * 2) / (data.length - 1);
    const yScale = (height - margin * 2) / (maxVal - minVal);

    // Determine the line color based on percentageChange
    let lineColor = "gray";
    if (percentageChange > 0) {
      lineColor = "green";
    } else if (percentageChange < 0) {
      lineColor = "red";
    }

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;

    // Check if all data points are the same
    const allDataSame = data.every((val) => val === data[0]);

    if (allDataSame) {
      // Draw a straight line
      ctx.beginPath();
      ctx.moveTo(margin, height / 2);
      ctx.lineTo(width - margin, height / 2);
    } else {
      // Draw the sparkline with curves
      ctx.beginPath();
      ctx.moveTo(margin, height - margin - (data[0] - minVal) * yScale);

      for (let i = 1; i < data.length; i++) {
        const x = margin + i * xScale;
        const y = height - margin - (data[i] - minVal) * yScale;
        const prevX = margin + (i - 1) * xScale;
        const prevY = height - margin - (data[i - 1] - minVal) * yScale;
        const midX = (x + prevX) / 2;
        const midY = (y + prevY) / 2;
        ctx.quadraticCurveTo(prevX, prevY, midX, midY);
      }
    }

    ctx.stroke();
  }, [data, percentageChange]);

  return <canvas ref={canvasRef} style={{ width: "100px", height: "32px" }}></canvas>;
};
