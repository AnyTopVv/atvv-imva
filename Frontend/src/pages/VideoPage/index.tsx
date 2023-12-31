import { Avatar, Space, message } from 'antd';
import React, { useState, type FC, type ReactElement, useEffect, useRef } from 'react';
import PubPlayer from '@/components/PubPlayer'
import Mp4Plugin from "xgplayer-mp4"
import { addComment, getVideoComments, getVideoDetail, likeComment, likeVideo, starVideo } from './service';
import useCallbackState from '@/hooks/useCallbackState';
import Loading from '@/components/Loading';
import { HeartFilled, StarFilled } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import PageNotFound from '../PageNotFound';
import { useAppSelector } from '@/redux/hooks';
import { selectIsLogin } from '@/redux/features/isLogin/isLoginSlice';
import CommentArea from '@/components/CommentArea';
import { CommentIcon } from '@/assets/svgs';

const VideoPage: FC<any> = (props: { loginModalRef: any }): ReactElement => {
  const isLogin = useAppSelector(selectIsLogin);
  const [playerConfig, setPlayerConfig] = useCallbackState<any>({})
  const [isInit, setIsInit] = useState<any>(false);
  const [videoData, setVideoData] = useState<any>();
  const { pathname } = useLocation();
  const secondaryPathKey = parseInt(pathname.split('/')[2]);  // 二级路由
  const { loginModalRef } = props;
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [commentData, setCommentData] = useState<any>([]);
  const loadedCommentPage = useRef<number>(1);
  const [hasMore, setHasMore] = useState(true);

  function isNumber(num: any) {
    return typeof num === 'number' && !isNaN(num)
  }

  const IconText = ({ icon, text, id, isLiked }: { icon: React.FC; text: number; id: number, isLiked: boolean }) => {
    const [isLikedCurrent, setIsLikedCurrent] = useState(isLiked);
    const [likeNum, setLikeNum] = useState(text);

    const onCommentLikeClick = () => {
      const reqData = {
        commentId: id,
        like: isLikedCurrent ? 2 : 1,
      }
      likeComment(reqData).then((_res: any) => {
        setIsLikedCurrent(isLikedCurrent ? false : true);
        setLikeNum(isLikedCurrent ? likeNum - 1 : likeNum + 1);
      })
    }

    return <Space style={{ cursor: 'pointer', color: isLikedCurrent ? '#fe2c55' : '#474747' }} onClick={onCommentLikeClick} >
      {React.createElement(icon)}
      {likeNum}
    </Space>
  };

  const loadMoreData = () => {
    if (isCommentLoading) {
      return;
    }
    setIsCommentLoading(true);
    const commentReqData = {
      videoId: secondaryPathKey,
      pageNumber: loadedCommentPage.current,
    };
    getVideoComments(commentReqData).then((res: any) => {
      if (res.data.code === 0) {
        if (res.data.data.userComments.length === 0) {
          setHasMore(false);
          return
        }
        setCommentData(commentData.concat(res.data.data.userComments));
        loadedCommentPage.current++;
        setIsCommentLoading(false);
      } else {
        setHasMore(false);
      }
    });
  };

  const onSearch = (value: string) => {
    if (value !== undefined && value !== "") {
      const reqData = {
        videoId: videoData.uuid,
        commentContent: value,
      }
      addComment(reqData).then((res: any) => {
        if (res.data.code === 0) {
          setCommentData([res.data.data, ...commentData]);
          message.success("评论发布成功！")
        } else {
          message.error(res.data.msg || "评论发布失败！请稍后重试！")
        }
      })
    }
  }

  const onLikeClick = () => {
    if (isLogin) {
      const reqData = {
        videoId: secondaryPathKey,
        like: isLiked ? 2 : 1,
      }
      likeVideo(reqData).then((res: any) => {
        if (res.data.code === 0) {
          setIsLiked(reqData.like === 2 ? false : true);
          setVideoData({
            ...videoData,
            likes: reqData.like === 2 ? videoData.likes - 1 : videoData.likes + 1,
          })
        }
      })
    } else {
      message.info("请先登录后点赞！");
      loginModalRef.current.open();
    }
  }

  const onStarClick = () => {
    if (isLogin) {
      const reqData = {
        videoId: secondaryPathKey,
        star: isStarred ? 4 : 3,
      }
      starVideo(reqData).then((res: any) => {
        if (res.data.code === 0) {
          setIsStarred(reqData.star === 4 ? false : true);
          setVideoData({
            ...videoData,
            stars: reqData.star === 4 ? videoData.stars - 1 : videoData.stars + 1,
          })
        }
      })
    } else {
      message.info("请先登录后收藏！");
      loginModalRef.current.open();
    }
  }

  useEffect(() => {
    if (isNumber(secondaryPathKey)) {
      const videoReqData = {
        videoId: secondaryPathKey,
      };
      getVideoDetail(videoReqData).then((res: any) => {
        setVideoData(res.data.data);
        setIsLiked(res.data.data.userLike === 1 ? true : false);
        setIsStarred(res.data.data.userStar === 1 ? true : false);
        setPlayerConfig({
          url: res.data.data.videoSrc,
          poster: res.data.data.videoPreview,
          // autoplayMuted: true,
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
      });
      loadMoreData();
    }
  }, [])

  return (
    <>
      {
        isNumber(secondaryPathKey) ?
          <div style={{ display: 'flex' }} >
            <div style={{ flex: '6' }}>
              {isInit ?
                <div style={{ height: '700px' }} >
                  <PubPlayer playerConfig={playerConfig} />
                </div> :
                <div style={{ height: '700px' }} >
                  <Loading />
                </div>
              }
              <h1 style={{ lineHeight: '40px', fontSize: '18px', fontWeight: '500' }} >{videoData?.title}</h1>
              <div style={{ fontSize: '24px', marginBottom: '20px' }} >
                <span style={{ marginRight: '20px', cursor: 'pointer', color: isLiked ? '#fe2c55' : '#474747', transition: 'color .3s' }} onClick={onLikeClick} >
                  <HeartFilled /> <span>{videoData?.likes}</span>
                </span>
                <span style={{ marginRight: '20px', cursor: 'pointer', color: isStarred ? '#ffb802' : '#474747', transition: 'color .3s' }} onClick={onStarClick} >
                  <StarFilled /> <span>{videoData?.stars}</span>
                </span>
                <span style={{ marginRight: '20px', cursor: 'pointer', color: '#474747', transition: 'color .3s' }} >
                  <CommentIcon /> <span>{videoData?.commentNum}</span>
                </span>
              </div>
              <CommentArea IconText={IconText} hasMore={hasMore} onSearch={onSearch} loadMoreData={loadMoreData} commentData={commentData} />
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
