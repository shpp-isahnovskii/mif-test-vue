import DeezerSong from '@/interfaces/DeezerSong';

export class DeezerApi {
  static artistSongs(artist: String): Promise<Response> {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const deezerUrl = 'https://api.deezer.com/search?q=';
      return fetch(proxy + deezerUrl + artist, {
        "method": "GET"
      })
  }
}

export interface DeezerDataResponse {
  data: DeezerSong[], 
  total: number, 
  next: string
}