export default (state , action) => {

    switch (action.type) {
      case 'ADD_ROW':
        return state + 1
      case 'CHANGE_TABLE':
        return state - 1

      case 'ADD_TABLE':
      return state - 1

      case 'DELETE_ROW':
        return state - 1

      case 'REMOVE_TABLE':
      return state - 1

      case 'CHANGE_TABLE':
        return state - 1

      case 'CHANGE_TABLE':
      return state - 1

      default:
        return state
    }


  }