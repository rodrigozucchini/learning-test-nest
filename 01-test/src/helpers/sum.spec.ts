import { sum } from "./sum.helper";

describe('sum.helper.ts', () => {
    it('should sum two number', () => {
        //Arrange
        const num1 = 20;
        const num2 = 10;
        
        //Act
        const result = sum(num1,num2);

        //Assert
        expect(result).toBe(num1 + num2);
    });
});
