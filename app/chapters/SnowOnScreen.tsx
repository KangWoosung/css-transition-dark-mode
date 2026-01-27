/*
2026-01-25 02:02:55


*/

import React from "react";
import LandoNorrisText from "../components/landoNorrisText/LandoNorrisText";

const SnowOnScreen = () => {
  return (
    <div className="border-0 border-yellow-500 w-full p-0 mt-12">
      <h2 className="text-2xl font-bold">
        <LandoNorrisText hoverColor="firebrick">
          7. Frosted Glass Effect - Snow on Screen
        </LandoNorrisText>
      </h2>
      <div className="flex flex-row my-2 gap-4 w-full">
        <div className="flex-[2] min-w-0 border-2 border-red-500 p-4 gap-4 flex flex-col">
          <p className="text-lg font-light">WavyBackground.tsx</p>
          <p
            className="font-light  text-sm opacity-70
            text-light-foreground dark:text-dark-foreground"
          >
            This Component is inspired by Nils Binder&apos;s original work on
            Codepen.io: <br />
          </p>
        </div>
        <div className="tech-stacks-container flex-[3] min-w-0 border-2 border-blue-500"></div>
      </div>
    </div>
  );
};

export default SnowOnScreen;
