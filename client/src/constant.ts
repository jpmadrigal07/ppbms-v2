export const pageTitle = "PPBMS";
export const navBarLinks = [
  { linkTitle: "Dashboard", linkName: "dashboard", isVisible: true },
  { linkTitle: "Master Lists", linkName: "masterlists", isVisible: true },
  { linkTitle: "Dispatch Control", linkName: "dispatchcontrol", isVisible: true },
  { linkTitle: "Encode Master List", linkName: "encodemasterlist", isVisible: true },
  { linkTitle: "Report", linkName: "report", isVisible: true },
  { linkTitle: "Settings", linkName: "settings", isVisible: true },
  { linkTitle: "Receipt", linkName: "receipt", isVisible: false },
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
export const encodeListPaginationDataCount = 5;
export const recordPaginationDataCount = 5;
