export default {
  async fetch(request) {
    const url = new URL(request.url)
    url.hostname = 'gavinzhu.com'

    return Response.redirect(url.toString(), 301)
  },
}
