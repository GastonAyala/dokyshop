const inputEmail = document.querySelector("[name='email']")
const inputPas = document.querySelector("[name='password']")

const regExPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
const regexMail = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


window.addEventListener('load', function() {
    let existError = true;

 
    //------------email
    
    inputEmail.addEventListener("blur", async function(){
      const invalidCorreo = document.querySelector(".errorEmail")
      console.log(invalidCorreo)
      const value = this.value.trim();

      switch(true){
        case value.length === 0:
          invalidCorreo.innerHTML = "Es campo correo es requerido" 
      break;
      case !regexMail.test(value):
          invalidCorreo.innerHTML = "Debe ingresar un mail valido";
      break;
      default:invalidCorreo.innerHTML = null;
      break;
      }

    const {data} = await (await fetch('http://localhost:3030/api/users')).json()  
      console.log(data)
      data.forEach(user =>{
        if(user.email != value){
          invalidCorreo.innerHTML = "Usuario no existente" 
        }
      })

    
   
})

  //--------------password 
  inputPas.addEventListener("blur", function(){
    const invalidPas = document.querySelector(".errorPassword")
    const value = this.value.trim();

    switch(true){
      case value.length === 0:
        invalidPas.innerHTML = "Es campo contraseña es requerido"; 
    break;
    case value.length < 8  || value.length > 16:
      invalidPas.innerHTML = "Longitud invalida entre 8 y 16 caracteres!";
    break;
    case !regExPass.test(value):
      invalidPas.innerHTML = "Contraseña debe contener al menos una mayuscula una minuscula y un numero!";
    break; 
    default:invalidPas.innerHTML = null;
    break;       

    }
  }) 
  
  
  //--------------form
   const formulario = document.querySelector(".form-principal")
    const errFormGeneral = document.querySelector(".err-form-general");

    formulario.addEventListener("submit", function (event){
      const isAvatar = avatar.value.trim()
      const isName = inputName.value?.trim();
      const isEmail = email.value?.trim();
      const isPassword = password.value?.trim();
      event.preventDefault();

      switch(true){
        case !isAvatar:
        case !isName:
        case !isEmail:
        case !isPassword:
        
          errFormGeneral.innerHTML = "Todos los campos son requeridos";
          break;
          default: errFormGeneral.innerHTML = null
          break;
        }

        if(!existError){
          this.submit();
          errFormGeneral.innerHTML = null
        
        }
    });
    
  })