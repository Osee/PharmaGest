import { initError } from "../State/errorInitialState";

function ErrorReducer(state, { type, payload }) {
    switch (type) {
        default:
            return initError()
    }
}

export default ErrorReducer