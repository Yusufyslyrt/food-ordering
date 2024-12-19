import Image from "next/image";
import Title from "./ui/Title";

const About = () => {
  return (
    <div className="bg-secondary py-14">
      <div className="container mx-auto flex items-center text-white gap-20 justify-center flex-wrap-reverse">
        <div className="flex justify-center">
          <div className="relative sm:w-[445px] sm:h-[600px]  flex justify-center w-[300px] h-[450px]">
            <Image src="/images/about-img.png" alt="" layout="fill" />
          </div>
        </div>
        <div className="md:w-1/2 ">
          <Title addClass="text-[40px]">Biz Kimiz</Title>
          <p className="my-5 flex flex-col items-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam voluptates eveniet voluptatum blanditiis quia assumenda ipsa pariatur nostrum error totam voluptatem odit quis, commodi delectus animi exercitationem repellat asperiores eum earum nulla recusandae aperiam rem saepe. Odit numquam ex expedita quo animi nobis dolorem, odio aspernatur reprehenderit dolores, quia ut quidem ab voluptatibus quaerat. Ullam, aliquam facilis recusandae saepe cumque quod dolorem deleniti error nihil enim rem, molestias alias perspiciatis!
          </p>
          <button className="btn-primary">Daha Fazla</button>
        </div>
      </div>
    </div>
  );
};

export default About;
