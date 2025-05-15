import { apiBaseUrl } from "./api"

export async function getAirbnbMunicipalities () {

  // Get data
  const endpoint = `${apiBaseUrl}/airbnb-municipalities/`
  const response = await fetch(endpoint)
  const airbnbMunicipalities = await response.json()

  // Format data
  const data = []
  for (const airbnbMunicipality of airbnbMunicipalities) {
    const fields = airbnbMunicipality.fields
    data.push ({
      value: fields.name, label: fields.name, price: fields.extra_price
    })
  }

  return data
}