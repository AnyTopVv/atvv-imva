import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';

import React, { useEffect, useRef } from 'react'

const PubPlayer: React.FC<any> = (props: { getRef?: any, playerConfig: { [propName: string]: string }, isFullscreen?: boolean }) => {
  const { getRef, playerConfig, isFullscreen } = props;

  const playerDomRef = useRef<any>(null);
  const playerInsRef = useRef<any>(null);
  const resizeObserverRef = useRef<any>(null);

  useEffect(() => {
    const player = new Player({
      el: playerDomRef.current,
      ...playerConfig,
    });
    playerInsRef.current = player;
    if (getRef) {
      getRef(playerInsRef.current);
    }
    if (isFullscreen === true) {
      resizeObserverRef.current = new ResizeObserver(() => {
        playerDomRef.current.style.height = document.body.clientHeight + 'px';
      })
      resizeObserverRef.current.observe(document.body);
    } else if (isFullscreen === false) {
      const content = document.querySelector('.ant-layout-content') as any;
      resizeObserverRef.current = new ResizeObserver(() => {
        playerDomRef.current.style.height = (content.clientHeight - 20) + 'px';
      })
      resizeObserverRef.current.observe(document.body);
    }
    return () => {
      resizeObserverRef.current?.unobserve(document.body);
    }
  }, [])

  useEffect(() => {
    if (isFullscreen === true) {
      // playerDomRef.current.style.height = document.body.clientHeight + 'px';
      resizeObserverRef.current.unobserve(document.body);
      resizeObserverRef.current = new ResizeObserver(() => {
        playerDomRef.current.style.height = document.body.clientHeight + 'px';
      })
      resizeObserverRef.current.observe(document.body);
    } else if (isFullscreen === false) {
      const content = document.querySelector('.ant-layout-content') as any;
      // playerDomRef.current.style.height = (content.clientHeight - 20) + 'px';
      resizeObserverRef.current.unobserve(document.body);
      resizeObserverRef.current = new ResizeObserver(() => {
        playerDomRef.current.style.height = (content.clientHeight - 20) + 'px';
      })
      resizeObserverRef.current.observe(document.body);
    }
  }, [isFullscreen])

  // // 对外暴露open方法，外部组件可通过modalRef.open(callback)来展示模态框
  // useImperativeHandle(modalRef, () => {	// 这里传入的ref是通过props传进来的
  //   return {
  //     open: (callback: Function) => {
  //       setIsModalOpen(true);
  //       callback && callback()
  //     }
  //   };
  // });

  return (
    <>
      <div ref={playerDomRef}></div>
    </>
  )
}

export default PubPlayer