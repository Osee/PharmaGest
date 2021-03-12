import { useState } from 'react'
import propTypes from "prop-types"

function useToggle(initialState = false) {
    const [state, setstate] = useState(initialState)
    const toggle = () => setstate(pst => !pst)
    return [state, toggle]
}

useToggle.propTypes = {
    initialState: propTypes.bool.isRequired
}

export default useToggle
