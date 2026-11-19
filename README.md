# Luvrena Ring Size Converter

A small, free ring size converter and size chart from [Luvrena](https://luvrena.com), an online store selling women's fashion jewelry.

Give it one number you know (inside diameter, inside circumference, a US size or an EU size) and it returns the same ring size in the US, UK, EU and Japanese systems.

**Live version:** https://luvrena.com/pages/ring-size-chart

## Why we made it

When we rebuilt the size chart on our own store, we found that the EU column had been filled in with Japanese sizes: a US 7 was listed as EU 14. The European ring size is the inside circumference in millimetres, so a US 7 (54.4 mm around) is EU 54. Charts get copied from site to site, and so do their mistakes. This repo has the corrected data, a converter, and a one-line check you can run on any chart.

## Use it

In a web page: open `index.html`, or copy it into your own site. It has no dependencies.

In Node.js:

```js
const { convert, checkEu } = require('./ring-size');

convert(17.3, 'diameter');      // { us: 7, uk: 'O', eu: 54, jp: 14, diameter_mm: 17.3, circumference_mm: 54.4 }
convert(57, 'eu').us;           // 8
convert(300, 'circumference');  // null (outside US 4 to 12)

checkEu(17.3, 54);  // true
checkEu(17.3, 14);  // false: this is the error we found in our own chart
```

As data: `ring-sizes.json` has 17 rows, US 4 to 12 in half sizes.

## How the numbers are defined

| System | What the number means |
|---|---|
| US / Canada | Numbered scale in half steps. US 7 is about 17.3 mm across the inside. |
| UK / Australia | Letters, with half sizes. |
| EU | Inside circumference in millimetres, rounded to a whole number. |
| Japan | Its own numbered scale. US 7 is about Japan 14. |

UK and Japanese values follow the commonly published conversion tables, which can differ by half a size between sources. The EU column is calculated.

## Check any ring size chart

Take one row. Multiply the inside diameter by 3.14. The result should match the EU size to within 1.

## How to measure at home

1. With a ring that fits: measure straight across the inside edge in millimetres (inside diameter).
2. With paper or string: wrap it around the base of the finger, mark where it meets, and measure the length in millimetres (inside circumference).
3. Between two sizes: choose the larger one.

## Licence

MIT. Use it, copy it, change it. A link back to [luvrena.com](https://luvrena.com) is appreciated but not required.

## About Luvrena

Luvrena sells earrings, necklaces, rings and bracelets online. Most rings are adjustable; fixed-size rings come in US 5 to 9. Website: https://luvrena.com
