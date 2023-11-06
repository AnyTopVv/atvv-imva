import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { getRecommendPageVideo } from './service';
import throttle from '@/utils/commonUtils/throttle'
import styles from './index.module.css';
import PubPlayer from '@/components/PubPlayer'
import Mp4Plugin from "xgplayer-mp4"
import useLatest from '@/hooks/useLatest';
import customFullscreen from '@/utils/xgPlayerPlugins/customFullscreen';
import customComment from '@/utils/xgPlayerPlugins/customComment';
import customLike from '@/utils/xgPlayerPlugins/customLike';
import customStar from '@/utils/xgPlayerPlugins/customStar';
import customShare from '@/utils/xgPlayerPlugins/customShare';
import customAvatar from '@/utils/xgPlayerPlugins/customAvatar';
import customTitle from '@/utils/xgPlayerPlugins/customTitle';
import customDetail from '@/utils/xgPlayerPlugins/customDetail';
import customAutonext from '@/utils/xgPlayerPlugins/customAutonext';
import { useNavigate } from 'react-router-dom';

const Recommend: React.FC = () => {
  const carouselRef: any = useRef();
  const fullScreenRef: any = useRef();
  const [videoQueue, setVideoQueue] = useState<any[]>([]);
  const [isBegin, setIsBegin] = useState<boolean>(true);
  const [isEnd, _setIsEnd] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isInComment, setIsInComment] = useState<boolean>(false);
  // const [isAutonext, setIsAutonext] = useState<boolean>(false);
  const currentIndex: any = useRef(0);
  const pastIndex: any = useRef(0);
  const playerRefList: any = useRef([]);
  const latestIsFullscreenRef = useLatest(isFullscreen);
  const latestIsInCommentRef = useLatest(isInComment);
  const isAutonextRef = useRef(false);
  const navigate = useNavigate();

  // videoQueue.current = useMemo(
  //   () => videoQueue.current.concat(latestMessage),
  //   [latestMessage],
  // );

  const afterChange = (index: number) => {
    if (videoQueue.length - index < 4) {
      getRecommendPageVideo().then((res) => {
        appendVideos(res?.data.data);
      });
    }
    playerRefList.current[pastIndex.current].pause();
    playerRefList.current[index].play();
    currentIndex.current = index;
  }

  const beforeChange = (oldIndex: number, newIndex: number) => {
    if (newIndex === 0) {
      setIsBegin(true);
    } else {
      setIsBegin(false);
    }
    pastIndex.current = oldIndex;
  }

  const appendVideos = (data: any) => {
    setVideoQueue([...videoQueue, ...data]);
  }

  const onUpClick = () => {
    carouselRef.current.slickPrev();
  }

  const onDownClick = () => {
    carouselRef.current.slickNext();
  }

  function getRef(ins: any) {
    playerRefList.current.push(ins);
  }

  const handleFullscreenChange = () => {
    setIsFullscreen(document.fullscreenElement !== null);
  };

  useEffect(() => {
    getRecommendPageVideo().then((res) => {
      appendVideos(res?.data.data);
    });
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    }
  }, [])

  // 这样不知道为什么不会触发
  // useEffect(() => {
  //   console.log(videoQueue.current.length);
  // }, [currentIndex.current])

  return (
    <>
      <div id="video-player" className={styles.videoPlayer} ref={fullScreenRef}>
        <Slider // 不要用antd的走马灯，有bug
          dots={false}
          arrows={false}
          vertical={true}
          verticalSwiping={true}
          infinite={false}
          speed={300}
          afterChange={afterChange}
          beforeChange={beforeChange}
          // onSwipe={onSwipe}
          // adaptiveHeight={true}  // 开这个会有显示bug
          ref={carouselRef}
          className={styles.slider}
        >
          {videoQueue.map((videoData: { [propName: string]: string | number }, index) => {
            const playerConfig = {
              url: videoData.videoSrc,
              poster: videoData.videoPreview,
              // autoplayMuted: index === 0 ? true : false,
              autoplay: index === 0 ? true : false,
              height: '100%',
              width: '100%',
              lang: 'zh',
              marginControls: true,
              fullscreen: false,
              cssFullscreen: false,
              loop: true, // 循环播放
              closeDelayBlur: true,
              plugins: [Mp4Plugin, customFullscreen, customShare, customStar, customComment, customLike, customAvatar, customTitle, customDetail, customAutonext],
              mp4plugin: {
                maxBufferLength: 10,
                minBufferLength: 5,
              },
              start: {
                disableAnimate: true,
              },
              dynamicBg: {
                disable: false,
              },
              customFullscreen: {
                target: fullScreenRef.current,
                isFullscreen: latestIsFullscreenRef,
                setIsFullscreen: setIsFullscreen,
              },
              customAvatar: {
                videoId: videoData.uuid,
                author: videoData.author,
                authorAvatarSrc: videoData.authorAvatarSrc,
              },
              customLike: {
                likeNum: videoData.likes,
                videoId: videoData.uuid,
                isLiked: videoData.userLike === 1 ? true : false,
              },
              customStar: {
                starNum: videoData.stars,
                videoId: videoData.uuid,
                isStarred: videoData.userStar === 1 ? true : false,
              },
              customComment: {
                commentNum: videoData.commentNum,
                isInComment: latestIsInCommentRef,
                setIsInComment: setIsInComment,
              },
              customTitle: {
                title: videoData.title,
                author: videoData.author,
              },
              customDetail: {
                videoId: videoData.uuid,
                navigate: () => { navigate(`/video/${videoData.uuid}`); },
              },
              customAutonext: {
                currentIndex: currentIndex,
                isAutonext: isAutonextRef,
                // setIsAutonext: setIsAutonext,
                onDownClick: onDownClick,
              },
              commonStyle: {
                // 进度条底色
                progressColor: '776ce9',
                // 播放完成部分进度条底色
                playedColor: '#776ce9',
                // 缓存部分进度条底色
                cachedColor: '',
                // 进度条滑块样式
                sliderBtnStyle: {},
                // 音量颜色
                volumeColor: '#776ce9',
              },
              // preloadTime: 10,  // 预加载固定10s的内容
            };
            return <PubPlayer key={index} getRef={getRef} playerConfig={playerConfig} isFullscreen={isFullscreen} index={index} />
          })}
        </Slider>
        <ul className={styles.videoSwitcher}>
          <li className={isBegin ? `${styles.btnUp} ${styles.disabled}` : `${styles.btnUp}`} onClick={isBegin ? undefined : throttle(onUpClick, 500)}></li>
          <li className={isBegin ? styles.disabledUp : styles.displayNone}></li>
          <li className={isEnd ? `${styles.btnDown} ${styles.disabled}` : `${styles.btnDown}`} onClick={isEnd ? undefined : throttle(onDownClick, 500)}></li>
          <li className={isEnd ? styles.disabledDown : styles.displayNone}></li>
        </ul>
      </div>
    </>
  );
};

export default Recommend;
