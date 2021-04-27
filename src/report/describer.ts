import cheerio from "cheerio";

export class Describer {
    public $: cheerio.Root;

    public constructor(public filename: string, $?: cheerio.Root) {
        this.$ = $ || cheerio.load("");
    }

    public append(domString: string) {
        this.$("body").append(domString);
    }

    public toString() {
        return this.$.html().replace(/ {2,}/g, "");
    }
}
