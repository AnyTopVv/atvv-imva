import { Avatar } from 'antd';
import { useState, type FC, type ReactElement, useEffect } from 'react';
import PubPlayer from '@/components/PubPlayer'
import Mp4Plugin from "xgplayer-mp4"
import { getVideoDetail } from './service';
import useCallbackState from '@/hooks/useCallbackState';
import Loading from '@/components/Loading';
import { HeartFilled, StarFilled } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import PageNotFound from '../PageNotFound';

const VideoPage: FC<any> = (): ReactElement => {
  const [playerConfig, setPlayerConfig] = useCallbackState<any>({})
  const [isInit, setIsInit] = useState<any>(false);
  const [videoData, setVideoData] = useState<any>();
  const { pathname } = useLocation();
  const secondaryPathKey = parseInt(pathname.split('/')[2]);  // 二级路由

  function isNumber(num: any) {
    return typeof num === 'number' && !isNaN(num)
  }

  useEffect(() => {
    if (isNumber(secondaryPathKey)) {
      const reqData = {
        videoId: secondaryPathKey,
      };
      getVideoDetail(reqData).then((res: any) => {
        setVideoData(res.data.data);
        setPlayerConfig({
          url: res.data.data.videoSrc,
          poster: res.data.data.videoPreview,
          autoplayMuted: true,
          autoplay: true,
          height: '100%',
          width: '100%',
          lang: 'zh',
          marginControls: true,
          fullscreen: true,
          cssFullscreen: true,
          loop: true, // 循环播放
          plugins: [Mp4Plugin],
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
          // customFullscreen: {
          //   target: fullScreenRef.current,
          //   isFullscreen: latestIsFullscreenRef,
          //   setIsFullscreen: setIsFullscreen,
          // },
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
        }, () => {
          setIsInit(true);
        })
      })
    }
  }, [])

  return (
    <>
      {
        isNumber(secondaryPathKey) ?
          <div style={{ display: 'flex' }} >
            <div style={{ flex: '5' }}>
              {isInit ?
                <div style={{ height: '700px' }} >
                  <PubPlayer playerConfig={playerConfig} />
                </div> :
                <div style={{ height: '700px' }} >
                  <Loading />
                </div>
              }
              <h1 style={{ lineHeight: '40px', fontSize: '18px', fontWeight: '500' }} >{videoData?.title}</h1>
              <div style={{ fontSize: '24px' }} >
                <span style={{ marginRight: '20px', cursor: 'pointer' }} >
                  <HeartFilled /> {videoData?.likes}
                </span>
                <span style={{ cursor: 'pointer' }}>
                  <StarFilled /> {videoData?.stars}
                </span>
              </div>
            </div>
            <div style={{ flex: '2' }}>
              <div style={{ padding: '20px' }} >
                {
                  videoData?.authorAvatarSrc ?
                    <div style={{ cursor: "pointer", display: 'inline-block' }} >
                      <Avatar size={64} src={videoData?.authorAvatarSrc} /> <span>{videoData?.author}</span>
                    </div> :
                    <div style={{ cursor: "pointer", display: 'inline-block' }} >
                      <Avatar size={64} style={{ backgroundColor: '#776ce9', verticalAlign: 'middle' }}  >{videoData?.author}</Avatar> <span>{videoData?.author}</span>
                    </div>
                }
              </div>
            </div>
          </div> :
          <PageNotFound msg="啊咧？视频不见了..." />
      }
    </>
  );
};

export default VideoPage;
