export default defineNuxtRouteMiddleware((to, from) => {
    const { $auth } = useNuxtApp()

    if(!$auth.isLoggedIn) {
        return navigateTo('/', {replace: true})
    }
})