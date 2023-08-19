interface Options {
  headers: {
    'Content-Type': string
    'Authorization'?: string
  }
  baseURL: string
}

const axiosOptions: Options = {
  headers: {
    'Content-Type': 'application/json'
  },
  // baseURL: 'https://api.bloomint.net'
  baseURL: 'http://localhost:5000'
}

export const getOptions = (): Options => axiosOptions

export const getOptionsAuthed = (): Options => {
  const optionsWithAuth = {
    ...axiosOptions
  }

  const userToken = localStorage.getItem('userToken')

  if (userToken !== null) {
    optionsWithAuth.headers.Authorization = `Bearer ${userToken}`
  }

  return optionsWithAuth
}
