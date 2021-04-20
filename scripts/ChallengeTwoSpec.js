describe('Testing the functionality of challenge two', () => {

    // Test case 1 --> output: "30min - 2h"
    it('test case 1', () => {
        var currentTime = Date.parse('2021-01-10T01:30:00.000Z');
        var lowerBound = Date.parse('2021-01-10T02:02:23.000Z');
        var upperBound = Date.parse('2021-01-10T05:07:22.000Z');
        expect(calculateWaitEstimate(currentTime, lowerBound, upperBound)).toBe("30min - 2h");
    });

    // Test case 2 -> expected output: "30min"
    it('test case 2', () => {
        var currentTime = Date.parse('2021-01-10T01:30:00.000Z');
        var lowerBound = Date.parse('2021-01-10T02:01:11.000Z');
        var upperBound = Date.parse('2021-01-10T02:04:22.000Z');
        expect(calculateWaitEstimate(currentTime, lowerBound, upperBound)).toBe("30min");
    });

    // Test case 3 -> expected output: "35min"
    it('test case 3', () => {
        var currentTime = Date.parse('2021-01-10T01:30:00.000Z');
        var lowerBound = Date.parse('2021-01-10T00:02:23.000Z');
        var upperBound = Date.parse('2021-01-10T02:07:22.000Z');
        expect(calculateWaitEstimate(currentTime, lowerBound, upperBound)).toBe("35min");
    });

    // Test case 4 -> expected output: "as soon as possible"
    it('test case 4', () => {
        var currentTime = Date.parse('2021-01-10T01:30:00.000Z');
        var lowerBound = Date.parse('2021-01-10T00:02:23.000Z');
        var upperBound = Date.parse('2021-01-10T00:57:22.000Z');
        expect(calculateWaitEstimate(currentTime, lowerBound, upperBound)).toBe("as soon as possible");
    });

    // Test case 5 -> expected output: "30min"
    it('test case 5', () => {
        var currentTime = Date.parse('2021-01-10T01:30:00.000Z');
        var lowerBound = Date.parse('2021-01-10T02:01:11.000Z');
        var upperBound = Date.parse('2021-01-10T02:01:22.000Z');
        expect(calculateWaitEstimate(currentTime, lowerBound, upperBound)).toBe("30min");
    });

    // Test case 6 -> expected output: "2h"
    it('test case 6', () => {
        var currentTime = Date.parse('2021-01-10T01:30:00.000Z');
        var lowerBound = Date.parse('2021-01-10T04:00:00.000Z');
        var upperBound = Date.parse('2021-01-10T04:11:00.000Z');
        expect(calculateWaitEstimate(currentTime, lowerBound, upperBound)).toBe("2h");
    });

    // Test case 7 -> expected output: "as soon as possible"
    it('test case 7', () => {
        var currentTime = Date.parse('2021-01-10T01:30:00.000Z');
        var lowerBound = Date.parse('2021-01-10T01:30:01.000Z');
        var upperBound = Date.parse('2021-01-10T01:31:00.000Z');
        expect(calculateWaitEstimate(currentTime, lowerBound, upperBound)).toBe("as soon as possible");
    });

    // Test case 8 -> expected output: "5 - 10min"
    it('test case 8', () => {
        var currentTime = Date.parse('2021-01-10T01:30:00.000Z');
        var lowerBound = Date.parse('2021-01-10T01:35:01.000Z');
        var upperBound = Date.parse('2021-01-10T01:40:00.000Z');
        expect(calculateWaitEstimate(currentTime, lowerBound, upperBound)).toBe("5 - 10min");
    });

    // Test case 9 -> expected output: "5 - 10min"
    it('test case 9', () => {
        var currentTime = Date.parse('2021-01-10T01:30:00.000Z');
        var lowerBound = Date.parse('2021-01-10T01:35:01.000Z');
        var upperBound = Date.parse('2021-01-10T01:36:00.000Z');
        expect(calculateWaitEstimate(currentTime, lowerBound, upperBound)).toBe("5min");
    });
})