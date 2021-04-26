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
    secondModalTopAlert: {
        showAlert: boolean,
        message: string,
        type: string
    },
    dispatchControlMessenger: {
        isLoading: boolean,
        isUpdateLoading: boolean,
        isAddLoading: boolean,
        isDeleteLoading: boolean,
        data: I_DispatchControlMessenger[],
        pageLoaded: number[]
    }
    encodeList: {
        isLoading: boolean,
        isUpdateLoading: boolean,
        isAddLoading: boolean,
        isDeleteLoading: boolean,
        data: I_EncodeList[],
        pageLoaded: number[]
    }
    encodeListCount: {
        isLoading: boolean,
        dataCount: number,
        pageCount: number
    }
    record: {
        isLoading: boolean,
        isUpdateLoading: boolean,
        isAddLoading: boolean,
        isDeleteLoading: boolean,
        data: I_Record[]
    }
    dashboardCount: {
        isImportedListLoading: boolean,
        isListDataLoading: boolean,
        isDispatchControlLoading: boolean,
        isListCompletedLoading: boolean,
        importedList: number,
        listData: number,
        dispatchControl: number,
        listCompleted: number
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
    deletedAt: string,
    [key: string]: any
}

export interface I_EncodeList {
    _id: string,
    fileName: string,
    recordCount: number,
    assignedRecordCount: number,
    unAssignedRecordCount: number,
    deletedAt: string,
    createdAt: sting
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
    seqNum: number,
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
    deletedAt: string,
    [key: string]: any
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

export interface I_SecondModalTopAlertProps {
    showAlert: boolean,
    message: string,
    type: string,
    triggerSecondModalTopAlert: Function
}

export interface I_NavbarTopProps {
    gCurrentPage: string,
    gSetCurrentPage: Function,
    gAuthIsLoading: boolean,
    gAuthData: any,
    triggerTopAlert: Function,
    isTopAlertVisible: boolean,
    gFetchUser: Function
}

export interface I_LoginProps {
    gSetCurrentPage: Function,
    gAuthData: any,
    loginUser: Function,
    gAuthIsLoading: boolean,
    gFetchUser: Function,
    triggerTopAlert: Function,
    isTopAlertVisible: boolean
}

export interface I_LoginCredentials {
    username: string,
    password: string
}

export interface I_DashboardProps {
    getDashboardCount: Function,
    getRecord: Function,
    getDispatchControlMessengers: Function,
    gAuthData: any,
    importedListCount: number,
    isImportedListLoading: boolean,
    listDataCount: number,
    isListDataLoading: boolean,
    dispatchControlCount: number,
    isDispatchControlLoading: boolean,
    listCompletedCount: number,
    isListCompletedLoading: boolean
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
    addEncodeList: Function,
    uploadExcelFile: Function,
    updateExcelFile: Function,
    getBarcodeMiddleText: Function,
    isRecordAddLoading: boolean,
    isRecordUpdateLoading: boolean,
    recordData: I_Record[],
    useBy: string,
    barcodeMiddleTextData: I_BarcodeMiddleText[],
    encodeListData: I_EncodeList[]
}

export interface I_MasterListViewProps {
    recordData: I_Record[],
    encodeListData: I_EncodeList[],
    isEncodeListLoading: boolean,
    bulkDeleteRecord: Function,
    isRecordLoading: boolean,
    triggerModalTopAlert: Function,
    importedListCount: number,
    getEncodeList: Function,
    currentPage: string,
    pageLoaded: number[],
    getDashboardCount: Function,
    gAuthData: any
}

export interface I_MessengerListViewProps {
    triggerModalTopAlert: Function,
    getDispatchControlMessengers: Function,
    currentPage: string,
    isDispatchControlMessengerLoading: boolean
    dispatchControlMessengerData: I_DispatchControlMessenger[],
    gAuthData: any,
    getDashboardCount: Function,
    dispatchControlCount: number,
    pageLoaded: number[]
}

export interface I_RecordModal {
    selectedEncodeListId: string,
    isRecordModalOpen: boolean,
    modalTitle: string,
    setIsRecordModalOpen: Function,
    isRecordDataLoading: boolean,
    recordData: I_Record[],
    listToShow: string,
    triggerModalTopAlert: Function,
    getRecord: Function
}

export interface I_DeleteEncodeListModal {
    selectedEncodeListFileName: string,
    selectedEncodeListId: string,
    isDeleteEncodeListModalOpen: boolean,
    setIsDeleteEncodeListModalOpen: Function,
    isEncodeListDeleteLoading: boolean,
    deleteEncodeList: Function,
    encodeListData: I_EncodeList[]
}

export interface I_DeleteMessengerModal {
    selectedMessengerName: string,
    selectedMessengerId: string,
    isDeleteMessengerModalOpen: boolean,
    setIsDeleteMessengerModalOpen: Function,
    isMessengerDeleteLoading: boolean,
    deleteDispatchControlMessenger: Function,
    messengerData: I_DispatchControlMessenger[],
    triggerSecondModalTopAlert: Function
}

export interface I_DeleteRecordModal {
    selectedRecordSubsName: string,
    selectedRecordId: string,
    isDeleteRecordModalOpen: boolean,
    setIsDeleteRecordModalOpen: Function,
    isRecordDeleteLoading: boolean,
    deleteRecord: Function,
    recordData: I_Record[],
    triggerSecondModalTopAlert: Function
}

export interface I_UpdateRecordModal {
    selectedRecordId: string,
    isUpdateRecordModalOpen: boolean,
    setIsUpdateRecordModalOpen: Function,
    recordData: I_Record[],
    triggerSecondModalTopAlert: Function,
    isRecordUpdateLoading: boolean,
    updateRecord: Function
}

export interface I_File {
    name: string,
    lastModified: number,
    lastModifiedDate: Date,
    size: number,
    type: string,
    webkitRelativePath: string
}

export interface I_ReceiptProps {
    recordData: I_Record[],
    getRecord: Function,
    gSetCurrentPage: Function,
    gAuthData: any
}


