# Skadisfinity Layout Print Profiles

Skadisfinity supports print profiles so the same layout calculator can display board results in different sizing conventions.

## Default

The Default profile keeps the standard Skadisfinity board-size display. Results show board quantities and physical dimensions in millimeters, such as:

```text
3 Skadis board(s) (240mm x 240mm)
```

The visual preview also labels boards by millimeter size.

## AU3D

The AU3D profile uses the AU3D size overview convention for sizing and labeling. It can use 20mm board increments to fill more of the requested layout with printable board pieces before falling back to trim.

In AU3D:

```text
240mm x 240mm = 11 x 11
100mm x 240mm = 4 x 11
80mm x 240mm = 3 x 11
240mm x 160mm = 11 x 7
```

This means AU3D can choose a result like:

```text
3 11 x 11 Skadis board(s) (240mm x 240mm)
1 4 x 11 Skadis board(s) (100mm x 240mm)
```

The visual preview labels matching AU3D board pieces as `11 x 11`, `4 x 11`, `3 x 11`, and similar chart-style sizes.

## Why Profiles Matter

Skadis builders often share files, print settings, and board dimensions using different naming conventions. Print profiles let Skadisfinity calculate and label boards in the sizing system that best matches the builder's preferred files.
