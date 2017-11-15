/**
 * Created by Smile on 2017/11/6.
 */

window.addEventListener('load', function () {
    //调用 左侧效果
    slideLeft();
})

//左侧滑动效果
function slideLeft() {
    //1. 要获取滑动的　ul
    var slideUl = document.querySelector('.categoty-left ul');
    //2. 定义滑动开始的 y  滑动中的y 滑动距离y  当前已经滑动到 的y
    var startY = moveY = distanceY = currentY = 0;

    // 添加 滑动事件
    slideUl.addEventListener('touchstart', function (e) {
        //3.  滑动开始的位置
        startY = e.touches[0].clientY;
    })

    // 添加滑动中的事件
    slideUl.addEventListener('touchmove', function (e) {
        //4. 移动中的 垂直位置
        moveY = e.touches[0].clientY;
        //5. 计算滑动的距离   开始位置 - 移动中的位置
        distanceY = moveY - startY;

        //  12.2 判断要设置的滑动值 ，是否在最大 和 最小的范围区间  小于最大值  大于最小值 才能移动
        if((currentY + distanceY) < maxSlideVal && (currentY +distanceY)> minSlideVal){

            //6.  给左侧要滑动的ul位置位移
            slideUl.style.transform = 'translateY('+(currentY+distanceY)+'px)';
            slideUl.style.transition = 'none';
        }
  
    })

    //  添加滑动结束事件，记录每次滑动距离
    slideUl.addEventListener('touchend',function(){
        // 7. 记录每次滑动距离
        currentY += distanceY;
        // 13. 判断 当前滑动的值   是否大于最大的定位值 
       if(currentY > maxPosition){
        //    如果大于最大定位值   滑动到最大定位值 
            slideUl.style.transform = 'translateY('+maxPosition+')';
            slideUl.style.transform = 'all 0.2s';
            // 当改变位置时候  currentY 也要更新
            currentY = maxPosition;
       }
        // 14 . 判断当前滑动的值  是否小于最小定位值
       if(currentY < minPosition){
            slideUl.style.transform='translateY('+minPosition+')';
            slideUl.style.transition = 'all 0.2s';
            // 更新 currentY 值 
            currentY = minPosition;
       }
    });

    // 定义一些滑动限制，限制如果往下滑最多滑动到200位置
    //8.  最大允许滑动的值 
    var maxSlideVal = 200;
    //9.  获取 ul高度
    var slideUlHeight = slideUl.offsetHeight;
    //10.  获取 ul父元素高度
    var categoryHeight = document.querySelector('.categoty-left').offsetHeight;
    //11.  最小允许滑动的值 =  -ul的高 - div的高 +200
    var minSlideVal = -(slideUlHeight - categoryHeight + 200);
    console.log(maxSlideVal);
    console.log(minSlideVal);

    // 12. 当松开手之后，如果当前位移的超过了 最大允许定位 和 最小允许定位值 时
    // 回到最大定位 或 最小定位值  松开手时候判断用
    // 最大的定位值 div 和 ul的  顶部粘在一起的时候
    var maxPosition = 0;
    // 最小定位值 div 和 ul 底部 粘在一起时
    var minPosition = -(slideUlHeight - categoryHeight);

      // 15. 实现点击 的时候 让当前点击 Li 移动到顶部
       // 获取 所有 li元素
       var lis = document.querySelectorAll('.categoty-left ul li');
       console.log(lis);
       // 16. 给父元素添加事件 获取真正点击 的子元素
       //绑定了 fastclick之后 直接添加click事件就可以
       slideUl.addEventListener('click',function(e){
            //17. 清空所有Li 的active 类名
            for(var i = 0 ; i < lis.length;i++){
                lis[i].classList.remove('active');
                //给li添加一个索引号
                lis[i].index = i;
            }
            // 18 给 当前点击 的li添加active类名  e.target获取 的
            var li = e.target.parentNode;
            console.log(li);
            li.classList.add('active');
            var slideHeight = -li.index * li.offsetHeight;
            // 19判断当前位移的时候是否超过最小定位值
            if(slideHeight < minPosition){
                //就位移到最小定位值  -700
                currentY = minPosition;
            }else {
                //如果没有超过就按照计算的值位移
                currentY = slideHeight;
            }
            // 20. 设置位移  (选中当前元素时 移动到顶部)
            slideUl.style.transform = 'translateY('+currentY+'px)';
            slideUl.style.transition = 'all 0.2s';
       });
}
















