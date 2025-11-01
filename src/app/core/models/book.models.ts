export interface BookVolumeInfo {
  id: string;
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
  language?: string;
  previewLink?: string;
  infoLink?: string;
}

export interface Book {
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: BookVolumeInfo;
}

export interface BooksApiResponse {
  kind: string;
  totalItems: number;
  items?: Book[];
}

export interface BookApiRequest {
  searchInput: string;
  startIndex: number;
  maxResult: number;
}
