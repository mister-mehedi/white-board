import React, { useRef, useEffect, useState } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen"); // Default tool is pen
  const [shapes, setShapes] = useState([]); // Store drawn shapes
  const [currentShape, setCurrentShape] = useState(null); // Track current drawing

  const handleMouseDown = (e) => {
    if (tool !== "pen") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    const newShape = {
      type: "pen",
      points: [{ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }],
    };
    setCurrentShape(newShape);
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (tool === "pen" && isDrawing && currentShape) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();

      setCurrentShape((prev) => ({
        ...prev,
        points: [...prev.points, { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }],
      }));
    } else if (tool === "eraser") {
      const mouseX = e.nativeEvent.offsetX;
      const mouseY = e.nativeEvent.offsetY;

      const shapeToEraseIndex = shapes.findIndex((shape) => {
        if (shape.type === "pen") {
          return shape.points.some(
            (point) =>
              Math.hypot(point.x - mouseX, point.y - mouseY) <= 5 // Proximity check
          );
        }
        return false;
      });

      if (shapeToEraseIndex !== -1) {
        // Remove the shape from the array
        const updatedShapes = [...shapes];
        updatedShapes.splice(shapeToEraseIndex, 1);
        setShapes(updatedShapes);

        // Redraw all shapes
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updatedShapes.forEach((shape) => {
          if (shape.type === "pen") {
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            shape.points.forEach((point, index) => {
              if (index === 0) {
                ctx.moveTo(point.x, point.y);
              } else {
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
              }
            });
            ctx.closePath();
          }
        });
      }
    }
  };

  const handleMouseUp = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (tool === "pen" && currentShape) {
      ctx.closePath();
      setShapes((prev) => [...prev, currentShape]);
      setCurrentShape(null);
    }
    setIsDrawing(false);
  };

  return (
    <div className="App">
      <div className="toolbar">
        <button
          onClick={() => setTool("pen")}
          className={tool === "pen" ? "bg-black text-white" : ""}
        >
          Pen
        </button>
        <button
          onClick={() => setTool("eraser")}
          className={tool === "eraser" ? "bg-black text-white" : ""}
        >
          Erase
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="m-auto block bg-white"
        width={1900}
        height={800}
        onMouseDown={tool === "pen" ? handleMouseDown : null}
        onMouseMove={handleMouseMove} // Eraser works on hover
        onMouseUp={tool === "pen" ? handleMouseUp : null}
      />
    </div>
  );
}

export default App;
