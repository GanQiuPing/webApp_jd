/**
 * Created by Smile on 2017/11/2.
 */

//页面加载时调用
window.addEventListener('load', function () {
    // 调用 搜索框透明度 渐变   方法
    searchEffect();
    //调用 倒计时 函数
    countTimeEffect();
    //调用 轮播图 函数
    slideEffect();
})


/* 需求： 实现 搜索框 透明度渐变
 *   页面滚动在轮播图范围时  透明度慢慢渐变
 *   页面滚动距离 超过 轮播图的高度时  透明度为1
 * */

/*
 * 实现思路：
 *   1. 添加 滚动事件
 *   2. 获取当前滚动的距离
 *   3. 获取轮播图的高度
 *   4. 设置透明度  当前滚动距离 / 轮播图高度
 *   5.  如果 在轮播图范围内 渐变透明度 ， 否则 透明度固定为1
 * */

function searchEffect() {
    // 添加滚动事件
    window.addEventListener('scroll', function () {
        // 获取 当前 滚动的 距离
        // var scrollTop1 = document.body.scrollTop;   //这种方式 获取不到
        // console.log(scrollTop1);
        var scrollTop = document.documentElement.scrollTop;
        // console.log(scrollTop);
        //获取 轮播图的高度
        var slideHeight = document.querySelector('#section').offsetHeight;
        // console.log(slideHeight);
        // 判断距离是否小于轮播图的高度，如果小于 颜色渐变  ，大于就设置为1
        if (scrollTop < slideHeight) {
            var opacity = scrollTop / slideHeight;
            document.querySelector('#header').style.backgroundColor = "rgba(201,21,35," + opacity + ")";
        } else {
            document.querySelector('#header').style.backgroundColor = "rgba(201,21,35,1)";
        }
    })
}


/*
 *  需求：  秒杀倒计时
 *
 * 实现思路：
 *   1. 定义一个总时间
 *   2. 设置一个定时器每秒执行一次 1000毫秒，在定时器里面执行  总时间--
 *   3. 分别求出  时分秒
 *       时: 总时间 / 3600
 *       分：总时间 % 3600 / 60
 *       秒： 总时间 % 60
 *       十位 ： 21 / 10 =2
 *       个位：  21 % 10 = 1
 *   4. 获取所有 span 分别设置时 分 秒 对应区域
 * 5. 获取当前时间  和 未来时间 （今年12点） 算出时间差
 *     未来时间 - 当前时间
 * */

function countTimeEffect() {
    //定义一个总时间   未来时间
    // var futureTime = new Date("Nov 3 , 2017 08:02:00").getTime()/1000;
    var futureTime = new Date(2017, 10, 03, 08, 03, 00).getTime() / 1000;
    //当前时间
    var nowTime = new Date().getTime() / 1000;
    //时间差 =  未来时间  -  当前时间
    var times = Math.floor(futureTime - nowTime);
    console.log(times);  //得到是毫秒数

    //获取所有span  (页面上放 时分 秒对应区域)
    var span = document.querySelectorAll('.time > span');

    //定义计时器变量
    var timeId = null;
    //定义计时器
    timeId = setInterval(function () {
        times--;
        if (times <= 0) {
            //把当前时间设置为0
            times = 0;
            //清空计时器
            clearInterval(timeId);
        }
        // 计算 时分秒
        var hours = times / 3600;
        var minus = times % 3600 / 60;
        var seconds = times % 60;
        //把时分秒 赋值 span   计算 个位（%）   十位（/）
        span[0].innerHTML = Math.floor(hours / 10);
        span[1].innerHTML = Math.floor(hours % 10);
        span[3].innerHTML = Math.floor(minus / 10);
        span[4].innerHTML = Math.floor(minus % 10);
        span[6].innerHTML = Math.floor(seconds / 10);
        span[7].innerHTML = Math.floor(seconds % 10);
    }, 1000)
}

/*
 * 需求： 图片轮播 （无缝轮播）
 *
 *
 * */

/*
 *  实现思路：
 *   1. 定义一个图片索引，从1开始 （因为默认轮播图的ul有一张是位移的，所以当前索引为1）
 *   2. 定义一个计时器 （间隔多少毫秒切换图片）
 *   3. 在计时器里面索引要 ++
 *   4. 计算当前索引图片需要位移的距离设置到轮播图上的ul上
 *   5. 给当前轮播图ul添加 过渡效果
 *   6. 给 slide 添加一个过渡事件，等第8张切换到第1张图过渡完成后添加
 *   7. 判断 index >= 9时就是第8张到第1张图切换完毕了 尽量写大于等于9（因为过渡事件有个小bug）
 *   8. 索引设置为1 （还要位移图片） ，清除过渡
 *   9. 遍历删除 所有小圆点的 active
 *   10. 给当前index对应的小圆点添加active
 * */

