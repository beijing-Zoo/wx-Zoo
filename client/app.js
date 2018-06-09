//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)

				// wx.login({
				// 	success: function (res) {
				// 		if (res.code) {
				// 			//发起网络请求
				// 			wx.request({
				// 				url: 'https://bdxfzdkf.qcloud.la/onLogin',
				// 				data: {
				// 					code: res.code
				// 				},
				// 				success: function (res) {
				// 					console.log(res.data)
				// 				}
				// 			})
				// 		}
				// 	}
				// })

    }
})