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
      // 發票內品項
      invoiceItems: [],
      // 發票號碼
      invoiceNum: [],
      megCode: ''
    };
  },
  methods: {
    handleMouseDown: function(nextId) {
      // alert('>>> btn name:' + this.wording.toDetail);
      // alert('>>> nextId:' + nextId + '---' + kiosk.app.$data.lockBtn);
      if (!kiosk.app.$data.lockBtn) {
        // btn --- 開立
        if (this.wording.toSign === nextId) {
          kiosk.app.$data.lockBtn = true;

          //開立小額單
          const data = {
            passportNo: '108670735170',
            country: 'CN',
            inDate: '20190617',
            idn: '321102199612261047',
            ename: 'WHALEBRO',
            applyMainList: scanQRcode.transformItems()
          };

          // alert('>>> data.applyMainList.length:' + data.applyMainList.length);
          // alert('>>> data.applyMainList[0]:' + data.applyMainList[0].unvNo);

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
        } else {
          kiosk.API.goToNext(nextId);
        }
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
            scanQRcode.addInvNum(invNo);
            scanQRcode.number = scanQRcode.invoiceNum.length;
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

      this.invoiceNum.forEach(function(invoice) {
        if (invoice.invNo === invNo) {
          isValid = false;
          scanQRcode.megCode = 'scanQRErrorDup';
        }
      });

      return !isValid;
    },
    calcuAmt: function() {
      let sum = 0;
      const args = arguments;
      this.invoiceItems.forEach(function(invoice) {
        if (args.length === 0) {
          sum += invoice.unvAmt;
        } else {
          args[0] === invoice.invNo && (sum += invoice.unvAmt);
        }
      });

      return sum;
    },
    addInvNum: function(invNo) {
      // TODO 含稅金額
      this.invoiceNum.push({
        invNo: invNo,
        check: false,
        unitAmt: this.calcuAmt(invNo)
      });
    },
    addInvItem: function(res, invNo) {
      // alert('>>> 伺服器回傳資料:' + res.username);
      const scanQRcode = this;

      // 模擬回傳資料
      const invoiceData = {
        rows: [
          {
            invNo: invNo,
            cname: '筆電' + Math.random(),
            brand: 'ACER',
            model: 'ACER',
            unitAmt: 2000,
            qty: 2,
            unvAmt: 4000
          },
          {
            invNo: invNo,
            cname: '平板' + Math.random(),
            brand: 'APPLE',
            model: 'APPLE ipad air 3rd',
            unitAmt: 1000,
            qty: 3,
            unvAmt: 3000
          }
        ]
      };

      // add check property
      invoiceData.rows.forEach(function(invoiceItem) {
        // invoiceItem['check'] = false;
        // data
        scanQRcode.invoiceItems.push(invoiceItem);
      });
    },
    transformItems: function() {
      // console.log('>>> old data:', this.invoiceItems);
      return this.invoiceItems.map(function(item) {
        return {
          unvAmt: item.unvAmt,
          qty: item.qty,
          itemCname: item.cname,
          brandCname: item.brand,
          unvNo: item.invNo,
          modelCname: item.model
        };
      });
    },
    processInvoiceItem: function(invData) {
      let invNo = null;

      if (this.isFromQRCode(invData)) {
        invNo = invData.substr(0, 10) + invData.substr(17, 4);
        alert('>>> qrcode:' + invNo);
      } else {
        invNo = invData.substr(5, 14);
        alert('>>> barcode:' + invNo);
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
    this.invoiceNum = kiosk.app.$data.invoiceNum;
    this.number = this.invoiceNum.length;
    this.amount = this.calcuAmt();

    this.StartScanner();
  },
  beforeDestroy: function() {
    kiosk.app.$data.invoiceItems = this.invoiceItems;
    kiosk.app.$data.invoiceNum = this.invoiceNum;
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
