import classNames from 'classnames/bind';

import { IoClose, IoCheckmarkSharp } from "react-icons/io5";  
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import styles from './AuthForm.module.scss'
import { Link } from 'react-router-dom';

const cx =  classNames.bind(styles);

function AuthForm({ display, setDisplay}) {
  return (
    <div className={cx('container', {'no-display': !display})}>
      <div className={cx('overlay')}>
        <div className={cx('form-container')}>
          <h2 className={cx('form-title')}>Welcome to CinemaPlus!</h2>
          <button className={cx('form-close')}
            onClick={() => {
              setDisplay(false);
            }}
          >
            <IoClose />
          </button>
          <form className={cx('form-content')}>
            <div className={cx('form-input-wrap')}>
              <input type='text' className={cx('form-input')} placeholder='Username'/>
              <div className={cx('form-input-icon', 'form-input-icon-valid')}>
                <IoCheckmarkSharp />
              </div>
              {/* <div className={cx('form-input-icon', 'form-input-icon-invalid')}>
                <IoClose />
              </div> */}
            </div>
            {/* <h4 className={cx('form-guide')}>Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.</h4> */}
            {/* <h4 className={cx('form-error')}>Username is invalid</h4> */}

            <div className={cx('form-input-wrap')}>
              <input type='password' className={cx('form-input')} placeholder='Password'/>
              <div className={cx('form-input-icon', 'form-input-icon-valid')}>
                <IoCheckmarkSharp />
              </div>
              {/* <div className={cx('form-input-icon', 'form-input-icon-invalid')}>
                <IoClose />
              </div> */}
            </div>
            {/* <h4 className={cx('form-guide')}>Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.</h4> */}
            {/* <h4 className={cx('form-error')}>Username is invalid</h4> */}
            <Link className={cx('form-link', 'forget-password')} to='/'>Forgot password?</Link>

            <button className={cx('form-submit')}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Login
            </button>
            
            <span className={cx('form-register-link')}>
              <p className={cx('form-text')}>You're new to CinemaPlus? Register</p>
              <Link className={cx('form-link')}>here</Link>
            </span>

            <div className={cx('form-seperate')}>
              <span className={cx('form-seperate-line')}></span>
              <p className={cx('form-seperate-text')}>OR</p>
              <span className={cx('form-seperate-line')}></span>
            </div>

            <button className={cx('form-login-btn', 'google-btn')}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className={cx('form-login-icon')}>
                <FcGoogle />
              </div>
              <h4 className={cx('form-login-text')}>Login with Google</h4>
            </button>
            <button className={cx('form-login-btn', 'faceboox-btn')}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className={cx('form-login-icon')}>
                <FaFacebook />
              </div>
              <h4 className={cx('form-login-text')}>Login with Facebook</h4>
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;