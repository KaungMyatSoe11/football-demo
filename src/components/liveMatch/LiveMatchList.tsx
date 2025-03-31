import React from "react";
import LiveMatch from "./LiveMatch";

interface LivesMatchListProps {
  liveMatchResult: any;
}
const LivesMatchList = ({ liveMatchResult }: LivesMatchListProps) => {
  return (
    <div className="space-y-6 ">
      {liveMatchResult.leagueMatchList ? (
       liveMatchResult.leagueMatchList?.map((leagueMatch: any, index: number) => (
          <div key={index}>
            <h1 className="text-lg font-semibold mb-2">
              {leagueMatch.leagueName}
            </h1>
            {leagueMatch.matchList.map((match: any, index: number) => {
              return (
                <div key={index}>
                  <LiveMatch
                    isLive={match.isLive}
                    opponent={match.opponents}
                    matchId={match.matchId}
                  />
                </div>
              );
            })}
          </div>
        ))
      ) : (
        <div className="text-center min-h-[200px] flex items-center justify-center">
          <h1 className="text-red-500 text-lg font-semibold">
            {liveMatchResult}
          </h1>
        </div>
      )}
    </div>
  );
};

export default LivesMatchList;
