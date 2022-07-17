
interface Options {
    headers: {
        'Content-Type': string,
        'Authorization'?: string
    },
    baseURL: string
}

const axiosOptions: Options = {
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: 'https://api.bloomint.net'
};

export const getOptions = (): Options => axiosOptions;

export const getOptionsAuthed = (): Options => {
    const optionsWithAuth = {
        ... axiosOptions
    }

    optionsWithAuth.headers['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;

    return optionsWithAuth;
}