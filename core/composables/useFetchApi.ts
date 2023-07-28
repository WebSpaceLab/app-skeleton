import type { UseFetchOptions } from "nuxt/app"

export function useFetchApi<T>(path: string, options: UseFetchOptions<T> = { headers: {}}) {
    const config = useRuntimeConfig()
    // const token: string | any = useCookie('Api-Token')
    const { $auth } = useNuxtApp()

    let headers: any = {}

    if($auth.token) {
        headers['Authorization'] = 'Bearer ' + $auth.token as string
    }

    if(process.server) {
        headers = {
            ...headers,
            ...useRequestHeaders(["referer", "cookie"])
        }
    }

    return useFetch(config.public.api + path, {
        ...options, 
        credentials: 'include',
        watch: false,
        headers: {
            "Content-Type": "application/json",
            ...headers,
            ...options?.headers,
        }
    }) 
}