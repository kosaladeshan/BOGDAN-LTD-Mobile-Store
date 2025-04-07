import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3 position-relative">
          {/* Carousel */}
          <div id="carouselExampleAutoplaying" 
               className="carousel slide carousel-fade" 
               data-bs-ride="carousel"
               data-bs-interval="3000"
               data-bs-pause="false"
               data-bs-wrap="true"
               style={{ transition: "transform 1.2s ease-in-out" }}>
            {/* Fixed text overlay */}
            <div className="position-absolute w-100 h-100 d-flex align-items-center" style={{ zIndex: 2 }}>
              <div className="container">
                <h5 className="card-title fs-1 text fw-lighter">Latest Mobile Arrivals!</h5>
                <p className="card-text fs-5 d-none d-sm-block">
                  Discover The Newest Smartphones with Cutting-Edge Features.Stay Ahead With Our Latest Collection, <br />
                  Offering Top Performance, Sleek Designs, And Unbeatable Deals!
                </p>
              </div>
            </div>

            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2" aria-label="Slide 3"></button>
              <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="3" aria-label="Slide 4"></button>
              <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="4" aria-label="Slide 5"></button>
              <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="5" aria-label="Slide 6"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="3000">
                <img src="./assets/a.png.jpg" className="d-block w-100" alt="Slide A" height={500} 
                     style={{ transition: "opacity 1.2s ease-in-out" }} />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src="./assets/b.png.jpg" className="d-block w-100" alt="Slide B" height={500} 
                     style={{ transition: "opacity 1.2s ease-in-out" }} />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src="./assets/c.png.jpg" className="d-block w-100" alt="Slide C" height={500} 
                     style={{ transition: "opacity 1.2s ease-in-out" }} />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src="./assets/d.png.jpg" className="d-block w-100" alt="Slide D" height={500} 
                     style={{ transition: "opacity 1.2s ease-in-out" }} />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src="./assets/e.png.jpg" className="d-block w-100" alt="Slide E" height={500} 
                     style={{ transition: "opacity 1.2s ease-in-out" }} />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src="./assets/f.png.jpg" className="d-block w-100" alt="Slide F" height={500} 
                     style={{ transition: "opacity 1.2s ease-in-out" }} />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
