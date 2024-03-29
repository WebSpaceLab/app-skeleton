import { useGeneralStore } from "~~/view/stores/useGeneralStore";
import { useAuthStore } from "~~/view/stores/useAuthStore";
import { useNavbarStore } from "~~/view/stores/useNavbarStore";
import { useAboutStore } from "~~/view/stores/useAboutStore";
import { useFlashStore } from "~~/view/stores/useFlashStore";
import { useContactStore } from "~~/view/stores/useContactStore";
import { useSocialStore } from "~~/view/stores/useSocialStore";
import { useAccountStore } from "~~/view/stores/useAccountStore";
import { useDashboardStore } from "~~/view/stores/useDashboardStore";
import { useMetaTagsStore } from "~~/view/stores/useMetaTagsStore";
import { useMediaStore } from "~~/view/stores/useMediaStore";
import { useInboxStore } from "~~/view/stores/useInboxStore";
import { usePriceStore } from "~~/view/stores/usePriceStore";
import { useFeatureStore } from "~~/view/stores/useFeatureStore";
import { useHeroStore } from "~~/view/stores/useHeroStore";
import { useTeamStore } from "~~/view/stores/useTeamStore";
import { useArticleStore } from "~~/view/stores/useArticleStore";
import { useCategoriesStore } from "~~/view/stores/useCategoriesStore";
import { useUsersStore } from "~~/view/stores/useUsersStore";
import { useAdvertisementStore } from "~~/view/stores/useAdvertisementStore";
import { useHomepageStore } from "~~/view/stores/useHomepageStore";
import { useGalleriesStore } from "~~/view/stores/useGalleriesStore";

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
            metaTags: useMetaTagsStore(),
            media: useMediaStore(),
            inbox: useInboxStore(),
            price: usePriceStore(),
            feature: useFeatureStore(),
            hero: useHeroStore(),
            team: useTeamStore(),
            article: useArticleStore(),
            categories: useCategoriesStore(),
            users: useUsersStore(),
            advertisement: useAdvertisementStore(),
            homepage: useHomepageStore(),
            galleries: useGalleriesStore(),
        }
    }
})