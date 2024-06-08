export interface youtubeSearchInterface {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: PageInfo;
    items: Item[];
  }
  
  interface Item {
    kind: string;
    etag: string;
    id: Id;
  }
  
  interface Id {
    kind: string;
    videoId: string;
  }
  
  interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
  }