// MainPage
Vue.component('component-mainMenu-main', {
  props: ['model', 'culture'],
  template: '#template-mainMenu-main',
  data: function() {
    // Status �M��
    kiosk.API.initStatus();
    console.log('>>> culture:', this.culture);
    return {
      activeLang: this.culture
    };
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].mainMenu;
    }
  }
});

Vue.component('component-common-langmenu', {
  template: '#template-navbar-common-culture',
  props: ['culture'],
  data: function() {
    return {
      rows: [
        [
          {
            next: 'remind',
            culture: 'ZHTW',
            name: kiosk.wording[this.culture].mainMenu.lang01
          },
          {
            next: 'remind',
            culture: 'ZHCH',
            name: kiosk.wording[this.culture].mainMenu.lang13
          },
          {
            next: 'remind',
            culture: 'ENUS',
            name: kiosk.wording[this.culture].mainMenu.lang02
          },
          {
            next: 'remind',
            culture: 'JAJP',
            name: kiosk.wording[this.culture].mainMenu.lang03
          }
        ],
        [
          {
            next: 'remind',
            culture: 'KOKR',
            name: kiosk.wording[this.culture].mainMenu.lang04
          },
          {
            next: 'remind',
            culture: '777',
            name: kiosk.wording[this.culture].mainMenu.lang07
          },
          {
            next: 'remind',
            culture: '555',
            name: kiosk.wording[this.culture].mainMenu.lang05
          },
          {
            next: 'remind',
            culture: '666',
            name: kiosk.wording[this.culture].mainMenu.lang06
          }
        ],
        [
          {
            next: 'remind',
            culture: '999',
            name: kiosk.wording[this.culture].mainMenu.lang09
          },
          {
            next: 'remind',
            culture: '000',
            name: kiosk.wording[this.culture].mainMenu.lang10
          },
          {
            next: 'remind',
            culture: '888',
            name: kiosk.wording[this.culture].mainMenu.lang08
          }
        ]
      ]
    };
  },

  methods: {
    wording: function() {
      return kiosk.wording[this.culture].mainMenu;
    },
    changeCulture: function(el) {
      kiosk.API.changeCulture(kiosk.enum.culture[el]);
    },
    isActive: function(culture) {
      var result = this.culture == culture;
      return result;
    },
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    }
  },

  computed: {
    // wording: function() {
    //   return kiosk.wording[this.culture].mainMenu;
    // }
  }
});
