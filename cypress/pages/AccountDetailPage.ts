/// <reference types="cypress" />

/**
 * ZincBank hesap detay sayfası için Page Object Model (POM).
 *
 * Tek bir hesabın bakiyesini, hesap numarasını ve routing numarasını
 * gösterir. Sayfa /accounts/{accountId} yolundadır.
 */
export class AccountDetailPage {
  // --- Element selector'ları (uygulamanın kararlı data-testid'leri) ---
  private readonly backLink = '[data-testid="account-detail-back"]';
  private readonly balance = '[data-testid="account-detail-balance"]';
  private readonly accountNumber = '[data-testid="account-detail-number"]';
  private readonly routingNumber = '[data-testid="account-detail-routing"]';

  /** Hesap detay sayfasında olduğumuzu doğrular (/accounts/{uuid}). */
  assertIsOnAccountDetail(): this {
    cy.url().should('match', /\/accounts\/[0-9a-f-]{36}$/);
    cy.get(this.balance).should('be.visible');
    return this;
  }

  /** Bakiyenin görünür olduğunu ve para biçiminde olduğunu doğrular. */
  assertBalanceVisible(): this {
    cy.get(this.balance)
      .invoke('text')
      .should('match', /^\$[\d,]+\.\d{2}$/);
    return this;
  }

  /** Hesap numarasının görünür ve boş olmadığını doğrular. */
  assertAccountNumberVisible(): this {
    cy.get(this.accountNumber).should('be.visible').and('not.be.empty');
    return this;
  }

  /** Routing numarasının görünür ve boş olmadığını doğrular. */
  assertRoutingNumberVisible(): this {
    cy.get(this.routingNumber).should('be.visible').and('not.be.empty');
    return this;
  }

  /** "All accounts" bağlantısına tıklayarak hesaplar listesine döner. */
  goBackToAllAccounts(): this {
    cy.get(this.backLink).click();
    return this;
  }
}
