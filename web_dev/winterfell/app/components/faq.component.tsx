import { Doto } from "next/font/google";
import AccordionDemo from "./accordian.component";


const doto = Doto({
    weight: '900',
    subsets: ['latin'],
})



const Faq = () => {
    return (
        <div
            className="absolute inset-0 z-0 bg-orange-50"
            style={{
                backgroundImage: "radial-gradient(circle, rgb(108, 68, 252) 2px, transparent 2px)",
                backgroundSize: "40px 40px",
                backgroundPosition: "0 0",
            }}

        >


            <div className=" absolute flex flex-row gap-30 justify-center items-center">

                <div className="bg-orange-50 w-160 flex justify-center items-center">

                    <div className={`${doto.className} text-[16rem]`}>

                        FAQs
                    </div>
                </div>
           <div className="flex justify-center items-start w-[500px]">
  <AccordionDemo />
</div>

            </div>

        </div>
    );
};

export default Faq;
