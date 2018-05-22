// pages/animal-detail/detail-page.js
Page({
  /**
   * 页面的初始数据
   */
	data: {
		turntableX: 0,
		turntableY: 0,
		turntableRotate: 0,
		beforeRotate: 0,
		afterRotate: 0,
		rotateTimes: 0,
		animal:"熊猫"
	},

	touchstart: function (evt) {
		var turntableX = 187.5;
		var turntableY = 724.5;
		var rotate = - Math.floor(180 * (Math.atan2(turntableX - (evt.touches[0].pageX), turntableY - evt.touches[0].pageY)) / Math.PI)
		this.setData({
			beforeRotate: rotate,
			rotateTimes: 0,
		})
	},

	touchmove: function (evt) {
		var turntableX = 187.5;
		var turntableY = 724.5;
		var rotate = - Math.floor(180 * (Math.atan2(turntableX - (evt.touches[0].pageX),
			turntableY - evt.touches[0].pageY)) / Math.PI);
		let changeRotate = this.data.beforeRotate - rotate;
		this.setData({
			afterRotate: changeRotate
		})
		if (changeRotate > 15 && this.data.rotateTimes < 1) {
			this.setData({
				turntableRotate: this.data.turntableRotate -= 72,
				rotateTimes: this.data.rotateTimes + 1
			})
		}
		else if (changeRotate < -15 &&this.data.rotateTimes > -1) {
			this.setData({
				turntableRotate: this.data.turntableRotate += 72,
				rotateTimes: this.data.rotateTimes - 1
			})
		}
		else if (changeRotate == 0 && this.data.rotateTimes == -1) {
			this.setData({
				turntableRotate: this.data.turntableRotate -= 72,
				rotateTimes: this.data.rotateTimes + 1
			})
		}
		else if (changeRotate == 0 && this.data.rotateTimes == 1) {
			this.setData({
				turntableRotate: this.data.turntableRotate += 72,
				rotateTimes: this.data.rotateTimes - 1
			})
		}
	},

	touchend: function (evt) {
	},

	query: wx.createSelectorQuery(),
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		console.log(1);
		let animal =  "";
		switch (Number(options.key)) {
			case 1: {
				animal ="大象";
				break;
			}
			case 2: {
				animal = "长颈鹿";
				break;
			}
			case 3: {
				animal = "猿猴";
				break;
			}
		}
		console.log(animal);
		if (animal) {
			this.setData({
				animal : animal
			})
		} 
	},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function () {
		console.log(2)
	},

  /**
   * 生命周期函数--监听页面显示
   */
	onShow: function () {
	console.log(3)
	},

  /**
   * 生命周期函数--监听页面隐藏
   */
	onHide: function () {

	},

  /**
   * 生命周期函数--监听页面卸载
   */
	onUnload: function () {

	},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
	onPullDownRefresh: function () {

	},

  /**
   * 页面上拉触底事件的处理函数
   */
	onReachBottom: function () {

	},

  /**
   * 用户点击右上角分享
   */
	onShareAppMessage: function () {

	}
})