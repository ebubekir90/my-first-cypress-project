/// <reference types="cypress" />

/**
 * ZincBank Accounts (Hesaplarım) sayfası için Page Object Model (POM).
 *
 * Kullanıcının banka hesaplarını listeler ve yeni tasarruf hesabı
 * açmasını sağlar. Her hesap kartı `accounts-card-{accountId}` testid'i
 * ile işaretlenir ve detay sayfasına link verir.
 */
export class AccountsPage {
  // --- Element selector'ları (uygulamanın kararlı data-testid'leri) ---
  private readonly heading = 'h1';
  private readonly openSavingsButton = '[data-testid="accounts-open-savings"]';
  private readonly accountsList = '[data-testid="accounts-list"]';
  // Dinamik ID'li kartlar için prefix eşleşmesi kullanılır.
  private readonly accountCard = '[data-testid^="accounts-card-"]';

  /** Accounts sayfasını açar. */
  visit(): this {
    cy.visit('/accounts');
    return this;
  }

  /** Accounts sayfasında olduğumuzu doğrular. */
  assertIsOnAccountsPage(): this {
    cy.url().should('include', '/accounts');
    cy.get(this.heading).should('contain.text', 'Your accounts');
    cy.get(this.openSavingsButton).should('be.visible');
    return this;
  }

  /** Yeni tasarruf hesabı açma butonuna basar. */
  openSavingsAccount(): this {
    cy.get(this.openSavingsButton).click();
    return this;
  }

  /** Listedeki tüm hesap kartlarını döndürür. */
  getAccountCards(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.accountCard);
  }

  /** Listedeki ilk hesap kartının görünür olduğunu doğrular. */
  assertAccountCardVisible(): this {
    cy.get(this.accountCard).first().should('be.visible');
    return this;
  }

  /** İlk hesap kartına tıklayarak detay sayfasına gider. */
  openFirstAccount(): this {
    cy.get(this.accountCard).first().click();
    return this;
  }
}
