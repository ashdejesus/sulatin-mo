"use client";

import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type HandwritingCanvasProps = {
  characterToTrace: string;
};

export type HandwritingCanvasHandle = {
  clearCanvas: () => void;
};

export const HandwritingCanvas = forwardRef<HandwritingCanvasHandle, HandwritingCanvasProps>(
  ({ characterToTrace }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const isDrawing = useRef(false);
    const isMobile = useIsMobile();

    const DPR = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const CANVAS_SIZE = 300;

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = CANVAS_SIZE * DPR;
      canvas.height = CANVAS_SIZE * DPR;
      canvas.style.width = `${CANVAS_SIZE}px`;
      canvas.style.height = `${CANVAS_SIZE}px`;

      const context = canvas.getContext("2d");
      if (!context) return;
      
      context.scale(DPR, DPR);
      context.lineCap = "round";
      context.strokeStyle = "hsl(var(--primary))";
      context.lineWidth = 5;
      contextRef.current = context;

      drawTracingGuide();
    }, [characterToTrace, DPR]);

    useImperativeHandle(ref, () => ({
      clearCanvas,
    }));

    const drawTracingGuide = () => {
      const context = contextRef.current;
      if (!context) return;
      context.save();
      context.font = "200px Noto Sans Tagalog";
      context.fillStyle = "hsl(var(--muted))";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(characterToTrace, CANVAS_SIZE / 2, CANVAS_SIZE / 2);
      context.restore();
    };
    
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (!canvas || !context) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawTracingGuide();
    };

    const getCoords = (e: MouseEvent | TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        if ("touches" in e) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top,
            };
        }
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      if (!contextRef.current) return;
      isDrawing.current = true;
      const { x, y } = getCoords(e.nativeEvent);
      contextRef.current.beginPath();
      contextRef.current.moveTo(x, y);
    };

    const endDrawing = () => {
      if (!contextRef.current) return;
      contextRef.current.closePath();
      isDrawing.current = false;
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing.current || !contextRef.current) return;
      const { x, y } = getCoords(e.nativeEvent);
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
    };

    return (
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawing}
        onTouchEnd={endDrawing}
        onTouchMove={draw}
        className="rounded-lg border bg-background cursor-crosshair touch-none"
      />
    );
  }
);

HandwritingCanvas.displayName = "HandwritingCanvas";
