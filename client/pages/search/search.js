// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
	data: {
		returns: [],
		recommends: [{ nkey: 1, name: '非洲象' }, { nkey: null, name: '黑猩猩' }, { nkey:null, name:'白犀牛'},
			{ nkey: null, name: '美洲鳄' }, { nkey: null, name:'鹈鹕'}]
	},

  /**
   * 生命周期函数--监听页面加载
   */

maybeTap: function(event) {
	console.log(event.target.dataset.nkey);
	event.target.dataset.nkey && wx.navigateTo({
		url: '/pages/animal-detail/detail-page?key=' + event.target.dataset.nkey,
	})
},

	onLoad: function (options) {

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