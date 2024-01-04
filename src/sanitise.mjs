export default stringToSanitise => {
  return stringToSanitise.replace(/<[^>]*>?/gm, '')
}
