import Player, { Events } from 'xgplayer';
import 'xgplayer/dist/index.min.css';

import React, { useEffect, useRef } from 'react'

const PubPlayer: React.FC<any> = (props: { getRef?: any, playerConfig: { [propName: string]: any }, isFullscreen?: boolean, index?: number }) => {
  const { getRef, playerConfig, isFullscreen } = props;

  const playerDomRef = useRef<any>(null);
  const playerInsRef = useRef<any>(null);
  const resizeObserverRef = useRef<any>(null);

  // function isNumber(num: any) {
  //   return typeof num === 'number' && !isNaN(num)
  // }

  useEffect(() => {
    const player = new Player({
      el: playerDomRef.current,
      ...playerConfig,
    });
    // 自动播放优化
    player.on(Events.AUTOPLAY_PREVENTED, () => {
      player.muted = true;
      player.play();
    });
    player.on(Events.AUTOPLAY_STARTED, () => {
      player.play();
    });
    // // 通过插件实例调用
    // player.getPlugin('pc').useHooks('videoClick', () => {
    //   // TODO
    //   /**
    //    * 如果返回false，则不执行默认逻辑
    //    * 如果返回true，则切换暂停/播放
    //    * */
    //   console.log("index", index);
    //   console.log("playerConfig.customAutonext.currentIndex", playerConfig.customAutonext.currentIndex.current);

    //   if (isNumber(index)) {
    //     if (playerConfig.customAutonext.currentIndex.current !== index) {
    //       return false;
    //     }
    //   }
    //   return true;
    // })
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
    // 解决侧边栏不显示的问题
    player.focus();
    return () => {
      player.destroy();
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