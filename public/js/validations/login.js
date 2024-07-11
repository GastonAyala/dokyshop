window.addEventListener('load', function () {
  const inputEmail = document.querySelector("[name='email']")
  const inputPas = document.querySelector("[name='password']")

  const regExPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  const regexMail = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const invalid = (elementErr, msgErr, elementInput) => {
    elementErr.innerHTML = msgErr;
    elementErr.style.position = "unset";
    elementErr.classList.add("invalid-tooltip");
    elementInput.classList.add("is-invalid");
  };

  const valid = (elementErr, elementInput) => {
    elementErr.innerHTML = null;
    elementInput.classList.add("is-valid");
    elementErr.classList.remove("invalid-tooltip");
    elementInput.classList.remove("is-invalid");
  };

  const remove = (elementErr, elementInput) => {
    elementInput.classList.remove("is-valid");
    elementErr.classList.remove('invalid-tooltip');
    elementErr.innerHTML = null;
  };

  const focus = (elementErr, elementInput,) => {
    elementInput.addEventListener('focus', function (e) {
      remove(elementErr, this);
    });
  };

  //------------email
  let existsEmailError = true;
  const invalidCorreo = document.querySelector(".errorEmail")
  inputEmail.addEventListener("keyup", function () {
    const value = this.value.trim();

    switch (true) {
      case value.length === 0:
        invalid(invalidCorreo, "El campo correo es requerido", this);
        existsEmailError = true;
        break;
      case !regexMail.test(value):
        invalid(invalidCorreo, "Debe ingresar un email valido", this);
        existsEmailError = true;
        break;
      default:
        valid(invalidCorreo, this);
        existsEmailError = false;
        break;
    }
  });

  focus(invalidCorreo, inputEmail);

  //--------------password 
  let existsPassError = true;
  const invalidPas = document.querySelector(".errorPassword");

  inputPas.addEventListener("keyup", function () {
    const value = this.value.trim();
    switch (true) {
      case value.length === 0:
        invalid(invalidPas, "El campo contraseña es requerido", this);
        existsPassError = true;
        break;
      case value.length < 8 || value.length > 16:
        invalid(invalidPas, "Longitud invalida entre 8 y 16 caracteres", this);
        existsPassError = true;
        break;
      case !regExPass.test(value):
        invalid(invalidPas, "La Contraseña debe contener al menos una mayuscula una minuscula y un numero", this);
        existsPassError = true;
        break;
      default:
        valid(invalidPas, this);
        existsPassError = false;
        break;
    }
  });

  focus(invalidPas, inputPas);

  //--------------form
  const formulario = document.querySelector(".form-principal");
  const errFormGeneral = document.querySelector(".err-form-general");

  formulario.addEventListener("submit", function (event) {
    if (existsEmailError || existsPassError) {
      event.preventDefault();
      errFormGeneral.innerHTML = "Todos los campos son requeridos";
      errFormGeneral.classList.add("alert", "alert-danger");
    }
  });
})
