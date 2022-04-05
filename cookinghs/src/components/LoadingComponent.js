import React from 'react';
import { Container } from 'reactstrap';
import '../styles/defaults.css'

export const Loading = () => {
    return(
        <Container className="text-align-center" style={{marginTop: "20px" }}>
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading . . .</p>
        </Container>
        
    );
};