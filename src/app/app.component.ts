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
  doSomething(e) {
    this.data = e;
  }
  generateHtml() {
    console.log({ ip: this.data, n: this.data.split("\n") });
    let ip = this.data.split("\n");
    console.log({ ip });
    this.dd.push(`<div class='container' style="${this.container_style}">`);
    this.dd.push("</div>");
    let rows = 0;
    let cols = 0;
    let _rows = {};
    let _cols = [];
    ip.forEach(row => {
      rows++;
      let columns = row.split(" ");
      cols = columns.length;
      for (let c = 0; c < cols; c++) {
        if (!_cols.includes(columns[c])) {
          _cols.push(columns[c]);
        }
      }
    });

    console.log("->", this.dd.join(""));
    this.rawhtml = this.dd.join("");
    this.content = this.sanitizer.bypassSecurityTrustHtml(this.rawhtml);
  }
}
