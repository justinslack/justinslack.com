#
# responsive-youtube-jekyll-tag.rb
#
# by Jeffrey Morgan
# http://usabilityetc.com/
#
# Use Twitter Bootstrap's CSS to embed responsive YouTube videos.
#
# Usage:
#
#   1. Copy this file into your Jekyll _plugins folder
#
#   2. Add the vimeo tag with a YouTube video ID where you
#      want to embed the video
#
# For example, to embed the video with the link
# https://player.vimeo.com/video/150803501
# use the following tag:
#
#   {% vimeo 150803501 %}
#

module Jekyll
  class ResponsiveVimeoTag < Liquid::Tag
    def initialize(tag_name, markup, options)
      super
      @video_id = markup.strip
    end

    def render(context)
      %Q[
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://player.vimeo.com/video/#{@video_id}" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  </iframe>
</div>
      ]
    end
  end
end

Liquid::Template.register_tag("vimeo", Jekyll::ResponsiveVimeoTag)