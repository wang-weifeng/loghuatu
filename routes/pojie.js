const express = require('express');
const router = express.Router();
const pool = require('../util/db');

router.get('/', (req, res, next) => {
    var retrieve_resp = {
        status: true,
        message: "ok",
        data: []
    }
    let time = req.query.time
    let time1 = req.query.time1
    let project = req.query.project;
    let spcode = req.query.spcode;
    let selectSql = "select * from flow_pojie where spcode='" + spcode + "' and dt >='" + time + "' and dt <'" + time1 + "'";
    console.log(selectSql);
    pool.query(selectSql, (error, results, fields) => {
        if (error) {
            console.log("Database access error while retrieve operator!");
            retrieve_resp.status = false;
            retrieve_resp.message = "Internal Error!";
            res.send(retrieve_resp);
        } else {
            let auto_save = {};
            let uv = 0;
            let ringPop = 0;
            let sendCode = 0;
            let confirmPop = 0;
            let idenCodeError = 0;
            let isRing = 0;
            let isRingError = 0;
            let unColorUser = 0;
            let unColorOut = 0;
            let ringOrder = 0;
            let ringCancelPay = 0;
            let ringInfError = 0;
            let ringCancelSuc = 0;
            let ringFailSuc = 0;
            let ringMemOrder = 0;
            let cancelMem = 0;
            let ringMemError = 0;
            let colrSmsConfirm = 0;
            let ringMemSuc = 0;
            let ringUser = 0;
            let regular = 0;
            let colorOut = 0;
            let memOrder = 0;
            let memPayCancel = 0;
            let memError = 0;
            let smsSecond = 0;
            let cancelPaySuc = 0;
            let memErrorSuc = 0;
            let memOrderSuc = 0;
            let totolSuc = 0;
            results.forEach(function (item, index) {
                uv = item.uv + uv;
                ringPop = item.ringPop + ringPop;
                sendCode = item.sendCode + sendCode;
                confirmPop = item.confirmPop + confirmPop;
                idenCodeError = item.idenCodeError + idenCodeError;
                isRing = item.isRing + isRing;
                isRingError = item.isRingError + isRingError;
                unColorUser = item.unColorUser + unColorUser;
                unColorOut = item.unColorOut + unColorOut;
                ringOrder = item.ringOrder + ringOrder;
                ringCancelPay = item.ringCancelPay + ringCancelPay;
                ringInfError = item.ringInfError + ringInfError;
                ringCancelSuc = item.ringCancelSuc + ringCancelSuc;
                ringFailSuc = item.ringFailSuc + ringFailSuc;
                ringMemOrder = item.ringMemOrder + ringMemOrder;
                cancelMem = item.cancelMem + cancelMem;
                ringMemError = item.ringMemError + ringMemError;
                colrSmsConfirm = item.colrSmsConfirm + colrSmsConfirm;
                ringMemSuc = item.ringMemSuc + ringMemSuc;
                ringUser = item.ringUser + ringUser;
                regular = item.regular + regular;
                colorOut = item.colorOut + colorOut;
                memOrder = item.memOrder + memOrder;
                memPayCancel = item.memPayCancel + memPayCancel;
                memError = item.memError + memError;
                smsSecond = item.smsSecond + smsSecond;
                cancelPaySuc = item.cancelPaySuc + cancelPaySuc;
                memErrorSuc = item.memErrorSuc + memErrorSuc;
                memOrderSuc = item.memOrderSuc + memOrderSuc;
                totolSuc = item.totolSuc + totolSuc
            });
            console.log(uv);
            console.log(cancelPaySuc);
            auto_save = {
                uv: uv,
                '彩铃验证弹窗': ringPop,
                '下发验证码': sendCode,
                '弹窗确认': confirmPop,
                '验证码输错': idenCodeError,
                '是否彩铃': isRing,
                '是否彩铃错误': isRingError,

                '非彩铃用户': unColorUser,
                '非彩用户跳出': unColorOut,
                '彩铃订购': ringOrder,
                '彩铃取消支付': ringCancelPay,
                '彩铃接口错误': ringInfError,
                '彩铃取消支付后成功': ringCancelSuc,
                '彩铃错误后成功': ringFailSuc,
                '彩铃会员订购': ringMemOrder,
                '彩铃会员取消': cancelMem,
                '彩铃会员错误': ringMemError,
                '彩铃会员短信二次确认': colrSmsConfirm,
                '彩铃会员成功': ringMemSuc,

                '彩铃用户': ringUser,
                '老用户': regular,
                '彩铃用户跳出': colorOut,
                '真会员订购': memOrder,
                '真会员取消支付': memPayCancel,
                '真会员错误': memError,
                '短信二次确认': smsSecond,
                '会员取消支付成功': cancelPaySuc,
                '会员错误后成功': memErrorSuc,
                '会员会员成功': memOrderSuc,
                '总成功': totolSuc
            }
            retrieve_resp.data.push(auto_save);
            res.send(retrieve_resp);
        }
    });
});

module.exports = router;
