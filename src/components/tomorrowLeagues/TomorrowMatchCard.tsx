import Image from "next/image";
import React from "react";

interface TomorrowMatchCardProps {
  opponent: { logo: string; name: string }[];
}

const TomorrowMatchCard = ({ opponent }: TomorrowMatchCardProps) => {
  if (!opponent || opponent.length < 2) {
    return (
      <div className="p-4 text-center text-red-500 font-semibold bg-gray-100 dark:bg-gray-800 rounded-lg">
        Match details unavailable.
      </div>
    );
  }

  return (
    <div className="mb-5 p-5 rounded-lg shadow-md bg-gradient-to-r from-[#E6E6FA] to-[#D8BFD8] dark:from-gray-800 dark:to-gray-700 hover:scale-105 transition-all">
      <div className="grid grid-cols-3 items-baseline text-center sm:gap-3">
        {/* Left Team */}
        <div className="flex flex-col items-center space-y-2">
          <Image
            src={opponent[0]?.logo || "/default-team.png"}
            alt={`${opponent[0]?.name || "Team"} Logo`}
            width={50}
            height={50}
            className="w-10 h-10 rounded-full border-2 border-[#4169E1]"
          />
          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 sm:text-base">
            {opponent[0]?.name || "Unknown Team"}
          </span>
        </div>

        {/* VS Section */}
        <h1 className="text-3xl font-bold flex items-center justify-center gap-1">
          <span className="text-[#4169E1] text-2xl sm:text-3xl">V</span>
          <span className="text-[#4B0082] text-xl sm:text-2xl">S</span>
        </h1>

        {/* Right Team */}
        <div className="flex flex-col items-center space-y-2">
          <Image
            src={opponent[1]?.logo || "/default-team.png"}
            alt={`${opponent[1]?.name || "Team"} Logo`}
            width={50}
            height={50}
            className="w-10 h-10 rounded-full border-2 border-[#4B0082]"
          />
          <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 sm:text-base">
            {opponent[1]?.name || "Unknown Team"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TomorrowMatchCard;
