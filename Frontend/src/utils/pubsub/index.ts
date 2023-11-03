// 消息订阅与发布 简化版
// javascript提供了现成的api来发送自定义事件: CustomEvent

class EventBus {
  bus: HTMLElement;
  constructor() {
    this.bus = document.createElement('fakeelement');
  }

  addEventListener = (eventType: any, callback: any) => {
    this.bus.addEventListener(eventType, callback)
  }

  removeEventListener = (eventType: any, callback: any) => {
    this.bus.removeEventListener(eventType, callback)
  }

  dispatchEvent = (eventType: any, detail = {}) => {
    this.bus.dispatchEvent(new CustomEvent(eventType, { detail }));
  }
}

export default new EventBus();

// 不依赖浏览器提供的api
// const EventBus = () => {
//   const subscriptions = {};
//   this.subscribe = (eventType, callback) => {
//     const id = Symbol('id');
//     if (!subscriptions[eventType]) subscriptions[eventType] = {};
//     subscriptions[eventType][id] = callback;
//     return {
//       unsubscribe: () => {
//         delete subscriptions[eventType][id];
//         if (Object.getOwnPropertySymbols(subscriptions[eventType]).length === 0) {
//           delete subscriptions[eventType];
//         }
//       },
//     };
//   };

//   this.publish = (eventType, arg) => {
//     if (!subscriptions[eventType]) return;

//     Object.getOwnPropertySymbols(subscriptions[eventType])
//       .forEach(key => subscriptions[eventType][key](arg));
//   };
// }