import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  changeFilters = (e) => {
    this.setState({
      filters: { ...this.state.filters, type: e },
    });
  };

  fetchPets = () => {
    let petUrl = "/api/pets";
    if (this.state.filters.type !== "all") {
      petUrl += `?type=${this.state.filters.type}`;
    }

    fetch(petUrl)
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          pets: response,
        })
      );
  };

  handleAdoptPet = (e) => {
    const pets = this.state.pets.map((p) => {
      return p.id === e ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets: pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                filters={this.state.filters}
                onChangeType={this.changeFilters}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                onAdoptPet={this.handleAdoptPet}
                pets={this.state.pets}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
