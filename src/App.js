import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Idea from './components/idea/Idea';
import IdeaDetails from './components/idea/IdeaDetails';
import IdeaCreate from './components/idea/IdeaCreate';
import axios from 'axios';
import { Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }
  state = {
    id: 1,
    name: 'testing',
    description: 'description',
    status: 0,
    ideas: []
  }

  componentWillMount() {
    this.load();
  }

  load() {
    axios.get("/api/idea/")
      .then(res => res.data)
      .then(ideas => this.setState({ ideas }))
  }

  handler = name => {
    this.load();
  }

  render() {
    return (
      <div>
        <IdeaCreate toParent={this.handler}/>
        <Container className={'btmContainer'}>
          {this.state.ideas.map(idea =>
            <Idea key={idea.id}
              id={idea.id}
              name={idea.name}
              status={idea.status}
            />
          )}
          {this.state.ideas.length === 0 ? '' :
            <Route path='/idea/:id'
              render={(props) => <IdeaDetails
                toParent={this.handler}
                ideas={this.state.ideas}
                id={props.match.params.id}
              />}
            />
          }

        </Container>
      </div>
    );
  }
}

export default App;
