Vue.component('component-remind-main', {
  template: '#template-remind-main',
  props: ['model', 'culture'],

  methods: {
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    }
  },

  computed: {
    wording: function() {
      return kiosk.wording[this.culture].remind;
    }
  }
});

// 表頭
Vue.component('component-remind-navBar', {
  props: ['culture', 'model'],
  template: '#template-common-navBar',
  methods: {
    backBtn: function() {
      kiosk.API.goToNext('mainMenu');
    },
    goHome: function() {
      kiosk.API.goToNext('mainMenu');
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].common;
    }
  }
});
