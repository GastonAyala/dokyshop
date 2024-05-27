const inputs = document.querySelectorAll(".inputs")
const avatar = document.querySelector("[name='avatar']");
const inputName = document.querySelector("[name='name']");
const email = document.querySelector("[name='email']");
const password = document.querySelector("[name='password']");

const regExPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
const regexAlpha = /^[A-Za-z ]+$/;
const regexMail = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


window.addEventListener('load', function() {
   

    //----------avatar
    let existsAvatarError = false;
    
    const invalidAvatar = document.querySelector(".invalid-avatar")
    avatar.addEventListener("change", function(){
      console.log(this.files);
      const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;
      const files = Array.from(this.files);

      switch(true){
        
        case files.length > 1:
          invalidAvatar.innerHTML = "No puedes ingresar mas de 1 archivo";
          existsAvatarError = true;
        break;
        case files.some((file) => !regExpFiles.test(file.name)):
          invalidAvatar.innerHTML =  "El formato de la imagen principal es invalido";
          existsAvatarError = true; 
        break;
        default: invalidAvatar.innerHTML = null;
        existsAvatarError = false;  
      }
    })
   
    //----------name:

    let existsNameError = false;
    inputName.addEventListener("blur", function(){

        const value = this.value.trim();
        const invalidName = document.querySelector(".invalid-name")

        switch(true){
          case value.length === 0:
            invalidName.innerHTML = "Es campo nombre es requerido"
            existsNameError = true; 
        break;
        case value.length < 5 || value.length > 50:
            invalidName.innerHTML = "Debe tener un mínimo de 5 y máximo 50 caracteres";
            existsNameError = true;
        break;
        case !regexAlpha.test(value):
          invalidName.innerHTML = "Debes ingresar formato texto";
          existsNameError = true;
      break;
        default:invalidName.innerHTML = null;
        existsNameError = false;
        break;
        
        }
    })

    //------------email
    let existsEmailError = false;
    email.addEventListener("blur", async function(){
      const invalidCorreo = document.querySelector(".invalid-correo")
      const value = this.value.trim();

      switch(true){
        case value.length === 0:
          invalidCorreo.innerHTML = "Es campo correo es requerido"
          existsEmailError = true; 
      break;
      case !regexMail.test(value):
          invalidCorreo.innerHTML = "Debe ingresar un mail valido";
          existsEmailError = true;
      break;
      default:invalidCorreo.innerHTML = null;
      existsEmailError = false;
      break;
      }

      const {data} = await (await fetch('http://localhost:3030/api/users')).json()  

      data.forEach(user =>{
        if(user.email === value){
          invalidCorreo.innerHTML = "El usuario ya existe"
          existsEmailError = true; 
        }
      })

    
   
})

  //--------------password 
  let existsPassError = false;
  password.addEventListener("blur", function(){
    const invalidPas = document.querySelector(".invalid-passwod")
    const value = this.value.trim();

    switch(true){
      case value.length === 0:
        invalidPas.innerHTML = "Es campo contraseña es requerido";
        existsPassError = true; 
    break;
    case value.length < 8  || value.length > 16:
      invalidPas.innerHTML = "Longitud invalida entre 8 y 16 caracteres!";
      existsPassError = true; 
    break;
    case !regExPass.test(value):
      invalidPas.innerHTML = "Contraseña debe contener al menos una mayuscula una minuscula y un numero!";
      existsPassError = true; 
    break; 
    default:invalidPas.innerHTML = null;
    existsPassError = false; 
    break;       

    }
  }) 
  
  
  //--------------form
   const formulario = document.querySelector(".form-principal")
    const errFormGeneral = document.querySelector(".err-form-general");

    formulario.addEventListener("submit", async function (event){
      
     if (existsAvatarError || existsNameError || existsEmailError || existsPassError) {
        event.preventDefault();
        errFormGeneral.innerHTML = "Todos los campos son requeridos";

        return;
      }
    });
    
  })