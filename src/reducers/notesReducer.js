/*
  {
    notes: [],
    active: null,
    active: {
      id: '1234567890',
      title: '',
      body: '',
      imageURL: '',
      date: 1223123412456
    }
  }
*/

const initialState = {
  notes: [],
  active: null,
}

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
