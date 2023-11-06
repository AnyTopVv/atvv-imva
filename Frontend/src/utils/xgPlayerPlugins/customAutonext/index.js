import { Plugin, Events } from 'xgplayer'
import EventBus from '../../pubsub';
import throttle from '@/utils/commonUtils/throttle'

const { POSITIONS } = Plugin

// customAutonextnPlugin
export default class customAutonext extends Plugin {
  // 插件的名称，将作为插件实例的唯一key值
  static get pluginName() {
    return 'customAutonextPlugin'
  }

  static get defaultConfig() {
    return {
      // 挂载在controls的右侧，如果不指定则默认挂载在播放器根节点上
      position: POSITIONS.CONTROLS_RIGHT,
      index: 1, // 位置索引为1
    }
  }

  constructor(args) {
    super(args)
  }

  changeIcons = (e) => {
    // 监听到点击后调用，拿到连播状态
    let autoNextSwitcher = document.querySelectorAll('.custom-auto-next-switcher');
    let autoNextBtn = document.querySelectorAll('.custom-auto-next-btn');
    if (e.detail.customIsAutonext) {
      this.playerConfig.customAutonext.isAutonext.current = true;
      for (let i = 0; i < autoNextSwitcher.length; i++) {
        autoNextSwitcher[i].style.background = '#776ce9';
        autoNextBtn[i].style.margin = '2px 0 0 14px';
      }
      this.player.loop = false;
      this.player.on(Events.ENDED, this.playerConfig.customAutonext.onDownClick);
    } else {
      this.playerConfig.customAutonext.isAutonext.current = false;
      for (let i = 0; i < autoNextSwitcher.length; i++) {
        autoNextSwitcher[i].style.background = '#cfcfd3';
        autoNextBtn[i].style.margin = '2px 0 0 2px';
      }
      this.player.off(Events.ENDED, this.playerConfig.customAutonext.onDownClick)
      this.player.loop = true;
    }
  }

  beforePlayerInit() {
    // TODO 播放器调用start初始化播放源之前的逻辑
  }

  afterPlayerInit() {
    // TODO 播放器调用start初始化播放源之后的逻辑
    //监听点击自定义全屏按钮
    EventBus.addEventListener('clickCustomAutonext', this.changeIcons)
  }

  afterCreate() {
    let autoNextSwitcher = document.querySelectorAll('.custom-auto-next-switcher');
    let autoNextBtn = document.querySelectorAll('.custom-auto-next-btn');
    if (this.playerConfig.customAutonext.isAutonext.current === true) {
      for (let i = 0; i < autoNextSwitcher.length; i++) {
        autoNextSwitcher[i].style.background = '#776ce9';
        autoNextBtn[i].style.margin = '2px 0 0 14px';
      }
      this.player.loop = false;
      this.player.on(Events.ENDED, this.playerConfig.customAutonext.onDownClick);
    }
    this.icon = this.find('.custom-auto-next-switcher')
    this.onIconClick = (e) => {
      // console.log('class为icon元素点击回调')
      if (this.playerConfig.customAutonext.isAutonext.current === true) {
        // 派发事件，将customIsAutonext暴露出去
        EventBus.dispatchEvent('clickCustomAutonext', { customIsAutonext: false });
      } else {
        // 派发事件，将customIsAutonext暴露出去
        EventBus.dispatchEvent('clickCustomAutonext', { customIsAutonext: true });
      }
    }
    this.onClick = () => {
      // console.log('当前插件根节点点击事件')
    }
    // 对当前插件根节点内部类名为.icon的元素绑定click事件
    this.bind('.custom-auto-next-switcher', 'click', this.onIconClick)
    // 对当前插件根节点绑定click事件
    this.bind('click', this.onClick)
    //TODO 插件实例化之后的一些逻辑
  }

  destroy() {
    this.unbind('.custom-auto-next-switcher', 'click', this.onIconClick)
    this.unbind('click', this.onClick)
    this.icon = null
    // 播放器销毁的时候一些逻辑
    //移除监听
    EventBus.removeEventListener('clickCustomAutonext', this.changeIcons)
  }

  render() {
    return `<div class="custom-autonext-plugin" style="margin-right: 16px;" >
    <div class="custom-auto-next">
    <div>自动连播</div>
    <div class="custom-auto-next-switcher">
      <div class="custom-auto-next-btn"></div>
    </div>
  </div>

    </div>`
  }
}
{/* <div class="custom-auto-next-switcher">
${this.playerConfig.customAutonext.isAutonext.current === true ?
`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="2 -4 28 40">\n  <path fill="#fff" transform="scale(0.0320625 0.0320625)" d="M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z"></path>\n</svg>\n` :
`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="2 -4 28 40">\n  <path fill="#fff" transform="scale(0.0320625 0.0320625)" d="M598 214h212v212h-84v-128h-128v-84zM726 726v-128h84v212h-212v-84h128zM214 426v-212h212v84h-128v128h-84zM298 598v128h128v84h-212v-212h84z"></path>\n</svg>\n`
}
</div> */}