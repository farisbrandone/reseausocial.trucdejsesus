import { Card, CardContent } from "@/mobilePart/forMobileComponents/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/mobilePart/forMobileComponents/ui/carousel";

const tableauCaroussel = [
  {
    href: "https://www.trucdejesus.com/mission",
    button: "Mission",
    url: "https://d3do1p4qp602pz.cloudfront.net/user_1837/image/595a3813096f_700.png",
  },
  {
    href: "https://www.trucdejesus.com/category/articles",
    button: "ARTICLES",
    url: "https://d3do1p4qp602pz.cloudfront.net/user_1837/image/595a3813096f_700.png",
  },
  {
    href: "https://www.trucdejesus.com/contact",
    button: "Contact",
    url: "https://d3do1p4qp602pz.cloudfront.net/user_1837/image/62b1287510e1_44.png",
  },
];

export function SlideComponents() {
  return (
    <Carousel className="w-full sm:max-w-screen-sm">
      <CarouselContent>
        {tableauCaroussel.map((elt, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="">
                <CardContent
                  className={`flex aspect-square items-center justify-center p-6 bg-cover `}
                  style={{ backgroundImage: "url(" + elt.url + ")" }}
                >
                  <a
                    href={elt.href}
                    className=" text-center w-[100px] py-2 hover:bg-[#e6c068b0] bg-[#e6c068] text-[14px] rounded-[50px]  "
                  >
                    {elt.button}
                  </a>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-[#bd10e0] " />
      <CarouselNext className="bg-[#bd10e0] " />
    </Carousel>
  );
}
