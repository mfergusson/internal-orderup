import { useState, useMemo } from 'react'

/**
 * Our custom React hook to manage state
 */

const initialState = {
  user: undefined,
  pageLoading: false,
  restaurantDetails: {}
};

export const useAppState = () => {

  // Manage the state using React.useState()
  const [state, setState] = useState(initialState);

  // Build our actions. We'll use useMemo() as an optimization,
  // so this will only ever be called once.
  const actions = useMemo(() => getActions(setState), [setState]);

  return { state, actions };
}

// Define your actions as functions that call setState().
// It's a bit like Redux's dispatch(), but as individual
// functions.
const getActions = (setState: any) => ({
  clearState: () => {
    setState((state: any) => {
      return {
        ...initialState,
        user: state.user,
      }
    })
  },
  setUser: (user: any) => {
    setState((state: any) => {
      return {
        ...state,
        user: user || {},
      }
    })
  },
  setPageLoading: (pageLoading: any) => {
    setState((state: any) => {
      return {
        ...state,
        pageLoading,
      }
    })
  },
  updateInitialState: (initState: any) => {
    setState((state: any) => {
      return {
        ...state,
        ...initState,
      }
    })
  },
});