Vue.component('component-scanQRcode-main', {
  template: '#template-scanQRcode-main',
  props: ['model', 'culture'],
  data: function() {
    return {
      //今日累積退稅金額
      refund: kiosk.app.$data.userData['dayAmtTotal'],
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
    // 千分位
    formatNumber: function(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    },
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
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
            applyMainList: this.transformItems()
          };

          // alert('>>> sendData:' + JSON.stringify(data));

          // [ TODO ] 沒有品項，lock btn!!

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

      return this.formatNumber(sum);
    },
    addInvNum: function(invNo) {
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

      const sendData = {
        rows: []
      };
      scanQRcode.invoiceItems.forEach(function(item) {
        sendData.rows.push(item);
      });
      // alert('>>> call c# refund:' + JSON.stringify(sendData));
      External.TradevanKioskCommon.CommonService.CalRefund(
        JSON.stringify(sendData),
        function(res) {
          // alert('>>> refundAmt:' + JSON.parse(res).result.refundAmt);
          scanQRcode.netTaxRefund = JSON.parse(res).result.refundAmt;
        },
        function() {}
      );
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
        // alert('>>> qrcode:' + invNo);
      } else {
        invNo = invData.substr(5, 14);
        // alert('>>> barcode:' + invNo);
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
    },
    taxRefund: function() {
      return this.netTaxRefund;
    },
    btnSize: function() {
      let fontSize = null;
      switch (this.culture) {
        case 3:
          fontSize = 40;
          break;
        case 5:
          fontSize = 40;
          break;
        case 7:
          fontSize = 36;
          break;
        case 10:
          fontSize = 36;
          break;
        default:
          fontSize = 48;
      }
      return {
        fontSize: fontSize + 'px'
      };
    },
    subTitle: function() {
      let fontSize = null;
      switch (this.culture) {
        case 3:
          fontSize = 26;
          break;
        case 5:
          fontSize = 26;
          break;
        case 6:
          fontSize = 26;
          break;
        case 7:
          fontSize = 22;
          break;
        default:
          fontSize = 32;
      }
      return {
        fontSize: fontSize + 'px'
      };
    },
    cultureFontStyle: function() {
      return kiosk.app.changeFontFamily(this.culture);
    }
  },
  mounted: function() {
    const scanQRcode = this;
    this.invoiceItems = kiosk.app.$data.invoiceItems;
    this.invoiceNum = kiosk.app.$data.invoiceNum;
    this.number = this.invoiceNum.length;
    this.amount = this.calcuAmt();

    const sendData = {
      rows: []
    };
    scanQRcode.invoiceItems.forEach(function(item) {
      sendData.rows.push(item);
    });
    External.TradevanKioskCommon.CommonService.CalRefund(
      JSON.stringify(sendData),
      function(res) {
        // alert('>>> refundAmt:' + JSON.parse(res).result.refundAmt);
        scanQRcode.netTaxRefund = JSON.parse(res).result.refundAmt;
      },
      function() {}
    );

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
      if (!kiosk.app.$data.lockBtn) {
        kiosk.API.goToNext('preScanQRcode');
      }
    },
    goHome: function() {
      if (!kiosk.app.$data.lockBtn) {
        kiosk.API.goToNext('mainMenu');
      }
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].common;
    },
    navHomeBtn: function() {
      return {
        textHome__en: this.culture === 1 ? true : false,
        textHome__tw: this.culture === 2 ? true : false,
        textHome__cn: this.culture === 13 ? true : false,
        textHome__jp: this.culture === 3 ? true : false,
        textHome__ko: this.culture === 4 ? true : false,
        textHome__es: this.culture === 7 ? true : false,
        textHome__th: this.culture === 5 ? true : false,
        textHome__vi: this.culture === 10 ? true : false
      };
    },
    navBtnSize: function() {
      return {
        nav__bar__en: this.culture === 1 ? true : false,
        nav__bar__tw: this.culture === 2 ? true : false,
        nav__bar__cn: this.culture === 13 ? true : false,
        nav__bar__jp: this.culture === 3 ? true : false,
        nav__bar__ko: this.culture === 4 ? true : false,
        nav__bar__es: this.culture === 7 ? true : false,
        nav__bar__th: this.culture === 5 ? true : false,
        nav__bar__vi: this.culture === 10 ? true : false
      };
    },
    cultureFontStyle: function() {
      return kiosk.app.changeFontFamily(this.culture);
    }
  }
});
