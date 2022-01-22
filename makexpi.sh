#!/bin/sh

echo "Creating JSON..."
yq eval -oj src/manifest.yml > src/manifest.json

echo "Inserting README into JSON"

README=$(pandoc README.md -t mediawiki) yq e -oj -P -i '.description = strenv(README)' src/manifest.json
echo "Reading fields..."

STEM=`yq e .codename src/manifest.yml`
VERSION=`yq e .version src/manifest.yml`

echo "Creating package..."
ZIPFILE=${STEM}-${VERSION}.xpi

rm -f ${ZIPFILE}

(cd src && zip -r - .) > ${ZIPFILE}

echo "Removing YAML file from ZIP..."

zip -d ${ZIPFILE} manifest.yml
