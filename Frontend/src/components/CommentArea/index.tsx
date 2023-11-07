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
  const { IconText, hasMore, onSearch, loadMoreData, commentData, isInComment, videoId } = props;

  useEffect(() => {
    if (isInComment !== undefined) {
      commentAreaRef.current.parentNode.style.display = 'flex';
    }
  }, [])

  return (
    <>
      <div className='comment-area' ref={commentAreaRef} style={{ display: isInComment === undefined ? 'block' : isInComment === true ? 'block' : 'none', width: isInComment === undefined ? '100%' : isInComment === true ? '30%' : '100%', padding: '10px', backgroundColor: 'rgb(244, 241, 252)' }} >
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
          scrollableTarget={'atvv-imva-content'}
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