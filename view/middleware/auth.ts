export default defineNuxtRouteMiddleware((to, from) => {
    const { $auth, $general } = useNuxtApp()

    if(!$auth.isLoggedIn) {
        return navigateTo('/', {replace: true})
    }
})