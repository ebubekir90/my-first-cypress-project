/// <reference types="cypress" />

/**
 * ZincBank Move Money (Para Transferi) sayfası için Page Object Model (POM).
 *
 * İki bölüm içerir:
 *   1. "Transfer between accounts" — hesaptan hesaba transfer
 *   2. "Pay a bill" + "Payees" — fatura ödeme ve alacaklı (payee) yönetimi
 *
 * Transfer hataları `transfer-result` elementi içinde hata kodu olarak
 * gösterilir (örn. SAME_ACCOUNT_TRANSFER).
 */
export class MoveMoneyPage {
  // --- Element selector'ları (uygulamanın kararlı data-testid'leri) ---
  private readonly heading = 'h1';

  // Transfer bölümü
  private readonly transferForm = '[data-testid="transfer-form"]';
  private readonly transferFrom = '[data-testid="transfer-from"]';
  private readonly transferTo = '[data-testid="transfer-to"]';
  private readonly transferAmount = '[data-testid="transfer-amount"]';
  private readonly transferMemo = '[data-testid="transfer-memo"]';
  private readonly transferSubmit = '[data-testid="transfer-submit"]';
  private readonly transferResult = '[data-testid="transfer-result"]';

  // Fatura ödeme / payee bölümü
  private readonly billpayForm = '[data-testid="billpay-form"]';
  private readonly billpayNoPayees = '[data-testid="billpay-no-payees"]';
  private readonly payeeAddName = '[data-testid="payee-add-name"]';
  private readonly payeeAddAccount = '[data-testid="payee-add-account"]';
  private readonly payeeAddSubmit = '[data-testid="payee-add-submit"]';
  private readonly payeeRow = '[data-testid^="payee-row-"]';
  private readonly payeeDelete = '[data-testid^="payee-delete-"]';

  /** Move Money sayfasını açar. */
  visit(): this {
    cy.visit('/move-money');
    return this;
  }

  /** Move Money sayfasında olduğumuzu doğrular (her iki form görünür). */
  assertIsOnMoveMoneyPage(): this {
    cy.url().should('include', '/move-money');
    cy.get(this.heading).should('contain.text', 'Move money');
    cy.get(this.transferForm).should('be.visible');
    cy.get(this.billpayForm).should('be.visible');
    return this;
  }

  // ----------------------------- Transfer -----------------------------

  /** Transfer tutarını doldurur. */
  typeTransferAmount(amount: string): this {
    cy.get(this.transferAmount).clear().type(amount);
    return this;
  }

  /** Transfer isteğini gönderir. */
  submitTransfer(): this {
    cy.get(this.transferSubmit).click();
    return this;
  }

  /** Transfer sonucunun (hata kodu) göründüğünü doğrular. */
  assertTransferResult(expected: string): this {
    cy.get(this.transferResult).should('contain.text', expected);
    return this;
  }

  // ------------------------- Fatura / payee ---------------------------

  /** Henüz alacaklı olmadığını (boş durum) doğrular. */
  assertNoPayees(): this {
    cy.get(this.billpayNoPayees).should('be.visible');
    return this;
  }

  /** Yeni bir alacaklı (payee) ekler. */
  addPayee(name: string, account: string): this {
    cy.get(this.payeeAddName).type(name);
    cy.get(this.payeeAddAccount).type(account);
    cy.get(this.payeeAddSubmit).click();
    return this;
  }

  /** Listedeki ilk payee satırının ilgili adı içerdiğini doğrular. */
  assertPayeeRowVisible(name: string): this {
    cy.get(this.payeeRow).first().should('contain.text', name);
    return this;
  }

  /** Listedeki ilk payee'yi siler. */
  deleteFirstPayee(): this {
    cy.get(this.payeeDelete).first().click();
    return this;
  }
}
