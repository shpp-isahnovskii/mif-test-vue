export interface AlbumInterface {
  title : string;
}
export default class Album implements AlbumInterface {
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}