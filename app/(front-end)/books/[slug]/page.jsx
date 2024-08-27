"use client";
import CarouselBook from "@/components/frontend/CarouselBook";
import HeadTitleBreadcrumb from "@/components/frontend/HeadTitleBreadcrumb";
import WideCardCarousel from "@/components/frontend/WideCardCarousel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import { BookText, Heart, X } from "lucide-react";
export default function page({ params: { slug } }) {
  const {
    data: book,
    isLoading: isBookLoading,
    error: bookError,
  } = useQuery({
    queryKey: [`books_${slug}`],
    queryFn: () => getData(`all/books/${slug}`),
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: [`categories/${book?.category?.id}`],
    queryFn: () => getData(`all/categories/${book?.category?.id}`),
    enabled: !!book?.category?.id,
  });
  if (bookError || categoriesError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="">
      {isBookLoading ? (
        <div className="bg-card py-4 px-4 rounded-sm w-full">
          <Skeleton className="w-full h-10 mb-2 " />
          <Skeleton className="w-full h-96 mb-2 " />
          <Skeleton className="w-full h-44 mb-2 " />
        </div>
      ) : (
        <div className="">
           <HeadTitleBreadcrumb icon={X}  />
          <div className="border bg-card py-4 px-4 rounded-sm w-full">
            <div className="grid grid-cols-12 py-2 gap-4 sm:gap-8 mb-4 w-full">
              <div className=" col-span-full sm:col-span-5 w-full">
                <CarouselBook book={book} />
              </div>
              <div className=" col-span-full sm:col-span-7 px-2 sm:px-8 grid items-center w-full">
                <div className="grid mb-4 sm:mb-2 ">
                  <h1 className="text-3xl font-bold ">{book.title}</h1>
                  <span className="text-lg font-semibold mb-1 ">
                    ผู้แต่ง {book.author}
                  </span>
                  <span className="text-lg font-thin">ราคา {book.price}</span>
                  <span className="text-lg font-thin">
                    คงเหลือ {book.remaining}
                  </span>
                  <span className="text-lg font-thin">
                    หมวดหมู่ {book.category.title}
                  </span>
                </div>
                <div className="w-full flex sm:items-center justify-end sm:justify-start gap-2">
                  <Button>ยืมหนังสือ</Button>
                  <Button variant="outline" className="">
                    <Heart />
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full p-2 pb-5 mb-2 ">
              <h2 className="text-lg font-semibold">รายละเอียด</h2>
              <span className="text-balance text-muted-foreground">
                {book.description}
              </span>
            </div>
            {isCategoriesLoading ? (
              <Skeleton className="w-full h-44 mb-2 " />
            ) : (
              categories?.book?.filter(
                (relatedBook) => relatedBook.id !== book.id
              ).length > 0 && (
                <div className="pt-4 border-t">
                  <h2 className="text-lg font-semibold mb-4 px-4">
                    หนังสือที่เกี่ยวข้อง
                  </h2>
                  <WideCardCarousel
                    books={categories?.book.filter(
                      (relatedBook) => relatedBook.id !== book.id
                    )}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
