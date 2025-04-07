import React from 'react'
import { Footer, Navbar } from "../components";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
          Welcome to BOCDAN LTD Mobile Store, your premier destination for cutting-edge mobile technology and accessories. 
          As a leading retailer in the electronics industry, we pride ourselves on offering an extensive selection of the 
          latest smartphones, wearable tech, and premium accessories. Our commitment to excellence extends beyond just 
          products - we provide expert guidance, superior customer service, and competitive pricing to ensure the best 
          shopping experience for our valued customers. With years of experience in the mobile technology sector, we 
          carefully curate our product range to include only the highest quality items from trusted brands. Whether you're 
          looking for the latest flagship smartphone, innovative wearable technology, or essential accessories, BOCDAN LTD 
          Mobile Store is your one-stop destination. We understand that staying connected is crucial in today's digital 
          world, which is why we strive to offer not just products, but complete mobile solutions tailored to your needs. 
          Visit us today and experience the perfect blend of technology, service, and value.
        </p>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600" alt="Smartphones" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Smartphones</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://images.unsplash.com/photo-1544866092-1935c5ef2a8f?q=80&w=600" alt="Wearable Tech" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Wearable Tech</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=600" alt="Mobile Accessories" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Mobile Accessories</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=600" alt="Gadgets & Electronics" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Gadgets & Electronics</h5>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="text-center py-4">Our Development Team</h2>
        <div id="teamCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="card h-100 border-0">
                    <div className="card-body text-center">
                      <img src="/profile/01.png.jpg" 
                           className="rounded-circle mb-3" 
                           alt="Developer 1"
                           style={{ width: "200px", height: "200px", objectFit: "cover", border: "4px solid #f8f9fa", boxShadow: "0 0 15px rgba(0,0,0,0.1)" }} />
                      <h5 className="card-title mb-0">Kosala Deshan</h5>
                      <p className="text-muted">Lead Developer</p>
                      <p className="card-text">Full-stack developer with expertise in React.js and Node.js.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="card h-100 border-0">
                    <div className="card-body text-center">
                      <img src="/profile/02.png.jpg" 
                           className="rounded-circle mb-3" 
                           alt="Developer 2"
                           style={{ width: "200px", height: "200px", objectFit: "cover", border: "4px solid #f8f9fa", boxShadow: "0 0 15px rgba(0,0,0,0.1)" }} />
                      <h5 className="card-title mb-0">Gayan Manage</h5>
                      <p className="text-muted">Frontend Developer</p>
                      <p className="card-text">UI/UX specialist focused on creating beautiful interfaces.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="card h-100 border-0">
                    <div className="card-body text-center">
                      <img src="/profile/03.png.jpg" 
                           className="rounded-circle mb-3" 
                           alt="Developer 3"
                           style={{ width: "200px", height: "200px", objectFit: "cover", border: "4px solid #f8f9fa", boxShadow: "0 0 15px rgba(0,0,0,0.1)" }} />
                      <h5 className="card-title mb-0">Devin Fernando</h5>
                      <p className="text-muted">Backend Developer</p>
                      <p className="card-text">Database expert specializing in API development.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="card h-100 border-0">
                    <div className="card-body text-center">
                      <img src="/profile/04.png.jpg" 
                           className="rounded-circle mb-3" 
                           alt="Developer 4"
                           style={{ width: "200px", height: "200px", objectFit: "cover", border: "4px solid #f8f9fa", boxShadow: "0 0 15px rgba(0,0,0,0.1)" }} />
                      <h5 className="card-title mb-0">Charith Bandara</h5>
                      <p className="text-muted">QA Engineer</p>
                      <p className="card-text">Quality assurance specialist ensuring high standards.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="card h-100 border-0">
                    <div className="card-body text-center">
                      <img src="/profile/05.png.jpg" 
                           className="rounded-circle mb-3" 
                           alt="Developer 5"
                           style={{ width: "200px", height: "200px", objectFit: "cover", border: "4px solid #f8f9fa", boxShadow: "0 0 15px rgba(0,0,0,0.1)" }} />
                      <h5 className="card-title mb-0">Osada Abeysinghe</h5>
                      <p className="text-muted">Documentation and Reporting</p>
                      <p className="card-text">Documentation and Reporting Specialist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-indicators position-relative mt-3">
            <button type="button" data-bs-target="#teamCarousel" data-bs-slide-to="0" className="active bg-dark" aria-current="true" aria-label="Developer 1"></button>
            <button type="button" data-bs-target="#teamCarousel" data-bs-slide-to="1" className="bg-dark" aria-label="Developer 2"></button>
            <button type="button" data-bs-target="#teamCarousel" data-bs-slide-to="2" className="bg-dark" aria-label="Developer 3"></button>
            <button type="button" data-bs-target="#teamCarousel" data-bs-slide-to="3" className="bg-dark" aria-label="Developer 4"></button>
            <button type="button" data-bs-target="#teamCarousel" data-bs-slide-to="4" className="bg-dark" aria-label="Developer 5"></button>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#teamCarousel" data-bs-slide="prev" style={{ filter: 'invert(1)' }}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#teamCarousel" data-bs-slide="next" style={{ filter: 'invert(1)' }}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <style>
          {`
            .carousel-item {
              transition: transform 1.2s ease-in-out;
              padding: 20px 0;
            }
            .carousel-fade .carousel-item {
              opacity: 0;
              transition: opacity 1.2s ease-in-out;
            }
            .carousel-fade .carousel-item.active {
              opacity: 1;
            }
            .card {
              background: transparent;
            }
            .card-body {
              padding: 2rem;
            }
          `}
        </style>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage