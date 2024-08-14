import CarouselBook from "@/components/frontend/CarouselBook";
import WideCardCarousel from "@/components/frontend/WideCardCarousel";
import { Button } from "@/components/ui/button";
import { books } from "@/lib/books";
import { Heart } from "lucide-react";
export default function page() {
  const book = books[0];
  return (
    <div className="border bg-card py-4 px-4 rounded-sm w-full">
      <div className="grid grid-cols-12 py-2 gap-4 sm:gap-8 mb-4 w-full">
        <div className=" col-span-full sm:col-span-5 w-full">
          <CarouselBook book={book} />
        </div>
        <div className=" col-span-full sm:col-span-7 px-2 sm:px-8 grid items-center w-full">
          <div className="grid mb-4 sm:mb-2 ">
            <h1 className="text-3xl font-bold ">{book.title}</h1>
            <span className="text-lg font-semibold mb-1 ">ผู้แต่ง {book.authors}</span>
            <span className="text-lg font-thin">ราคา {book.price}</span>
            <span className="text-lg font-thin">คงเหลือ {book.qty}</span>
            <span className="text-lg font-thin">หมวดหมู่ {book.categoryBook}</span>
          </div>
          <div className="w-full flex sm:items-center justify-end sm:justify-start gap-2">
            <Button>ยืมหนังสือ</Button>
            <Button variant="outline" className=""><Heart /></Button>
          </div>
        </div>
      </div>
      <div className="w-full p-2 border-b pb-5 mb-2 ">
      <h2 className="text-lg font-semibold">รายละเอียด</h2>
        <span className="text-balance text-muted-foreground">
         {book.description}
        </span>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-4 px-4">หนังสือที่เกี่ยวข้อง</h2>
        <WideCardCarousel books={books} />
      </div>
    </div>
  );
}
