document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector(".contacts__form");
    let popup = document.querySelector(".popup");
  
    form.addEventListener("submit", formSend);
  
    async function formSend(e) {
      e.preventDefault();
      let error = formValiadtion();
  
      let formData = new FormData(form);
  
      if (error === 0) {
        form.classList.add("_sending");
        let response = await fetch("send.php", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          popup.innerHTML = "Данные успешно отправлены!";
          popup.classList.add("active", "success");
          setTimeout(() => {
            popup.classList.remove("active", "success");
          }, 3000);
  
          form.reset();
          form.classList.remove("_sending");
          modalWindow.classList.remove("active");
        } else {
          popup.innerHTML = "Ошибка";
          popup.classList.add("active", "error");
          setTimeout(() => {
            popup.classList.remove("active", "error");
          }, 3000);
          form.classList.remove("_sending");
        }
      } else {
        popup.innerHTML = "Заполните обязательные поля!";
        popup.classList.add("active", "error");
        setTimeout(() => {
          popup.classList.remove("active", "error");
        }, 3000);
      }
    }
  
    function formValiadtion() {
      let error = 0;
      let inputs = document.querySelectorAll("._req");
  
      for (let input of inputs) {
        formRemoveError(input);
  
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
      return error;
    }
  
    function formAddError(input) {
      input.parentElement.classList.add("_error");
      input.classList.add("_error");
    }
  
    function formRemoveError(input) {
      input.parentElement.classList.remove("_error");
      input.classList.remove("_error");
    }
  });