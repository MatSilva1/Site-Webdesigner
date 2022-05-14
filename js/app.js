const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");

const links = document.querySelectorAll(".nav-link");

const toggle_btn = document.querySelector(".toggle-btn");

window.addEventListener("scroll", () =>{
    activeLink();
    if(!skillsPlayed) skillsCounter();
    if(!mlPlayed) mlCounter();
});

function updateCount(num, maxNum){
    let currentNum = +num.innerText;

    if (currentNum < maxNum)
    {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12);
    }    
}

/* Efeito navbar */

function efeitoNavbar(){
    header.classList.toggle("scrolled", window.pageYOffset > 0);
}

efeitoNavbar();

window.addEventListener("scroll", efeitoNavbar);

/*Animação scroll reveal*/

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", { delay: 400} );
sr.reveal(".showcase-image", { delay: 400} );  

/*Animação barra de progresso*/

function hasReached(el){
     
    let topPosition = el.getBoundingClientRect().top;
        if (window.innerHeight >= topPosition + el.offsetHeight) return true;
        return false;
}

let skillsPlayed = false;

function skillsCounter(){

    if (!hasReached(first_skill)) return;

    let skillsPlayed = true;

    sk_counters.forEach((counter, i) => {

        let target = +counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue);
        
        setTimeout(() => {
            updateCount(counter, target);
        }, 400);
    
    });

    progress_bars.forEach(
        (p) => (p.style.animation = "progress 2s ease-in-out forwards")
        );

}

/*Animação contadores de serviço*/
let mlPlayed =false;

function mlCounter(){
    if (!hasReached(ml_section)) return;
    mlPlayed = true;
    ml_counters.forEach((ctr) => {
        let target = +ctr.dataset.target;

        setTimeout(() => {
            updateCount(ctr, target);
        }, 400);

    });

}

/*Link ativo ao scrollar*/

function activeLink(){
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections)
        .map((sct, i) => {
        return {
            y: sct.getBoundingClientRect().top - header.offsetHeight,
            id: i,
        };
    })

    .filter((sct) => sct.y <= 0);

    let currentSectionID = passedSections.at(-1).id;

    links.forEach((l) => l.classList.remove("active"));
    links[currentSectionID].classList.add("active");
}

activeLink();

/*Mudança de temas*/

let firstTheme = localStorage.getItem("dark");

changeTheme(+firstTheme);

function changeTheme(isDark){
    if (isDark)
        {
        document.body.classList.add("dark");
        toggle_btn.classList.replace("uil-moon", "uil-sun");
        localStorage.setItem("dark", 1);
    } else {
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("uil-sun", "uil-moon");
        localStorage.setItem("dark", 0);
    }
}

toggle_btn.addEventListener("click", () => {
    changeTheme(!document.body.classList.contains("dark"));
});
