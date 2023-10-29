import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { getRecommendPageVideo } from './service';
import throttle from '@/utils/commonUtils/throttle'
import styles from './index.module.css';
import PubPlayer from '@/components/PubPlayer'

const contentStyle: React.CSSProperties = {
  height: 'calc(92vh - 20px)',
  color: '#fff',
  lineHeight: 'calc(92vh - 20px)',
  textAlign: 'center',
  background: '#364d79',
};

const Recommend: React.FC = () => {
  const carouselRef: any = useRef();
  const [videoQueue, setVideoQueue] = useState<any[]>([]);
  const [isBegin, setIsBegin] = useState<boolean>(true);
  const [isEnd, _setIsEnd] = useState<boolean>(false);
  const currentIndex: any = useRef();

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
    currentIndex.current = index;
  }

  const beforeChange = (_oldIndex: number, newIndex: number) => {
    if (newIndex === 0) {
      setIsBegin(true);
    } else {
      setIsBegin(false);
    }
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

  useEffect(() => {
    getRecommendPageVideo().then((res) => {
      appendVideos(res?.data.data);
    });
  }, [])

  // 这样不知道为什么不会触发
  // useEffect(() => {
  //   console.log(videoQueue.current.length);
  // }, [currentIndex.current])
  console.log(contentStyle);

  return (
    <>
      <div className={styles.videoPlayer}>
        <Slider // 不要用antd的走马灯，有bug
          dots={false}
          arrows={false}
          vertical={true}
          draggable={true}
          infinite={false}
          afterChange={afterChange}
          beforeChange={beforeChange}
          adaptiveHeight={true}
          ref={carouselRef}
          className={styles.slider}
        >
          {videoQueue.map((videoData: any, index) => (
            <PubPlayer key={index} style={contentStyle} videoData={videoData} />
          ))}
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
