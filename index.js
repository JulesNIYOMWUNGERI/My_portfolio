//SCROLL RESIPONSIVE

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

//NAVBAR RESIPONSIVE

const nav = document.querySelector('nav');

function handleNav () {
    nav.classList.toggle('sticky', window.scrollY > 200)
}

window.addEventListener('scroll',handleNav)


//FORM VALIDATION

const form = document.getElementById('form');
const button = document.querySelector('.formbutton')


button.addEventListener('click',function validation(e){
    e.preventDefault()


    if(form[0].value === ''){
        form[0].classList.add('invalid')
        form[0].classList.remove('valid')
        document.getElementById('error1').innerHTML='Enter your username'
    }else {
        document.getElementById('error1').innerHTML=''
        form[0].classList.add('valid')
        form[0].classList.remove('invalid')
    }


    if(form[1].value === ''){
        form[1].classList.add('invalid')
        form[1].classList.remove('valid')
        document.getElementById('error2').innerHTML='Enter a valid email'
    }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form[1].value)){
        form[1].classList.add('invalid')
        document.getElementById('error2').innerHTML='Enter a valid email'
    }else{
        document.getElementById('error2').innerHTML=''
        form[1].classList.add('valid')
        form[1].classList.remove('invalid')
    }


    if(form[2].value === ''){
        form[2].classList.add('invalid')
        form[2].classList.remove('valid')
        document.getElementById('error3').innerHTML='Please Enter Your Subject'
    }else {
        document.getElementById('error3').innerHTML=''
        form[2].classList.add('valid')
        form[2].classList.remove('invalid')
    }


    if(form[3].value === ''){
        form[3].classList.add('invalid')
        form[3].classList.remove('valid')
        document.getElementById('error4').innerHTML='Enter your message'
    }else {
        document.getElementById('error4').innerHTML=''
        form[3].classList.add('valid')
        form[3].classList.remove('invalid')
    }
    
}
)



