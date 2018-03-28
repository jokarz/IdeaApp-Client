import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, } from 'reactstrap';
import './ideaStyle.css';

class Idea extends Component {



    render() {
        const statusStyling = ['reject', 'pending', 'accept'];

        return (
            <Row className={'btmSpacing'}>
                <Col xs="12" md={{ size: 8, offset: 2 }}>
                    <ListGroup>
                        <ListGroupItem className={statusStyling[(Number(this.props.status) + 1)]}>
                            <Link to={'/idea/' + this.props.id} className={'linkInheritStyle'}>

                                <ListGroupItemHeading>

                                    {this.props.name}

                                </ListGroupItemHeading>

                            </Link>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        )
    }
}


export default Idea;