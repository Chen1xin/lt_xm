/**
 * Created by Administrator on 2018/6/26.
 */
$(function(){
  //通过ajax动态获取一级分类的内容渲染在页面上
  var currentPage=1;
  var pageSize=2;
  render();
 function render(){
   $.ajax({
     type:'get',
     url:"/category/queryTopCategoryPaging",
     data:{
       page:currentPage,
       pageSize:pageSize,
     },
     dataType:'json',
     success:function(info){
       console.log(info)
       // 将数据和模板相结合 template
  var str=template("tmp",info);
     }
   })
 }
//点击添加分类按钮  显示模态框

  $('#addBtn').click(function(){
    $('#addmodal').modal('show');
  })
})