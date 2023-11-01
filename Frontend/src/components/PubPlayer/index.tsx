import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';

import React, { useEffect, useRef } from 'react'

const PubPlayer: React.FC<any> = (props: { getRef: any, playerConfig: { [propName: string]: string } }) => {
  const { getRef, playerConfig } = props;

  const playerDomRef = useRef<any>(null);
  const playerInsRef = useRef<any>(null);

  useEffect(() => {
    const player = new Player({
      el: playerDomRef.current,
      ...playerConfig,
    });
    playerInsRef.current = player;
    getRef(playerInsRef.current);
    const content = document.querySelector('.ant-layout-content') as any;
    const resizeObserver = new ResizeObserver(() => {
      playerDomRef.current.style.height = (content.clientHeight - 20) + 'px';
    })
    resizeObserver.observe(document.body);
    return () => {
      resizeObserver.unobserve(document.body);
    }
  }, [])

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