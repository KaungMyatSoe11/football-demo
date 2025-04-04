"use client";
import Image from "next/image";
import Link from "next/link";

interface LiveMatchProps {
  isLive: boolean;
  opponent: { logo: string; name: string }[];
  matchId: string;
}

export default function LiveMatch({ isLive, opponent, matchId }: LiveMatchProps) {
  return (
    <Link href={`/live/${matchId}`} className="w-full">
      <div className="bg-gradient-to-r from-[#E6E6FA] to-[#D8BFD8] p-5 rounded-lg shadow-md transition-transform transform cursor-pointer">
        {/* Live Badge */}
        {isLive && (
          <div className="w-full flex justify-end mb-3">
            <div className="bg-[#FF0000] w-fit flex gap-1 items-center px-2 py-1 rounded">
              <span className="text-white font-semibold text-xs">Live</span>
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            </div>
          </div>
        )}

        {/* Teams Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Left Team */}
          <div className="flex flex-col items-center space-y-2">
            <Image
              src={opponent[0]?.logo}
              alt={`${opponent[0]?.name} Logo`}
              width={40}
              height={40}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#4169E1]"
            />
            <span className="text-base md:text-xl font-semibold text-gray-800 text-center">
              {opponent[0]?.name}
            </span>
          </div>

          {/* VS Section */}
          <h1 className="text-2xl md:text-3xl font-bold flex justify-center items-center gap-1">
            <span className="text-[#4169E1] text-3xl md:text-4xl">V</span>
            <span className="text-[#4B0082] text-2xl md:text-3xl">S</span>
          </h1>

          {/* Right Team */}
          <div className="flex flex-col items-center space-y-2">
            <Image
              src={opponent[1]?.logo}
              alt={`${opponent[1]?.name} Logo`}
              width={40}
              height={40}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#4B0082]"
            />
            <span className="text-base md:text-xl font-semibold text-gray-800 text-center">
              {opponent[1]?.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
