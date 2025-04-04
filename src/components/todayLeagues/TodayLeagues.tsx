import React from "react";
import TodayMatchCard from "./TodayMatchCard";

interface TodayLeaguesProps {
  todayLeagues: any;
}

const TodayLeagues = ({ todayLeagues }: TodayLeaguesProps) => {
  return (
    <div className="space-y-6">
      {/* League Name */}
      {todayLeagues?.leagueName && (
        <h1 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
          {todayLeagues.leagueName}
        </h1>
      )}

      {/* Matches List */}
      {todayLeagues?.matchDateList?.length > 0 ? (
        todayLeagues.matchDateList.map((matchDate: any, index: number) => (
          <div key={index} className="pb-4 border-b border-gray-300">
            {/* Matches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchDate.matchList?.map((match: any, matchIndex: number) => (
                <TodayMatchCard key={matchIndex} opponent={match.opponents} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center min-h-[200px] flex items-center justify-center">
          <h1 className="text-red-500 text-lg font-semibold">
            No matches scheduled for today!
          </h1>
        </div>
      )}
    </div>
  );
};

export default TodayLeagues;
