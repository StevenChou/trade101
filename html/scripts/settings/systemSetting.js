﻿var kiosk = kiosk || {};
(function () {
    kiosk.enum = kiosk.enum || {};
    kiosk.enum.WorkType = {
        SendRequest: 1,
        PostRequest: 2,
        ResetDevice: 3,
        ResetConnection: 4
    };
    kiosk.enum.ScannerAction = {
        Close: 0,
        Open: 1,
        Reset: 3,
        ScanningBarCode: 4,
        ScanningBitMap: 5
    };
    kiosk.enum.ThermalAction = {
        Open: 1,
        Reset: 2,
        CutPaper: 3,
        Close: 4,
        PrintText: 5,
        PrintBitmap: 6,
        PrintBarCode: 7,
        PrintQRCode: 8,
        CheckNearEnd: 9,
        GetReviceStatus: 10,
        TransactionPrint: 11,
        Rotation: 12,
        PrintTemplatePage: 13
    };
    kiosk.enum.culture = {
        'ENUS': 1,
        'ZHTW': 2,
        'ZHCH': 13,
        'JAJP': 3,
        'KOKR': 4,
        '555': 5,
        '666': 6,
        'ESES': 7,
        '888': 8,
        '999': 9,
        '000': 10,
    };
    returnCulture = {
        1: "en",
        2: "zh_TW",
        13:'zh_CN',
        3: "jp",
        4: "ko",
        5: "555",
        6: "666",
        7: "es",
        8: "888",
        9: "999",
        10: "000",
    };
    kiosk.wording = {
        //英文
        1: {
            common: {
                indexPage: 'Homepage',
                prePage: 'Back'
            },
            mainMenu: {
                mainMenuTitle1: "欢迎使用自助退税服务，请选择语言",
                mainMenuTitle2: "Welcome to Tax Refund Application Kiosk",
                mainMenuTitle3: "Please select language to start",
                lang01: '繁體中文',
                lang13: '简体中文',
                lang02: 'English',
                lang03: '日本語',
                lang04: '한국어',
                lang05: 'ไทย',
                lang06: 'हिन्दी',
                lang07: 'Español',
                lang08: 'Le français',
                lang09: 'русский',
                lang10: 'Tiếng việt',
            },
            remind: {
                remindTitle1: 'Reminder!',
                remindTitle2: 'Please be sure you attain tax refund application form before leaving.',
                remindTitle3: 'Please prepare your travel document (passport / exist & entry permit) and your invoices issued by Taipei 101 Mall for tax refund application, then click "Start."',
                btTitle: 'Start',
                toSelectDoc: 'selectDoc',
            },
            selectDoc: {
                selectTitle: 'Select the travel document used for your entry into Taiwan this trip.',
                passport: 'Passport',
                permit: 'Exit & Entry Permit',
                toScanPassport: 'scanPassport',
                toScanPermit: 'scanPermit',
            },
            scanPassport: {
                scanPassportTitle: 'Please scan your passport.',
                scanError: 'Recognition error, please scan your passport again.',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
                scanPassportLoading: '護照掃描中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                passportCerting: '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                passportCerted: '<div style="margin-top: 10px;">驗證成功</div>'
            },
            scanPermit: {
                scanPermitTitle: 'Please scan barcode of your exit & entry permit.',
                scanError: 'Recognition error, please scan barcode of your exit & entry permit again.',
                toError: 'error',
                toPreScanQR: 'preScanQRcode', 
                putPermit: '請放置入臺證',
                permitCerting: '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                permitCerted: '<div style="margin-top: 10px;">驗證成功</div>'
            },
            error: {
                errorTitle: 'en請攜帶您的身分資料及發票至服務中心101號櫃台，',
                errorTitle2: 'en將有專人為您服務，謝謝',
                toHomeText: 'en回服務首頁',
            },
            preScanQRcode: {
                preScanQRcodeTitle: 'Prepare to scan your invoices issued by Taipei  101 Mall.',
                btScanQRcode: 'Start',
                toScanQR: 'scanQRcode',
            },
            scanQRcode: {
                scanQRcodeTitle1: 'Please scan barcode in your invoices.',

                scanQRcodeTitle2: 'Applied Tax Refund Amount Today',
                scanQRcodeTitle4: ' ',

                scanQRcodeTitle5: 'Scanned Invoices',
                scanQRcodeTitle6: 'Subtotal Amount',
                scanQRcodeTitle7: 'Net Tax Refund',

                scanQRcodeTitle8: '&nbsp;',
                scanQRcodeTitle9: 'NTD',
                scanQRcodeTitle10: 'NTD',

                scanQRcodeTitle14: 'Detail',
                scanQRcodeTitle15: 'Confirm',

                scanQRError1: 'This invoice is ineligible for tax refund application in Taipei 101 Mall，<br>please scan next invoice.',
                scanQRError2: 'please scan next invoice.',
                scanQRErrorDup: '發票重複輸入，<br>please scan next invoice.',
                scanQRcodeLoading: '資料查詢中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                toDetail: 'detail',
                toSign: 'sign',
            },
            detail: {
                detailTitle1: 'You have scanned the following invoices',
                detailTitle2: 'Scroll down to see more',
                detailTitle3: 'Invoice No.：',
                detailTitle4: 'en品名/型號：',
                detailTitle5: 'en單價/數量：',
                detailTitle6: 'Amount (Incl. Tax)：',
                btDetail1: 'Confirm',
                btDetail2: 'Delete selected invoices',
                toScanQR: 'scanQRcode',
            },
            sign: {
                signTitle1: 'Please sign in below space.',
                signTitle2: ' Sec.',
                btSign1: 'Clear',
                btSign2: 'Confirm',
                toSuccess: 'success',
            },
            success: {
                successTitle1: 'en申請成功，明細表列印中，請稍後！',
                successTitle2: 'en小額退稅者請持明細表至服務櫃檯領取退稅款現金。',
                successTitle3: 'en大額退稅請至出境機場/港口領取您的退稅款，',
                successTitle4: 'en或洽101館內市區特約退稅櫃檯。',
                toHomeText: 'en服務首頁',
            },
        },

        // 繁體中文
        2: {
            common: {
                indexPage: '首頁',
                prePage: '上一頁'
            },
            mainMenu: {
                mainMenuTitle1: "欢迎使用自助退税服务，请选择语言",
                mainMenuTitle2: "Welcome to tax refund self-service kiosk",
                mainMenuTitle3: "Please select language",
                lang01: '繁體中文',
                lang13: '简体中文',
                lang02: 'English',
                lang03: '日本語',
                lang04: '한국어',
                lang05: 'ไทย',
                lang06: 'हिन्दी',
                lang07: 'Español',
                lang08: 'Le français',
                lang09: 'русский',
                lang10: 'Tiếng việt',
            },
            remind: {
                remindTitle1: '提醒您',
                remindTitle2: '離開退稅機前請務必取得退稅表單',
                remindTitle3: '請準備好您的正本入境文件(護照/入臺證)及購物發票開始辦理退稅',
                btTitle: '確認，開始退稅',
                toSelectDoc: 'selectDoc'
            },
            selectDoc: {
                selectTitle: '請選擇本次入境臺灣所使用證件',
                passport: '護照',
                permit: '入出境許可證',
                toScanPassport: 'scanPassport',
                toScanPermit: 'scanPermit'
            },
            scanPassport: {
                scanPassportTitle: '請掃描您的護照',
                scanError: '無法辨識，請重新掃描護照',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
                scanPassportLoading: '護照掃描中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                passportCerting:'資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                passportCerted:'<div style="margin-top: 10px;">驗證成功</div>'
            },
            scanPermit: {
                scanPermitTitle: '請掃描您的入臺證條碼',
                scanError: '無法辨識，請重新掃描入臺證',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
                putPermit:'請放置入臺證',
                permitCerting: '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                permitCerted: '<div style="margin-top: 10px;">驗證成功</div>'
            },
            error: {
                errorTitle: '請攜帶您的身分資料及發票至服務中心101號櫃台，',
                errorTitle2: '將有專人為您服務，謝謝',
                toHomeText: '回服務首頁',
            },
            preScanQRcode: {
                preScanQRcodeTitle: '準備掃描購物發票明細條碼',
                btScanQRcode: '開始掃描',
                toScanQR: 'scanQRcode',
            },
            scanQRcode: {
                scanQRcodeTitle1: '請掃描您的購物發票明細條碼',

                scanQRcodeTitle2: '您今日已辦理退稅',
                scanQRcodeTitle4: '元',

                scanQRcodeTitle5: '發票掃描',
                scanQRcodeTitle6: '消費金額',
                scanQRcodeTitle7: '退稅淨額',

                scanQRcodeTitle8: '張',
                scanQRcodeTitle9: '新台幣',
                scanQRcodeTitle10: '新台幣',

                scanQRcodeTitle14: '詳細資訊',
                scanQRcodeTitle15: '確認',

                scanQRError1: '此發票明細無法退稅，<br>請掃描下一張',
                scanQRError2: '請掃描下一張',
                scanQRErrorDup:'發票重複輸入，<br>請掃描下一張',
                scanQRcodeLoading: '資料查詢中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                toDetail: 'detail',
                toSign: 'sign',                
            },
            detail: {
                detailTitle1: '您已輸入的購物發票',
                detailTitle2: '上下滑動看更多',
                detailTitle3: '發票號碼：',
                detailTitle4: '品名/型號：',
                detailTitle5: '單價/數量：',
                detailTitle6: '含稅金額：',
                btDetail1: '確認，回上一頁',
                btDetail2: '刪除勾選發票',
                toScanQR: 'scanQRcode',
            },
            sign: {
                signTitle1: '請於下方欄位簽名',
                signTitle2: ' 秒',
                btSign1: '清除簽名',
                btSign2: '確認簽名',
                toSuccess: 'success',
            },
            success: {
                successTitle1: '申請成功，明細表列印中，請稍後！',
                successTitle2: '小額退稅者請持明細表至服務櫃檯領取退稅款現金。',
                successTitle3: '大額退稅請至出境機場/港口領取您的退稅款，',
                successTitle4: '或洽101館內市區特約退稅櫃檯。',
                toHomeText: '回服務首頁',
            },
        },
        // 簡體中文
        13: {
            common: {
                indexPage: '首页',
                prePage: '上一页'
            },
            mainMenu: {
                mainMenuTitle1: "欢迎使用自助退税服务，请选择语言",
                mainMenuTitle2: "Welcome to tax refund self-service kiosk",
                mainMenuTitle3: "Please select language",
                lang01: '繁體中文',
                lang13: '简体中文',
                lang02: 'English',
                lang03: '日本語',
                lang04: '한국어',
                lang05: 'ไทย',
                lang06: 'हिन्दी',
                lang07: 'Español',
                lang08: 'Le français',
                lang09: 'русский',
                lang10: 'Tiếng việt',
            },
            remind: {
                remindTitle1: '提醒您',
                remindTitle2: '离开退税机前请务必取得退税表单',
                remindTitle3: '请准备好您的正本入境文件(护照/入台证)及购物发票开始办理退税',
                btTitle: '确认，开始退税',
                toSelectDoc: 'selectDoc'
            },
            selectDoc: {
                selectTitle: '请选择本次入境台湾所使用证件',
                passport: '护照',
                permit: '入出境许可证 (入台证)',
                toScanPassport: 'scanPassport',
                toScanPermit: 'scanPermit'
            },
            scanPassport: {
                scanPassportTitle: '请扫描您的护照',
                scanError: '无法辨识，请重新扫描护照',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
                scanPassportLoading: '護照掃描中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                passportCerting: '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                passportCerted: '<div style="margin-top: 10px;">驗證成功</div>'
            },
            scanPermit: {
                scanPermitTitle: '请扫描您的入台证条码',
                scanError: '无法辨识，请重新扫描入台证',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
                putPermit: '請放置入臺證',
                permitCerting: '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                permitCerted: '<div style="margin-top: 10px;">驗證成功</div>'
            },
            error: {
                errorTitle: '請攜帶您的身分資料及發票至服務中心101號櫃台，',
                errorTitle2: '將有專人為您服務，謝謝',
                toHomeText: '回服務首頁',
            },
            preScanQRcode: {
                preScanQRcodeTitle: '准备扫描购物发票明细条码',
                btScanQRcode: '开始扫描',
                toScanQR: 'scanQRcode',
            },
            scanQRcode: {
                scanQRcodeTitle1: '请扫描您的购物发票明细条码',

                scanQRcodeTitle2: '您今日已办理退税',
                scanQRcodeTitle4: '元',

                scanQRcodeTitle5: '发票扫描',
                scanQRcodeTitle6: '消费金额',
                scanQRcodeTitle7: '退税净额',

                scanQRcodeTitle8: '张',
                scanQRcodeTitle9: '新台币',
                scanQRcodeTitle10: '新台币',

                scanQRcodeTitle14: '详细资讯',
                scanQRcodeTitle15: '确认',

                scanQRError1: '此发票明细无法退税，<br>请扫描下一张',
                scanQRError2: '请扫描下一张',
                scanQRErrorDup: '發票重複輸入，<br>请扫描下一张',
                scanQRcodeLoading: '資料查詢中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                toDetail: 'detail',
                toSign: 'sign',
            },
            detail: {
                detailTitle1: '您已输入的购物发票',
                detailTitle2: '上下滑动看更多',
                detailTitle3: '发票号码：',
                detailTitle4: '品名/型號：',
                detailTitle5: '單價/數量：',
                detailTitle6: '含税金额：',
                btDetail1: '确认，回上一页',
                btDetail2: '删除勾选发票',
                toScanQR: 'scanQRcode',
            },
            sign: {
                signTitle1: '请於下方栏位签名',
                signTitle2: ' 秒',
                btSign1: '清除签名',
                btSign2: '确认签名',
                toSuccess: 'success',
            },
            success: {
                successTitle1: '申請成功，明細表列印中，請稍後！',
                successTitle2: '小額退稅者請持明細表至服務櫃檯領取退稅款現金。',
                successTitle3: '大額退稅請至出境機場/港口領取您的退稅款，',
                successTitle4: '或洽101館內市區特約退稅櫃檯。',
                toHomeText: '回服务首页',
            },
        },

        //日文
        3: {
            common: {
                indexPage: 'ホーム画面',
                prePage: '前の画面に戻る'
            },
            mainMenu: {
                mainMenuTitle1: "欢迎使用自助退税服务，请选择语言",
                mainMenuTitle2: "Welcome to tax refund self-service kiosk",
                mainMenuTitle3: "Please select language",
                lang01: '繁體中文',
                lang13: '简体中文',
                lang02: 'English',
                lang03: '日本語',
                lang04: '한국어',
                lang05: 'ไทย',
                lang06: 'हिन्दी',
                lang07: 'Español',
                lang08: 'Le français',
                lang09: 'русский',
                lang10: 'Tiếng việt',
            },
            remind: {
                remindTitle1: '',
                remindTitle2: '税金還付機の前を離れる前に必ず税金還付明細書をお受け取りください',
                remindTitle3: '税金還付手続きを始める前に、ご自身の入国証明書類(パスポートまたは台湾出入国許可証)と商品購入レシートの原本をご用意ください',
                btTitle: '確認完了、税金還付手続きを開始する',
                toSelectDoc: 'selectDoc'
            },
            selectDoc: {
                selectTitle: '今回台湾に入国する際に使用した証明書類を選択してください',
                passport: 'パスポート',
                permit: '出入国許可証',
                toScanPassport: 'scanPassport',
                toScanPermit: 'scanPermit'
            },
            scanPassport: {
                scanPassportTitle: 'あなたのパスポートをスキャンしてください',
                scanError: '認識できませんでしたもう一度パスポートをスキャンしてください',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
                scanPassportLoading: '護照掃描中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                passportCerting: '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                passportCerted: '<div style="margin-top: 10px;">驗證成功</div>'
            },
            scanPermit: {
                scanPermitTitle: '台湾出入国許可証のバーコードをスキャンしてください',
                scanError: '認識できませんでした。もう一度、台湾出入国許可証をスキャンしてください',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
                putPermit: '請放置入臺證',
                permitCerting: '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                permitCerted: '<div style="margin-top: 10px;">驗證成功</div>'
            },
            error: {
                errorTitle: '請攜帶您的身分資料及發票至服務中心101號櫃台，',
                errorTitle2: '將有專人為您服務，謝謝',
                toHomeText: '回服務首頁',
            },
            preScanQRcode: {
                preScanQRcodeTitle: '商品購入レシートのQRコードをスキャンする準備をしてください',
                btScanQRcode: 'スキャン開始',
                toScanQR: 'scanQRcode',
            },
            scanQRcode: {
                scanQRcodeTitle1: '商品購入レシートのQRコードをスキャンしてください',

                scanQRcodeTitle2: 'あなたが今日税金還付手続きをした金額は',
                scanQRcodeTitle4: '元です',

                scanQRcodeTitle5: 'スキャンしたレシート',
                scanQRcodeTitle6: '消費金額',
                scanQRcodeTitle7: '税金実質還付金額',

                scanQRcodeTitle8: '枚',
                scanQRcodeTitle9: '新台湾ドル',
                scanQRcodeTitle10: '新台湾ドル',

                scanQRcodeTitle14: '詳細内容',
                scanQRcodeTitle15: '確認完了',

                scanQRError1: 'このレシートの内容は税金還付手続きができません<br>次のレシートをスキャンしてください',
                scanQRError2: '請掃描下一張',
                scanQRErrorDup: '發票重複輸入，<br>請掃描下一張',
                scanQRcodeLoading: '資料查詢中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                toDetail: 'detail',
                toSign: 'sign',
            },
            detail: {
                detailTitle1: 'あなたが入力した商品購入レシート',
                detailTitle2: '上下にスクロールしてもっと見る',
                detailTitle3: 'レシート番号：',
                detailTitle4: '品名/型號：',
                detailTitle5: '單價/數量：',
                detailTitle6: '税込み金額：',
                btDetail1: '確認完了、前の画面に戻る',
                btDetail2: 'チェックを入れたレシートを削除する',
                toScanQR: 'scanQRcode',
            },
            sign: {
                signTitle1: '請於下方欄位簽名',
                signTitle2: ' 秒',
                btSign1: '署名をクリアする',
                btSign2: '署名を確定する',
                toSuccess: 'success',
            },
            success: {
                successTitle1: '申請成功，明細表列印中，請稍後！',
                successTitle2: '小額退稅者請持明細表至服務櫃檯領取退稅款現金。',
                successTitle3: '大額退稅請至出境機場/港口領取您的退稅款，',
                successTitle4: '或洽101館內市區特約退稅櫃檯。',
                toHomeText: 'サービスのホーム画面に戻る',
            },
        },

        //韓文
        4: {
            common: {
                indexPage: '홈',
                prePage: '이전'
            },
            mainMenu: {
                mainMenuTitle1: "欢迎使用自助退税服务，请选择语言",
                mainMenuTitle2: "Welcome to tax refund self-service kiosk",
                mainMenuTitle3: "Please select language",
                lang01: '繁體中文',
                lang13: '简体中文',
                lang02: 'English',
                lang03: '日本語',
                lang04: '한국어',
                lang05: 'ไทย',
                lang06: 'हिन्दी',
                lang07: 'Español',
                lang08: 'Le français',
                lang09: 'русский',
                lang10: 'Tiếng việt',
            },
            remind: {
                remindTitle1: '',
                remindTitle2: '주의 : 세금환급기를 떠나기 전에 반드시 세금환급증을 받으십시오.',
                remindTitle3: '귀하의 입국서류 원본(여권/타이완 입국증) 및 쇼핑 영수증을 준비하고 세금환급 절차를 시작하십시오.',
                btTitle: '확인, 세금환급 시작',
                toSelectDoc: 'selectDoc'
            },
            selectDoc: {
                selectTitle: '이번 타이완 입국 시에 사용하신 증명서를 선택하세요',
                passport: '여권',
                permit: '출입국 허가증',
                toScanPassport: 'scanPassport',
                toScanPermit: 'scanPermit'
            },
            scanPassport: {
                scanPassportTitle: '여권을 스캔하세요',
                scanError: '인식할 수 없습니다. 여권을 다시 스캔하세요',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
                scanPassportLoading: '護照掃描中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                passportCerting: '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                passportCerted: '<div style="margin-top: 10px;">驗證成功</div>'
            },
            scanPermit: {
                scanPermitTitle: '타이완 입국증 바코드를 스캔하세요',
                scanError: '인식할 수 없습니다. 타이완 입국증을 다시 스캔하세요',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
                putPermit: '請放置入臺證',
                permitCerting: '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                permitCerted: '<div style="margin-top: 10px;">驗證成功</div>'
            },
            error: {
                errorTitle: '請攜帶您的身分資料及發票至服務中心101號櫃台，',
                errorTitle2: '將有專人為您服務，謝謝',
                toHomeText: '回服務首頁',
            },
            preScanQRcode: {
                preScanQRcodeTitle: '쇼핑 영수증 명세 바코드 스캔 준비',
                btScanQRcode: '스캔 시작',
                toScanQR: 'scanQRcode',
            },
            scanQRcode: {
                scanQRcodeTitle1: '쇼핑 영수증 명세 바코드를 스캔하세요',

                scanQRcodeTitle2: '금일 NT$ ',
                scanQRcodeTitle4: '이 환급 처리되었습니다',

                scanQRcodeTitle5: '영수증 스캔',
                scanQRcodeTitle6: '소비금액',
                scanQRcodeTitle7: '순 환급금',

                scanQRcodeTitle8: '장',
                scanQRcodeTitle9: 'NT$',
                scanQRcodeTitle10: 'NT$',

                scanQRcodeTitle14: '상세정보',
                scanQRcodeTitle15: '확인',

                scanQRError1: '세금을 환급할 수 없는 영수증 명세입니다.<br>다음 장을 스캔하세요',
                scanQRError2: '다음 장을 스캔하세요',
                scanQRErrorDup: '發票重複輸入，<br>다음 장을 스캔하세요',
                scanQRcodeLoading: '資料查詢中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                toDetail: 'detail',
                toSign: 'sign',
            },
            detail: {
                detailTitle1: '이미 입력하신 쇼핑 영수증입니다',
                detailTitle2: '더 보려면 위아래로 스와이프 하세요',
                detailTitle3: '영수증번호：',
                detailTitle4: '品名/型號：',
                detailTitle5: '單價/數量：',
                detailTitle6: '세금 포함 금액：',
                btDetail1: '확인, 이전',
                btDetail2: '영수증 체크 표시 삭제',
                toScanQR: 'scanQRcode',
            },
            sign: {
                signTitle1: '아래 칸에 서명하세요',
                signTitle2: ' 초',
                btSign1: '서명 지우기',
                btSign2: '서명 확인',
                toSuccess: 'success',
            },
            success: {
                successTitle1: '申請成功，明細表列印中，請稍後！',
                successTitle2: '小額退稅者請持明細表至服務櫃檯領取退稅款現金。',
                successTitle3: '大額退稅請至出境機場/港口領取您的退稅款，',
                successTitle4: '或洽101館內市區特約退稅櫃檯。',
                toHomeText: '홈으로 돌아가기',
            },
        },

        ///////////////////////////
        // 
        5: {
            mainMenu: {
                mainMenuTitle1: "歡迎使用自助退稅服務，請選擇語言",
                mainMenuTitle2: "Welcome to tax refund self-service kiosk.",
                mainMenuTitle3: "Please select language",

                lang01: '中文',
                lang02: 'English',
                lang03: '日本語',
                lang04: '한국어',
                lang05: 'ไทย',
                lang06: 'हिन्दी',
                lang07: 'Español',
                lang08: 'Le français',
                lang09: 'русский',
                lang10: 'Tiếng việt',
            },
            remind: {
                remindTitle1: '提醒您',
                remindTitle2: 'en離開退稅機前務必取得退稅表單',
                remindTitle3: 'en請準備好您的護照/入臺證、購物發票開始辦理退稅',
                btTitle: '確認，開始退稅',
                toSelectDoc: 'selectDoc',
            },
            selectDoc: {
                selectTitle: 'Select your ID document used to enter Taiwan during this trip',
                passport: 'Passport',
                permit: 'Exit and Entry Permit',
                toScanPassport: 'scanPassport',
                toScanPermit: 'scanPermit',
            },
            scanPassport: {
                scanPassportTitle: 'Please scan your passport',
                scanError: 'Scan error, please try again',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
            },
            scanPermit: {
                scanPermitTitle: 'Please scan your permit',
                scanError: 'Scan error, please try again',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
            },
            error: {
                errorTitle: 'en請攜帶您的身分資料及發票至服務中心101號櫃台，',
                errorTitle2: 'en將有專人為您服務，謝謝',
                toHomeText: 'en回服務首頁',
            },
            preScanQRcode: {
                preScanQRcodeTitle: 'Prepare to scan QR Code within your invoices',
                btScanQRcode: 'Start scan',
                toScanQR: 'scanQRcode',
            },
            scanQRcode: {
                scanQRcodeTitle1: 'Please scan QR Code within your invoices',

                scanQRcodeTitle2: '您今日已辦理退稅',
                scanQRcodeTitle3: '245',
                scanQRcodeTitle4: '元',

                scanQRcodeTitle5: '發票掃描',
                scanQRcodeTitle6: '消費金額',
                scanQRcodeTitle7: '退稅淨額',

                scanQRcodeTitle8: '張',
                scanQRcodeTitle9: '新台幣',
                scanQRcodeTitle10: '新台幣',
                scanQRcodeTitle11: '1',
                scanQRcodeTitle12: '1,000,000',
                scanQRcodeTitle13: '19,047',

                scanQRcodeTitle14: '詳細資訊',
                scanQRcodeTitle15: '確認',

                scanQRError1: 'en非本日發票無法申請退稅，',
                scanQRError2: 'en請掃描下一張發票',
                toDetail: 'detail',
                toSign: 'sign',
            },
            detail: {
                detailTitle1: 'You have scanned below invoices',
                detailTitle2: '上下滑動看更多',
                detailTitle3: 'en發票號碼：MT 57302841',
                detailTitle4: 'en品名/型號：',
                detailTitle5: 'en單價/數量：',
                detailTitle6: 'en含稅金額：',
                btDetail1: '確認，回上一頁',
                btDetail2: '刪除',
                toScanQR: 'scanQRcode',
            },
            sign: {
                signTitle1: 'Please sign in the below space',
                signTitle2: ' sec.',
                btSign1: '清除簽名',
                btSign2: '確認簽名',
                toSuccess: 'success',
            },
            success: {
                successTitle1: 'en申請成功，明細表列印中，請稍後！',
                successTitle2: 'en小額退稅者請持明細表至服務櫃檯領取退稅款現金。',
                successTitle3: 'en大額退稅請至出境機場/港口領取您的退稅款，',
                successTitle4: 'en或洽101館內市區特約退稅櫃檯。',
                toHomeText: '한국어服務首頁',
            },
        },

        6: {
            mainMenu: {
                mainMenuTitle1: "歡迎使用自助退稅服務，請選擇語言",
                mainMenuTitle2: "Welcome to tax refund self-service kiosk.",
                mainMenuTitle3: "Please select language",

                lang01: '中文',
                lang02: 'English',
                lang03: '日本語',
                lang04: '한국어',
                lang05: 'ไทย',
                lang06: 'हिन्दी',
                lang07: 'Español',
                lang08: 'Le français',
                lang09: 'русский',
                lang10: 'Tiếng việt',
            },
            remind: {
                remindTitle1: '提醒您',
                remindTitle2: '離開退稅機前務必取得退稅表單',
                remindTitle3: '請準備好您的護照/入臺證、購物發票開始辦理退稅',
                btTitle: '確認，開始退稅',
                toSelectDoc: 'selectDoc',
            },
            selectDoc: {
                selectTitle: '請選擇本次入境臺灣所使用證照',
                passport: '護照',
                permit: '入出境許可證',
                toScanPassport: 'scanPassport',
                toScanPermit: 'scanPermit',
            },
            scanPassport: {
                scanPassportTitle: '請掃描您的護照',
                scanError: '掃描錯誤，請重新操作',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
            },
            scanPermit: {
                scanPermitTitle: '請掃描您的入臺證條碼',
                scanError: '掃描錯誤，請重新操作',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
            },
            error: {
                errorTitle: '請攜帶您的身分資料及發票至服務中心101號櫃台，',
                errorTitle2: '將有專人為您服務，謝謝',
                toHomeText: '回服務首頁',
            },
            preScanQRcode: {
                preScanQRcodeTitle: '準備掃描購物發票QR Code',
                btScanQRcode: '開始掃描',
                toScanQR: 'scanQRcode',
            },
            scanQRcode: {
                scanQRcodeTitle: '請掃描您的購物發票',

                scanQRcodeTitle2: '您今日已辦理退稅',
                scanQRcodeTitle3: '245',
                scanQRcodeTitle4: '元',

                scanQRcodeTitle5: '發票掃描',
                scanQRcodeTitle6: '消費金額',
                scanQRcodeTitle7: '退稅淨額',

                scanQRcodeTitle8: '張',
                scanQRcodeTitle9: '新台幣',
                scanQRcodeTitle10: '新台幣',
                scanQRcodeTitle11: '1',
                scanQRcodeTitle12: '1,000,000',
                scanQRcodeTitle13: '19,047',

                scanQRcodeTitle14: '詳細資訊',
                scanQRcodeTitle15: '確認',

                scanQRError1: '非本日發票無法申請退稅，',
                scanQRError2: '請掃描下一張發票',
                toDetail: 'detail',
                toSign: 'sign',
            },
            detail: {
                detailTitle1: '您已輸入的購物發票',
                detailTitle2: '上下滑動看更多',
                detailTitle3: '發票號碼：MT 57302841',
                detailTitle4: '品名/型號：',
                detailTitle5: '單價/數量：',
                detailTitle6: '含稅金額：',
                btDetail1: '確認，回上一頁',
                btDetail2: '刪除',
                toScanQR: 'scanQRcode',
            },
            sign: {
                signTitle1: '請於下方欄位簽名',
                signTitle2: '59 秒',
                btSign1: '清除簽名',
                btSign2: '確認簽名',
                toSuccess: 'success',
            },
            success: {
                successTitle1: '申請成功，明細表列印中，請稍後！',
                successTitle2: '小額退稅者請持明細表至服務櫃檯領取退稅款現金。',
                successTitle3: '大額退稅請至出境機場/港口領取您的退稅款，',
                successTitle4: '或洽101館內市區特約退稅櫃檯。',
                toHomeText: '한국어服務首頁',
            },
        },
        // 西班牙語系
        7: {
            common: {
                indexPage: 'Página principal',
                prePage: 'Página anterior'
            },
            mainMenu: {
                mainMenuTitle1: "欢迎使用自助退税服务，请选择语言",
                mainMenuTitle2: "Welcome to tax refund self-service kiosk",
                mainMenuTitle3: "Please select language",
                lang01: '繁體中文',
                lang13: '简体中文',
                lang02: 'English',
                lang03: '日本語',
                lang04: '한국어',
                lang05: 'ไทย',
                lang06: 'हिन्दी',
                lang07: 'Español',
                lang08: 'Le français',
                lang09: 'русский',
                lang10: 'Tiếng việt',
            },
            remind: {
                remindTitle1: '',
                remindTitle2: 'Le recordamos que antes de abandonar la máquina de devolución de impuestos debe recoger la factura de devolución',
                remindTitle3: 'Tenga a mano su documento original de entrada al país (pasaporte/certificado de entrada a Taiwán) y la factura de compra para iniciar la devolución de impuestos',
                btTitle: 'Confirmar inicio de devolución de impuestos',
                toSelectDoc: 'selectDoc'
            },
            selectDoc: {
                selectTitle: 'Seleccione el tipo de documento con el que ha entrado en Taiwán',
                passport: 'Pasaporte',
                permit: 'Permiso de entrada y salida',
                toScanPassport: 'scanPassport',
                toScanPermit: 'scanPermit'
            },
            scanPassport: {
                scanPassportTitle: 'Escanee su pasaporte',
                scanError: 'Fallo de reconocimiento. Vuelva a escanear su pasaporte.',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
                scanPassportLoading: '護照掃描中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                passportCerting: '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                passportCerted: '<div style="margin-top: 10px;">驗證成功</div>'
            },
            scanPermit: {
                scanPermitTitle: 'Escanee el código de barras de su certificado de entrada a Taiwán',
                scanError: 'Fallo de reconocimiento. Vuelva a escanear su certificado de entrada a Taiwán.',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
                putPermit: '請放置入臺證',
                permitCerting: '資料驗證中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                permitCerted: '<div style="margin-top: 10px;">驗證成功</div>'
            },
            error: {
                errorTitle: '請攜帶您的身分資料及發票至服務中心101號櫃台，',
                errorTitle2: '將有專人為您服務，謝謝',
                toHomeText: '回服務首頁',
            },
            preScanQRcode: {
                preScanQRcodeTitle: 'Prepare escaneado de código de barras de la factura de compra',
                btScanQRcode: 'Iniciar escaneado',
                toScanQR: 'scanQRcode',
            },
            scanQRcode: {
                scanQRcodeTitle1: 'Escanee el código de barras de su factura de compra',

                scanQRcodeTitle2: 'Hoy ha tramitado ',
                scanQRcodeTitle4: ' TWD en devolución de impuestos',

                scanQRcodeTitle5: 'Escaneado de factura',
                scanQRcodeTitle6: 'Cantidad',
                scanQRcodeTitle7: 'Devolución neta de impuestos',

                scanQRcodeTitle8: 'Factura',
                scanQRcodeTitle9: 'Nuevo Dólar taiwanés',
                scanQRcodeTitle10: 'Nuevo Dólar taiwanés',

                scanQRcodeTitle14: 'Información detallada',
                scanQRcodeTitle15: 'Confimar',

                scanQRError1: 'No se pueden devolver los impuestos de esta factura.<br>Escanee la siguiente factura',
                scanQRError2: 'Escanee la siguiente factura',
                scanQRErrorDup: '發票重複輸入，<br>Escanee la siguiente factura',
                scanQRcodeLoading: '資料查詢中<div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div>',
                toDetail: 'detail',
                toSign: 'sign',
            },
            detail: {
                detailTitle1: 'Facturas de compra que ya ha introducido',
                detailTitle2: 'Deslizar arriba y abajo para ver más información',
                detailTitle3: 'Número de factura：',
                detailTitle4: '品名/型號：',
                detailTitle5: '單價/數量：',
                detailTitle6: 'Cantidad con impuestos：',
                btDetail1: 'Confirmar y regresar a la página anterior',
                btDetail2: 'Borrar factura seleccionada',
                toScanQR: 'scanQRcode',
            },
            sign: {
                signTitle1: 'Firme en el espacio de la parte inferior',
                signTitle2: ' Segundos',
                btSign1: 'Borrar firmar',
                btSign2: 'Confirmar firma',
                toSuccess: 'success',
            },
            success: {
                successTitle1: '申請成功，明細表列印中，請稍後！',
                successTitle2: '小額退稅者請持明細表至服務櫃檯領取退稅款現金。',
                successTitle3: '大額退稅請至出境機場/港口領取您的退稅款，',
                successTitle4: '或洽101館內市區特約退稅櫃檯。',
                toHomeText: 'Regresar a la página principal del servicio',
            },
        },

        8: {
            mainMenu: {
                mainMenuTitle1: "歡迎使用自助退稅服務，請選擇語言",
                mainMenuTitle2: "Welcome to tax refund self-service kiosk.",
                mainMenuTitle3: "Please select language",

                lang01: '中文',
                lang02: 'English',
                lang03: '日本語',
                lang04: '한국어',
                lang05: 'ไทย',
                lang06: 'हिन्दी',
                lang07: 'Español',
                lang08: 'Le français',
                lang09: 'русский',
                lang10: 'Tiếng việt',
            },
            remind: {
                remindTitle1: '한국어提醒您',
                remindTitle2: '한국어離開退稅機前務必取得退稅表單',
                remindTitle3: '한국어請準備好您的護照/入臺證、購物發票開始辦理退稅',
                btTitle: '한국어開始退稅',
                toSelectDoc: 'selectDoc',
            },
            selectDoc: {
                selectTitle: '한국어請選擇本次入境臺灣所使用證照',
                passport: '한국어護照',
                permit: '한국어許可證',
                toScanPassport: 'scanPassport',
                toScanPermit: 'scanPermit',
            },
            scanPassport: {
                scanPassportTitle: '한국어請掃描您的護照',
                scanError: '한국어掃描錯誤，請重新操作',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
            },
            scanPermit: {
                scanPermitTitle: '한국어請掃描您的入臺證條碼',
                scanError: '한국어掃描錯誤，請重新操作',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
            },
            error: {
                errorTitle: '한국어的身分資料及發票至服務中心101號櫃台，',
                errorTitle2: '한국어將有專人為您服務，謝謝',
                toHomeText: '한국어服務首頁',
            },
            preScanQRcode: {
                preScanQRcodeTitle: '한국어準備掃描購物發票QR Code',
                btScanQRcode: '한국어開始掃描',
                toScanQR: 'scanQRcode',
            },
            scanQRcode: {
                scanQRcodeTitle: '한국어請掃描您的購物發票',

                scanQRcodeTitle2: '한국어您今日已辦理退稅',
                scanQRcodeTitle3: '245',
                scanQRcodeTitle4: '元',

                scanQRcodeTitle5: '發票掃描',
                scanQRcodeTitle6: '消費金額',
                scanQRcodeTitle7: '退稅淨額',

                scanQRcodeTitle8: '張',
                scanQRcodeTitle9: '新台幣',
                scanQRcodeTitle10: '新台幣',
                scanQRcodeTitle11: '1',
                scanQRcodeTitle12: '1,000,000',
                scanQRcodeTitle13: '19,047',

                scanQRcodeTitle14: '詳細資訊',
                scanQRcodeTitle15: '確認',

                scanQRError1: '한국어非本日發票無法申請退稅，',
                scanQRError2: '請掃描下一張發票',
                toDetail: 'detail',
                toSign: 'sign',
            },
            detail: {
                detailTitle1: '한국어您已輸入的購物發票',
                detailTitle2: '上下滑動看更多',
                detailTitle3: '한국어發票號碼：MT 57302841',
                detailTitle4: '한국어品名/型號：',
                detailTitle5: '한국어單價/數量：',
                detailTitle6: '한국어含稅金額：',
                btDetail1: '確認，回上一頁',
                btDetail2: '刪除',
                toScanQR: 'scanQRcode',
            },
            sign: {
                signTitle1: '한국어請於下方欄位簽名',
                signTitle2: ' 秒',
                btSign1: '清除簽名',
                btSign2: '確認簽名',
                toSuccess: 'success',
            },
            success: {
                successTitle1: '한국어申請成功，明細表列印中，請稍後！',
                successTitle2: '小額退稅者請持明細表至服務櫃檯領取退稅款現金。',
                successTitle3: '大額退稅請至出境機場/港口領取您的退稅款，',
                successTitle4: '或洽101館內市區特約退稅櫃檯。',
                toHomeText: '한국어服務首頁',
            },
        },

        9: {
            mainMenu: {
                mainMenuTitle1: "歡迎使用自助退稅服務，請選擇語言",
                mainMenuTitle2: "Welcome to tax refund self-service kiosk.",
                mainMenuTitle3: "Please select language",

                lang01: '中文',
                lang02: 'English',
                lang03: '日本語',
                lang04: '한국어',
                lang05: 'ไทย',
                lang06: 'हिन्दी',
                lang07: 'Español',
                lang08: 'Le français',
                lang09: 'русский',
                lang10: 'Tiếng việt',
            },
            remind: {
                remindTitle1: 'にほんご提醒您',
                remindTitle2: 'にほんご離開退稅機前務必取得退稅表單',
                remindTitle3: 'にほんご請準備好您的護照/入臺證、購物發票開始辦理退稅',
                btTitle: 'にほんご開始退稅',
                toSelectDoc: 'selectDoc',
            },
            selectDoc: {
                selectTitle: 'にほんご請選擇本次入境臺灣所使用證照',
                passport: 'にほんご護照',
                permit: 'にほんご許可證',
                toScanPassport: 'scanPassport',
                toScanPermit: 'scanPermit',
            },
            scanPassport: {
                scanPassportTitle: 'にほんご請掃描您的護照',
                scanError: 'にほんご掃描錯誤，請重新操作',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
            },
            scanPermit: {
                scanPermitTitle: 'にほんご請掃描您的入臺證條碼',
                scanError: 'にほんご掃描錯誤，請重新操作',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
            },
            error: {
                errorTitle: 'にほんご請攜帶您的身分資料及發票至服務中心101號櫃台，',
                errorTitle2: 'にほんご將有專人為您服務，謝謝',
                toHomeText: 'にほんご首頁',
            },
            preScanQRcode: {
                preScanQRcodeTitle: 'にほんご準備掃描購物發票QR Code',
                btScanQRcode: 'にほんご開始掃描',
                toScanQR: 'scanQRcode',
            },
            scanQRcode: {
                scanQRcodeTitle: 'にほんご請掃描您的購物發票',

                scanQRcodeTitle2: '您今日已辦理退稅',
                scanQRcodeTitle3: '245',
                scanQRcodeTitle4: '元',

                scanQRcodeTitle5: '發票掃描',
                scanQRcodeTitle6: '消費金額',
                scanQRcodeTitle7: '退稅淨額',

                scanQRcodeTitle8: '張',
                scanQRcodeTitle9: '新台幣',
                scanQRcodeTitle10: '新台幣',
                scanQRcodeTitle11: '1',
                scanQRcodeTitle12: '1,000,000',
                scanQRcodeTitle13: '19,047',

                scanQRcodeTitle14: '詳細資訊',
                scanQRcodeTitle15: '確認',

                scanQRError1: 'にほんご非本日發票無法申請退稅，',
                scanQRError2: 'にほんご請掃描下一張發票',
                toDetail: 'detail',
                toSign: 'sign',
            },
            detail: {
                detailTitle1: 'にほんご您已輸入的購物發票',
                detailTitle2: '上下滑動看更多',
                detailTitle3: 'にほんご：MT 57302841',
                detailTitle4: 'にほんご品名/型號：',
                detailTitle5: 'にほんご單價/數量：',
                detailTitle6: 'にほんご含稅金額：',
                btDetail1: '確認，回上一頁',
                btDetail2: '刪除',
                toScanQR: 'scanQRcode',
            },
            sign: {
                signTitle1: 'にほんご請於下方欄位簽名',
                signTitle2: ' にほんご',
                btSign1: '清除簽名',
                btSign2: '確認簽名',
                toSuccess: 'success',
            },
            success: {
                successTitle1: 'にほんご，明細表列印中，請稍後！',
                successTitle2: 'にほんご者請持明細表至服務櫃檯領取退稅款現金。',
                successTitle3: 'にほんご請至出境機場/港口領取您的退稅款，',
                successTitle4: 'にほんご館內市區特約退稅櫃檯。',
                toHomeText: '한국어服務首頁',
            },
        },

        10: {
            mainMenu: {
                mainMenuTitle1: "歡迎使用自助退稅服務，請選擇語言",
                mainMenuTitle2: "Welcome to tax refund self-service kiosk.",
                mainMenuTitle3: "Please select language",

                lang01: '中文',
                lang02: 'English',
                lang03: '日本語',
                lang04: '한국어',
                lang05: 'ไทย',
                lang06: 'हिन्दी',
                lang07: 'Español',
                lang08: 'Le français',
                lang09: 'русский',
                lang10: 'Tiếng việt',
            },
            remind: {
                remindTitle1: '한국어提醒您',
                remindTitle2: '한국어離開退稅機前務必取得退稅表單',
                remindTitle3: '한국어請準備好您的護照/入臺證、購物發票開始辦理退稅',
                btTitle: '한국어開始退稅',
                toSelectDoc: 'selectDoc',
            },
            selectDoc: {
                selectTitle: '한국어請選擇本次入境臺灣所使用證照',
                passport: '한국어護照',
                permit: '한국어許可證',
                toScanPassport: 'scanPassport',
                toScanPermit: 'scanPermit',
            },
            scanPassport: {
                scanPassportTitle: '한국어請掃描您的護照',
                scanError: '한국어掃描錯誤，請重新操作',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
            },
            scanPermit: {
                scanPermitTitle: '한국어請掃描您的入臺證條碼',
                scanError: '한국어掃描錯誤，請重新操作',
                toError: 'error',
                toPreScanQR: 'preScanQRcode',
            },
            error: {
                errorTitle: '한국어的身分資料及發票至服務中心101號櫃台，',
                errorTitle2: '한국어將有專人為您服務，謝謝',
                toHomeText: '한국어服務首頁',
            },
            preScanQRcode: {
                preScanQRcodeTitle: '한국어準備掃描購物發票QR Code',
                btScanQRcode: '한국어開始掃描',
                toScanQR: 'scanQRcode',
            },
            scanQRcode: {
                scanQRcodeTitle: '한국어請掃描您的購物發票',

                scanQRcodeTitle2: '한국어您今日已辦理退稅',
                scanQRcodeTitle3: '245',
                scanQRcodeTitle4: '元',

                scanQRcodeTitle5: '發票掃描',
                scanQRcodeTitle6: '消費金額',
                scanQRcodeTitle7: '退稅淨額',

                scanQRcodeTitle8: '張',
                scanQRcodeTitle9: '新台幣',
                scanQRcodeTitle10: '新台幣',
                scanQRcodeTitle11: '1',
                scanQRcodeTitle12: '1,000,000',
                scanQRcodeTitle13: '19,047',

                scanQRcodeTitle14: '詳細資訊',
                scanQRcodeTitle15: '確認',

                scanQRError1: '한국어非本日發票無法申請退稅，',
                scanQRError2: '請掃描下一張發票',
                toDetail: 'detail',
                toSign: 'sign',
            },
            detail: {
                detailTitle1: '한국어您已輸入的購物發票',
                detailTitle2: '上下滑動看更多',
                detailTitle3: '한국어發票號碼：MT 57302841',
                detailTitle4: '한국어品名/型號：',
                detailTitle5: '한국어單價/數量：',
                detailTitle6: '한국어含稅金額：',
                btDetail1: '確認，回上一頁',
                btDetail2: '刪除',
                toScanQR: 'scanQRcode',
            },
            sign: {
                signTitle1: '한국어請於下方欄位簽名',
                signTitle2: ' 秒',
                btSign1: '清除簽名',
                btSign2: '確認簽名',
                toSuccess: 'success',
            },
            success: {
                successTitle1: '한국어申請成功，明細表列印中，請稍後！',
                successTitle2: '小額退稅者請持明細表至服務櫃檯領取退稅款現金。',
                successTitle3: '大額退稅請至出境機場/港口領取您的退稅款，',
                successTitle4: '或洽101館內市區特約退稅櫃檯。',
                toHomeText: '한국어服務首頁',
            },
        },
    };

    kiosk.cultureMap = {
        'en-US': kiosk.enum.culture.ENUS,
        'zh-TW': kiosk.enum.culture.ZHTW,
        'ja-JP': kiosk.enum.culture.JAJP,
        'ko-KR': kiosk.enum.culture.KOKR,
        'zh-CN': kiosk.enum.culture.ZHCN,
        1: 'en-US',
        2: 'zh-TW',
        3: 'ja-rJP',
        4: 'ko-rKR',
        5: 'zh-rCN',
    };
    kiosk.cultureArry = [1, 2, 3, 4, 5];

    kiosk.secondMideaType = 'Video';
})();
