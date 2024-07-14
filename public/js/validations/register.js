window.addEventListener('load', function () {
  const avatar = document.querySelector("[name='avatar']");
  const inputName = document.querySelector("[name='name']");
  const email = document.querySelector("[name='email']");
  const password = document.querySelector("[name='password']");

  const regExPass = /^(?=.*\d)(?=.*[A-ZÑ])(?=.*[a-zñ])\S{16,25}$/;
  const regexAlpha = /^[A-Za-zÀ-ÿ ]+$/;
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
  
  //----------avatar
  let existsAvatarError = false;
  const invalidAvatar = document.querySelector(".invalid-avatar");
  const imgElement = document.querySelector('.avatarImg');

  avatar.addEventListener("change", function (e) {
    const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;
    const files = Array.from(this.files);

    switch (true) {
      case files.length > 1:
        invalid(invalidAvatar, "No puedes ingresar mas de 1 archivo", this);
        existsAvatarError = true;
        break;
      case files.some((file) => !regExpFiles.test(file.name)):
        invalid(invalidAvatar, "El formato de la imagen es inválido", this);
        existsAvatarError = true;
        break;
      default:
        valid(invalidAvatar, this)
        existsAvatarError = false;

        if (this.files && this.files[0]) {
          let reader = new FileReader();
          reader.onload = function (e) {
            imgElement.setAttribute('src', e.target.result);
          };
          reader.readAsDataURL(this.files[0]);
        };
    }
  })

  //----------name:
  let existsNameError = true;
  const invalidName = document.querySelector(".invalid-name")
  inputName.addEventListener("keyup", function () {
    const value = this.value.trim();
    switch (true) {
      case value.length === 0:
        invalid(invalidName, "El campo nombre es requerido", this);
        existsNameError = true;
        break;
      case value.length < 5 || value.length > 50:
        invalid(invalidName, "Debe tener un mínimo de 5 y máximo 50 caracteres", this);
        existsNameError = true;
        break;
      case !regexAlpha.test(value):
        invalid(invalidName, "El valor no puede contener numeros ni caracteres especiales", this);
        existsNameError = true;
        break;
      default:
        valid(invalidName, this);
        existsNameError = false;
        break;
    }
  })

  focus(invalidName, inputName);

  //------------email
  let existsEmailError = true;
  const invalidCorreo = document.querySelector(".invalid-email");

  email.addEventListener("keyup", async function () {
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
    try {
      const { data } = await (await fetch('http://localhost:3030/api/users')).json()
      data.forEach(user => {
        if (user.email === value) {
          invalid(invalidCorreo, "El usuario ya existe", this);
          existsEmailError = true;
        }
      })
    } catch (error) {
      console.error(error.message)
    }
  })

  focus(invalidCorreo, email);

  //--------------password 
  let existsPassError = true;
  const invalidPas = document.querySelector(".invalid-password")
  password.addEventListener("keyup", function () {
    const value = this.value.trim();
    switch (true) {
      case value.length === 0:
        invalid(invalidPas, "El campo contraseña es requerido", this);
        existsPassError = true;
        break;
      case value.length < 8 || value.length > 25:
        invalid(invalidPas, "Longitud invalida entre 8 y 25 caracteres", this);
        existsPassError = true;
        break;
      case !regExPass.test(value):
        invalid(invalidPas, "La contraseña debe contener al menos una mayuscula, una minuscula y un número", this);
        existsPassError = true;
        break;
      default:
        valid(invalidPas, this);
        existsPassError = false;
        break;
    }
  })

  focus(invalidPas, password);

  //--------------form
  const formulario = document.querySelector(".form-principal")
  const errFormGeneral = document.querySelector(".err-form-general");

  formulario.addEventListener("submit", function (event) {
    if (existsAvatarError || existsNameError || existsEmailError || existsPassError) {
      event.preventDefault();
      errFormGeneral.innerHTML = "Todos los campos son requeridos";
      errFormGeneral.classList.add("alert", "alert-danger");
      return;
    }
  });

})
