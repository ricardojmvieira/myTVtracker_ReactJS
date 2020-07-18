import tvshowService from "./tvshow.js";
import userService from "./user.js";
import mytvshowService from "./mytvshow.js";
import genreService from "./genre.js";
//dicionario para os serviços
export default {
    tvshow: tvshowService,
    user: userService,
    mytvshow: mytvshowService,
    genre: genreService,
};
