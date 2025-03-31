"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getLiveStream } from "@/service/match.service";
import { useSearchParams } from "next/navigation";

// Dynamically import ReactPlayer with SSR disabled
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const VideoPage =() => {
  const searchParams = useSearchParams();
  const matchId = searchParams.get("matchId");

  const [liveStreams, setLiveStreams] = useState<[] | null>(null)
useEffect(()=>{

  if(matchId){
    const fetchLiveStream=async()=>{
      const liveStreams=await getLiveStream(matchId)
      setLiveStreams(liveStreams.result.liveStreamUrl)
      console.log(liveStreams.result.liveStreamUrl);
    }
    fetchLiveStream()
  }
  
},[matchId])
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      {
        liveStreams && 
      <ReactPlayer
        url={liveStreams[0].url}
        controls={true}
        playing={true}
        loop={true}
        width="60%"
        height="60%"
      />
      }
    </div>
  );
};

export default VideoPage;
