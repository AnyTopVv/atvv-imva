import {
  Plugin
} from 'xgplayer'

const {
  POSITIONS
} = Plugin

// customTitlePlugin
export default class customTitle extends Plugin {
  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'customTitlePlugin'
  }

  static get defaultConfig() {
    return {
      // 挂载在controls的右侧，如果不指定则默认挂载在播放器根节点上
      position: POSITIONS.ROOT_LEFT
    }
  }

  constructor(args) {
    super(args)
  }

  beforePlayerInit() {
    // TODO 播放器调用start初始化播放源之前的逻辑
  }

  afterPlayerInit() {
    // TODO 播放器调用start初始化播放源之后的逻辑
  }

  afterCreate() {
    this.content = this.find('.custom-title-content')
    this.onCustomTitleClick = (e) => {
      // console.log('class为content元素点击回调')
    }
    // this.onClick = () => {
    //   // console.log('当前插件根节点点击事件')
    // }
    // 对当前插件根节点内部类名为.content的元素绑定click事件
    this.bind('.custom-title-content', 'click', this.onCustomTitleClick)
    // // 对当前插件根节点绑定click事件
    // this.bind('click', this.onClick)
    //TODO 插件实例化之后的一些逻辑
  }

  destroy() {
    this.unbind('.custom-title-content', 'click', this.onCustomTitleClick)
    // this.unbind('click', this.onClick)
    this.content = null
    // 播放器销毁的时候一些逻辑
  }

  render() {
    return `<div class="custom-title-plugin" style="position: absolute; bottom: 20px; left: 20px;">
    <div class="custom-title-author" style="white-space: nowrap; color: rgba(255, 255, 255, 0.9); font-size: 20px;" bottom: 0;" >@ ${this.playerConfig.customTitle.author}</div>
    <div class="custom-title-content" style="white-space: nowrap; color: rgba(255, 255, 255, 0.9); font-size: 16px;" bottom: 0;" >${this.playerConfig.customTitle.title}</div>
    </div>`
  }
}