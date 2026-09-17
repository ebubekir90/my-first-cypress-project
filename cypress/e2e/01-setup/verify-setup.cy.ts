// =============================================================================
// Phase 1 Doğrulama Testi
// -----------------------------------------------------------------------------
// Bu test, kurulumun çalıştığını doğrular:
//   1. Cypress test çalıştırabiliyor mu?
//   2. TypeScript spec'ler derleniyor mu?
//   3. ZincBank uygulamasına (baseUrl) erişilebiliyor mu?
//
// Bu bir SMOKE testidir — UI otomasyonunun en temel kanıtı.
// =============================================================================

describe('01 - Kurulum Doğrulama', () => {
  it('ZincBank ana sayfası yüklenmeli ve başlık doğru olmalı', () => {
    // Ana sayfaya git (baseUrl'den çözümlenir)
    cy.visit('/');

    // Sayfa başlığını kontrol et — uygulamanın gerçekten yüklendiğini kanıtlar
    cy.title().should('contain', 'ZincBank');

    // Ana sayfadaki temel navigasyon linklerinden biri görünür olmalı
    cy.contains('a', 'Log in').should('be.visible');
  });

  it('Login sayfasına gidilebilmeli', () => {
    cy.visit('/login');

    // Login sayfasının temel öğesi — başlık
    cy.get('h1').should('contain.text', 'Sign in to ZincBank');
  });
});
