import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button,
  InputGroup,
  FormControl,
  ButtonToolbar,
  ButtonGroup,
  Col,
  Row,
  Modal,
  Navbar,
} from 'react-bootstrap';
import Popup from 'react-popup';
import Web3 from 'web3';
import {
  makeSelectUsername,
  selectHome,
} from '../../containers/HomePage/selectors';
import { townTokenAbi } from '../../abis/town_token';
import { townAbi } from '../../abis/town';

import Img from './Img';
import Banner from './banner.jpg';
import messages from './messages';
import homeReducer from '../../containers/HomePage/reducer';

const web3 = new Web3(window.ethereum);
const contractAddr = '0x5FA06F4aA2be97F93AC841d2672EA560D450DDA4';
const townTokenContract = new web3.eth.Contract(townTokenAbi, contractAddr);
const townContractAddr = '0x6dEA22360FC88BF22E8393C20F520C78ea6eDbAd';
const townContract = new web3.eth.Contract(townAbi, townContractAddr);

function DisclaimerModal({ onAccountUpdate }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [account, updateAccount] = useState(0);

  // onAccountUpdate(window.ethereum.selectedAddress);

  const handleSet = async () => {
    handleClose();
    try {
      if (typeof window.ethereum.selectedAddress !== 'undefined') {
        window.ethereum.enable();
        // console.log(window.ethereum)
        // let test = await web3.eth.getBalance(window.ethereum.selectedAddress)
        // console.log(test)

        updateAccount(window.ethereum.selectedAddress);

        onAccountUpdate(window.ethereum.selectedAddress);
      }
    } catch (e) {
      window.confirm('Please Login to metamask');
    }
    // }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Disclaimer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you're reading this text in a modal! {account}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSet}>
            Connect to Wallet
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Header() {
  const [number, setNumber] = useState(
    '0x6dEA22360FC88BF22E8393C20F520C78ea6eDbAd',
  );

  // const [getNumber, setGetNumber] = useState(0);
  const [account, updateAccount] = useState(0);
  const [tokenName, updateTokenName] = useState('');
  const [tokenOwner, updateTokenOwner] = useState('');
  const [tokenTotalSupply, updateTokenTotalSupply] = useState('');
  const [townDistributionPeriod, updateTownDistributionPeriod] = useState('');
  const [currentRate, updateCurrentRate] = useState('');
  // const  username  = useSelector(state => state.home.username);
  // console.log(username)

  useEffect(() => {
    if (typeof window.ethereum.selectedAddress !== 'undefined') {
      updateAccount(window.ethereum.selectedAddress);
    }
  });

  const updateEthAccount = async address => {
    updateAccount(address);
  };

  const handleSet = async e => {
    /* e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await SimpleContract.methods.set(number).estimateGas();
    const result = await SimpleContract.methods
      .set(number)
      .send({ from: account, gas });
    console.log(result); */
  };

  const handleGetToken = async e => {
    e.preventDefault();
    const name = await townTokenContract.methods.name().call();
    updateTokenName(name);
    const owner = await townTokenContract.methods.owner().call();
    updateTokenOwner(owner);
    const totalSupply = await townTokenContract.methods.totalSupply().call();
    updateTokenTotalSupply(totalSupply);
    const distributionPeriod = await townContract.methods
      .distributionPeriod()
      .call();
    updateTownDistributionPeriod(distributionPeriod);
    const getCurrentRate = await townContract.methods.getCurrentRate().call();
    updateCurrentRate(getCurrentRate);

    // console.log(result);
  };

  return (
    <div>
      {<DisclaimerModal onAccountUpdate={updateEthAccount} />}
      <Navbar bg="dark">
        <Navbar.Brand className="text-primary">
          My Account: {account}
        </Navbar.Brand>
      </Navbar>
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
        <button onClick={handleGetToken} type="button">
          ITO Annoucement
        </button>
      </InputGroup>
      <div>
        <p>Name: {tokenName}</p>
        <p>Price: {currentRate}</p>
        <p>Contract Owner: {tokenOwner}</p>
        <p>Distribution Period: {townDistributionPeriod}</p>
        <p>Total Supply: {tokenTotalSupply}</p>
        <p>Circulating Supply:</p>
        <p>Market Cap:</p>
      </div>

      {/* <button onClick={handleGet} type="button">
        Get Contract
      </button>
      {getNumber} */}
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
