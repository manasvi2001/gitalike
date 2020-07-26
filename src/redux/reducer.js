let initialState = {
  profile: null,
  repositories: []
}

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_PROFILE":
      return {
        ...state,
        profile: action.payload
      };
    case "FETCH_REPOS":
      return {
        ...state,
        repositories: action.payload
      };
    default:
      return state;
  }
};

export default reducer;