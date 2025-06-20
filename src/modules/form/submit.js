import dayjs from "dayjs"

import {scheduleNew} from "../../services/schedule-new.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

selectedDate.value = inputToday
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    // Recuperando o nome do cliente.
    const name = clientName.value.trim()
    if(!name){
      alert("Informe o nome do cliente!")
    }

    // Recuperar o horário selecionado.
    const hourSelected = document.querySelector(".hour-selected")
    if(!hourSelected){
      return alert("Selecione a hora.")
    }

    // Recupera somente a hora.
    const [hour] = hourSelected.innerText.split(":")

    // Inserir a hora na data.
    const when = dayjs(selectedDate.value).add(hour, "hour")
    
    // Gera um id
    const id = new Date().getTime()

    await scheduleNew({
      id,
      name,
      when,
    })

  } catch (error) {
    alert("Não foi possivel realizar o agendamento")
    console.log(error)
  }
}