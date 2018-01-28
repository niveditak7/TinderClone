const initialState = {
    //todos: [], // Array of objects of type {text: 'my task', completed: false}
    //displayType: 'all', // expected values: 'all', 'completed', 'active'
    session: {}
  };

  export default function (state = initialState, action) {
    switch (action.type) {
    case 'SET_SESSION':
      return {
        ...state, session: action.session
      }
      default:
  }
  return state;
}