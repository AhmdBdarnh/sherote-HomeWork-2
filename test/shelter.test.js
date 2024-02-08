const request = require('supertest');
const app = require('../app');
const userRepository = require('../repository/repos');
const {NotFoundError,BadRequsetError,ServerError} = require('../errors/errors');


jest.mock('../repository/repos');


//get all users
describe("GET /", () => {
    beforeEach(() => jest.clearAllMocks());

    //SUCCESS - 200
    it("should return all shelters", async () => {
        const mockShelter = [
            {name: "City Emergency Shelter",location: "123 Main St, City, State",capacity: 100},
            {name: "Community Center Shelter",location: "456 Elm St, City, State",capacity: 50}
        ];
        userRepository.getAllShelters.mockResolvedValue(mockShelter);

        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);    
        expect(res.body).toEqual(mockShelter);    
    });

    //FAILURE - 404
    it("should return 404 when no shelters are found", async () => {
        userRepository.getAllShelters.mockResolvedValue();
        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(404);    
    });

    //FAILURE - 500
    it("should return 500 when an error occurs", async () => {
        userRepository.getAllShelters.mockRejectedValue(new ServerError("internal server error"));
        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(500);    
    });

});

// getById
describe("GET /:id", () => {
    beforeEach(() => jest.clearAllMocks());

    // SUCCESS - 200
    it("should return a shelter by ID", async () => {
        const mockShelter = { id: "65c3a5d3c53c98b184293e3b", shelter: "emergency", location: "aco" };
        userRepository.getShelterById.mockResolvedValue(mockShelter);

        const res = await request(app).get(`/${mockShelter.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockShelter);
    });

    // FAILURE - 404
    it("should return 404 when shelter is not found", async () => {
        const IdNotExsisted = "IdNotExsisted";
        userRepository.getShelterById.mockResolvedValue([]);

        const res = await request(app).get(`/${IdNotExsisted}`);
        expect(res.statusCode).toEqual(404);
    });

    // FAILURE - 500
    it("should return 500 when an error occurs", async () => {
        const invalidId = "invalidid";
        userRepository.getShelterById.mockRejectedValue(new ServerError("internal server error"));

        const res = await request(app).get(`/${invalidId}`);
        expect(res.statusCode).toEqual(500);
    });
});


// deleteById
describe("DELETE /:id", () => {
    beforeEach(() => jest.clearAllMocks());

    // SUCCESS - 200
    it("should delete a shelter by Id", async () => {
        const mockId = "65c3a5d3c53c98b184293e3b";
        userRepository.deleteShelter.mockResolvedValue(true);
        const res = await request(app).delete(`/${mockId}`);
        expect(res.statusCode).toEqual(200);
    });

    // FAILURE - 400
    it("should return 400 when shelter didn't updated", async () => {
        const mockId = ":id";
        userRepository.updateShelter.mockResolvedValue(mockId);
        const res = await request(app).delete('/:id');
        expect(res.statusCode).toEqual(400);
    });


    // FAILURE - 404
    it("should return 404 when shelter to delete is not found", async () => {
        const nonExistentId = "nonexistentid";
        userRepository.deleteShelter.mockResolvedValue([]);

        const res = await request(app).delete(`/${nonExistentId}`);
        expect(res.statusCode).toEqual(404);
    });

    // FAILURE - 500
    it("should return 500 when an error occurs", async () => {
        const invalidId = "invalidid";
        userRepository.deleteShelter.mockRejectedValue(new ServerError("internal server error"));

        const res = await request(app).delete(`/${invalidId}`);
        expect(res.statusCode).toEqual(500);
    });
});

// add new shelter
describe("POST /", () => {
    beforeEach(() => jest.clearAllMocks());

    // SUCCESS - 200
    it("should add a shelter", async () => {
        const mockShelter ={shelter: "security",location: "der"}
        userRepository.addShelter.mockResolvedValue(mockShelter);
        const res = await request(app).post('/');
        expect(res.statusCode).toEqual(200);
    });

    // FAILURE - 400
    it("should return 400 when shelter didn't added", async () => {
        userRepository.addShelter.mockResolvedValue(false);
        const res = await request(app).post('/');
        expect(res.statusCode).toEqual(400);
    });

    // FAILURE - 500
    it("should return 500 when an error occurs", async () => {
        const invalidId = "invalidid";
        userRepository.addShelter.mockRejectedValue(new ServerError("internal server error"));
        const res = await request(app).post('/');
        expect(res.statusCode).toEqual(500);
    });

});

// update shelter
describe("PUT /", () => {
    beforeEach(() => jest.clearAllMocks());

    // SUCCESS - 200
    it("should return 200 if the shelter updated", async () => {
        const mockId = "65c3a5d3c53c98b184293e3b";
        const mockShelter = {shelter: "emergency", location: "aco" };
        userRepository.updateShelter.mockResolvedValue(mockShelter);
        const res = await request(app).put(`/${mockId}`);
        expect(res.statusCode).toEqual(200);
    });

    // FAILURE - 400
    it("should return 400 when shelter didn't updated", async () => {
        const mockShelter = {shelter: "emergency", location: "aco" };
        userRepository.updateShelter.mockResolvedValue(mockShelter);
        const res = await request(app).put('/:id');
        expect(res.statusCode).toEqual(400);
    });

    // FAILURE - 404
    it("should return 404 when shelter didn't updated", async () => {
        const mockId = "65c3a5d3c53c98b184293e3b";
        userRepository.updateShelter.mockResolvedValue([]);
        const res = await request(app).put(`/${mockId}`);
        expect(res.statusCode).toEqual(404);
    });

    // FAILURE - 500
    it("should return 500 when an error occurs", async () => {
        const invalidId = "invalidid";
        const mockId = "65c3a5d3c53c98b184293e3b";
        userRepository.updateShelter.mockRejectedValue(new ServerError("internal server error"));
        const res = await request(app).put(`/${mockId}`);
        expect(res.statusCode).toEqual(500);
    });

});







