export const phoneNumber = '5219982391978'
export const whatsappBaseUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`

export function getWhatsappMessageUrl(message: string): string {
  const textClean = message.replace(/&/g, '%26')
  return `${whatsappBaseUrl}&text=${textClean}`
}