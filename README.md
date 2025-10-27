## Produce PDF from webpage

### Usage
* `docker build -t url2pdf .`
* `docker run --rm -v "$PWD:/out" url2pdf "[url]" "/out/[outputFileName]" <paper>`
