import { oneDay } from "../src/client/js/day";

describe("Testing the date functionality", () => {
    test("Testing the oneDay() calculation", () => {
        expect(oneDay()).toBe(86400000);
    });
});