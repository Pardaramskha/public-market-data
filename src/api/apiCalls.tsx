
interface HttpResponse<T> extends Response {
    parsedBody?: T
    rawBlob?: Blob
}

async function httpAPI<T>(request: RequestInfo): Promise<HttpResponse<T>> {

    const response: HttpResponse<T> = await fetch(request)

    try { response.parsedBody = await response.json() }
    catch (e) { throw new Error(response.statusText) }
    return response
}

export async function APIGet<T>(path: string, args = {method: 'get'}): Promise<HttpResponse<T>> {

    const init: RequestInit = {
        method: args.method
    }

    return await httpAPI<T>(new Request(path, init))
}
