"use client";
import Image from "next/image";

interface LiveMatchProps {
  isLive: boolean;
  opponent: any[];
}
export default function LiveMatch({ isLive, opponent }: LiveMatchProps) {
  return (
    <>
      <div className="mb-5 bg-gradient-to-r from-[#E6E6FA] to-[#D8BFD8] p-5 rounded-lg shadow-md transition-transform transform cursor-pointer">
        {isLive && (
          <div className="w-full flex justify-end mb-4">
            <div className="bg-[#FF0000] w-fit flex gap-1 items-center px-2 py-1 rounded">
              <span className="text-white font-semibold text-xs">Live</span>
              <span className="w-1 h-1 bg-[#FFFF] rounded-full"></span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          {/* Left Team */}
          <div className="flex flex-col items-center space-y-2">
            <Image
              src={opponent[0].logo}
              alt="Team Logo"
              width={40}
              height={40}
              className="w-12 h-12 rounded-full border-2 border-[#4169E1]"
            />
            <span className="text-lg text-center font-semibold text-gray-800">
              {opponent[0].name}
            </span>
          </div>

          {/* VS Section */}
          <h1 className="text-3xl font-bold flex items-center gap-1">
            <span className="text-[#4169E1] text-4xl">V</span>
            <span className="text-[#4B0082] text-3xl">S</span>
          </h1>

          {/* Right Team */}
          <div className="flex flex-col items-center space-y-2">
            <Image
              src={opponent[1].logo}
              alt="Team Logo"
              width={40}
              height={40}
              className="w-12 h-12 rounded-full border-2 border-[#4B0082]"
            />
            <span className="text-lg text-center font-semibold text-gray-800">
              {opponent[1].name}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
