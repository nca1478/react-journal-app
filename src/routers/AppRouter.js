import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { AuthRouter } from './AuthRouter'
import { JournalScreen } from '../components/journal/JournalScreen'
import { firebase } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { startLoadingNotes } from '../actions/notes'

export const AppRouter = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // check if user is logged in

  useEffect(() => {
    // check authentication
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName))
        setIsLoggedIn(true)
        dispatch(startLoadingNotes(user.uid))
      } else {
        setIsLoggedIn(false)
      }
      setLoading(false)
    })
  }, [dispatch, setLoading, setIsLoggedIn])

  if (loading) {
    return (
      <div className="preloader-container">
        <div className="preloader"></div>
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/auth"
            isAuthenticated={isLoggedIn}
            component={AuthRouter}
          />

          <PrivateRoute
            exact
            path="/"
            isAuthenticated={isLoggedIn}
            component={JournalScreen}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  )
}
