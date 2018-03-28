import React, { Component } from 'react';
import { Col, Container, Row, Jumbotron, Button, FormGroup, Input } from 'reactstrap';
import './ideaStyle.css';
import axios from 'axios';

class IdeaCreate extends Component {

    state = {
        name: '',
        description: '',
        status: 0,
    }

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        })
    }

    create = (event) => {
        event.preventDefault();
        if (!this.state.name.length || !this.state.description) return;
        
        let req = {
            url: "/api/idea",
            method: 'post',
            data: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        };
         axios(req).then(res => {
             this.setState({
                 name: '',
                 description: '',
             })
             this.props.toParent('reload');
        })
    }

render() {
    return (
        <div>
            <Jumbotron width="100%" className="text-center customJumbotron">
                <h1 className="display-4">Have an idea?</h1>
                <p className="lead">Generate it!</p>
                <hr className="line" />
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                            <form onSubmit={this.create}>
                                <FormGroup >
                                    <Input required width="100%" type="text"
                                        placeholder="Enter the name of your idea here!"
                                        value={this.state.name}
                                        onChange={this.handleChange('name')} />
                                </FormGroup>
                                <FormGroup >
                                    <Input required
                                        type="textarea" placeholder="Enter the description of your idea here!"
                                        onChange={this.handleChange('description')} value={this.state.description} />
                                </FormGroup>
                                <Button color="primary" size="lg" className="text-center" type="submit">Generate!</Button>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </div>
    )
}
}


export default IdeaCreate;