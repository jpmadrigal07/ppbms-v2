export interface I_GlobalState {
    navBar: {
        currentPage: String
    }
}

export interface I_ReduxAction {
    type: String,
    payload: Any
}

export interface I_AppProps {
    gCurrentPage: String
}

export interface I_NavbarTopProps {
    gCurrentPage: String,
    gSetCurrentPage: Function
}