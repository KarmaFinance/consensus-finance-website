/**
 * Testing the NotFoundPage
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';

import Subscribe from '../index';
import messages from '../messages';

describe('<Subscribe />', () => {
  it('should render the Page Not Found text', () => {
    const { queryByText } = render(
      <IntlProvider locale="en">
        <Subscribe />
      </IntlProvider>,
    );
    expect(queryByText(messages.header.defaultMessage)).not.toBeNull();
  });
});
