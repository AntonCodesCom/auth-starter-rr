import { faker } from '@faker-js/faker';
import { cleanup, render, screen, within } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { afterEach, describe, expect, test, vi } from 'vitest';
import AuthLogin from './Login';
import userEvent from '@testing-library/user-event';

describe('AuthLogin', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * component test
   */
  test('happy path', async () => {
    // mock data
    const mockUsername = faker.internet.username();
    const mockPassword = faker.internet.password();

    // setup & run
    const spy = vi.fn();
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <AuthLogin />,
        action: async ({ request }) => {
          await delay(50); // for loading state to catch up
          const formData = await request.formData();
          const username = String(formData.get('username'));
          const password = String(formData.get('password'));
          spy(username, password);
        },
      },
    ]);
    render(<RoutesStub />);
    const user = userEvent.setup();

    // form
    const form = screen.getByRole('form', { name: 'Login' });
    const usernameInput = within(form).getByRole<HTMLInputElement>('textbox', {
      name: 'Username',
    });
    // querying the password field by label text
    // https://github.com/testing-library/dom-testing-library/issues/567
    const passwordInput =
      within(form).getByLabelText<HTMLInputElement>(/^Password/);
    await user.type(usernameInput, mockUsername);
    await user.type(passwordInput, mockPassword);
    const submitButton = within(form).getByRole<HTMLButtonElement>('button', {
      name: 'Log In',
    });
    await user.click(submitButton);

    // asserting loading state
    expect(usernameInput.disabled).toBe(true);
    expect(passwordInput.disabled).toBe(true);
    expect(submitButton.disabled).toBe(true);

    // waiting for the form submission results from the `action`
    await vi.waitFor(() => {
      expect(spy).toHaveBeenCalledWith(mockUsername, mockPassword);
    });

    // asserting loading off
    await vi.waitFor(() => {
      expect(usernameInput.disabled).toBe(false);
      expect(passwordInput.disabled).toBe(false);
      expect(submitButton.disabled).toBe(false);
    });
  });
});
