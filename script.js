// ---------- 1. HTML elemanlarını yakala ----------
const form = document.getElementById("expense-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const list = document.getElementById("expense-list");
const totalEl = document.getElementById("total");
const errorEl = document.getElementById("error");

// ---------- 2. Veriyi yükle ----------
// localStorage'da "expenses" varsa onu al, yoksa boş liste ile başla.
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// ---------- 3. Kaydet ----------
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// ---------- 4. Ekranı çiz ----------
function render() {
  list.innerHTML = ""; // listeyi temizle, baştan çiz
  let total = 0;

  expenses.forEach(function (expense) {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = expense.name + " - $" + expense.amount.toFixed(2);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function () {
      deleteExpense(expense.id);
    });

    li.appendChild(text);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    total += expense.amount;
  });

  totalEl.textContent = total.toFixed(2);
}

// ---------- 5. Harcama ekle ----------
function addExpense(name, amount) {
  expenses.push({
    id: Date.now(), // benzersiz numara
    name: name,
    amount: amount
  });
  saveExpenses();
  render();
}

// ---------- 6. Harcama sil ----------
function deleteExpense(id) {
  // id'si eşleşmeyenleri tut, eşleşeni at
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });
  saveExpenses();
  render();
}

// ---------- 7. Form gönderilince ----------
form.addEventListener("submit", function (event) {
  event.preventDefault(); // sayfanın yenilenmesini engelle

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (name === "") {
    errorEl.textContent = "Please enter an expense name.";
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    errorEl.textContent = "Please enter an amount greater than 0.";
    return;
  }

  errorEl.textContent = "";
  addExpense(name, amount);
  form.reset();
  nameInput.focus();
});

// ---------- 8. Sayfa açılınca kayıtlı veriyi göster ----------
render();
