export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $auth, $navbar } = useNuxtApp()

    
    if(to.query.verified) {
        $navbar.showLogin()
        $auth.response = {
            status: 'Rejestracja przeszła pomyślnie. Możesz się teraz zalogować.'
        }
    }
    
    $auth.reset()
    $navbar.reset()
    
    if(!process.server) {
        if($auth.token === null) {
            $auth.logout()
        }
        
        if($auth.isLoggedIn) {
            try {
                await $auth.init()
            } catch (error) {
                console.log(error)
            }
        } else {
            
        } 
    } else {

    }
})