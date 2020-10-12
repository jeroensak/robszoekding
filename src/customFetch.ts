class customFetch {
  private currentRequest = null;
  private currentRequestOptions = null;
  private currentRequestResponse = null;

  request(url: string, options: any) {
    if (
      JSON.stringify(this.currentRequestOptions) !==
      JSON.stringify({ url, options })
    ) {
      this.currentRequestOptions = { url, options };
      this.currentRequestResponse = null;

      return fetch(url, options).then((res) => {
        this.currentRequestResponse = res.json();
        return this.currentRequestResponse;
      });
    }

    return this.currentRequestResponse;
  }
}

export default new customFetch();
