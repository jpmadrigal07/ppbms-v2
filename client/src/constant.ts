export const pageTitle = "PPBMS";
export const navBarLinks = [
  { linkTitle: "Dashboard", linkName: "dashboard", isVisible: true },
  { linkTitle: "Master Lists", linkName: "masterlists", isVisible: true },
  { linkTitle: "Dispatch Control", linkName: "dispatchcontrol", isVisible: true },
  { linkTitle: "Encode Master List", linkName: "encodemasterlist", isVisible: true },
  { linkTitle: "Report", linkName: "report", isVisible: true },
  { linkTitle: "Settings", linkName: "settings", isVisible: true },
  { linkTitle: "Master Lists Receipt", linkName: "masterlistsreceipt", isVisible: false },
  { linkTitle: "Dispatch Control Proof", linkName: "dispatchcontrolproof", isVisible: false },
  { linkTitle: "Dispatch Control Receipt", linkName: "dispatchcontrolreceipt", isVisible: false },
];
export const recordFilterKeys = [
  "subsName",
  "barCode",
  "sender",
  "cycleCode",
  "delType",
];
export const defaultPageWhenLoggedIn = "Dashboard";
export const defaultPageWhenLoggedOut = "Login";
export const encodeListPaginationDataCount = 10;
export const dispatchControlMessengerPaginationDataCount = 10;
export const dispatchControlDataPaginationDataCount = 5;
export const recordPaginationDataCount = 5;
