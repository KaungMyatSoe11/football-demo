import FBApi from "../libs/axiosInstance";

const key = process.env.NEXT_PUBLIC_API_KEY;

const getLiveMatch = async () => {
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
  try {
    const res = await FBApi.get(
      `/match/nextFiveMatch?matchId=2598992&key=${key}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const getMatchLiveVideo = async (matchId: string) => {
  try {
    const res = await FBApi.get(
      `match-score?timeZone=Asia/Rangoon&key=${key}&matchId=${matchId}`
    );

    return res.data.result;
  } catch (error) {
    console.error(error);
  }
};

export { getLiveMatch, getNextMatch,getMatchLiveVideo };
