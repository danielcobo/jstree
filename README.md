# jstree

HTML tree for JavaScript values and objects. Useful to emulate dev console, etc.

## ๐งญ Table of contents

- [โจ Benefits](#-benefits)
- [๐ Requierments](#-requierments)
- [๐ Quickstart](#-quickstart)
- [๐ Documentation](#-documentation)
- [๐ Troubleshooting](#-troubleshooting)
- [๐ค Contributing](#-contributing)
- [๐งช Testing](#-testing)
- [โ๏ธ License](#๏ธ-license)

## โจ Benefits

- [x] Lightweight, no framework needed
- [x] Customisible and configurable
- [x] Can handle deep nested objects and arrays

## ๐ Requierments

No requierments.

## ๐ Quickstart

### Install

#### NodeJS

Install using the terminal:

```cli
npm install @danielcobo/jstree
```

Require the module:

```js
const jstree = require('@danielcobo/jstree');
```

<sub>**Note:** In case you're wondering, **@danielcobo/** is just a [namespace scope](https://docs.npmjs.com/about-scopes/) - an NPM feature. Scopes make it easier to name modules and improve [security](https://github.blog/2021-02-12-avoiding-npm-substitution-attacks/).</sub>

#### Browser

Declare it as a global variable named jstree by including this script before any script you want to use it in:

```html
<script src="https://cdn.jsdelivr.net/npm/@danielcobo/jstree@1/dist/iife/jstree.min.js"></script>
```

Or import it as an [ECMAScript module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import):

```js
import * as jstree from 'https://cdn.jsdelivr.net/npm/@danielcobo/jstree@1/dist/esm/jstree.min.js';
```

Also, feel free to download the file if you prefer not to use [jsdelivr](https://www.jsdelivr.com). In that case just replace the url with the relative file path.

### Example use

```js
const html = jsTree([
  { type: 'icecream', weight: 250, flavor: 'vanilla' },
  { type: 'cake', weight: 1000, flavor: 'chocolate' },
]);

document.body.innerHTML = html;
```

For details see documentation below.

## ๐ Documentation
### jstree()
Generate a HTML presentation of any value

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| val | `*` |  | Value to present |

#### Returns
| Type | Description |
| ---- | ----------- |
| `string` | HTML presentation of value |

<sub>**Source:** [src/index.js:5](https://github.com/danielcobo/jstree/blob/master/src/index.js?plain=1#L5)</sub>

## ๐ Troubleshooting

If you run into trouble or have questions just [submit an issue](https://github.com/danielcobo/jstree/issues).

## ๐ค Contributing

### Anyone can contribute

Contributions come in many shapes and sizes. All are welcome.
You can contribute by:

- asking questions
- suggesting features
- sharing this repo with friends
- improving documentation (even fixing typos counts ๐)
- providing tutorials (if you do, please [let me know](https://twitter.com/danielcobocom), I would love to read them)
- improving tests
- contributing code (new features, performance boosts, code readability improvements..)

### Rules for contributions

**General guidelines:**

- there are no dumb questions
- be polite and respectful to others
- do good

**When coding remember:**

- working > maintainability > performance
- best code is no code
- be descriptive when naming
- keep it [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
- do test

**Contribution licence:**
All contributions are considered to be under same [license](#๏ธ-license) as this repository.

## ๐งช Testing

**Testing suite:** [๐ Jest](https://jestjs.io) | **Test command:** `npm test`

**Mutation testing suite:** [๐ฝ Stryker Mutator](https://stryker-mutator.io) | **Mutation test command:** `npm run mutation`

If you intend to develop further or contribute code, then please ensure to write and use testing. Strive for 100% code coverage and high mutation scores. Mutation score 100 is great, but it's not always neccessary (if there are valid reasons).

## โ๏ธ License

[MIT License](https://github.com/danielcobo/jstree/blob/master/LICENSE.md)