describe('Testing the functionality of challenge one', () => {

    // Test case 1 - [-8, -66, -60] --> -68
    it('test case 1', () => {
        var arr = [-8, -66, -60];
        expect(sumOfPairClosestToZero(arr)).toBe(-68);
    });

    // Test case 2 - [-21, -67, -37, -18, 4, -65] --> -14
    it('test case 2', () => {
        var arr = [-21, -67, -37, -18, 4, -65];
        expect(sumOfPairClosestToZero(arr)).toBe(-14);
    });

    // Test case 3 - [10, 4, -7, 12, -9, 1] --> 1
    it('test case 3', () => {
        var arr = [10, 4, -7, 12, -9, 1];
        expect(sumOfPairClosestToZero(arr)).toBe(1);
    });
})