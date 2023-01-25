const onLoadActions=()=>{
    let node=document.getElementsByClassName("container")[1]
    
    node.innerHTML+=`



    <span class="mt-3">To continue, login to Spotify</span>
    <div class="buttons d-flex flex-column mt-2">
    <button type="button" class="btn btn-primary rounded-pill "><i class="bi bi-facebook pr-2"></i>CONTINUE WITH FACEBOOK</button>
    <button type="button" class="btn btn-dark rounded-pill "><i class="bi bi-apple pr-2"></i>CONTINUE WITH APPLE</button>
    <button type="button" class="btn btn-light rounded-pill "><i class="bi bi-google pr-2"></i>CONTINUE WITH GOOGLE</button>
    </div>
    <div class="row py-2">
    <div class="col"><hr></div>
    <div class="col">OR</div>
    <div class="col"><hr></div>
    </div>
    <form>
  <div class="form-group">
    <input type="email" id="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email address or username">
    </div>
  <div class="form-group">
    <input type="password" id="pw" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="d-flex justify-content-between mt-4">
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label pl-2 pt-1" for="exampleCheck1" style="font-family: 'Gotham-Light'">Remember me</label>
    
  </div>
  <button type="submit" class="btn btn-success rounded-pill px-5 py-3" id="login">LOG IN</button>
  </div>
</form>
<a href="#" class="password py-3">Forgot your password?</a>
<div class="line"><hr></div>
<span class="account">Don't have an account?</span>
<button type="button" class="btn btn-light rounded-pill signup my-3">SIGN UP FOR SPOTIFY </button>
<div class="line"><hr></div>
<span class="terms mb-5">If you click "Log in with Facebook" and are not a spotify user, you will be registered and you agree to Spotify's <a href="#">Terms&Conditions</a> and <a href="#">Privacy Policy</a></span>

    `
}

const incorrectPassord=()=>{
    let btn=document.querySelector('#login')
    let alertmsg=document.querySelector('#alert')
    let email=document.querySelector("#email")
    let password=document.querySelector("#pw")
    if(email.value==="" || password.value===""){
        btn.addEventListener("click",function(){
            alertmsg.classList.replace("d-none","d-block")
                  setTimeout(() => {
                    alertmsg.classList.replace("d-block","d-none")
                     }, 5000);
        })
    }
   
 
}



window.onload=()=>{
    onLoadActions()
    incorrectPassord()
}

