function ContentAreaApiModule() {
  this.mockGetAllContentsWithGroup = async group => {
    const content = {};
    content.picture_url =
      'https://namu.wiki/jump/Gc3gjN02gz6766%2FcLetBPH4OVqHRE1oOsI28oM2vjkwbG5IN1xaAJvsjlSzj15ik';
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
      'https://namu.wiki/jump/Gc3gjN02gz6766%2FcLetBPH4OVqHRE1oOsI28oM2vjkwbG5IN1xaAJvsjlSzj15ik';
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
