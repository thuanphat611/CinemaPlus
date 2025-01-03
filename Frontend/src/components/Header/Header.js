import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import {
  FaMagnifyingGlass,
  FaRegBell,
  FaCaretDown,
  FaRegUser,
} from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { PiArrowFatLeftFill } from "react-icons/pi";
import { MdLogout } from "react-icons/md";

import logo from "../../assets/images/logo.png";
import blankProfilePic from "../../assets/images/blank-profile.png";

import useHandler from "./controller";

const cx = classNames.bind(styles);

function Header({ refList, loading, setAuthDisplay }) {
  const {
    searchText,
    searchOpen,
    searchResult,
    headerRef,
    searchRef,
    auth,
    user,
    setSearchText,
    setSearchOpen,
    scrollToTop,
    scrollToRef,
    handleLogout,
  } = useHandler();

  return (
    <div ref={headerRef} className={cx("header")}>
      <span className={cx("blocker", { "no-display": !loading })}></span>

      <a className={cx("logo-container")} href="/">
        <img className={cx("logo")} src={logo} alt="" />
      </a>

      <ul className={cx("navigation")}>
        {refList && refList.length !== 0 ? (
          <>
            <li className={cx("navigation-item")}>
              <button
                className={cx("navigation-link")}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
              >
                <h3 className={cx("navigation-text")}>Home</h3>
              </button>
            </li>
            <li className={cx("navigation-item")}>
              <a
                className={cx("navigation-link")}
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToRef(refList.moviesRef);
                }}
              >
                <h3 className={cx("navigation-text")}>Movies</h3>
              </a>
            </li>
            <li className={cx("navigation-item")}>
              <a
                className={cx("navigation-link")}
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToRef(refList.seriesRef);
                }}
              >
                <h3 className={cx("navigation-text")}>Series</h3>
              </a>
            </li>
            <li className={cx("navigation-item")}>
              <a
                className={cx("navigation-link")}
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToRef(refList.castsRef);
                }}
              >
                <h3 className={cx("navigation-text")}>Actors</h3>
              </a>
            </li>

            <li className={cx("navigation-item", "tablet-display")}>
              <div className={cx("search-border")}>
                <div
                  className={cx("search-wrap", { "search-open": searchOpen })}
                >
                  <div className={cx("search-bar")}>
                    <input
                      ref={searchRef}
                      className={cx("search-input")}
                      value={searchText}
                      type="text"
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                    />
                    <button
                      className={cx("search-clear")}
                      onClick={(e) => {
                        e.preventDefault();
                        setSearchText("");
                        if (searchRef.current) {
                          searchRef.current.focus();
                        }
                      }}
                    >
                      <IoClose
                        className={cx({
                          "no-display": searchText.length === 0,
                        })}
                      />
                    </button>
                  </div>

                  <div
                    className={cx("search-icon")}
                    onClick={(e) => {
                      e.preventDefault();
                      setSearchText("");
                      setSearchOpen((val) => !val);
                      searchRef.current.focus();
                    }}
                  >
                    <FaMagnifyingGlass />
                  </div>
                </div>
              </div>

              <div
                className={cx("search-result-wrapper", {
                  "no-display": searchText.length === 0,
                })}
              >
                <div className={cx("search-results")}>
                  {searchResult.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className={cx("result-item")}
                        to={"/" + item.type + "/detail/" + item.id}
                      >
                        <img
                          className={cx("result-img")}
                          src={item.poster}
                          alt={item.name}
                        />
                        <div className={cx("result-info")}>
                          <h3 className={cx("result-name")}>{item.name}</h3>
                          <p className={cx("result-type")}>{item.type}</p>
                        </div>
                      </Link>
                    );
                  })}

                  <div
                    className={cx("no-result", {
                      "no-display": searchResult.length > 0,
                    })}
                  >
                    <p className={cx("no-result-text")}>No results</p>
                  </div>
                </div>
              </div>
            </li>
          </>
        ) : (
          <li className={cx("navigation-item")}>
            <Link className={cx("back-to-home")} to="/">
              <PiArrowFatLeftFill />
              <h3 className={cx("navigation-text")}>Back to home</h3>
            </Link>
          </li>
        )}
      </ul>

      <div className={cx("mobile-search")}>
        <div className={cx("mobile-search-border")}>
          <div
            className={cx("mobile-search-wrap", {
              "mobile-search-open": searchOpen,
            })}
          >
            <div className={cx("mobile-search-bar")}>
              <input
                ref={searchRef}
                className={cx("mobile-search-input")}
                value={searchText}
                type="text"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />

              <button
                className={cx("mobile-search-close")}
                onClick={(e) => {
                  e.preventDefault();
                  setSearchText("");
                  setSearchOpen(false);
                }}
              >
                <IoClose />
              </button>
            </div>
          </div>
        </div>

        <div
          className={cx("mobile-search-result-wrapper", {
            "no-display": searchText.length === 0,
          })}
        >
          <div className={cx("mobile-search-results")}>
            {searchResult.map((item, index) => {
              return (
                <Link
                  key={index}
                  className={cx("mobile-result-item")}
                  to={"/" + item.type + "/detail/" + item.id}
                >
                  <img
                    className={cx("mobile-result-img")}
                    src={item.poster}
                    alt={item.name}
                  />
                  <div className={cx("mobile-result-info")}>
                    <h3 className={cx("mobile-result-name")}>{item.name}</h3>
                    <p className={cx("mobile-result-type")}>{item.type}</p>
                  </div>
                </Link>
              );
            })}

            <div
              className={cx("no-result", {
                "no-display": searchResult.length > 0,
              })}
            >
              <p className={cx("no-result-text")}>No results</p>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("header-button-group", { "no-display": auth })}>
        <div
          className={cx("mobile-search-icon")}
          onClick={(e) => {
            e.preventDefault();
            setSearchText("");
            setSearchOpen(true);
          }}
        >
          <FaMagnifyingGlass />
        </div>
        <button className={cx("premium-btn")}>Premium</button>
        <button
          className={cx("signup-btn")}
          onClick={() => {
            setAuthDisplay(true);
          }}
        >
          Sign In
        </button>
      </div>

      <div className={cx("account-section", { "no-display": !auth })}>
        <div
          className={cx("mobile-search-icon")}
          onClick={(e) => {
            e.preventDefault();
            setSearchText("");
            setSearchOpen(true);
          }}
        >
          <FaMagnifyingGlass />
        </div>

        <div className={cx("notification-wrapper")}>
          <div className={cx("notification-icon")}>
            <FaRegBell />
          </div>
          <h4 className={cx("notification-new")}>1</h4>

          <div className={cx("notification-popup")}>
            <h4 className={cx("notification-title")}>Notifications</h4>
            <ul className={cx("notification-list")}>
              <li className={cx("notification-item")}>
                <Link className={cx("notification-link")} to="/">
                  <img className={cx("notification-img")} src="" alt="" />
                  <h4 className={cx("notification-text")}>
                    Welcome username, we have a 20% discount for you!
                  </h4>
                </Link>
              </li>

              <div className={cx("notification-empty")}>
                No new notification
              </div>
            </ul>
          </div>
        </div>

        <div className={cx("account-wrapper")}>
          <img
            className={cx("account-img")}
            src={user?.profile_pic || blankProfilePic}
            alt={user?.username || "user profile picture"}
          />
          <div className={cx("account-arrow")}>
            <FaCaretDown />
          </div>

          <ul className={cx("account-management-list")}>
            <h4 className={cx("account-management-title")}>
              Hello! {user?.username || ""}
            </h4>
            <li
              className={cx(
                "account-management-item",
                "account-management-break"
              )}
            >
              <div className={cx("account-management-icon")}>
                <FaRegUser />
              </div>
              <h4 className={cx("account-management-text")}>
                Account management
              </h4>
            </li>
            <li className={cx("account-management-item")}>
              <div className={cx("account-management-icon")}>
                <IoMdHelpCircleOutline />
              </div>
              <h4 className={cx("account-management-text")}>Help center</h4>
            </li>
            <button
              className={cx(
                "account-management-item",
                "account-management-break",
                "logout"
              )}
              onClick={() => {
                handleLogout();
              }}
            >
              <div className={cx("account-management-icon")}>
                <MdLogout />
              </div>
              <h4 className={cx("account-management-text")}>Log out</h4>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
