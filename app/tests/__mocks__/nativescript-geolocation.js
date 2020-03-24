module.exports = {
    all: () => [],
    getCurrentLocation: jest.fn(() => Promise.resolve({
        latitude: 0.0,
        longitude: 0.0
    })),
    enableLocationRequest: jest.fn(() => Promise.resolve({ data: {} }))
};
