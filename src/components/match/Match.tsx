"use client";
import { getLiveMatch, getNextMatch } from "@/service/match.service";
import { useEffect, useState } from "react";
import LeaguesMatchList from "../leagues/LeaguesMatchList";
import Next5Match from "../futureMatch/Next5Match";

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
  const [leagueMatchList, setLeagueMatchList] = useState<[] | null>(null);
  const [next5Match, setNext5Match] = useState<[] | null>(null);
  useEffect(() => {
    const fetchLiveMatch = async () => {
      const liveMatchData = await getLiveMatch();
      setLeagueMatchList(liveMatchData.result.leagueMatchList);
    };
    fetchLiveMatch();
  }, []);
  const handleMenu = async (name: string, id: string) => {
    setActive(name);
    if (id === "1") {
      const fetchLiveMatch = await getLiveMatch();
      setLeagueMatchList(fetchLiveMatch.result.leagueMatchList);
    }
    if (id === "2") {
      const nextMatch = await getNextMatch();
      setNext5Match(nextMatch.result);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#E6E6FA] to-[#D8BFD8] p-4">
      <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[30%] bg-white/80 backdrop-blur-md shadow-lg min-h-[500px] p-4 md:p-6 rounded-xl flex flex-col gap-4 md:gap-8 border border-white/40">
        {/* League Button */}
        <button className="bg-[#483D8B] hover:bg-[#595091] transition-all duration-300 w-fit text-center cursor-pointer rounded-lg px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base text-white font-semibold shadow-md">
          League
        </button>

        {/* Matches Section */}
        <div className="space-y-3 md:space-y-5">
          {/* Action Buttons */}
          <div className="flex gap-3 md:gap-5 items-center justify-center flex-wrap">
            {menus.map((menu) => (
              <button
                key={menu.id}
                className={`${
                  active === menu.name
                    ? `bg-[${menu.color}] hover:bg-[${menu.hoverColor}] text-white`
                    : "border-2 border-slate-400 text-blue-800"
                } transition-all duration-300 cursor-pointer rounded-lg px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base font-semibold shadow-md`}
                onClick={() => handleMenu(menu.name, menu.id)}
              >
                {menu.name}
              </button>
            ))}
          </div>

          {/* Live Match Component */}
          <div className="space-y-4 overflow-auto h-[400px] md:h-[500px] rounded-lg border border-gray-200 shadow-md bg-white p-3 md:p-4">
            {Boolean(!leagueMatchList) ? (
              <div className="flex items-center justify-center h-full">
                <h1 className="text-lg md:text-xl">Loading...</h1>
              </div>
            ) : active === "Live" && leagueMatchList ? (
              <LeaguesMatchList leagueMatchList={leagueMatchList} />
            ) : Boolean(!next5Match) ? (
              <div className="flex items-center justify-center h-full">
                <h1 className="text-lg md:text-xl">Loading...</h1>
              </div>
            ) : next5Match ? (
              <Next5Match nextMatch={next5Match} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <h1 className="text-lg md:text-xl">Not Found</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
