export default defineNuxtRouteMiddleware((to, from) => {
    const { $auth, $dashboard } = useNuxtApp()

    if(!$auth.isLoggedIn) {
        return navigateTo('/', {replace: true})
    }
})