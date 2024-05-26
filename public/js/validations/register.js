const inputs = document.querySelectorAll(".inputs")
const avatar = document.querySelector("[name='avatar']");
const inputName = document.querySelector("[name='name']");
const email = document.querySelector("[name='email']");
const password = document.querySelector("[name='password']");

const regExPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

const regexMail = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


window.addEventListener('load', function() {
    let existError = true;

    //----------avatar
   
    const invalidAvatar = document.querySelector(".invalid-avatar")
    avatar.addEventListener("change", function(){
      console.log(this.files);
      const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;
      const files = Array.from(this.files);

      switch(true){
        case !files.length:
          invalidAvatar.innerHTML = "Debes ingresar una imagen principal";
        break;
        case files.length > 1:
          invalidAvatar.innerHTML = "No puedes ingresar mas de 1 archivo";
        break;
        case files.some((file) => !regExpFiles.test(file.name)):
          invalidAvatar.innerHTML =  "El formato de la imagen principal es invalido"; 
        break;
        default: invalidAvatar.innerHTML = null;  
      }
    })
   
    //----------name:

    inputName.addEventListener("blur", function(){

        const value = this.value.trim();
        const invalidName = document.querySelector(".invalid-name")

        switch(true){
          case value.length === 0:
            invalidName.innerHTML = "Es campo nombre es requerido" 
        break;
        case value.length < 5 || value.length > 50:
            invalidName.innerHTML = "Debe tener un mínimo de 5 y máximo 50 caracteres";
        break;
        default:invalidName.innerHTML = null;
        break;
        
        }
    })

    //------------email
    
    email.addEventListener("blur", async function(){
      const invalidCorreo = document.querySelector(".invalid-correo")
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

      data.forEach(user =>{
        if(user.email === value){
          invalidCorreo.innerHTML = "El usuario ya existe" 
        }
      })

    
   
})

  //--------------password 
  password.addEventListener("blur", function(){
    const invalidPas = document.querySelector(".invalid-passwod")
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
          
        
        }
    });
    
  })