"use client";
import { useEffect, useState } from "react";
import Next5Match from "../futureMatch/Next5Match";
import LivesMatchList from "../liveMatch/LiveMatchList";
import Leagues from "../Leagues/Leagues";
import {
  getLeagueList,
  getLeagueListByCountryName,
  getLiveMatch,
  getNextMatch,
} from "@/service/match.service";
import dateFormat from "dateformat";

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
      name: "Today Match",
      color: "#483D8B",
      hoverColor: "#595091",
    },
    {
      id: "3",
      name: "Tomorrow Match",
      color: "#483D8B",
      hoverColor: "#595091",
    },
    {
      id: "4",
      name: "Next 5 Match",
      color: "#483D8B",
      hoverColor: "#595091",
    },
  ];
  const [active, setActive] = useState<string>("Live");
  const [activeLeague, setActiveLeague] = useState<string>("");
  const [leagueList, setLeagueList] = useState<[] | null>(null);
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
      console.log("Hello today..");

      const today = new Date();
      const date = dateFormat(today, "yyyy-mm-dd");
      const todayLeague = await getLeagueListByCountryName(activeLeague, date);
      console.log("todayLeague", todayLeague);
    }
    if (id === "3") {
      const today = new Date();
      today.setDate(today.getDate() + 1); // Add 1 day to get tomorrow
      const date = dateFormat(today, "yyyy-mm-dd"); // Format the updated date
      const tomorrowLeague = await getLeagueListByCountryName(
        activeLeague,
        date
      );
      console.log("tomorrowLeague", tomorrowLeague);
    }
    if (id === "4") {
      const nextMatch = await getNextMatch();
      setNext5Match(nextMatch.result);
    }
  };

  const renderMatchContent = () => {
    if (active === "Live" && liveMatchResult) {
      return <LivesMatchList liveMatchResult={liveMatchResult} />;
    } else if (active === "Today Match") {
      return (
        <div>
          <h1>Today..</h1>
        </div>
      );
    } else if (active === "Tomorrow Match") {
      return (
        <div>
          <h1>Tomorrow...</h1>
        </div>
      );
    } else if (active === "Next 5 Match" && next5Match) {
      return <Next5Match nextMatch={next5Match} />;
    }
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-[#E6E6FA] to-[#D8BFD8]">
      <div className="w-[50%] bg-white/80 backdrop-blur-md shadow-lg min-h-[500px] p-6 rounded-xl flex flex-col gap-8 border border-white/40">
        {/* League Button */}
        <Leagues
          leagueList={leagueList}
          activeLeague={activeLeague}
          setActiveLeague={setActiveLeague}
        />
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
            {renderMatchContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
