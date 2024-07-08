import classNames from 'classnames/bind';

import { useState, useEffect } from 'react';
import { IoClose, IoCheckmarkSharp } from "react-icons/io5";  
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import styles from './AuthForm.module.scss'
import { Link } from 'react-router-dom';

const cx =  classNames.bind(styles);

function AuthForm({ display, setDisplay}) {
  const [onLogin, setOnLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loginError, setLoginError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const clearInput = () => {
    setUsername('');
    setPassword('');
    setConfirm('');
  }

  useEffect(() => {
    function checkPassword() {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
      return regex.test(password);
    }

    if (!checkPassword(password) && password.length > 0) {
      setPasswordError('Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.');
      return;
    }
    setPasswordError('');
  }, [password]);

  useEffect(() => {
    function checkUsername() {
      const regex = /^[^\s]{4,}$/;
      return regex.test(username);
    }

    if (!checkUsername(username) && username.length > 0) {
      setUsernameError('Username must be at least 4 characters and contain no spaces.');
      return;
    }
    setUsernameError('');
  }, [username]);

  useEffect(() => {
    if (confirm !== password && confirm.length > 0) {
      setConfirmError('Password confirmation is incorrect');
      return;
    }
    setConfirmError('');
  }, [confirm, password]);
  
  return (
    <div className={cx('container', {'no-display': !display})}>
      <div className={cx('overlay')}>
        <div className={cx('form-container')}>

          <div className={cx('form-login', {'form-active': onLogin})}>
            <h2 className={cx('form-title')}>Welcome to CinemaPlus!</h2>
            <button className={cx('form-close')}
              onClick={() => {
                setDisplay(false);
                setOnLogin(true);
                clearInput();
              }}
            >
              <IoClose />
            </button>
            <form className={cx('form-content')}>
              <div className={cx('form-input-wrap')}>
                <input type='text' className={cx('form-input')} placeholder='Username' value={username} onChange={(e) => { setUsername(e.target.value)}}/>
              </div>

              <div className={cx('form-input-wrap')}>
                <input type='password' className={cx('form-input')} placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value)}}/>
              </div>
              <h4 className={cx('form-error')}>{loginError}</h4>
              <Link className={cx('form-link', 'forget-password')} to='/' onClick={(e) => {e.preventDefault();}}>Forgot password?</Link>

              <button className={cx('form-submit')}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Sign In
              </button>
              
              <span className={cx('form-register-link')}>
                <p className={cx('form-text')}>You're new to CinemaPlus? Register</p>
                <Link className={cx('form-link')} 
                  onClick={(e) => {
                    e.preventDefault();
                    setOnLogin(false);
                    clearInput();
                  }}
                >
                  here
                </Link>
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
                <h4 className={cx('form-login-text')}>Sign in with Google</h4>
              </button>
              <button className={cx('form-login-btn', 'faceboox-btn')}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <div className={cx('form-login-icon')}>
                  <FaFacebook />
                </div>
                <h4 className={cx('form-login-text')}>Sign in with Facebook</h4>
              </button>

            </form>
          </div>
          
          <div className={cx('form-register', {'form-active': !onLogin})}>
            <h2 className={cx('form-title')}>Create an account</h2>
            <button className={cx('form-close')}
              onClick={() => {
                setDisplay(false);
                setOnLogin(true);
                clearInput();
              }}
            >
              <IoClose />
            </button>
            <form className={cx('form-content')}>
              <div className={cx('form-input-wrap')}>
                <input type='text' className={cx('form-input')} placeholder='Username' value={username} onChange={(e) => { setUsername(e.target.value)}}/>
                <div className={cx('form-input-icon', 'form-input-icon-valid', {'no-display': usernameError.length !== 0})}>
                  <IoCheckmarkSharp />
                </div>
                <div className={cx('form-input-icon', 'form-input-icon-invalid', {'no-display': usernameError.length === 0})}>
                  <IoClose />
                </div>
              </div>
              {/* <h4 className={cx('form-guide', {'no-display': usernameError.length !== 0})}>Username must be at least 4 characters and cannot contain spaces</h4> */}
              <h4 className={cx('form-error', {'no-display': usernameError.length === 0})}>{usernameError}</h4>

              <div className={cx('form-input-wrap')}>
                <input type='password' className={cx('form-input')} placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value)}}/>
                <div className={cx('form-input-icon', 'form-input-icon-valid', {'no-display': passwordError.length !== 0})}>
                  <IoCheckmarkSharp />
                </div>
                <div className={cx('form-input-icon', 'form-input-icon-invalid', {'no-display': passwordError.length === 0})}>
                  <IoClose />
                </div>
              </div>
              {/* <h4 className={cx('form-guide', {'no-display': passwordError.length !== 0})}>Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.</h4> */}
              <h4 className={cx('form-error', {'no-display': passwordError.length === 0})}>{passwordError}</h4>

              <div className={cx('form-input-wrap')}>
                <input type='password' className={cx('form-input')} placeholder='Confirm password' value={confirm} onChange={(e) => { setConfirm(e.target.value)}}/>
                <div className={cx('form-input-icon', 'form-input-icon-valid', {'no-display': confirmError.length !== 0})}>
                  <IoCheckmarkSharp />
                </div>
                <div className={cx('form-input-icon', 'form-input-icon-invalid', {'no-display': confirmError.length === 0})}>
                  <IoClose />
                </div>
              </div>
              <h4 className={cx('form-error', {'no-display': confirmError.length === 0})}>{confirmError}</h4>

              <button className={cx('form-submit')}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Sign up
              </button>
              
              <span className={cx('form-register-link')}>
                <p className={cx('form-text')}>Already have an account?</p>
                <Link className={cx('form-link')}
                  onClick={(e) => {
                    e.preventDefault();
                    setOnLogin(true);
                    clearInput();
                  }}
                >
                  Sign in
                </Link>
              </span>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AuthForm;