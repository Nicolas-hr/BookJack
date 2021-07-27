import IGoogleBook, { IIndustryIdentifier } from "../interfaces/IGoogleBook";

const useGoogleAPI = () => {
  /**
   * Build the Google Books API url
   * @see https://developers.google.com/books/docs/v1/using#PerformingSearch
   * @returns Builded URL
   */
  const buildURL = (bookName: string, authorName: string): string => {
    let URL = "https://www.googleapis.com/books/v1/volumes?q=";

    URL += `+intitle:${bookName}`;

    if (authorName) {
      URL += `+inauthor:${authorName}`;
    }

    return URL.replace(" ", "+");
  };

  /**
   * Search a book using the Google Books API
   * @param bookName Name of the searched book
   * @param authorName Name of the specified author
   */
  const searchBook = async (
    bookName: string,
    authorName: string
  ): Promise<IGoogleBook[]> => {
    const URL = buildURL(bookName, authorName);
    let results: IGoogleBook[];

    const promise = fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const callResults = await promise.then((res) => res.json());

    console.log(callResults);
    if (callResults?.items) {
      results = callResults.items.map(
        (i): IGoogleBook => ({
          id: i.id,
          title: i.volumeInfo.title,
          authors: i.volumeInfo.author,
          categories: i.volumeInfo.categories,
          description: i.volumeInfo.description,
          language: i.volumeInfo.language,
          pageCount: i.volumeInfo.pageCount,
          publisher: i.volumeInfo.publisher,
          publishedDate: new Date(i.volumeInfo.publishedDate),
          thumbnail: i.volumeInfo.imageLinks?.thumbnail,
          industryIdentifiers: i.volumeInfo.industryIdentifiers
            ? i.volumeInfo.industryIdentifiers.map(
                (ii): IIndustryIdentifier => ({
                  type: ii.type,
                  identifier: ii.identifier,
                })
              )
            : [],
        })
      );
    }

    return results;
  };

  return {
    searchBook,
  };
};

export default useGoogleAPI;
