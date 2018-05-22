/**
 * honoraryTitle  荣誉称号
 */

const honoraryTitle = 'honoraryTitle';


// 设置荣誉称号
const setHonnraryTitle = res => {
  wx.setStorage({
    key: honoraryTitle,
    data: res,
  })
}

// 获取荣誉称号
const getHonnraryTitle = res => {
  return wx.getStorageSync(honoraryTitle)
}






module.exports = {
  setHonnraryTitle: setHonnraryTitle,
  getHonnraryTitle: getHonnraryTitle
}
