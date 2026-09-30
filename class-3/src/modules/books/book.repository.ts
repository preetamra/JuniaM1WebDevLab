import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { BookModel, CreateBookModel, UpdateBookModel } from './book.model.js';

@Injectable()
export class BookRepository {
  // ponytail: in-memory "DB", emptied on every reload; swapped for typeorm in class 4
  private readonly books: BookModel[] = [];

  findAll(): BookModel[] {
    return this.books;
  }

  findById(id: string): BookModel | undefined {
    return this.books.find((book) => book.id === id);
  }

  create(input: CreateBookModel): BookModel {
    const book: BookModel = { id: v4(), ...input };
    this.books.push(book);
    return book;
  }

  update(id: string, input: UpdateBookModel): BookModel | undefined {
    const book = this.findById(id);
    // DTO class fields exist as `undefined` (ES2022+ class fields), so skip them instead of erasing data
    const changes = Object.entries(input).filter(
      ([, value]) => value !== undefined,
    );
    if (book) Object.assign(book, Object.fromEntries(changes));
    return book;
  }

  delete(id: string): boolean {
    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) return false;
    this.books.splice(index, 1);
    return true;
  }
}
