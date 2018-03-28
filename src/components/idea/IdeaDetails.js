import React, { Component } from 'react';
import {
    Button, Input, FormGroup, Label,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './ideaStyle.css';

class IdeaDetails extends Component {

    hide = (val) => val && this.state.editmode ? 'hide' : !val && !this.state.editmode ? 'hide' : '';

    state = {
        id: Number(this.props.id),
        name: '',
        description: '',
        status: 0,

        statusName: ['Reject', 'Pending', 'Accept'],

        editmode: false,
        redirect: true,
    }

    toggleEdit = () => {
        this.setState({
            editmode: !this.state.editmode,
            ...this.state.reset
        })
    }

    componentWillMount() {
        this.props.ideas.forEach(idea => {
            if (idea.id === this.state.id) {
                let rs = {
                    name: idea.name,
                    description: idea.description,
                    status: Number(idea.status),
                }
                this.setState({
                    redirect: false,
                    reset: rs,
                    ...rs,
                })
            }
        });
    }

    intToStatus(int) {
        let result;
        result = [
            { status: 'Rejected', color: 'text-danger' },
            { status: 'Pending', color: 'text-muted' },
            { status: 'Accepted', color: 'text-success' }
        ];
        return result[(Number(int) + 1)];
    }

    save = () => {
        let name = this.state.name, description = this.state.description;
        if (!name.trim().length || !description.trim().length) return;
        let id = this.props.id;
        let result = {
            id, name, description,
            status: Number(this.state.status),
        }

        let req = {
            url: "/api/idea/" + id,
            method: 'put',
            data: JSON.stringify(result),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios(req).then(res => {
            this.setState({
                editmode: false,
                reset: result
            });
            this.props.toParent('reload');
        })

    }
    delete = () => {
        let id = this.state.id,
            req = {
                url: "/api/idea/" + id,
                method: 'delete',
            };
        axios(req).then(res => {
            this.props.toParent('reload');
            this.setState({
                redirect: true,
            });
        })
    }

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value
        });
    }

    back = () => {
        this.setState({
            redirect: true,
        });
        console.log('entered');
    }

    render() {
        return (
            <Modal isOpen={true} toggle={this.back}>
                <ModalHeader className={this.hide(true)}>
                    {this.state.name}
                </ModalHeader>
                <ModalBody className={this.hide(true)}>
                    {this.state.description}
                    <br />
                    Status: {' '}
                    <span className={this.intToStatus(this.state.status).color}>
                        {this.intToStatus(this.state.status).status}
                    </span>
                </ModalBody>
                <ModalBody className={this.hide(false)}>
                    <FormGroup >
                        <Label for="nameField">Name of idea</Label>
                        <Input
                            id="nameField" width="100%" type="text"
                            placeholder="Edit your idea name here"
                            value={this.state.name}
                            onChange={this.handleChange('name')} />
                    </FormGroup>
                    <FormGroup >
                        <Label for="desField">Description of idea</Label>
                        <Input id="desField"
                            type="textarea" placeholder="Enter your idea description here"
                            onChange={this.handleChange('description')} value={this.state.description} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="selectStatus">Status</Label>
                        <Input type="select" id="selectStatus" value={this.state.status} onChange={this.handleChange('status')}>
                            {this.state.statusName.map((item, i) => {
                                return <option key={i} value={i - 1}
                                    defaultValue={i - 1 === this.state.status}>{item}</option>;
                            })}
                        </Input>
                    </FormGroup>
                </ModalBody>

                <ModalFooter className={this.hide(false)}>
                    <Button color="danger" type="submit" className={'posLeft'} onClick={this.delete}>Delete</Button>{' '}
                    <Button color="info" onClick={this.save}>Save</Button>{' '}
                    <Button color="primary" onClick={this.toggleEdit}>Cancel</Button>{' '}
                </ModalFooter>

                <ModalFooter className={this.hide(true)}>
                    <Button color="primary" onClick={this.toggleEdit}>Edit</Button>{' '}
                    <Link to="/" className={'btn btn-secondary'}>Close</Link>
                </ModalFooter>

                {this.state.redirect ? <Redirect push={Boolean(this.state.name.length)} to="/" /> : ''}
            </Modal>
        )
    }
}


export default IdeaDetails;