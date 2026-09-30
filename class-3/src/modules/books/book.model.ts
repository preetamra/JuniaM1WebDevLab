export type BookAuthorModel = {
  firstName: string;
  lastName: string;
};

export type BookModel = {
  id: string;
  title: string;
  publishedYear: number;
  author: BookAuthorModel;
};

export type CreateBookModel = Omit<BookModel, 'id'>;

export type UpdateBookModel = Partial<CreateBookModel>;
