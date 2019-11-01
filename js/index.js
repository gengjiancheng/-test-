// 轮播图
var $swip = $('.swipper'),
    $imgBox = $('.swipper .img_box'),
    $tipBox = $('.tipBox'),
    $lis = $('.img_box li'),
    $tips = $('.tip'),
    $leftBtn = $('.left_btn'),
    $rightBtn = $('.right_btn');

let n = 0,
    timer = null;

function getData() {
    $.ajax({
        url: './data.json',
        success: function (data) {
            render(data);
            init();
            tipClick();
        }
    })
}
getData();

function render(ary) {
    let str = '';
    let tipStr = '';
    ary.forEach((item, index) => {
        str += `<li><img src="${item.img}" alt=""></li>`
        tipStr += (index == 0 ? `<span class="tip current"></span>` : `<span class="tip"></span>`)
    })
    $imgBox.html(str);
    $tipBox.html(tipStr);
}

function init() {
    $lis = $('.img_box li');
    $tips = $('.tip');
    $lis.eq(0).siblings().hide();
    autoMove();
}

function autoMove() {
    timer = setInterval(() => {
        move();
    }, 2000)
}

function move() {
    n++;
    if (n >= $lis.length) {
        n = 0;
    };
    autoFocus();
    $lis.eq(n).css({
        opacity: 0
    }).show().animate({
        opacity: 1
    }, 300).siblings().animate({
        opacity: 0
    }, 300, function () {
        $lis.eq(n).siblings().hide();
    })
}

function autoFocus() {
    $tips.eq(n).addClass('current').siblings().removeClass('current');
}


$swip.on('mouseenter', function () {
    clearInterval(timer);
})
$swip.on('mouseleave', function () {
    autoMove();
})
$rightBtn.on('click', _.throttle(function () {
    move();
}, 500))
$leftBtn.on('click', _.throttle(function () {
    n--;
    if (n < 0) {
        n = $lis.length - 1;
    }
    n--;
    move();
}, 500))

function tipClick() {
    $tips.on('click', function () {
        let index = $(this).index();
        n = index;
        n--;
        move();
    })
}


// 跑马灯
var box = document.querySelector('.paomadeng'),
    ul = box.getElementsByTagName('ul')[0];
ul.innerHTML += ul.innerHTML;
ul.style.width = '1980px';
let timer1 = null;

function move1() {
    timer1 = setInterval(() => {
        if (box.scrollLeft >= 990) {
            box.scrollLeft = 0;
        }
        box.scrollLeft += 1;
    }, 10)
};
move1();
box.onmouseenter = function () {
    clearInterval(timer1);
}
box.onmouseleave = function () {
    move1();
}

// 回到顶部
var Rnav = document.querySelector('.Rnav');
var top1 = Rnav.querySelector('.top');
var winH = document.documentElement.clientHeight;
window.onscroll = function () {
    var scrH = document.documentElement.scrollTop;
    if (scrH > winH) {
        Rnav.style.display = 'block';
    } else {
        Rnav.style.display = 'none';
    }
}
var timer2 = null;
top1.onclick = function () {
    timer2 = window.setInterval(() => {
        if (document.documentElement.scrollTop == 0) {
            clearInterval(timer2);
            return;
        }
        document.documentElement.scrollTop -= 10
    }, 5)
}