import cheerio from "cheerio";

export class Describer {
    public $: cheerio.Root;

    public constructor(public filename: string, $?: cheerio.Root) {
        this.$ = $ || cheerio.load("", {}, true);
        this.$("html").attr("lang", "en");
        this.$("head").append(`<meta charset="UTF-8" />`);
        this.$("head").append(`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`);
        this.$("head").append(`<title>${filename}</title>`);
    }

    public append(domString: string) {
        this.$("body").append(domString);
    }

    public toString() {
        return this.$.html().replace(/ {2,}/g, "");
    }
}
