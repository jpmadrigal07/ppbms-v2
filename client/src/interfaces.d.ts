export interface I_GlobalState {
    navBar: {
        currentPage: string
    },
    auth: {
        isLoading: boolean,
        user: any
    }
}

export interface I_ReduxAction {
    type: string,
    payload: any
}

export interface I_AppProps {
    gCurrentPage: string
}

export interface I_AuthLoadingProps {
    gSetCurrentPage: Function,
    gAuthData: any,
    gFetchUser: Function,
    gAuthIsLoading: boolean,
}

export interface I_NavbarTopProps {
    gCurrentPage: string,
    gSetCurrentPage: Function,
    gAuthIsLoading: boolean,
    gAuthData: any
}

export interface I_LoginProps {
    gSetCurrentPage: Function,
    gAuthData: any,
    loginUser: Function,
    gAuthIsLoading: boolean,
    gFetchUser: Function
}

export interface I_LoginCredentials {
    username: string,
    password: string
}

export interface I_DashboardProps {
    gCurrentPage: string,
    gSetCurrentPage: Function,
    gAuthIsLoading: boolean,
    gAuthData: any
}