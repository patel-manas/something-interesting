import { Component } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CodeSandbox";
  data = ``;
  dd = [];
  rawhtml = "";
  content: SafeHtml = "";
  base_style = { color: "red" };
  container_style =
    "background-color: cyan; width: 600px; height: 400px;border: 4px solid red";
  border_style = "border: 2px solid yellow";
  constructor(private sanitizer: DomSanitizer) {}
  // doSomething(e) {
  //   this.data = e;
  // }
  generateHtml() {
    if (this.data === "") return;
    this.dd = [];
    this.content = "";
    console.log({ ip: this.data, n: this.data.split("\n") });
    let ip = this.data.split("\n");
    console.log({ ip });

    let rows = 0;
    let cols = 0;
    let _rows = {};
    let _cols = [];
    ip.forEach(row => {
      rows++;
      _cols[rows] = [];
      let columns = row.split(" ");
      cols = columns.length;
      for (let c = 0; c < cols; c++) {
        if (!_cols[rows].includes(columns[c])) {
          _cols[rows].push(columns[c]);
          let bstyle = `grid-area: ${columns[c]};${this.border_style}`;
          let cstart = `<div class="_${columns[c]}" style="${bstyle}">`;
          let cEnd = `</div>`;
          this.appendToDomTree(cstart, cEnd);
        }
      }
    });
    console.log("->", _cols, rows, cols);
    let template_rows = new Array(rows).fill("1fr").join(" ");
    let template_cols = new Array(cols).fill("1fr").join(" ");
    console.log({ template_cols, template_rows });
    let grid_styles = `display:grid;grid-template-rows:${template_rows};grid-template-columns:${template_cols};grid-template-areas:"${
      this.data
    }"`;

    this.dd.unshift(
      `<div class='container' style="${this.container_style};${grid_styles}">`
    );
    this.dd.push("</div>");
    this.rawhtml = this.dd.join("");
    this.content = this.sanitizer.bypassSecurityTrustHtml(this.rawhtml);
    // this.data = "";
  }
  appendToDomTree(s, e) {
    this.dd.push(s);
    this.dd.push(e);
  }
}
