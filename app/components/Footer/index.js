import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper className="page-footer font-small pt-4">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h5 className="text-uppercase text-primary">About</h5>
            <p>
              Here you can use rows and columns to organize your footer content.
            </p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-3" />

          <div className="col-md-3 mb-md-0 mb-3" />

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase text-primary">Links</h5>

            <ul className="list-unstyled">
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 2</a>
              </li>
              <li>
                <a href="#!">Link 3</a>
              </li>
              <li>
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright text-center py-3">
         Made by Consesus Finance
      </div>
    </Wrapper>
  );
}

export default Footer;
