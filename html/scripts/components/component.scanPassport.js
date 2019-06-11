//Body
Vue.component('component-scanPassport-main', {
  template: '#template-scanPassport-main',
  props: ['model', 'culture'],
  data: function() {
    return {
      lock: false,
      myInterval: null
    };
  },
  methods: {
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    },
    startPassportScan: function() {
      const scanPassportObj = this;

      this.myInterval = setInterval(function() {
        if (!scanPassportObj.lock) {
          kiosk.API.Device.MMM.GetData(
            function(res) {
              const jsonObj = JSON.parse(res['jsonStr']);
              if (jsonObj['nationality'] !== '' && jsonObj['documentNumber']) {
                alert(
                  '掃描成功!! >>>nationality:' +
                    jsonObj['nationality'] +
                    '--->>>documentNumber' +
                    jsonObj['documentNumber']
                );

                scanPassportObj.lock = true;
              }
            },
            function() {}
          );
        }
      }, 6000);
    },
    stopPassportScan: function() {
      kiosk.API.Device.MMM.StopGet(
        function(res) {
          alert(JSON.stringify(res));
        },
        function() {}
      );
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].scanPassport;
    }
  },
  mounted: function() {
    this.startPassportScan();
  },
  beforeDestroy: function() {
    alert('釋放資源!!');
    this.stopPassportScan();
    clearInterval(this.myInterval);
  }
});

//Head
Vue.component('component-scanPassport-navBar', {
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
