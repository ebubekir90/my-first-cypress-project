// =============================================================================
// Phase 7 — Transaction History (İşlem Geçmişi) Testleri (Page Object Model)
// -----------------------------------------------------------------------------
/// <reference types="cypress" />
import { TransactionsPage } from '../../pages/TransactionsPage';
// Bu testler ZincBank "Transactions" (işlem geçmişi) akışını doğrular:
//   1. Sayfa yüklenmesi (başlık + hesap seçici + güncel bakiye)
//   2. İşlem olmadığında boş durum ve devre dışı sayfalama
//   3. Tarih aralığı filtresinin uygulanması (işlemsiz veride boş durum korunur)
//
// Not: Bu demo kullanıcının henüz işlemi yoktur; bu yüzden ana senaryo boş
// durumdur. İşlem/statement içeren veri geldiğinde bu testler listeye
// genişletilebilir.
// =============================================================================

describe('05 - İşlem Geçmişi Testleri', () => {
  const transactionsPage = new TransactionsPage();

  // Her test öncesi giriş yap ve transactions sayfasını aç
  beforeEach(() => {
    cy.login();
    transactionsPage.visit();
  });

  it('Transactions sayfası yüklenmeli ve güncel bakiye görünmeli', () => {
    transactionsPage.assertIsOnTransactionsPage();
    transactionsPage.assertBalanceVisible();
  });

  it('İşlem olmadığında boş durum ve sayfalama devre dışı olmalı', () => {
    transactionsPage.assertEmptyState('No transactions for this account and range.');
    transactionsPage.assertTotal('0 total');
    transactionsPage.assertPaginationDisabled();
  });

  it('Tarih aralığı filtresi uygulanabilmeli (boş durum korunmalı)', () => {
    transactionsPage.applyDateRange('2026-01-01', '2026-12-31');

    transactionsPage.assertEmptyState('No transactions for this account and range.');
    transactionsPage.assertTotal('0 total');
  });
});
