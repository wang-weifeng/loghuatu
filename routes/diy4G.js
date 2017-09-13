var express = require('express');
var router = express.Router();
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
    let selectSql = "select * from flow_diy4g where spcode='" + spcode + "' and dt='"+time+"'";
    pool.query(selectSql,  (error, results, fields) => {
        if (error) {
            console.log("Database access error while retrieve operator!");
            retrieve_resp.status = false;
            retrieve_resp.message = "Internal Error!";
            res.send(retrieve_resp);
        } else {
            let auto_save = {};
            if(results.length == 1 ){
                auto_save={
                    '透传到':results[0].transmission,
                    '点击领取彩铃下载':results[0].clickDown,
                    '开通弹窗':results[0].openPop,
                    '弹窗确定':results[0].confirmPop,
                    '取消支付':results[0].cancelPay,
                    '跳出':results[0].loginOut,
                    '是否彩铃':results[0].isRing,
                    threeG:results[0].threeG,
                    '队列中':results[0].lining,
                    '开彩铃加会员':results[0].openRingAndMem,
                    '开会员':results[0].openMem,
                    '老用户':results[0].regular,
                    '总成功':results[0].totolSuc
                }
            } 
            retrieve_resp.data.push(auto_save);
            res.send(retrieve_resp);
        }
    });
});

module.exports = router;
