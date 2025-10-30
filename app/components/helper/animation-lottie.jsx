"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import Lottie on client only (SSR disabled)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const AnimationLottie = ({ animationPath, loop = true, autoplay = true }) => {
  if (!animationPath) return null;

  return (
    <div className="flex justify-center items-center">
      <Lottie
        animationData={animationPath}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default AnimationLottie;
