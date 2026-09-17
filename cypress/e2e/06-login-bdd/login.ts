// =============================================================================
// Login — Cucumber Step Definitions
// -----------------------------------------------------------------------------
// Bu dosya `login.feature` dosyasındaki Gherkin adımlarını tanımlar.
// Adımlar, mevcut Page Object Model'leri (LoginPage, DashboardPage) yeniden
// kullanır; böylece BDD senaryoları ile POM tekrarı önlenir.
//
// Not: Step definition'lar `.feature` dosyasıyla aynı klasörde ve aynı adla
// tutulur (varsayılan `stepDefinitions` deseni: cypress/e2e/[filepath].ts).
// =============================================================================
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

// POM örnekleri — tüm adımlar bu nesneler üzerinden çalışır.
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

// --- Arka Plan (Background) ---
Given('Login sayfasındayım', () => {
  loginPage.visit();
});

// --- Giriş adımları ---
Given('Geçerli bilgilerle giriş yaptım', () => {
  cy.env(['testUserEmail', 'testUserPassword']).then(({ testUserEmail, testUserPassword }) => {
    loginPage.login(testUserEmail, testUserPassword);
    dashboardPage.assertIsOnDashboard();
  });
});

When('Geçerli bilgilerle giriş yaparım', () => {
  cy.env(['testUserEmail', 'testUserPassword']).then(({ testUserEmail, testUserPassword }) => {
    loginPage.login(testUserEmail, testUserPassword);
  });
});

When('"{string}" emaili ve "{string}" şifresi ile giriş yaparım', (email: string, password: string) => {
  loginPage.login(email, password);
});

// --- Doğrulama adımları ---
Then('Dashboard sayfasındayım', () => {
  dashboardPage.assertIsOnDashboard();
});

Then('Karşılama mesajını görürüm', () => {
  dashboardPage.assertWelcomeVisible();
});

Then('"{string}" hata mesajını görürüm', (message: string) => {
  loginPage.assertError(message);
});

// Not: Aşağıdaki adım "Login sayfasındayım" (Given) ile aynı metni kullanamaz;
// Cucumber adımları Given/When/Then anahtar kelimesine bakmadan metne göre
// eşleştirdiği için "Multiple matching step definitions" hatası oluşurdu.
// Bu yüzden çıkış sonrası doğrulama farklı bir ifadeyle tanımlanır.
Then('Login sayfasına geri döndüm', () => {
  loginPage.assertIsOnLoginPage();
});

// --- Çıkış adımı ---
When('Çıkış yaparım', () => {
  dashboardPage.signOut();
});
