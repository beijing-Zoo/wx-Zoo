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
		animals: [],
		goIcon: "",
		goName: '',
		goKey:  null
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
			console.log(123);
		}
	},

	/**
	 * 
	 */
	goTap:  function() {
		console.log(this.data.goName)
		wx.navigateTo({
			url: '/pages/animal-detail/detail-page?key=1',
			success: function(res) {},
			fail: function(res) {},
			complete: function(res) {},
		})
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
								top: res.windowHeight * 3 / 4,
								bottom: 96,
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
								top: res.windowHeight * 3 / 4,
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
				var user = "markers[" + 0 + "]";
				this.setData({
					type: "map",
					// latitude: 39.941857,
					// longitude: 116.331933,
					latitude: res.latitude,
					longitude: res.longitude,
					[user]: {
						iconPath: "./explore-map-icon/profile-icon.png",
						id: 0,
						// latitude: 39.941857,
						// longitude: 116.331933,
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
											iconPath: './explore-map-icon/elephant-icon.png',
											key: 1
										},
										{
											name: '长颈鹿',
											latitude: 39.942384,
											longitude: 116.334100,
											iconPath: './explore-map-icon/giraffe-icon.png',
											key: 2
										},
										{
											name: '猿猴',
											latitude: 39.941808,
											longitude: 116.332104,
											iconPath: './explore-map-icon/fox-icon.png',
											key: 3
										}
									]
								}
							]

							let markers = this.data.markers;
							animalData.forEach((zoo) => {
								zoo.animals.forEach((animal, key) => {
									if (Math.abs(this.data.latitude - animal.latitude) < 0.0003 && 
										Math.abs(this.data.longitude - animal.longitude) < 0.0003) {
										this.setData({
											goIcon: animal.iconPath,
											goName: animal.name,
											goKey: animal.key
										})
									}
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