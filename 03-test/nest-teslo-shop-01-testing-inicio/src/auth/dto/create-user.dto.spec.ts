import { validate } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

describe("CreateUserDto", () => {
    it("should have correct value in DTO USER", async () => {

    const dto = new CreateUserDto();
    dto.email = "rodrigo@gmail.com";
    dto.password = "dasnjASDSAHGD1123sa";
    dto.fullName = "rodrigo";

    const errors = await validate(dto);

    expect(dto).toEqual({
        "email": "rodrigo@gmail.com",
        "password": "dasnjASDSAHGD1123sa",
        "fullName": "rodrigo"
    });

    expect(errors.length).toBe(0);
    });
})


describe("CreateUserDto", () => {
    it("should have ERROR value in DTO USER", async () => {

    const dto = new CreateUserDto();
    dto.email = "rodrigo@gmail.com";
    dto.password = "";
    dto.fullName = "rodrigo";

    const errors = await validate(dto);

    expect(errors.length).toBe(1);
    });
})
