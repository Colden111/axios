const apiUrl = "http://localhost:3000";

const fetchUsers = () => {
  axios(apiUrl + "/users")
    .then((response) => displayUsers(response.data))
    .catch((error) => {
      console.log(error.message);
    });
};

const displayUsers = (userList) => {
  let htmlContent = "";
  const container = document.getElementById("users-container");
  userList.forEach(({ name, email, age, country, isActive, id }) => {
    htmlContent += `<div class="user-card ${isActive ? "active" : "inactive"}">
        <h3>${name}</h3>
        <p>Email: ${email}</p>
        <p>Yaş: ${age}</p>
        <p>Ölkə: ${country}</p>
        <p>Vəziyyət: ${isActive ? "Onlayn" : "Oflayn"}</p>
        <button onclick="removeUser('${id}')">sil</button>
      </div>`;
  });
  container.innerHTML = htmlContent;
};

const removeUser = (userId) => {
  Swal.fire({
    title: "Əminsiniz?",
    text: "Bu əməliyyatı geri qaytara bilməyəcəksiniz!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Bəli, sil!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(apiUrl + "/users/" + userId).then((response) => {
        fetchUsers();
        Swal.fire({
          title: "Silindi!",
          text: "İstifadəçi silindi.",
          icon: "success",
        });
      });
    }
  });
};

const addUser = (event) => {
  event.preventDefault();

  const nameField = document.getElementById("name-field");
  const countryField = document.getElementById("country-field");
  const emailField = document.getElementById("email-field");
  const ageField = document.getElementById("age-field");

  const userData = {
    name: nameField.value,
    email: emailField.value,
    age: +ageField.value,
    country: countryField.value,
    isActive: false,
  };

  axios
    .post(apiUrl + "/users", userData)
    .then((response) => {
      Swal.fire("Yeni istifadəçi yaradıldı");
      fetchUsers();
    })
    .catch((error) => {
      console.log(error.message);
    });

  newUserForm.reset();
  formVisible = !formVisible;
  toggleFormVisibility(formVisible);
};

const toggleFormVisibility = (isVisible) => {
  if (!isVisible) {
    newUserForm.style.display = "none";
  } else {
    newUserForm.style.display = "block";
  }
};
//-------------------------------------------------------------------------------------
fetchUsers();

let formVisible = false;
const newUserForm = document.getElementById("new-user-form");
const toggleFormBtn = document.getElementById("toggle-form-btn");

toggleFormVisibility(formVisible);
toggleFormBtn.addEventListener("click", () => {
  formVisible = !formVisible;
  toggleFormVisibility(formVisible);
});

newUserForm.addEventListener("submit", addUser);
