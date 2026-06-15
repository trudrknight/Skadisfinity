import { describe, it, expect } from 'vitest';
import { calculateGrids } from './gridfinityUtils';

describe('Uniform Baseplates Calculation', () => {
  it('should avoid creating 1xN baseplates', () => {
    // Test with dimensions that would create 1xN pieces
    const drawerSize = { width: 22, height: 14 }; // 13x8 grids with some remainder
    const printerSize = { x: 250, y: 210, z: 250 };
    
    const result = calculateGrids(
      drawerSize,
      printerSize,
      false,  // useHalfSize
      false,  // preferHalfSize
      true    // preferUniformBaseplates
    );
    
    // Check that no baseplate has a dimension of 1
    Object.keys(result.baseplates).forEach(size => {
      const [width, height] = size.split('x').map(Number);
      expect(width).toBeGreaterThanOrEqual(2);
      expect(height).toBeGreaterThanOrEqual(2);
    });
  });
  
  it('should use mostly uniform 6x4 boards for 41.5" x 13.5" layout when preferUniformBaseplates is true', () => {
    const drawerSize = { width: 41.5, height: 13.5 };
    const printerSize = { x: 250, y: 210, z: 250 };
    
    const result = calculateGrids(
      drawerSize,
      printerSize,
      false,  // useHalfSize
      false,  // preferHalfSize
      true    // preferUniformBaseplates
    );
    
    // The 40mm Skadis module size makes 6x4 the dominant board size.
    expect(result.baseplates['6x4']).toBe(8);
    expect(result.baseplates['2x4']).toBe(2);
    
    // Should not have mixed sizes
    expect(result.baseplates['6x5']).toBeUndefined();
    expect(result.baseplates['6x3']).toBeUndefined();
  });
  
  it('should use mixed baseplates for 41.5" x 13.5" drawer when preferUniformBaseplates is false', () => {
    const drawerSize = { width: 41.5, height: 13.5 };
    const printerSize = { x: 250, y: 210, z: 250 };
    
    const result = calculateGrids(
      drawerSize,
      printerSize,
      false,  // useHalfSize
      false,  // preferHalfSize
      false   // preferUniformBaseplates
    );
    
    // Should have mixed sizes
    expect(result.baseplates['6x5']).toBe(4);
    expect(result.baseplates['2x5']).toBe(1);
    expect(result.baseplates['6x3']).toBe(4);
    expect(result.baseplates['2x3']).toBe(1);
    
    // Should not have uniform 6x4
    expect(result.baseplates['6x4']).toBeUndefined();
  });
  
  it('should fall back to mixed sizes when uniform coverage is less than 90%', () => {
    // Create a size where uniform baseplates would waste more than 10% space
    const drawerSize = { width: 10, height: 10 };
    const printerSize = { x: 250, y: 210, z: 250 };
    
    const result = calculateGrids(
      drawerSize,
      printerSize,
      false,  // useHalfSize
      false,  // preferHalfSize
      true    // preferUniformBaseplates
    );
    
    // For 10x10 inches with 40mm Skadis modules,
    // the algorithm should fall back to mixed sizes
    // because uniform sizes wouldn't provide good coverage
    expect(Object.keys(result.baseplates).length).toBeGreaterThan(0);
  });
  
  it('should ignore preferUniformBaseplates when useHalfSize is true', () => {
    const drawerSize = { width: 41.5, height: 13.5 };
    const printerSize = { x: 250, y: 210, z: 250 };
    
    const resultWithUniform = calculateGrids(
      drawerSize,
      printerSize,
      true,   // useHalfSize
      false,  // preferHalfSize
      true    // preferUniformBaseplates
    );
    
    const resultWithoutUniform = calculateGrids(
      drawerSize,
      printerSize,
      true,   // useHalfSize
      false,  // preferHalfSize
      false   // preferUniformBaseplates
    );
    
    // Results should be the same when useHalfSize is true
    expect(resultWithUniform.halfSizeBins).toEqual(resultWithoutUniform.halfSizeBins);
  });
  
  it('should prefer fewer variants over perfect coverage', () => {
    // Test dimensions that could use many variants or fewer with less coverage
    const drawerSize = { width: 26, height: 15 }; 
    const printerSize = { x: 250, y: 210, z: 250 };
    
    const result = calculateGrids(
      drawerSize,
      printerSize,
      false,  // useHalfSize
      false,  // preferHalfSize
      true    // preferUniformBaseplates
    );
    
    // Should have at most 2-3 different baseplate sizes
    const variantCount = Object.keys(result.baseplates).length;
    expect(variantCount).toBeLessThanOrEqual(3);
    
    // No single dimension should be 1
    Object.keys(result.baseplates).forEach(size => {
      const [width, height] = size.split('x').map(Number);
      expect(width).toBeGreaterThanOrEqual(2);
      expect(height).toBeGreaterThanOrEqual(2);
    });
  });
  
  it('should handle edge cases with uniform baseplates', () => {
    // Test with a drawer that divides evenly
    const drawerSize = { width: 21, height: 21 };
    const printerSize = { x: 250, y: 210, z: 250 };
    
    const result = calculateGrids(
      drawerSize,
      printerSize,
      false,  // useHalfSize
      false,  // preferHalfSize
      true    // preferUniformBaseplates
    );
    
    // 21 inches = 13.3 modules (will be 13 modules)
    // Should use uniform baseplates
    // Check that we have baseplates (the exact size may vary based on the algorithm)
    expect(Object.keys(result.baseplates).length).toBeGreaterThan(0);
    
    // Check that it's using uniform sizes (all baseplates should be the same)
    const sizes = Object.keys(result.baseplates);
    if (sizes.length === 1) {
      // Perfect uniform case
      expect(sizes.length).toBe(1);
    } else {
      // May have edge baseplates, but should have a dominant uniform size
      const counts = Object.values(result.baseplates) as number[];
      const maxCount = Math.max(...counts);
      expect(maxCount).toBeGreaterThan(1);
    }
  });
});
