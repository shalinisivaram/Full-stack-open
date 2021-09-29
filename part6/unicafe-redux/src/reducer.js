const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const incrementGood = {
        good: 1,
        ok: 0,
        bad: 0
      }
      return incrementGood
    case 'OK':
      const incrementOK = {
        good: 0,
        ok: 1,
        bad: 0
      }
      return incrementOK
    case 'BAD':
      const incrementBad = {
        good: 0,
        ok: 0,
        bad: 1
      }
      return incrementBad
    case 'ZERO':{
      return initialState
    }
    default: return state
  }
  
}

export default counterReducer