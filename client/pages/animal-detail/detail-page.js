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
		animal: "熊猫",
		activePage: 0,
		detailImage: '',
		detailVideo: '',
		detailBtns: [],
		videoDisplay: true,
		popDisplay: true,
		foods: [
			{
				answer: 0,
				choice: [
					{ src: './food-image/bird.png', text: '鸟' },
					{ src: './food-image/branch.png', text: '树枝' }
				]
			},
			{
				answer: 0,
				choice: [
					{ src: './food-image/grass.png', text: '小草' },
					{ src: './food-image/flower.png', text: '花' }
				]
			},
			{
				answer: 0,
				choice: [
					{ src: './food-image/melon.png', text: '瓜' },
					{ src: './food-image/corn.png', text: '玉米' }
				]
			}
		]
	},

	/**
	 * 圆盘选择器
	 */
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
		if (changeRotate > 12 && this.data.rotateTimes < 1) {
			this.setData({
				turntableRotate: this.data.turntableRotate -= 72,
				rotateTimes: this.data.rotateTimes + 1,
				activePage: this.data.activePage + 1 > 4 ? 0 : this.data.activePage + 1
			})
		}
		else if (changeRotate < -12 && this.data.rotateTimes > -1) {
			this.setData({
				turntableRotate: this.data.turntableRotate += 72,
				rotateTimes: this.data.rotateTimes - 1,
				activePage: this.data.activePage - 1 < 0 ? 4 : this.data.activePage - 1
			})
		}
		else if (changeRotate == 0 && this.data.rotateTimes == -1) {
			this.setData({
				turntableRotate: this.data.turntableRotate -= 72,
				rotateTimes: this.data.rotateTimes + 1,
				activePage: this.data.activePage + 1 > 4 ? 0 : this.data.activePage + 1
			})
		}
		else if (changeRotate == 0 && this.data.rotateTimes == 1) {
			this.setData({
				turntableRotate: this.data.turntableRotate += 72,
				rotateTimes: this.data.rotateTimes - 1,
				activePage: this.data.activePage - 1 < 0 ? 4 : this.data.activePage - 1
			})
		}
	},

	bindFeaturesVideoPlay: function () {
		this.videoContext.requestFullScreen({
			direction: 90
		});
	},

	videoClose: function () {
		this.setData({
			videoDisplay: true
		});
		this.videoContext.exitFullScreen();
		this.videoContext.pause();
	},

	videoBtn: function (evt) {
		this.setData({
			videoDisplay: false
		}, () => console.log(this.data.videoDisplay))
		this.videoContext.seek(0);
		this.videoContext.play();
	},

	popTap: function (event) {
		this.setData({ popDisplay: false, popText: event.target.dataset.item.text })
	},

	closePop: function (event) {
		this.setData({ popDisplay: true })
	},

	query: wx.createSelectorQuery(),
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		let animal = "";
		switch (Number(options.key)) {
			case 1: {
				animal = "大象";
				break;
			}
			case 6: {
				animal = "长颈鹿";
				break;
			}
			case 3: {
				animal = "猿猴";
				break;
			}
		}
		if (animal) {

			//得到animal的数据
			let animalData = {
				detail: {
					image: './detail-elephant.png',
					video: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
					// video: 'https://static.kelexuexi.com/videos/02%E5%B7%A6%E8%BE%B9%E6%A0%8F%E7%9A%84%E4%BD%BF%E7%94%A8.webm',
					buttons: [{ x: 446, y: 188, text: '大象的耳朵可以散发热量，保持身体凉爽，但有时非洲大陆的温度实在太高了，所以非洲象需要非常大的耳朵散热。' }]
				}
			}

			this.setData({
				animal: animal,
				detailImage: animalData.detail.image,
				detailVideo: animalData.detail.video,
				detailBtns: animalData.detail.buttons
			})
		}
	},



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function () {
		this.videoContext = wx.createVideoContext('featuresVideo')
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