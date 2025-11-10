import {expect, test} from 'bun:test';
import {calculateCustomRelativePosition} from '../src/calculatePosition.ts';


test('should correctly map the start meter to the relative start position', () => {
    const result = calculateCustomRelativePosition(100, 200, 0.2, 0.8, 100);
    expect(result).toBeCloseTo(0.2); // Bruk toBeCloseTo for flyttallpresisjon
});

test('should correctly map the end meter to the relative end position', () => {
    const result = calculateCustomRelativePosition(100, 200, 0.2, 0.8, 200);
    expect(result).toBeCloseTo(0.8);
});

test('should correctly map the midpoint to the midpoint of the relative range', () => {
    const result = calculateCustomRelativePosition(100, 300, 0.25, 0.75, 200);
    expect(result).toBeCloseTo(0.5); // Midtpunktet mellom 0.25 og 0.75
});

test('should handle standard 0 to 1 mapping correctly', () => {
    const result = calculateCustomRelativePosition(0, 100, 0, 1, 50);
    expect(result).toBeCloseTo(0.5);
});

test('should clamp values outside the meter range to the relative limits (above end)', () => {
    const result = calculateCustomRelativePosition(100, 200, 0.2, 0.8, 250);
    expect(result).toBeCloseTo(0.8); // Skal ikke gå over 0.8
});

test('should clamp values outside the meter range to the relative limits (below start)', () => {
    const result = calculateCustomRelativePosition(100, 200, 0.2, 0.8, 50);
    expect(result).toBeCloseTo(0.2); // Skal ikke gå under 0.2
});

test('should handle reversed meter ranges (start > end)', () => {
    // Selv om start > end, skal logikken fortsatt fungere pga. utregningen
    const result = calculateCustomRelativePosition(200, 100, 0, 1, 150);
    expect(result).toBeCloseTo(0.5);
});

test('should handle zero meter range (start === end)', () => {
    const result = calculateCustomRelativePosition(150, 150, 0.1, 0.9, 150);
    // I dette tilfellet returnerer mapRange outMin (0.1), som er fornuftig.
    expect(result).toBeCloseTo(0.1);
});
