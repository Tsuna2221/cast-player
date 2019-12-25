import axios from 'axios';

export const getMainCasts = () => axios.get("https://rss.itunes.apple.com/api/v1/br/podcasts/top-podcasts/all/200/explicit.json")
    .then(({data: { feed: { results } }}) => {
        let genresList = results.map(({genres}) => genres.map(({name}) => name));
        let filteredGenres = [...new Set([].concat(...genresList))];

        return filteredGenres.map((genre) => {
            let feedSection = results.filter((cast) => cast.genres.map(({name}) => name).includes(genre));

            return {title: genre, items: feedSection}
        })
    })