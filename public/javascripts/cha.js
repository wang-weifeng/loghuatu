var cha = {};

cha.init = function(){
    cha.bindEvent();
    cha.rendsiteTime();
};

cha.bindEvent = function(){
    $("#submit").on('click',function(){
        var spcode = $("#datetimepicker1").val(); 
        var time = $("#start_time").val();
        var time1 = $("#end_time").val();
        var project = $("#category").val();
        switch (project) {
            case 'yidong_unikey':
                yidong_unikey(spcode, project, time, time1)
                break
            case 'third_pay':
                third_pay(spcode, project, time);
                break;
            case 'tianyiring':
                tianyiring(spcode, project, time);
                break;
            case 'diy':
                diy(spcode, project, time);
                break;
            case 'diy4G':
                diy4G(spcode, project, time);
                break;
            case 'getui_unicom':
                getui_unicom(spcode, project, time);
                break;
            case 'getui_telecom':
                getui_telecom(spcode, project, time);
                break;
            case 'cx':
                cx(spcode, project, time);
                break
            case 'mobilepojie':
                mobilepojie(spcode, project, time, time1);
                break
            case 'flowcard':
                flowcard(spcode, project, time);
                break
        }
        var property = {
            width: 5000,
            height: 600,
            toolBtns: ["start", "end", "task", "node", "chat", "state", "plug", "join", "fork", "complex"],
            haveHead: true,
            headBtns: ["new", "open", "save", "undo", "redo", "reload"],//如果haveHead=true，则定义HEAD区的按钮
            haveTool: true,
            haveGroup: true,
            useOperStack: true
        };
        var remark = {
            cursor: "选择指针",
            direct: "转换连线",
            start: "开始结点",
            end: "结束结点",
            task: "任务结点",
            node: "自动结点",
            chat: "决策结点",
            state: "状态结点",
            plug: "附加插件",
            fork: "分支结点",
            join: "联合结点",
            complex: "复合结点",
            group: "组织划分框编辑开关"
        };
        var demo;
        function toPercent(point) {
            var str = Number(point * 100).toFixed(2);
            str += "%";
            return str;
        }
        
        function cx(spcode, project, time) {
            $.ajax({
                url: '/' + project,
                data: { spcode: spcode, project: project, time: time },
                dataType: 'json',
                cache: false,
                type: 'get',
                success: function (r) {
                    var r = r.data[0];
                    demo = $.createGooFlow($("#demo"), property);
                    demo.setNodeRemarks(remark);
                    demo.onItemDel = function (id, type) {
                        return confirm("确定要删除该单元吗?");
                    };
                    jsondata = {
                        title: "aaa",
                        nodes: {
                            demo_node_0: { name: time + '</br>' + spcode, left: 100, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_1: { name: 'uv' + '</br>' + r.uv, left: 0, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_2: { name: "彩铃验证弹窗" + '</br>' + r.彩铃验证弹窗 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃验证弹窗 / r.uv), left: 100, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_3: { name: "点击验证码" + '</br>' + r.点击下发验证码 + '</br>' + '<font color="#FF0000">' + toPercent(r.点击下发验证码 / r.彩铃验证弹窗), left: 200, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_4g_1: { name: "是否4g" + '</br>' + r.是否四 + '</br>' + '<font color="#FF0000">' + toPercent(r.是否四 / r.点击下发验证码), left: 300, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_4g_2: { name: "4g弹窗" + '</br>' + r.四弹窗 + '</br>' + '<font color="#FF0000">' + toPercent(r.四弹窗 / r.是否四), left: 300, top: 400, type: "start", width: 5, height: 5 },
                            demo_node_4g_3: { name: "4g弹窗确定" + '</br>' + r.四弹窗确定 + '</br>' + '<font color="#FF0000">' + toPercent(r.四弹窗确定 / r.四弹窗), left: 500, top: 400, type: "start", width: 5, height: 5 },
                            demo_node_4g_4: { name: "下发验证码" + '</br>' + r.成功下发验证码 + '</br>' + '<font color="#FF0000">' + toPercent(r.成功下发验证码 / r.是否四), left: 500, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_4g_5: { name: "下发失败" + '</br>' + r.下发失败 + '</br>' + '<font color="#FF0000">' + toPercent(r.下发失败 / r.成功下发验证码), left: 500, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_4: { name: '弹窗确认' + '</br>' + r.弹窗确认 + '</br>' + '<font color="#FF0000">' + toPercent(r.弹窗确认 / r.成功下发验证码), left: 600, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_4_1: { name: '验证码输错' + '</br>' + r.验证码输错 + '</br>' + '<font color="#FF0000">' + toPercent(r.验证码输错 / r.弹窗确认), left: 600, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_4_2: { name: '开通接口失败' + '</br>' + r.开通接口错误 + '</br>' + '<font color="#FF0000">' + toPercent(r.开通接口错误 / r.弹窗确认), left: 600, top: 400, type: "start", width: 5, height: 5 },
                            demo_node_6: { name: "开彩铃加会员" + '</br>' + r.开彩铃加会员 + '</br>' + '<font color="#FF0000">' + toPercent(r.开彩铃加会员 / r.弹窗确认), left: 700, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_6_1: { name: '老用户加二次登录' + '</br>' + r.老用户 + '</br>' + '<font color="#FF0000">' + toPercent(r.老用户 / r.开彩铃加会员), left: 700, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_8: { name: "总成功略小于" + '</br>' + r.总成功 + '</br>' + '<font color="#FF0000">' + toPercent(r.总成功 / r.uv), left: 800, top: 300, type: "start", width: 5, height: 5 },
                        },
                        lines: {
                            demo_line_1: { type: "sl", from: "demo_node_1", to: "demo_node_2", name: "", marked: false },
                            demo_line_2: { type: "sl", from: "demo_node_2", to: "demo_node_3", name: "", marked: false },
                            demo_line_3: { type: "sl", from: "demo_node_3", to: "demo_node_4g_1", name: "", marked: false },
                            demo_line_4g_1: { type: "sl", from: "demo_node_4g_1", to: "demo_node_4g_2", name: "是3G" + r.不是四, marked: false },
                            demo_line_4g_14: { type: "sl", from: "demo_node_4g_1", to: "demo_node_4g_4", name: "是4G" + r.是四, marked: false },
                            demo_line_4g_2: { type: "sl", from: "demo_node_4g_2", to: "demo_node_4g_3", name: "", marked: false },
                            demo_line_4g_3: { type: "sl", from: "demo_node_4g_3", to: "demo_node_4g_4", name: "", marked: false },
                            demo_line_4g_4: { type: "sl", from: "demo_node_4g_4", to: "demo_node_4", name: "", marked: false },
                            demo_line_4g_5: { type: "sl", from: "demo_node_4g_4", to: "demo_node_4g_5", name: "", marked: false },
                            demo_line_4: { type: "sl", from: "demo_node_4", to: "demo_node_6", name: "", marked: false },
                            demo_line_4_1: { type: "sl", from: "demo_node_4", to: "demo_node_4_1", name: "", marked: false },
                            demo_line_4_2: { type: "sl", from: "demo_node_4", to: "demo_node_4_2", name: "", marked: false },
                            demo_line_6_1: { type: "sl", from: "demo_node_6", to: "demo_node_6_1", name: "", marked: false },
                            demo_line_6: { type: "sl", from: "demo_node_6", to: "demo_node_8", name: "", marked: false }
                        }
                    };
                    demo.$max = 9;
                    demo.loadData(jsondata);
                }
            });
        }
        function tianyiring(spcode, project, time) {
            $.ajax({
                url: '/' + project,
                data: { spcode: spcode, project: project, time: time },
                dataType: 'json',
                cache: false,
                type: 'get',
                success: function (r) {
                    var r = r.data[0];
                    demo = $.createGooFlow($("#demo"), property);
                    demo.setNodeRemarks(remark);
                    demo.onItemDel = function (id, type) {
                        return confirm("确定要删除该单元吗?");
                    };
                    jsondata = {
                        title: "aaa",
                        nodes: {
                            demo_node_0: { name: time + '</br>' + spcode, left: 100, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_1: { name: '透传到' + '</br>' + r.uv, left: 0, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_2: { name: "点击领取彩铃下载" + '</br>' + r.点击领取彩铃下载 + '</br>' + '<font color="#FF0000">' + toPercent(r.点击领取彩铃下载 / r.uv), left: 100, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_2_1: { name: "老用户" + '</br>' + r.老用户 + '</br>' + '<font color="#FF0000">' + toPercent(r.老用户 / r.点击领取彩铃下载), left: 100, top: 400, type: "start", width: 5, height: 5 },
                            demo_node_3: { name: "开通弹窗" + '</br>' + r.开通弹窗 + '</br>' + '<font color="#FF0000">' + toPercent(r.开通弹窗 / r.点击领取彩铃下载), left: 200, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_3_2: { name: "返回+跳出" + '</br>' + r.跳出 + '</br>' + '<font color="#FF0000">' + toPercent(r.跳出 / r.开通弹窗), left: 200, top: 400, type: "start", width: 5, height: 5 },
                            demo_node_4: { name: '弹窗确定' + '</br>' + r.弹窗确定 + '</br>' + '<font color="#FF0000">' + toPercent(r.弹窗确定 / r.开通弹窗), left: 300, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_5: { name: "彩铃会员一起开" + '</br>' + r.开会员 + '</br>' + '<font color="#FF0000">' + toPercent(r.开会员 / r.uv), left: 400, top: 300, type: "start", width: 5, height: 5 },
    
                        },
                        lines: {
                            demo_line_1: { type: "sl", from: "demo_node_1", to: "demo_node_2", name: "", marked: false },
                            demo_line_2: { type: "sl", from: "demo_node_2", to: "demo_node_3", name: "", marked: false },
                            demo_line_2_1: { type: "sl", from: "demo_node_2", to: "demo_node_2_1", name: "", marked: false },
                            demo_line_2_2: { type: "sl", from: "demo_node_2", to: "demo_node_2_2", name: "", marked: false },
                            demo_line_3: { type: "sl", from: "demo_node_3", to: "demo_node_4", name: "", marked: false },
                            demo_line_3_1: { type: "sl", from: "demo_node_3", to: "demo_node_3_1", name: "", marked: false },
                            demo_line_3_2: { type: "sl", from: "demo_node_3", to: "demo_node_3_2", name: "", marked: false },
                            demo_line_4: { type: "sl", from: "demo_node_4", to: "demo_node_5", name: "", marked: false },
                            demo_line_4_1: { type: "sl", from: "demo_node_4", to: "demo_node_4_1", name: "", marked: false },
                            demo_line_6: { type: "sl", from: "demo_node_6", to: "demo_node_7", name: "", marked: false },
                            demo_line_7: { type: "sl", from: "demo_node_7", to: "demo_node_8", name: "", marked: false },
                            demo_line_7_1: { type: "sl", from: "demo_node_7", to: "demo_node_7_1", name: "", marked: false },
                            demo_line_8: { type: "sl", from: "demo_node_8", to: "demo_node_9", name: "", marked: false }
                        }
                    };
                    demo.$max = 9;
                    demo.loadData(jsondata);
                }
            });
        }
        function getui_unicom(spcode, project, time) {
            $.ajax({
                url: '/' + project,
                data: { spcode: spcode, project: project, time: time },
                dataType: 'json',
                cache: false,
                type: 'get',
                success: function (r) {
                    var r = r.data[0];
                    demo = $.createGooFlow($("#demo"), property);
                    demo.setNodeRemarks(remark);
                    demo.onItemDel = function (id, type) {
                        return confirm("确定要删除该单元吗?");
                    };
                    jsondata = {
                        title: "aaa",
                        nodes: {
                            demo_node_0: { name: time + '</br>' + spcode, left: 100, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_1: { name: 'uv' + '</br>' + r.uv, left: 0, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_2: { name: "彩铃验证弹窗" + '</br>' + r.彩铃验证弹窗 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃验证弹窗 / r.uv), left: 100, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_3: { name: "下发验证码" + '</br>' + r.下发验证码 + '</br>' + '<font color="#FF0000">' + toPercent(r.下发验证码 / r.彩铃验证弹窗), left: 200, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_4: { name: '弹窗确认' + '</br>' + r.弹窗确认 + '</br>' + '<font color="#FF0000">' + toPercent(r.弹窗确认 / r.下发验证码), left: 300, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_4_1: { name: '验证码输错' + '</br>' + r.验证码输错 + '</br>' + '<font color="#FF0000">' + toPercent(r.验证码输错 / r.弹窗确认), left: 300, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_5: { name: "是否彩铃" + '</br>' + r.是否彩铃 + '</br>' + '<font color="#FF0000">' + toPercent(r.是否彩铃 / r.弹窗确认), left: 400, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_5_1: { name: "老用户" + '</br>' + r.老用户 + '</br>' + '<font color="#FF0000">' + toPercent(r.老用户 / r.是否彩铃), left: 400, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_6: { name: "开彩铃加会员" + '</br>' + r.开彩铃加会员 + '</br>' + '<font color="#FF0000">' + toPercent(r.开彩铃加会员 / r.是否彩铃), left: 500, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_7: { name: "开会员" + '</br>' + r.开会员 + '</br>' + '<font color="#FF0000">' + toPercent(r.开会员 / r.是否彩铃), left: 500, top: 400, type: "start", width: 5, height: 5 },
                            demo_node_8: { name: "总成功" + '</br>' + r.总成功 + '</br>' + '<font color="#FF0000">' + toPercent(r.总成功 / r.uv), left: 600, top: 300, type: "start", width: 5, height: 5 },
                        },
                        lines: {
                            demo_line_1: { type: "sl", from: "demo_node_1", to: "demo_node_2", name: "", marked: false },
                            demo_line_2: { type: "sl", from: "demo_node_2", to: "demo_node_3", name: "", marked: false },
                            demo_line_3: { type: "sl", from: "demo_node_3", to: "demo_node_4", name: "", marked: false },
                            demo_line_4: { type: "sl", from: "demo_node_4", to: "demo_node_5", name: "", marked: false },
                            demo_line_4_1: { type: "sl", from: "demo_node_4", to: "demo_node_4_1", name: "", marked: false },
                            demo_line_5: { type: "sl", from: "demo_node_5", to: "demo_node_6", name: "", marked: false },
                            demo_line_5_1: { type: "sl", from: "demo_node_5", to: "demo_node_5_1", name: "", marked: false },
                            demo_line_6: { type: "sl", from: "demo_node_5", to: "demo_node_7", name: "", marked: false },
                            demo_line_7: { type: "sl", from: "demo_node_6", to: "demo_node_8", name: "", marked: false },
                            demo_line_8: { type: "sl", from: "demo_node_7", to: "demo_node_8", name: "", marked: false }
                        }
                    };
                    demo.$max = 9;
                    demo.loadData(jsondata);
                }
            });
        }
        function third_pay(spcode, project, time) {
            $.ajax({
                url: '/' + project,
                data: { spcode: spcode, project: project, time: time },
                dataType: 'json',
                cache: false,
                type: 'get',
                success: function (r) {
                    var r = r.data[0];
                    demo = $.createGooFlow($("#demo"), property);
                    demo.setNodeRemarks(remark);
                    demo.onItemDel = function (id, type) {
                        return confirm("确定要删除该单元吗?");
                    };
                    jsondata = {
                        title: "aaa",
                        nodes: {
                            demo_node_0: { name: time + '</br>' + spcode, left: 100, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_1: { name: 'uv' + '</br>' + r.uv, left: 0, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_2: { name: "用户登陆框" + '</br>' + r.彩铃验证弹窗 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃验证弹窗 / r.uv), left: 100, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_3: { name: "下发验证码" + '</br>' + r.下发验证码 + '</br>' + '<font color="#FF0000">' + toPercent(r.下发验证码 / r.彩铃验证弹窗), left: 200, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_4: { name: '尝试登入' + '</br>' + r.尝试登入 + '</br>' + '<font color="#FF0000">' + toPercent(r.尝试登入 / r.下发验证码), left: 300, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_4_1: { name: '验证码下发错误' + '</br>' + r.验证码下发错误 + '</br>' + '<font color="#FF0000">' + toPercent(r.验证码下发错误 / r.下发验证码), left: 300, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_5: { name: "是否会员" + '</br>' + r.是否会员 + '</br>' + '<font color="#FF0000">' + toPercent(r.是否会员 / r.尝试登入), left: 400, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_5_1: { name: "老用户" + '</br>' + r.老用户 + '</br>' + '<font color="#FF0000">' + toPercent(r.老用户 / r.是否会员), left: 400, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_6: { name: "支付页面" + '</br>' + r.支付页面 + '</br>' + '<font color="#FF0000">' + toPercent(r.支付页面 / r.是否会员), left: 500, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_7: { name: "拉起支付方式" + '</br>' + r.拉起支付方式 + '</br>' + '<font color="#FF0000">' + toPercent(r.拉起支付方式 / r.支付页面), left: 600, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_8: { name: "选择6金额" + '</br>' + r.选择6支付金额 + '</br>' + ' <font color="#FF0000">' + toPercent(r.选择6支付金额 / r.拉起支付方式), left: 700, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_8_1: { name: "选择15金额" + '</br>' + r.选择15支付金额 + '</br>' + ' <font color="#FF0000">' + toPercent(r.选择15支付金额 / r.拉起支付方式), left: 700, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_8_2: { name: "选择28金额" + '</br>' + r.选择28支付金额 + '</br>' + ' <font color="#FF0000">' + toPercent(r.选择28支付金额 / r.拉起支付方式), left: 700, top: 350, type: "start", width: 5, height: 5 },
                            demo_node_8_3: { name: "选择50金额" + '</br>' + r.选择50支付金额 + '</br>' + ' <font color="#FF0000">' + toPercent(r.选择50支付金额 / r.拉起支付方式), left: 700, top: 450, type: "start", width: 5, height: 5 },
                            demo_node_9: { name: "支付宝页确定" + '</br>' + r.支付宝页确定 + '</br>' + '<font color="#FF0000">' + toPercent(r.支付宝页确定 / r.拉起支付方式), left: 830, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_9_1: { name: "微信页确定" + '</br>' + r.微信页确定 + '</br>' + '<font color="#FF0000">' + toPercent(r.微信页确定 / r.拉起支付方式), left: 830, top: 350, type: "start", width: 5, height: 5 },
                            demo_node_10: { name: "支付宝订购成功" + '</br>' + r.支付宝订购成功 + '</br>' + '<font color="#FF0000">' + toPercent(r.支付宝订购成功 / r.支付宝页确定), left: 930, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_10_1: { name: "微信订购成功" + '</br>' + r.微信订购成功 + '</br>' + '<font color="#FF0000">' + toPercent(r.微信订购成功 / r.微信页确定), left: 930, top: 350, type: "start", width: 5, height: 5 },
                            demo_node_11: { name: "订购6" + '</br>' + r.订购6 + '</br>' + '<font color="#FF0000">' + toPercent(r.订购6 / (r.支付宝订购成功 + r.微信订购成功)), left: 1060, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_11_1: { name: "订购15" + '</br>' + r.订购15 + '</br>' + '<font color="#FF0000">' + toPercent(r.订购15 / (r.支付宝订购成功 + r.微信订购成功)), left: 1060, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_11_2: { name: "订购28" + '</br>' + r.订购28 + '</br>' + '<font color="#FF0000">' + toPercent(r.订购28 / (r.支付宝订购成功 + r.微信订购成功)), left: 1060, top: 350, type: "start", width: 5, height: 5 },
                            demo_node_11_3: { name: "订购50" + '</br>' + r.订购50 + '</br>' + '<font color="#FF0000">' + toPercent(r.订购50 / (r.支付宝订购成功 + r.微信订购成功)), left: 1060, top: 450, type: "start", width: 5, height: 5 },
                            demo_node_12: { name: "订购总转化率" + '</br>' + (r.订购6 + r.订购15 + r.订购28 + r.订购50) + '</br>' + '<font color="#FF0000">' + toPercent((r.订购6 + r.订购15 + r.订购28 + r.订购50) / r.uv), left: 1200, top: 250, type: "start", width: 5, height: 5 },
    
                        },
                        lines: {
                            demo_line_1: { type: "sl", from: "demo_node_1", to: "demo_node_2", name: "", marked: false },
                            demo_line_2: { type: "sl", from: "demo_node_2", to: "demo_node_3", name: "", marked: false },
                            demo_line_2_1: { type: "sl", from: "demo_node_2", to: "demo_node_2_1", name: "", marked: false },
                            demo_line_3: { type: "sl", from: "demo_node_3", to: "demo_node_4", name: "", marked: false },
                            demo_line_4: { type: "sl", from: "demo_node_4", to: "demo_node_5", name: "", marked: false },
                            demo_line_4_1: { type: "sl", from: "demo_node_3", to: "demo_node_4_1", name: "", marked: false },
                            demo_line_5: { type: "sl", from: "demo_node_5", to: "demo_node_6", name: "", marked: false },
                            demo_line_5_1: { type: "sl", from: "demo_node_5", to: "demo_node_5_1", name: "", marked: false },
                            demo_line_6: { type: "sl", from: "demo_node_5", to: "demo_node_6", name: "", marked: false },
                            demo_line_7: { type: "sl", from: "demo_node_6", to: "demo_node_7", name: "", marked: false },
                            demo_line_8: { type: "sl", from: "demo_node_7", to: "demo_node_8", name: "", marked: false },
                            demo_line_8_1: { type: "sl", from: "demo_node_7", to: "demo_node_8_1", name: "", marked: false },
                            demo_line_8_2: { type: "sl", from: "demo_node_7", to: "demo_node_8_2", name: "", marked: false },
                            demo_line_8_3: { type: "sl", from: "demo_node_7", to: "demo_node_8_3", name: "", marked: false },
                            demo_line_9: { type: "sl", from: "demo_node_8", to: "demo_node_9", name: "", marked: false },
                            demo_line_9_1: { type: "sl", from: "demo_node_8", to: "demo_node_9_1", name: "", marked: false },
                            demo_line_9_a: { type: "sl", from: "demo_node_8_1", to: "demo_node_9", name: "", marked: false },
                            demo_line_9_b: { type: "sl", from: "demo_node_8_1", to: "demo_node_9_1", name: "", marked: false },
                            demo_line_9_c: { type: "sl", from: "demo_node_8_2", to: "demo_node_9", name: "", marked: false },
                            demo_line_9_d: { type: "sl", from: "demo_node_8_2", to: "demo_node_9_1", name: "", marked: false },
                            demo_line_9_e: { type: "sl", from: "demo_node_8_3", to: "demo_node_9", name: "", marked: false },
                            demo_line_9_f: { type: "sl", from: "demo_node_8_3", to: "demo_node_9_1", name: "", marked: false },
                            demo_line_10: { type: "sl", from: "demo_node_9", to: "demo_node_10", name: "", marked: false },
                            demo_line_10_1: { type: "sl", from: "demo_node_9_1", to: "demo_node_10_1", name: "", marked: false },
                            demo_line_11: { type: "sl", from: "demo_node_10", to: "demo_node_11", name: "", marked: false },
                            demo_line_11_a: { type: "sl", from: "demo_node_10_1", to: "demo_node_11", name: "", marked: false },
                            demo_line_11_b: { type: "sl", from: "demo_node_10", to: "demo_node_11_1", name: "", marked: false },
                            demo_line_11_c: { type: "sl", from: "demo_node_10_1", to: "demo_node_11_1", name: "", marked: false },
                            demo_line_11_d: { type: "sl", from: "demo_node_10", to: "demo_node_11_2", name: "", marked: false },
                            demo_line_11_e: { type: "sl", from: "demo_node_10_1", to: "demo_node_11_2", name: "", marked: false },
                            demo_line_11_f: { type: "sl", from: "demo_node_10", to: "demo_node_11_3", name: "", marked: false },
                            demo_line_11_g: { type: "sl", from: "demo_node_10_1", to: "demo_node_11_3", name: "", marked: false },
                            demo_line_12: { type: "sl", from: "demo_node_11", to: "demo_node_12", name: "", marked: false },
                            demo_line_12_a: { type: "sl", from: "demo_node_11_1", to: "demo_node_12", name: "", marked: false },
                            demo_line_12_b: { type: "sl", from: "demo_node_11_2", to: "demo_node_12", name: "", marked: false },
                            demo_line_12_c: { type: "sl", from: "demo_node_11_3", to: "demo_node_12", name: "", marked: false },
                        }
                    };
                    demo.$max = 9;
                    demo.loadData(jsondata);
                }
            });
        }
        function diy4G(spcode, project, time) {
            $.ajax({
                url: '/' + project,
                data: { spcode: spcode, project: project, time: time },
                dataType: 'json',
                cache: false,
                type: 'get',
                success: function (r) {
                    var r = r.data[0];
                    demo = $.createGooFlow($("#demo"), property);
                    demo.setNodeRemarks(remark);
                    demo.onItemDel = function (id, type) {
                        return confirm("确定要删除该单元吗?");
                    };
                    jsondata = {
                        title: "aaa",
                        nodes: {
                            demo_node_0: { name: time + '</br>' + spcode, left: 100, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_1: { name: '透传到' + '</br>' + r.透传到, left: 0, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_2: { name: "点击领取彩铃下载" + '</br>' + r.点击领取彩铃下载 + '</br>' + '<font color="#FF0000">' + toPercent(r.点击领取彩铃下载 / r.透传到), left: 100, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_2_1: { name: "老用户" + '</br>' + r.老用户 + '</br>' + '<font color="#FF0000">' + toPercent(r.老用户 / r.点击领取彩铃下载), left: 100, top: 400, type: "start", width: 5, height: 5 },
                            demo_node_3: { name: "开通弹窗" + '</br>' + r.开通弹窗 + '</br>' + '<font color="#FF0000">' + toPercent(r.开通弹窗 / r.点击领取彩铃下载), left: 200, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_3_1: { name: '取消支付' + '</br>' + r.取消支付 + '</br>' + '<font color="#FF0000">' + toPercent(r.取消支付 / r.开通弹窗), left: 200, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_3_2: { name: "跳出" + '</br>' + r.跳出 + '</br>' + '<font color="#FF0000">' + toPercent(r.跳出 / r.开通弹窗), left: 200, top: 400, type: "start", width: 5, height: 5 },
                            demo_node_4: { name: '弹窗确定' + '</br>' + r.弹窗确定 + '</br>' + '<font color="#FF0000">' + toPercent(r.弹窗确定 / r.开通弹窗), left: 300, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_5: { name: "是否彩铃" + '</br>' + r.是否彩铃 + '</br>' + '<font color="#FF0000">' + toPercent(r.是否彩铃 / r.弹窗确定), left: 400, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_5_1: { name: "队列中" + '</br>' + r.队列中 + '</br>' + '<font color="#FF0000">' + toPercent(r.队列中 / r.是否彩铃), left: 400, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_5_2: { name: "3G弹窗" + '</br>' + r.threeG + '</br>' + '<font color="#FF0000">' + toPercent(r.threeG / r.是否彩铃), left: 400, top: 400, type: "start", width: 5, height: 5 },
                            demo_node_6: { name: "开彩铃加会员" + '</br>' + r.开彩铃加会员 + '</br>' + '<font color="#FF0000">' + toPercent(r.开彩铃加会员 / r.是否彩铃), left: 500, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_7: { name: "开会员" + '</br>' + r.开会员 + '</br>' + '<font color="#FF0000">' + toPercent(r.开会员 / r.是否彩铃), left: 500, top: 400, type: "start", width: 5, height: 5 },
                            demo_node_8: { name: "总成功" + '</br>' + r.总成功 + '</br>' + '<font color="#FF0000">' + toPercent(r.总成功 / r.透传到), left: 600, top: 300, type: "start", width: 5, height: 5 },
                        },
                        lines: {
                            demo_line_1: { type: "sl", from: "demo_node_1", to: "demo_node_2", name: "", marked: false },
                            demo_line_2: { type: "sl", from: "demo_node_2", to: "demo_node_3", name: "", marked: false },
                            demo_line_2_1: { type: "sl", from: "demo_node_2", to: "demo_node_2_1", name: "", marked: false },
                            demo_line_3: { type: "sl", from: "demo_node_3", to: "demo_node_4", name: "", marked: false },
                            demo_line_3_1: { type: "sl", from: "demo_node_3", to: "demo_node_3_1", name: "", marked: false },
                            demo_line_3_2: { type: "sl", from: "demo_node_3", to: "demo_node_3_2", name: "", marked: false },
                            demo_line_4: { type: "sl", from: "demo_node_4", to: "demo_node_5", name: "", marked: false },
                            demo_line_4_1: { type: "sl", from: "demo_node_4", to: "demo_node_4_1", name: "", marked: false },
                            demo_line_5: { type: "sl", from: "demo_node_5", to: "demo_node_6", name: "", marked: false },
                            demo_line_5_1: { type: "sl", from: "demo_node_5", to: "demo_node_5_1", name: "", marked: false },
                            demo_line_5_2: { type: "sl", from: "demo_node_5", to: "demo_node_5_2", name: "", marked: false },
                            demo_line_6: { type: "sl", from: "demo_node_5", to: "demo_node_7", name: "", marked: false },
                            demo_line_7: { type: "sl", from: "demo_node_6", to: "demo_node_8", name: "", marked: false },
                            demo_line_8: { type: "sl", from: "demo_node_7", to: "demo_node_8", name: "", marked: false }
                        }
                    };
                    demo.$max = 9;
                    demo.loadData(jsondata);
                }
            });
        }
        function getui_telecom(spcode, project, time) {
            $.ajax({
                url: '/' + project,
                data: { spcode: spcode, project: project, time: time },
                dataType: 'json',
                cache: false,
                type: 'get',
                success: function (r) {
                    var r = r.data[0];
                    demo = $.createGooFlow($("#demo"), property);
                    demo.setNodeRemarks(remark);
                    demo.onItemDel = function (id, type) {
                        return confirm("确定要删除该单元吗?");
                    };
                    jsondata = {
                        title: "aaa",
                        nodes: {
                            demo_node_0: { name: time + '</br>' + spcode, left: 100, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_1: { name: 'uv' + '</br>' + r.uv, left: 0, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_2: { name: "彩铃验证弹窗" + '</br>' + r.彩铃验证弹窗 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃验证弹窗 / r.uv), left: 100, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_3: { name: "获取验证码" + '</br>' + r.下发验证码 + '</br>' + '<font color="#FF0000">' + toPercent(r.下发验证码 / r.彩铃验证弹窗), left: 200, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_4: { name: '弹窗确认' + '</br>' + r.弹窗确认 + '</br>' + '<font color="#FF0000">' + toPercent(r.弹窗确认 / r.下发验证码), left: 300, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_4_1: { name: '验证码输错' + '</br>' + r.验证码输错 + '</br>' + '<font color="#FF0000">' + toPercent(r.验证码输错 / r.弹窗确认), left: 300, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_6: { name: "开彩铃加会员" + '</br>' + r.开彩铃加会员 + '</br>' + '<font color="#FF0000">' + toPercent(r.开彩铃加会员 / r.弹窗确认), left: 500, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_6_1: { name: "老用户" + '</br>' + r.老用户 + '</br>' + '<font color="#FF0000">' + toPercent(r.老用户 / r.开彩铃加会员), left: 500, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_8: { name: "总成功" + '</br>' + r.总成功 + '</br>' + '<font color="#FF0000">' + toPercent(r.总成功 / r.uv), left: 600, top: 300, type: "start", width: 5, height: 5 },
                        },
                        lines: {
                            demo_line_1: { type: "sl", from: "demo_node_1", to: "demo_node_2", name: "", marked: false },
                            demo_line_2: { type: "sl", from: "demo_node_2", to: "demo_node_3", name: "", marked: false },
                            demo_line_3: { type: "sl", from: "demo_node_3", to: "demo_node_4", name: "", marked: false },
                            demo_line_4: { type: "sl", from: "demo_node_4", to: "demo_node_6", name: "", marked: false },
                            demo_line_4_1: { type: "sl", from: "demo_node_4", to: "demo_node_4_1", name: "", marked: false },
                            demo_line_6: { type: "sl", from: "demo_node_6", to: "demo_node_8", name: "", marked: false },
                            demo_line_6_1: { type: "sl", from: "demo_node_6", to: "demo_node_6_1", name: "", marked: false },
                        }
                    };
                    demo.$max = 9;
                    demo.loadData(jsondata);
                }
            });
        }
        function diy(spcode, project, time) {
            $.ajax({
                url: '/' + project,
                data: { spcode: spcode, project: project, time: time },
                dataType: 'json',
                cache: false,
                type: 'get',
                success: function (r) {
                    var r = r.data[0];
                    demo = $.createGooFlow($("#demo"), property);
                    demo.setNodeRemarks(remark);
                    demo.onItemDel = function (id, type) {
                        return confirm("确定要删除该单元吗?");
                    };
                    jsondata = {
                        title: "aaa",
                        nodes: {
                            demo_node_0: { name: time + '</br>' + spcode, left: 100, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_1: { name: 'uv' + '</br>' + r.uv, left: 0, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_2: { name: "点击领取彩铃下载" + '</br>' + r.点击领取彩铃下载 + '</br>' + '<font color="#FF0000">' + toPercent(r.点击领取彩铃下载 / r.uv), left: 100, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_2_1: { name: "老用户" + '</br>' + r.老用户 + '</br>' + '<font color="#FF0000">' + toPercent(r.老用户 / r.点击领取彩铃下载), left: 100, top: 400, type: "start", width: 5, height: 5 },
                            demo_node_2_2: { name: "渠道切换差额" + '</br>' + r.渠道切换差额 + '</br>' + '<font color="#FF0000">' + toPercent(r.渠道切换差额 / r.点击领取彩铃下载), left: 0, top: 400, type: "start", width: 5, height: 5 },
                            demo_node_3: { name: "开通弹窗" + '</br>' + r.开通弹窗 + '</br>' + '<font color="#FF0000">' + toPercent(r.开通弹窗 / r.点击领取彩铃下载), left: 200, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_3_1: { name: '取消支付' + '</br>' + r.取消支付 + '</br>' + '<font color="#FF0000">' + toPercent(r.取消支付 / r.开通弹窗), left: 200, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_3_2: { name: "跳出" + '</br>' + r.跳出 + '</br>' + '<font color="#FF0000">' + toPercent(r.跳出 / r.开通弹窗), left: 200, top: 400, type: "start", width: 5, height: 5 },
                            demo_node_4: { name: '弹窗确定' + '</br>' + r.弹窗确定 + '</br>' + '<font color="#FF0000">' + toPercent(r.弹窗确定 / r.开通弹窗), left: 300, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_5: { name: "开会员成功" + '</br>' + r.开会员 + '</br>' + '<font color="#FF0000">' + toPercent(r.开会员 / r.uv), left: 400, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_6: { name: "点设置铃声判断彩铃" + '</br>' + r.是否彩铃 + '</br>' + '<font color="#FF0000">' + toPercent(r.是否彩铃 / r.弹窗确定), left: 500, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_7: { name: "不是彩铃" + '</br>' + r.不是彩铃 + '</br>' + '<font color="#FF0000">' + toPercent(r.不是彩铃 / r.是否彩铃), left: 600, top: 300, type: "start", width: 5, height: 5 },
                            demo_node_7_1: { name: "开通中" + '</br>' + r.彩铃开通中 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃开通中 / r.不是彩铃), left: 600, top: 200, type: "start", width: 5, height: 5 },
                            demo_node_8: { name: "开通彩铃成功" + '</br>' + r.开彩铃 + '</br>' + '<font color="#FF0000">' + toPercent(r.开彩铃 / r.不是彩铃), left: 700, top: 300, type: "start", width: 5, height: 5 },
    
                        },
                        lines: {
                            demo_line_1: { type: "sl", from: "demo_node_1", to: "demo_node_2", name: "", marked: false },
                            demo_line_2: { type: "sl", from: "demo_node_2", to: "demo_node_3", name: "", marked: false },
                            demo_line_2_1: { type: "sl", from: "demo_node_2", to: "demo_node_2_1", name: "", marked: false },
                            demo_line_2_2: { type: "sl", from: "demo_node_2", to: "demo_node_2_2", name: "", marked: false },
                            demo_line_3: { type: "sl", from: "demo_node_3", to: "demo_node_4", name: "", marked: false },
                            demo_line_3_1: { type: "sl", from: "demo_node_3", to: "demo_node_3_1", name: "", marked: false },
                            demo_line_3_2: { type: "sl", from: "demo_node_3", to: "demo_node_3_2", name: "", marked: false },
                            demo_line_4: { type: "sl", from: "demo_node_4", to: "demo_node_5", name: "", marked: false },
                            demo_line_4_1: { type: "sl", from: "demo_node_4", to: "demo_node_4_1", name: "", marked: false },
                            demo_line_6: { type: "sl", from: "demo_node_6", to: "demo_node_7", name: "", marked: false },
                            demo_line_7: { type: "sl", from: "demo_node_7", to: "demo_node_8", name: "", marked: false },
                            demo_line_7_1: { type: "sl", from: "demo_node_7", to: "demo_node_7_1", name: "", marked: false },
                            demo_line_8: { type: "sl", from: "demo_node_8", to: "demo_node_9", name: "", marked: false }
                        }
                    };
                    demo.$max = 9;
                    demo.loadData(jsondata);
                }
            });
        }
        function mobilepojie(spcode, project, time, time1) {
            $.ajax({
                url: '/' + project,
                data: { spcode: spcode, project: project, time: time, time1: time1 },
                dataType: 'json',
                cache: false,
                type: 'get',
                success: function (r) {
                    var r = r.data[0];
                    demo = $.createGooFlow($("#demo"), property);
                    demo.setNodeRemarks(remark);
                    demo.onItemDel = function (id, type) {
                        return confirm("确定要删除该单元吗?");
                    };
                    jsondata = {
                        title: "aaa",
                        nodes: {
                            demo_node_0: { name: time + '</br>' + spcode, left: 100, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_1: { name: 'uv' + '</br>' + r.uv, left: 0, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_2: { name: "彩铃验证弹窗" + '</br>' + r.彩铃验证弹窗 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃验证弹窗 / r.uv), left: 100, top: 250, type: "start", width: 100, height: 5 },
                            demo_node_3: { name: "下发验证码" + '</br>' + r.下发验证码 + '</br>' + '<font color="#FF0000">' + toPercent(r.下发验证码 / r.彩铃验证弹窗), left: 200, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_4: { name: '弹窗确认' + '</br>' + r.弹窗确认 + '</br>' + '<font color="#FF0000">' + toPercent(r.弹窗确认 / r.下发验证码), left: 300, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_4_1: { name: '验证码输错' + '</br>' + r.验证码输错 + '</br>' + '<font color="#FF0000">' + toPercent(r.验证码输错 / r.弹窗确认), left: 300, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_5: { name: "是否彩铃" + '</br>' + r.是否彩铃 + '</br>' + '<font color="#FF0000">' + toPercent(r.是否彩铃 / r.弹窗确认), left: 400, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_5_1: { name: "接口错误" + '</br>' + r.是否彩铃错误 + '</br>' + '<font color="#FF0000">' + toPercent(r.是否彩铃错误 / r.是否彩铃), left: 400, top: 150, type: "start", width: 5, height: 5 },
    
                            demo_node_6: { name: '非彩铃用户' + '</br>' + r.非彩铃用户 + '</br>' + '<font color="#FF0000">' + toPercent(r.非彩铃用户 / r.是否彩铃), left: 550, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_6_1: { name: "用户跳出" + '</br>' + r.非彩用户跳出 + '</br>' + '<font color="#FF0000">' + toPercent(r.非彩用户跳出 / r.非彩铃用户), left: 550, top: 50, type: "start", width: 5, height: 5 },
                            demo_node_7: { name: "彩铃订购\n" + '</br>' + r.彩铃订购 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃订购 / r.非彩铃用户), left: 650, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_7_1: { name: '取消支付' + '</br>' + r.彩铃取消支付 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃取消支付 / r.彩铃订购), left: 650, top: 50, type: "start", width: 5, height: 5 },
                            demo_node_7_2: { name: "接口错误" + '</br>' + r.彩铃接口错误 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃接口错误 / r.彩铃订购), left: 650, top: 225, type: "start", width: 5, height: 5 },
                            demo_node_8: { name: "会员订购" + '</br>' + r.彩铃会员订购 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃会员订购 / r.彩铃订购), left: 750, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_8_1: { name: "取消支付" + '</br>' + r.彩铃会员取消 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃会员取消 / r.彩铃会员订购), left: 750, top: 50, type: "start", width: 5, height: 5 },
                            demo_node_8_2: { name: "接口错误" + '</br>' + r.彩铃会员错误 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃会员错误 / r.彩铃会员订购), left: 750, top: 225, type: "start", width: 5, height: 5 },
                            demo_node_8_3: { name: "短信二次确认" + '</br>' + r.彩铃会员短信二次确认 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃会员短信二次确认 / r.彩铃会员订购), left: 850, top: 50, type: "start", width: 5, height: 5 },
                            demo_node_9: { name: "成功" + '</br>' + r.彩铃会员成功 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃会员成功 / r.彩铃会员订购), left: 850, top: 150, type: "start", width: 5, height: 5 },
    
    
                            demo_node_10: { name: '彩铃用户' + '</br>' + r.彩铃用户 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃用户 / r.是否彩铃), left: 550, top: 350, type: "start", width: 5, height: 5 },
                            demo_node_10_1: { name: "老用户" + '</br>' + r.老用户 + '</br>' + '<font color="#FF0000">' + toPercent(r.老用户 / r.彩铃用户), left: 550, top: 275, type: "start", width: 5, height: 5 },
                            demo_node_10_2: { name: "跳出" + '</br>' + r.彩铃用户跳出 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃用户跳出 / r.彩铃用户), left: 550, top: 450, type: "start", width: 5, height: 5 },
                            demo_node_11: { name: "会员订购" + '</br>' + r.真会员订购 + '</br>' + '<font color="#FF0000">' + toPercent(r.真会员订购 / r.彩铃用户), left: 650, top: 350, type: "start", width: 5, height: 5 },
                            demo_node_11_1: { name: '取消支付' + '</br>' + r.真会员取消支付 + '</br>' + '<font color="#FF0000">' + toPercent(r.真会员取消支付 / r.真会员订购), left: 650, top: 275, type: "start", width: 5, height: 5 },
                            demo_node_11_2: { name: "接口错误" + '</br>' + r.真会员错误 + '</br>' + '<font color="#FF0000">' + toPercent(r.真会员错误 / r.真会员订购), left: 650, top: 450, type: "start", width: 5, height: 5 },
                            demo_node_11_3: { name: "需要短信二次确认" + '</br>' + r.短信二次确认 + '</br>' + '<font color="#FF0000">' + toPercent(r.短信二次确认 / r.真会员订购), left: 800, top: 450, type: "start", width: 5, height: 5 },
                            demo_node_12: { name: "成功" + '</br>' + r.会员会员成功 + '</br>' + '<font color="#FF0000">' + toPercent(r.会员会员成功 / r.真会员订购), left: 850, top: 350, type: "start", width: 5, height: 5 },
                            demo_node_13: { name: "总成功" + '</br>' + r.总成功 + '</br>' + '<font color="#FF0000">' + toPercent(r.总成功 / r.uv), left: 1000, top: 250, type: "start", width: 5, height: 5 },
                        },
                        lines: {
                            demo_line_1: { type: "sl", from: "demo_node_1", to: "demo_node_2", name: "", marked: false },
                            demo_line_2: { type: "sl", from: "demo_node_2", to: "demo_node_3", name: "", marked: false },
                            demo_line_3: { type: "sl", from: "demo_node_3", to: "demo_node_4", name: "", marked: false },
                            demo_line_4: { type: "sl", from: "demo_node_4", to: "demo_node_5", name: "", marked: false },
                            demo_line_4_1: { type: "sl", from: "demo_node_4", to: "demo_node_4_1", name: "", marked: false },
                            demo_line_5: { type: "sl", from: "demo_node_5", to: "demo_node_6", name: "", marked: false },
                            demo_line_5_1: { type: "sl", from: "demo_node_5", to: "demo_node_5_1", name: "", marked: false },
                            demo_line_5_a: { type: "sl", from: "demo_node_5", to: "demo_node_10", name: "", marked: false },
    
                            demo_line_6: { type: "sl", from: "demo_node_6", to: "demo_node_7", name: "", marked: false },
                            demo_line_6_1: { type: "sl", from: "demo_node_6", to: "demo_node_6_1", name: "", marked: false },
                            demo_line_7: { type: "sl", from: "demo_node_7", to: "demo_node_8", name: "", marked: false },
                            demo_line_7_1: { type: "sl", from: "demo_node_7", to: "demo_node_7_1", name: "", marked: false },
                            demo_line_7_2: { type: "sl", from: "demo_node_7", to: "demo_node_7_2", name: "", marked: false },
                            demo_line_7_a: { type: "sl", from: "demo_node_7_1", to: "demo_node_8", name: r.彩铃取消支付后成功, marked: false },
                            demo_line_7_b: { type: "sl", from: "demo_node_7_2", to: "demo_node_8", name: r.彩铃错误后成功, marked: false },
                            demo_line_8: { type: "sl", from: "demo_node_8", to: "demo_node_9", name: "", marked: false },
                            demo_line_8_1: { type: "sl", from: "demo_node_8", to: "demo_node_8_1", name: "", marked: false },
                            demo_line_8_2: { type: "sl", from: "demo_node_8", to: "demo_node_8_2", name: "", marked: false },
                            demo_line_8_3: { type: "sl", from: "demo_node_8", to: "demo_node_8_3", name: "", marked: false },
                            demo_line_9: { type: "sl", from: "demo_node_9", to: "demo_node_13", name: "", marked: false },
    
                            demo_line_10: { type: "sl", from: "demo_node_10", to: "demo_node_11", name: "", marked: false },
                            demo_line_10_1: { type: "sl", from: "demo_node_10", to: "demo_node_10_1", name: "", marked: false },
                            demo_line_10_2: { type: "sl", from: "demo_node_10", to: "demo_node_10_2", name: "", marked: false },
                            demo_line_11: { type: "sl", from: "demo_node_11", to: "demo_node_12", name: "", marked: false },
                            demo_line_11_1: { type: "sl", from: "demo_node_11", to: "demo_node_11_1", name: "", marked: false },
                            demo_line_11_2: { type: "sl", from: "demo_node_11", to: "demo_node_11_2", name: "", marked: false },
                            demo_line_11_3: { type: "sl", from: "demo_node_11", to: "demo_node_11_3", name: "", marked: false },
                            demo_line_11_a: { type: "sl", from: "demo_node_11_1", to: "demo_node_12", name: "二次成功" + r.会员取消支付成功, marked: false },
                            demo_line_11_b: { type: "sl", from: "demo_node_11_2", to: "demo_node_12", name: "二次成功" + r.会员错误后成功, marked: false },
                            demo_line_12: { type: "sl", from: "demo_node_12", to: "demo_node_13", name: "", marked: false },
                        }
                    };
                    demo.$max = 9;
                    demo.loadData(jsondata);
                }
            });
        }
        function yidong_unikey(spcode, project, time, time1) {
            $.ajax({
                url: '/' + project,
                data: { spcode: spcode, project: project, time: time, time1: time1 },
                dataType: 'json',
                cache: false,
                type: 'get',
                success: function (r) {
                    var r = r.data[0];
                    demo = $.createGooFlow($("#demo"), property);
                    demo.setNodeRemarks(remark);
                    demo.onItemDel = function (id, type) {
                        return confirm("确定要删除该单元吗?");
                    };
                    jsondata = {
                        title: "aaa",
                        nodes: {
                            demo_node_0: { name: time + '</br>' + spcode, left: 100, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_2: { name: "透传到" + '</br>' + r.透传到 + '</br>' + '<font color="#FF0000">', left: 100, top: 250, type: "start", width: 100, height: 5 },
                            demo_node_4: { name: '点击领取' + '</br>' + r.服务开通点击 + '</br>' + '<font color="#FF0000">' + toPercent(r.服务开通点击 / r.uv), left: 250, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_5: { name: "是否彩铃" + '</br>' + r.是否彩铃 + '</br>' + '<font color="#FF0000">' + toPercent(r.是否彩铃 / r.服务开通点击), left: 400, top: 250, type: "start", width: 5, height: 5 },
                            demo_node_5_1: { name: "接口错误" + '</br>' + r.是否彩铃错误 + '</br>' + '<font color="#FF0000">' + toPercent(r.是否彩铃错误 / r.是否彩铃), left: 400, top: 150, type: "start", width: 5, height: 5 },
    
                            demo_node_6: { name: '非彩铃用户' + '</br>' + r.非彩铃用户 + '</br>' + '<font color="#FF0000">' + toPercent(r.非彩铃用户 / r.是否彩铃), left: 550, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_6_1: { name: "用户跳出" + '</br>' + r.非彩用户跳出 + '</br>' + '<font color="#FF0000">' + toPercent(r.非彩用户跳出 / r.非彩铃用户), left: 550, top: 50, type: "start", width: 5, height: 5 },
                            demo_node_7: { name: "彩铃订购\n" + '</br>' + r.彩铃订购 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃订购 / r.非彩铃用户), left: 650, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_7_1: { name: '取消支付' + '</br>' + r.彩铃取消支付 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃取消支付 / r.彩铃订购), left: 650, top: 50, type: "start", width: 5, height: 5 },
                            demo_node_7_2: { name: "接口错误" + '</br>' + r.彩铃接口错误 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃接口错误 / r.彩铃订购), left: 650, top: 225, type: "start", width: 5, height: 5 },
                            demo_node_8: { name: "会员订购" + '</br>' + r.彩铃会员订购 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃会员订购 / r.彩铃订购), left: 750, top: 150, type: "start", width: 5, height: 5 },
                            demo_node_8_1: { name: "取消支付" + '</br>' + r.彩铃会员取消 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃会员取消 / r.彩铃会员订购), left: 750, top: 50, type: "start", width: 5, height: 5 },
                            demo_node_8_2: { name: "接口错误" + '</br>' + r.彩铃会员错误 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃会员错误 / r.彩铃会员订购), left: 750, top: 225, type: "start", width: 5, height: 5 },
                            demo_node_8_3: { name: "短信二次确认" + '</br>' + r.彩铃会员短信二次确认 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃会员短信二次确认 / r.彩铃会员订购), left: 850, top: 50, type: "start", width: 5, height: 5 },
                            demo_node_9: { name: "成功" + '</br>' + r.彩铃会员成功 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃会员成功 / r.彩铃会员订购), left: 850, top: 150, type: "start", width: 5, height: 5 },
    
    
                            demo_node_10: { name: '彩铃用户' + '</br>' + r.彩铃用户 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃用户 / r.是否彩铃), left: 550, top: 350, type: "start", width: 5, height: 5 },
                            demo_node_10_1: { name: "老用户" + '</br>' + r.老用户 + '</br>' + '<font color="#FF0000">' + toPercent(r.老用户 / r.彩铃用户), left: 550, top: 275, type: "start", width: 5, height: 5 },
                            demo_node_10_2: { name: "跳出" + '</br>' + r.彩铃用户跳出 + '</br>' + '<font color="#FF0000">' + toPercent(r.彩铃用户跳出 / r.彩铃用户), left: 550, top: 425, type: "start", width: 5, height: 5 },
                            demo_node_11: { name: "会员订购" + '</br>' + r.真会员订购 + '</br>' + '<font color="#FF0000">' + toPercent(r.真会员订购 / r.彩铃用户), left: 650, top: 350, type: "start", width: 5, height: 5 },
                            demo_node_11_1: { name: '取消支付' + '</br>' + r.真会员取消支付 + '</br>' + '<font color="#FF0000">' + toPercent(r.真会员取消支付 / r.真会员订购), left: 650, top: 275, type: "start", width: 5, height: 5 },
                            demo_node_11_2: { name: "接口错误" + '</br>' + r.真会员错误 + '</br>' + '<font color="#FF0000">' + toPercent(r.真会员错误 / r.真会员订购), left: 650, top: 450, type: "start", width: 5, height: 5 },
                            demo_node_11_3: { name: "需要短信二次确认" + '</br>' + r.短信二次确认 + '</br>' + '<font color="#FF0000">' + toPercent(r.短信二次确认 / r.真会员订购), left: 800, top: 450, type: "start", width: 5, height: 5 },
                            demo_node_12: { name: "成功" + '</br>' + r.会员会员成功 + '</br>' + '<font color="#FF0000">' + toPercent(r.会员会员成功 / r.真会员订购), left: 850, top: 350, type: "start", width: 5, height: 5 },
                            demo_node_13: { name: "总成功" + '</br>' + r.总成功 + '</br>' + '<font color="#FF0000">' + toPercent(r.总成功 / r.uv), left: 1000, top: 250, type: "start", width: 5, height: 5 },
                        },
                        lines: {
                            demo_line_1: { type: "sl", from: "demo_node_1", to: "demo_node_2", name: "", marked: false },
                            demo_line_2: { type: "sl", from: "demo_node_2", to: "demo_node_4", name: "", marked: false },
                            demo_line_3: { type: "sl", from: "demo_node_3", to: "demo_node_4", name: "", marked: false },
                            demo_line_4: { type: "sl", from: "demo_node_4", to: "demo_node_5", name: "", marked: false },
                            demo_line_4_1: { type: "sl", from: "demo_node_4", to: "demo_node_4_1", name: "", marked: false },
                            demo_line_5: { type: "sl", from: "demo_node_5", to: "demo_node_6", name: "", marked: false },
                            demo_line_5_1: { type: "sl", from: "demo_node_5", to: "demo_node_5_1", name: "", marked: false },
                            demo_line_5_a: { type: "sl", from: "demo_node_5", to: "demo_node_10", name: "", marked: false },
    
                            demo_line_6: { type: "sl", from: "demo_node_6", to: "demo_node_7", name: "", marked: false },
                            demo_line_6_1: { type: "sl", from: "demo_node_6", to: "demo_node_6_1", name: "", marked: false },
                            demo_line_7: { type: "sl", from: "demo_node_7", to: "demo_node_8", name: "", marked: false },
                            demo_line_7_1: { type: "sl", from: "demo_node_7", to: "demo_node_7_1", name: "", marked: false },
                            demo_line_7_2: { type: "sl", from: "demo_node_7", to: "demo_node_7_2", name: "", marked: false },
                            demo_line_7_a: { type: "sl", from: "demo_node_7_1", to: "demo_node_8", name: r.彩铃取消支付后成功, marked: false },
                            demo_line_7_b: { type: "sl", from: "demo_node_7_2", to: "demo_node_8", name: r.彩铃错误后成功, marked: false },
                            demo_line_8: { type: "sl", from: "demo_node_8", to: "demo_node_9", name: "", marked: false },
                            demo_line_8_1: { type: "sl", from: "demo_node_8", to: "demo_node_8_1", name: "", marked: false },
                            demo_line_8_2: { type: "sl", from: "demo_node_8", to: "demo_node_8_2", name: "", marked: false },
                            demo_line_8_3: { type: "sl", from: "demo_node_8", to: "demo_node_8_3", name: "", marked: false },
                            demo_line_9: { type: "sl", from: "demo_node_9", to: "demo_node_13", name: "", marked: false },
    
                            demo_line_10: { type: "sl", from: "demo_node_10", to: "demo_node_11", name: "", marked: false },
                            demo_line_10_1: { type: "sl", from: "demo_node_10", to: "demo_node_10_1", name: "", marked: false },
                            demo_line_10_2: { type: "sl", from: "demo_node_10", to: "demo_node_10_2", name: "", marked: false },
                            demo_line_11: { type: "sl", from: "demo_node_11", to: "demo_node_12", name: "", marked: false },
                            demo_line_11_1: { type: "sl", from: "demo_node_11", to: "demo_node_11_1", name: "", marked: false },
                            demo_line_11_2: { type: "sl", from: "demo_node_11", to: "demo_node_11_2", name: "", marked: false },
                            demo_line_11_3: { type: "sl", from: "demo_node_11", to: "demo_node_11_3", name: "", marked: false },
                            demo_line_11_a: { type: "sl", from: "demo_node_11_1", to: "demo_node_12", name: "二次成功" + r.会员取消支付成功, marked: false },
                            demo_line_11_b: { type: "sl", from: "demo_node_11_2", to: "demo_node_12", name: "二次成功" + r.会员错误后成功, marked: false },
                            demo_line_12: { type: "sl", from: "demo_node_12", to: "demo_node_13", name: "", marked: false },
                        }
                    };
                    demo.$max = 9;
                    demo.loadData(jsondata);
                }
            });
        }
    })
};

var util = {};

Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

util.formateDate = function (timestamp) {
    var newDate = new Date();
    newDate.setTime(timestamp);

    return newDate.format('yyyy.MM.dd hh:mm');
};

util.formateDat = function (timestamp) {
    var newDate = new Date();
    newDate.setTime(timestamp);

    return newDate.format('yyyy-MM-dd');
};

cha.rendsiteTime = function () {
    var t=new Date().getTime();
    console.log(util.formateDat(t));
    $("#end_time").val(util.formateDat(t));
    $("#start_time").val(util.formateDat(t- 86400000));
};

$(function(){
    cha.init();
});