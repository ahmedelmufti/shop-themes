import { getGreeting } from '../support/app.po';

describe('heewal', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to heewal!');
  });
});
