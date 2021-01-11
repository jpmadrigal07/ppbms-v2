export interface I_GlobalState {
    navBar: {
        currentPage: string
    },
    auth: {
        isLoading: boolean,
        user: any
    },
    user: {
        isLoading: boolean,
        data: any
    },
    areaPrice: {
        isLoading: boolean,
        isUpdateLoading: boolean,
        isAddLoading: boolean,
        isDeleteLoading: boolean,
        data: I_AreaPrice[]
    },
    barcodeMiddleText: {
        isLoading: boolean,
        isUpdateLoading: boolean,
        isAddLoading: boolean,
        isDeleteLoading: boolean,
        data: I_BarcodeMiddleText[]
    },
    topAlert: {
        showAlert: boolean,
        message: string,
        type: string
    },
    modalTopAlert: {
        showAlert: boolean,
        message: string,
        type: string
    },
    dispatchControlMessenger: {
        isLoading: boolean,
        isUpdateLoading: boolean,
        isAddLoading: boolean,
        isDeleteLoading: boolean,
        data: I_DispatchControlMessenger[]
    }
    encodeList: {
        isLoading: boolean,
        isUpdateLoading: boolean,
        isAddLoading: boolean,
        isDeleteLoading: boolean,
        data: I_EncodeList[]
    }
    record: {
        isLoading: boolean,
        isUpdateLoading: boolean,
        isAddLoading: boolean,
        isDeleteLoading: boolean,
        data: I_Record[]
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

export interface I_SettingsProps {
    getUser: Function,
    updateUser: Function,
    userIsLoading: boolean,
    userData: any,
    authData: any,
    triggerTopAlert: Function
}

export interface I_AddMessengerProps {
    addDispatchControlMessenger: Function,
    isAddDispatchControlMessengerLoading: boolean,
    dispatchControlMessengerData: I_DispatchControlMessenger[],
    triggerTopAlert: Function
}

export interface I_DispatchControlMessenger {
    _id: string,
    name: string,
    address: string,
    preparedBy: string,
    date: string,
    deletedAt: string
}

export interface I_EncodeList {
    _id: string,
    filaName: string,
    deletedAt: string
}

export interface I_Record {
    _id: string,
    messengerId: string,
    encodeListId: string,
    sender: string,
    delType: string,
    pud: string,
    month: string,
    year: string,
    jobNum: string,
    checkList: string,
    fileName: string,
    seqNum: string,
    cycleCode: string,
    qty: number,
    address: string,
    area: string,
    subsName: string,
    barCode: string,
    acctNum: string,
    dateRecieved: string,
    recievedBy: string,
    relation: string,
    messenger: string,
    status: string,
    reasonRTS: string,
    remarks: string,
    dateReported: string,
    deletedAt: string
}

export interface I_LocationPriceProps {
    getAreaPrices: Function,
    isAreaPriceLoading: boolean,
    areaPriceData: I_AreaPrice[]
}

export interface I_MasterListSettingsProps {
    getBarcodeMiddleText: Function,
    isBarcodeMiddleTextLoading: boolean,
    barcodeMiddleTextData: I_BarcodeMiddleText[],
    triggerModalTopAlert: Function
}

export interface I_BarcodeMiddleText {
    _id: string,
    code: string
}

export interface I_AreaPrice {
    _id: string,
    name: string,
    price: number,
}

export interface I_TopAlertProps {
    showAlert: boolean,
    message: string,
    type: string,
    triggerTopAlert: Function
}

export interface I_ModalTopAlertProps {
    showAlert: boolean,
    message: string,
    type: string,
    triggerModalTopAlert: Function
}

export interface I_NavbarTopProps {
    gCurrentPage: string,
    gSetCurrentPage: Function,
    gAuthIsLoading: boolean,
    gAuthData: any,
    triggerTopAlert: Function,
    isTopAlertVisible: boolean
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
    getEncodeList: Function,
    getRecord: Function,
    getDispatchControlMessengers: Function,
    gAuthData: any,
    dispatchControlMessengerData: I_DispatchControlMessenger[],
    encodeListData: I_EncodeList[],
    recordData: I_Record[]
}

export interface I_UpdateLocationPriceModal {
    areaPriceId: string,
    areaPriceName: string,
    areaPricePrice: number,
    updateAreaPrice: Function,
    triggerModalTopAlert: Function,
    isUpdateLocationPriceModalOpen: boolean,
    setIsUpdateLocationPriceModalOpen: Function,
    isAreaPriceUpdateLoading: boolean
}

export interface I_AddBarcodeMiddleTextModal {
    addBarcodeMiddleText: Function,
    triggerModalTopAlert: Function,
    isAddBarcodeMiddleTextModalOpen: boolean,
    setIsAddBarcodeMiddleTextModalOpen: Function,
    isBarcodeMiddleTextAddLoading: boolean,
    barcodeMiddleTextData: I_BarcodeMiddleText[]
}

export interface I_UpdateBarcodeMiddleTextModal {
    barcodeMiddleTextId: string,
    barcodeMiddleTextCode: string,
    updateBarcodeMiddleText: Function,
    triggerModalTopAlert: Function,
    isUpdateBarcodeMiddleTextModalOpen: boolean,
    setIsUpdateBarcodeMiddleTextModalOpen: Function,
    isBarcodeMiddleTextUpdateLoading: boolean
}

export interface I_DeleteBarcodeMiddleTextModal {
    barcodeMiddleTextId: string,
    barcodeMiddleTextCode: string,
    deleteBarcodeMiddleText: Function,
    triggerModalTopAlert: Function,
    isDeleteBarcodeMiddleTextModalOpen: boolean,
    setIsDeleteBarcodeMiddleTextModalOpen: Function,
    isBarcodeMiddleTextDeleteLoading: boolean,
    barcodeMiddleTextData: I_BarcodeMiddleText[]
}

export interface I_ImportProps {
    uploadExcelFile: Function,
    getBarcodeMiddleText: Function,
    isRecordAddLoading: boolean,
    recordData: I_Record[],
    useBy: string,
    barcodeMiddleTextData: I_BarcodeMiddleText[]
}

