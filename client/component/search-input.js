// component/search-input.js
Component({
  /**
   * 组件的属性列表
   */
	properties: {

	},

  /**
   * 组件的初始数据
   */
	data: {
		inputTxt: ''
	},

  /**
   * 组件的方法列表
   */
	methods: {
		searchInput: function (res) {
			console.log(res);
			this.setData({
				inputTxt: ''
			})
			wx.navigateTo({
				url: '/pages/search/search'
			})
		}
	},


})
