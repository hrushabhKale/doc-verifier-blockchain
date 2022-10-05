import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import "./../Assets/css/HelpDesk.css";
import Sidebar from "./Sidebar";

export default function HelpDesk() {
  return (
    <>
      <section className="help-banner text-light">
        <Sidebar />
        <div className="help-banner text-light Help-section">
          <div className="container help-container">
            <div className="help-Header text-center text-center p-5">
              <h2>Help Desk</h2>
            </div>
            <div className="Help-Accordian text-dark">
              <Accordion style={{ opacity: "0.9" }}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>How Blockchain works ?</Accordion.Header>
                  <Accordion.Body>
                    Blockchain technology is used for storing information
                    extremely securely. Thanks to the blockchain, data can be
                    both public and forgery-proof, which represents a formidable
                    tool for building trust in relationships between people. The
                    blockchain was invented in 2008 by an anonymous person using
                    the pseudonym Satoshi Nakamoto when they invented the
                    peer-to-peer digital currency known as Bitcoin. Blockchain
                    was originally used as a public transaction ledger allowing
                    people using pseudonyms to trade with complete confidence.
                    That’s how the Bitcoin blockchain arose and still endures
                    today. The term blockchain is used to describe both the data
                    and the protocol that stores this data. The term comes from
                    the fact that data is organised in blocks linked to each
                    sequentially using cryptography. We use the Ethereum/Polygon
                    public blockchain. It is the longest-standing and most
                    reliable thus far. Why use a public blockchain? There are
                    various advantages to using a public blockchain: Maximum
                    security thanks to considerable decentralisation And
                    absolute transparency that makes the certificates externally
                    verifiable. It is thanks to the combination of these two
                    elements that trust is created and our certificates are
                    forgery-proof.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>What is Hash ?</Accordion.Header>
                  <Accordion.Body>
                    A hash is a cryptographic means of representing numeric data
                    in a unique way The hash for numeric data is said to be the
                    equivalent of a digital thumbprint for a human. To obtain a
                    hash from some data, we apply a hash function to the data.
                    Example Data to hash: “Hello world!” Hash of the data:
                    “c0535e4be2b79ffd93291305436bf889314e4a3faec05ecffcbb7df31ad9e51a”
                    This feature has various advantages, it allows: For quickly
                    checking that the data is correct and has not been
                    susbsequently altered Any type of data to be represented in
                    a sequence of characters, Example New data to hash: “Hello
                    world !” Hash of the data:
                    “341d44b969233a48baa4224043705f5bd32230fa0da370d234d7e3d4a73aa613”
                    In this example, we can see that the new hash is very
                    different from the one before, while being the same length.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    How to issue a certificate ?
                  </Accordion.Header>
                  <Accordion.Body>
                    To obtain a blockchain certificate, you must purchase a
                    license from the official retailer network, then register
                    for the free extended warranty. You will then receive your
                    certificate automatically and also be able to access your
                    certificate from your customer account (on the future
                    version of this website). Registration on the blockchain may
                    take up to 24 hours from requesting the warranty extension
                    to receiving your certificate. When you purchase a license,
                    we want to provide you with proof that your product is
                    genuine. To this end, we produce a certificate of
                    authenticity in your name, protected by blockchain
                    technology. This certificate may be useful in the event that
                    you need to contact the after sales service, a dealer, or
                    anyone you want to give the product to, whether that is in
                    the context of a gift, or a resale. With this digital
                    certificate, you will no longer need to use the physical
                    guarantee card provided with the product, eliminating the
                    risk of losing or forgetting it. We provide a certificate
                    checker on our site. Simply dropping the document into the
                    web page will allow you to verify that the certificate is
                    genuine.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
