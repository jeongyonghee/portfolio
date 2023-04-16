'use strict';
//미모지 클릭 시 이미지 변경 


const memoji = document.querySelector('.home__avatar');
let toggle = false
memoji.addEventListener('click',()=>{
    if(toggle == false){ 
        memoji.src = './images/yonghee2.png';
        toggle = true;
    }else{
        memoji.src ='./images/yonghee.png';
        toggle = false;
    }
});

// const navbar = document.querySelectorAll('.navbar__menu__item > li');
// navbar.addEventListener('mouseover',(e)=>{
//     const target = e.target;
//     const link = target.dataset.link;
//     if( link == null){
//         navbar.classList.remove('action')
//     }else{
//         navbar.classList.add('action');
//     }
// })

// 네비게이션 바 픽스 
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll',()=>{
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    }else{
        navbar.classList.remove('navbar--dark');
    }
});

//네비게이션바 클릭 시 지정 섹션으로 스크롤링

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click',(e)=>{ 
    const target = e.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link)
})

// 네비게이션바 햄버거 버튼
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click',()=>{
    navbarMenu.classList.toggle('open');
});

// 컨택 미 스크롤링
const contact = document.querySelector('.home__contact');

contact.addEventListener('click',()=>{
    scrollIntoView('#contact')
})

// 스크롤링 함수 
function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

// 스크롤링 시 섹션  투명하게 만들기

const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll',()=>{
    home.style.opacity = 1 - window.scrollY / homeHeight;
})


// 화살표 버튼 
const arrow = document.querySelector('.arrow-up')
document.addEventListener('scroll',()=>{
    if(window.scrollY > homeHeight/2){
        arrow.classList.add('visible');
    }else{
        arrow.classList.remove('visible');
    }
})

// 화살표 버튼 클릭 시 맨 위로

arrow.addEventListener('click',()=>{
    scrollIntoView('#home')
})

// 프로젝트 보여지기 

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__project');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click',(e)=>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter==null){
        return;
    }
    // 액티브 활성화 버튼
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');
    
    // 프로젝트 애니메이션
    projectContainer.classList.add('animation');
    setTimeout(()=>{
        projects.forEach((project)=>{
            if(filter ==='*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('animation');
    },300);
})

// 모든 섹션 요소들을 가지고 온다.
// IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

const sectionIds = [
    '#home', 
    '#about', 
    '#skills', 
    '#work', 
    '#contact',
]
// 이 배열을 빙글빙글 돌면서 각각의 섹션 돔 요소로 변환하는 새로운 배열로 만든다.
// 이렇게 만드는 api는 map 
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link='${id}']`))

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active')
}





const observerOptions = {
    root:null,
    rootMargin:'0px',
    threshold: 0.7,
}


const observerCallback = (entries, observer)=>{
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0 ){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // -가 된다면 스크롤링이 아래로 되어서 페이지가 올라옴
            if(entry.boundingClientRect.y <0){
                selectedNavIndex = index +1;
            }else{
                selectedNavIndex = index -1;
            }
        }
    })
}


const observer = new IntersectionObserver(observerCallback,observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', ()=>{
    if(window.scrollY === 0 ){
        selectedNavIndex = 0;
    }else if(
        Math.round(window.scrollY+window.scrollHeight) >= document.body.clientHeight){
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
})