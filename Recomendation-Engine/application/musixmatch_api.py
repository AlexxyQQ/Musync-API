import requests


class Musixmatch(object):
    def __init__(self, apikey: str) -> None:
        self.__apikey = apikey
        self.__url = "http://api.musixmatch.com/ws/1.1/"

    def _get_url(self, url: str) -> str:
        return f"{self.__url}{url}&apikey={self.__apikey}"

    @property
    def _apikey(self) -> str:
        return self.__apikey

    def _request(self, url: str) -> dict:
        request = requests.get(url)
        return request.json()

    def matcher_lyrics_get(self, q_track, q_artist, _format="json"):
        data = self._request(
            self._get_url(
                "matcher.lyrics.get?"
                "q_track={}&q_artist={}&format={}".format(q_track, q_artist, _format),
            ),
        )
        return data
