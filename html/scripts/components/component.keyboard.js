Vue.component('component-keyboard-main', {
  props: ['model', 'culture'],
  template: '#template-keyboard-main',
  data: function() {
    var _data = {
      keyinValue: ''
    };
    return _data;
  },
  methods: {
    keyin: function(e) {
      alert('>>>> key:' + e.target.innerHTML);
      switch (e.target.innerHTML) {
        //case 'SHIFT':
        //    this.toUpperCase = true;
        //    break;
        case '←':
          if (this.keyinValue) {
            this.keyinValue = this.keyinValue.slice(0, -1);
          }
          break;
        case 'Clear':
          this.keyinValue = '';
          break;
        default:
          this.keyinValue = this.keyinValue + '' + e.target.innerHTML;
          break;
      }
      kiosk.status.keyinValue = this.keyinValue;
    },
    spaceKeyin: function(e) {
      if (this.keyinValue) this.keyinValue = this.keyinValue + ' ';
    },
    handleMouseDown: function(action) {
      if (this.keyinValue === '52653760') {
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
    }
  },
  mounted: function() {
    kiosk.status.keyinValue = '';
    kiosk.status.CheckPassword = '';
  }
});
