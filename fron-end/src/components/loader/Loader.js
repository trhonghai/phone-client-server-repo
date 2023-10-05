import  ReactDOM  from 'react-dom';
import loaderImg from '../../assets/loader.gif';
import styles from './Loader.module.scss';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  )
}

export const Spinner = () =>{
  return (
    <div className='--center-all'>
        <img src={loaderImg} alt="loading" width={40} />

    </div>
  )
}

export default Loader;