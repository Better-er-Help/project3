import React, { createContext, useReducer, useContext } from "react"

// any variables we depend on for UI/flow we must pre-set
const initialData = {
  name: "", tasks: [], token: ""
}

/*! IMPORTANT all your reducer functionality goes here */
const dataReducer = (state, action) => {
  switch (action.type) {
    case "ALREADY_SIGNEDIN":
      return { ...state, ...action.data}
    case "USER_LOGIN":
      return { ...state, ...action.data, alert: action.message || '', authOk: true }
    case "USER_LOGOUT":
      // needed to force this reload (else it just refreshed with invalid content)
      localStorage.removeItem('email')
      localStorage.removeItem('token')
      window.location.href = '/'
      return { ...initialData, alert: action.message || '' }
    case "ALERT_MESSAGE":
      return { ...state, alert: action.message }
    case "ALERT_CLEAR":
      return { ...state, alert: '' }
    case "UPDATE_TASKS":
      return { ...state, tasks: action.tasks, alert: action.message || '' }
    default:
      console.log(`Invalid action type: ${action.type}`)
      return state
  }
}



const StoreContext = createContext()

const useStoreContext = function(){
  return useContext(StoreContext)
}

const StoreProvider = function(props){
  const [state, dispatch] = useReducer( dataReducer, initialData )
  return <StoreContext.Provider value={[state, dispatch]} {...props} />
}

export { StoreProvider, useStoreContext }