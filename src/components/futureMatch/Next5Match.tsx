import React from "react";
import dateFormat from "dateformat";

interface Match {
  match: string;
  day: number;
  matchTime: string;
}

interface Team {
  name: string;
  matches: Match[];
}

interface Next5MatchProps {
  nextMatch: {
    homeTeam: Team;
    awayTeam: Team;
  };
}

const MatchCard = ({ match }: { match: Match }) => {
  const [team1, team2] = match.match.split("-");

  return (
    <div className="bg-gradient-to-r from-[#E6E6FA] to-[#D8BFD8] p-5 rounded-lg shadow-md transition-transform transform cursor-pointer hover:scale-105">
      <div className="flex items-center justify-between">
        {/* Left Team */}
        <div className="flex flex-col items-center space-y-2">
          <span className="text-lg font-semibold text-gray-800">{team1}</span>
        </div>

        {/* VS Section */}
        <h1 className="text-3xl font-bold flex items-center gap-1">
          <span className="text-[#4169E1] text-4xl">V</span>
          <span className="text-[#4B0082] text-3xl">S</span>
        </h1>

        {/* Right Team */}
        <div className="flex flex-col items-center space-y-2">
          <span className="text-lg font-semibold text-gray-800">{team2}</span>
        </div>
      </div>

      {/* Match Details */}
      <div className="mt-5 flex justify-between text-gray-600 text-sm">
        <p className="flex items-center gap-2">
          <span className="text-lg text-[#4169E1] font-semibold">Days Left:</span>
          <span>{match.day} days</span>
        </p>
        <p className="flex flex-col gap-1">
          <span className="text-lg text-[#4B0082] font-semibold">Time:</span>
          <span>{dateFormat(match.matchTime, "mmmm d, yyyy")}</span>
          <span>{dateFormat(match.matchTime, "h:MM TT")}</span>
        </p>
      </div>
    </div>
  );
};

const Next5Match = ({ nextMatch }: Next5MatchProps) => {
  return (
    <div>
      <h2 className="w-full bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-2xl font-semibold text-center mb-4">
        Upcoming Matches
      </h2>

      <div className="space-y-8">
        {/* Home Team Matches */}
        <div>
          <h3 className="w-full bg-gradient-to-r from-blue-600 via-pink-600 to-purple-400 inline-block text-transparent bg-clip-text text-xl font-semibold text-center">
            Home Team
          </h3>
          <h3 className="text-xl font-semibold mb-2">{nextMatch.homeTeam.name}</h3>
          <div className="grid grid-cols-1 gap-4">
            {nextMatch.homeTeam.matches.map((match, index) => (
              <MatchCard key={index} match={match} />
            ))}
          </div>
        </div>

        {/* Away Team Matches */}
        <div>
          <h3 className="w-full bg-gradient-to-r from-blue-600 via-pink-600 to-purple-400 inline-block text-transparent bg-clip-text text-xl font-semibold text-center">
            Away Team
          </h3>
          <h3 className="text-xl font-semibold mb-2">{nextMatch.awayTeam.name}</h3>
          <div className="grid grid-cols-1 gap-4">
            {nextMatch.awayTeam.matches.map((match, index) => (
              <MatchCard key={index} match={match} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Next5Match;
