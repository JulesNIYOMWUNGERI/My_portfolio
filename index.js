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



//(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}
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
              <a href="src/blogDetails.html?id=${blogs[i].id}"><button>Read More</button></a>
            </div>
          </div>
        `
    }
}

//VALIDATE BLOG FORM

var TitleError = document.getElementById("title-error");
var DescError = document.getElementById('desc-error');
var Image1Error = document.getElementById('image1-error');

function ValidateTitle(){
    var TitleError = document.getElementById("title-error")
    var title = document.getElementById('blog-title').value;
    var titlefield = document.querySelector('.title-field')
    var limit = 25;
    var left = limit - title.length

    if(title.length == 0){
        TitleError.innerHTML="Title is required";
        titlefield.classList.remove('fieldvalid')
        titlefield.classList.add('fieldinvalid')
        TitleError.classList.remove('errorvalid')
        return false;
    }
    if(title.length > limit){
        TitleError.innerHTML="The title should not over 25 characters";
        titlefield.classList.remove('fieldvalid')
        titlefield.classList.add('fieldinvalid')
        TitleError.classList.remove('errorvalid')
        return false;
    }
    TitleError.innerHTML="The title should not over 25 characters; left:" + left;
    titlefield.classList.add('fieldvalid')
    titlefield.classList.remove('fieldinvalid')
    TitleError.classList.add('errorvalid')
    return true;
}

function ValidateDesc(){
    var DescError = document.getElementById('desc-error');
    var desc = document.getElementById('Description').value;
    var descfield = document.querySelector('.desc-field');

    if(desc.length == 0){
        DescError.innerHTML="Description is required";
        descfield.classList.add('fieldinvalid')
        descfield.classList.remove('fieldvalid')
        return false;
    }
    DescError.innerHTML="";
    descfield.classList.remove('fieldinvalid')
    descfield.classList.add('fieldvalid')
    return true;

}

function ValidateImage1(){
    var ImageUrl = document.getElementById('Image1').value;
    var Image1Error = document.getElementById('image1-error');
    var image1field = document.querySelector('.image-field1')

    if(ImageUrl.length == 0){
        Image1Error.innerHTML="ImageUrl is required";
        image1field.classList.add('fieldinvalid')
        image1field.classList.remove('fieldvalid')
        return false;
    }
    Image1Error.innerHTML="";
    image1field.classList.remove('fieldinvalid')
    image1field.classList.add('fieldvalid')
    return true;
}



function handleSubmitBlog (e) {
    e.preventDefault()

    const BlogForm = document.getElementById("blogFormInputs");
    
    var title = BlogForm[0].value
    var desc = BlogForm[1].value
    var img = BlogForm[2].value

    if(!ValidateTitle() || !ValidateDesc() || !ValidateImage1()){
        var SubmitError = document.getElementById('blog-submit-error')
        SubmitError.innerHTML="Please fix the error above!"

        setTimeout(()=>{
            SubmitError.innerHTML=""
        },3000)
        

    }else if(localStorage.getItem("blog") == null){
        let array = []

        const blog = {
            id:1,
            title,
            desc,
            img
        }
    
        array.push(blog);
        
        
        localStorage.setItem("blog",JSON.stringify(array));
        BlogForm[0].value = "";
        BlogForm[1].value = "";
        BlogForm[2].value = "";

        var TitleError = document.getElementById("title-error")
        var titlefield = document.querySelector('.title-field');
        var descfield = document.querySelector('.desc-field');
        var image1field = document.querySelector('.image-field1');

        TitleError.innerHTML="";
        titlefield.classList.remove('fieldvalid')
        titlefield.classList.remove('fieldinvalid')
        TitleError.classList.remove('errorvalid')

        descfield.classList.remove('fieldinvalid')
        descfield.classList.remove('fieldvalid')

        image1field.classList.remove('fieldinvalid')
        image1field.classList.remove('fieldvalid')

        const popup = document.querySelector('.popuptab');
    
        popup.classList.remove('show_popup')

        handleDashboard();

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
        BlogForm[0].value = "";
        BlogForm[1].value = "";
        BlogForm[2].value = "";

        var TitleError = document.getElementById("title-error")
        var titlefield = document.querySelector('.title-field');
        var descfield = document.querySelector('.desc-field');
        var image1field = document.querySelector('.image-field1');

        TitleError.innerHTML="";
        titlefield.classList.remove('fieldvalid')
        titlefield.classList.remove('fieldinvalid')
        TitleError.classList.remove('errorvalid')

        descfield.classList.remove('fieldinvalid')
        descfield.classList.remove('fieldvalid')

        image1field.classList.remove('fieldinvalid')
        image1field.classList.remove('fieldvalid')

        const popup = document.querySelector('.popuptab');
    
        popup.classList.remove('show_popup')

        handleDashboard();

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



//blog POPUP



function displayPopUp () {
    const popup = document.querySelector('.popuptab');


    popup.classList.add('show_popup')

    const editButton = document.querySelector('.createbtn2')
    const createButton = document.querySelector('.createbtn1')

    editButton.classList.add('show-not')
    createButton.classList.remove('show-not')


    const createBlogTitle = document.querySelector('.create-blog-title')
    const editBlogTitle = document.querySelector('.edit-blog-title')

    createBlogTitle.classList.remove('show-not')
    editBlogTitle.classList.add('show-not')
}


function handleDismiss () {
    const popup = document.querySelector('.popuptab');


    popup.classList.remove('show_popup')
}



//SIGNUP POPUP

const SIGNUPpopup = document.querySelector('.SIGNUPpopuptab');

function displaySignUpPopUp () {
    SIGNUPpopup.classList.add('show_popup')
}


function SIGNUPhandleDismiss () {
    SIGNUPpopup.classList.remove('show_popup')
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

        createBlogBtn.innerHTML = `${user[0]?.fullname} go to dashboard`
    }else {
        signUpBtn.classList.add('visibleNow')
        signUpBtn.classList.remove('hideNow')
        createBlogBtn.classList.remove('visibleNow')
        createBlogBtn.classList.add('hideNow')
    }
}


//SIGNUP FORM VALIDATION

var NameError = document.getElementById('name-error');
var EmailError = document.getElementById('Email-error');
var PasswordError = document.getElementById('password-error');
var ComfirmPasswordError = document.getElementById('comfirmPassword-error');



function ValidateName(){
    var name = document.getElementById('SignUp-name').value;
    var namefield = document.querySelector('.name-field')

    if(name.length == 0){
        NameError.innerHTML="Name is required";
        namefield.classList.remove('fieldvalid')
        namefield.classList.add('fieldinvalid')
        return false;
    }
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        NameError.innerHTML="Write full name";
        namefield.classList.remove('fieldvalid')
        namefield.classList.add('fieldinvalid')
        return false;
    }
    NameError.innerHTML="";
    namefield.classList.remove('fieldinvalid')
    namefield.classList.add('fieldvalid')
    return true;
}


function ValidateEmail(){
    var email = document.getElementById('SignUp-email').value;
    var emailfield = document.querySelector('.email-field')

    if(email.length == 0){
        EmailError.innerHTML="Email is required";
        emailfield.classList.remove('fieldvalid')
        emailfield.classList.add('fieldinvalid')
        return false;
    }
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,3})+$/)){
        EmailError.innerHTML="Please Enter a Valid Email";
        emailfield.classList.remove('fieldvalid')
        emailfield.classList.add('fieldinvalid')
        return false;
    }
    EmailError.innerHTML="";
    emailfield.classList.remove('fieldinvalid')
    emailfield.classList.add('fieldvalid')
    return true;
}

function ValidatePassword(){
    var password = document.getElementById('SignUp-password').value;
    var passwordfield = document.querySelector('.password-field')

    if(password.length == 0){
        PasswordError.innerHTML="Password is required";
        passwordfield.classList.remove('fieldvalid')
        passwordfield.classList.add('fieldinvalid')
        return false;
    }
    if(!password.match(/[a-z]/)){
        PasswordError.innerHTML="Password should be started by words and lowercase";
        passwordfield.classList.remove('fieldvalid')
        passwordfield.classList.add('fieldinvalid')
        return false;
    }

    PasswordError.innerHTML="";
    passwordfield.classList.remove('fieldinvalid')
    passwordfield.classList.add('fieldvalid')
    return true;
}


function ValidateComfirmPassword(){
    var comfirmpassword = document.getElementById('SignUp-comfirmPassword').value;
    var password = document.getElementById('SignUp-password').value;
    var comfirmpasswordfield = document.querySelector('.comfirmpassword-field')


    if(comfirmpassword.length == 0){
        ComfirmPasswordError.innerHTML="Password Comfirmation is required";
        comfirmpasswordfield.classList.remove('fieldvalid')
        comfirmpasswordfield.classList.add('fieldinvalid')
        return false;
    }
    if(!comfirmpassword.match(password)){
        ComfirmPasswordError.innerHTML="Password Comfirmation should match with password";
        comfirmpasswordfield.classList.remove('fieldvalid')
        comfirmpasswordfield.classList.add('fieldinvalid')
        return false;
    }
    ComfirmPasswordError.innerHTML="";
    comfirmpasswordfield.classList.remove('fieldinvalid')
    comfirmpasswordfield.classList.add('fieldvalid')
    return true;
}



const signUpButton = document.getElementById('signup')

signUpButton.addEventListener('click',function handleSubmitUser (e) {
    e.preventDefault()


    const user = JSON.parse(localStorage.getItem('user'))
    const createBlogBtn = document.querySelector('.create')
    const signUpBtn = document.querySelector('.signup')
    var SubmitError = document.getElementById('submit-error');


    
    const SignUpform = document.getElementById("userFormInputs");

    var fullname = SignUpform[0].value
    var email = SignUpform[1].value
    var password = SignUpform[2].value
    var comfimPassword = SignUpform[3].value

    if(!ValidateName() || !ValidateEmail() || !ValidatePassword() || !ValidateComfirmPassword()){

        SubmitError.innerHTML="please fix the error above!"
        
            setTimeout(function(){
                SubmitError.innerHTML=""
            },5000)

    }else if(localStorage.getItem('register') == null){
        let array = []


        const user = {
            id:1,
            fullname,
            email,
            password,
            comfimPassword
        }

        array.push(user)

        localStorage.setItem("register",JSON.stringify(array))

        SignUpform[0].value = "";
        SignUpform[1].value = "";
        SignUpform[2].value = "";
        SignUpform[3].value = "";

        SubmitError.innerHTML=""

        var emailfield = document.querySelector('.email-field')
        var passwordfield = document.querySelector('.password-field')
        var namefield = document.querySelector('.name-field')
        var comfirmpasswordfield = document.querySelector('.comfirmpassword-field')

        namefield.classList.remove('fieldvalid')
        namefield.classList.remove('fieldinvalid')
        emailfield.classList.remove('fieldvalid')
        emailfield.classList.remove('fieldinvalid')
        passwordfield.classList.remove('fieldvalid')
        passwordfield.classList.remove('fieldinvalid')
        comfirmpasswordfield.classList.remove('fieldvalid')
        comfirmpasswordfield.classList.remove('fieldinvalid')

        
        const SwitchBtn2 = document.querySelector('.switch2')
        const hidden2 = document.querySelector('.hidden2')
        const hidden3 = document.querySelector('.hidden3')

        Loginbtn = document.querySelector('.Loginbtn')
        Loginbtn2 = document.querySelector('.Loginbtn2')

        hidden2.classList.add('notshown')
        hidden3.classList.add('notshown')
        SwitchBtn.classList.remove('notshown')
        SwitchBtn2.classList.add('notshown')
        Loginbtn.classList.add('notshown')
        Loginbtn2.classList.remove('notshown')



    }else {


        window.alert('Admin Already Registered')


        SignUpform[0].value = "";
        SignUpform[1].value = "";
        SignUpform[2].value = "";
        SignUpform[3].value = "";

        SubmitError.innerHTML=""

        var emailfield = document.querySelector('.email-field')
        var passwordfield = document.querySelector('.password-field')
        var namefield = document.querySelector('.name-field')
        var comfirmpasswordfield = document.querySelector('.comfirmpassword-field')

        namefield.classList.remove('fieldvalid')
        namefield.classList.remove('fieldinvalid')
        emailfield.classList.remove('fieldvalid')
        emailfield.classList.remove('fieldinvalid')
        passwordfield.classList.remove('fieldvalid')
        passwordfield.classList.remove('fieldinvalid')
        comfirmpasswordfield.classList.remove('fieldvalid')
        comfirmpasswordfield.classList.remove('fieldinvalid')

        SIGNUPhandleDismiss();

    }
})


const signInButton = document.getElementById('signin')


signInButton.addEventListener('click',function handleLogin(e){
    e.preventDefault();

    var SubmitError = document.getElementById('submit-error');


    if(!ValidateEmail() || !ValidatePassword()){

        SubmitError.innerHTML="please fix the error above!"
        
            setTimeout(function(){
                SubmitError.innerHTML=""
            },5000)
    
    }else if(localStorage.getItem('register')){

        const SignUpform = document.getElementById("userFormInputs");

        var email = SignUpform[1].value
        var password = SignUpform[2].value

    

        const user = {
            id:1,
            email,
            password,

        }


        let Registers = JSON.parse(localStorage.getItem("register"))


        const admin = Registers.filter((Register) => Register?.email === user?.email)
        const adminPassword = Registers.filter((Register) => Register?.password === user?.password) 

        if(!admin.length == 0 || !adminPassword.length == 0){
            console.log(adminPassword)
            localStorage.setItem('user',JSON.stringify(admin))

            SignUpform[1].value="";
            SignUpform[2].value="";

            var emailfield = document.querySelector('.email-field')
            var passwordfield = document.querySelector('.password-field')


            emailfield.classList.remove('fieldvalid')
            emailfield.classList.remove('fieldinvalid')
            passwordfield.classList.remove('fieldvalid')
            passwordfield.classList.remove('fieldinvalid')

            const LoggedUser = JSON.parse(localStorage.getItem('user'))
            const createBlogBtn = document.querySelector('.create')
            const signUpBtn = document.querySelector('.signup')

            if(LoggedUser){
                signUpBtn.classList.remove('visibleNow')
                signUpBtn.classList.add('hideNow')
                createBlogBtn.classList.add('visibleNow')
                createBlogBtn.classList.remove('hideNow')
    
                createBlogBtn.innerHTML = `${LoggedUser[0]?.fullname} go to dashboard`
            }else{
                signUpBtn.classList.add('visibleNow')
                signUpBtn.classList.remove('hideNow')
                createBlogBtn.classList.remove('visibleNow')
                createBlogBtn.classList.add('hideNow')
            }

             SIGNUPhandleDismiss();
        }else{
            window.alert("You are not an admin!, please enter an admin credentials")

            var emailfield = document.querySelector('.email-field')
            var passwordfield = document.querySelector('.password-field')

            SignUpform[1].value="";
            SignUpform[2].value="";

            emailfield.classList.remove('fieldvalid')
            emailfield.classList.remove('fieldinvalid')
            passwordfield.classList.remove('fieldvalid')
            passwordfield.classList.remove('fieldinvalid')

            SubmitError.innerHTML="please enter an admin credentials!"
        
            setTimeout(function(){
                SubmitError.innerHTML=""
            },3000)
        }
        

    }else {
        window.alert("Please SignUp first!!!")
    }
})







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



//DETAILS PAGE


function hanleDetails() {
    let parameters = window.location.search

    let urlParams = new URLSearchParams(parameters)

    let param1 = urlParams.get('id')

    const id = JSON.parse(param1)

    const blogs = JSON.parse(localStorage.getItem('blog'))
    const containerDev = document.querySelector('.part1')
    const otherblogs = document.querySelector('.part2-cont')


    const singleBlog = blogs?.filter((blog) => blog.id === id)
    const likesArr = JSON.parse(localStorage.getItem('likes'))

    const thisPostLikes = likesArr?.filter((obj) => obj.id == singleBlog[0].id)

    const AllComment = JSON.parse(localStorage.getItem('comment'));
    const thisPostComment = AllComment?.filter((comment)=>comment.blogId == singleBlog[0].id)

    containerDev.innerHTML = `
      <img class='part1Image' src=${JSON.stringify(singleBlog[0]?.img)}/>
      <div class='part1-title'>
        <h1>${singleBlog[0]?.title}</h1>
        <div class='likesSection hidden-section'>
          <p onclick="handleLike(${singleBlog[0]?.id})">${thisPostLikes?.length}likes<i class="fa-solid fa-thumbs-up"></i></p>
          <p>${thisPostComment?.length}comment<i class="fa-solid fa-comment"></i></p>
        </div>
        <div class='visitorSection' onclick="handleVisitor()">
         <p>SIGNUP TO LIKE AND COMMENT</p>
        </div>
      </div>
      <div class='commentBox'>
        <div class='commentInnerBox'>
          <h1>Leave your comment here!</h1>
          <hr/>
          <form class='commentForm'>
           <div class='commentContainer'>
             <label>Comment:</label>
             <div class='innerCommentContainer'>
               <textarea class='commentText' type="text" placeholder="Comment" rows="4" onkeyup="ValidateComment()"></textarea>
               <span id='comment-error'></span>
               <span id='comment-success'></span>
             </div>
           </div>
           <div class='commentButtonContainer'>
             <button onclick="handleSubmitComment(event,${singleBlog[0]?.id})">Comment</button>
             <span id='submit-comment-error'></span>
           </div>
          </form>
        </div>
      </div>
      <hr/>
      <div class='part1-desc'>
        <p>${singleBlog[0]?.desc}</p>
      </div>
      <hr/>
      <div>
        <h1>comments</h1>
        <div id='commentDisplayer'>
         
        </div>
      </div>
    `

    otherblogs.innerHTML = "";

    for(var i = 0; i < blogs?.length; i++){
        otherblogs.innerHTML += `
        <div class='part2-container'>
            <div>
              <img class='part2Image' src=${blogs[i]?.img}>
            <div>
            <div class='part2Desc'>
              <h1>${blogs[i]?.title}</h1>
              <p>${blogs[i]?.desc}</p>
              <div class='btn-cont'>
                <a href="blogDetails.html?id=${blogs[i].id}"><button>Read More</button></a>
              </div>
            </div>
        </div>
        `
    }

    const visitor = JSON.parse(localStorage.getItem('visitor'))
    const likesSection = document.querySelector('.likesSection')
    const visitorSection = document.querySelector('.visitorSection')

    if(visitor){
        likesSection.classList.remove('hidden-section')
        visitorSection.classList.add('hidden-section')
    }else{
        likesSection.classList.add('hidden-section')
        visitorSection.classList.remove('hidden-section')
    }


}


//VISITOR SIGNUP

function handleVisitor(){
    const VISITORSIGNUPpopuptab = document.querySelector('.VISITORSIGNUPpopuptab');

    VISITORSIGNUPpopuptab.classList.add('show-visitor')
}

function VISITORSIGNUPhandleDismiss(){
    const VISITORSIGNUPpopuptab = document.querySelector('.VISITORSIGNUPpopuptab');

    VISITORSIGNUPpopuptab.classList.remove('show-visitor')
}




function handleChanges(){
    const visitorswitch = document.querySelector('.visitorswitch');
    const visitorswitch2 = document.querySelector('.visitorswitch2');
    const visitor1 = document.querySelector('.visitor1');
    const visitor4 = document.querySelector('.visitor4');
    const VisitorLoginbtn = document.querySelector('.VisitorLoginbtn');
    const VisitorLoginbtn2 = document.querySelector('.VisitorLoginbtn2');

    visitorswitch.classList.add('notshown');
    visitorswitch2.classList.remove('notshown');
    visitor1.classList.remove('notshown');
    visitor4.classList.remove('notshown');
    VisitorLoginbtn.classList.remove('notshown');
    VisitorLoginbtn2.classList.add('notshown');
}

function rehandleChanges(){
    const visitorswitch = document.querySelector('.visitorswitch');
    const visitorswitch2 = document.querySelector('.visitorswitch2');
    const visitor1 = document.querySelector('.visitor1');
    const visitor4 = document.querySelector('.visitor4');
    const VisitorLoginbtn = document.querySelector('.VisitorLoginbtn');
    const VisitorLoginbtn2 = document.querySelector('.VisitorLoginbtn2');

    visitorswitch.classList.remove('notshown');
    visitorswitch2.classList.add('notshown');
    visitor1.classList.add('notshown');
    visitor4.classList.add('notshown');
    VisitorLoginbtn.classList.add('notshown');
    VisitorLoginbtn2.classList.remove('notshown');
}



//VISITOR SIGNUP FORM VALIDATION


function ValidateVisitorName(){
    const NameError = document.getElementById('visitor-name-error');
    const name = document.getElementById('visitor-SignUp-name').value;
    const namefield = document.querySelector('.visitor-name-field')

    if(name.length == 0){
        NameError.innerHTML="Name is required";
        namefield.classList.remove('fieldvalid')
        namefield.classList.add('fieldinvalid')
        return false;
    }
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        NameError.innerHTML="Write full name";
        namefield.classList.remove('fieldvalid')
        namefield.classList.add('fieldinvalid')
        return false;
    }
    NameError.innerHTML="";
    namefield.classList.remove('fieldinvalid')
    namefield.classList.add('fieldvalid')
    return true;
}


function ValidateVisitorEmail(){
    const EmailError = document.getElementById('visitor-Email-error');
    const email = document.getElementById('visitor-SignUp-email').value;
    const emailfield = document.querySelector('.visitor-email-field')

    if(email.length == 0){
        EmailError.innerHTML="Email is required";
        emailfield.classList.remove('fieldvalid')
        emailfield.classList.add('fieldinvalid')
        return false;
    }
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,3})+$/)){
        EmailError.innerHTML="Please Enter a Valid Email";
        emailfield.classList.remove('fieldvalid')
        emailfield.classList.add('fieldinvalid')
        return false;
    }
    EmailError.innerHTML="";
    emailfield.classList.remove('fieldinvalid')
    emailfield.classList.add('fieldvalid')
    return true;
}

function ValidateVisitorPassword(){
    const PasswordError = document.getElementById('visitor-password-error');
    const password = document.getElementById('visitor-SignUp-password').value;
    const passwordfield = document.querySelector('.visitor-password-field')

    if(password.length == 0){
        PasswordError.innerHTML="Password is required";
        passwordfield.classList.remove('fieldvalid')
        passwordfield.classList.add('fieldinvalid')
        return false;
    }
    if(!password.match(/[a-z]/)){
        PasswordError.innerHTML="Password should be started by words and lowercase";
        passwordfield.classList.remove('fieldvalid')
        passwordfield.classList.add('fieldinvalid')
        return false;
    }

    PasswordError.innerHTML="";
    passwordfield.classList.remove('fieldinvalid')
    passwordfield.classList.add('fieldvalid')
    return true;
}


function ValidateVisitorComfirmPassword(){
    const ComfirmPasswordError = document.getElementById('visitor-comfirmPassword-error');
    const comfirmpassword = document.getElementById('visitor-SignUp-comfirmPassword').value;
    const password = document.getElementById('visitor-SignUp-password').value;
    const comfirmpasswordfield = document.querySelector('.visitor-comfirmpassword-field')


    if(comfirmpassword.length == 0){
        ComfirmPasswordError.innerHTML="Password Comfirmation is required";
        comfirmpasswordfield.classList.remove('fieldvalid')
        comfirmpasswordfield.classList.add('fieldinvalid')
        return false;
    }
    if(!comfirmpassword.match(password)){
        ComfirmPasswordError.innerHTML="Password Comfirmation should match with password";
        comfirmpasswordfield.classList.remove('fieldvalid')
        comfirmpasswordfield.classList.add('fieldinvalid')
        return false;
    }
    ComfirmPasswordError.innerHTML="";
    comfirmpasswordfield.classList.remove('fieldinvalid')
    comfirmpasswordfield.classList.add('fieldvalid')
    return true;
}


//REGISTER VISITER

function handleSendVisitor(e){
    e.preventDefault();


    const SubmitError = document.getElementById('visitor-submit-error')

    let fullname = document.getElementById('visitor-SignUp-name').value;
    let email = document.getElementById('visitor-SignUp-email').value;
    let password = document.getElementById('visitor-SignUp-password').value;
    let comfirmpassword = document.getElementById('visitor-SignUp-comfirmPassword').value;


    if(!ValidateVisitorName() || !ValidateVisitorEmail() || !ValidateVisitorPassword() || !ValidateVisitorComfirmPassword()){
        SubmitError.innerHTML="please fix the error above!"
        
            setTimeout(function(){
                SubmitError.innerHTML=""
            },3000)
    }else if(localStorage.getItem('registeredVisitor') == null){
        let array = []


        const visitor = {
            id:new Date().getTime(),
            fullname,
            email,
            password,
            comfirmpassword
        }

        array.push(visitor)

        localStorage.setItem("registeredVisitor",JSON.stringify(array))

        document.getElementById('visitor-SignUp-name').value = "";
        document.getElementById('visitor-SignUp-email').value = "";
        document.getElementById('visitor-SignUp-password').value = "";
        document.getElementById('visitor-SignUp-comfirmPassword').value = "";

        var emailfield = document.querySelector('.visitor-email-field')
        var passwordfield = document.querySelector('.visitor-password-field')
        var namefield = document.querySelector('.visitor-name-field')
        var comfirmpasswordfield = document.querySelector('.visitor-comfirmpassword-field')

        namefield.classList.remove('fieldvalid')
        namefield.classList.remove('fieldinvalid')
        emailfield.classList.remove('fieldvalid')
        emailfield.classList.remove('fieldinvalid')
        passwordfield.classList.remove('fieldvalid')
        passwordfield.classList.remove('fieldinvalid')
        comfirmpasswordfield.classList.remove('fieldvalid')
        comfirmpasswordfield.classList.remove('fieldinvalid')



        const visitorswitch = document.querySelector('.visitorswitch');
        const visitorswitch2 = document.querySelector('.visitorswitch2');
        const visitor1 = document.querySelector('.visitor1');
        const visitor4 = document.querySelector('.visitor4');
        const VisitorLoginbtn = document.querySelector('.VisitorLoginbtn');
        const VisitorLoginbtn2 = document.querySelector('.VisitorLoginbtn2');

        visitor1.classList.add('notshown')
        visitor4.classList.add('notshown')
        visitorswitch.classList.remove('notshown')
        visitorswitch2.classList.add('notshown')
        VisitorLoginbtn.classList.add('notshown')
        VisitorLoginbtn2.classList.remove('notshown')
    }else{
        let array = JSON.parse(localStorage.getItem('registeredVisitor'))


        const visitor = {
            id:new Date().getTime() + array?.length,
            fullname,
            email,
            password,
            comfirmpassword
        }

        array.push(visitor)

        localStorage.setItem("registeredVisitor",JSON.stringify(array))

        document.getElementById('visitor-SignUp-name').value = "";
        document.getElementById('visitor-SignUp-email').value = "";
        document.getElementById('visitor-SignUp-password').value = "";
        document.getElementById('visitor-SignUp-comfirmPassword').value = "";

        var emailfield = document.querySelector('.visitor-email-field')
        var passwordfield = document.querySelector('.visitor-password-field')
        var namefield = document.querySelector('.visitor-name-field')
        var comfirmpasswordfield = document.querySelector('.visitor-comfirmpassword-field')

        namefield.classList.remove('fieldvalid')
        namefield.classList.remove('fieldinvalid')
        emailfield.classList.remove('fieldvalid')
        emailfield.classList.remove('fieldinvalid')
        passwordfield.classList.remove('fieldvalid')
        passwordfield.classList.remove('fieldinvalid')
        comfirmpasswordfield.classList.remove('fieldvalid')
        comfirmpasswordfield.classList.remove('fieldinvalid')



        const visitorswitch = document.querySelector('.visitorswitch');
        const visitorswitch2 = document.querySelector('.visitorswitch2');
        const visitor1 = document.querySelector('.visitor1');
        const visitor4 = document.querySelector('.visitor4');
        const VisitorLoginbtn = document.querySelector('.VisitorLoginbtn');
        const VisitorLoginbtn2 = document.querySelector('.VisitorLoginbtn2');

        visitor1.classList.add('notshown')
        visitor4.classList.add('notshown')
        visitorswitch.classList.remove('notshown')
        visitorswitch2.classList.add('notshown')
        VisitorLoginbtn.classList.add('notshown')
        VisitorLoginbtn2.classList.remove('notshown')
    }
}

//VISITOR LOGIN

function handleVistorLogIn(e){
    e.preventDefault();

    const SubmitError = document.getElementById('visitor-submit-error')

    const allVisitors = JSON.parse(localStorage.getItem("registeredVisitor"))
    let email = document.getElementById('visitor-SignUp-email').value;
    let password = document.getElementById('visitor-SignUp-password').value;

    const selectedVisitor = allVisitors?.filter((visitor) => visitor.email == email)

    if(!ValidateVisitorEmail() || !ValidateVisitorPassword()){
        SubmitError.innerHTML="please fix the error above!"
        
            setTimeout(function(){
                SubmitError.innerHTML=""
            },3000)
    }else if(selectedVisitor?.length != 0){
        localStorage.setItem('visitor',JSON.stringify(selectedVisitor));

        document.getElementById('visitor-SignUp-name').value = "";
        document.getElementById('visitor-SignUp-email').value = "";
        document.getElementById('visitor-SignUp-password').value = "";
        document.getElementById('visitor-SignUp-comfirmPassword').value = "";

        var emailfield = document.querySelector('.visitor-email-field');
        var passwordfield = document.querySelector('.visitor-password-field');
        var namefield = document.querySelector('.visitor-name-field');
        var comfirmpasswordfield = document.querySelector('.visitor-comfirmpassword-field');

        namefield.classList.remove('fieldvalid');
        namefield.classList.remove('fieldinvalid');
        emailfield.classList.remove('fieldvalid');
        emailfield.classList.remove('fieldinvalid');
        passwordfield.classList.remove('fieldvalid');
        passwordfield.classList.remove('fieldinvalid');
        comfirmpasswordfield.classList.remove('fieldvalid');
        comfirmpasswordfield.classList.remove('fieldinvalid');

        VISITORSIGNUPhandleDismiss();
    }else{
        console.log("no visitor found")
    }
}

//DASHBOARD

function handleDashboard() {
    const user = JSON.parse(localStorage.getItem('user'))
    const blogs = JSON.parse(localStorage.getItem('blog'))
    const allVistors = JSON.parse(localStorage.getItem('registeredVisitor'))
    const allComment = JSON.parse(localStorage.getItem('comment'))

    
    const dashCont = document.querySelector('.dashCont')
    const dashCont2 = document.querySelector('.dashCont2')
    const dashCont3 = document.querySelector('.dashCont3')
    const innerUserContValue = document.querySelector('.innerUserContValue');
    const innerCommentContValue = document.querySelector('.innerCommentContValue')

    dashCont.innerHTML = `
        <img class='dashImg' src="https://avatars.githubusercontent.com/u/118351366?v=4"/>
        <div class='dashTitle'>
          <h1>${user[0]?.fullname}</h1>
          <h1>${user[0]?.email}</h1>
          <h1>Number of Blogs You Have:${blogs?.length}</h1>
          <button class='dashBtn' onclick="displayPopUp()">Create New Blog</button>
        </div>
    `


    innerUserContValue.innerHTML="";
    for(let i = 0; i < allVistors?.length; i++){
        innerUserContValue.innerHTML += `
          <div class='nowAllUsers'>
            <p>${allVistors[i]?.fullname}</p>
            <p>${allVistors[i]?.email}</p>
            <span onclick="handleDeleteUser(${allVistors[i]?.id})">delete</span>
          </div>
        `
    }


    innerCommentContValue.innerHTML="";
    for(let i = 0; i < allComment?.length; i++){
        innerCommentContValue.innerHTML += `
          <div class='nowAllcomments'>
            <p>${allComment[i]?.commentedUser}</p>
            <p>${allComment[i]?.commentValue}</p>
            <span onclick="handleDeleteComment(${allComment[i]?.id})">delete</span>
          </div>
        `
    }



    dashCont2.innerHTML = `
      <h1>List of your blogs</h1>
      <hr/>
      
    `

    dashCont3.innerHTML = "";
    for(var i = 0; i < blogs?.length; i++){
        dashCont3.innerHTML += `
          <div class="dashCont3-container">
            <img src=${blogs[i]?.img}>
            <div class="dashCont3-desc">
              <h1>${blogs[i]?.title}</h1>
              <p>${blogs[i]?.desc}</p>
              <div class='dashCont3-buttom'>
                <a href='blogDetails.html?id=${blogs[i].id}'><button>Read More</button></a>
                <div class='inner-button'>
                  <span class='span1' onclick="DeleteBlog(${blogs[i]?.id})">delete</span>
                  <span class='span2' onclick="EditBlog(${blogs[i]?.id})">edit</span>
                </div>
              </div>
            </div>
          </div>
        `
    }

}


//DELETING A BLOG

function DeleteBlog(id){

    const blogs = JSON.parse(localStorage.getItem('blog'))

    const newBlogs = blogs.filter((blog)=>blog?.id !== id)

    localStorage.setItem('blog',JSON.stringify(newBlogs))

    handleDashboard();

}

//EDITING BLOG

function EditBlog(id){

    const blogs = JSON.parse(localStorage.getItem('blog'))

    const editedBlog = blogs.filter((blog)=>blog?.id === id)

    const popup = document.querySelector('.popuptab');
    
    popup.classList.add('show_popup')
    
    var title = document.getElementById('blog-title').value=editedBlog[0]?.title
    var desc = document.getElementById('Description').value=editedBlog[0]?.desc
    var ImageUrl = document.getElementById('Image1').value=editedBlog[0]?.img
    
    const leftBlogs = blogs.filter((blog) => blog?.id !== id)

    localStorage.setItem('blog',JSON.stringify(leftBlogs));

    handleDashboard();

    const editButton = document.querySelector('.createbtn2')
    const createButton = document.querySelector('.createbtn1')

    editButton.classList.remove('show-not')
    createButton.classList.add('show-not')


    const createBlogTitle = document.querySelector('.create-blog-title')
    const editBlogTitle = document.querySelector('.edit-blog-title')

    createBlogTitle.classList.add('show-not')
    editBlogTitle.classList.remove('show-not')
}



function handleEditBlog(e){
    e.preventDefault();
    console.log('Editing a blog');

    if(localStorage.getItem('blog') == null){
        let array = [];

        var title = document.getElementById('blog-title').value;
        var desc = document.getElementById('Description').value;
        var ImageUrl = document.getElementById('Image1').value;
        
        const blog = {
            id:array?.length + 1,
            title,
            desc,
            ImageUrl,
        }

        array.push(blog)

        localStorage.setItem('blog',JSON.stringify(array))

        handleDashboard();

    }else {
        const array = JSON.parse(localStorage.getItem('blog'))

        var title = document.getElementById('blog-title').value;
        var desc = document.getElementById('Description').value;
        var img = document.getElementById('Image1').value;

        const blog = {
            id: new Date().getTime()+array?.length,
            title,
            desc,
            img,
        }

        console.log(blog);

        array.push(blog);

        localStorage.setItem('blog',JSON.stringify(array))

        handleDashboard();

        handleDismiss();
    }
}


function handleLike(id){
    const visitorWhoLikes = JSON.parse(localStorage.getItem("visitor"))[0]?.id

    const likesArray = JSON.parse(localStorage.getItem("likes"))

    const singleLike = likesArray?.filter((like)=>like.visitorWhoLikes == visitorWhoLikes)

    const likedPost =  singleLike?.filter((single)=>single.id == id)

    if(localStorage.getItem('likes') == null){

        let array = []

        let obj = {
            visitorWhoLikes,
            id
        }
    
        array.push(obj)

        localStorage.setItem('likes',JSON.stringify(array))

        hanleDetails()
        
    }else{

       if(singleLike?.length == 0){
           let array = JSON.parse(localStorage.getItem("likes"))

           let obj = {
            visitorWhoLikes,
            id
           }

           array.push(obj)

           localStorage.setItem('likes',JSON.stringify(array))
           hanleDetails()
       }else{
        if(likedPost?.length == 0){
            let array = JSON.parse(localStorage.getItem("likes"))

            let obj = {
             visitorWhoLikes,
             id
            }
 
            array.push(obj)
 
            localStorage.setItem('likes',JSON.stringify(array))
            hanleDetails()
        }else{
            console.log("allready liked the blog")
        }
       }
    }
}

//VALIDATE COMMENT FORM

function ValidateComment(){
    let commentError = document.getElementById('comment-error')
    let commentValue = document.querySelector('.commentText').value;
    let commentValueField = document.querySelector('.commentText')
    console.log(commentError)

    if(commentValue?.length == 0){
        commentError.innerHTML="Comment is required";
        commentValueField.classList.add('fieldinvalid');
        commentValueField.classList.remove('fieldvalid');
        return false;
    }
    commentError.innerHTML="";
    commentValueField.classList.remove('fieldvalid');
    commentValueField.classList.remove('fieldinvalid');
    return true;

} 



//SUBMIT COMMENT

function handleSubmitComment(e,id){
    e.preventDefault();
    const commentValue = document.querySelector('.commentText').value;
    const currentUser = JSON.parse(localStorage.getItem('visitor'))
    
    if(!ValidateComment()){
        const submitCommentError = document.getElementById('submit-comment-error');

        submitCommentError.innerHTML="Please fix the error above!"

        setTimeout(()=>{
            submitCommentError.innerHTML=""
        },3000)

    }else if(localStorage.getItem('comment') == null){
        let arr = [];

        let obj = {
            id:new Date().getTime(),
            blogId:id,
            commentedUser:currentUser[0]?.fullname,
            commentValue,
        }

        arr.push(obj);

        localStorage.setItem('comment',JSON.stringify(arr));
        document.querySelector('.commentText').value="";
        console.log("comment added successfull!!!")


        let commentValueField = document.querySelector('.commentText')

        commentValueField.classList.remove('fieldinvalid');
        commentValueField.classList.remove('fieldvalid');


        let commentSuccess = document.getElementById('comment-success')

        commentSuccess.innerHTML="Comment added successfully!"

        setTimeout(()=>{
            commentSuccess.innerHTML=""
        },3000)


        
        hanleDetails();

        handleDisplayComment();

    }else{
        let arr = JSON.parse(localStorage.getItem('comment'))

        let obj = {
            id:new Date().getTime(),
            blogId:id,
            commentedUser:currentUser[0]?.fullname,
            commentValue,
        }

        arr.push(obj);

        localStorage.setItem('comment',JSON.stringify(arr))
        document.querySelector('.commentText').value="";
        console.log("comment added successfull!!!")

        let commentValueField = document.querySelector('.commentText')

        commentValueField.classList.remove('fieldinvalid');
        commentValueField.classList.remove('fieldvalid');


        let commentSuccess = document.getElementById('comment-success')

        commentSuccess.innerHTML="Comment added successfully!"

        setTimeout(()=>{
            commentSuccess.innerHTML=""
        },3000)


        
        
        hanleDetails();

        handleDisplayComment();
    }
}


//HANDLE DISPLAY COMMENT

function handleDisplayComment(){
    let parameters = window.location.search
    let urlParams = new URLSearchParams(parameters);
    let param1 = urlParams.get('id');


    const id = JSON.parse(param1);
    const commentDisplayer = document.getElementById('commentDisplayer');
    const allComment = JSON.parse(localStorage.getItem('comment'));
    const thisBlogComment = allComment.filter((comment)=>comment.blogId == id)
    console.log(thisBlogComment)
    commentDisplayer.innerHTML="";
    for(let i = 0; i < thisBlogComment?.length; i++){
        commentDisplayer.innerHTML +=`
         <div class='commentDisplayerBox'>
           <h1>${thisBlogComment[i]?.commentedUser}:</h1>
           <p>${thisBlogComment[i]?.commentValue}</p>
         </div>
        `
    }
}


//DELETE USER

function handleDeleteUser(id){
    const allVistors = JSON.parse(localStorage.getItem('registeredVisitor'))

    const newAllVistors = allVistors.filter((visitor)=>visitor?.id != id)

    localStorage.setItem('registeredVisitor',JSON.stringify(newAllVistors))

    handleDashboard()
}

//DELETE COMMENT

function handleDeleteComment(id){
    const allComment = JSON.parse(localStorage.getItem('comment'))

    const newAllComment = allComment.filter((comment)=>comment?.id != id)

    localStorage.setItem('comment',JSON.stringify(newAllComment))

    handleDashboard()
}
