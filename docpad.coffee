# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {
	collections:
		techblog: -> @getCollection("html").findAllLive({relativeOutDirPath:'techblog'},[date:-1])
	templateData:
		getPreview: (post) -> 
			post.body.match(/<img [^>]+>/)[0]
}

# Export the DocPad Configuration
module.exports = docpadConfig