import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './book.dto.js';
import type { BookModel } from './book.model.js';
import { BookService } from './book.service.js';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  listBooks(): BookModel[] {
    return this.bookService.listBooks();
  }

  @Get(':id')
  getBook(@Param('id') id: string): BookModel {
    return this.bookService.getBook(id);
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto): BookModel {
    return this.bookService.createBook(createBookDto);
  }

  @Patch(':id')
  updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): BookModel {
    return this.bookService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string): void {
    this.bookService.deleteBook(id);
  }
}
