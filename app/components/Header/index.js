import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import {
  Button,
  InputGroup,
  FormControl,
  ButtonToolbar,
  ButtonGroup,
  Col,
  Row,
  Alert,
} from 'react-bootstrap';
import Popup from 'react-popup';
import Web3 from 'web3';
import { simpleStorageAbi } from './abis';

import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';

const web3 = new Web3(Web3.givenProvider);
const contractAddr = '0xfde95beaa2e783e0f9609b80c4e10049e71ed29d';
const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr);

// function AlertDismissibleExample() {
/*  const [show, setShow] = useState(false);

  if (show) {
    return (
      <div>
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
      <Button onClick={() => {
        if(show){
              setShow(false);
        }else{
              setShow(true);
        }
      }}
        >
        Show Alert
      </Button>
      </div>
    );
  }
  return (
    <Button onClick={() => (show ? setShow(false) : setShow(true))}>
      Show Alert
    </Button>
  ); */
// }

function Header() {
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState(0);

  const handleSet = async e => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await SimpleContract.methods.set(number).estimateGas();
    const result = await SimpleContract.methods
      .set(number)
      .send({ from: account, gas });
    console.log(result);
  };

  const handleGet = async e => {
    e.preventDefault();
    const result = await SimpleContract.methods.hello().call();
    setGetNumber(result);
    console.log(result);
  };

  return (
    <div>
      <div className="mb-3">
        <Link to="/">
          <Img src={Banner} alt="Logo" />
        </Link>
      </div>
      <InputGroup className="mb-3">
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={number}
          onChange={e => setNumber(e.target.value)}
        />
        <button onClick={handleSet} type="button">
          ITO Annoucement
        </button>
      </InputGroup>
      <button onClick={handleGet} type="button">
        Get Contract
      </button>
      {getNumber}
      <Row>
        <Col md={4}>
          <Link to="/subscribe">
            <Button className="btn-primary btn-block">Subscribe</Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/produce">
            <Button className="btn-primary btn-block">Produce</Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/create">
            <Button className="btn-primary btn-block">Create</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
