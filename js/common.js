/**
 * Created by Administrator on 2018/6/25.
 */

// 5. 如果当前用户没有登录, 需要拦截到登陆页面
//    前端是不知道用户是否登陆了的, 但是后台知道, 想知道, 问后台, (访问后台接口即可)
//    注意: 需要将登录页, 排除在外面, 就是登录页可以不登录就访问的
if(location.href.indexOf("login.html")===-1){
  // 如果索引为 -1, 说明在地址栏参数中没有 login.html 需要登陆拦截
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    dataType:"json",
   success:function(info){
     if(info.error===400){
       //当前用户没有登录,拦截到登录页
       location.href="login.html";
     }
     if(info.success){
    //当前用户已经登录,不需要拦截,啥事都不用干,让用户访问页面即可
    //   alert("当前用户已登录")
     }
   }

  })
}

// ajax 全局事件
// .ajaxComplete()  每个ajax完成时调用, (不管成功还是失败)
// .ajaxSuccess()   每个ajax成功时调用
// .ajaxError()     每个ajax失败时调用
// .ajaxSend()      每个ajax发送前调用

// .ajaxStart()     第一个ajax发送时调用
// .ajaxStop()      所有的ajax请求都完成时调用

// 第一个ajax发送时, 开启进度条
$(document).ajaxStart(function() {
  NProgress.start();
});

// 所有的ajax请求完成时调用, 关闭进度条
$(document).ajaxStop(function() {

  // 模拟网络延迟
  setTimeout(function() {
    NProgress.done();
  }, 500)
});

$('.lt_header .icon_menu').click(function(){
  console.log(1);
  $('.lt_aside').toggleClass('hidemenu');
  $('.lt_header').toggleClass('hidemenu');
  $('.breadcrumb').toggleClass('hidemenu');
})

//点击分类管理 下拉菜单
$('.slide').click(function(){

  $('.slideDown').stop().slideToggle();
})

//导航栏点击高亮效果
//$('.one>a').each(function(index,ele){
//$(ele).click(function(){
//  $('.one>a').removeClass('current');
//  $(this).addClass('current');
//})
//})

//模态框

//点击登出按钮显示模态框
$(".icon_logout").click(function(){
  $('#modal').modal('show');
})
//点击模态框登出按钮退出登录
$('.logout').click(function(){
  $.ajax({
    type:"get",
    url:"/employee/employeeLogout",
    dataType:"json",
    success:function(info){
      if(info.success){
        location.href="login.html";
      }
    }
  })
})

//表图部分
//柱状图
// 基于准备好的dom，初始化echarts实例
var EChart_1 = echarts.init(document.querySelector('.EChart_1'));

// 指定图表的配置项和数据
var option = {
  //大标题
  title: {
    text: '2017年注册人数'
  },
  //提示框组件
  tooltip: {
    triggle:"item"
    // 必须要移动到数据项才显示提示框
    //trigger: "axis"   // 必须要移动到数据项才显示提示框
  },
  //?图例
  legend: {
    // data 里面的内容必须和 数据项的 name 组合使用, 必须一一比对
    data:['人数']
  },
  xAxis: {
    data: ["1月","2月","3月","4月","5月","6月"]
  },
  yAxis: {},
  //数据项
  series: [{
    name: '人数',
    type: 'bar',
    data: [1000, 1500, 1800, 1200, 2500, 1800]
  }]
};

// 使用刚指定的配置项和数据显示图表。
EChart_1.setOption(option);

//饼图
var EChart_2 = echarts.init(document.querySelector('.EChart_2'));
option = {
  title : {
    text: '热门频品牌销售',
    subtext: '2018年6月',
    x:'center'
  },
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['奈克','阿迪','新百伦','李宁','阿迪王']
  },
  series : [
    {
      name: '访问来源',
      type: 'pie',
      radius : '55%',
      center: ['50%', '60%'],
      data:[
        {value:335, name:'奈克'},
        {value:310, name:'阿迪'},
        {value:234, name:'新百伦'},
        {value:135, name:'李宁'},
        {value:1548, name:'阿迪王'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
// 使用刚指定的配置项和数据显示图表。
EChart_2.setOption(option);
