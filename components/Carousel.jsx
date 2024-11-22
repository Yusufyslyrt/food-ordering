import Image from "next/image";
import Title from "./ui/Title";
import Slider from "react-slick";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 30000,
    appendDots: (dots) => (
      <div>
        <ul className="container mx-auto w-full text-start">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 border bg-white rounded-full mt-10"></div>
    ),
  };

  return (
    <div className="h-screen w-full -mt-[88px]">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative h-full w-full">
          <Image
            src="/images/banner_bg.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
      <Slider {...settings}>
        <div>
          <div className="mt-48 container mx-auto  text-white flex flex-col items-start gap-y-8">
            <Title addClass="text-5xl">Fast Food Restoranı</Title>
            <p className="text-sm sm:w-2/5 w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
              commodi magnam ullam fugit odio voluptas perspiciatis quia
              eligendi, neque explicabo incidunt itaque nulla facere architecto
              doloribus numquam quae dolorem quidem.
            </p>
            <button className="btn-primary !bg-siparisbutonu">
              Sipariş Ver
            </button>
          </div>
        </div>
        <div>
          <div className="mt-48 container mx-auto  text-white flex flex-col items-start gap-y-8">
            <Title addClass="text-5xl">Fast Food Restoranı</Title>
            <p className="text-sm sm:w-2/5 w-full">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea est
              voluptas mollitia sed sunt praesentium in assumenda molestias
              soluta, enim illo eius. Quod harum dolorum debitis optio
              doloremque ipsum accusantium nostrum dicta laboriosam eum quasi..
            </p>
            <button className="btn-primary !bg-siparisbutonu">
              Sipariş Ver
            </button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
