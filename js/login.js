

const credentials=[
{username:'hena@xyz.com', password:'111'},
{username:'barry@xyz.com', password:'222'},
{username:'sabin@xyz.com', password:'333'}
]
    


  
const onLoadActions=()=>{
    let node=document.getElementsByClassName("container")[1]
    
    node.innerHTML+=`



    <span class="mt-3">To continue, login to Spotify</span>
    <div class="buttons d-flex flex-column mt-2">
    <button type="button" class="btn btn-primary rounded-pill "><i class="bi bi-facebook pr-2"></i>CONTINUE WITH FACEBOOK</button>
    <button type="button" class="btn btn-dark rounded-pill "><i class="bi bi-apple pr-2"></i>CONTINUE WITH APPLE</button>
    <button type="button" class="btn btn-light rounded-pill "><i class="bi bi-google pr-2"></i>CONTINUE WITH GOOGLE</button>
    </div>
    
    <div class="row py-3 or">
    <div class="col-5"></div>
    <div class="col-2 text-center">OR</div>
    <div class="col-5"></div>
    </div>
   
  <div class="form-group">
    <input type="email" id="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email address or username">
    </div>
  <div class="form-group">
    <input type="password" id="pw" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>


  <div class="mt-4 d-flex justify-content-between check ml-5">
    <div class="checkbox">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label pl-2 pt-1" for="exampleCheck1" style="font-family: 'Gotham-Light'">Remember me</label>
    </div>
   <button type="submit" class="btn btn-success rounded-pill px-5 py-3" id="login" onclick="correctPassword()">LOG IN</button>
  </div>
  
 

<a href="#" class="password py-3">Forgot your password?</a>
<div class="line"><hr></div>
<span class="account">Don't have an account?</span>
<button type="button" class="btn btn-light rounded-pill signup my-3">SIGN UP FOR SPOTIFY </button>
<div class="line"><hr></div>
<span class="terms mb-5">If you click "Log in with Facebook" and are not a spotify user, you will be registered and you agree to Spotify's <a href="#">Terms&Conditions</a> and <a href="#">Privacy Policy</a></span>

    `
    

}
{/* <div class="row py-2">
    <div class="col-4"><hr></div>
    <div class="col-4 text-center">OR</div>
    <div class="col-4"><hr></div>
    </div> */}
const enterToLogin=()=>{
  const input = document.querySelector("#pw");
  
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector('#login').click();
    }
  });
}




const correctPassword=()=>{
    
    let btn=document.querySelector('#login')
    let emptyalertmsg=document.querySelector('#empty')
    let incorrectalertmsg=document.querySelector('#incorrect')

    let email=document.querySelector("#email").value
   let pass=document.querySelector("#pw").value


   btn.classList.add("disabled")
   setTimeout(() => {
    btn.classList.remove("disabled")
         }, 500);


//    console.log(email,pass)
    if(email==='' || pass===''){
  
         emptyalertmsg.classList.replace("d-none","d-block")
              setTimeout(() => {
             emptyalertmsg.classList.replace("d-block","d-none")
                  }, 3000);
    }

    let check=credentials.find((user)=>(user.username===email && user.password===pass))
    if(check){

        sessionStorage.setItem('Username',check.username);
       window.location.href="homepage.html"
    }
    else{
        if(emptyalertmsg.classList.contains("d-none")){
            incorrectalertmsg.classList.replace("d-none","d-block")
            setTimeout(() => {
           incorrectalertmsg.classList.replace("d-block","d-none")
                }, 3000);
        }
      
    }
 
   
}

window.onload=()=>{
    onLoadActions()
    enterToLogin()
  
}

