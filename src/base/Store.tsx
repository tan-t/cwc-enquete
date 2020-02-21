import React, { createContext, useReducer, useEffect } from 'react'
import firebase from 'firebase'

const reducer = (state: any, action: { type: string, value: any }) => {
  switch (action.type) {
    case 'setFavoriteScenes':
      return {
        ...state,
        favorites: action.value
      }
    case 'setStage':
      return {
        ...state,
        stage: action.value
      }
    case 'setName':
      return {
        ...state,
        name: action.value
      }
    case 'setUser':
      return {
        ...state,
        user: action.value
      }
    case 'setComments':
      return {
        ...state,
        comments: action.value
      }
    case 'setUserInfo':
      return {
        ...state,
        name: action.value.name,
        stage: action.value.stage
      }
    case 'addFavorite':
      const favorites = action.value.checked && [...state.favorites, action.value.scene].filter((a, b, c) => c.indexOf(a) === b) || state.favorites.filter((a: any) => a !== action.value.scene)
      return {
        ...state,
        favorites: favorites
      }
    default:
      return { ...state }
  }
}

const initialState = {
  favorites: [],
  stage: -1,
  name: '',
  user: {},
  comments: []
}

export const Store = createContext<any>(initialState)

export const Provider = ({ children }: any) => {
  const [store, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    firebase.auth().signInAnonymously().catch(function (error) {
      console.error(error)
    })
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      dispatch({ type: 'setUser', value: user })
      if (user) {
        firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
          if (!doc.exists) {
            return
          }

          dispatch({ type: 'setUserInfo', value: doc.data() })
        })
      }
    })
  }, [])

  return <Store.Provider value={{ store, dispatch }}>{children}</Store.Provider>
}
