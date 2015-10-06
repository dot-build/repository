var MockResponse = {};

var MockAdapter = {
	save: jasmine.createSpy('save').and.returnValue(MockResponse),
	saveAll: jasmine.createSpy('saveAll').and.returnValue(MockResponse),
	remove: jasmine.createSpy('remove').and.returnValue(MockResponse),
	removeAll: jasmine.createSpy('removeAll').and.returnValue(MockResponse),
	find: jasmine.createSpy('find').and.returnValue(MockResponse),
	findAll: jasmine.createSpy('findAll').and.returnValue(MockResponse)
};