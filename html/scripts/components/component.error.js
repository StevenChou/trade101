//Body
Vue.component('component-error-main', {
    template: '#template-error-main',
    props: ['model','culture'],
 

    methods: {
        // Btn Click
        goHome: function () {
            kiosk.API.goToNext('mainMenu');
        },

       
        
    },

    computed: {
        wording: function () {
            return kiosk.wording[this.culture].error;
        },
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