import classNames from "classnames/bind";
import { LuLoader2 } from "react-icons/lu";
import { FaMoneyBills } from "react-icons/fa6";
import { GrStatusInfo } from "react-icons/gr";
import { IoLanguage } from "react-icons/io5";

import { Header, Footer, CardSlider, TrailerSection } from "../../components";

import styles from "./DetailPage.module.scss";
import { MovieOverview, EpisodeSection } from "./components";
import useHandler from "./controller";

const cx = classNames.bind(styles);

function DetailPage({ props }) {
  const type = props.type;
  const { id, loading, data, collection, casts, videos, formatMoney } =
    useHandler(type);

  return (
    <div className={cx("content")}>
      <Header loading={loading} />
      <div className={cx("loader", { "no-display": !loading })}>
        <LuLoader2 className={cx("loader-icon")} />
      </div>

      <span className={cx({ "no-display": loading })}>
        <MovieOverview data={data} targetId={id} type={type} />

        <div className={cx("info-bar")}>
          <div className={cx("info-item")}>
            <h3 className={cx("info-title")}>Original Title</h3>
            <div className={cx("info-content")}>
              <p className={cx("info-value")}>
                {data?.original_name ? data.original_name : data?.name}
              </p>
            </div>
          </div>
          <div className={cx("info-item")}>
            <h3 className={cx("info-title")}>
              <span className={cx("info-title-icon")}>
                <GrStatusInfo />
              </span>
              Status
            </h3>
            <div className={cx("info-content")}>
              <p className={cx("info-value")}>
                {data?.status ? data.status : "_"}
              </p>
            </div>
          </div>
          <div className={cx("info-item")}>
            <h3 className={cx("info-title")}>
              <span className={cx("info-title-icon")}>
                <IoLanguage />
              </span>
              Original Language
            </h3>
            <div className={cx("info-content")}>
              <p className={cx("info-value")}>
                {data?.original_language ? data.original_language : "_"}
              </p>
            </div>
          </div>
          <div className={cx("info-item")}>
            <h3 className={cx("info-title")}>
              <span className={cx("info-title-icon")}>
                <FaMoneyBills />
              </span>
              Budget
            </h3>
            <div className={cx("info-content")}>
              <p className={cx("info-value")}>
                {data?.budget ? "$" + formatMoney(data.budget) : "_"}
              </p>
            </div>
          </div>
        </div>

        <span className={cx({ "no-display": type === "movies" })}>
          <EpisodeSection
            id={id}
            type={type}
            data={type !== "movies" ? data?.seasons : undefined}
          />
        </span>

        <span className={cx({ "no-display": videos?.length === 0 })}>
          <TrailerSection
            title={"Teasers& Trailers"}
            horizontal
            source={videos}
          />
        </span>

        <span className={cx({ "no-display": casts?.director?.length === 0 })}>
          <CardSlider
            scroll
            title="Director"
            source={casts.director}
            type="person"
          />
        </span>
        <span className={cx({ "no-display": casts?.cast?.length === 0 })}>
          <CardSlider scroll title="Casts" source={casts.cast} type="person" />
        </span>
        <span className={cx({ "no-display": collection?.length === 0 })}>
          <CardSlider
            scroll
            title="Collection"
            source={collection}
            type="movie"
          />
        </span>

        <h3 className={cx("section-title")}>
          Production Compan{data?.production_companies.length > 1 ? "ies" : "y"}
          :
        </h3>
        <div className={cx("production-companies")}>
          {data?.production_companies?.map((item, index) => {
            if (item.img)
              return (
                <img
                  key={index}
                  className={cx("production-company")}
                  src={item.img}
                  alt={item.name}
                />
              );
            else
              return (
                <div key={index} className={cx("no-logo")}>
                  {item.name}
                </div>
              );
          })}
        </div>

        <Footer />
      </span>
    </div>
  );
}

export default DetailPage;
