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
#   {% soundcloud 150803501 %}
#

module Jekyll
  class ResponsiveSoundcloudTag < Liquid::Tag
    def initialize(tag_name, markup, options)
      super
      @sound_id = markup.strip
    end

    def render(context)
      %Q[
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/#{@sound_id}&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
</div>
      ]
    end
  end
end

Liquid::Template.register_tag("soundcloud", Jekyll::ResponsiveSoundcloudTag)