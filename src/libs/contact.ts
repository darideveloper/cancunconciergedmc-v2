export function getWhatsappMessageUrl(message: string): string {
  const phoneNumber = '5219982391978'
  const baseUrl = 'https://api.whatsapp.com/send?phone='
  const textClean = message.replace(/&/g, '%26')
  return `${baseUrl}${phoneNumber}&text=${textClean}`
}