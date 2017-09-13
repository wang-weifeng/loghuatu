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
    let selectSql = "select * from flow_third_pay where spcode='" + spcode + "' and dt='"+time+"'";
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
                    uv: results[0].uv,
                    '彩铃验证弹窗': results[0].ringPoph,
                    '下发验证码': results[0].sendCode,
                    '尝试登入': results[0].tryLogin,
                    '验证码下发错误': results[0].sendCodeError,
                    '支付页面': results[0].payPage,
                    '拉起支付方式': results[0].payUp,
                    '选择50支付金额': results[0].selPay50,
                    '选择28支付金额': results[0].selPay28,
                    '选择15支付金额': results[0].selPay15,
                    '选择6支付金额': results[0].selPay6,
                    '支付宝页确定': results[0].confirmZfb,
                    '微信页确定': results[0].wechatPageConfirm,
                    '支付宝订购成功': results[0].zfbSuc,
                    '微信订购成功': results[0].wechatOrder,
                    '订购50': results[0].pay50,
                    '订购28': results[0].pay28,
                    '订购15': results[0].pay15,
                    '订购6': results[0].pay6,
                    '是否会员': results[0].isMember,
                    '跳出': results[0].loginOut,
                    '老用户': results[0].regular
                }
            } 
            retrieve_resp.data.push(auto_save);
            res.send(retrieve_resp);
        }
    });
});

module.exports = router;
