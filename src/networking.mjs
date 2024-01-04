import fetch from 'node-fetch'

export const buildUrl = (host, paths = [], searchParams, protocol = 'https') => {
  const url = new URL(paths.join('/'), `${protocol}://${host}`)
  const params = new URLSearchParams(searchParams)
  url.search = params
  return url
}

export const makeRequest = async (url, options, extraHeaders) => {
  const requestOptions = {
    headers: {
      accept: 'application/json',
      'accept-language': 'en-ZA,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,af;q=0.6',
      'cache-control': 'max-age=0',
      'content-type': 'application/json',
      ...extraHeaders
    },
    ...options
  }
  const response = await fetch(url.href, requestOptions)
  if (response.status !== 200) throw new Error(response.status)
  if (response.headers.get('content-type') === 'text/html; charset=utf-8') return await response.text()
  return await response.json()
}

export const callService = async (serviceName, requestType, payload) => {
  // Opportunity to increase robustness here, both in checking the params past in and checking the response & response codes
  if (!payload) return makeRequest(buildUrl(serviceName, [requestType], null, 'http'))
  return makeRequest(buildUrl(serviceName, requestType, null, 'http'), {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}
