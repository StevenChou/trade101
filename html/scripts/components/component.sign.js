//Body
Vue.component('component-sign-main', {
  template: '#template-sign-main',
  props: ['model', 'culture'],
  data: function() {
    return {
      clickX: [],
      clickY: [],
      clickDrag: [],
      paint: false,
      context: null,
      point: {},
      timer: 59,
      myInterval: null,
      myCanvas: null
    };
  },
  methods: {
    handleMouseDown: function(nextId) {
      kiosk.API.goToNext(nextId);
    },
    clearCanvas: function() {
      this.myCanvas.width = this.myCanvas.width;
      // canvas.width = canvas.width;
    },
    sendData: function() {
      alert('sending data...');
      this.handleMouseDown(this.wording.toSuccess);
    },
    onDocumentTouchMove: function(event) {
      if (event.touches.length == 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX;
        mouseY = event.touches[0].pageY;
      }
    },
    addClick: function(x, y, dragging) {
      this.clickX.push(x);
      this.clickY.push(y);
      this.clickDrag.push(dragging);
    },
    redraw: function() {
      this.context.strokeStyle = '#df4b26';
      this.context.lineJoin = 'round';
      this.context.lineWidth = 2;
      while (this.clickX.length > 0) {
        this.point.bx = this.point.x;
        this.point.by = this.point.y;
        this.point.x = this.clickX.pop();
        this.point.y = this.clickY.pop();
        this.point.drag = this.clickDrag.pop();
        this.context.beginPath();
        if (this.point.drag && this.point.notFirst) {
          this.context.moveTo(this.point.bx, this.point.by);
        } else {
          this.point.notFirst = true;
          this.context.moveTo(this.point.x - 1, this.point.y);
        }
        this.context.lineTo(this.point.x, this.point.y);
        this.context.closePath();
        this.context.stroke();
      }
    },
    countdown: function() {
      this.myInterval = setInterval(
        function() {
          if (this.timer === 0) {
            this.timer = 59;
          } else {
            this.timer--;
          }
        }.bind(this),
        1000
      );
    }
  },
  computed: {
    wording: function() {
      return kiosk.wording[this.culture].sign;
    }
  },
  mounted: function() {
    console.log('>>> sign mounted:');
    var signComponent = this;
    var canvasDiv = document.getElementById('canvasDiv');
    var canvas = document.createElement('canvas');
    this.myCanvas = canvas;
    var screenwidth = window.innerWidth > 0 ? window.innerWidth : screen.width;

    // var canvasWidth = screenwidth;
    var canvasWidth = 1100;
    var canvasHeight = 320;
    document.addEventListener('touchmove', this.onDocumentTouchMove, false);

    this.point.notFirst = false;
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
      canvas = G_vmlCanvasManager.initElement(canvas);
    }
    this.context = canvas.getContext('2d');

    canvas.addEventListener('touchstart', function(e) {
      //console.log(e);
      var mouseX = e.touches[0].pageX - this.offsetLeft;
      var mouseY = e.touches[0].pageY - this.offsetTop;
      signComponent.paint = true;
      signComponent.addClick(
        e.touches[0].pageX - this.offsetLeft,
        e.touches[0].pageY - this.offsetTop
      );
      //console.log(e.touches[0].pageX - this.offsetLeft, e.touches[0].pageY - this.offsetTop);
      signComponent.redraw();
    });

    canvas.addEventListener('pointerdown', function(e) {
      // console.log('>>> pointerdown');
      var mouseX = e.pageX - this.offsetLeft;
      var mouseY = e.pageY - this.offsetTop;
      signComponent.paint = true;
      signComponent.addClick(
        e.pageX - this.offsetLeft,
        e.pageY - this.offsetTop
      );
      //console.log(e.touches[0].pageX - this.offsetLeft, e.touches[0].pageY - this.offsetTop);
      signComponent.redraw();
    });

    canvas.addEventListener('touchend', function(e) {
      // console.log('>>> touch end');
      signComponent.paint = false;
    });

    canvas.addEventListener('pointerup', function(e) {
      // console.log('>>> pointerup');
      signComponent.paint = false;
    });

    canvas.addEventListener(
      'touchmove',
      function(e) {
        // console.log('>>> touchmove');
        if (signComponent.paint) {
          //console.log("touchmove");
          addClick(
            e.touches[0].pageX - this.offsetLeft,
            e.touches[0].pageY - this.offsetTop,
            true
          );
          //console.log(e.touches[0].pageX - this.offsetLeft, e.touches[0].pageY - this.offsetTop);
          signComponent.redraw();
        }
      },
      { passive: false }
    );

    canvas.addEventListener(
      'pointermove',
      function(e) {
        // console.log('>>> pointermove', e);
        // console.log('>>> paint', signComponent.paint);
        if (signComponent.paint) {
          // console.log('>>> in touchmove');
          signComponent.addClick(
            e.pageX - this.offsetLeft,
            e.pageY - this.offsetTop,
            true
          );
          //console.log(e.touches[0].pageX - this.offsetLeft, e.touches[0].pageY - this.offsetTop);
          signComponent.redraw();
        }
      },
      { passive: false }
    );

    this.countdown();
  },
  created: function() {
    console.log('>>> sign created!!');
    kiosk.app.axiosInstances.ap101
      .get('/users.json')
      .then(function(res) {
        const users = [];
        for (let key in res.data) {
          const user = res.data[key];
          user.id = key;
          users.push(user);
          console.log('>>>[axios instance ap101] user:', user.email);
        }
      })
      .catch(function(err) {
        console.log('>>> error:', err);
      });
  },
  destroyed: function() {
    console.log('>>>sign destroyed!!');
    clearInterval(this.myInterval);
  }
});

//Head
Vue.component('component-sign-navBar', {
  props: ['culture', 'model'],
  template: '#template-common-navBar',
  methods: {
    backBtn: function() {
      kiosk.API.goToNext('scanQRcode');
    },
    goHome: function () {
        kiosk.API.goToNext('mainMenu');
    },
  }
});
