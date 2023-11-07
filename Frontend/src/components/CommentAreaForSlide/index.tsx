import { useEffect, useRef, useState } from 'react';
import CommentArea from '../CommentArea';
import { addComment, getVideoComments, likeComment } from '@/pages/VideoPage/service';
import { Space, message } from 'antd';
import React from 'react';

const CommentAreaForSlide = (props: any) => {
  const { isInComment, videoId, getCommentRef } = props;
  // 评论区所需变量
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [commentData, setCommentData] = useState<any>([]);
  const loadedCommentPage = useRef<number>(1);
  const [hasMore, setHasMore] = useState(true);

  // 评论区所需props
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

  const loadMoreData = (videoId: number) => {
    if (isCommentLoading) {
      return;
    }
    setIsCommentLoading(true);
    const commentReqData = {
      videoId: videoId,
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

  const onSearch = (value: string, videoId: number) => {
    if (value !== undefined && value !== "") {
      const reqData = {
        videoId: videoId,
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

  useEffect(() => {
    getCommentRef({
      loadedCommentPage: loadedCommentPage,
      loadMoreData: loadMoreData,
    })
  }, [])

  return (
    <>
      <CommentArea IconText={IconText} hasMore={hasMore} onSearch={onSearch} loadMoreData={loadMoreData} commentData={commentData} isInComment={isInComment} videoId={videoId} />
    </>
  )
}

export default CommentAreaForSlide