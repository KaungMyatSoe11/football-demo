import React, { useEffect } from "react";
import dateFormat from "dateformat";
import { getLeagueListByCountryName } from "@/service/match.service";

interface LeaguesProps {
  leagueList: any;
  activeLeague: string;
  setActiveLeague: (activeLeague: string) => void;
  active: string;
  setTodayLeagues: (todayLeagues: null) => void;
  setTomorrowLeagues: (tomorrowLeagues: null) => void;
}

const Leagues = ({
  leagueList,
  activeLeague,
  setActiveLeague,
  active,
  setTodayLeagues,
  setTomorrowLeagues,
}: LeaguesProps) => {
  useEffect(() => {
    const firstLeague = leagueList?.categories[0]?.countries?.[0]?.leagueKey;
    if (firstLeague) setActiveLeague(firstLeague);
  }, [leagueList, setActiveLeague]);

  const handleLeague = async (leagueKey: string) => {
    setActiveLeague(leagueKey);
    const today = new Date();
    
    if (active === "Today Match") {
      const date = dateFormat(today, "yyyy-mm-dd");
      const todayLeague = await getLeagueListByCountryName(leagueKey, date);
      setTodayLeagues(todayLeague);
    }

    if (active === "Tomorrow Match") {
      today.setDate(today.getDate() + 1);
      const date = dateFormat(today, "yyyy-mm-dd");
      const tomorrowLeague = await getLeagueListByCountryName(leagueKey, date);
      setTomorrowLeagues(tomorrowLeague);
    }
  };

  return (
    <div className="flex overflow-x-auto whitespace-nowrap gap-3 p-2 border-b border-gray-300 scrollbar-hide">
      {leagueList?.categories?.[0]?.countries?.map((item: any, index: number) => (
        <button
          key={index}
          className={`px-4 py-2 font-semibold shadow-md rounded-lg transition-all duration-300 focus:outline-none
            ${activeLeague === item.leagueKey 
              ? "bg-[#483D8B] text-white hover:bg-[#595091]" 
              : "border border-slate-400 text-blue-800 hover:bg-gray-200"
            }`}
          onClick={() => handleLeague(item.leagueKey)}
        >
          {item.countryDisplayName}
        </button>
      ))}
    </div>
  );
};

export default Leagues;
