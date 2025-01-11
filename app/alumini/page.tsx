import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import { alumini } from "@/data";
import { Button } from "@/components/ui/MovingBorders";

const Experience = () => {
  return (
    <div id="team" className="py-20 w-full">
      <h1 className="heading">
        Our Proud <span className="text-purple">Alumni Entrepreneurs </span>
        Building Legacies Beyond Campus
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {alumini.map((card) => (
          <Button
            key={card.id}
            //   random duration will be fun , I think , may be not
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              //   add these two
              //   you can generate the color from here https://cssgradient.io/
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              // add this border radius to make it more rounded so that the moving border is more realistic
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            // remove bg-white dark:bg-slate-900
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <img
                src={card.thumbnail}
                alt={card.thumbnail}
                className="lg:w-32 md:w-20 w-16"
              />
              <div className="lg:ms-5">
                <h1 className="text-start text-xl md:text-2xl font-bold">
                  {card.title}
                </h1>
                <p className="text-start text-xl md:text-lg mt-4">
                  {card.year}
                </p>
                <p className="text-start mt-4 text-xl md:text-xl font-bold">
                  {card.position}
                </p>
                <p className="text-start text-white-100 text-lg mt-3">
                  {card.desc}
                </p>

                <div className="flex items-center  mt-4 md:gap-3 gap-6">
                  {socialMedia.map((info) => (
                    <div
                      key={info.id}
                      className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
                    >
                      <img src={info.img} alt="icons" width={20} height={20} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;
