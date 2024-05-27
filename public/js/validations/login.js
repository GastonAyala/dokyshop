const inputEmail = document.querySelector("[name='email']")
const inputPas = document.querySelector("[name='password']")

const regExPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
const regexMail = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


window.addEventListener('load', function() {


 
    //------------email
    let existsEmailError = false;
    inputEmail.addEventListener("blur", async function(){
      const invalidCorreo = document.querySelector(".errorEmail")
      const {data} = await (await fetch('http://localhost:3030/api/users')).json() 
      const value = this.value.trim();
      const userFinded = data.find(u =>{
        return u.email === value})

      switch(true){
        case value.length === 0:
            invalidCorreo.innerHTML = "Es campo correo es requerido"
            existsEmailError = true;
        break;
        case !regexMail.test(value):
          invalidCorreo.innerHTML = "Debe ingresar un mail valido";
          existsEmailError = true;
          break;
        case  !userFinded:
          invalidCorreo.innerHTML = "El usuario no existe"
          existsEmailError = true;
          break;
          default:         existsEmailError = false;
        invalidCorreo.innerHTML = null 
          break;
      }
   
    
})

  //--------------password 
  let existsPassError = false;
  inputPas.addEventListener("blur", function(){
    const invalidPas = document.querySelector(".errorPassword")
    const value = this.value.trim();

    switch(true){
      case value.length === 0:
        invalidPas.innerHTML = "Es campo contraseña es requerido";
        existsPassError = true; 
    break;
    case value.length < 8  || value.length > 16:
      invalidPas.innerHTML = "Datos ingresados incorrectos!";
      existsPassError = true;
    break;
    case !regExPass.test(value):
      invalidPas.innerHTML = "Datos ingresados incorrectos!";
      existsPassError = true;
    break; 
    default:invalidPas.innerHTML = null;
    existsPassError = false;
    break;       

    }
  }) 
  
  
  //--------------form
   const formulario = document.querySelector(".form-principal")
   

    formulario.addEventListener("submit", function (event){
      
      if(existsEmailError || existsPassError){
        event.preventDefault();
       
      }
    });
     
  })