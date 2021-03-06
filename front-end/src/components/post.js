import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./axiosAuth";

import "./post.css";
import '../index.css'

class Post extends React.Component {
  state = {
    recipe: {
      name: "",
      category: "1",
      img: "",
      ingredients: "",
      instructions: ""
    },
    isFetching: false
  };

  handleChange = e => {
    this.setState({
      recipe: {
        ...this.state.recipe,
        [e.target.name]: e.target.value
      }
    });
  };

  post = e => {
    e.preventDefault();
    this.setState({
      value: e.target.value,
      isFetching: true
    });
    //axios goes here
    console.log("first", this.state.recipe);
    axiosWithAuth()
      .post("https://bwchefhub.herokuapp.com/api/recipes", this.state.recipe)
      .then(res => {
        console.log(res.data);
        // this.setState({ recipe: [...res.data, res.data.payload] });
        this.props.history.push("/profile");
      })
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div className="main account2">
        <h1>Enter all the details for your recipe</h1>
        <form className="formStyle" onSubmit={this.post}>
          <input
            type="text"
            name="name"
            placeholder="Recipe Name"
            value={this.state.recipe.name}
            onChange={this.handleChange}
          />

          <select
            name="category"
            onChange={this.handleChange}
            value={this.state.recipe.category}
          >
            <option value="1">Breakfast</option>
            <option value="2">Lunch</option>
            <option selected value="3">
              Dinner
            </option>
            <option value="4">Snack</option>
          </select>

          <input
            type="text"
            name="img"
            placeholder="Image Link"
            value={this.state.recipe.img}
            onChange={this.handleChange}
          />

          <input
            className="area"
            type="textarea"
            cols={40}
            rows={10}
            name="ingredients"
            placeholder="Ingredients"
            value={this.state.recipe.ingredients}
            onChange={this.handleChange}
          />

          <input
            className="area"
            type="textarea"
            name="instructions"
            placeholder="Instructions"
            value={this.state.recipe.instructions}
            onChange={this.handleChange}
          />

          <div className='button-container'>
          <button className='add-button'> Post </button>
          <br />
          <button className="add-button" onClick={()=>this.props.history.goBack()}> Cancel </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Post;
