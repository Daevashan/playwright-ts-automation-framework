# Test Plan: Automated Testing Framework Portfolio

## 1. Introduction & Objectives
This document outlines the test strategy for the QA Automation Framework portfolio project. The goal of this framework is to demonstrate robust end-to-end (E2E) UI testing and programmatic API testing using modern DevOps practices. 

The framework is built using **Playwright**, utilizing its native test runner for both browser automation and direct API requests.

## 2. Target Applications under Test (AUT)
The framework targets two widely recognized applications to simulate real-world web environments:
*   **SauceDemo (UI):** An e-commerce storefront used to validate front-end user journeys, locators, and state changes.
*   **Restful-Booker (API):** A mock hotel booking API used to validate RESTful web services, JSON schema payloads, and state management.

## 3. Scope of Testing

### 🟢 What Will Be Tested (In Scope)

#### UI Testing (SauceDemo via Playwright Web-First Assertions)
*   **Authentication:** Valid login with standard credentials; validation of error UI messaging for locked-out users.
*   **Cart Management:** Adding/removing items from the cart and ensuring the cart badge increments accurately using auto-waiting locators.
*   **Checkout Workflow:** Completing the information form, verifying order calculations, and processing the final step.

#### API Testing (Restful-Booker via Playwright APIRequestContext)
*   **Authentication:** Generating bearer tokens required for secure endpoint access.
*   **Booking CRUD Operations:**
    *   **Create:** Creating a booking and validating `200 OK` responses along with payload structure.
    *   **Read:** Retrieving specific bookings via ID and validating filtering parameters.
    *   **Update:** Programmatically updating booking details using `PUT` and `PATCH` requests.
    *   **Delete:** Removing a booking and validating deletion success.

### 🔴 What Will NOT Be Tested (Out of Scope)
*   **Performance & Load Testing:** No stress, endurance, or spike testing on the target public servers.
*   **Visual Regression:** Broad pixel-by-pixel visual snapshot comparison is out of scope for this phase.
*   **Payment Gateways:** SauceDemo does not process real transactions; payment layer logic is out of scope.
*   **Legacy Browsers:** Cross-browser execution is limited to modern headless engines (Chromium, Firefox, WebKit) natively supported by Playwright.

## 4. Execution & CI/CD Strategy
*   **Continuous Integration:** Tests are executed automatically on every `push` and `pull_request` to the `main` branch via **GitHub Actions**.
*   **Reporting:** On failure, GitHub Actions archives Playwright trace files and HTML reports for fast debugging.

## 5. Risks & Mitigations

*   **Risk 1: Shared Public Test Environments (Data Flakiness)**
    *   *Detail:* Restful-Booker is a public sandbox. Other users can mutate or delete data at any time.
    *   *Mitigation:* Test cases must be completely isolated. API tests will dynamically generate their own setup data and teardown records within individual test hooks rather than relying on hardcoded IDs.
*   **Risk 2: CI/CD Pipeline Resource Flakiness**
    *   *Detail:* GitHub Actions hosted runners can experience resource constraints, causing occasional network or element timeout failures.
    *   *Mitigation:* Configured Playwright's native `retries: 2` option in `playwright.config.ts` specifically for CI execution to eliminate false negatives.
*   **Risk 3: Public API Downtime**
    *   *Detail:* Free public endpoints can experience intermittent outages.
    *   *Mitigation:* Built a global setup health check that pings the endpoints before the suite starts; if down, the pipeline fails gracefully without wasting build minutes.
