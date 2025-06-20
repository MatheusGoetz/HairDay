import { apiConfig } from "./api-config.js";

export async function scheduleNew({id, name, when}) {
  try {
    await fetch(`${apiConfig.baseURL}/schedules`, {
      method: "POST",
      headers: {
        "Content-type": "aplication/json"
      },
      body: JSON.stringify({id, name, when})
    })

    alert("Agendamento realizado como sucesso!")
  } catch (error) {
    console.log(error)
    alert("Não foi possivel agendar! tente novamente mais tarde.")
  }
}