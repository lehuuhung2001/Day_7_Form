var username = document.querySelector("#username");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var cf_password = document.querySelector("#cf_password");
var form =document.querySelector('form')
function showError(input,message) {
  let parent = input.parentElement;
  let p = parent.querySelector('p')
  p.classList.add('error')
  p.innerText = message
}


function showSuccess(input) {
  let parent = input.parentElement
  let p = parent.querySelector('p')
  p.classList.add('error')
  p.innerText = ""
}


function checkEmail(input) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(regex.test(input.value.trim())){
    showSuccess(input)
  }else{
    showError(input, "Email is not valid")
  }
}

function getFieldName(input) {
  return input.placeholder.charAt(0).toUpperCase() + input.placeholder.slice(1)
}

function checkRequired(inputArr) {
  let isRequired = false 
  inputArr.forEach(input => {
    if(input.value.trim() === ""){
      showError(input, `${getFieldName(input)} is required`)
      isRequired = true
    }else{
      showSuccess(input)
    }
  });
  console.log(isRequired)
  return isRequired
}

function checkLength(input, min, max) {
  if(input.value.length < min){
    showError(input,`${getFieldName(input)} must be at least ${min} characters`)
  }else if( input.value.length > max){
    showError(input,`${getFieldName(input)} must be less than ${max} characters`)
  }else{
    showSuccess(input)
  }
}

function checkPasswordsMatch(password_1,password_2){
  if(password_1.value !== password_2.value){
    showError(password_2, 'Passwords do not match')
  }
}
form.addEventListener('submit',((e) => {
  e.preventDefault()
  if(!checkRequired([username,email,password,cf_password])){
    checkLength(username, 6, 15)
		checkLength(password, 6, 25)
		checkEmail(email)
		checkPasswordsMatch(password, cf_password)
  }
  username.value?checkLength(username,6,15):undefined
  email.value?checkEmail(email):undefined
  password.value?checkLength(password, 6, 15):undefined
  cf_password.value?checkPasswordsMatch(password,cf_password):undefined
}))