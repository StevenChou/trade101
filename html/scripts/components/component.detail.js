//Body
Vue.component('component-detail-main', {
  template: '#template-detail-main',
  props: ['model', 'culture'],

  data: function() {
    return {
      rows: []
    };
  },

  mounted: function() {
    kiosk.app.$data.isScrollDisable = false;
  },
  destroyed: function() {
    kiosk.app.$data.isScrollDisable = true;
  },

  methods: {
    // Btn Click
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    },
    handleItemMouseDown: function(index) {
      // alert('>>> index:' + index);
      this.rows[index].check = !this.rows[index].check;
    },
    handleItemDelete: function() {
      console.log('>>> clicked!!');
      this.rows = this.rows.filter(function(row) {
        return !row.check;
      });
    },
    hasCheckProperty: function() {
      let isValid = true;
      kiosk.app.$data.invoiceItems.forEach(function(invoice) {
        if (invoice.check === undefined) {
          isValid = false;
        }
      });

      return isValid;
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].detail;
    }
  },
  mounted: function() {
    console.log('>>>[mounted] detail');
    if (this.hasCheckProperty()) {
      this.rows = kiosk.app.$data.invoiceItems;
    } else {
      Swal.fire({
        type: 'error',
        title: '糟糕...',
        text: '發票格式錯誤!',
        footer: '<a href>請通知客服~</a>'
      });
    }
  },
  beforeDestroy: function() {
    console.log('>>>[beforeDestroy] detail');
    kiosk.app.$data.invoiceItems = this.rows;
  }
});
