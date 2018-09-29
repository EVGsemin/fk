**Оптимизация всех изображений в папке**
`jpegoptim -m 60 *.jpg --strip-all`

**Генерация всех favicon из одного favicon.png**
`convert favicon.png ../../../../favicon.png; convert favicon.png ../../../../favicon.ico; convert -resize 150 favicon.png favicon-150x150.png; convert -resize 180 favicon.png favicon-180x180.png; convert -resize 192 favicon.png favicon-192x192.png; convert -resize 256 favicon.png favicon-256x256.png; convert favicon.png favicon.ico`

**Генерация cover из одного cover.jpg:**
`convert -resize 600 cover.jpg cover.jpg; convert cover.jpg -gravity Center -crop 600x350+0 cover.jpg`

**Необходимая графика:**
favicon.ico (и в корневой директории)
favicon.png (и в корневой директории)
favicon.svg
favicon-150x150
favicon-180x180
favicon-192x192
favicon-256x256

cover.jpg (600x350)