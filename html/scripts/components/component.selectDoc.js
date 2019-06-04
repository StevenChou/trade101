//Body
Vue.component('component-selectDoc-main', {
  template: '#template-selectDoc-main',
  props: ['model', 'culture'],

  methods: {
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    }
  },

  computed: {
    wording: function() {
      return kiosk.wording[this.culture].selectDoc;
    }
  }
});

//Head
Vue.component('component-selectDoc-navBar', {
  props: ['culture', 'model'],
  template: '#template-common-navBar',
  methods: {
    backBtn: function() {
      kiosk.API.goToNext('mainMenu');
    },
    goHome: function() {
      kiosk.API.goToNext('mainMenu');
    }
  }
});
