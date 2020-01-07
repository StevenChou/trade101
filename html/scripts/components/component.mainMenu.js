// MainPage
Vue.component('component-mainMenu-main', {
  props: ['model', 'culture'],
  template: '#template-mainMenu-main',
  data: function() {
    // 放這裡，有點怪吧!!
    // kiosk.API.initStatus();
    return {
      activeLang: this.culture,
      keyboardLock: {
        bottomLeftCount: 0,
        topRightCount: 0,
        keyboardLockOne: true,
        keyboardLockTwo: true
      },
      closingTimeList: {
        Sunday: { closingTime: '21:30:00' },
        Monday: { closingTime: '21:30:00' },
        Tuesday: { closingTime: '21:30:00' },
        Wednesday: { closingTime: '21:30:00' },
        Thursday: { closingTime: '21:30:00' },
        Friday: { closingTime: '22:00:00' },
        Saturday: { closingTime: '22:00:00' }
      },
      openingTime: '10:50:00', // 提前十分鐘開機 10:50:00
      closingTimer: null
    };
  },
  methods: {
    openKeyboardOne: function() {
      if (++this.keyboardLock.bottomLeftCount === 5) {
        alert('第一階段解鎖!!');
        this.keyboardLock.bottomLeftCount = 0;
        this.keyboardLock.keyboardLockOne = false;
      }
    },
    openKeyboardTwo: function() {
      if (++this.keyboardLock.topRightCount === 7) {
        alert('第二階段解鎖!!');
        this.keyboardLock.topRightCount = 0;
        this.keyboardLock.keyboardLockTwo = false;
      }

      if (
        !this.keyboardLock.keyboardLockOne &&
        !this.keyboardLock.keyboardLockTwo
      ) {
        kiosk.API.goToNext('keyboard');
      }
    },
    OpenSecondMonitor: function() {
      var data = {};
      External.TradevanKioskCommon.CommonService.CloseSecondMonitor(
        JSON.stringify(data),
        function(res) {
          var data = {};
          External.TradevanKioskCommon.CommonService.OpenSecondMonitor(
            JSON.stringify(data),
            function(res) {
              //alert(JSON.stringify(res));
            },
            function() {}
          );
        },
        function() {}
      );
    },
    toClosingPage: function(unitTestTime) {
      const mainMenuObj = this;

      // ＊＊＊ [ 設定 timer ---> 無限迴圈 ] ＊＊＊
      // 前十分鐘，導入到暫停營業畫面 (timer 每十秒，執行一次！！)
      mainMenuObj.closingTimer = setInterval(function() {
        const now = !unitTestTime ? new Date() : unitTestTime;
        const timeFormat = 'HH:mm:ss';
        const curDateTime = moment(now)
          .format('YYYY-MM-DD' + ',' + 'dddd' + ',' + timeFormat)
          .split(',');
        const baseTimeStr =
          mainMenuObj.closingTimeList[curDateTime[1]].closingTime;
        const curTime = moment(curDateTime[2], timeFormat).format(timeFormat);
        const baseTime = moment(baseTimeStr, timeFormat)
          .subtract(10, 'minutes')
          .format(timeFormat);

        // ＊＊＊ [ 時間小於當日 10:50:00 直接導入暫停營業頁面 ] ＊＊＊
        if (
          moment(curDateTime[0] + ' ' + curTime).isBefore(
            curDateTime[0] + ' ' + mainMenuObj.openingTime
          )
        ) {
          kiosk.API.goToNext('closingPage');
        }

        // ＊＊＊ [ 現在時間大於關閉時間 ] ＊＊＊
        if (
          moment(curDateTime[0] + ' ' + curTime).isAfter(
            curDateTime[0] + ' ' + baseTime
          )
        ) {
          kiosk.API.goToNext('closingPage');
        }
      }, 10000);
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].mainMenu;
    }
  },
  created: function() {
    // 改放這裡了!!
    kiosk.API.initStatus();
    kiosk.app.clearUserData();

    // 開啟第二螢幕
    //if (kiosk.app.getInitStatus()) {
    this.OpenSecondMonitor();
    //}

    // 導到暫停服務頁面！！
    this.toClosingPage();
    // [UnitTest]
    // this.toClosingPage(moment('2020-01-09 21:45:01', 'YYYY-MM-DD HH:mm:ss'));
  },
  beforeDestroy: function() {
    kiosk.app.setInitStatus(false);
    clearInterval(this.closingTimer);
  }
});

Vue.component('component-common-langmenu', {
  template: '#template-navbar-common-culture',
  props: ['culture'],
  data: function() {
    return {
      rows: [
        [
          {
            next: 'remind',
            culture: 'ZHTW',
            name: kiosk.wording[this.culture].mainMenu.lang02
          },
          {
            next: 'remind',
            culture: 'ZHCH',
            name: kiosk.wording[this.culture].mainMenu.lang13
          },
          {
            next: 'remind',
            culture: 'ENUS',
            name: kiosk.wording[this.culture].mainMenu.lang01
          },
          {
            next: 'remind',
            culture: 'JAJP',
            name: kiosk.wording[this.culture].mainMenu.lang03
          }
        ],
        [
          {
            next: 'remind',
            culture: 'KOKR',
            name: kiosk.wording[this.culture].mainMenu.lang04
          },
          {
            next: 'remind',
            culture: 'ESES',
            name: kiosk.wording[this.culture].mainMenu.lang07
          },
          {
            next: 'remind',
            culture: 'THTH',
            name: kiosk.wording[this.culture].mainMenu.lang05
          },
          {
            next: 'remind',
            culture: 'VIVN',
            name: kiosk.wording[this.culture].mainMenu.lang10
          }
        ]
        // [
        //   {
        //     next: 'remind',
        //     culture: '999',
        //     name: kiosk.wording[this.culture].mainMenu.lang09
        //   },
        //   {
        //     next: 'remind',
        //     culture: '000',
        //     name: kiosk.wording[this.culture].mainMenu.lang10
        //   },
        //   {
        //     next: 'remind',
        //     culture: '888',
        //     name: kiosk.wording[this.culture].mainMenu.lang08
        //   }
        // ]
      ]
    };
  },
  methods: {
    wording: function() {
      return kiosk.wording[this.culture].mainMenu;
    },
    changeCulture: function(el) {
      kiosk.API.changeCulture(kiosk.enum.culture[el]);
    },
    isActive: function(culture) {
      var result = this.culture == culture;
      return result;
    },
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    }
  },
  computed: {
    // wording: function() {
    //   return kiosk.wording[this.culture].mainMenu;
    // }
  }
});
