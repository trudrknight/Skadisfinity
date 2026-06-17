import { describe, expect, it } from "vitest";
import { printerSizes } from "./utils";

describe("printerSizes", () => {
  it("includes Bambu Lab H-series printer build volumes", () => {
    expect(printerSizes["Bambu Lab H2C"]).toEqual({ x: 330, y: 320, z: 325 });
    expect(printerSizes["Bambu Lab H2D"]).toEqual({ x: 350, y: 320, z: 325 });
    expect(printerSizes["Bambu Lab H2D Pro"]).toEqual({ x: 350, y: 320, z: 325 });
    expect(printerSizes["Bambu Lab H2S"]).toEqual({ x: 340, y: 320, z: 340 });
  });
});
