export default defineNuxtRouteMiddleware((to, from) => {
    const { $auth, $general } = useNuxtApp()

    if(!$auth.isLoggedIn) {
        $general.isLoading = true
        return navigateTo('/', {replace: true})
        $general.isLoading = false
    }
})