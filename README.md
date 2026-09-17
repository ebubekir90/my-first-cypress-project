# 🏦 ZincBank — Test Automation Framework

**ZincBank** simüle bankacılık uygulaması için profesyonel, sürdürülebilir ve ölçeklenebilir bir test otomasyon framework'ü.

## 🧰 Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| [Cypress](https://www.cypress.io/) 16.x | E2E UI & API test aracı |
| TypeScript 7.x | Tip güvenli, production kalitesinde kod |
| Cucumber + BDD | Gherkin formatında senaryolar (Phase 2) |
| Page Object Model | UI element ve aksiyonların merkezi yönetimi (Phase 3) |
| GitHub Actions | CI/CD pipeline (Phase 12) |

## 🎯 Proje Amacı

Kullanıcıların bankacılık işlemlerini güvenilir, sürdürülebilir ve tekrar çalıştırılabilir şekilde test etmek:

- Kullanıcı kayıt / müşteri oluşturma
- Login / Logout
- Hesap görüntüleme, bakiye & IBAN kontrolü
- Kendi hesapları arasında ve başka müşteriye para transferi
- Transfer sonrası bakiye doğrulama
- Yetersiz bakiye / geçersiz IBAN / hatalı tutar kontrolleri
- İşlem geçmişi kontrolü
- Profil bilgileri
- Güvenli logout & yetkisiz erişim kontrolü (Security/Authorization)

## 🌐 Uygulama

- **URL:** https://zincbank.cydeo.io/
- Simüle banka — gerçek para yok, tamamen test eğitimi için deterministik ortam.

## 🗂 Proje Yapısı

```text
ZincBank-Test-Automation/
│
├── cypress/
│   ├── e2e/                    # Test dosyaları (spec + .feature + step definitions)
│   │   ├── 01-setup/           # Phase 1 doğrulama testleri
│   │   ├── 02-login/           # Login spec'leri (POM tabanlı)
│   │   └── 06-login-bdd/       # Login BDD (login.feature + login.ts step definitions)
│   ├── pages/                  # Page Object Model (Phase 3)
│   ├── fixtures/               # Test verileri (Phase 9)
│   └── support/                # commands.ts + e2e.ts
│       ├── commands.ts         # Custom Cypress commands (Phase 15)
│       └── e2e.ts              # Global setup
│
├── api/                        # API test yardımcıları (Phase 8)
├── reports/                    # Test raporları (Phase 10)
│
├── cypress.config.ts           # Cypress yapılandırması
├── package.json                # Bağımlılıklar + scriptler
├── tsconfig.json               # TypeScript yapılandırması
├── .env.example                # Ortam değişkenleri şablonu
├── .gitignore
└── README.md
```

## 🚀 Kurulum

```bash
# 1. Bağımlılıkları kur
npm install

# 2. Ortam değişkenlerini hazırla
copy .env.example .env

# 3. Tip kontrolü
npm run typecheck

# 4a. Cypress Test Runner'ı aç (interaktif)
npm run cypress:open

# 4b. Tüm testleri headless çalıştır
npm run cypress:run
```

## 📜 npm Script'leri

| Script | Açıklama |
|--------|----------|
| `npm run cypress:open` | Interaktif Test Runner |
| `npm run cypress:run` | Tüm testleri headless çalıştır |
| `npm run typecheck` | TypeScript tip kontrolü |
| `npx cypress verify` | Cypress binary doğrulaması |

## 🔄 Faz Planı (Aşama Aşama)

| Faz | Konu | Durum |
|-----|------|-------|
| Phase 1 | Cypress + TypeScript kurulumu | ✅ Tamamlandı |
| Phase 2 | Cucumber + BDD entegrasyonu | ✅ Tamamlandı (Login BDD — Türkçe Gherkin) |
| Phase 3 | Page Object Model | ✅ Tamamlandı (Login/Dashboard) |
| Phase 4 | Login testleri | |
| Phase 5 | Account testleri | ✅ Tamamlandı (liste + detay) |
| Phase 6 | Para transferi testleri | ✅ Tamamlandı (transfer reddi + payee) |
| Phase 7 | Transaction History | ✅ Tamamlandı (boş durum + filtre) |
| Phase 8 | API Testing | |
| Phase 9 | Test Data Management | |
| Phase 10 | Reporting | |
| Phase 11 | GitHub | |
| Phase 12 | GitHub Actions CI/CD | |

---

## ⚠️ Bilinen Durumlar

- **Credentials:** `student01@zinc.test` / `9pJolA7GBQec` Phase 4 (Login Testleri) ile doğrulandı ve `cypress.config.ts` içindeki `env` değişkenlerine eklendi. Testler `cy.login()` custom komutu ile bu bilgileri kullanır.
- **Electron deprecated:** Cypress 16'da Electron test tarayıcısı deprecated. Chrome/Edge kullanılması önerilir.
- **Cucumber + BDD (Phase 2):** `@badeball/cypress-cucumber-preprocessor` + `@bahmutov/cypress-esbuild-preprocessor` ile kuruldu.
  - `.feature` dosyaları ile POM tabanlı `.cy.ts` spec'leri **birlikte** çalışır (`specPattern: cypress/e2e/**/*.{cy.ts,...,feature}`).
  - Step definition'lar, ilgili `.feature` dosyasıyla **aynı klasörde ve aynı adla** tutulur (varsayılan `stepDefinitions` eşleştirmesi). Örn. `06-login-bdd/login.feature` ↔ `06-login-bdd/login.ts`.
  - Login BDD senaryoları Türkçe Gherkin anahtar kelimeleri kullanır (`# language: tr`). **Not:** Gherkin'de step satırlarında ayraç iki nokta değil **boşluk** olmalıdır (örn. `Eğer Geçerli bilgilerle giriş yaparım`); iki nokta yalnızca Özellik/Senaryo/Arka Plan gibi başlıklarda kullanılır.
