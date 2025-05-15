import { apiBaseUrl } from "./api"

export async function getHotels () {

  // Get data
  const endpoint = `${apiBaseUrl}/hotels/`
  const response = await fetch(endpoint)
  const hotels = await response.json()

  // Format data
  const data = []
  for (const hotel of hotels) {
    const fields = hotel.fields
    data.push ({
      value: fields.name, label: fields.name, price: fields.extra_price
    })
  }

  return data
}