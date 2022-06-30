'use strict';


// 네비게이션 바 픽스 
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll',()=>{
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    }else{
        navbar.classList.remove('navbar--dark');
    }
})

//네비게이션바 + 스크롤링

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click',(event)=>{
    const target = event.target;
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

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
}

// 스크롤링 시 투명하게 만들기

const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll',()=>{
    home.style.opacity = 1 - window.scrollY / homeHeight;
})


// 화살표 버튼 
const arrow = document.querySelector('.arrow-up')
document.addEventListener('scroll',()=>{
    if(window.scrollY > homeHeight/4){
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
    // forEach는
    // let project;
    // for(let i=0; i < projects.length; i++){
    //     project = projects[i]
    // }

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



