'use strict';

var React = require('react'),
  StyleSheet = require('react-style'),
  Request = require('superagent'),
  UIList = require('./react-list.jsx');

var styl = StyleSheet.create({
  repo : {
    height : '100px'
  },
  reposList : {
    height : '300px',
    overflowY : 'scroll',
    WebkitOverflowScrolling : 'touch'
  }
});

var App = React.createClass({
  displayName : 'App',

  getInitialState : function() {
    return { repos : [] };
  },

  componentDidMount : function() {
    var url = 'https://api.github.com/users/facebook/repos';
    Request
      .get(url)
      .end(function(err, res) {
        this.setState({ repos : JSON.parse(res.text) });
      }.bind(this));
  },

  renderItem : function(index, key) {
    var repo = this.state.repos[index];
    return (
      <div style={styl.repo} key={key}>
        <h3><a href={repo.url}>{repo.name}</a></h3>
        <p>{repo.description}</p>
      </div>
    );
  },

  render : function() {
    var { repos } = this.state,
      size = repos.length;
    return (
      <div className="app">
        <h2>Facebook Repos</h2>
        <div style={styl.reposList}>
          { size > 0 ? <UIList item={this.renderItem} type="uniform" length={size} /> : null }
        </div>
      </div>
    );
  }

});

document.addEventListener('DOMContentLoaded', function(e) {
  React.render(<App />, document.body);
});