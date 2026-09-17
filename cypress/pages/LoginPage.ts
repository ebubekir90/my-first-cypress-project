/// <reference types="cypress" />

/**
 * ZincBank Login sayfası için Page Object Model (POM).
 *
 * Sorumluluklar:
 *  - Sayfa elementlerini (kararlı `data-testid`) tek noktadan yönetmek
 *  - Sayfaya özgü eylemleri ve doğrulamaları barındırmak
 *
 * Not: Birden çok sayfayı kapsayan akışlar (örn. giriş sonrası dashboard)
 * custom komutlar (cy.login) tarafından yönetilir. Bu sınıf yalnızca
 * login sayfasına özgü element ve eylemleri kapsar.
 */
export class LoginPage {
  // --- Element selector'ları (uygulamanın kararlı data-testid'leri) ---
  private readonly emailInput = '[data-testid="login-email-input"]';
  private readonly passwordInput = '[data-testid="login-password-input"]';
  private readonly submitButton = '[data-testid="login-submit"]';
  private readonly errorMessage = '[data-testid="login-error"]';
  private readonly applyLink = '[data-testid="login-apply-link"]';
  private readonly heading = 'h1';

  /** Login sayfasını açar; akıcı (fluent) zincirleme için `this` döner. */
  visit(): this {
    cy.visit('/login');
    return this;
  }

  /** Email alanını temizleyip verilen değeri yazar. */
  typeEmail(email: string): this {
    cy.get(this.emailInput).clear().type(email);
    return this;
  }

  /** Şifre alanını temizleyip verilen değeri yazar (log'da gizlenir). */
  typePassword(password: string): this {
    cy.get(this.passwordInput).clear().type(password, { log: false });
    return this;
  }

  /** "Sign in" butonuna basar. */
  submit(): this {
    cy.get(this.submitButton).click();
    return this;
  }

  /** Formu doldurup gönderir — tek adımda giriş yapmayı sağlar. */
  login(email: string, password: string): this {
    return this.typeEmail(email).typePassword(password).submit();
  }

  /** Hâlâ login sayfasında olduğumuzu doğrular. */
  assertIsOnLoginPage(): this {
    cy.get(this.heading).should('contain.text', 'Sign in to ZincBank');
    cy.get(this.submitButton).should('be.visible');
    return this;
  }

  /** Hata mesajının görünür olduğunu ve beklenen metni içerdiğini doğrular. */
  assertError(expectedText: string): this {
    cy.get(this.errorMessage).should('be.visible').and('contain.text', expectedText);
    return this;
  }
}
