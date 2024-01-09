import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <div style={{background: "#cecece"}}>
            <Container>
                <div className="text-center py-3">
                    <p className="m-0">© 2023 DU Club. Developed By <a href="https://ancovabd.com/">Ancova</a> </p>
                </div>
            </Container>
        </div>
    );
};

export default Footer;