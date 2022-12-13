const lis = document.querySelectorAll('.links');
const sections = document.querySelectorAll('section');


function activeMenu () {
    let length = sections.length;
    while(--length && window.scrollY + 97 < sections[length].offsetTop) {}
        lis.forEach(li => li.classList.remove("active"));
        lis[length].classList.add("active");
} 
activeMenu();
window.addEventListener("scroll", activeMenu);


const lists = document.querySelectorAll('.nlists');


lists.forEach((list) => {
    list.addEventListener('click', function(){
        lists.forEach(li => li.classList.remove('now'));

        this.classList.add('now')
    })
})


const nav = document.querySelector('nav');

function handleNav () {
    nav.classList.toggle('sticky', window.scrollY > 200)
}

window.addEventListener('scroll',handleNav)



