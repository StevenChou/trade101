Vue.component('component-admin-main', {
  props: ['model', 'culture'],
  template: '#template-admin-main',
  data: function() {
    return {};
  },
  methods: {
    scanStart: function() {},
    btnAct: function(actType) {
      switch (actType) {
        case 'SCAN_START':
          kiosk.API.Device.Scanner.startScanner('', function(invData) {
            if (invData) {
              swal({
                title: '<h3>掃描器測試，成功!</h3>',
                text: '',
                type: 'success',
                customClass: 'swal-wide',
                confirmButtonText: '確定'
              });
            }
          });

          break;
        case 'SCAN_STOP':
          kiosk.API.Device.Scanner.stopScanner('', function() {
            swal({
              title: '<h3>掃描器關閉測試，成功!</h3>',
              text: '',
              type: 'success',
              customClass: 'swal-wide',
              confirmButtonText: '確定'
            });
          });

          break;
        case 'Clear':
          this.keyinValue = '';
          break;
        case 'space':
          this.keyinValue = this.keyinValue + ' ';
          break;
        default:
          this.keyinValue = this.keyinValue + '' + e;
          break;
      }
      kiosk.status.keyinValue = this.keyinValue;
    },
    spaceKeyin: function(e) {
      if (this.keyinValue) this.keyinValue = this.keyinValue + ' ';
    },
    handleMouseDown: function(action) {
      if (this.keyinValue === '01234567') {
        kiosk.API.goToNext('admin');
      } else {
        this.keyinValue = '';
        swal({
          title: '密碼錯誤！',
          text: '',
          type: 'error',
          confirmButtonText: '確定',
          allowOutsideClick: false
        });
      }
    },
    goHome: function() {
      kiosk.API.goToNext('mainMenu');
    }
  },
  mounted: function() {
    kiosk.status.keyinValue = '';
    kiosk.status.CheckPassword = '';
  }
});
