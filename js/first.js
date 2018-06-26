/**
 * Created by Administrator on 2018/6/26.
 */
$(function () {
  //通过ajax动态获取一级分类的内容渲染在页面上
  var currentPage = 1;
  var pageSize = 3;
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: 'json',
      success: function (info) {
        console.log(info)
        // 将数据和模板相结合 template
        var str = template("tmp", info);
        $('tbody').html(str);

        //  初始化分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentPage,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    })
  }

//点击添加分类按钮  显示模态框

  $('#addBtn').click(function () {
    $('#addmodal').modal('show');
  })

  //校验表单
  $('#form').bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"一级分类名称不能为空"
          }
        }
      }
    }


  })
  //校验成功
  $('#form').on("success.form.bv",function(e){
    e.preventDefault();
    //想后台发送数据
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        console.log(info)
        if(info.success){
          $('#addmodal').modal('hide');
          currentPage=1;
          render();
          $('#form').data('bootstrapValidator').resetForm(true);

        }
      }
    })
  })

})