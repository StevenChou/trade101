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
    doInterval: function() {
      const scanPassportObj = this;
      if (!scanPassportObj.lock) {
        // 護照掃描中...
        scanPassportObj.megCode = 'scanPassportLoading';
        kiosk.API.Device.MMM.GetData(
          function(res) {
            if (!scanPassportObj.lock) {
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

                //查詢移民署
                const postData = {
                  passportNo: jsonObj['documentNumber'],
                  country: jsonObj['nationality']
                };
                External.TradevanKioskCommon.CommonService.CallImm(
                  JSON.stringify(postData),
                  function(res) {
                    // alert('>>> json string:' + res);
                    const resObj = JSON.parse(res);
                    // alert(
                    //   '>>> 回傳資訊:' +
                    //     resObj.result['message'] +
                    //     '---' +
                    //     resObj.result['status']
                    // );

                    // succ
                    if (resObj && resObj.result['status'] === '000') {
                      // alert('>>> api成功');
                      scanPassportObj.lock = true;
                      scanPassportObj.megCode = 'passportCerted';

                      setTimeout(function() {
                        kiosk.API.goToNext(
                          scanPassportObj.wording['toPreScanQR']
                        );
                      }, 1500);
                    } else {
                      // alert('>>> 重新掃描');
                      // setTimeout(function() {
                      //   kiosk.API.goToNext(
                      //     scanPassportObj.wording['toPreScanQR']
                      //   );
                      // }, 1000);
                    }
                  },
                  function() {}
                );
              }
            }
          },
          function() {
            alert('關閉 passport !!');
          }
        );
      }
    },
    startPassportScan: function() {
      const scanPassportObj = this;
      this.doInterval();
      this.myInterval = setInterval(scanPassportObj.doInterval, 6000);
    },
    stopPassportScan: function() {
      kiosk.API.Device.MMM.StopGet(
        function(res) {
          alert('關閉護照機');
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
