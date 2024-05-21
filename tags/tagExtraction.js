const fileName = process.argv[2]
function createTagFile() {
    const fs = require('node:fs/promises')
    const data = require('./' + fileName)
    let tags_json = []
    let tags_string = []
    data.map((point) => {
        if (point.photo.tags.tag.length === 0) {
            return
        }
        point.photo.tags.tag?.map((tag) => {
            tags_json.push(tag.raw)
            tags_string.push(tag.raw + ' ')
        })
    })
    const toFile = JSON.stringify(tags_json)
    const newFileName = fileName.split('.')[0]
    fs.writeFile(`./tags/${newFileName}_tags_json.json`, toFile)
    fs.writeFile(`./tags/${newFileName}_tags_string.json`, tags_string)
}
createTagFile()
