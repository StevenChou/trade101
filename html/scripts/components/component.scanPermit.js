//Body
Vue.component('component-scanPermit-main', {
  template: '#template-scanPermit-main',
  props: ['model', 'culture'],
  data: function() {
    return {
      megCode: 'putPermit'
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
      const scanPermit = this;
      kiosk.API.Device.Scanner.startScanner('', function(res) {
        alert(JSON.stringify(res));
        if (res.match(/^[a-zA-Z]{2}[-]?[0-9]{8}/g)) {
          alert('QR code:' + res.substr(0, 10) + res.substr(17, 4));
        } else {
          alert('Bar code:' + res.substr(5, 14));
        }

        scanPermit.megCode = 'permitCerting';
        setTimeout(function() {
          scanPermit.megCode = 'permitCerted';
          setTimeout(function() {
            kiosk.API.goToNext(scanPermit.wording['toPreScanQR']);
          }, 1000);
        }, 1000);
      });
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
    }
  }
});
