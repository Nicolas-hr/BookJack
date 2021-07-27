export interface IIndustryIdentifier {
  type: string;
  identifier: string;
}

/**
 * Most important fields of Google Books API
 */
export default interface IGoogleBook {
  id: number;
  title: string;
  authors: string[];
  categories: string[];
  description: string;
  thumbnail: string;
  industryIdentifiers: IIndustryIdentifier[];
  language: string;
  pageCount: number;
  publishedDate: Date;
  publisher: string;
}
