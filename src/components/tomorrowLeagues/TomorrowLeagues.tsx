import React from "react";
import TomorrowMatchCard from "./TomorrowMatchCard";

interface TomorrowLeaguesProps {
  tomorrowLeagues: {
    leagueName?: string;
    matchDateList?: {
      matchList: { opponents: { logo: string; name: string }[] }[];
    }[];
  };
}

const TomorrowLeagues = ({ tomorrowLeagues }: TomorrowLeaguesProps) => {
  return (
    <div className="space-y-6">
      {/* League Name */}
      {tomorrowLeagues.leagueName ? (
        <h1 className="text-lg font-semibold mb-2 text-gray-800">
          {tomorrowLeagues.leagueName}
        </h1>
      ) : (
        <h1 className="text-lg font-semibold mb-2 text-gray-500">
          No League Data
        </h1>
      )}

      {/* Match List */}
      {tomorrowLeagues.matchDateList &&
      tomorrowLeagues.matchDateList.length > 0 ? (
        tomorrowLeagues.matchDateList.map((matchDate, index) => (
          <div key={index} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchDate.matchList.map((match, idx) => (
                <TomorrowMatchCard key={idx} opponent={match.opponents} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center min-h-[200px] flex items-center justify-center">
          <h1 className="text-red-500 text-lg font-semibold">
            No matches available for Tomorrow!.
          </h1>
        </div>
      )}
    </div>
  );
};

export default TomorrowLeagues;
