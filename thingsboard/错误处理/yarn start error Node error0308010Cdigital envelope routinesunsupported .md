# Node error:0308010C:digital envelope routines::unsupported

[参考1 stackoverflow](https://stackoverflow.com/questions/69719601/getting-error-digital-envelope-routines-reason-unsupported-code-err-oss)

[参考2](https://sebhastian.com/error-0308010c-digital-envelope-routines-unsupported/)

windwos下修改package.json文件如下：

```js
"start": "SET NODE_OPTIONS=--openssl-legacy-provider && node --max_old_space_size=8048 
```

原因是因为Nodesjs的版本高于V17就会这样，如果是V16，就不会了。