addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

class ElementHandler {
  element(element) {
    const string = "This description has been replaced!";
    element.setInnerContent(string);
  }
}

/**
 * Respond with a random variant
 * @param {Request} request
 */
async function handleRequest(request) {
  //console.log(request.headers);
  var resp = await fetch(
    "https://cfw-takehome.developers.workers.dev/api/variants"
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });
  var urls = resp.variants;
  //console.log(urls);
  var rand = Math.floor(Math.random() * 2 + 1);
  //console.log("random: ", rand);
  //console.log(urls[rand - 1]);
  var display = await fetch(urls[rand - 1]).then(response => response.text());
  //console.log(display);
  var cookie = "variant=" + urls[rand - 1];

  return new HTMLRewriter().on("p#description", new ElementHandler()).transform(
    new Response(display, {
      headers: { "content-type": "text/html", "set-cookie": cookie }
    })
  );
}
