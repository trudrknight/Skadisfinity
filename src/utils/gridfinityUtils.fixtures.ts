/**
 * Test fixtures with pre-computed expected outputs for various drawer configurations
 * These are known-good solutions that should not change unless the algorithm is intentionally modified
 */

import type { DrawerSize, PrinterSize } from '@/types/gridfinity';

interface TestInput {
  drawerSize: DrawerSize;
  printerSize: PrinterSize;
  useHalfSize: boolean;
  preferHalfSize: boolean;
}

interface TestExpected {
  baseplates: Record<string, number>;
  spacers: Record<string, number>;
  layoutCount: number;
  totalCoverage?: {
    width: number;
    height: number;
  };
  halfSizeBins?: Record<string, number>;
  hasHalfSizeBins?: boolean;
}

interface TestFixture {
  input: TestInput;
  expected: TestExpected;
}

export const testFixtures: Record<string, TestFixture> = {
  // Standard US drawer - 22.5" x 16.5" with Bambu Lab A1 (256x256x256mm)
  standardUSDrawer: {
    input: {
      drawerSize: { width: 22.5, height: 16.5 },
      printerSize: { x: 256, y: 256, z: 256 },
      useHalfSize: false,
      preferHalfSize: false,
    },
    expected: {
      baseplates: {
        '6x6': 2,
        '2x6': 1,
        '6x4': 2,
        '2x4': 1,
      },
      spacers: {
        '11.6mm x 240mm': 1,
        '11.6mm x 160mm': 1,
        '240mm x 19.2mm': 2,
        '80mm x 19.2mm': 1,
        '11.6mm x 19.2mm': 1,
      },
      layoutCount: 12,
      totalCoverage: {
        width: 571.5,  // mm
        height: 419.1, // mm
      },
    },
  },

  // Small drawer - 5" x 5" with Prusa Mini (180x180x180mm)
  smallDrawer: {
    input: {
      drawerSize: { width: 5, height: 5 },
      printerSize: { x: 180, y: 180, z: 180 },
      useHalfSize: false,
      preferHalfSize: false,
    },
    expected: {
      baseplates: {
        '3x3': 1,
      },
      spacers: {
        '7.2mm x 120mm': 1,
        '120mm x 7.2mm': 1,
        '7.2mm x 7.2mm': 1,
      },
      layoutCount: 4,
      totalCoverage: {
        width: 127,
        height: 127,
      },
    },
  },

  // Metric drawer - 400mm x 300mm with Ender 3 (220x220x250mm)
  metricDrawer: {
    input: {
      drawerSize: { width: 400 / 25.4, height: 300 / 25.4 }, // Convert to inches
      printerSize: { x: 220, y: 220, z: 250 },
      useHalfSize: false,
      preferHalfSize: false,
    },
    expected: {
      baseplates: {
        '5x5': 2,
        '5x2': 2,
      },
      spacers: {
        '200mm x 20mm': 2,
      },
      layoutCount: 6,
      totalCoverage: {
        width: 400,
        height: 300,
      },
    },
  },

  // Exact Skadis module multiple - 10 modules x 10 modules (400mm x 400mm)
  exactGridMultiple: {
    input: {
      drawerSize: { width: 400 / 25.4, height: 400 / 25.4 },
      printerSize: { x: 256, y: 256, z: 256 },
      useHalfSize: false,
      preferHalfSize: false,
    },
    expected: {
      baseplates: {
        '6x6': 1,
        '4x6': 1,
        '6x4': 1,
        '4x4': 1,
      },
      spacers: {}, // No spacers for exact multiples
      layoutCount: 4,
      totalCoverage: {
        width: 400,
        height: 400,
      },
    },
  },

  // Large drawer requiring split - 15" x 15" with small printer (150x150x150mm)
  largeSplitRequired: {
    input: {
      drawerSize: { width: 15, height: 15 },
      printerSize: { x: 150, y: 150, z: 150 },
      useHalfSize: false,
      preferHalfSize: false,
    },
    expected: {
      baseplates: {
        '3x3': 9, // Maximum that fits in 150x150mm printer
      },
      spacers: {
        '21.2mm x 120mm': 3,
        '120mm x 21.2mm': 3,
        '21.2mm x 21.2mm': 1,
      },
      layoutCount: 16,
      totalCoverage: {
        width: 381,
        height: 381,
      },
    },
  },

  // Half-size bins enabled - 6" x 4" 
  withHalfSizeBins: {
    input: {
      drawerSize: { width: 6, height: 4 },
      printerSize: { x: 200, y: 200, z: 200 },
      useHalfSize: true,
      preferHalfSize: false,
    },
    expected: {
      baseplates: {}, // No full-size baseplates when using only half-size
      spacers: {
        // 6" = 152.4mm, 152.4mm / 20mm = 7.62... -> 7 pieces + remainder
        // 4" = 101.6mm, 101.6mm / 20mm = 5.08... -> 5 pieces + remainder
        '6.2mm x 50mm': 1,
        '70mm x 0.8mm': 1,
        '6.2mm x 0.8mm': 1,
      },
      halfSizeBins: {
        '7x5': 1,
      },
      layoutCount: 4, // 1 half-size bin + 3 spacers
      hasHalfSizeBins: true,
    },
  },

  // Prefer half-size for spacers - 5" x 5"
  preferHalfSize: {
    input: {
      drawerSize: { width: 5, height: 5 },
      printerSize: { x: 200, y: 200, z: 200 },
      useHalfSize: false,
      preferHalfSize: true,
    },
    expected: {
      baseplates: {
        '3x3': 1,
      },
      spacers: {
        '7.2mm x 120mm': 1,
        '120mm x 7.2mm': 1,
        '7.2mm x 7.2mm': 1,
        '0mm x 7.2mm': 1,
      },
      halfSizeBins: {
        // No half-size bins in this case
      },
      hasHalfSizeBins: false,
      layoutCount: 5,
    },
  },

  // Tiny drawer - smaller than one grid (30mm x 30mm)
  tinyDrawer: {
    input: {
      drawerSize: { width: 30 / 25.4, height: 30 / 25.4 },
      printerSize: { x: 200, y: 200, z: 200 },
      useHalfSize: false,
      preferHalfSize: false,
    },
    expected: {
      baseplates: {}, // Too small for any baseplates
      spacers: {
        '30mm x 30mm': 1, // Single spacer covering entire area
      },
      layoutCount: 1,
      totalCoverage: {
        width: 30,
        height: 30,
      },
    },
  },

  // Edge case - drawer exactly printer size
  exactPrinterSize: {
    input: {
      drawerSize: { width: 256 / 25.4, height: 256 / 25.4 },
      printerSize: { x: 256, y: 256, z: 256 },
      useHalfSize: false,
      preferHalfSize: false,
    },
    expected: {
      baseplates: {
        '6x6': 1,
      },
      spacers: {
        '16mm x 240mm': 1,
        '240mm x 16mm': 1,
        '16mm x 16mm': 1,
      },
      layoutCount: 4,
      totalCoverage: {
        width: 256,
        height: 256,
      },
    },
  },

  // Common IKEA drawer size - 500mm x 370mm
  ikeaDrawer: {
    input: {
      drawerSize: { width: 500 / 25.4, height: 370 / 25.4 },
      printerSize: { x: 256, y: 256, z: 256 },
      useHalfSize: false,
      preferHalfSize: false,
    },
    expected: {
      baseplates: {
        '6x6': 2,
        '6x3': 2,
      },
      spacers: {
        '20mm x 240mm': 1,
        '20mm x 120mm': 1,
        '240mm x 10mm': 2,
        '20mm x 10mm': 1,
      },
      layoutCount: 9,
      totalCoverage: {
        width: 500,
        height: 370,
      },
    },
  },
};
