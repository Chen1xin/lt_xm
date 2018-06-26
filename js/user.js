/**
 * Created by Administrator on 2018/6/26.
 */
//通过ajax向后台获取数据熏染在页面中
$(function(){
  var currentPage=1; //当前页
  var pageSize=5; //每页条数
  $.ajax({
    type:'get',
    url:"/user/queryUser",
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    dataType:'json',
    success:function(info){
      console.log(info)
    }


  })
})