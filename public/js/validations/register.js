const avatar = document.querySelector("[name='avatar']");
const inputName = document.querySelector("[name='name']");
const email = document.querySelector("[name='email']");
const password = document.querySelector("[name='password']");

const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;
const exRegAlfanumeric = /^[a-zA-Z0-9\s]*$/;

window.addEventListener('load', function() {
    let existError = true;

  const statusInvalid = (elementErr, msgErr) => {
    elementErr.querySelector("p").innerHTML = msgErr;
    existError = true;
  };
  

  const statusValid = (elementErr, elementInput) => {
    elementErr.innerHTML = null;
    elementInput.classList.add("is-valid");
    elementInput.classList.remove("is-invalid");
    existError = false;
  };
    



    //---------name:
    const divName = document.querySelector(".imgProductForm");
    inputName.addEventListener("blur", function(){

        const value = this.value.trim();
        switch(true){
          case value.length === 0:
            statusInvalid(divName, "El titulo es requerido", this);
        break;
        
        }

    })


  
  });