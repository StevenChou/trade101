//Body
Vue.component('component-scanPermit-main', {
  template: '#template-scanPermit-main',
  props: ['model', 'culture'],
  data: function() {
    return {
      megCode: 'putPermit',
      scanCount: 0,
      fixedCount: 5
    };
  },
  methods: {
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    },
    ScannerOpen: function() {
      kiosk.API.Device.Scanner.openScanner(
        function(res) {
          alert(JSON.stringify(res));
        },
        function() {}
      );
    },
    StartScanner: function() {
      this.scanCount++;
      alert('>>> 第 ' + this.scanCount + '次掃描入臺證');
      if (this.scanCount === this.fixedCount) {
        kiosk.API.goToNext('error');
        return;
      }

      const scanPermit = this;
      kiosk.API.Device.Scanner.startScanner('', function(res) {
        // if (res.match(/^[a-zA-Z]{2}[-]?[0-9]{8}/g)) {
        //   alert('QR code:' + res.substr(0, 10) + res.substr(17, 4));
        // } else {
        //   alert('Bar code:' + res.substr(5, 14));
        // }
        alert('>>> res:' + res);

        //查詢移民署
        const postData = {
          passportNo: res,
          country: 'CN'
        };

        alert('>>> postData:' + JSON.stringify(postData));
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
              alert('>>> api成功');
              // scanPassportObj.lock = true;

              scanPermit.megCode = 'passportCerted';

              // global data --- 儲存護照相關資訊
              scanPermit.storeUserData(jsonObj, resObj);

              scanPermit.megCode = 'permitCerting';
              setTimeout(function() {
                scanPermit.megCode = 'permitCerted';
                setTimeout(function() {
                  kiosk.API.goToNext(scanPermit.wording['toPreScanQR']);
                }, 1000);
              }, 1000);
            } else {
              alert('>>> help me!! gg');
              scanPermit.StartScanner();
            }
          },
          function() {}
        );
      });
    },
    storeUserData: function(passportObj, validationObj) {
      kiosk.app.$data.userData['passportNo'] = passportObj['documentNumber'];
      kiosk.app.$data.userData['country'] = passportObj['nationality'];
      kiosk.app.$data.userData['dayAmtTotal'] =
        validationObj.result['dayAmtTotal'];
    },
    StopScanner: function() {
      kiosk.API.Device.Scanner.stopScanner();
    },
    ScannerReset: function() {
      kiosk.API.Device.Scanner.resetScanner(
        function(res) {
          alert(JSON.stringify(res));
        },
        function() {}
      );
    },
    ScannerGetStatus: function() {
      kiosk.API.Device.Scanner.getStatus(
        function(res) {
          alert(JSON.stringify(res));
        },
        function() {}
      );
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].scanPermit;
    },
    infoData: function() {
      return this.megCode !== ''
        ? kiosk.wording[this.culture].scanPermit[this.megCode]
        : '';
    }
  },
  mounted: function() {
    // this.ScannerOpen();
    this.StartScanner();
  },
  beforeDestroy: function() {
    this.StopScanner();
    // this.ScannerReset();
  }
});

//Head
Vue.component('component-scanPermit-navBar', {
  props: ['culture', 'model'],
  template: '#template-common-navBar',
  data: function() {
    return {
      cssRightBtn: {
        class1: 'nav',
        class2: 'navbar-nav',
        class3: 'navbar-right'
      },
      cssLeftBtn: {
        class1: 'nav',
        class2: 'navbar-nav',
        class3: 'navbar-left'
      }
    };
  },
  methods: {
    backBtn: function() {
      kiosk.API.goToNext('selectDoc');
    },
    goHome: function() {
      kiosk.API.goToNext('mainMenu');
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].common;
    },
    navHomeBtn: function() {
      return {
        textHome__en: this.culture === 1 ? true : false,
        textHome__tw: this.culture === 2 ? true : false
      };
    },
    navBtnSize: function() {
      return {
        nav__bar__en: this.culture === 1 ? true : false,
        nav__bar__tw: this.culture === 2 ? true : false
      };
    }
  }
});
