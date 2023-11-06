import { Plugin } from 'xgplayer'
import EventBus from '../../pubsub';

const { POSITIONS } = Plugin

// customCommentPlugin
export default class customComment extends Plugin {
  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'customCommentPlugin'
  }

  static get defaultConfig() {
    return {
      // 挂载在controls的右侧，如果不指定则默认挂载在播放器根节点上
      position: POSITIONS.ROOT_RIGHT
    }
  }

  constructor(args) {
    super(args)
  }

  changeCommentIcons = (e) => {
    // 监听到点击后调用，拿到全屏状态
    if (e.detail.customIsInComment) {
      this.playerConfig.customComment.setIsInComment(true);
    } else {
      this.playerConfig.customComment.setIsInComment(false);
    }
  }

  beforePlayerInit() {
    // TODO 播放器调用start初始化播放源之前的逻辑
  }

  afterPlayerInit() {
    // TODO 播放器调用start初始化播放源之后的逻辑
    //监听点击自定义全屏按钮
    EventBus.addEventListener('clickCustomComment', this.changeCommentIcons)
  }

  afterCreate() {
    this.icon = this.find('.custom-comment-icon')
    this.onCustomCommentClick = (e) => {
      // console.log('class为icon元素点击回调')
      if (this.playerConfig.customComment.isInComment.current === true) {
        // 派发事件，将customIsInComment暴露出去
        EventBus.dispatchEvent('clickCustomComment', { customIsInComment: false });
      } else {
        // 派发事件，将customIsInComment暴露出去
        EventBus.dispatchEvent('clickCustomComment', { customIsInComment: true });
      }
    }
    // this.onClick = () => {
    //   // console.log('当前插件根节点点击事件')
    // }
    // 对当前插件根节点内部类名为.icon的元素绑定click事件
    this.bind('.custom-comment-icon', 'click', this.onCustomCommentClick)
    // // 对当前插件根节点绑定click事件
    // this.bind('click', this.onClick)
    //TODO 插件实例化之后的一些逻辑
  }

  destroy() {
    this.unbind('.custom-comment-icon', 'click', this.onCustomCommentClick)
    // this.unbind('click', this.onClick)
    this.icon = null
    // 播放器销毁的时候一些逻辑
    //移除监听
    EventBus.removeEventListener('clickCustomComment', this.changeCommentIcons)
  }

  render() {
    return `<div class="custom-comment-plugin">
    <div class="custom-comment-icon"><span class="comment-num">${this.playerConfig.customComment.commentNum}</span></div>
    </div>`
  }
}