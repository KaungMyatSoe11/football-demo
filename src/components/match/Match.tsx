"use client";

import { useEffect, useState } from "react";
import Next5Match from "../futureMatch/Next5Match";
import LivesMatchList from "../liveMatch/LiveMatchList";
import Leagues from "../Leagues/Leagues";
import {
  getLeagueList,
  getLiveMatch,
  getNextMatch,
} from "@/service/match.service";

export default function MatchDashboard() {
  const menus = [
    {
      id: "1",
      name: "Live",
      color: "#FF0000",
      hoverColor: "#FF4444",
    },
    {
      id: "2",
      name: "Next 5 Match",
      color: "#483D8B",
      hoverColor: "#595091",
    },
  ];
  const [active, setActive] = useState<string>("Live");
  const [leagueList, setLeagueList] = useState<[] | null>(null);
  console.log(leagueList);

  const [liveMatchResult, setLiveMatchResult] = useState<string | null>(null);

  const [next5Match, setNext5Match] = useState<[] | null>(null);
  useEffect(() => {
    const fetchLiveMatch = async () => {
      const liveMatchData = await getLiveMatch();
      setLiveMatchResult(liveMatchData.result);
      const leagueLists = await getLeagueList();
      setLeagueList(leagueLists.result);
    };
    fetchLiveMatch();
  }, []);
  const handleMenu = async (name: string, id: string) => {
    setActive(name);
    if (id === "1") {
      const fetchLiveMatch = await getLiveMatch();
      setLiveMatchResult(fetchLiveMatch.result);
      // setLiveMatchesList(fetchLiveMatch.result.leagueMatchList);
    }
    if (id === "2") {
      const nextMatch = await getNextMatch();
      setNext5Match(nextMatch.result);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-[#E6E6FA] to-[#D8BFD8]">
      <div className="w-[30%] bg-white/80 backdrop-blur-md shadow-lg min-h-[500px] p-6 rounded-xl flex flex-col gap-8 border border-white/40">
        {/* League Button */}
        <Leagues leagueList={leagueList} />
        {/* Matches Section */}
        <div className="space-y-5">
          {/* Action Buttons */}
          <div className="flex gap-5 items-center justify-center">
            {menus.map((menu) => (
              <button
                key={menu.id}
                className={`${
                  active === menu.name
                    ? `bg-[${menu.color}] hover-[${menu.hoverColor}] text-white`
                    : "border-2 border-slate-400 text-blue-800"
                } transition-all duration-300 cursor-pointer rounded-lg px-4 py-2 font-semibold shadow-md`}
                onClick={() => handleMenu(menu.name, menu.id)}
              >
                {menu.name}
              </button>
            ))}
          </div>

          {/* Live Match Component */}
          <div className="space-y-4 overflow-auto h-[500px] rounded-lg border border-gray-200 shadow-md bg-white p-4">
            {!liveMatchResult ? (
              <div>
                <h1>Loading...</h1>
              </div>
            ) : active === "Live" && liveMatchResult ? (
              <LivesMatchList liveMatchResult={liveMatchResult} />
            ) : !next5Match ? (
              <div>
                <h1>Loading...</h1>
              </div>
            ) : next5Match ? (
              <Next5Match nextMatch={next5Match} />
            ) : (
              <div>
                <h1>Not Found</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
