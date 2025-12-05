/*
2025-12-05 23:56:02
Based on Wes, Scott & CJ's sandbox play code:
https://www.youtube.com/watch?v=9H34nxxVEgc

The Text is not duplicated but box shadow makes it look like duplicated.
The CSS file LandoNorrisText.css is required.

*/
"use client";
import React, { useEffect, useRef, useState } from "react";
import { wrapTextInSpans } from "../utils/textSegmenter";
import "./LandoNorrisText.css";

const defaultStyle: React.CSSProperties = {
  fontSize: "30px",
  fontWeight: "bold",
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "1px",
  lineHeight: "1",
  overflow: "hidden",
};

const defaultLightStyle: React.CSSProperties = {
  ...defaultStyle,
  color: "orange",
};

const defaultDarkStyle: React.CSSProperties = {
  ...defaultStyle,
  color: "#fbbf24", // amber-400 (다크모드에서 더 부드러운 골드)
};

const LandoNorrisText = ({
  children,
  style,
  animationDelayFactor = 0.05,
  locale = "en",
  enableLetterDown = true,
}: {
  children: React.ReactNode | string;
  style?: React.CSSProperties;
  animationDelayFactor?: number;
  locale?: string;
  enableLetterDown?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 테마 감지 및 업데이트
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    // 초기 테마 확인
    checkTheme();

    // MutationObserver를 사용하여 클래스 변경 감지
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    wrapTextInSpans(containerRef.current, locale);

    // sibling-index() 폴리필: 각 span에 순차적으로 애니메이션 딜레이 적용
    // Firefox와 Safari에서 sibling-index()를 지원하지 않으므로 JavaScript로 구현
    const spans = containerRef.current.querySelectorAll("span");
    spans.forEach((span, index) => {
      const spanElement = span as HTMLElement;
      // CSS 변수를 사용하여 animation-delay 설정 (더 유연함)
      spanElement.style.setProperty("--animation-delay", `${index}`);
      spanElement.style.setProperty(
        "--animation-delay-factor",
        `${animationDelayFactor.toString()}s`
      );
      console.log("index", index);
    });
  }, [children, locale, animationDelayFactor]);

  // 테마에 따라 기본 스타일 선택
  const themeStyle = isDark ? defaultDarkStyle : defaultLightStyle;
  const mergedStyle = style ? { ...themeStyle, ...style } : themeStyle;

  return (
    <div
      ref={containerRef}
      className={`landoNorrisText ${isDark ? "dark" : "light"} ${
        isHovered ? "hovered" : ""
      } ${enableLetterDown ? "enable-letter-down" : ""}`}
      style={mergedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

export default LandoNorrisText;
