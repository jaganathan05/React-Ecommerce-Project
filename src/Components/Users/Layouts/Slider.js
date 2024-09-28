import Carousel from 'react-bootstrap/Carousel';
import './Slider.css';

function Slider() {
  return (
    <div className="slider-container">
      <Carousel className="product-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/1.png"            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/2.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/4.png"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/3.png"
            alt="Fourth slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Slider;
