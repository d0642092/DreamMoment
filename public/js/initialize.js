// init.js

// parent.append(newChild) end of parent, parent.prepend(newChild) begin of parent
init_navigation = (names) => {
    init_nav_list = (href, title) => {
        var a = document.createElement("a");
        var li = document.createElement("li");
        a.className = "nav-link";
        a.href = href;
        a.appendChild(document.createTextNode(title));
        li.className = "nav-item";
        li.appendChild(a);
        return li
    }

    var navigation = document.createElement("nav");
    var list_block = document.createElement("div");
    var link_list = document.createElement("ul");
    var main_title = document.createElement("a");
    var new_span = document.createElement("span");
    var new_button = document.createElement("button");
  
    // <!--  collapse menu    -->
    new_span.className = "navbar-toggler-icon";
    new_button.className = "navbar-toggler";
    new_button.type = "button";
    new_button.setAttribute("data-toggle", "collapse");
    new_button.setAttribute("data-target", "#collapsibleNavbar");
    new_button.appendChild(new_span);
    // <!--  collapse menu    -->
  
    main_title.className = "navbar-brand";
    main_title.href = "/";
    main_title.appendChild(document.createTextNode("DreamMoment"));
        
    link_list.className = "navbar-nav";
    for(var i=0; i<names.length;i+=1){
        link_list.appendChild(init_nav_list(names[i].Link,names[i].Title));
    }
    list_block.className = "collapse navbar-collapse justify-content-end";
    list_block.id = "collapsibleNavbar";
    list_block.appendChild(link_list);
    
    navigation.className = "navbar navbar-expand-sm navbar-custom";
    navigation.appendChild(main_title);
    navigation.appendChild(new_button);
    navigation.appendChild(list_block);
    document.body.prepend(navigation);
    // var nav = document.getElementById(id);
    // nav.prepend(new_nav);
}

// index.html
init_icon_link = (id, title, href, src) => {
    var icon = document.getElementById(id);
    var icon_block = document.createElement("div");
    var icon_img = document.createElement("img");
    var icon_link = document.createElement("a");
    // element setting
    icon_img.className = "icon-image";
    icon_img.src = src;
    icon_link.href = href;
    icon_link.appendChild(icon_img);
    icon_link.appendChild(document.createElement("br"));
    icon_link.appendChild(document.createTextNode(title));
    icon_link.id = "icon-title"
    // combine elements
    icon_block.className = "icon-block col-lg-3 col-md-3 col-5";
    icon_block.appendChild(icon_link);

    // show element
    icon.appendChild(icon_block);
}
// donate, learnm competition, volunteer.html
init_info_block = (src, title, describe, link, info_id) =>{
    var container = document.getElementById("info-container");
    var info_block = document.createElement("div");
    var img_block = document.createElement("div");
    var img = document.createElement("img");
    var desc_block = document.createElement("div");
    var desc_title = document.createElement("h3");
    var desc = document.createElement("p");
    var desc_link = document.createElement("a");
    var split_hr = document.createElement("hr")
    img.className = "img-fluid rounded mb-3 mb-md-0";
    img.src = src;
    img.alt = title;
    img_block.className = "col-md-7 img-block";
    img_block.appendChild(img);
        
    desc_title.appendChild(document.createTextNode(title));
    desc.className = "para-txt";
    desc.appendChild(document.createTextNode(describe));
    desc_link.className = "btn btn-primary";
    desc_link.href = link;
    desc_link.appendChild(document.createTextNode("了解更多"));
    desc_block.className = "col-md-5 desc-block";
    desc_block.id = "desc-block-" + info_id;
    desc_block.appendChild(desc_title);
    desc_block.appendChild(document.createElement("hr"));
    desc_block.appendChild(desc);
    desc_block.appendChild(document.createElement("hr"));
    desc_block.appendChild(desc_link);
    
    info_block.className = "row";
    info_block.id = "info-block-" + info_id;
    info_block.appendChild(img_block);
    info_block.appendChild(desc_block);
    
    container.appendChild(document.createElement("br"));
    container.appendChild(info_block);
    container.appendChild(split_hr);
}

