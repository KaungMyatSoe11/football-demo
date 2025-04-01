import FBApi from "../libs/axiosInstance";

const getLiveMatch = async () => {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  try {
    const res = await FBApi.get(
      `/match-list?leagueIdList=&liveOnly=true&timeZone=Asia/Rangoon&key=${key}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
const getNextMatch = async () => {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  try {
    const res = await FBApi.get(
      `/match/nextFiveMatch?matchId=2598992&key=${key}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const getLiveStream = async (matchId: string) => {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  try {
    const res = await FBApi.get(
      `/match-score?matchId=${matchId}&timeZone=Asia/Rangoon&key=${key}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const getLeagueList = async () => {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  try {
    const res = await FBApi.get(`/soccerLeague/leagueList?&key=${key}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
const getLeagueListByCountryName = async (
  leagueKey: string,
  todayDate: string
) => {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  try {
    const res = await FBApi.get(
      `/match/getFixtureByLeague/date?leagueKey=${leagueKey}&type=2&matchDate=${todayDate}&subLeagueId=&timeZone=Asia/Rangoon&isCallInterval=true&key=${key}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export {
  getLiveMatch,
  getNextMatch,
  getLiveStream,
  getLeagueList,
  getLeagueListByCountryName,
};
