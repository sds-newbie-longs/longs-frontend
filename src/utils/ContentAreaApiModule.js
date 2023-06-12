function ContentAreaApiModule() {
  this.mockGetAllContentsWithGroup = async group => {
    const content = {};
    content.picture_url =
      'https://i.namu.wiki/i/BQ-BNOkKyAyDPfGEj5fBDSp11JS2rYioh0qKzl1A9UXmmWz5YKoR-1AwOQyUMb0FdvnpOFNnZ0_S6rj-GEDOuE-mmVCUozWDphHPN_thbViZynmST_2dRLdFXkcphNiQ7YC4CeuteLx_uSxGSBluKA.webp';
    content.owner = 'din';
    content.title = 'Want to Go Home';
    const mockContentsList = [];
    for (let i = 0; i < 10; i++) {
      // eslint-disable-next-line no-unused-expressions
      ('https://namu.wiki/jump/Gc3gjN02gz6766%2FcLetBPH4OVqHRE1oOsI28oM2vjkwbG5IN1xaAJvsjlSzj15ik');
      content.owner = 'din';
      content.title = 'Want to Go Home';
      const mockContentsList = [];
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
    // eslint-disable-next-line no-unreachable-loop
    for (let i = 0; i < 10; i++) {
      // eslint-disable-next-line no-unused-expressions
      ('https://namu.wiki/jump/Gc3gjN02gz6766%2FcLetBPH4OVqHRE1oOsI28oM2vjkwbG5IN1xaAJvsjlSzj15ik');
      content.owner = 'soy';
      content.title = 'Want to Go Home';
      const mockContentsList = [];
      for (let i = 0; i < 0; i++) {
        mockContentsList.push(Object.assign({}, content));
      }
      return mockContentsList;
    }
    return mockContentsList;
  };
}

export default ContentAreaApiModule;
