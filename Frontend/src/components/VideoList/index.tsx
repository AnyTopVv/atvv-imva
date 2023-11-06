import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getOtherPageVideo } from './service';
import { Masonry } from 'react-plock';
import { Card, Image } from 'antd';
import Loading from '../Loading';
import useLatest from '@/hooks/useLatest';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const VideoList: React.FC<any> = (props: { categoryId: string }) => {
  const { categoryId } = props;
  const containerRef = useRef<any>(null) // 创建一个 ref 对象，用于引用组件的容器元素
  const [data, setData] = useState([]); // 当前已加载的数据
  const [isLoading, setIsLoading] = useState(true); // 当前是否正在加载数据
  const [hasMore, setHasMore] = useState(true); // 当前是否还有更多数据可供加载
  const latestDataRef = useLatest(data);
  const navigate = useNavigate();
  const reqData = {
    categoryId: categoryId,
    count: 10,
  }

  const appendVideos = (res: any) => {
    setData(latestDataRef.current.concat(res));
    setIsLoading(false);
    setHasMore(latestDataRef.current.concat(res).length < 1000);
  }

  // 使用 useLayoutEffect 钩子来监听组件容器的滚动事件，并在需要时加载更多数据
  useLayoutEffect(() => {
    function handleScroll() {
      const container = containerRef.current;
      if (!container) return;
      const scrollBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
      // 判断是否需要加载更多数据，这里的阈值为 50px
      if (scrollBottom < 100 && !isLoading && hasMore) {
        setIsLoading(true);
        getOtherPageVideo(reqData).then((res: any) => {
          appendVideos(res?.data.data);
        });
      }
    }
    containerRef.current.addEventListener('scroll', handleScroll);
    // 在组件卸载时移除监听器
    return () => containerRef.current.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  useEffect(() => {
    setIsLoading(true);
    getOtherPageVideo(reqData).then((res: any) => {
      appendVideos(res?.data.data);
      setIsLoading(true);
      const timeout = setTimeout(() => {
        getOtherPageVideo(reqData).then((res: any) => {
          appendVideos(res?.data.data);
        });
        clearTimeout(timeout);
      }, 500)
    });
  }, [])

  // const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
  //   console.log(e);
  //   if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
  //     loadMoreData();
  //   }
  // };

  return (
    <>
      <div ref={containerRef} style={{ height: '100%', overflow: 'auto', padding: '10px' }}>
        <Masonry
          items={data}
          config={{
            columns: [1, 2, 3, 4, 5],
            gap: [24, 12, 12, 12, 12],
            media: [640, 768, 1024, 1280, 1400],
          }}
          render={(item: any, index) => (
            <div key={index} onClick={() => { navigate(`/video/${item.uuid}`) }}>
              <Card
                key={index}
                hoverable
                size="small"
                cover={<Image
                  src={item.videoPreview}
                  preview={false}
                  height={200}
                // placeholder={
                //   <Skeleton.Node style={{ height: '200px' }} active={true}>
                //     <YoutubeFilled style={{ fontSize: 40, color: '#bfbfbf' }} />
                //   </Skeleton.Node>
                // }
                />}
                style={{ width: '100%', height: 'auto' }}
              >
                <Meta title={item.title} description={item.author} />
              </Card>
            </div>
          )}
        />
        <div style={{ height: '50px' }} >{isLoading && <Loading />}</div>
      </div>

    </>
  )
}

export default VideoList