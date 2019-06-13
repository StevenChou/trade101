//Body
Vue.component('component-scanPassport-main', {
  template: '#template-scanPassport-main',
  props: ['model', 'culture'],
  data: function() {
    return {
      lock: false,
      myInterval: null,
      megCode: ''
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
          // 護照掃描中...
          scanPassportObj.megCode = 'scanPassportLoading';
          kiosk.API.Device.MMM.GetData(
            function(res) {
              const jsonObj = JSON.parse(res['jsonStr']);
              if (
                jsonObj['nationality'] !== '' &&
                jsonObj['documentNumber'] !== ''
              ) {
                // 資料驗證中...
                scanPassportObj.megCode = 'passportCerting';
                // alert(
                //   '掃描成功!! >>>nationality:' +
                //     jsonObj['nationality'] +
                //     '--->>>documentNumber' +
                //     jsonObj['documentNumber']
                // );

                scanPassportObj.lock = true;

                // 模擬 Ajax
                setTimeout(function() {
                  // TODO:資料驗證失敗... 請重新掃描
                  // TODO:成功自動導頁

                  // 驗證成功
                  scanPassportObj.megCode = 'passportCerted';

                  setTimeout(function() {
                    kiosk.API.goToNext(scanPassportObj.wording['toPreScanQR']);
                  }, 1000);
                }, 1000);
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
          // alert(JSON.stringify(res));
        },
        function() {}
      );
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].scanPassport;
    },
    infoData: function() {
      return this.megCode !== ''
        ? kiosk.wording[this.culture].scanPassport[this.megCode]
        : '';
    }
  },
  mounted: function() {
    this.startPassportScan();
  },
  beforeDestroy: function() {
    // alert('釋放資源!!');
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
