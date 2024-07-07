import { formatPrice } from "./formatter";

describe("formatPrice", () => {
  it("should format price correctly for values less than 1", () => {
    expect(formatPrice("0.5")).toBe("0,5");
    expect(formatPrice("0.50")).toBe("0,5");
    expect(formatPrice("0.000")).toBe("0");
    expect(formatPrice("0.00010")).toBe("0,0001");
    expect(formatPrice("0.000003500")).toBe("0,0000035");
  });

  it("should format price correctly for values greater than or equal to 1", () => {
    expect(formatPrice("10")).toBe("10,00");
    expect(formatPrice("1000")).toBe("1.000,00");
    expect(formatPrice("1234.56")).toBe("1.234,56");
    expect(formatPrice("1234567.890")).toBe("1.234.567,89");
  });

  it("should handle edge cases like empty string", () => {
    expect(formatPrice("")).toBe("-");
  });

  it("should handle non-numeric input gracefully", () => {
    expect(formatPrice("abc")).toBe("NaN");
  });
});
