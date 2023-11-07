import {
  Plugin
} from 'xgplayer'
import {
  starVideo
} from '../../../pages/videoPage/service';

const {
  POSITIONS
} = Plugin

// customStarPlugin
export default class customStar extends Plugin {
  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'customStarPlugin'
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
    this.starNum = this.playerConfig.customStar.starNum;
    this.isStarred = this.playerConfig.customStar.isStarred;
    this.icon = this.find('.custom-star-icon')
    this.onCustomStarClick = (e) => {
      // console.log('class为icon元素点击回调')
      // 请求时暂时取消事件绑定
      this.unbind('.custom-star-icon', 'click', this.onCustomStarClick)
      if (this.isStarred === true) {
        starVideo({
          videoId: this.playerConfig.customStar.videoId,
          star: this.isStarred ? 4 : 3,
        }).then((res) => {
          if (res.data.code === 0) {
            this.isStarred = false;
            this.starNum--;
            this.setHtml(`<div class="custom-star-icon" style="transition: color .7s;" ><span class="star-num">${this.starNum}</span></div>`, () => {
              // console.log('dom重置完成')
            });
          }
          this.bind('.custom-star-icon', 'click', this.onCustomStarClick)
        })
      } else {
        starVideo({
          videoId: this.playerConfig.customStar.videoId,
          star: this.isStarred ? 4 : 3,
        }).then((res) => {
          if (res.data.code === 0) {
            this.isStarred = true;
            this.starNum++;
            this.setHtml(`<div class="custom-star-icon" style="color: #ffb802; transition: color .7s; " ><span class="star-num">${this.starNum}</span></div>`, () => {
              // console.log('dom重置完成')
            });
          }
          this.bind('.custom-star-icon', 'click', this.onCustomStarClick)
        })
      }
    }
    // this.onClick = () => {
    //   // console.log('当前插件根节点点击事件')
    // }
    // 对当前插件根节点内部类名为.icon的元素绑定click事件
    this.bind('.custom-star-icon', 'click', this.onCustomStarClick)
    // // 对当前插件根节点绑定click事件
    // this.bind('click', this.onClick)
    //TODO 插件实例化之后的一些逻辑
  }

  destroy() {
    this.unbind('.custom-star-icon', 'click', this.onCustomStarClick)
    // this.unbind('click', this.onClick)
    this.icon = null
    // 播放器销毁的时候一些逻辑
  }

  render() {
    return `<div class="custom-star-plugin">
    ${this.playerConfig.customStar.isStarred ?
      `<div class="custom-star-icon" style="color: #ffb802; transition: color .7s;"><span class="star-num">${this.playerConfig.customStar.starNum}</span></div>` :
      `<div class="custom-star-icon" style="transition: color .7s;"><span class="star-num">${this.playerConfig.customStar.starNum}</span></div>`
    }

    </div>`
  }
}