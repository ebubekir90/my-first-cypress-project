// =============================================================================
// Phase 4 — Login Testleri (Page Object Model)
// -----------------------------------------------------------------------------
/// <reference types="cypress" />
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
// Bu testler ZincBank uygulamasının giriş akışını Page Object Model
// (Phase 3) kullanarak doğrular:
//   1. Geçerli credentials ile başarılı giriş ve /dashboard'a yönlendirme
//   2. Yeniden kullanılabilir cy.login() custom komutu
//   3. Hatalı şifre ile girişin reddedilmesi ve hata mesajı
//   4. Giriş yaptıktan sonra çıkış (sign out) akışı
//
// Element ve sayfa eylemleri POM sınıflarında (LoginPage / DashboardPage)
// toplanır; testler yalnızca kullanıcı odaklı senaryoları anlatır.
// =============================================================================

describe('02 - Login Testleri', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  // Her test öncesi login sayfasını aç
  beforeEach(() => {
    loginPage.visit();
  });

  it('Geçerli credentials ile giriş yapılabilmeli ve dashboard açılmalı', () => {
    // Formu doldur ve gönder (bilgiler güvenli env değerlerinden gelir)
    cy.env(['testUserEmail', 'testUserPassword']).then(({ testUserEmail, testUserPassword }) => {
      loginPage.login(testUserEmail, testUserPassword);

      // Başarılı giriş → /dashboard'a yönlendirilir ve temel öğeler görünür
      dashboardPage.assertIsOnDashboard();
      dashboardPage.assertTotalDepositVisible();
      dashboardPage.assertNavigationVisible();
    });
  });

  it('cy.login() custom komutu ile giriş yapılabilmeli', () => {
    // Custom komut, env'deki test kullanıcısıyla giriş yapar
    cy.login();

    dashboardPage.assertIsOnDashboard();
    dashboardPage.assertWelcomeVisible();
  });

  it('Hatalı şifre ile giriş reddedilmeli ve hata mesajı görünmeli', () => {
    cy.env(['testUserEmail']).then(({ testUserEmail }) => {
      loginPage.login(testUserEmail, 'wrong-password');

      // Hâlâ login sayfasındayız ve hata mesajı görünüyor
      loginPage.assertIsOnLoginPage();
      loginPage.assertError('Invalid email or password.');
    });
  });

  it('Giriş yapıldıktan sonra çıkış yapılabilmeli', () => {
    cy.login();

    // Sign out butonuna bas
    dashboardPage.signOut();

    // Kullanıcı login sayfasına döner
    loginPage.assertIsOnLoginPage();
  });
});
