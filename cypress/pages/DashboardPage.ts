/// <reference types="cypress" />

/**
 * ZincBank Dashboard sayfası için Page Object Model (POM).
 *
 * Başarılı giriş sonrası kullanıcının yönlendirildiği sayfadır.
 * Giriş akışının doğrulamaları bu sınıf üzerinden yapılır.
 */
export class DashboardPage {
  // --- Element selector'ları (uygulamanın kararlı data-testid'leri) ---
  private readonly welcome = '[data-testid="dashboard-welcome"]';
  private readonly totalDeposit = '[data-testid="dashboard-total-deposit"]';
  private readonly recentActivity = '[data-testid="dashboard-recent-activity"]';
  private readonly navDashboard = '[data-testid="nav-dashboard"]';
  private readonly navAccounts = '[data-testid="nav-accounts"]';
  private readonly navSignout = '[data-testid="nav-signout"]';

  /** Dashboard sayfasına yönlendirildiğimizi doğrular. */
  assertIsOnDashboard(): this {
    cy.url().should('include', '/dashboard');
    cy.get(this.welcome).should('be.visible');
    return this;
  }

  /** Karşılama başlığının görünür olduğunu doğrular. */
  assertWelcomeVisible(): this {
    cy.get(this.welcome).should('be.visible').and('contain.text', 'Welcome');
    return this;
  }

  /** Toplam mevduat bakiyesi öğesinin mevcut olduğunu doğrular. */
  assertTotalDepositVisible(): this {
    cy.get(this.totalDeposit).should('exist');
    return this;
  }

  /** Ana navigasyon linklerinin görünür olduğunu doğrular. */
  assertNavigationVisible(): this {
    cy.get(this.navDashboard).should('be.visible');
    cy.get(this.navAccounts).should('be.visible');
    return this;
  }

  /** "Sign out" butonuna basarak oturumu kapatır. */
  signOut(): this {
    cy.get(this.navSignout).click();
    return this;
  }
}
