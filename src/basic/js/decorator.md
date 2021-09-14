# Decorator 装饰器

## 类的修饰

类修饰器一般用来修改、增加类的静态属性，方法,或者添加实例方法,装饰器的参数是这个类构造器

```js
function myTestable(target) {
    target.isTestable = true
}

@myTestable
class MyTestableClass {
    // ...
}

console.log(MyTestableClass.isTestable) // true
```

上面代码中，装饰器 `myTestable` 可以接受参数，这就等于可以修改装饰器的行为。

```js
function myTestable(bool) {
    return function (target) {
        target.isTestable = true
    }
}

@myTestable(false)
class MyTestableClass {
    // ...
}

console.log(MyTestableClass.isTestable) // false
```

> 装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。
>
> 这意味着，装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。

## 装饰 class 的方法

```js
function readonly(target, name, descriptor) {
    // descriptor对象原来的值如下
    // {
    //   value: specifiedFunction,
    //   enumerable: false,
    //   configurable: true,
    //   writable: true
    // };
    descriptor.writable = false
    return descriptor
}

/**
 * readonly(MyTestableClass.prototype, 'name', descriptor);
 * 类似于
 * Object.defineProperty(MyTestableClass.prototype, 'name', descriptor);
 **/

class MyTestableClass {
    @readonly
    name() {
        return 'Tom'
    }
}
```

装饰器第一个参数是类的原型对象，上例是 `MyTestableClass.prototype`，装饰器的本意是要“装饰”类的实例，但是这个时候实例还没生成，所以只能去装饰原型（这不同于类的装饰，那种情况时 target 参数指的是类本身）；第二个参数是所要装饰的属性名，第三个参数是该属性的描述对象。

另外，上面代码说明，装饰器（readonly）会修改属性的描述对象（descriptor），然后被修改的描述对象再用来定义属性。
