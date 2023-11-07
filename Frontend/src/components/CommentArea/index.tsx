import { Avatar, Divider, Input, List, Skeleton } from 'antd';
import InfiniteScroll from "react-infinite-scroll-component"
import dateFormatter from "@/utils/commonUtils/dateFormatter"
import { useAppSelector } from '@/redux/hooks';
import { selectIsLogin } from '@/redux/features/isLogin/isLoginSlice';
import { HeartFilled } from '@ant-design/icons';
import { useEffect, useRef } from 'react';

const { Search } = Input;

const CommentArea = (props: any) => {
  const isLogin = useAppSelector(selectIsLogin);
  const commentAreaRef = useRef<any>();
  const { IconText, hasMore, onSearch, loadMoreData, commentData, isInComment, videoId, index, isFullscreen } = props;
  const resizeObserverRef = useRef<any>(null);

  useEffect(() => {
    if (isInComment !== undefined) {
      commentAreaRef.current.parentNode.style.display = 'flex';
      // 自定义全屏resize
      if (isFullscreen === true) {
        resizeObserverRef.current = new ResizeObserver(() => {
          commentAreaRef.current.style.height = document.body.clientHeight + 'px';
        })
        resizeObserverRef.current.observe(document.body);
      } else if (isFullscreen === false) {
        const content = document.querySelector('.ant-layout-content') as any;
        resizeObserverRef.current = new ResizeObserver(() => {
          commentAreaRef.current.style.height = (content.clientHeight - 20) + 'px';
        })
        resizeObserverRef.current.observe(document.body);
      }
    }
  }, [])

  useEffect(() => {
    if (isInComment !== undefined) {
      if (isFullscreen === true) {
        // commentAreaRef.current.style.height = document.body.clientHeight + 'px';
        resizeObserverRef.current.unobserve(document.body);
        resizeObserverRef.current = new ResizeObserver(() => {
          commentAreaRef.current.style.height = document.body.clientHeight + 'px';
        })
        resizeObserverRef.current.observe(document.body);
      } else if (isFullscreen === false) {
        const content = document.querySelector('.ant-layout-content') as any;
        // commentAreaRef.current.style.height = (content.clientHeight - 20) + 'px';
        resizeObserverRef.current.unobserve(document.body);
        resizeObserverRef.current = new ResizeObserver(() => {
          commentAreaRef.current.style.height = (content.clientHeight - 20) + 'px';
        })
        resizeObserverRef.current.observe(document.body);
      }
    }
  }, [isFullscreen])

  return (
    <>
      <div id={`comment-area-${index}`} className='comment-area' ref={commentAreaRef} style={{ display: isInComment === undefined ? 'block' : isInComment === true ? 'block' : 'none', width: isInComment === undefined ? '100%' : isInComment === true ? '30%' : '100%', padding: '10px', backgroundColor: 'rgb(244, 241, 252)', overflow: 'scroll' }} >
        <div style={{ marginBottom: '10px' }}>全部评论</div>
        <div style={{ display: 'flex', marginBottom: '20px' }} >
          <Avatar size={'large'} src={JSON.parse(localStorage.getItem('user') || '{}').avatar} style={{ marginRight: '10px' }} />
          <Search
            disabled={!isLogin}
            placeholder={isLogin ? '留下你的精彩评论吧' : '请登录后评论'}
            allowClear
            enterButton="评论"
            size="large"
            onSearch={(value) => { onSearch(value, videoId) }}
          />
        </div>
        <InfiniteScroll
          dataLength={commentData.length}
          next={() => { loadMoreData(videoId) }}
          hasMore={hasMore}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>你已经探索到了世界的尽头~</Divider>}
          scrollableTarget={isInComment === undefined ? 'atvv-imva-content' : `comment-area-${index}`}
        >
          <List
            itemLayout="vertical"
            dataSource={commentData}
            renderItem={(item: any) => (
              <List.Item
                key={item.commentId}
                actions={[
                  <IconText icon={HeartFilled} text={item.likes} key="list-vertical-like-o" id={item.commentId} isLiked={item.userLike === 1 ? true : false} />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.userAvatar} />}
                  title={<a href="javascript;">{item.userName}</a>}
                  description={dateFormatter(item.createTime)}
                />
                {item.commentContent}
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  )
}

export default CommentArea