import { Injectable, NotFoundException } from '@nestjs/common';
import { BookModel, CreateBookModel, UpdateBookModel } from './book.model.js';
import { BookRepository } from './book.repository.js';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  listBooks(): BookModel[] {
    return this.bookRepository.findAll();
  }

  getBook(id: string): BookModel {
    const book = this.bookRepository.findById(id);
    if (!book) throw new NotFoundException(`Book ${id} not found`);
    return book;
  }

  createBook(input: CreateBookModel): BookModel {
    return this.bookRepository.create(input);
  }

  updateBook(id: string, input: UpdateBookModel): BookModel {
    const book = this.bookRepository.update(id, input);
    if (!book) throw new NotFoundException(`Book ${id} not found`);
    return book;
  }

  deleteBook(id: string): void {
    if (!this.bookRepository.delete(id)) {
      throw new NotFoundException(`Book ${id} not found`);
    }
  }
}
