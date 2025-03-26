import React from "react";
import dateFormat from "dateformat";
interface Next5MatchProps {
  nextMatch: any;
}
const Next5Match = ({ nextMatch }: Next5MatchProps) => {
  return (
    <div>
      <h2 className="w-full bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-2xl font-semibold text-center mb-4">
        Upcoming Matches
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="w-full bg-gradient-to-r from-blue-600 via-pink-600 to-purple-400 inline-block text-transparent bg-clip-text text-xl font-semibold text-center">
            Home Team
          </h3>
          <h3 className="text-xl font-semibold mb-2">
            {nextMatch.homeTeam.name}
          </h3>
          {nextMatch.homeTeam.matches.map((item: any, index: number) => (
            <div
              key={index}
              className="mb-5 bg-gradient-to-r from-[#E6E6FA] to-[#D8BFD8] p-5 rounded-lg shadow-md transition-transform transform cursor-pointer"
            >
              <div className="flex items-center justify-between">
                {/* Left Team */}
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-lg text-center font-semibold text-gray-800">
                    {item.match.split("-")[0]}
                  </span>
                </div>

                {/* VS Section */}
                <h1 className="text-3xl font-bold flex items-center gap-1">
                  <span className="text-[#4169E1] text-4xl">V</span>
                  <span className="text-[#4B0082] text-3xl">S</span>
                </h1>

                {/* Right Team */}
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-lg text-center font-semibold text-gray-800">
                    {item.match.split("-")[1]}
                  </span>
                </div>
              </div>
              <div className="mt-5 flex justify-between">
                <p className="w-[50%] text-sm text-gray-400 flex items-center gap-2">
                  <span className="text-lg text-[#4169E1] font-semibold">
                    Left day:
                  </span>
                  <span className="flex items-center gap-1">
                    <span>{item.day}</span>
                    <span>days</span>
                  </span>
                </p>
                <p className="w-[50%] text-sm text-gray-400 flex items-baseline gap-2">
                  <span className="text-lg text-[#4B0082] font-semibold">
                    Time:{" "}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span>{dateFormat(item.matchTime, "mmmm d, yyyy")}</span>
                    <span>{dateFormat(item.matchTime, "h:MM TT")}</span>
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="w-full bg-gradient-to-r from-blue-600 via-pink-600 to-purple-400 inline-block text-transparent bg-clip-text text-xl font-semibold text-center">
            Away Team
          </h3>
          <h3 className="text-xl font-semibold mb-2">
            {nextMatch.awayTeam.name}
          </h3>
          {nextMatch.awayTeam.matches.map((item: any, index: number) => (
            <div
              key={index}
              className="mb-5 bg-gradient-to-r from-[#E6E6FA] to-[#D8BFD8] p-5 rounded-lg shadow-md transition-transform transform cursor-pointer"
            >
              <div className="flex items-center justify-between">
                {/* Left Team */}
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-lg text-center font-semibold text-gray-800">
                    {item.match.split("-")[0]}
                  </span>
                </div>

                {/* VS Section */}
                <h1 className="text-3xl font-bold flex items-center gap-1">
                  <span className="text-[#4169E1] text-4xl">V</span>
                  <span className="text-[#4B0082] text-3xl">S</span>
                </h1>

                {/* Right Team */}
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-lg text-center font-semibold text-gray-800">
                    {item.match.split("-")[1]}
                  </span>
                </div>
              </div>
              <div className="mt-5 flex justify-between">
                <p className="w-[50%] text-sm text-gray-400 flex items-center gap-2">
                  <span className="text-lg text-[#4169E1] font-semibold">
                    Left day:
                  </span>
                  <span className="flex items-center gap-1">
                    <span>{item.day}</span>
                    <span>days</span>
                  </span>
                </p>
                <p className="w-[50%] text-sm text-gray-400 flex items-baseline gap-2">
                  <span className="text-lg text-[#4B0082] font-semibold">
                    Time:{" "}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span>{dateFormat(item.matchTime, "mmmm d, yyyy")}</span>
                    <span>{dateFormat(item.matchTime, "h:MM TT")}</span>
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Next5Match;
