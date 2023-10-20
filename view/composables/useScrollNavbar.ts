export function useScrollNavbar() {
    let isScroll = ref(false)

    function scrollNavbar() {
        let navbar: any = document.getElementById('main-nav');

        window.addEventListener('scroll', () => {
            if(window.scrollY > navbar.scrollTop){
                isScroll.value = true
                // isShowMenu.value = false
            } else {
                isScroll.value = false
                // isShowMenu.value = true
            }
        })
    }

    return {
        isScroll, scrollNavbar
    }
}