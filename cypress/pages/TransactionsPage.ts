/// <reference types="cypress" />

/**
 * ZincBank Transactions (İşlem Geçmişi) sayfası için Page Object Model (POM).
 *
 * Hesap seçici, güncel bakiye, tarih aralığı filtresi, dönem (statement)
 * ve işlem listesi/sayfalama içerir. İşlem olmayan durumda boş mesaj
 * (`transactions-empty`) ve "0 total" gösterilir, sayfalama devre dışıdır.
 */
export class TransactionsPage {
  // --- Element selector'ları (uygulamanın kararlı data-testid'leri) ---
  private readonly heading = 'h1';
  private readonly accountSelect = '[data-testid="transactions-account"]';
  private readonly balance = '[data-testid="transactions-balance"]';
  private readonly from = '[data-testid="transactions-from"]';
  private readonly to = '[data-testid="transactions-to"]';
  private readonly apply = '[data-testid="transactions-apply"]';
  private readonly emptyState = '[data-testid="transactions-empty"]';
  private readonly total = '[data-testid="transactions-total"]';
  private readonly prev = '[data-testid="transactions-prev"]';
  private readonly next = '[data-testid="transactions-next"]';

  /** Transactions sayfasını açar. */
  visit(): this {
    cy.visit('/transactions');
    return this;
  }

  /** Transactions sayfasında olduğumuzu doğrular. */
  assertIsOnTransactionsPage(): this {
    cy.url().should('include', '/transactions');
    cy.get(this.heading).should('contain.text', 'Transactions');
    cy.get(this.accountSelect).should('be.visible');
    return this;
  }

  /** Güncel bakiyenin para biçiminde göründüğünü doğrular. */
  assertBalanceVisible(): this {
    cy.get(this.balance)
      .invoke('text')
      .should('match', /^\$[\d,]+\.\d{2}$/);
    return this;
  }

  /** Boş durum mesajının göründüğünü doğrular. */
  assertEmptyState(message: string): this {
    cy.get(this.emptyState).should('contain.text', message);
    return this;
  }

  /** Toplam işlem sayısı metnini doğrular (örn. "0 total"). */
  assertTotal(expected: string): this {
    cy.get(this.total).should('contain.text', expected);
    return this;
  }

  /** Sayfalama butonlarının (Previous/Next) devre dışı olduğunu doğrular. */
  assertPaginationDisabled(): this {
    cy.get(this.prev).should('be.disabled');
    cy.get(this.next).should('be.disabled');
    return this;
  }

  /** Tarih aralığı filtresini doldurur ve uygular (date input: YYYY-MM-DD). */
  applyDateRange(fromDate: string, toDate: string): this {
    cy.get(this.from).type(fromDate);
    cy.get(this.to).type(toDate);
    cy.get(this.apply).click();
    return this;
  }
}
