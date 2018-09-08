module.exports = function(source) {
  this.cacheable()
  this.value = source
  const sanitizedSource = source.replace(/`/g, "\\`")
  return `export default \`${sanitizedSource}\``
}
