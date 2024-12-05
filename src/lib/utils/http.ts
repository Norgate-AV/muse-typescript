function get(url: string, options?: any): string {
    const HttpClient = Java.type("java.net.http.HttpClient");
    const HttpRequest = Java.type("java.net.http.HttpRequest");
    const HttpResponse = Java.type("java.net.http.HttpResponse");

    const client = HttpClient.newHttpClient();
    const request = HttpRequest.newBuilder().uri(url).build();
    const response = client.send(request, HttpResponse.BodyHandlers.ofString());

    return response.body();
}
