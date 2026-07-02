import { validate } from "class-validator";
import { LoginUserDto } from "./login-user.dto";

describe("LoginUserDto", () => {
    it("should have correct value in login-user", async () => {

    const dto = new LoginUserDto();
    dto.email = "rodrigo@gmail.com";
    dto.password = "dasnjASDSAHGD1123sa";

    const errors = await validate(dto);

    expect(dto).toEqual({
        "email": "rodrigo@gmail.com",
        "password": "dasnjASDSAHGD1123sa"
    });

    expect(errors.length).toBe(0);
    });
})


describe("LoginUserDto", () => {
    it("should have ERROR value in login-user", async () => {

    const dto = new LoginUserDto();
    dto.email = "rodrigo@gmail.com";
    dto.password = "";

    const errors = await validate(dto);

    expect(errors.length).toBe(1);
    });
})
