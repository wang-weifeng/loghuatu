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
    let selectSql = "select * from flow_cx where spcode='" + spcode + "' and dt='"+time+"'";
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
                    '彩铃验证弹窗': results[0].ringPop,
                    '点击下发验证码': results[0].clickSendCode,
                    '弹窗确认': results[0].confirmPop,
                    '是否四': results[0].isFour,
                    '是四': results[0].four,
                    '不是四': results[0].notFour,
                    '四弹窗': results[0].fourPop,
                    '四弹窗确定': results[0].fourPopConfirm,
                    '是否彩铃': results[0].isRing,
                    '成功下发验证码': results[0].sendCodeSuc,
                    '验证码输错': results[0].idenCodeError,
                    '开通接口错误': results[0].openInfError,
                    '下发失败': results[0].downFail,
                    '开彩铃加会员': results[0].openRingAndMem,
                    '老用户': results[0].regular,
                    '总成功': results[0].totolSuc
                }
            } 
            retrieve_resp.data.push(auto_save);
            res.send(retrieve_resp);
        }
    });
});

module.exports = router;
