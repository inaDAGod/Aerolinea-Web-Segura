const hamburger = document.querySelector('.hamburger')
const menu = document.querySelector('.menu-navegacion')

//console.log(menu)
//console.log(hamburger)


hamburger.addEventListener('click', ()=>{
    menu.classList.toggle("spread")
})

window.addEventListener('click', e=>{
    if(menu.classList.contains('spread')
         && e.target  !=menu && e.target != hamburger){
            menu.classList.toggle("spread")

    }
})

var swiper= new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 80,
    grabCursor: true,
    loop:true,
    breakpoints:{
        991:{
            slidesPerView:3
        }
    }
})