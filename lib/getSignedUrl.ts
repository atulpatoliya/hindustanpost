import crypto from 'crypto'

const getSignedUrl = (baseURL: string, ttl: number = 60): string => {
  const secret = process.env.SIGNED_URL_SECRET
  if (!secret) throw new Error('Missing SIGNED_URL_SECRET env variable')

  const expires = Math.floor(Date.now() / 1000) + ttl
  const payload = `expires=${expires}`

  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')

  const separator = baseURL.includes('?') ? '&' : '?'
  const finalUrl = `${baseURL}${separator}expires=${expires}&signature=${signature}`

  return finalUrl
}

export default getSignedUrl


