import React from "react";
import LiveMatch from "../liveMatch/LiveMatch";

interface LeaguesMatchListProps {
  leagueMatchList: any[];
}
const LeaguesMatchList = ({ leagueMatchList }: LeaguesMatchListProps) => {
  return (
    <div className="space-y-6">
      {leagueMatchList.map((leagueMatch, index) => (
        <div key={index}>
          <h1 className="text-lg font-semibold mb-2">
            {leagueMatch.leagueName}
          </h1>
          {leagueMatch.matchList.map((match: any, index: number) => {
            return (
              <div key={index}>
                <LiveMatch
                  matchId={match.matchId}
                  isLive={match.isLive}
                  opponent={match.opponents}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default LeaguesMatchList;
