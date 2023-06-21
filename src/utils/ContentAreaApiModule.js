function ContentAreaApiModule() {
  this.mockGetAllContentsWithGroup = async group => {
    const content = {};
    content.picture_url = 'https://placehold.co/300x187';
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
    content.picture_url = 'https://placehold.co/300x187';
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
