//Body
Vue.component('component-success-main', {
  template: '#template-success-main',
  props: ['model', 'culture'],
  methods: {
    // Btn Click
    goHome: function() {
      kiosk.API.goToNext('mainMenu');
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].success;
    },
    btnFontSize: function() {
      let fontSize = null;
      switch (this.culture) {
        case 1:
          fontSize = 24;
          break;
        case 3:
          fontSize = 20;
          break;
        case 4:
          fontSize = 24;
          break;
        case 5:
          fontSize = 20;
          break;
        case 6:
          fontSize = 24;
          break;
        case 7:
          fontSize = 20;
          break;
        default:
          fontSize = 28;
      }

      return {
        fontSize: fontSize + 'px'
      };
    }
  }
});

//Head
// Vue.component('component-error-navBar', {
//     props: ['culture', 'model'],
//     template: '#template-common-navBar',
//     methods:{
//         backBtn: function () {
//             kiosk.API.goToNext('selectDoc');
//         }
//     }
// });

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
