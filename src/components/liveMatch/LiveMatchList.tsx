import React from "react";
import LiveMatch from "./LiveMatch";

interface LivesMatchListProps {
  liveMatchResult: any;
}

const LivesMatchList = ({ liveMatchResult }: LivesMatchListProps) => {
  return (
    <div className="space-y-6">
      {liveMatchResult?.leagueMatchList?.length > 0 ? (
        liveMatchResult.leagueMatchList.map((leagueMatch: any, index: number) => (
          <div key={index} className="pb-4 border-b border-gray-300">
            {/* League Name */}
            <h1 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
              {leagueMatch.leagueName}
            </h1>

            {/* Matches Grid */}
            <div className="grid grid-cols-1 gap-4">
              {leagueMatch.matchList.map((match: any, matchIndex: number) => (
                <LiveMatch
                  key={matchIndex}
                  isLive={match.isLive}
                  opponent={match.opponents}
                  matchId={match.matchId}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center min-h-[200px] flex items-center justify-center">
          <h1 className="text-red-500 text-lg font-semibold">
            {liveMatchResult || "No Live Matches Available"}
          </h1>
        </div>
      )}
    </div>
  );
};

export default LivesMatchList;
