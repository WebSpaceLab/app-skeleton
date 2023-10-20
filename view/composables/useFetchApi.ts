import type { UseFetchOptions } from "nuxt/app"

export function useFetchApi<T>(path: string, options: UseFetchOptions<T> = { headers: {}}) {
    const config = useRuntimeConfig()
    // const token: string | any = useCookie('Api-Token')
    const { $auth } = useNuxtApp()

    let headers: any = {
        accept: "application/json",
        "Content-Type": "application/json",
        referer: config.public.appUrl
    }

    if($auth.token) {
        headers['Authorization'] = 'Bearer ' + $auth.token as string
    }

    if(process.server) {
        headers = {
            ...headers,
            ...useRequestHeaders(["cookie"])
        }
    }

    return useFetch(config.public.apiUrl + path, {
        ...options, 
        credentials: 'include',
        watch: false,
        headers: {
            ...headers,
            ...options?.headers,
        }
    }) 
}