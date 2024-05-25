
const formulario = document.querySelector(".form-principal")
const inputs = document.querySelectorAll(".inputs")
const avatar = document.querySelector("[name='avatar']");
const inputName = document.querySelector("[name='name']");
const email = document.querySelector("[name='email']");
const password = document.querySelector("[name='password']");

const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;
const exRegAlfanumeric = /^[a-zA-Z0-9\s]*$/;
const exCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

window.addEventListener('load', function() {
    let existError = true;

  const statusInvalid = (elementErr, msgErr, elementInput) => {
    elementErr.querySelector("p").innerHTML = msgErr;
    elementInput.classList.add("is-invalid");
    existError = true;
  };
  

  const statusValid = (elementErr, elementInput) => {
    elementErr.innerHTML = null;
    elementInput.classList.add("is-valid");
    elementInput.classList.remove("is-invalid");
    existError = false;
  };

    //--------input: 
    formulario.addEventListener("submit", function(e){
        e.preventDefault();
    } )
    
    //---------name:
    const divName = document.querySelector(".nombre");
    
  
    
   
    inputName.addEventListener("blur", function(){

        const value = this.value.trim();
        switch(true){
          case value.length === 0:
            statusInvalid(divName, "El campo nombre es requerido", this);
        break;
        case value.length < 5 || value.length > 50:
            statusInvalid(divName, "Debe tener un mínimo de 5 y máximo 50 caracteres", this)
        break;
        default:statusValid(divName, this);
        
        break;
        
        }
    })
    //------------email "http://localhost:3030/api/users?page=1":

    const divEmail = document.querySelector(".email")
    
    console.log(divEmail)
    
  
    email.addEventListener("blur", function(){
        const value = this.value.trim();
        switch(true){
            case value.length === 0:
              statusInvalid(email, "El campo email es requerido", this);
               break;
            case exCorreo:
              statusInvalid(email, "Debe completar un email valido!", this)
               break;
            default:statusValid(email, this);
            break;
          
          }

    })
    
      
      


      


  
  })