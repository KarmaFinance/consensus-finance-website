/**
 * Testing the NotFoundPage
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import Create from '../index';
import messages from '../messages';

describe('<Create />', () => {
  it('should render the Page Not Found text', () => {
    const { queryByText } = render(
      <IntlProvider locale="en">
        <Create />
      </IntlProvider>,
    );
    expect(queryByText(messages.header.defaultMessage)).not.toBeNull();
  });
});
