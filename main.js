const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const text = input.value;
  if (text !== "") {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const btnDel = document.createElement("button");
    p.textContent = text;
    btnDel.textContent = "x";
    btnDel.setAttribute("class", "btn-del");
    li.appendChild(p);
    ul.appendChild(li);
    li.appendChild(addDeleteBtn());
    input.value = "";
    empty.style.display = "none";
  }
});

function addDeleteBtn() {
  const btnDel = document.createElement("button");
  btnDel.textContent = "x";
  btnDel.setAttribute("class", "btn-del");
  btnDel.addEventListener("click", (e) => {
    ul.removeChild(e.currentTarget.parentElement);
  });
  return btnDel;
}
