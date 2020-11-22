export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    token: null,
    // remove after finished developing ...
    // token: "BQCV3xbPaTsBUEmSbBDN0TXm3YYU_u1vxBFPYT6hTY7voIxLHVz_wZAw6KgTv381371w8h7miJNaFDgzKCJ7WOXZaHK5SrOu4frEmUQ6nmmzmEyP9-43-8SefIv3Zf0N1lMO7i1e6-oH8bcO4Mcq-_hYzEU",
};

// state is how it currently looks and action manipulates how the data layer will look
const reducer = (state, action) => {
    console.log(action);

// sits idle and listens to action, action -> type, [payload]

// keep current state update the state with whatever the action was
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };

        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
            };
        
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists,
            };

        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            };

            default:
                return state;
    }

}

export default reducer;