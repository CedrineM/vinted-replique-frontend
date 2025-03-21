import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Product from "../components/Product";

const Home = ({ data, setPages, pages, isConnected, visible, setVisible }) => {
  //   console.log(data.offers);
  const pagination = (page) => {
    if (page === "next") {
      setPages(pages + 1);
    } else if (page === "previous") {
      setPages(pages - 1);
    } else {
      setPages(page);
    }
  };

  const buttonPagination = () => {
    const tabPages = [];
    for (let i = 1; i <= Math.ceil(data.count / 10); i++) {
      tabPages.push(i);
    }
    return tabPages;
  };

  return (
    <>
      <Hero
        isConnected={isConnected}
        visible={visible}
        setVisible={setVisible}
      />

      <main className="home">
        <div className="container">
          <div className="pagination">
            <p>Total des offres : {data.count}</p>
            {data.offers.length > 0 && (
              <div>
                <p>
                  Page : {pages} / {Math.ceil(data.count / 10)}
                </p>
                <nav>
                  <button
                    disabled={pages === 1 && true}
                    onClick={() => {
                      pagination("previous");
                    }}
                  >
                    {"<"}
                  </button>
                  {buttonPagination().map((num) => {
                    return (
                      <button
                        key={num}
                        disabled={pages === num && true}
                        onClick={() => {
                          pagination(num);
                        }}
                      >
                        {num}
                      </button>
                    );
                  })}
                  <button
                    disabled={pages === Math.ceil(data.count / 10) && true}
                    onClick={() => {
                      pagination("next");
                    }}
                  >
                    {">"}
                  </button>
                </nav>
              </div>
            )}
          </div>
          <div className="offers">
            {data.offers.length === 0 ? (
              <p>Aucune offres ne correspond à votre recherche</p>
            ) : (
              data.offers.map((productInfo) => {
                // console.log(productInfo.owner);
                return (
                  <Product key={productInfo._id} productInfo={productInfo} />
                );
              })
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
