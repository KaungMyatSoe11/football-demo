'use client'

import ReactPlayer from 'react-player'
import { useState, useEffect } from 'react'

interface Stream {
  name: string
  url: string
}

interface LiveVideoProps {
  streams: Stream[]
}

export default function LiveVideo({ streams }: LiveVideoProps) {
  const [isClient, setIsClient] = useState(false)
  const [currentStream, setCurrentStream] = useState<Stream>(streams[0])

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="aspect-video w-full">
      {isClient && (
        <>
          <ReactPlayer 
            url={currentStream.url} 
            controls 
            width="100%" 
            height="auto" 
            playing={true} 
          />
          <div>
            {streams.map((stream, index) => (
              <button key={index} onClick={() => setCurrentStream(stream)}>
                {stream.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}