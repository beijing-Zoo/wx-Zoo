// pages/explore/explore.js
var bmap = require('../../libs/bmap-wx.js');

Page({
  /**
   * 页面的初始数据
   */
	data: {
		type: 'list',
		latitude: '0',
		longitude: '0',
		markers: [
			{}
		],
		controls: [],
		exploreTypes: [
			'野外灭绝',
			'极危动物',
			'濒危动物',
			'易危动物',
			'珍稀动物'
		],
		animals: []
	},

	/**
	 * map control  tap event
	 */
	controlTap: function (res) {
		if (res.controlId === 1) {
			wx.navigateTo({
				url: '/pages/search/search',
			})
		}
		else {
		}
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		/**
		 * 获取手机硬件格式，定位控件位置
		 */
		wx.getSystemInfo({
			success: (res) => {
				this.setData({
					controls: [
						{
							id: 1,
							iconPath: './explore-map-icon/search-icon.png',
							position: {
								left: res.windowWidth / 5,
								top: res.windowHeight * 2 / 3,
								width: 74,
								height: 74
							},
							clickable: true
						},
						{
							id: 2,
							iconPath: './explore-map-icon/search-icon.png',
							position: {
								left: res.windowWidth * 3 / 5,
								top: res.windowHeight * 2 / 3,
								width: 74,
								height: 74
							},
							clickable: true
						}
					],
				})
			}
		});
	},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function () {
	},

  /**
   * 生命周期函数--监听页面显示
   */
	onShow: function () {
		/**
		 * 获取权限
		 */
		wx.getSetting({
			success: (res) => {
				wx.showModal({
					title: '是否授权当前位置',
					content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
					success: (res) => {
						if (res.confirm) {
							this.setData({
								type: "map"
							})
						}
						else {
							this.setData({
								type: "list"
							})
						}
					}
				})
			}
		});
		/**
		 * 初始化
		*/
		wx.getLocation({
			type: 'wgs84',
			success: (res) => {
				var latitude = res.latitude;
				var longitude = res.longitude;
				var user = "markers[" + 0 + "]";
				this.setData({
					type: "map",
					latitude: res.latitude,
					longitude: res.longitude,
					[user]: {
						iconPath: "./explore-map-icon/profile-icon.png",
						id: 0,
						latitude: res.latitude,
						longitude: res.longitude,
						width: 60,
						height: 60
					}
				}, () => {
					var BMap = new bmap.BMapWX({
						ak: '3FmUqGOgoGa6I35w5okHRcL7ib8G7Kru'
					});
					BMap.regeocoding({
						location: this.data.latitude + ',' + this.data.longitude,
						success: (res) => {
							let province = res.originalData.result.addressComponent.province;
							let animalData = [
								{
									zoo: '北京动物园',
									animals: [
										{
											name: '大象',
											latitude: 39.943872,
											longitude: 116.338933,
											iconPath: './explore-map-icon/elephant-icon.png'
										},
										{
											name: '长颈鹿',
											latitude: 39.948404,
											longitude: 116.340847,
											iconPath: './explore-map-icon/giraffe-icon.png'
										}
									]
								}
							]

							let markers = this.data.markers;
							animalData.forEach((zoo) => {
								zoo.animals.forEach((animal, key) => {
									markers = markers.concat({
										iconPath: animal.iconPath,
										id: key + 1,
										latitude: animal.latitude,
										longitude: animal.longitude,
										width: 60,
										height: 60
									})
								})
							})

							console.log(markers);

							this.setData({
								markers: markers
							})
						}
					})
				});
			},
			fail: function () {
				console.log('this fail')
			},
		});
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