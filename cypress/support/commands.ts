// =============================================================================
// Custom Cypress Commands
// -----------------------------------------------------------------------------
/// <reference types="cypress" />
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
// Bu dosya yeniden kullanılabilir, global Cypress komutlarını barındırır.
//   cy.getByTestId(id)   : data-testid özniteliğine göre element seçer
//   cy.login(...)        : ZincBank'a kullanıcı girişi yapar
//
// NOT: Page Object Model ile gereksiz tekrar oluşturulmamalıdır.
//      Her yapının sorumluluğu net olacak şekilde ayrılır:
//      - POM  : sayfa elementleri + sayfaya özgü eylemler
//      - Custom Commands: birden çok sayfayı kapsayan akışlar (örn. login)
// =============================================================================

// TypeScript'e özel Cypress komutlarının imzalarını bildirir.
// Bu sayede cy.getByTestId(...) ve cy.login(...) tip güvenli kullanılabilir.
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * `data-testid` özniteliğine göre bir element seçer.
       * Örnek: cy.getByTestId('login-submit')
       */
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;

      /**
       * ZincBank uygulamasına kullanıcı girişi yapar.
       * Parametre verilmezse cypress.config.ts içindeki env değerleri
       * (testUserEmail / testUserPassword) kullanılır.
       * Örnek: cy.login() veya cy.login('email', 'sifre')
       */
      login(email?: string, password?: string): Chainable<void>;
    }
  }
}

/**
 * `data-testid` özniteliğine göre element seçer.
 * ZincBank uygulaması testler için kararlı data-testid'ler kullanır,
 * bu yüzden uzun ve kırılgan CSS selector'larından kaçınılır.
 */
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

/**
 * ZincBank'a kullanıcı girişi yapar.
 * - Parametre verilmezse env değişkenlerindeki test kullanıcısı kullanılır.
 *   (Güvenli değerler olduğu için Cypress 16'daki `cy.env()` ile okunur.)
 * - LoginPage POM'u formu doldurup gönderir.
 * - Başarılı giriş sonrası DashboardPage üzerinden /dashboard doğrulanır.
 */
Cypress.Commands.add('login', (email?: string, password?: string) => {
  // Belirli credentials verilmişse doğrudan onlarla giriş yap.
  if (email && password) {
    new LoginPage().visit().login(email, password);
    new DashboardPage().assertIsOnDashboard();
    return;
  }

  // Credentials verilmediyse güvenli env değerlerini oku ve giriş yap.
  cy.env(['testUserEmail', 'testUserPassword']).then(({ testUserEmail, testUserPassword }) => {
    new LoginPage().visit().login(testUserEmail, testUserPassword);
    new DashboardPage().assertIsOnDashboard();
  });
});

export {};
