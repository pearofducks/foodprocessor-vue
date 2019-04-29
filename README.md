> foodprocessor-vue

Vue app for displaying recipes rendered to static content

### dev

You'll need a `recipes.js` file at the root of this project - you can run `dev:prep:rb` if you have Ruby available. Otherwise you can get the node dependencies in the `yaml_to_json` folder and run `dev:prep:js`.

### the recipe file format

`*.recipe` files are essentially just YAML - an example can be found under `yaml_to_json/example`

- At the top level there are 3 required keys: `name`, `what`, and `how`
  - `name` (string) - is the name of the recipe that will be displayed
  - `what` (object) - contains the ingredients of the recipe
  - `how` (array) - has a list of steps to create the recipe
    - all how-block elements are processed as markdown

##### 'what' block - details

- The format for an ingredient is: `ingredient - preparation: amount`
  - `amount` can be `!`, and then the key will be processed as markdown
  - `amount`'s quantity and measurement-type should be separated by a space
  	- several mesurements have shorthand that will be expanded
  	- common fractional quantities will be converted into a utf-8 fractional glyph