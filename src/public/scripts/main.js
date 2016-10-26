var Foo = (function () {
    function Foo(name) {
        if (name === void 0) { name = 'dummy'; }
        this.name = name;
        this.text = 'test';
    }
    Foo.prototype.alert = function () {
        alert(this.text);
    };
    Foo.prototype.console = function () {
        console.log(this.name);
    };
    return Foo;
}());
var foo = new Foo('sample');
foo.alert();
foo.console();
