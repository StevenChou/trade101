Vue.component("component-print-main", {
    template: '#template-print-main',
    props: ['culture'],
    // data: function () {
    //     $('body').attr('class', 'var1 thankyou');

        //// �C�L�y�k�A�ثe�S���������WThermal Print�A�ҥH�i�����
        //var printData = {
        //    id: 50041325,
        //    name: '���հӫ~�W��',
        //    price: 100
        //};

        //try {
        //    kiosk.API.Device.Thermal.PrintTemplatePage("digitalPin", printData);
        //} catch (e) {
        //    var msg = '';
        //    $.each(e, function (i, v) { msg += i + ':' + v + '\r\n'; });
        //}

    //     setTimeout(function () {
    //         kiosk.API.goToNext('mainMenu');
    //     }, 5000);

    //     return {};
    // },

    computed: {
        wording: function () {
            return kiosk.wording[this.culture].PrintPage;
        },
    }
});