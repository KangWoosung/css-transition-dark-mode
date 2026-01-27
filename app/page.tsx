/*
2025-12-06 01:04:36

*/
import React from "react";
import CSSTransitionDarkMode from "./chapters/CSSTransitionDarkMode";
import LandoNorrisTextEffect from "./chapters/LandoNorrisTextEffect";
import MyTechStacks from "./chapters/MyTechStacks";
import CurvedScrollBarContainer from "./chapters/CurvedScrollBarContainer";
import WavyBackground from "./chapters/WavyBackground";
import RainyGlassEffect from "./chapters/RainyGlassEffect";
import FulfillsForMobileWebApps from "./chapters/FulfillsForMobileWebApps";
import CookBookRepository from "./components/CookBookRepository";
import SnowOnScreen from "./chapters/SnowOnScreen";

export default function Home() {
  return (
    <React.Fragment>
      <CookBookRepository />

      <CSSTransitionDarkMode />

      <LandoNorrisTextEffect />

      <MyTechStacks />

      <CurvedScrollBarContainer />

      <WavyBackground />

      <RainyGlassEffect />

      <SnowOnScreen />

      <FulfillsForMobileWebApps />
    </React.Fragment>
  );
}
