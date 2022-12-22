import { Dna } from 'react-loader-spinner';

import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.Loader}>
      <Dna
        visible={true}
        height="300"
        width="300"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}
