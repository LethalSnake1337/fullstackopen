import { createSlice } from '@reduxjs/toolkit'
import profilesService from '../services/profilesApi'

const initialState = []

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setProfiles: (state, action) => action.payload
  }
})

export const { setProfiles } = profilesSlice.actions

export const fetchAll = () => async (dispatch) => {
  const items = await profilesService.getAll()
  dispatch(setProfiles(items))
}

export default profilesSlice.reducer
