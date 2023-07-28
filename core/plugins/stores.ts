import { useGeneralStore } from "~~/core/stores/useGeneralStore";
import { useAuthStore } from "~~/core/stores/useAuthStore";
import { useNavbarStore } from "~~/core/stores/useNavbarStore";
import { useAboutStore } from "~~/core/stores/useAboutStore";
import { useFlashStore } from "~~/core/stores/useFlashStore";
import { useContactStore } from "~~/core/stores/useContactStore";
import { useSocialStore } from "~~/core/stores/useSocialStore";
import { useAccountStore } from "~~/core/stores/useAccountStore";
import { useDashboardStore } from "~~/core/stores/useDashboardStore";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            auth: useAuthStore(),
            general: useGeneralStore(),
            navbar: useNavbarStore(),
            about: useAboutStore(),
            flash: useFlashStore(),
            contact: useContactStore(),
            social: useSocialStore(),
            account: useAccountStore(),
            dashboard: useDashboardStore(),
        }
    }
})