function slideEffect() {
    //定义索引 (因为默认显示的图片是第一张图，位移了一张 8)
    var index = 1;
    //获取轮播图的ul元素
    var slideUl = document.querySelector('#section ul:first-of-type');
    // console.log(slideUl);
    //获取 ul 宽度
    var slideWidth = document.querySelector('#section').offsetWidth;
    console.log(slideWidth);

    //获取 小圆点
    var circleLis = document.querySelectorAll('#section ul:last-of-type li')

    var timeId = null;

    //是否允许滑动
    var flag = true;

    /*
     * 添加节流阀 ：限制当过渡还没有完成的时候不允许滑动
     * 1. 定义一个变量 flag == true (默认是可以滑动的)
     * 2. 如果添加了过渡效果，就把 flag==false
     * 3. 判断 如果flag===true才能执行滑动操作
     * 4. 过渡完成事件触发后（过渡完成） flag==true
     * */


    //定义计时器
    function startTime() {
        timeId = setInterval(function () {
            index++;
            //计算当前索引的图片需要位移的距离设置到轮播的ul上
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
            // slideUl.style.transform = 'translateX(' + (-index * 10) + '%)';
            slideUl.style.transition = "all 0.2s";
            flag = false;
        }, 1000);
    }

    //调用 计时器
    startTime();


    //添加过渡事件
    slideUl.addEventListener('transitionend', function () {
        //过渡完成 后可以滑动滑动
        flag = true;
        console.log(index);
        if (index >= 9) {
            //回到第一张
            index = 1;
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
            // slideUl.style.transform = 'translateX(' + (-index * 10) + '%)';
            //清除过渡
            slideUl.style.transition = 'none';

        } else if (index <= 0) {
            index = 8;
            //设置位移
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
            // slideUl.style.transform = 'translateX('+(-index*10)+'%)';
            //清除过渡
            slideUl.style.transition = 'none';

        }
        //遍历删除 所有小圆点  active
        for (var i = 0; i < circleLis.length; i++) {
            //通过classList删除
            circleLis[i].classList.remove('active');
        }
        //给当前index对应 小圆点 添加active
        circleLis[index - 1].classList.add('active');
    })

    //滑动轮播 图
    //定义变量
    var startX = moveX = distanceX = 0;
    //滑动开始 事件
    slideUl.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        //清除计时器
        clearInterval(timeId);
    })
    //滑动中移动事件
    slideUl.addEventListener('touchmove', function (e) {
        //判断如果flag == true 允许滑动的时候才执行获取滑动中的位置计算设置距离代码
        if (flag == true) {
            moveX = e.touches[0].clientX;
            //计算手指移动的位置
            distanceX = moveX - startX;
            //设置位移的时候要加上轮播图本来就已经位移值
            slideUl.style.transform = 'translateX(' + (-index * slideWidth + distanceX) + 'px)';
            //滑动时要把过渡清除
            slideUl.style.transition = 'none';
        }
    })

    //滑动离开事件
    slideUl.addEventListener('touchend', function () {
        //判断滑动距离 （取绝对值  因为距离有可能是负值）是否超过一张图的1/3
        if (Math.abs(distanceX) > (slideWidth / 3)) {
            //如果超过1/3就翻页
            //判断滑动的距离是正还是负值
            if (distanceX > 0) {
                //正值 表示从左到右 滑动， 切换到上一张
                index--;
                //设置位移 和 过渡 让当前轮播图 位移到 上一张位置
                slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
                slideUl.style.transition = 'all 0.2s';
                flag = false;
            } else {
                //负值 表示从右往左滑  切换下一张图
                index++;
                slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)'
                slideUl.style.transition = 'all 0.2s';
                flag = false;
            }
        } else {
            //不超过1/3就回弹
            //设置位移和 过渡 让当前轮播图的原来位置
            slideUl.style.transform = 'translateX(' + (-index * slideWidth) + 'px)';
            slideUl.style.transition = 'all 0.2';
            flag = false;
        }
        //滑动开始清除了计时器，滑动结束重新添加回计时器
        startTime();
        //当上一次滑动结束后把上一次距离清空  每次滑动结束他的滑动距离 也没用了，所以要清空
        startX = moveX = distanceX = 0;
    })

}












