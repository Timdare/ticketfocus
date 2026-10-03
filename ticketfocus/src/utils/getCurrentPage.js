export const getCurrentPage = () => {
  const currentPage = location.pathname;
  if (currentPage === "/") {
    return "/";
  } else {
    const page = location.pathname.split("/")[1];
    return page;
  }
};
