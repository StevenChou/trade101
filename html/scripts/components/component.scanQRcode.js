Vue.component('component-scanQRcode-main', {
  template: '#template-scanQRcode-main',
  props: ['model', 'culture'],
  data: function() {
    return {
      //今日累積退稅金額
      refund: 0,
      //掃描發票的數量
      number: 0,
      //消費金額
      amount: 0,
      //退稅淨額
      netTaxRefund: 0,
      invoiceItems: [],
      megCode: ''
    };
  },
  methods: {
    handleMouseDown: function(nextId) {
      if (!kiosk.app.$data.lockBtn) {
        kiosk.app.$data.lockBtn = true;
        //開立小額單
        const data = {
          passportNo: '108670735170',
          country: 'CN',
          inDate: '20190617',
          idn: '321102199612261047',
          ename: 'WHALEBRO',
          applyMainList: [
            {
              unvAmt: '2000',
              qty: '1',
              itemCname: 'PY06180001',
              brandCname: 'PY06170001',
              unvNo: 'QG19603681',
              modelCname: '1'
            }
          ]
        };
        External.TradevanKioskCommon.CommonService.Apply(
          JSON.stringify(data),
          function(res) {
            const resObj = JSON.parse(res);
            alert(
              '>>> 回傳資訊:' +
                resObj.result['message'] +
                '---' +
                resObj.result['status']
            );

            if (resObj && resObj.result['status'] === '000') {
              kiosk.API.goToNext(nextId);
            } else {
              kiosk.app.$data.lockBtn = false;
              // for testing
              kiosk.API.goToNext(nextId);
            }
          },
          function() {}
        );
      }
    },
    getInvNoInfo: function(invNo) {
      const scanQRcode = this;
      this.megCode = 'scanQRcodeLoading';
      kiosk.app.$data.lockBtn = true;

      kiosk.app.axiosInstances.apTrade
        .get('/data.json', {
          params: {
            invNo: invNo
          }
        })
        .then(function(res) {
          if (scanQRcode.isValidInvItem(res.data, invNo)) {
            scanQRcode.addInvItem(res.data, invNo);
            scanQRcode.number = scanQRcode.invoiceItems.length;
            scanQRcode.amount = scanQRcode.calcuAmt();
          }
        })
        .catch(function(err) {
          Swal.fire({
            type: 'error',
            title: '糟糕...',
            text: '伺服器錯誤!',
            footer: '<a href>請通知客服~</a>'
          });
        })
        .finally(function() {
          if (scanQRcode.megCode === 'scanQRcodeLoading') {
            scanQRcode.megCode = '';
          }

          kiosk.app.$data.lockBtn = false;
          scanQRcode.StartScanner();
        });
    },
    isValidInvItem: function(res, invNo) {
      let isValid = true;
      isValid = isValid && this.isValidNo(invNo);
      isValid = isValid && !this.isDup(invNo);

      return isValid;
    },
    isFromQRCode: function(invData) {
      return invData.match(/^[a-zA-Z]{2}[-]?[0-9]{8}/g);
    },
    isValidNo: function(invNo) {
      return invNo === '' ? false : true;
    },
    isDup: function(invNo) {
      const scanQRcode = this;
      let isValid = true;

      this.invoiceItems.forEach(function(invoice) {
        if (invoice.invNo === invNo) {
          isValid = false;
          scanQRcode.megCode = 'scanQRErrorDup';
        }
      });

      return !isValid;
    },
    calcuAmt: function() {
      let sum = 0;
      this.invoiceItems.forEach(function(invoice) {
        sum += invoice.unvAmt;
      });

      return sum;
    },
    addInvItem: function(res, invNo) {
      // alert('>>> 伺服器回傳資料:' + res.username);
      const invoiceItem = {
        invNo: invNo,
        cname: '筆電' + Math.random(),
        brand: 'ACER',
        model: 'ACER',
        unitAmt: 2000,
        qty: 1,
        unvAmt: 4000
      };

      invoiceItem['check'] = false;
      this.invoiceItems.push(invoiceItem);
    },
    processInvoiceItem: function(invData) {
      let invNo = null;

      if (this.isFromQRCode(invData)) {
        invNo = invData.substr(0, 10) + invData.substr(17, 4);
      } else {
        invNo = invData.substr(5, 14);
      }

      // TODO: 隨機碼

      this.getInvNoInfo(invNo);
    },
    StartScanner: function() {
      const scanQRcode = this;

      kiosk.API.Device.Scanner.startScanner('', function(invData) {
        scanQRcode.processInvoiceItem(invData);
      });
    },
    StopScanner: function() {
      kiosk.API.Device.Scanner.stopScanner();
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].scanQRcode;
    },
    infoData: function() {
      return this.megCode !== ''
        ? kiosk.wording[this.culture].scanQRcode[this.megCode]
        : '';
    }
  },
  mounted: function() {
    this.invoiceItems = kiosk.app.$data.invoiceItems;
    this.number = this.invoiceItems.length;
    this.amount = this.calcuAmt();

    this.StartScanner();
  },
  beforeDestroy: function() {
    kiosk.app.$data.invoiceItems = this.invoiceItems;
    this.StopScanner();
  }
});

//Head
Vue.component('component-scanQRcode-navBar', {
  props: ['culture', 'model'],
  template: '#template-common-navBar',
  methods: {
    backBtn: function() {
      if (!kiosk.app.$data.lockBtn) {
        kiosk.API.goToNext('preScanQRcode');
      }
    },
    goHome: function() {
      if (!kiosk.app.$data.lockBtn) {
        kiosk.API.goToNext('mainMenu');
      }
    }
  }
});
