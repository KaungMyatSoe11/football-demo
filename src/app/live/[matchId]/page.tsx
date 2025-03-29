import { getMatchLiveVideo } from "@/service/match.service";
import LiveVideo from "./_component/LiveVideo";
const LiveMatchPage = async ({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) => {
  const { matchId } = await params;
  if (!matchId) {
    return null;
  }
  const liveMatch = await getMatchLiveVideo(matchId);

  if (!liveMatch) {
    return null;
  }
  console.log(liveMatch);
  
  return (
    <div>
        {/* {liveMatch.liveStreamUrl[0].url} */}
        <LiveVideo streams={liveMatch.liveStreamUrl} />
    </div>
  );
};

export default LiveMatchPage;
