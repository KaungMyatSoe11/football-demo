import React, { useEffect } from "react";

interface LeaguesProps {
  leagueList: any;
  activeLeague: string;
  setActiveLeague: (activeLeague: string) => void;
}
const Leagues = ({
  leagueList,
  activeLeague,
  setActiveLeague,
}: LeaguesProps) => {
  useEffect(() => {
    const firstLeague = leagueList?.categories[0].countries.filter(
      (item: any) => item
    )[0].leagueKey;
    setActiveLeague(firstLeague);
  }, [leagueList, setActiveLeague]);
  const handleLeague = async (leagueKey: string) => {
    setActiveLeague(leagueKey);
  };
  return (
    <div className="flex overflow-auto text-nowrap gap-5">
      {leagueList?.categories[0].countries.map((item: any, index: number) => {
        return (
          <div key={index}>
            <button
              className={`${
                activeLeague === item.leagueKey
                  ? `bg-[#483D8B] hover-[#595091] text-white`
                  : "border-2 border-slate-400 text-blue-800"
              } transition-all duration-300 cursor-pointer rounded-lg px-4 py-2 font-semibold shadow-md`}
              onClick={() => {
                handleLeague(item.leagueKey);
              }}
            >
              {item.countryDisplayName}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Leagues;
