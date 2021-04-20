# rollup-plugin-probe

📌 Probes for monitoring rollup hooks information.

## Installation

```shell
npm install -D rollup-plugin-probe
```

## Usage

Specify which hooks you will record and report by setting options for probe. Rollup hooks which are not set in options will be ignored and not be recorded.

```javascript
// rollup.config.js

import probe from "rollup-plugin-probe";

export default {
    input: path.resolve(__dirname, "src/main.js"),
    plugins: [
        probe({
            options: {},        // probe record information in options hook
            transform: {},      // probe record information in transform hook
            outputOption: {},   // probe record information in outputOption hook
            generateBundle: {}, // probe record information in generateBundle hook
            ...
        })
    ],
}
```
