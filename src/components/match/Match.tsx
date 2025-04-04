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
import TodayLeagues from "../todayLeagues/TodayLeagues";
import TomorrowLeagues from "../tomorrowLeagues/TomorrowLeagues";

interface Match {
  match: string;
  day: number;
  matchTime: string;
}

interface Team {
  name: string;
  matches: Match[];
}

interface nextMatch {
  homeTeam: Team;
  awayTeam: Team;
}

export default function MatchDashboard() {
  const menus = [
    { id: "1", name: "Live", color: "#FF0000", hoverColor: "#FF4444" },
    { id: "2", name: "Today Match", color: "#483D8B", hoverColor: "#595091" },
    {
      id: "3",
      name: "Tomorrow Match",
      color: "#483D8B",
      hoverColor: "#595091",
    },
    { id: "4", name: "Next 5 Match", color: "#483D8B", hoverColor: "#595091" },
  ];

  const [active, setActive] = useState<string>("Live");
  const [activeLeague, setActiveLeague] = useState<string>("");
  const [leagueList, setLeagueList] = useState<[] | null>(null);
  const [liveMatchResult, setLiveMatchResult] = useState<string | null>(null);
  const [next5Match, setNext5Match] = useState<nextMatch | null>(null);
  const [todayLeagues, setTodayLeagues] = useState(null);
  const [tomorrowLeagues, setTomorrowLeagues] = useState(null);

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
    }
    if (id === "2") {
      const today = new Date();
      const date = dateFormat(today, "yyyy-mm-dd");
      const todayLeague = await getLeagueListByCountryName(activeLeague, date);
      setTodayLeagues(todayLeague);
    }
    if (id === "3") {
      const today = new Date();
      today.setDate(today.getDate() + 1);
      const date = dateFormat(today, "yyyy-mm-dd");
      const tomorrowLeague = await getLeagueListByCountryName(
        activeLeague,
        date
      );
      setTomorrowLeagues(tomorrowLeague);
    }
    if (id === "4") {
      const nextMatch = await getNextMatch();
      setNext5Match(nextMatch.result);
    }
  };

  const renderMatchContent = () => {
    if (active === "Live" && liveMatchResult)
      return <LivesMatchList liveMatchResult={liveMatchResult} />;
    if (active === "Today Match" && todayLeagues)
      return <TodayLeagues todayLeagues={todayLeagues} />;
    if (active === "Tomorrow Match" && tomorrowLeagues)
      return <TomorrowLeagues tomorrowLeagues={tomorrowLeagues} />;
    if (active === "Next 5 Match" && next5Match)
      return <Next5Match nextMatch={next5Match} />;
    return <div className="text-center text-gray-500">Loading...</div>;
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-[#E6E6FA] to-[#D8BFD8] px-4">
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] bg-white/80 backdrop-blur-md shadow-lg min-h-[500px] p-6 rounded-xl flex flex-col gap-6 border border-white/40">
        {/* League Selection */}
        <Leagues
          leagueList={leagueList}
          activeLeague={activeLeague}
          setActiveLeague={setActiveLeague}
          active={active}
          setTodayLeagues={setTodayLeagues}
          setTomorrowLeagues={setTomorrowLeagues}
        />

        {/* Matches Section */}
        <div className="space-y-4">
          {/* Menu Buttons */}
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {menus.map((menu) => (
              <button
                key={menu.id}
                className={`px-4 py-2 font-semibold shadow-md rounded-lg transition-all duration-300
                  ${
                    active === menu.name
                      ? "bg-red-500 text-white"
                      : "border border-gray-400 text-blue-800"
                  }
                `}
                onClick={() => handleMenu(menu.name, menu.id)}
              >
                {menu.name}
              </button>
            ))}
          </div>

          {/* Match Content */}
          <div className="overflow-auto h-[400px] sm:h-[450px] md:h-[500px] rounded-lg border border-gray-200 shadow-md bg-white p-4">
            {renderMatchContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
