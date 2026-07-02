import { JwtPayload } from "./jwt-payload.interface"

describe("JWTPayload interface", () => {
    it("should return true for a valid payload", () => {
        const validPayload: JwtPayload = { id: 'ABC123'};

        expect(validPayload.id).toBe('ABC123');
    })
})