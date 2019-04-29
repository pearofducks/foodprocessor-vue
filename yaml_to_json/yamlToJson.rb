#!/usr/bin/env ruby

require "yaml"
require "json"

if(ARGV.size == 0)
  puts "\tyamlToJSON.rb INPUT_DIR [OUTPUT_DIR]"
  puts "\t- if OUTPUT_DIR is omitted then STDOUT will be used"
  exit(0)
end

files = Dir.glob(File.join(File.expand_path(ARGV[0]),"*.recipe"))
puts files

recipes = files.map do |f|
  begin
    YAML.load_file(f)
  rescue
    puts "ERROR at #{f}"
  end
end

if(ARGV.size == 1)
  puts recipes.to_json
else
  recipe_output = "window.recipes = " + recipes.to_json
  File.write(File.join(File.expand_path(ARGV[1]),"recipes.js"), recipe_output)
end
