import { ValidRoles } from "./valid-roles";

describe("Valid Roles enum", () => {
    it("should have correct value", () => {

    expect(ValidRoles.admin).toBe('admin');
    expect(ValidRoles.superUser).toBe('super-user');
    expect(ValidRoles.user).toBe('user');
    })

    it('should contain all expected keys', () => {
        const keyToHave = ["admin", "super-user", "user"];

        expect(Object.values(ValidRoles)).toEqual(
            expect.arrayContaining(keyToHave),
        )
    })
})