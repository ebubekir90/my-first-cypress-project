// =============================================================================
// Phase 6 — Para Transferi Testleri (Page Object Model)
// -----------------------------------------------------------------------------
/// <reference types="cypress" />
import { MoveMoneyPage } from '../../pages/MoveMoneyPage';
// Bu testler ZincBank "Move money" (para transferi) akışını doğrular:
//   1. Sayfa yüklenmesi (transfer + fatura ödeme formları)
//   2. Aynı hesaba transferin SAME_ACCOUNT_TRANSFER ile reddedilmesi
//   3. Alacaklı (payee) ekleme / görme / silme
//
// Not: Gerçek pozitif transfer iki fonlu hesap gerektirir; bu demo kullanıcının
// hesapları $0.00 bakiyede olduğundan gerçek transfer senaryosu test edilemez.
// Aynı hesap reddi, mevcut veriyle test edilebilen en gerçekçi senaryodur.
// Payee testi kendi oluşturduğu kaydı silerek temiz duruma döner (idempotent).
// =============================================================================

describe('04 - Para Transferi Testleri', () => {
  const moveMoneyPage = new MoveMoneyPage();

  // Her test öncesi giriş yap ve move-money sayfasını aç
  beforeEach(() => {
    cy.login();
    moveMoneyPage.visit();
  });

  it('Move money sayfası yüklenmeli ve her iki form görünmeli', () => {
    moveMoneyPage.assertIsOnMoveMoneyPage();
  });

  it('Aynı hesaba transfer SAME_ACCOUNT_TRANSFER ile reddedilmeli', () => {
    moveMoneyPage.typeTransferAmount('100');
    moveMoneyPage.submitTransfer();

    moveMoneyPage.assertTransferResult('SAME_ACCOUNT_TRANSFER');
  });

  it('Alacaklı eklenebilmeli, görünmeli ve silinebilmeli', () => {
    // Başlangıçta alacaklı olmamalı (boş durum)
    moveMoneyPage.assertNoPayees();

    // Yeni alacaklı ekle
    moveMoneyPage.addPayee('Cydeo Electric', '999900001234');

    // Listede görünmeli
    moveMoneyPage.assertPayeeRowVisible('Cydeo Electric');

    // Temiz duruma dönmek için sil
    moveMoneyPage.deleteFirstPayee();
    moveMoneyPage.assertNoPayees();
  });
});
