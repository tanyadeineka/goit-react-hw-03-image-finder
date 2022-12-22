import css from './Searchbar.module.css';
import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
  };

  handleChange = event => {
    this.setState({ query: event.currentTarget.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      alert('Please, enter anything to search');
      return;
    }
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            value={this.state.query}
            onChange={this.handleChange}
            name="inputForSearch"
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
