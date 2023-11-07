import {
  Plugin
} from 'xgplayer'
import {
  likeVideo
} from '../../../pages/videoPage/service';

const {
  POSITIONS
} = Plugin

// customLikePlugin
export default class customLike extends Plugin {
  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'customLikePlugin'
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

  beforePlayerInit() {
    // TODO 播放器调用start初始化播放源之前的逻辑
  }

  afterPlayerInit() {
    // TODO 播放器调用start初始化播放源之后的逻辑
  }

  afterCreate() {
    this.likeNum = this.playerConfig.customLike.likeNum;
    this.isLiked = this.playerConfig.customLike.isLiked;
    this.icon = this.find('.custom-like-icon')
    this.onCustomLikeClick = (e) => {
      // console.log('class为icon元素点击回调')
      // 请求时暂时取消事件绑定
      this.unbind('.custom-like-icon', 'click', this.onCustomLikeClick)
      if (this.isLiked === true) {
        likeVideo({
          videoId: this.playerConfig.customLike.videoId,
          like: this.isLiked ? 2 : 1,
        }).then((res) => {
          if (res.data.code === 0) {
            this.isLiked = false;
            this.likeNum--;
            this.setHtml(`<div class="custom-like-icon" style="transition: color .7s;" ><span class="like-num">${this.likeNum}</span></div>`, () => {
              // console.log('dom重置完成')
            });
          }
          this.bind('.custom-like-icon', 'click', this.onCustomLikeClick)
        })
      } else {
        likeVideo({
          videoId: this.playerConfig.customLike.videoId,
          like: this.isLiked ? 2 : 1,
        }).then((res) => {
          if (res.data.code === 0) {
            this.likeNum++;
            this.isLiked = true;
            this.setHtml(`<div class="custom-like-icon" style="color: #fe2c55; transition: color .7s; " ><span class="like-num">${this.likeNum}</span></div>`, () => {
              // console.log('dom重置完成')
            });
          }
          this.bind('.custom-like-icon', 'click', this.onCustomLikeClick)
        })

      }
    }
    // this.onClick = () => {
    //   // console.log('当前插件根节点点击事件')
    // }
    // 对当前插件根节点内部类名为.icon的元素绑定click事件
    this.bind('.custom-like-icon', 'click', this.onCustomLikeClick)
    // // 对当前插件根节点绑定click事件
    // this.bind('click', this.onClick)
    //TODO 插件实例化之后的一些逻辑
  }

  destroy() {
    this.unbind('.custom-like-icon', 'click', this.onCustomLikeClick)
    // this.unbind('click', this.onClick)
    this.icon = null
    // 播放器销毁的时候一些逻辑
  }

  render() {
    return `<div class="custom-like-plugin">
      ${this.playerConfig.customLike.isLiked ?
        `<div class="custom-like-icon" style="color: #fe2c55; transition: color .7s;"><span class="like-num">${this.playerConfig.customLike.likeNum}</span></div>` :
        `<div class="custom-like-icon" style="transition: color .7s;"><span class="like-num">${this.playerConfig.customLike.likeNum}</span></div>`
      }
      </div>`
  }
}