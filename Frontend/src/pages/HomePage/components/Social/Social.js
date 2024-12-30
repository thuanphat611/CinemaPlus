import classNames from "classnames/bind";
import { FaTelegram, FaInstagram } from "react-icons/fa";
import { LuAtSign } from "react-icons/lu";

import styles from "./Social.module.scss";
import useHandler from "./controller";

const cx = classNames.bind(styles);

function Social() {
  const { input, setInput } = useHandler();

  return (
    <div className={cx("container")}>
      <a
        className={cx("link")}
        href="https://web.telegram.org/"
        rel="noreferrer"
        target="_blank"
      >
        <div className={cx("block", "telegram")}>
          <div className={cx("content-wrapper")}>
            <div className={cx("icon")}>
              <FaTelegram />
            </div>
            <h4 className={cx("name")}>Follow us on Telegram</h4>
          </div>
        </div>
      </a>

      <a
        className={cx("link")}
        href="https://www.instagram.com/"
        rel="noreferrer"
        target="_blank"
      >
        <div className={cx("block", "instagram")}>
          <div className={cx("content-wrapper")}>
            <div className={cx("icon")}>
              <FaInstagram />
            </div>
            <h4 className={cx("name")}>Follow us on Instagram</h4>
          </div>
        </div>
      </a>

      <div className={cx("block-double")}>
        <div className={cx("subscribe")}>
          <div className={cx("content-wrapper")}>
            <div className={cx("at-icon")}>
              <LuAtSign />
            </div>
            <h4 className={cx("name")}>Newsletter Subcription</h4>
          </div>
        </div>

        <div className={cx("submit")}>
          <p className={cx("text")}>
            By subscribing to the Email newsletter, you can find out about the
            latest news of the world cinema and also find out about the
            discounts and festivals of the website.
          </p>
          <div className={cx("form")}>
            <input
              className={cx("input")}
              type="text"
              placeholder="Enter your Email..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button className={cx("btn")}>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Social;
