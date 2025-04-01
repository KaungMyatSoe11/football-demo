import { getLeagueListByCountryName } from "@/service/match.service";
import React from "react";
import dateFormat from "dateformat";

interface LeaguesProps {
  leagueList: any;
}
const Leagues = ({ leagueList }: LeaguesProps) => {
  const handleLeague = async (leagueKey: string) => {
      const today = new Date();
    const todayDate = dateFormat(today, "yyyy-mm-dd");
    console.log(todayDate);
    today.setDate(today.getDate() + 1); // Add 1 day to get tomorrow
    const tomorrowDate = dateFormat(today, "yyyy-mm-dd"); // Format the updated date
    console.log(tomorrowDate);

    const resData = await getLeagueListByCountryName(leagueKey, tomorrowDate);
    console.log("resData--->", resData);
  };
  return (
    <div className="flex overflow-auto text-nowrap gap-5">
      {leagueList.categories[0].countries.map((item: any, index: number) => {
        return (
          <div key={index}>
            <button
              onClick={() => handleLeague(item.leagueKey)}
              className="bg-[#483D8B] hover:bg-[#595091] transition-all duration-300 w-fit text-center cursor-pointer rounded-lg px-4 py-2 text-white font-semibold shadow-md"
            >
              {/* {item.countryDisplayName.length > 10
                ? item.countryDisplayName.substr(0, 10) + "...."
                : item.countryDisplayName} */}
                {item.countryDisplayName}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Leagues;
