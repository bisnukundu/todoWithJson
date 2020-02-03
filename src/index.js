import "./styles.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { resolve } from "url";
const faker = require('faker')
const axios = require("axios")
const url = 'http://localhost:3000/person';
const tbody = document.querySelector('.tbody');
const table = document.querySelector('.table');
function showData(d, parent) {
    let tr = document.createElement("tr");
    let name = document.createElement("td");
    let email = document.createElement("td");
    let action = document.createElement("td");
    let phone = document.createElement("td");
    let id = document.createElement("td");
    let del = document.createElement("button")
    let edt = document.createElement("button")
    del.innerText = "Delete"
    edt.innerText = "Edit"
    name.innerHTML = d.name ? d.name : "N/A";
    email.innerHTML = d.email ? d.email : "N/A";
    phone.innerHTML = d.phone ? d.phone : "N/A";
    id.innerHTML = d.id;
    action.appendChild(del)
    action.appendChild(edt)
    tr.appendChild(name)
    tr.appendChild(email)
    tr.appendChild(action)
    tr.appendChild(phone)
    tr.appendChild(id)
    parent.appendChild(tr)
    del.addEventListener("click", function (e) {
        axios.delete(`${url}/${d.id}`)
            .then(res => {
                e.target.parentNode.parentNode.parentNode.removeChild(tr)
            })
    })
    let nam = document.querySelector(".name");
    let ema = document.querySelector(".email");
    let pho = document.querySelector(".phone");
    let f_edit = document.querySelector(".edit");
    edt.addEventListener("click", function () {
        nam.value = d.name;
        ema.value = d.email;
        pho.value = d.phone;
        f_edit.addEventListener('click', () => {
            axios.put(`${url}/${d.id}`, {
                name: nam.value,
                email: ema.value,
                phone: pho.value
            })
                .then((res) => {
                    console.log(res.data)
                    name.innerHTML = res.data.name ? res.data.name : "N/A";
                    email.innerHTML = res.data.email ? res.data.email : "N/A";
                    phone.innerHTML = res.data.phone ? res.data.phone : "N/A";
                    nam.value= ""
                    ema.vlaue =""
                    pho.value = ""
                })
        })
    })
}
axios.get(url)
    .then((res) => {
        res.data.forEach((da) => {
            showData(da, tbody)
        })
    })
function add() {
    let nam = document.querySelector(".name");
    let ema = document.querySelector(".email");
    let pho = document.querySelector(".phone");
    let obj = {
        name: nam.value.charAt(0).toUpperCase() + nam.value.slice(1),
        email: ema.value,
        phone: pho.value
    }
    axios.post(url, obj)
        .then((rs) => { showData(rs.data, tbody) })
    nam.value = "";
    ema.value = "";
    pho.value = ""
}
document.querySelector(".phone").addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        add()
    }
})
