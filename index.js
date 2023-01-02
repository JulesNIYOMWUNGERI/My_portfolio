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

//SKILLS AND EXPRIENCE

const lists = document.querySelectorAll('.nlists');
const descs = document.querySelectorAll('.desc')

function handletab(tabname) {
    const def = document.querySelector('.default');
    def.classList.add('now')

    descs.forEach((desc)=>{
        desc.classList.remove('active-tab')

        const activeOne = document.getElementById(tabname)
        activeOne.classList.add('active-tab')
    })
}

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

//EASY TOP RESPONSIVE

const easytop = document.querySelector('.easytop')

function handleEasyTop () {
    easytop.classList.toggle('display',window.scrollY > 500)
}

window.addEventListener('scroll',handleEasyTop)


//FORM VALIDATION

const form = document.getElementById('form');
const button = document.querySelector('.formbutton')


function validation(e){
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


//HAMBURGER RESIPONSIVE

const hamburgerBtn = document.querySelector('.hamburger');

const navlist = document.querySelector('.list')
const bars = document.getElementById('bars')
const closed = document.getElementById('close')


function toggleBtn () {
    navlist.classList.add('show')
}

hamburgerBtn.addEventListener('click', toggleBtn)


function handleHide () {
    navlist.classList.remove('show')
}


//LOCALSTORAGE

function getBlog () {
    var blogs = JSON.parse(localStorage.getItem("blog"))

    for(var i = 0; i < blogs.length; i++){
        document.getElementById('blogbody').innerHTML += `
          <div class="smallblog1">
            <img src=${blogs[i]?.img}>
            <div class="description">
              <p>${blogs[i]?.title}</p>
              <h1>${blogs[i]?.desc}</h1>
              <button>Read More</button>
            </div>
          </div>
        `
    }
}



function handleSubmitBlog (e) {
    e.preventDefault()

    const BlogForm = document.getElementById("blogFormInputs");
    
    var title = BlogForm[0].value
    var desc = BlogForm[1].value
    var img = BlogForm[2].value

    if(localStorage.getItem("blog") == null){
        let array = []

        const blog = {
            id:1,
            title,
            desc,
            img
        }
    
        array.push(blog);
        
        
        localStorage.setItem("blog",JSON.stringify(array));
        window.alert("Blog Added Successfully!.")
        getBlog();
    }else {
        let array = JSON.parse(localStorage.getItem("blog"))
        
        const blog = {
            id:array.length+1,
            title,
            desc,
            img
        }

        array.push(blog)

        localStorage.setItem("blog",JSON.stringify(array));
        window.alert("Blog Added Successfully!.")
        getBlog();
    }
}


//SEND EMAIL

function sendEmail () {
    if(document.getElementById('username').value === ""){
        document.getElementById('comfirm').classList.remove('comfirm')
        document.getElementById('comfirm').classList.add('not_comfirm')
        document.getElementById('comfirm').innerHTML='You must fill All the field first!'
    }else if(document.getElementById('email').value === ""){
        document.getElementById('comfirm').classList.remove('comfirm')
        document.getElementById('comfirm').classList.add('not_comfirm')
        document.getElementById('comfirm').innerHTML='You must fill All the field first!'
    }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById('email').value)){
        document.getElementById('comfirm').classList.remove('comfirm')
        document.getElementById('comfirm').classList.add('not_comfirm')
        document.getElementById('comfirm').innerHTML='You must enter a valid email first!'
    }else if(document.getElementById('subject').value === ""){
        document.getElementById('comfirm').classList.remove('comfirm')
        document.getElementById('comfirm').classList.add('not_comfirm')
        document.getElementById('comfirm').innerHTML='You must fill All the field first!'
    }else if(document.getElementById('message').value === ""){
        document.getElementById('comfirm').classList.remove('comfirm')
        document.getElementById('comfirm').classList.add('not_comfirm')
        document.getElementById('comfirm').innerHTML='You must fill All the field first!'
    }else{
        document.getElementById('comfirm').innerHTML=''

        var params = {
            from_name : document.getElementById('username').value,
            email_id : document.getElementById('email').value,
            subject : document.getElementById('subject').value,
            message : document.getElementById('message').value
        }
        
        emailjs.send("service_v709atl", "template_4e1r3mc", params).then(function (res) {
            document.getElementById('comfirm').classList.remove('not_comfirm')
            document.getElementById('comfirm').classList.add('comfirm')
            document.getElementById('comfirm').innerHTML='Message Sent Successfully!!'
    
            document.getElementById('form').reset()

            document.getElementById('username').classList.remove('valid')
            document.getElementById('username').classList.remove('invalid')

            document.getElementById('email').classList.remove('valid')
            document.getElementById('email').classList.remove('invalid')

            document.getElementById('subject').classList.remove('valid')
            document.getElementById('subject').classList.remove('invalid')

            document.getElementById('message').classList.remove('valid')
            document.getElementById('message').classList.remove('invalid')

            setTimeout(function(){
                document.getElementById('comfirm').innerHTML=''
            },5000)

        }).catch((err) => console.log(err))
    }
}

