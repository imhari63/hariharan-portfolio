"use client";
import React from "react";
import { educations } from "@/utils/data/educations";
import Image from "next/image";
import dynamic from "next/dynamic";
import { BsPersonWorkspace } from "react-icons/bs";
import lottieFile from "../../../assets/lottie/study.json";
import GlowCard from "../../helper/glow-card";

// ✅ Dynamically import Lottie only on client-side (avoids "document is not defined" error)
const AnimationLottie = dynamic(() => import("../../helper/animation-lottie"), {
  ssr: false,
});

export default function Education() {
  return (
    <section
      id="education"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b] bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] py-16"
    >
      {/* Decorative background */}
      <Image
        src="/section.svg"
        alt="Hero Background"
        width={1572}
        height={795}
        className="absolute top-0 -z-10 opacity-40"
      />

      {/* Section Header */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl font-semibold rounded-md shadow-lg">
            Education
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Divider Line */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* Content Section */}
      <div className="py-12 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Animation */}
          <div className="flex justify-center items-center">
            <div className="w-72 h-72 sm:w-96 sm:h-96">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </div>

          {/* Right: Education Cards */}
          <div className="flex flex-col gap-6">
            {educations.map((education) => (
              <GlowCard key={education.id} identifier={`education-${education.id}`}>
                <div className="p-5 relative text-white bg-[#1f2937]/60 rounded-2xl border border-violet-700/30 backdrop-blur-md hover:border-violet-500 transition-all duration-300">
                  <Image
                    src="/blur-23.svg"
                    alt="Background Blur"
                    width={1080}
                    height={200}
                    className="absolute bottom-0 opacity-70 pointer-events-none"
                  />

                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm text-[#16f2b3] font-medium">
                      {education.duration}
                    </p>
                    <BsPersonWorkspace className="text-violet-400 text-2xl" />
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg sm:text-xl font-semibold uppercase text-violet-300 mb-1">
                      {education.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300">
                      {education.institution}
                    </p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
