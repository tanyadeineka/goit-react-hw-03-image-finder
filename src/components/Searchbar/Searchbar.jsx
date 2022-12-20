import css from "./Searchbar.module.css";

export const Searchbar = () => {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm}>
          <button type="submit" className={css.searchBtn}>
            <span className={css.searchBtnLabel}>Search</span>
          </button>
          <input
            className={css.searchInput}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
}