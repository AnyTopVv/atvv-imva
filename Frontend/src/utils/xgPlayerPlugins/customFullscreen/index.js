import { Plugin } from 'xgplayer'
import EventBus from '../../pubsub';

const { POSITIONS } = Plugin

// customFullscreennPlugin
export default class customFullscreen extends Plugin {
  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'customFullscreenPlugin'
  }

  static get defaultConfig() {
    return {
      // 挂载在controls的右侧，如果不指定则默认挂载在播放器根节点上
      position: POSITIONS.CONTROLS_RIGHT
    }
  }

  constructor(args) {
    super(args)
  }

  changeIcons = (e) => {
      // 监听到点击后调用，拿到全屏状态
    if (e.detail.customIsFullscreen) {
      this.playerConfig.customFullscreen.setIsFullscreen(true);
      this.setHtml(`<div class="custom-fullscreen-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="2 -4 28 40">\n  <path fill="#fff" transform="scale(0.0320625 0.0320625)" d="M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z"></path>\n</svg>\n
      </div>`, () => {
        // console.log('dom重置完成')
      });
      if (document.fullscreenElement === null) {
        this.playerConfig.customFullscreen.target.requestFullscreen();
      }
    } else {
      this.playerConfig.customFullscreen.setIsFullscreen(false);
      this.setHtml(`<div class="custom-fullscreen-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="2 -4 28 40">\n  <path fill="#fff" transform="scale(0.0320625 0.0320625)" d="M598 214h212v212h-84v-128h-128v-84zM726 726v-128h84v212h-212v-84h128zM214 426v-212h212v84h-128v128h-84zM298 598v128h128v84h-212v-212h84z"></path>\n</svg>\n
      </div>`, () => {
        // console.log('dom重置完成')
      });
      document.exitFullscreen();
    }
  }

  beforePlayerInit() {
    // TODO 播放器调用start初始化播放源之前的逻辑
  }

  afterPlayerInit() {
    // TODO 播放器调用start初始化播放源之后的逻辑
    //监听点击自定义全屏按钮
    EventBus.addEventListener('clickCustomFullscreen', this.changeIcons)
  }

  afterCreate() {
    this.icon = this.find('.custom-fullscreen-icon')
    this.onIconClick = (e) => {
      // console.log('class为icon元素点击回调')
      if (this.playerConfig.customFullscreen.isFullscreen.current === true) {
        // 派发事件，将customIsFullscreen暴露出去
        EventBus.dispatchEvent('clickCustomFullscreen', { customIsFullscreen: false });
      } else {
        // 派发事件，将customIsFullscreen暴露出去
        EventBus.dispatchEvent('clickCustomFullscreen', { customIsFullscreen: true });
      }
    }
    this.onClick = () => {
      // console.log('当前插件根节点点击事件')
    }
    // 对当前插件根节点内部类名为.icon的元素绑定click事件
    this.bind('.custom-fullscreen-icon', 'click', this.onIconClick)
    // 对当前插件根节点绑定click事件
    this.bind('click', this.onClick)
    //TODO 插件实例化之后的一些逻辑
  }

  destroy() {
    this.unbind('.icon', 'click', this.onIconClick)
    this.unbind('click', this.onClick)
    this.icon = null
    // 播放器销毁的时候一些逻辑
    //移除监听
    EventBus.removeEventListener('clickCustomFullscreen', this.reSearchCollectFile)
  }

  render() {
    return `<div class="custom-fullscreen-plugin">
    <div class="custom-fullscreen-icon">
      ${this.playerConfig.customFullscreen.isFullscreen.current === true ?
      `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="2 -4 28 40">\n  <path fill="#fff" transform="scale(0.0320625 0.0320625)" d="M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z"></path>\n</svg>\n` :
      `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="2 -4 28 40">\n  <path fill="#fff" transform="scale(0.0320625 0.0320625)" d="M598 214h212v212h-84v-128h-128v-84zM726 726v-128h84v212h-212v-84h128zM214 426v-212h212v84h-128v128h-84zM298 598v128h128v84h-212v-212h84z"></path>\n</svg>\n`
      }
    </div>
    </div>`
  }
}