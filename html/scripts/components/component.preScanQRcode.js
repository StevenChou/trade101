//Body
Vue.component('component-preScanQRcode-main', {
  template: '#template-preScanQRcode-main',
  props: ['model', 'culture'],

  methods: {
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    }
  },

  computed: {
    wording: function() {
      return kiosk.wording[this.culture].preScanQRcode;
    }
  }
});

//Head
Vue.component('component-preScanQRcode-navBar', {
  props: ['culture', 'model'],
  template: '#template-common-navBar',
  methods: {
    backBtn: function() {
      kiosk.API.goToNext('selectDoc');
    },
    goHome: function() {
      kiosk.API.goToNext('mainMenu');
    }
  }
});

//ªí§À
// Vue.component("component-test001-foot", {
//     template: '#template-common-foot',
//     props: ['culture', 'model'],
//     methods: {
//         cancelBtn: function () {
//         },
//         getAccountInfo: function () {
//         },
//         goToConfirm: function () {
//         },
//         nextBtn: function () {
//         },
//         backBtn: function () {
//             kiosk.API.goToNext('mainMenu');
//         }
//     },
//     data: function () {
//         var _data = {
//             showNext: true,
//             showBack: true,
//             showCancel: false,
//             enableNext: true,
//             enableBack: true,
//             enableCancel: false,
//             event: {
//                 nextBtn: undefined,
//                 backBtn: undefined,
//             }
//         };

//         kiosk.status.footModel = _data;
//         return _data;
//     },

//     computed: {
//         disableNext: function () {
//             return !this.enableNext
//         },
//         disableBack: function () {
//             return !this.enableBack
//         },
//         disableCancel: function () {
//             return !this.enableCancel;
//         }
//     }
// });
