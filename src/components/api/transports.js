import { apiBaseUrl } from "./api"

export async function getTransports () {

  // Get data
  const endpoint = `${apiBaseUrl}/transports/`
  const response = await fetch(endpoint)
  const transports = await response.json()

  // Format data
  const data = []
  for (const transport of transports) {
    const fields = transport.fields
    data.push ({
      id: fields.key, text: fields.name, price: fields.price, initialActive: fields.por_defecto
    })
  }

  return data
}