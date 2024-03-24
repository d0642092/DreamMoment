show_information = (culture) =>{
    show = (name, locate, introduce)=>{
        var title = document.getElementById("culture");
        var loc = document.getElementById("culture-location");
        var intro = document.getElementById("culture-introduce");
        console.log(name, locate, introduce);
        title.innerHTML  = name;
        loc.innerHTML  = locate;
        intro.innerHTML = introduce;
    }
    console.log(culture);
    fetch('/json/culture.json').then((response) => response.json()).then(
    (info_block) => {
        information = info_block[culture];
        show(information.name, information.locate, information.introduce);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("Swiper initialized");
    var mySwiper = new Swiper('.swiper-container', {
        // Swiper 配置
        effect: 'cube',
        // 其他配置
        cubeEffect: {
            slideShadows: true, // 兩側陰影
            shadow: true, // 頂部陰影
            shadowOffset: 20, // 偏移量
            shadowScale: 0.94 // 縮放比
        },
        pagination: {
            el: '.swiper-pagination', // 分業器CSS選擇
            clickable: true // 點擊
        },
        autoplay:{
            delay: 3000, // ms
        },
        loop: true,
        on: {
            slideChangeTransitionEnd: function () {
                // 當前ID
                var activeSlideId = mySwiper.slides[mySwiper.activeIndex].id;
                show_information(activeSlideId);
            }
        }
    });
});
