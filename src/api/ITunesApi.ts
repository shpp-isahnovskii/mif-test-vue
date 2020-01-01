import ITunesSong from '@/interfaces/ITunesSong';

export class ITunesApi {
  static artistSongs(artist: String): Promise<Response> {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const iTunesUrl = 'https://itunes.apple.com/search?term=';
      return fetch(proxy + iTunesUrl + artist + '&entity=album', {
        "method": "GET"
      })
  }
}

export interface ITunesDataResponse {
  resultCount: number,
  results: ITunesSong[]
}