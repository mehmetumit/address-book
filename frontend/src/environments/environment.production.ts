export const environment = {
  production: true,
  api: {
    //Api is behind a reverse proxy
    url: `${document.location.origin}/api/v1`
  },
};
