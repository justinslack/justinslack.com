# Jekyll starter

Style guide driven development for NGI single site

## Requirements

Installing Jekyll should be straight-forward if all requirements are met. Before you start, make sure your system has the following:

- GNU/Linux, Unix, or macOS
- [Ruby](https://www.ruby-lang.org/en/downloads/) version 2.0 or above, including all development headers
- [RubyGems](https://rubygems.org/pages/download)
- [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/) (in case your system doesn’t have them installed, which you can check by running `gcc -v` and `make -v` in your system’s command line interface)

## Windows Requirements

Ruby for Windows
- Install Ruby via [RubyInstaller](http://rubyinstaller.org/downloads/)
- The latest stable version, 2.3.3 is recommended
- In the command promt, type `ruby -v` to confirm Ruby version
-  The output should be something like: ruby 2.3.3p222 (2016-11-21) [i386-mingw32]

Gems for Windows
- Download and install DevelopmentKit from the same download page as Ruby Installer.
- Choose an ?exe file corresponding to your environment (32 bits or 64 bits and working with your version of Ruby).
- Follow the installation instructions for [DevelopmentKit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)
- After installing DevelopmentKit you can install all needed gems by running `gem install {gem name}` from the command prompt.
- For example, you can now install the bundler gem: `gem install bundler`
- As well as jekyll: `gem install jekyll`

See [Installing Ruby Gems in Windows](http://stackoverflow.com/questions/18908708/installing-ruby-gem-in-windows) for original SO thread.

## Develop

Starter style guide was built with [Jekyll](http://jekyllrb.com/) version 3.3.1, but should support newer versions as well.

Install the dependencies with [Bundler](http://bundler.io/):

~~~bash
$ bundle install
~~~

Run `jekyll` commands through Bundler to ensure you're using the right versions:

~~~bash
$ bundle exec jekyll liveserve
~~~

Run an incremental build for performance improvements. This will only re-build posts and pages that have changed:

~~~bash
$ bundle exec jekyll liveserve --incremental
~~~

## Editing

Edit relevant .md or .html files. These will automatically update.

### Component pages

* Add, update or remove a component page in the *Components* collection.
* Change the category of a component page to move it to another section in the navigation.
* Component pages are organised in the navigation by category, with URLs based on the path inside the `_components` folder.

### Search

* Add `excluded_in_search: true` to any documentation page's front matter to exclude that page in the search results.

### Navigation

* Change `site.show_full_navigation` to control all or only the current navigation group being open.

----------

## Production build

The production build is a grunt task.

## Requirements

- node.js (https://nodejs.org/en/)
- grunt `npm install -g grunt-cli`

## Getting started

- In terminal (or equivalent) go to working directory.
- Run `npm install`. This will install all of the Grunt packages.
- Run `grunt production` to concatenate and minify js and optimise images and svg.
- Run `grunt move` to copy all static assets to the app folder.
