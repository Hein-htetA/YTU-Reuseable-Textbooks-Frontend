import React from "react";

interface Props {
  title: string;
  edition: string;
  count: number;
  price: number;
}

const SingleBookInGrid = ({ title, edition, count, price }: Props) => {
  return (
    <>
      <div className="capitalize">{title + " (" + edition + ")"}</div>
      <div className="text-center">{count}</div>
      <div className="text-center">{count * price}</div>
    </>
  );
};

const SingleBookInOrderHistory = ({ books }: any) => {
  return (
    <div className="grid grid-cols-[auto_1fr_1fr] gap-x-3 gap-y-1 mb-2 text-xs sm:text-sm">
      <div className="capitalize border-b border-slate-500 pb-1 font-bold text-sm">
        Title
      </div>
      <div className="text-center border-b border-slate-500 pb-1 font-bold text-sm">
        Quantity
      </div>
      <div className="text-center border-b border-slate-500 pb-1 font-bold text-sm">
        Amount
      </div>
      {books.map((book: any) => (
        <SingleBookInGrid
          key={book._id}
          title={book.title}
          edition={book.edition}
          count={book.count}
          price={book.price}
        />
      ))}
    </div>
  );
};

export default SingleBookInOrderHistory;
