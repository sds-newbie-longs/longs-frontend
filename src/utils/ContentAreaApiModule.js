function ContentAreaApiModule() {
  this.mockGetAllContentsWithGroup = async group => {
    const content = {};
    content.picture_url =
      'https://i.namu.wiki/i/BQ-BNOkKyAyDPfGEj5fBDSp11JS2rYioh0qKzl1A9UXmmWz5YKoR-1AwOQyUMb0FdvnpOFNnZ0_S6rj-GEDOuE-mmVCUozWDphHPN_thbViZynmST_2dRLdFXkcphNiQ7YC4CeuteLx_uSxGSBluKA.webp';
    content.owner = 'din';
    content.title = 'Want to Go Home';
    const mockContentsList = [];
    for (let i = 0; i < 10; i++) {
      mockContentsList.push(Object.assign({}, content));
    }
    return mockContentsList;
  };
  this.mockGetAllContentsWithName = async (group, name) => {
    const content = {};
    content.picture_url =
      'https://i.namu.wiki/i/BQ-BNOkKyAyDPfGEj5fBDSp11JS2rYioh0qKzl1A9UXmmWz5YKoR-1AwOQyUMb0FdvnpOFNnZ0_S6rj-GEDOuE-mmVCUozWDphHPN_thbViZynmST_2dRLdFXkcphNiQ7YC4CeuteLx_uSxGSBluKA.webp';
    content.owner = 'soy';
    content.title = 'Want to Go Home';
    const mockContentsList = [];
    for (let i = 0; i < 10; i++) {
      mockContentsList.push(Object.assign({}, content));
    }
    return mockContentsList;
  };
}
export default ContentAreaApiModule;
