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

    document.getElementById('blogbody').innerHTML = "";
    for(var i = 0; i < blogs?.length; i++){
        document.getElementById('blogbody').innerHTML += `
          <div class="smallblog1">
            <img src=${blogs[i]?.img}>
            <div class="description">
              <p>${blogs[i]?.title}</p>
              <h1>${blogs[i]?.desc}</h1>
              <a><button>Read More</button></a>
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

        BlogForm[0].value = "";
        BlogForm[1].value = "";
        BlogForm[2].value = "";

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

        BlogForm[0].value = "";
        BlogForm[1].value = "";
        BlogForm[2].value = "";

        getBlog();
    }

    const popup = document.querySelector('.popuptab');
    
    popup.classList.remove('show_popup')
    

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



//blog POPUP

const popup = document.querySelector('.popuptab');

function displayPopUp () {
    popup.classList.add('show_popup')
}


function handleDismiss () {
    popup.classList.remove('show_popup')
}



//SIGNUP

const user = JSON.parse(localStorage.getItem('user'))
const createBlogBtn = document.querySelector('.create')
const signUpBtn = document.querySelector('.signup')

function getUser () {
    if(user){
        signUpBtn.classList.remove('visibleNow')
        signUpBtn.classList.add('hideNow')
        createBlogBtn.classList.add('visibleNow')
        createBlogBtn.classList.remove('hideNow')

        createBlogBtn.innerHTML = `${user[0]?.fullname} Create Blog`
    }else {
        signUpBtn.classList.add('visibleNow')
        signUpBtn.classList.remove('hideNow')
        createBlogBtn.classList.remove('visibleNow')
        createBlogBtn.classList.add('hideNow')
    }
}



const signUpButton = document.getElementById('signup')

signUpButton.addEventListener('click',function handleSubmitUser (e) {
    e.preventDefault()
    
    const SignUpform = document.getElementById("userFormInputs");

    var fullname = SignUpform[0].value
    var email = SignUpform[1].value
    var password = SignUpform[2].value
    var comfimPassword = SignUpform[3].value

    if(localStorage.getItem('register') == null){
        let array = []


        const user = {
            id:1,
            fullname,
            email,
            password,
            comfimPassword
        }

        console.log(user)

        array.push(user)

        localStorage.setItem("register",JSON.stringify(array))
        window.alert("Signed Up Successfully!! Now SignIn.")

        SignUpform[0].value = "";
        SignUpform[1].value = "";
        SignUpform[2].value = "";
        SignUpform[3].value = "";
    }else {
        let array = JSON.parse(localStorage.getItem("register"))

        const user = {
            id:1,
            fullname,
            email,
            password,
            comfimPassword
        }

        for(var i=0; i < array.length; i++){
            if(array[i].email === user.email){
                window.alert("User already exist ")

                break;
            }else{
                array.push(user)

                localStorage.setItem("register",JSON.stringify(array))
                window.alert("Signed Up Successfully!! Now SignIn.")

                SignUpform[0].value = "";
                SignUpform[1].value = "";
                SignUpform[2].value = "";
                SignUpform[3].value = "";

                break;
            }
        }
    }
})


const signInButton = document.getElementById('signin')


signInButton.addEventListener('click',function handleLogin(e){
    e.preventDefault();

    console.log(signInButton)
    
    const SignUpform = document.getElementById("userFormInputs");

    var email = SignUpform[1].value
    var password = SignUpform[2].value

    

    const user = {
        id:1,
        email,
        password,

    }

    if(localStorage.getItem('register')){

        let array = JSON.parse(localStorage.getItem("register"))


        // for(var i=0; i < array.length; i++){
        //     if(array[i].email.find(user.email)){
                
        //         const loger = []

        //         loger.push(user)

        //         localStorage.setItem('user',JSON.stringify(loger))

        //         SignUpform[1].value = "";
        //         SignUpform[2].value = "";

        //         getUser();

        //         break;
        //     }else{
        //         window.alert('User Not Exist SignUp!!!!')

        //         break;
        //     }
        // }

    }else {
        window.alert("Please SignUp first!!!")
    }
})




//SIGNUP POPUP

const SIGNUPpopup = document.querySelector('.SIGNUPpopuptab');

function displaySignUpPopUp () {
    SIGNUPpopup.classList.add('show_popup')
}


function SIGNUPhandleDismiss () {
    SIGNUPpopup.classList.remove('show_popup')
}



const SwitchBtn = document.querySelector('.switch')
const SwitchBtn2 = document.querySelector('.switch2')
const hidden2 = document.querySelector('.hidden2')
const hidden3 = document.querySelector('.hidden3')

Loginbtn = document.querySelector('.Loginbtn')
Loginbtn2 = document.querySelector('.Loginbtn2')


SwitchBtn.addEventListener('click',function Switch(e){
    e.preventDefault()

    hidden2.classList.remove('notshown')
    hidden3.classList.remove('notshown')
    SwitchBtn.classList.add('notshown')
    SwitchBtn2.classList.remove('notshown')
    Loginbtn.classList.remove('notshown')
    Loginbtn2.classList.add('notshown')
})


SwitchBtn2.addEventListener('click',function Switch2(e){
    e.preventDefault()

    hidden2.classList.add('notshown')
    hidden3.classList.add('notshown')
    SwitchBtn.classList.remove('notshown')
    SwitchBtn2.classList.add('notshown')
    Loginbtn.classList.add('notshown')
    Loginbtn2.classList.remove('notshown')
})


