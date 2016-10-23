// import 'material-design-lite/material.js';

class Foo {
  private text: string = 'test';

  constructor(private name: string = 'dummy') { }

  public alert(): void {
    alert(this.text);
  }

  public console(): void {
    console.log(this.name);
  }
}

let foo = new Foo('sample');
foo.alert();
foo.console();
