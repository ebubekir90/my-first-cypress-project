// =============================================================================
// Phase 5 — Account Testleri (Page Object Model)
// -----------------------------------------------------------------------------
/// <reference types="cypress" />
import { AccountsPage } from '../../pages/AccountsPage';
import { AccountDetailPage } from '../../pages/AccountDetailPage';
// Bu testler ZincBank hesaplarım akışını doğrular:
//   1. Accounts sayfasının yüklenmesi (başlık + açma butonu)
//   2. Yeni tasarruf hesabı açma ve listede görünmesi
//   3. Hesap detay sayfasında bakiye, hesap ve routing numarası
//   4. Detay sayfasından hesaplar listesine dönüş
//
// Not: Bu kullanıcı için hesap detay sayfası IBAN yerine "hesap numarası"
// ve "routing numarası" gösterir; testler gerçek uygulama yapısına uygundur.
// =============================================================================

describe('03 - Account Testleri', () => {
  const accountsPage = new AccountsPage();
  const accountDetailPage = new AccountDetailPage();

  // Her test öncesi giriş yap ve accounts sayfasını aç
  beforeEach(() => {
    cy.login();
    accountsPage.visit();
  });

  it('Accounts sayfası yüklenmeli ve temel öğeler görünmeli', () => {
    accountsPage.assertIsOnAccountsPage();
  });

  it('Yeni tasarruf hesabı açılabilmeli ve listede görünmeli', () => {
    accountsPage.openSavingsAccount();
    accountsPage.assertAccountCardVisible();
  });

  it('Hesap detay sayfası bakiye, hesap ve routing numarasını göstermeli', () => {
    // İlk hesabın detayına git
    accountsPage.openFirstAccount();

    accountDetailPage.assertIsOnAccountDetail();
    accountDetailPage.assertBalanceVisible();
    accountDetailPage.assertAccountNumberVisible();
    accountDetailPage.assertRoutingNumberVisible();
  });

  it('Detay sayfasından tüm hesaplara dönülebilmeli', () => {
    accountsPage.openFirstAccount();

    accountDetailPage.goBackToAllAccounts();

    accountsPage.assertIsOnAccountsPage();
  });
});