// volunteer.html
insert_element = (block_id, element, id) => {
    // <a class="btn btn-primary" data-toggle="collapse" data-parent="#info-container" href="#collapseOne">查看志工相關活動</a>
    var block = document.getElementById(block_id);
    switch (element){
        case "link":
            var link = document.createElement("a");
            link.className = "btn btn-primary"
            link.style = "margin-left:4px";
            link.href = "#more-info-" + id;
            link.setAttribute("data-toggle", "collapse");
            link.setAttribute("data-parent", "#info-container");
            link.appendChild(document.createTextNode("查看志工相關活動"));
            block.appendChild(link);
            break;
        case "swiper-container":
            var swiper = document.createElement("swiper-container");
            swiper.className = "collapse";
            swiper.id = "more-info-" + id;
            swiper.style = "z-index: 0;";
            swiper.navigation = "true";
            swiper.pagination = "true";
            swiper.setAttribute("css-mode", "true");;
            block.after(swiper);
            break;
    }
}
insert_slide = (id, src, href, title) =>{
    var swiper_container = document.getElementById("more-info-"+id);
    var swiper = document.createElement("swiper-slide");
    var block = document.createElement("div");
    var block_title = document.createElement("h3");
    var img = document.createElement("img");
    var link = document.createElement("a");
    img.src = src;
    img.width = 350;
    img.height = 200;
    link.href = href;
    link.appendChild(img);
    block_title.appendChild(document.createTextNode(title));;
    block.style = "text-align: center;";
    block.appendChild(document.createElement("br"));
    block.appendChild(block_title);
    block.appendChild(link);
    swiper.appendChild(block);
    swiper_container.appendChild(swiper);
}

window.onload = function () {
    fetch('/json/navigation.json').then((response) => response.json()).then(
        (navigation) => {
            init_navigation(navigation);
        });
    switch (location.pathname) {
        case "/":
            fetch('/json/navigation.json').then((response) => response.json()).then(
                (navigation) => {
                    for (var i = 0; i < navigation.length; i += 1) {
                        init_icon_link(navigation[i].row_id, navigation[i].Title, navigation[i].Link, navigation[i].Image);
                        // init_icon_link_new(navigation[i].Title, navigation[i].Link, navigation[i].Image);
                    }
                });
            break;
        case "/learn":
            fetch('/json/learn_block.json').then((response) => response.json()).then(
                (info_block) => {
                    for (var i = 0; i < info_block.length; i += 1) {
                        init_info_block(info_block[i].Image, info_block[i].Title, info_block[i].Describe, info_block[i].Link,  i);
                    }
                });
            break;
        case "/donate":
            fetch('/json/donate_block.json').then((response) => response.json()).then(
                (info_block) => {
                    for (var i = 0; i < info_block.length; i += 1) {
                        init_info_block(info_block[i].Image, info_block[i].Title, info_block[i].Describe, info_block[i].Link, i);
                    }
                });
            break;
        case "/competition":
            fetch('/json/competition.json').then((response) => response.json()).then(
                (info_block) => {
                    for (var i = 0; i < info_block.length; i += 1) {
                        init_info_block(info_block[i].Image, info_block[i].Title, info_block[i].Describe, info_block[i].Link,  i);
                    }
                });
            break;
        case "/volunteer":
            fetch('/json/volunteer.json').then((response) => response.json()).then(
                (info_block) => {
                    for (var i = 0; i < info_block.length; i += 1) {
                        init_info_block(info_block[i].Image, info_block[i].Title, info_block[i].Describe, info_block[i].Link,  i);
                        insert_element("desc-block-"+i, "link", i);    
                        insert_element("info-block-"+i, "swiper-container", i);
                        var infomation = info_block[i].more_info;
                        for (var j = 0; j < infomation.length; j += 1) {
                            console.log(infomation[j]);
                            insert_slide(i, infomation[j].Image, infomation[j].Link, infomation[j].Title);
                        }
                    }
                });
            break;
    }
}
