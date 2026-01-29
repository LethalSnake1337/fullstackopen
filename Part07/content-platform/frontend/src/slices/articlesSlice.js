import { createSlice } from '@reduxjs/toolkit'
import articlesService from '../services/articlesApi'

const initialState = []

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action) => action.payload,
    appendArticle: (state, action) => {
      state.push(action.payload)
    },
    updateArticle: (state, action) => {
      const updated = action.payload
      return state.map(item => item.id === updated.id ? updated : item)
    },
    removeArticle: (state, action) => {
      return state.filter(item => item.id !== action.payload)
    }
  }
})

export const { setArticles, appendArticle, updateArticle, removeArticle } = articlesSlice.actions

export const loadAll = () => async (dispatch) => {
  const results = await articlesService.getAll()
  dispatch(setArticles(results))
}

export const createNew = (content) => async (dispatch) => {
  const created = await articlesService.create(content)
  dispatch(appendArticle(created))
}

export const modifyArticle = (id, content) => async (dispatch) => {
  const updated = await articlesService.update(id, content)
  dispatch(updateArticle(updated))
}

export const deleteArticle = (id) => async (dispatch) => {
  await articlesService.remove(id)
  dispatch(removeArticle(id))
}

export default articlesSlice.reducer
