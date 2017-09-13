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
    let project=req.query.project;
    let spcode = req.query.spcode;
    let selectSql = "select * from flow_yidong_unikey where spcode='" + spcode + "' and dt='"+time+"'";
    pool.query(selectSql,  (error, results, fields) => {
        if (error) {
            console.log("Database access error while retrieve operator!");
            retrieve_resp.status = false;
            retrieve_resp.message = "Internal Error!";
            res.send(retrieve_resp);
        } else {
            let auto_save = {};
            if(results.length == 1 ){
                 auto_save = {
                    uv:results[0].uv,
                    '服务开通点击':results[0].clickServer,
                    '透传到':results[0].transmission,
                    '弹窗确认':results[0].confirmPop,
                    '验证码输错':results[0].idenCodeError,
                    '是否彩铃':results[0].isRing,
                    '是否彩铃错误':results[0].isRingError,
        
                    '非彩铃用户':results[0].unColorUser,
                    '非彩用户跳出':results[0].unColorOut,
                    '彩铃订购':results[0].ringOrder,
                    '彩铃取消支付':results[0].ringCancelPay,
                    '彩铃接口错误':results[0].ringInfError,
                    '彩铃取消支付后成功':results[0].ringCancelSuc,
                    '彩铃错误后成功':results[0].ringFailSuc,
                    '彩铃会员订购':results[0].ringMemOrder,
                    '彩铃会员取消':results[0].cancelMem,
                    '彩铃会员错误':results[0].ringMemError,
                    '彩铃会员短信二次确认':results[0].colrSmsConfirm,
                    '彩铃会员成功':results[0].ringMemSuc,
        
                    '彩铃用户':results[0].ringUser,
                    '老用户':results[0].regular,
                    '彩铃用户跳出':results[0].colorOut,
                    '真会员订购':results[0].memOrder,
                    '真会员取消支付':results[0].memPayCancel,
                    '真会员错误':results[0].memError,
                    '短信二次确认':results[0].smsSecond,
                    '会员取消支付成功':results[0].cancelPaySuc,
                    '会员错误后成功':results[0].memErrorSuc,
                    '会员会员成功':results[0].memOrderSuc,
                    '总成功':results[0].totolSuc
                }
            } 
            retrieve_resp.data.push(auto_save);
            res.send(retrieve_resp);
        }
    });
});

module.exports = router;
