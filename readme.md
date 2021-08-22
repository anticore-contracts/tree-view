# @anticore-contracts/tree-view

An [anticore](https://github.com/Lcfvs/anticore) contract to switch between views.

## Reminder

The tree contracts should be added lastly, to improve the performances.

## Exports

### on
```js
import '@anticore-contracts/tree-view/on.js'
```

### when
```js
import '@anticore-contracts/tree-view/when.js'
```

## Lifecycle

* Matches `main`
* Picks the `title, meta[name], meta[property]`, from the root node
* Replaces the current related elements by the new ones
* If the match doesn't have a `.error`, it updates the history
* If the url doesn't have a hash, it scrolls to `0, 0`
* It listens the `popstate`, to restore & trigger the view elements

## License

[MIT](./license.md)
