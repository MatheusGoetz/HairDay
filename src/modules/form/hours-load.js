import dayjs from "dayjs"
import {openingHours} from "../../utils/opening-hours.js"
import { hoursClick } from "./hours-click.js"

const hours = document.getElementById("hours")

export function hoursLoad({ date }) {
  // Limpa a lista de horas, quando alterado a data.
  hours.innerHTML = ""

  const opening = openingHours.map((hour) => {
    // Recupera somente a hora.
    const [schedulesHour] = hour.split(":")

    // Adiciona a hora na data e verifica se está no passado.
    const isHourPast = dayjs(date).add(schedulesHour, "hour").isAfter(dayjs())

    return {
      hour,
      available: isHourPast 
    }
  })

  opening.forEach(({hour, available}) => {
    const li = document.createElement("li")
    li.classList.add("hour")
    li.classList.add(available ? "hour-available" : "hour-unavailable")

    li.textContent = hour

    if(hour === "9:00") {
      hourHeaderAdd("Manhã")
    } else if(hour === "13:00"){
      hourHeaderAdd("Tarde")
    } else if(hour === "18:00"){
      hourHeaderAdd("Noite")
    }
    hours.append(li)
  })

  // Adiciona o evento de click nos horários disponíveis.
  hoursClick()
}

function hourHeaderAdd(title){
  const header = document.createElement("li")
  header.classList.add("hour-period")
  header.textContent = title

  hours.append(header)
}