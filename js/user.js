/**
 * Created by Administrator on 2018/6/26.
 */
//通过ajax向后台获取数据熏染在页面中
$(function(){
  var currentPage=1; //当前页
  var pageSize=5; //每页条数
  var currentID;
  var isDelete;
  render();
  function render(){
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
        var str=template("tmp",info)
        $('tbody').html(str);

        //初始化分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage=page;
            render();
          }
        });

      }


    })
    //点击启用禁用按钮弹出模态框
    $('tbody').on('click','.btn',function(){
      $('#removemodal').modal('show');
      currentID= $(this).parent().data('id');
      // 点击禁用按钮, 让用户变成禁用状态, 让 isDelete变成 0 => 将来传给后台就传 0
      isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
      console.log(currentID)
      //通过ajax向后台请求isDelate状态
      $('.sureBtn').click(function(){
        $.ajax({
          type:"post",
          url:"/user/updateUser",
          data:{
            id:currentID,
            isDelete:isDelete,
          },
          dataType:'json',
          success:function(info){
            console.log(info)
            $('#removemodal').modal('hide');
            render();


          }
        })

      })
    })
  }
})