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
  // when deploying, uncomment this
  // TODO: find a better way to do this
  // baseURL: 'https://bloomint.xyz:3009'
  baseURL: 'http://127.0.0.1:3009'
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
