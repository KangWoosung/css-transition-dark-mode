/*
2026-01-27 03:27:30
Ref:
const RaindropFX = require("raindrop-fx");

const canvas = document.querySelector("#canvas");
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;

const raindropFx = new RaindropFX({
    canvas: canvas,
    background: "path/to/background/image",
});

window.onresize = () =>
{
    const rect = canvas.getBoundingClientRect();
    raindropFx.resize(rect.width, rect.height);
}

raindropFx.start();

Problems....
WEBGL_lose_context()는 되돌릴 수 없는 파괴에 가깝다
  같은 <canvas> DOM 노드에서는
  getContext("webgl")이 다시 살아나지 않거나
  살아나도 내부 상태가 깨진 채로 반환되는 경우가 많음

React는 canvas DOM을 “재사용”한다

isInitializingRef는 부차적인 문제 (하지만 잠재적 버그 있음)

WebGL 라이브러리를 쓸 때의 원칙:
  라이브러리가 context lifecycle을 관리하도록 둔다





*/

"use client";
import { useRainGlassEffectToggleStore } from "@/zustand/useRainGlassEffectToggleStore";
import RaindropFX from "raindrop-fx";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

type RainDropFXContainerProps = {
  backgroundImage: string;
  children: React.ReactNode;
};

function RainDropFXContainer({ backgroundImage, children }: RainDropFXContainerProps) {
  const rainDropFXRef = useRef<HTMLCanvasElement | null>(null);
  const raindropFxInstanceRef = useRef<RaindropFX | null>(null);
  const resizeHandlerRef = useRef<(() => void) | null>(null);
  const canvasKeyRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);
  const rainDropFXOn = useRainGlassEffectToggleStore((state) => state.rainDropFXOn);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    console.log("[RainDropFX] Mounted, initializing");

    const canvas = rainDropFXRef.current;
    if (!canvas) return;
    if (raindropFxInstanceRef.current) return;
    console.log("[RainDropFX] Canvas found, initializing");

    const initRaindropFX = async () => {
      try {
        // Canvas 크기 설정
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          console.warn("[RainDropFX] Canvas has zero size");
          return;
        }

        canvas.width = rect.width;
        canvas.height = rect.height;

        // 동적 import
        const RaindropFXModule = await import("raindrop-fx");
        const RaindropFX = RaindropFXModule.default;

        // 인스턴스 생성
        raindropFxInstanceRef.current = new RaindropFX({
          canvas: canvas,
          background: backgroundImage,
        });

        // start() 호출
        if (rainDropFXOn) {
          raindropFxInstanceRef.current.start();
        }

        // Resize 핸들러
        resizeHandlerRef.current = () => {
          if (raindropFxInstanceRef.current && canvas) {
            const newRect = canvas.getBoundingClientRect();
            canvas.width = newRect.width;
            canvas.height = newRect.height;
            raindropFxInstanceRef.current.resize(
              newRect.width,
              newRect.height
            );
          }
        };

        window.addEventListener("resize", resizeHandlerRef.current);
      } catch (error) {
        console.error("[RainDropFX] Initialization error:", error);
        raindropFxInstanceRef.current = null;
      }
    };

    initRaindropFX();

    // Cleanup
    return () => {
      // Resize 이벤트 제거
      if (resizeHandlerRef.current) {
        window.removeEventListener("resize", resizeHandlerRef.current);
        resizeHandlerRef.current = null;
      }

      // 인스턴스 정리
      if (raindropFxInstanceRef.current) {
        try {
          raindropFxInstanceRef.current.stop();
        } catch (error) {
          console.error("[RainDropFX] Cleanup error:", error);
        }
        raindropFxInstanceRef.current = null;
      }

      // Canvas key 증가 (리마운트 시 완전히 새로운 canvas DOM 생성)
      canvasKeyRef.current += 1;
    };
  }, [mounted, backgroundImage]);

  useEffect(() => {
    if (!mounted) return;
    if (rainDropFXOn) {
      if (raindropFxInstanceRef.current) {
        raindropFxInstanceRef.current.start();
      }
    } else {
      if (raindropFxInstanceRef.current) {
        raindropFxInstanceRef.current.stop();
      }
    }
  }, [rainDropFXOn, mounted]);

  if (!mounted) return null;

  return (
    <div
      id="rainy-drop-fx-container"
      className="relative w-full h-full flex items-center justify-center"
    >
      <canvas
        key={`raindrop-canvas-${backgroundImage}-${canvasKeyRef.current}`}
        ref={rainDropFXRef}
        className="w-full h-full absolute inset-0"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default RainDropFXContainer;

