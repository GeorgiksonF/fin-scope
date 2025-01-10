
// import Aura from '@primevue/themes/aura'
import PrimeVuePreset from './config/primevue-presets'

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@primevue/nuxt-module'
    ],
    primevue: {
        options: {
            theme: {
                preset: PrimeVuePreset
            }
        }
    },
    nitro: {
        storage: {
        redis: { driver: 'redis', host: '127.0.0.1', port: 6379 },
        },
    }
})