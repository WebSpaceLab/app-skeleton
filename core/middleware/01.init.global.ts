export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $auth, $navbar } = useNuxtApp()
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date +' '+ time;
    
    if(to.query.verified) {
        $navbar.showLogin()
        $auth.response = {
            status: 'Rejestracja przeszła pomyślnie. Możesz się teraz zalogować.'
        }
    }
    
    $auth.reset()
    $navbar.reset()
    
    if(!process.server) {
        if($auth.isLoggedIn || $auth.tokenExpiresAt < dateTime) {
            try {
                await $auth.init()
            } catch (error) {
                console.log(error)
            }
        } else {
            $auth.isLoggedIn = false
        }
        // TODO - jeżeli jest error 401 to wyloguj
        if($auth.token === null ) {
            $auth.logout()
        }
    } 
})