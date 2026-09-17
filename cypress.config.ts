import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

/**
 * ZincBank — Cypress ana yapılandırma dosyası
 *
 * Phase 1: Cypress + TypeScript kurulumu.
 * Phase 2: Cucumber + BDD entegrasyonu (esbuild preprocessor).
 * Sonraki fazlarda (env yönetimi, reporting, cucumber) buraya
 * eklemeler yapılacak.
 */
export default defineConfig({
  projectId:"hcvucn",
  e2e: {
    // ZincBank uygulamasının ana adresi (tüm cy.visit('/') çağrıları buraya dayanır)
    baseUrl: 'https://zincbank.cydeo.io',

    // Test dosyalarının arandığı desen.
    // Hem POM tabanlı `.cy.ts` spec'leri hem de Cucumber `.feature` dosyaları desteklenir.
    specPattern: 'cypress/e2e/**/*.{cy.ts,cy.js,cy.jsx,cy.tsx,feature}',

    // Support dosyası (her testten önce Cypress tarafından yüklenir)
    supportFile: 'cypress/support/e2e.ts',

    // Viewport (masaüstü tarayıcı varsayılanı)
    viewportWidth: 1280,
    viewportHeight: 720,

    // Bir komutun varsayılan bekleme süresi (ms) — yavaş ağlar için güvenli değer
    defaultCommandTimeout: 10000,

    // Test başarısız olursa otomatik screenshot al (Phase 22'de detaylandırılacak)
    screenshotOnRunFailure: true,

    // Test koşusu sırasında video kaydet (Phase 22'de detaylandırılacak)
    video: true,

    // Konsol çıktısında hangi raporlayıcının kullanılacağı
    reporter: 'spec',

    // Node event'leri — Cucumber + BDD preprocessor'ı burada kurulur.
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // Cucumber preprocessor'ı etkinleştir (JSON rapor üretimi vb. için gerekli).
      await addCucumberPreprocessorPlugin(on, config);

      // `.feature` dosyalarını ve step definition'ları derlemek için esbuild kullan.
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Plugin config'i değiştirmiş olabilir — her zaman geri döndür.
      return config;
    },

    // Ortam değişkenleri — testlerde güvenli değerler için `cy.env('...')` ile erişilir.
    // ZincBank test kullanıcısı (Phase 4 — Login testleri).
    env: {
      testUserEmail: 'student01@zinc.test',
      testUserPassword: '9pJolA7GBQec',
    },
  },
});
