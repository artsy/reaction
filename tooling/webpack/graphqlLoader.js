module.exports = function(source) {
  this.cacheable()
  this.value = source

  return source
}
