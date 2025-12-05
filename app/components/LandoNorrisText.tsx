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
  color: "#fbbf24", // amber-400 (For dark mode, more gold-ish)
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

  // Detect theme and update
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    // Check initial theme
    checkTheme();

    // Use MutationObserver to detect class changes
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

    // sibling-index() polyfill: Apply animation delay sequentially to each span
    // Firefox and Safari do not support sibling-index(), so implement it in JavaScript
    const spans = containerRef.current.querySelectorAll("span");
    spans.forEach((span, index) => {
      const spanElement = span as HTMLElement;
      // Use CSS variables to set animation-delay (more flexible)
      spanElement.style.setProperty("--animation-delay", `${index}`);
      spanElement.style.setProperty(
        "--animation-delay-factor",
        `${animationDelayFactor.toString()}s`
      );
      console.log("index", index);
    });
  }, [children, locale, animationDelayFactor]);

  // Select default style based on theme
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
