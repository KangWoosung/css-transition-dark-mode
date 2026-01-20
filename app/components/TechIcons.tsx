"use client";

import React, { useState } from 'react'
import Image from 'next/image';

const TECH_ICONS_URL_PATH = "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/";
const DEFAULT_SIZE = 36;

type TechIconsProps = {
  name: string;
  size?: number;
  invert?: boolean;
} & React.HTMLAttributes<HTMLImageElement>;


const TechIcons = ({ name, size = DEFAULT_SIZE, invert = false, ...props }: TechIconsProps) => {
    const [techIconsSrc, setTechIconsSrc] = useState(`${TECH_ICONS_URL_PATH}${name}.png`);

  const handleError = () => {
    // 404 발생 시 /assets/png 경로로 fallback
    setTechIconsSrc(`/assets/png/${name}.png`);
  };

  return (
    <>
    <Image height={size} 
    src={techIconsSrc} 
    width={size}
    alt={`${name} icon`}
    title={name}
    onError={handleError}
    className={`transition-all duration-300 ${invert ? 'dark:invert' : ''}`}
    style={{ maxWidth: "100%", height: "auto", maxHeight: `${size}px` }}
    {...props}
    />
    </>
  )
}

export default TechIcons

