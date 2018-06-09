import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import cards from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    cards,
    score: 0,
    highscore: 0
  };

  clickCount = id => {
    this.state.cards.find((req, res) => {
      if (req.id === id) {
        if(cards[res].count === 0){
          cards[res].count = cards[res].count + 1;
          this.setState({score : this.state.score + 1}, function(){
            console.log(this.state.score);
          });
          this.state.cards.sort(() => Math.random() - 0.5)
          return true; 
        } else {
          this.gameOver();
        }
      }
    });
  }

   gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({highscore: this.state.score}, function() {
        console.log(this.state.highscore);
      });
    }
    this.state.cards.forEach(card => {
      card.count = 0;
    });
    alert(`Your score: ${this.state.score}`);
    this.setState({score: 0});
    return true;
  }

  // Map over this.state.cards and render a FriendCard component for each card object
  render() {
    return (
      <Wrapper>
      <Title score={this.state.score} highscore={this.state.highscore}>Clicky Game</Title>
      <div></div>
        {this.state.cards.map(card => (
          <FriendCard
            id={card.id}
            key={card.id}
            image={card.image}
            clickCount={this.clickCount}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
