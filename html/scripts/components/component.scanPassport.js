//Body
Vue.component('component-scanPassport-main', {
    template: '#template-scanPassport-main',
    props: ['model','culture'],


    methods: {
        // Btn Click
        handleMouseDown: function (nextId) {
            kiosk.API.goToNext(nextId);
        },
        
    },

    computed: {
        wording: function () {
            return kiosk.wording[this.culture].scanPassport;
        },
    }
});

//Head
Vue.component('component-scanPassport-navBar', {
    props: ['culture', 'model'],
    template: '#template-common-navBar',
    methods:{
        backBtn: function () {
            kiosk.API.goToNext('selectDoc');
        },
        goHome: function () {
            kiosk.API.goToNext('mainMenu');
        },
    }
});