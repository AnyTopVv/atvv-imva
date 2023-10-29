import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';

import React, { CSSProperties, useEffect, useRef } from 'react'

const PubPlayer: React.FC<any> = (props: { style: CSSProperties, videoData: { [propName: string]: string } }) => {
  const { style, videoData } = props;

  const playerRef = useRef<any>(null);

  useEffect(() => {
    console.log(style);
    const player = new Player({
      el: playerRef.current,
      url: videoData.videoSrc,
    });
  }, [])

  return (
    <>
      <div ref={playerRef}></div>
    </>
  )
}

export default PubPlayer