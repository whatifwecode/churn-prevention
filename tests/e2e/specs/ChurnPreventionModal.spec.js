// integration/churnPreventionModal.spec.js

describe('ChurnPreventionModal', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/');
    });

    it('opens and closes the modal', () => {
        cy.get('[data-test=start-flow-button]').click({ multiple: true });
        cy.get('.modal-wrapper').should('be.visible');
        cy.get('[data-test=close-modal-button]').click({ multiple: true, force: true });
        cy.get('.modal-wrapper').should('not.exist');
    });

    it('navigates through different steps', () => {
        cy.get('[data-test=start-flow-button]').click({ multiple: true, force: true });
        cy.get('[data-test=continue-button]').click({ multiple: true, force: true });
    });

    it('handles action buttons', () => {
        cy.get('[data-test=start-flow-button]').click({ multiple: true, force: true });
        cy.get('[data-test=continue-subscription-button]').click({ multiple: true, force: true });

    });
});
